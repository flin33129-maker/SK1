import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import type {
  AbilitySlot,
  BossHud,
  DamagePopup,
  GameCallbacks,
  HudState,
  RadarBlip,
} from "./types";

export type SfxName =
  | "shoot"
  | "melee"
  | "hit"
  | "hurt"
  | "jump"
  | "pickup"
  | "die"
  | "win"
  | "arrow"
  | "reload"
  | "spawn"
  | "tick"
  | "grapple";

export type ViewWeaponKind =
  | "katana"
  | "crossbow"
  | "flying-sword"
  | "longbow"
  | "torch-blade"
  | "dart"
  | "parkour-hands";

export interface BoxSpec {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  color?: number;
  collide?: boolean;
  roughness?: number;
  metalness?: number;
  emissive?: number;
  emissiveIntensity?: number;
  opacity?: number;
  shadow?: boolean;
  rotationY?: number;
  texture?: "stone" | "wood" | "roof" | "tile" | "none";
}

export interface BotRanged {
  interval: number;
  speed: number;
  damage: number;
  spread: number;
  color?: number;
}

export interface Bot {
  kind: string;
  group: THREE.Group;
  mat: THREE.MeshStandardMaterial;
  rightArm: THREE.Object3D;
  leftArm: THREE.Object3D;
  hpBarFill: THREE.Mesh;
  hpBarGroup: THREE.Group;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  health: number;
  maxHealth: number;
  speed: number;
  damage: number;
  attackRange: number;
  attackCooldown: number;
  cooldown: number;
  radius: number;
  height: number;
  color: number;
  alive: boolean;
  gravity: boolean;
  onGround: boolean;
  ranged: BotRanged | null;
  rangedTimer: number;
  flash: number;
  bobPhase: number;
  elite: boolean;
  los: boolean;
  losTimer: number;
  mixer?: THREE.AnimationMixer;
  actions?: {
    idle?: THREE.AnimationAction;
    walk?: THREE.AnimationAction;
    run?: THREE.AnimationAction;
    current?: "idle" | "walk" | "run";
  };
  proceduralRoot?: THREE.Object3D;
  data: Record<string, number>;
  onDeath?: (bot: Bot) => void;
  onAttack?: (bot: Bot) => void;
}

export interface Pickup {
  mesh: THREE.Object3D;
  pos: THREE.Vector3;
  kind: string;
  radius: number;
  active: boolean;
  onPickup: (pickup: Pickup) => void;
  label: string;
}

export interface Projectile {
  mesh: THREE.Object3D;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  gravity: number;
  damage: number;
  radius: number;
  life: number;
  owner: "player" | "bot";
  color: number;
  homing?: number;
  onHit?: (hit: { bot?: Bot; point: THREE.Vector3 }) => void;
}

interface Fx {
  obj: THREE.Object3D;
  life: number;
  maxLife: number;
  vel?: THREE.Vector3;
  gravity: number;
  fadeScale: boolean;
  baseScale: number;
  sharedGeometry: boolean;
}

interface AABB {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
}

export interface EngineOptions {
  sky?: { top: number; bottom: number };
  fog?: { color: number; near: number; far: number };
  ambient?: number;
  sun?: {
    color?: number;
    intensity?: number;
    position?: [number, number, number];
    shadows?: boolean;
  };
  gravity?: number;
  killY?: number;
  bloom?: { strength?: number; radius?: number; threshold?: number };
}

export interface RayHit {
  point: THREE.Vector3;
  bot: Bot | null;
  mesh: THREE.Mesh | null;
  distance: number;
}

const KEY_MAP: Record<string, string> = {
  KeyW: "w",
  KeyA: "a",
  KeyS: "s",
  KeyD: "d",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  Space: "space",
  KeyE: "e",
  KeyQ: "q",
  KeyF: "f",
  KeyR: "r",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  ControlLeft: "ctrl",
  ArrowLeft: "lookLeft",
  ArrowRight: "lookRight",
  ArrowUp: "lookUp",
  ArrowDown: "lookDown",
};

export class Engine {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGLRenderer;
  readonly composer: EffectComposer;
  readonly bloomPass: UnrealBloomPass;
  readonly container: HTMLElement;
  readonly canvas: HTMLCanvasElement;
  readonly callbacks: GameCallbacks;

  state: "idle" | "playing" | "paused" | "ended" = "idle";
  time = 0;
  frame = 0;

  gravity = 26;
  killY = -40;
  playerSpeed = 7.8;
  sprintMult = 1.55;
  jumpPower = 9.5;
  maxJumps = 2;
  mouseSensitivity = 0.0022;
  eyeHeight = 1.65;
  playerRadius = 0.36;
  playerHeight = 1.78;
  infiniteAmmo = false;

  /** Built-in grappling hook (飞索) on E key */
  grappleEnabled = true;
  grappleCooldown = 0;
  grappleMaxCooldown = 3.5;
  private grappleState: {
    active: boolean;
    target: THREE.Vector3;
    bot: Bot | null;
    line: THREE.Mesh | null;
    timer: number;
  } = { active: false, target: new THREE.Vector3(), bot: null, line: null, timer: 0 };

  player = {
    pos: new THREE.Vector3(0, 1, 0),
    vel: new THREE.Vector3(),
    health: 100,
    maxHealth: 100,
    armor: 50,
    maxArmor: 100,
    stamina: 100,
    yaw: 0,
    pitch: 0,
    onGround: false,
    jumps: 0,
    alive: true,
    sprinting: false,
    bobT: 0,
    invuln: 0,
  };

  colliders: AABB[] = [];
  worldMeshes: THREE.Mesh[] = [];
  bots: Bot[] = [];
  pickups: Pickup[] = [];
  projectiles: Projectile[] = [];
  fx: Fx[] = [];

  input = new Set<string>();
  mouse = { left: false, right: false };

  onUpdate: ((dt: number, engine: Engine) => void) | null = null;
  customBotUpdate: ((bot: Bot, dt: number) => void) | null = null;
  onPlayerDeath: ((engine: Engine) => void) | null = null;
  onFall: ((engine: Engine) => void) | null = null;
  onLeftDown: (() => void) | null = null;
  onLeftUp: (() => void) | null = null;
  onRightDown: (() => void) | null = null;
  onKeyDown: ((code: string) => void) | null = null;

  /** Radar & HUD helpers */
  radarRange = 85;
  goalPos: THREE.Vector3 | null = null;
  zoneInfo: { center: THREE.Vector3; radius: number } | null = null;
  abilities: AbilitySlot[] = [];
  bossHud: BossHud | null = null;

  private hud: HudState = {};
  private hudDirty = false;
  private hudTimer = 0;
  private hitKey = 0;
  private hurtKey = 0;
  private pickupKey = 0;
  private popupSeq = 1;
  private popups: (DamagePopup & { ttl: number })[] = [];
  private bannerText: string | undefined = undefined;
  private bannerTimer = 0;
  private streakCount = 0;
  private streakTimer = 0;

  private shakeAmt = 0;
  private stepSmooth = 0;
  private raf = 0;
  private last = 0;
  private resizeObserver: ResizeObserver | null = null;
  private audio: AudioContext | null = null;
  private raycaster = new THREE.Raycaster();
  private ray = new THREE.Ray();
  private tmpBox = new THREE.Box3();
  private tmpVec = new THREE.Vector3();
  private tmpVec2 = new THREE.Vector3();
  private tmpVec3 = new THREE.Vector3();
  private probe = new THREE.Vector3();
  private disposed = false;
  private fallbackMode = false;
  private lockTimer = 0;
  private lastMouseX: number | null = null;
  private lastMouseY: number | null = null;
  private cursorNormX = 0;
  private sun: THREE.DirectionalLight;
  private torch: THREE.PointLight | null = null;
  private particleGeo = new THREE.SphereGeometry(1, 6, 6);
  private textures: Record<string, THREE.CanvasTexture> = {};
  private gltfSoldier: { scene: THREE.Group; animations: THREE.AnimationClip[] } | null = null;
  private oceanWater: Water | null = null;

  /** First-person 3D weapon viewmodel rig */
  private viewRoot = new THREE.Group();
  private viewKind: ViewWeaponKind = "katana";
  private viewSwing = 0;
  private viewSwingDir = 1;
  private viewRecoil = 0;
  private bowCharge = 0;
  private bowArcLine: THREE.Line | null = null;
  private spiritSwords: THREE.Object3D[] = [];

  constructor(container: HTMLElement, options: EngineOptions, callbacks: GameCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 240);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = options.sun?.shadows !== false;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.canvas = this.renderer.domElement;
    this.canvas.style.display = "block";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.cursor = "none";
    container.appendChild(this.canvas);

    this.camera = new THREE.PerspectiveCamera(78, width / height, 0.05, 1600);
    this.camera.rotation.order = "YXZ";
    this.scene.add(this.camera);

    // Post-processing pipeline (RenderPass + UnrealBloomPass)
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      options.bloom?.strength ?? 0.52,
      options.bloom?.radius ?? 0.42,
      options.bloom?.threshold ?? 0.78,
    );
    this.composer.addPass(this.bloomPass);

    this.initProceduralTextures();

    this.scene.background = new THREE.Color(options.sky?.bottom ?? 0x0b1020);
    if (options.fog) {
      this.scene.fog = new THREE.FogExp2(options.fog.color, 1 / Math.max(options.fog.far, 60));
    }
    this.scene.add(
      this.makeSky(options.sky?.top ?? 0x1e3a8a, options.sky?.bottom ?? 0x0b1020),
    );

    const hemi = new THREE.HemisphereLight(0xdbeafe, 0x3a2b22, options.ambient ?? 0.68);
    this.scene.add(hemi);

    this.sun = new THREE.DirectionalLight(
      options.sun?.color ?? 0xffe0b2,
      options.sun?.intensity ?? 1.45,
    );
    this.sun.position.set(...(options.sun?.position ?? [40, 60, 25]));
    if (options.sun?.shadows !== false) {
      this.sun.castShadow = true;
      this.sun.shadow.mapSize.set(1024, 1024);
      this.sun.shadow.camera.near = 1;
      this.sun.shadow.camera.far = 260;
      const s = 92;
      this.sun.shadow.camera.left = -s;
      this.sun.shadow.camera.right = s;
      this.sun.shadow.camera.top = s;
      this.sun.shadow.camera.bottom = -s;
      this.sun.shadow.bias = -0.0009;
    }
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    if (options.gravity !== undefined) this.gravity = options.gravity;
    if (options.killY !== undefined) this.killY = options.killY;

    // Attach 3D first-person weapon rig to camera
    this.camera.add(this.viewRoot);
    this.setViewWeapon("katana");
    this.loadGltfSoldierTemplate();

    this.attachEvents();
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.animate);
  }

  /* ------------------------------------------------- procedural textures */

  private loadGltfSoldierTemplate() {
    try {
      const loader = new GLTFLoader();
      loader.load(
        "/models/Soldier.glb",
        (gltf) => {
          if (this.disposed) return;
          this.gltfSoldier = { scene: gltf.scene, animations: gltf.animations || [] };
          for (const bot of this.bots) {
            if (bot.alive) this.attachSoldierToBot(bot);
          }
        },
        undefined,
        () => {
          /* keep procedural fallback if offline */
        },
      );
    } catch {
      /* ignore */
    }
  }

  private attachSoldierToBot(bot: Bot) {
    if (!this.gltfSoldier || bot.mixer || !bot.alive) return;
    try {
      const cloned = SkeletonUtils.clone(this.gltfSoldier.scene) as THREE.Group;
      const scale = bot.height / 1.8;
      cloned.scale.setScalar(scale);
      cloned.rotation.y = Math.PI; // Soldier.glb faces -Z in rest pose; rotate to +Z to match group.rotation.y

      cloned.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (mesh.material) {
            const clonedMat = (mesh.material as THREE.MeshStandardMaterial).clone();
            clonedMat.color.lerp(new THREE.Color(bot.color), 0.45);
            if (bot.elite) {
              clonedMat.emissive = new THREE.Color(0xf59e0b);
              clonedMat.emissiveIntensity = 0.35;
            }
            mesh.material = clonedMat;
          }
        }
      });

      // Add Wuxia Conical Hat on top of the glTF character
      const hat = new THREE.Mesh(
        new THREE.ConeGeometry(bot.radius * 1.45, 0.34, 14),
        new THREE.MeshStandardMaterial({
          color: bot.elite ? 0xf59e0b : 0x1e293b,
          metalness: 0.75,
          roughness: 0.25,
        }),
      );
      hat.position.y = bot.height + 0.05;
      hat.castShadow = true;
      cloned.add(hat);

      if (bot.proceduralRoot) {
        bot.proceduralRoot.visible = false;
      }
      bot.group.add(cloned);

      const mixer = new THREE.AnimationMixer(cloned);
      const clips = this.gltfSoldier.animations;
      const idleClip = THREE.AnimationClip.findByName(clips, "Idle") || clips[0];
      const walkClip = THREE.AnimationClip.findByName(clips, "Walk") || clips[3] || clips[0];
      const runClip = THREE.AnimationClip.findByName(clips, "Run") || clips[1] || clips[0];

      const idle = idleClip ? mixer.clipAction(idleClip) : undefined;
      const walk = walkClip ? mixer.clipAction(walkClip) : undefined;
      const run = runClip ? mixer.clipAction(runClip) : undefined;
      idle?.play();

      bot.mixer = mixer;
      bot.actions = { idle, walk, run, current: "idle" };
    } catch {
      /* fallback stays visible */
    }
  }

  /** Adds realistic Preetham atmospheric scattering sky shader + normal-mapped reflective ocean */
  addOceanAndAtmosphericSky(elevation = 14, azimuth = 165, waterY = -0.65) {
    try {
      const sky = new Sky();
      sky.scale.setScalar(4500);
      this.scene.add(sky);
      const skyUniforms = sky.material.uniforms;
      skyUniforms["turbidity"].value = 8.5;
      skyUniforms["rayleigh"].value = 2.4;
      skyUniforms["mieCoefficient"].value = 0.005;
      skyUniforms["mieDirectionalG"].value = 0.82;

      const phi = THREE.MathUtils.degToRad(90 - elevation);
      const theta = THREE.MathUtils.degToRad(azimuth);
      const sunVec = new THREE.Vector3().setFromSphericalCoords(1, phi, theta);
      skyUniforms["sunPosition"].value.copy(sunVec);

      const waterGeo = new THREE.PlaneGeometry(2400, 2400);
      const waterNormals = new THREE.TextureLoader().load("/textures/waternormals.jpg", (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      });
      const water = new Water(waterGeo, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals,
        sunDirection: sunVec.clone().normalize(),
        sunColor: 0xffd19a,
        waterColor: 0x0a3d62,
        distortionScale: 3.4,
        fog: this.scene.fog !== undefined,
      });
      water.rotation.x = -Math.PI / 2;
      water.position.y = waterY;
      this.scene.add(water);
      this.oceanWater = water;
    } catch {
      /* ignore if shader unavailable */
    }
  }

  private initProceduralTextures() {
    const makeTex = (draw: (ctx: CanvasRenderingContext2D, s: number) => void, repeat = 2) => {
      const canvas = document.createElement("canvas");
      const s = 128;
      canvas.width = canvas.height = s;
      const ctx = canvas.getContext("2d");
      if (ctx) draw(ctx, s);
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeat, repeat);
      return tex;
    };

    this.textures.stone = makeTex((ctx, s) => {
      ctx.fillStyle = "#b5b0a8";
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = "rgba(35,30,28,0.38)";
      ctx.lineWidth = 2;
      for (let row = 0; row < 4; row++) {
        const y = row * 32;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(s, y);
        ctx.stroke();
        const offset = (row % 2) * 32;
        for (let col = 0; col < 2; col++) {
          const x = (col * 64 + offset) % s;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 32);
          ctx.stroke();
        }
      }
      for (let i = 0; i < 420; i++) {
        ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.09)";
        ctx.fillRect(Math.random() * s, Math.random() * s, 3, 3);
      }
    }, 2);

    this.textures.wood = makeTex((ctx, s) => {
      ctx.fillStyle = "#b88b64";
      ctx.fillRect(0, 0, s, s);
      for (let i = 0; i < 28; i++) {
        ctx.fillStyle = i % 2 === 0 ? "rgba(60,32,14,0.12)" : "rgba(255,220,180,0.08)";
        ctx.fillRect(0, (i / 28) * s, s, 3);
      }
      ctx.strokeStyle = "rgba(30,15,5,0.28)";
      ctx.lineWidth = 2;
      for (let y = 0; y < s; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(s, y);
        ctx.stroke();
      }
    }, 2);

    this.textures.roof = makeTex((ctx, s) => {
      ctx.fillStyle = "#a84444";
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = "rgba(20,10,12,0.42)";
      ctx.lineWidth = 3;
      for (let x = 0; x < s; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, s);
        ctx.stroke();
      }
      for (let y = 0; y < s; y += 24) {
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fillRect(0, y, s, 4);
      }
    }, 3);
  }

  /* -------------------------------------------- first-person 3D weapons */

  setViewWeapon(kind: ViewWeaponKind) {
    if (this.viewKind === kind && this.viewRoot.children.length > 0) return;
    this.viewKind = kind;
    this.spiritSwords = [];
    while (this.viewRoot.children.length > 0) {
      this.viewRoot.remove(this.viewRoot.children[0]);
    }

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.18,
      depthTest: false,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25,
      depthTest: false,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.4,
      roughness: 0.7,
      depthTest: false,
    });
    const runeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.8,
      depthTest: false,
    });

    if (kind === "katana") {
      const rig = new THREE.Group();
      rig.position.set(0.36, -0.34, -0.58);
      rig.rotation.set(0.18, -0.28, -0.18);

      // Hilt & guard
      const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 0.26, 10), darkMat);
      rig.add(hilt);
      const guard = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.09), goldMat);
      guard.position.y = 0.14;
      rig.add(guard);

      // Gleaming blade + glowing fuller
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.82, 0.042), steelMat);
      blade.position.set(0, 0.56, -0.004);
      rig.add(blade);
      const fuller = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.72, 0.008), runeMat);
      fuller.position.set(0, 0.54, 0.008);
      rig.add(fuller);

      this.viewRoot.add(rig);
    } else if (kind === "crossbow") {
      const rig = new THREE.Group();
      rig.position.set(0.32, -0.3, -0.52);
      rig.rotation.set(0.04, -0.08, 0);

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.52), darkMat);
      rig.add(body);
      const bow = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.022, 0.035), goldMat);
      bow.position.set(0, 0.02, -0.22);
      rig.add(bow);
      const stringGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.44, 6);
      stringGeo.rotateZ(Math.PI / 2);
      const bowString = new THREE.Mesh(stringGeo, runeMat);
      bowString.position.set(0, 0.02, -0.05);
      rig.add(bowString);
      const mag = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.08, 0.24), goldMat);
      mag.position.set(0, 0.075, -0.04);
      rig.add(mag);

      this.viewRoot.add(rig);
    } else if (kind === "flying-sword") {
      const rig = new THREE.Group();
      rig.position.set(0.26, -0.26, -0.62);
      for (let i = 0; i < 3; i++) {
        const sword = new THREE.Group();
        const blade = new THREE.Mesh(new THREE.ConeGeometry(0.026, 0.54, 4), runeMat);
        blade.rotation.x = -Math.PI / 2;
        sword.add(blade);
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.016, 0.02), goldMat);
        guard.position.z = 0.22;
        sword.add(guard);
        rig.add(sword);
        this.spiritSwords.push(sword);
      }
      this.viewRoot.add(rig);
    } else if (kind === "longbow") {
      const rig = new THREE.Group();
      rig.position.set(-0.24, -0.14, -0.54);
      rig.rotation.set(0.05, 0.16, -0.12);
      const limbUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.02, 0.48, 8), goldMat);
      limbUpper.position.set(0, 0.24, 0);
      limbUpper.rotation.z = -0.15;
      rig.add(limbUpper);
      const limbLower = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.014, 0.48, 8), goldMat);
      limbLower.position.set(0, -0.24, 0);
      limbLower.rotation.z = 0.15;
      rig.add(limbLower);
      const arrowShaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.007, 0.007, 0.62, 6),
        runeMat,
      );
      arrowShaft.rotation.x = Math.PI / 2;
      arrowShaft.position.set(0.16, 0, -0.05);
      arrowShaft.name = "nockedArrow";
      rig.add(arrowShaft);
      this.viewRoot.add(rig);
    } else if (kind === "torch-blade") {
      // Left torch + right short sword
      const leftTorch = new THREE.Group();
      leftTorch.position.set(-0.36, -0.28, -0.52);
      leftTorch.rotation.set(0.22, 0.2, -0.15);
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.018, 0.42, 8), darkMat);
      leftTorch.add(stick);
      const flameMat = new THREE.MeshStandardMaterial({
        color: 0xffb703,
        emissive: 0xff6b00,
        emissiveIntensity: 2.4,
        depthTest: false,
      });
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.18, 8), flameMat);
      flame.position.y = 0.26;
      flame.name = "torchFlame";
      leftTorch.add(flame);
      this.viewRoot.add(leftTorch);

      const rightBlade = new THREE.Group();
      rightBlade.position.set(0.36, -0.34, -0.56);
      rightBlade.rotation.set(0.2, -0.25, -0.2);
      const sword = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.68, 0.04), steelMat);
      sword.position.y = 0.36;
      rightBlade.add(sword);
      const guard = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.08), goldMat);
      guard.position.y = 0.04;
      rightBlade.add(guard);
      this.viewRoot.add(rightBlade);
    } else if (kind === "dart") {
      const rig = new THREE.Group();
      rig.position.set(0.32, -0.28, -0.52);
      for (let i = -1; i <= 1; i++) {
        const dart = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.28, 4), goldMat);
        dart.rotation.x = -Math.PI / 2;
        dart.rotation.y = i * 0.16;
        dart.position.x = i * 0.045;
        rig.add(dart);
      }
      this.viewRoot.add(rig);
    } else if (kind === "parkour-hands") {
      const rig = new THREE.Group();
      rig.position.set(0.34, -0.32, -0.52);
      rig.rotation.set(0.25, -0.3, -0.25);
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.62, 0.036), runeMat);
      blade.position.y = 0.32;
      rig.add(blade);
      const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8), darkMat);
      rig.add(hilt);
      this.viewRoot.add(rig);
    }

    this.viewRoot.traverse((obj) => {
      obj.renderOrder = 999;
    });
  }

  triggerWeaponSwing() {
    this.viewSwing = 1;
    this.viewSwingDir = -this.viewSwingDir;
  }

  triggerWeaponRecoil(amount = 1) {
    this.viewRecoil = Math.min(1.4, this.viewRecoil + amount);
  }

  setBowCharge(ratio: number) {
    this.bowCharge = THREE.MathUtils.clamp(ratio, 0, 1);
  }

  /** Renders a live 3D dotted trajectory preview arc in world space for charged bows */
  updateBowPreview(active: boolean, speed: number, gravity: number) {
    if (!active) {
      if (this.bowArcLine) this.bowArcLine.visible = false;
      return;
    }
    if (!this.bowArcLine) {
      const geo = new THREE.BufferGeometry();
      const mat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
      });
      this.bowArcLine = new THREE.Line(geo, mat);
      this.scene.add(this.bowArcLine);
    }
    this.bowArcLine.visible = true;
    const pts: THREE.Vector3[] = [];
    const origin = this.eyePos.add(this.forward.multiplyScalar(0.7)).add(new THREE.Vector3(0, -0.1, 0));
    const vel = this.forward.multiplyScalar(speed);
    const p = origin.clone();
    const v = vel.clone();
    const step = 0.045;
    for (let i = 0; i < 34; i++) {
      pts.push(p.clone());
      v.y -= gravity * step;
      p.addScaledVector(v, step);
      if (p.y < 0.1) break;
    }
    this.bowArcLine.geometry.setFromPoints(pts);
  }

  /** Spawns a glowing crescent sword-qi slash wave projectile */
  spawnSlashWave(color = 0x38bdf8, damage = 45, speed = 38) {
    const origin = this.eyePos.add(this.forward.multiplyScalar(0.8));
    const dir = this.forward;
    const group = new THREE.Group();
    const arcGeo = new THREE.TorusGeometry(0.75, 0.055, 8, 24, Math.PI * 0.85);
    const arcMat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 2.2,
      roughness: 0.2,
    });
    const arc = new THREE.Mesh(arcGeo, arcMat);
    arc.rotation.z = this.viewSwingDir > 0 ? 0.35 : -0.35;
    group.add(arc);
    group.position.copy(origin);
    group.lookAt(origin.clone().add(dir));
    this.scene.add(group);
    this.projectiles.push({
      mesh: group,
      pos: origin,
      vel: dir.clone().multiplyScalar(speed),
      gravity: 0,
      damage,
      radius: 0.85,
      life: 0.65,
      owner: "player",
      color,
    });
  }

  /* ------------------------------------------------- grappling hook (E) */

  triggerGrapple(): boolean {
    if (!this.grappleEnabled || this.grappleCooldown > 0 || !this.player.alive) return false;
    const origin = this.eyePos;
    const dir = this.forward;
    let hit = this.raycast(origin, dir, 56);
    if (!hit) {
      // Assist ray slightly upward/downward so grappling ledges is super responsive
      const upDir = dir.clone().add(new THREE.Vector3(0, 0.14, 0)).normalize();
      hit = this.raycast(origin, upDir, 56);
    }
    if (!hit || hit.distance < 3.2) {
      this.message("飞索未命中目标（瞄准建筑/屋檐/树木/敌人按 E）");
      return false;
    }

    this.grappleCooldown = this.grappleMaxCooldown;
    this.sfx("grapple", 0.22);
    this.ring(hit.point, 0x38bdf8, 1.4);

    if (this.grappleState.line) {
      this.grappleState.line.removeFromParent();
    }
    const lineGeo = new THREE.CylinderGeometry(0.025, 0.025, 1, 6, 1, true);
    lineGeo.translate(0, 0.5, 0);
    const lineMat = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.8,
    });
    const lineMesh = new THREE.Mesh(lineGeo, lineMat);
    this.scene.add(lineMesh);

    this.grappleState = {
      active: true,
      target: hit.point.clone(),
      bot: hit.bot,
      line: lineMesh,
      timer: 1.35,
    };
    this.player.jumps = 0;
    return true;
  }

  private updateGrapple(dt: number) {
    if (this.grappleCooldown > 0) this.grappleCooldown = Math.max(0, this.grappleCooldown - dt);
    const g = this.grappleState;
    if (!g.active) return;

    g.timer -= dt;
    if (g.bot && g.bot.alive) {
      g.target.set(g.bot.pos.x, g.bot.pos.y + g.bot.height * 0.6, g.bot.pos.z);
    }
    const p = this.player;
    const toTarget = g.target.clone().sub(new THREE.Vector3(p.pos.x, p.pos.y + 1, p.pos.z));
    const dist = toTarget.length();

    if (dist < 2.2 || g.timer <= 0 || this.input.has("space")) {
      g.active = false;
      p.vel.y = Math.max(p.vel.y, 6.2);
      p.jumps = 0;
      if (g.bot && g.bot.alive && dist < 3.5) {
        this.damageBot(g.bot, 55, true);
        this.shake(0.26);
      }
      if (g.line) {
        g.line.removeFromParent();
        g.line.geometry.dispose();
        g.line = null;
      }
      return;
    }

    const dir = toTarget.normalize();
    const speed = 26;
    p.vel.set(dir.x * speed, dir.y * speed + 2.2, dir.z * speed);

    if (g.line) {
      const start = this.eyePos.add(new THREE.Vector3(0, -0.25, 0));
      const delta = g.target.clone().sub(start);
      const len = delta.length();
      g.line.position.copy(start);
      g.line.scale.set(1, len, 1);
      g.line.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
    }
  }

  /* ---------------------------------------------------------------- world */

  /** Point camera yaw toward world coordinate `(targetX, targetZ)` */
  lookAt(targetX: number, targetZ: number) {
    const dx = targetX - this.player.pos.x;
    const dz = targetZ - this.player.pos.z;
    this.player.yaw = Math.atan2(-dx, -dz);
    this.player.pitch = 0;
  }

  private makeSky(top: number, bottom: number) {
    const geo = new THREE.SphereGeometry(700, 28, 18);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTop: { value: new THREE.Color(top) },
        uBottom: { value: new THREE.Color(bottom) },
      },
      vertexShader:
        "varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader:
        "uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vPos; void main(){ float h = clamp(normalize(vPos).y * 0.5 + 0.5, 0.0, 1.0); gl_FragColor = vec4(mix(uBottom, uTop, pow(h, 0.72)), 1.0); }",
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = -10;
    mesh.frustumCulled = false;
    return mesh;
  }

  addBox(spec: BoxSpec): THREE.Mesh {
    const geo = new THREE.BoxGeometry(spec.w, spec.h, spec.d);
    let tex: THREE.CanvasTexture | undefined;
    if (spec.texture !== "none" && !spec.emissive) {
      if (spec.texture) tex = this.textures[spec.texture];
      else if (spec.h <= 0.9 && spec.w > 3) tex = this.textures.roof;
      else if (spec.h >= 2) tex = this.textures.stone;
      else tex = this.textures.wood;
    }
    const mat = new THREE.MeshStandardMaterial({
      color: spec.color ?? 0x9ca3af,
      map: tex ?? null,
      roughness: spec.roughness ?? 0.82,
      metalness: spec.metalness ?? 0.08,
      emissive: spec.emissive ?? 0x000000,
      emissiveIntensity: spec.emissiveIntensity ?? 1,
      transparent: spec.opacity !== undefined && spec.opacity < 1,
      opacity: spec.opacity ?? 1,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(spec.x, spec.y, spec.z);
    if (spec.rotationY) mesh.rotation.y = spec.rotationY;
    mesh.castShadow = spec.shadow !== false;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.worldMeshes.push(mesh);
    if (spec.collide !== false) {
      const collider: AABB = {
        minX: spec.x - spec.w / 2,
        maxX: spec.x + spec.w / 2,
        minY: spec.y - spec.h / 2,
        maxY: spec.y + spec.h / 2,
        minZ: spec.z - spec.d / 2,
        maxZ: spec.z + spec.d / 2,
      };
      this.colliders.push(collider);
      mesh.userData.collider = collider;
    }
    return mesh;
  }

  removeCollider(mesh: THREE.Mesh) {
    const collider = mesh.userData.collider as AABB | undefined;
    if (!collider) return;
    const idx = this.colliders.indexOf(collider);
    if (idx >= 0) this.colliders.splice(idx, 1);
    mesh.userData.collider = undefined;
  }

  addGround(size = 400, color = 0x6b7f5a, y = 0, texture = false): THREE.Mesh {
    const geo = new THREE.BoxGeometry(size, 2, size);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.94, metalness: 0 });
    if (texture) {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 128, 128);
        ctx.strokeStyle = "rgba(0,0,0,0.08)";
        ctx.lineWidth = 2;
        ctx.strokeRect(2, 2, 124, 124);
        for (let i = 0; i < 650; i++) {
          ctx.fillStyle = i % 2 ? "rgba(0,0,0,0.11)" : "rgba(255,255,255,0.06)";
          ctx.fillRect(Math.random() * 128, Math.random() * 128, 2, 2);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(size / 5, size / 5);
      mat.map = tex;
    }
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, y - 1, 0);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.worldMeshes.push(mesh);
    this.colliders.push({
      minX: -size / 2,
      maxX: size / 2,
      minY: y - 2,
      maxY: y,
      minZ: -size / 2,
      maxZ: size / 2,
    });
    return mesh;
  }

  addMesh(obj: THREE.Object3D) {
    this.scene.add(obj);
    return obj;
  }

  addColliderBounds(x: number, y: number, z: number, w: number, h: number, d: number) {
    this.colliders.push({
      minX: x - w / 2,
      maxX: x + w / 2,
      minY: y - h / 2,
      maxY: y + h / 2,
      minZ: z - d / 2,
      maxZ: z + d / 2,
    });
  }

  surfaceY(x: number, z: number, fromY = 80): number {
    let top = 0;
    for (const c of this.colliders) {
      if (x < c.minX || x > c.maxX || z < c.minZ || z > c.maxZ) continue;
      if (c.maxY <= fromY && c.maxY > top) top = c.maxY;
    }
    return top;
  }

  isBlocked(x: number, y: number, z: number, radius: number, height: number): boolean {
    this.probe.set(x, y, z);
    return this.overlaps(this.boxFor(this.probe, radius, height, this.scratch));
  }

  addTorch(color = 0xffb066, intensity = 14, distance = 25) {
    this.torch = new THREE.PointLight(color, intensity, distance, 1.5);
    this.torch.position.set(0, 1.5, 0);
    this.scene.add(this.torch);
    return this.torch;
  }

  /* ---------------------------------------------------------------- bots */

  addBot(options: {
    pos: THREE.Vector3;
    health?: number;
    speed?: number;
    damage?: number;
    attackRange?: number;
    attackCooldown?: number;
    color?: number;
    radius?: number;
    height?: number;
    kind?: string;
    ranged?: BotRanged | null;
    gravity?: boolean;
    elite?: boolean;
  }): Bot {
    const radius = options.radius ?? 0.45;
    const height = options.height ?? 1.82;
    const color = options.color ?? 0xb91c1c;
    const group = new THREE.Group();
    const proceduralRoot = new THREE.Group();
    group.add(proceduralRoot);

    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.48,
      metalness: 0.25,
    });

    // Articulated Wuxia robe & armor torso
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(radius * 0.88, Math.max(height - radius * 2 - 0.35, 0.25), 8, 12),
      mat,
    );
    body.position.y = height * 0.48;
    body.castShadow = true;
    proceduralRoot.add(body);

    // Shoulder armor pads (肩甲) + sash
    const armorMat = new THREE.MeshStandardMaterial({
      color: options.elite ? 0xf59e0b : 0x1f2937,
      metalness: 0.75,
      roughness: 0.28,
    });
    for (const side of [-1, 1]) {
      const shoulder = new THREE.Mesh(
        new THREE.BoxGeometry(radius * 0.72, 0.2, radius * 0.9),
        armorMat,
      );
      shoulder.position.set(side * radius * 0.95, height * 0.72, 0);
      shoulder.rotation.z = -side * 0.28;
      proceduralRoot.add(shoulder);
    }

    const coreEmblem = new THREE.Mesh(
      new THREE.OctahedronGeometry(radius * 0.28, 0),
      new THREE.MeshStandardMaterial({
        color: options.elite ? 0xfbbf24 : 0x38bdf8,
        emissive: options.elite ? 0xf59e0b : 0x0ea5e9,
        emissiveIntensity: 1.5,
      }),
    );
    coreEmblem.position.set(0, height * 0.62, radius * 0.82);
    proceduralRoot.add(coreEmblem);

    const headMat = new THREE.MeshStandardMaterial({
      color: 0xf1d6b8,
      roughness: 0.65,
    });
    const head = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.68, 12, 10), headMat);
    head.position.y = height - 0.14;
    head.castShadow = true;
    proceduralRoot.add(head);

    const hat = new THREE.Mesh(
      new THREE.ConeGeometry(radius * 1.55, 0.38, 14),
      armorMat,
    );
    hat.position.y = height + 0.1;
    hat.castShadow = true;
    proceduralRoot.add(hat);

    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: options.elite ? 0xfbbf24 : 0xff4d4d,
      emissiveIntensity: 2.2,
    });
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.13, 8, 8), eyeMat);
      eye.position.set(side * radius * 0.26, height - 0.12, radius * 0.62);
      proceduralRoot.add(eye);
    }

    const leftArm = new THREE.Group();
    leftArm.position.set(-radius * 1.05, height * 0.66, 0);
    const leftLimb = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.09, 0.62, 8),
      mat,
    );
    leftLimb.position.y = -0.26;
    leftArm.add(leftLimb);
    proceduralRoot.add(leftArm);

    const rightArm = new THREE.Group();
    rightArm.position.set(radius * 1.05, height * 0.66, 0);
    const rightLimb = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.09, 0.62, 8),
      mat,
    );
    rightLimb.position.y = -0.26;
    rightArm.add(rightLimb);

    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 1.25, 0.14),
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.92,
        roughness: 0.18,
        emissive: options.ranged ? 0xa855f7 : 0x38bdf8,
        emissiveIntensity: 0.45,
      }),
    );
    blade.position.set(0, -0.35, 0.42);
    blade.rotation.x = Math.PI / 2.6;
    rightArm.add(blade);
    proceduralRoot.add(rightArm);

    // 3D floating health bar above head
    const hpBarGroup = new THREE.Group();
    hpBarGroup.position.y = height + 0.55;
    const bgBar = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 0.13),
      new THREE.MeshBasicMaterial({ color: 0x090d16, side: THREE.DoubleSide }),
    );
    hpBarGroup.add(bgBar);
    const hpBarFill = new THREE.Mesh(
      new THREE.PlaneGeometry(1.04, 0.09),
      new THREE.MeshBasicMaterial({
        color: options.elite ? 0xf59e0b : 0xef4444,
        side: THREE.DoubleSide,
      }),
    );
    hpBarFill.position.z = 0.01;
    hpBarGroup.add(hpBarFill);
    group.add(hpBarGroup);

    group.position.copy(options.pos);
    this.scene.add(group);

    const bot: Bot = {
      kind: options.kind ?? "刀客",
      group,
      mat,
      rightArm,
      leftArm,
      hpBarFill,
      hpBarGroup,
      pos: options.pos.clone(),
      vel: new THREE.Vector3(),
      health: options.health ?? 100,
      maxHealth: options.health ?? 100,
      speed: options.speed ?? 4.2,
      damage: options.damage ?? 12,
      attackRange: options.attackRange ?? 2.2,
      attackCooldown: options.attackCooldown ?? 1.1,
      cooldown: 0,
      radius,
      height,
      color,
      alive: true,
      gravity: options.gravity ?? true,
      onGround: false,
      ranged: options.ranged ?? null,
      rangedTimer: Math.random() * 1.5,
      flash: 0,
      bobPhase: Math.random() * Math.PI * 2,
      elite: options.elite ?? false,
      los: true,
      losTimer: 0,
      proceduralRoot,
      data: {},
    };
    this.bots.push(bot);
    if (this.gltfSoldier) {
      this.attachSoldierToBot(bot);
    }
    return bot;
  }

  removeBot(bot: Bot) {
    bot.alive = false;
    bot.group.removeFromParent();
    bot.group.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
    });
    const idx = this.bots.indexOf(bot);
    if (idx >= 0) this.bots.splice(idx, 1);
  }

  aliveBots(): Bot[] {
    return this.bots.filter((b) => b.alive);
  }

  /* ------------------------------------------------------------- pickups */

  addPickup(options: {
    pos: THREE.Vector3;
    kind: string;
    label?: string;
    color?: number;
    size?: number;
    radius?: number;
    onPickup: (pickup: Pickup) => void;
  }): Pickup {
    const color = options.color ?? 0xfbbf24;
    const size = options.size ?? 0.34;
    const group = new THREE.Group();
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(size, 0),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.4,
        roughness: 0.25,
      }),
    );
    group.add(core);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(size * 1.65, size * 0.11, 6, 20),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: color,
        emissiveIntensity: 0.9,
      }),
    );
    ring.rotation.x = Math.PI / 2.2;
    group.add(ring);
    group.position.copy(options.pos);
    this.scene.add(group);

    const pickup: Pickup = {
      mesh: group,
      pos: options.pos.clone(),
      kind: options.kind,
      radius: options.radius ?? 1.5,
      active: true,
      onPickup: options.onPickup,
      label: options.label ?? options.kind,
    };
    this.pickups.push(pickup);
    return pickup;
  }

  removePickup(pickup: Pickup) {
    pickup.active = false;
    pickup.mesh.removeFromParent();
    const idx = this.pickups.indexOf(pickup);
    if (idx >= 0) this.pickups.splice(idx, 1);
  }

  /* ---------------------------------------------------------- projectiles */

  spawnProjectile(options: {
    pos: THREE.Vector3;
    dir: THREE.Vector3;
    speed: number;
    damage: number;
    owner: "player" | "bot";
    color?: number;
    gravity?: number;
    radius?: number;
    life?: number;
    size?: number;
    homing?: number;
    onHit?: Projectile["onHit"];
  }) {
    const size = options.size ?? 0.11;
    const color = options.color ?? 0xffe08a;
    const group = new THREE.Group();
    const head = new THREE.Mesh(
      new THREE.ConeGeometry(size * 0.95, size * 3.8, 6),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.9,
        roughness: 0.25,
      }),
    );
    head.rotation.x = Math.PI / 2;
    group.add(head);
    group.position.copy(options.pos);
    const normDir = options.dir.clone().normalize();
    group.lookAt(options.pos.clone().add(normDir));
    this.scene.add(group);

    if (options.owner === "player") {
      this.triggerWeaponRecoil(0.6);
    }

    this.projectiles.push({
      mesh: group,
      pos: options.pos.clone(),
      vel: normDir.multiplyScalar(options.speed),
      gravity: options.gravity ?? 0,
      damage: options.damage,
      radius: options.radius ?? 0.34,
      life: options.life ?? 4,
      owner: options.owner,
      color,
      homing: options.homing ?? 0,
      onHit: options.onHit,
    });
  }

  /* ------------------------------------------------------------------ fx */

  tracer(from: THREE.Vector3, to: THREE.Vector3, color = 0xffe08a, thickness = 0.035) {
    const dir = this.tmpVec.copy(to).sub(from);
    const len = dir.length();
    if (len < 0.01) return;
    const geo = new THREE.CylinderGeometry(thickness, thickness, len, 6, 1, true);
    geo.translate(0, len / 2, 0);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(from);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    this.scene.add(mesh);
    this.fx.push({
      obj: mesh,
      life: 0.12,
      maxLife: 0.12,
      gravity: 0,
      fadeScale: false,
      baseScale: 1,
      sharedGeometry: false,
    });
  }

  burst(pos: THREE.Vector3, color = 0xff5533, count = 14, speed = 5, size = 0.09, gravity = 9) {
    for (let i = 0; i < count; i++) {
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
      const mesh = new THREE.Mesh(this.particleGeo, mat);
      mesh.scale.setScalar(Math.max(0.02, size));
      mesh.position.copy(pos);
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 1.25,
        (Math.random() - 0.5) * 2,
      )
        .normalize()
        .multiplyScalar(speed * (0.45 + Math.random() * 0.75));
      this.scene.add(mesh);
      this.fx.push({
        obj: mesh,
        life: 0.55 + Math.random() * 0.35,
        maxLife: 0.9,
        vel,
        gravity,
        fadeScale: true,
        baseScale: Math.max(0.02, size),
        sharedGeometry: true,
      });
    }
  }

  ring(pos: THREE.Vector3, color = 0xffffff, size = 1) {
    const geo = new THREE.RingGeometry(size * 0.7, size, 24);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mesh.lookAt(this.camera.position);
    this.scene.add(mesh);
    this.fx.push({
      obj: mesh,
      life: 0.32,
      maxLife: 0.32,
      gravity: 0,
      fadeScale: true,
      baseScale: 1,
      sharedGeometry: false,
    });
  }

  shake(amount: number) {
    this.shakeAmt = Math.min(this.shakeAmt + amount, 1.1);
  }

  addDamagePopup(worldPos: THREE.Vector3, amount: number, crit = false, label?: string) {
    const projected = worldPos.clone().project(this.camera);
    if (projected.z > 1) return;
    const x = THREE.MathUtils.clamp((projected.x * 0.5 + 0.5) * 100 + (Math.random() - 0.5) * 5, 12, 88);
    const y = THREE.MathUtils.clamp((-projected.y * 0.5 + 0.5) * 100 - 4, 15, 82);
    this.popups.push({
      id: this.popupSeq++,
      x,
      y,
      amount: Math.round(amount),
      crit,
      label,
      ttl: 0.85,
    });
    if (this.popups.length > 8) this.popups.shift();
    this.hudDirty = true;
  }

  /* ------------------------------------------------------------- queries */

  get forward(): THREE.Vector3 {
    return new THREE.Vector3(
      -Math.sin(this.player.yaw) * Math.cos(this.player.pitch),
      Math.sin(this.player.pitch),
      -Math.cos(this.player.yaw) * Math.cos(this.player.pitch),
    );
  }

  get eyePos(): THREE.Vector3 {
    return new THREE.Vector3(
      this.player.pos.x,
      this.player.pos.y + this.eyeHeight - this.stepSmooth,
      this.player.pos.z,
    );
  }

  raycast(origin: THREE.Vector3, dir: THREE.Vector3, maxDist: number): RayHit | null {
    this.raycaster.set(origin, dir);
    this.raycaster.far = maxDist;
    const hits = this.raycaster.intersectObjects(this.worldMeshes, false);
    let best: RayHit | null = null;
    if (hits.length > 0) {
      best = {
        point: hits[0].point.clone(),
        bot: null,
        mesh: hits[0].object as THREE.Mesh,
        distance: hits[0].distance,
      };
    }
    this.ray.set(origin, dir);
    for (const bot of this.bots) {
      if (!bot.alive) continue;
      this.tmpBox.setFromCenterAndSize(
        this.tmpVec2.set(bot.pos.x, bot.pos.y + bot.height * 0.5, bot.pos.z),
        this.tmpVec3.set(bot.radius * 2.25, bot.height, bot.radius * 2.25),
      );
      const point = this.ray.intersectBox(this.tmpBox, new THREE.Vector3());
      if (point) {
        const dist = point.distanceTo(origin);
        if (dist <= maxDist && (!best || dist < best.distance)) {
          best = { point, bot, mesh: null, distance: dist };
        }
      }
    }
    return best;
  }

  hitscanShoot(options: {
    damage: number;
    spread?: number;
    range?: number;
    color?: number;
    headshotMul?: number;
  }): RayHit | null {
    this.triggerWeaponRecoil(0.75);
    const origin = this.eyePos;
    const dir = this.forward;
    const spread = options.spread ?? 0;
    if (spread > 0) {
      dir.x += (Math.random() - 0.5) * spread;
      dir.y += (Math.random() - 0.5) * spread;
      dir.z += (Math.random() - 0.5) * spread;
      dir.normalize();
    }
    const hit = this.raycast(origin, dir, options.range ?? 180);
    const end = hit ? hit.point : origin.clone().add(dir.multiplyScalar(options.range ?? 180));
    const muzzle = origin
      .clone()
      .add(dir.clone().multiplyScalar(0.5))
      .add(new THREE.Vector3(Math.cos(this.player.yaw) * 0.22, -0.18, -Math.sin(this.player.yaw) * 0.22));
    this.tracer(muzzle, end, options.color ?? 0xfff1a8, 0.026);
    if (hit) {
      if (hit.bot) {
        const headY = hit.bot.pos.y + hit.bot.height * 0.76;
        const head = hit.point.y >= headY;
        const dmg = options.damage * (head ? options.headshotMul ?? 1.8 : 1);
        this.damageBot(hit.bot, dmg, head);
        this.burst(hit.point, head ? 0xffe066 : 0xff5544, head ? 18 : 10, 4.5, 0.07);
        this.hitKey += 1;
        this.flushHud(true);
      } else {
        this.burst(hit.point, 0xbbbbbb, 6, 3, 0.05);
      }
    }
    return hit;
  }

  meleeSwing(options: { damage: number; range?: number; arc?: number; waveColor?: number }): Bot | null {
    this.triggerWeaponSwing();
    const range = options.range ?? 3.3;
    const arc = options.arc ?? 0.85;
    const forward = this.forward;
    forward.y = 0;
    forward.normalize();

    // Emit visible sword-qi crescent slash wave
    this.spawnSlashWave(options.waveColor ?? 0x38bdf8, Math.round(options.damage * 0.55), 34);

    let target: Bot | null = null;
    let bestDist = Infinity;
    for (const bot of this.bots) {
      if (!bot.alive) continue;
      const dx = bot.pos.x - this.player.pos.x;
      const dz = bot.pos.z - this.player.pos.z;
      const dy = Math.abs(bot.pos.y + bot.height * 0.5 - (this.player.pos.y + this.eyeHeight * 0.6));
      const dist = Math.hypot(dx, dz);
      if (dist > range + bot.radius || dy > 2.5) continue;
      const dot = (dx * forward.x + dz * forward.z) / (dist || 1);
      if (dot < Math.cos(arc)) continue;
      if (dist < bestDist) {
        bestDist = dist;
        target = bot;
      }
    }
    if (target) {
      this.damageBot(target, options.damage, true);
      this.burst(
        this.tmpVec.set(target.pos.x, target.pos.y + target.height * 0.6, target.pos.z).clone(),
        0xffcc55,
        16,
        5,
      );
      this.hitKey += 1;
      this.shake(0.24);
      this.flushHud(true);
    } else {
      this.shake(0.07);
    }
    return target;
  }

  /* --------------------------------------------------------------- combat */

  damageBot(bot: Bot, amount: number, crit = false) {
    if (!bot.alive) return;
    bot.health -= amount;
    bot.flash = 1;
    this.sfx("hit", 0.15);
    this.addDamagePopup(
      new THREE.Vector3(bot.pos.x, bot.pos.y + bot.height * 0.85, bot.pos.z),
      amount,
      crit,
    );
    if (bot.health <= 0) {
      this.burst(
        this.tmpVec.set(bot.pos.x, bot.pos.y + bot.height * 0.5, bot.pos.z).clone(),
        bot.color,
        26,
        7,
        0.1,
      );
      this.streakCount += 1;
      this.streakTimer = 7.5;
      const banners = [
        "",
        "⚔️ 首斩达成 · First Blood",
        "🔥 双杀 · Double Kill!",
        "⚡ 三连决胜 · Triple Kill!",
        "👑 四象破军 · Ultra Kill!",
        "🐉 天下无双 · Rampage!",
      ];
      this.bannerText = banners[Math.min(this.streakCount, banners.length - 1)] || `🐉 连斩 ×${this.streakCount}!`;
      this.bannerTimer = 2.6;
      bot.onDeath?.(bot);
      this.removeBot(bot);
    }
  }

  damagePlayer(amount: number) {
    if (!this.player.alive || this.state !== "playing") return;
    if (this.player.invuln > 0) return;
    let remaining = amount;
    if (this.player.armor > 0) {
      const absorbed = Math.min(this.player.armor, remaining * 0.65);
      this.player.armor = Math.max(0, this.player.armor - absorbed);
      remaining -= absorbed;
    }
    this.player.health -= remaining;
    this.player.invuln = 0.14;
    this.hurtKey += 1;
    this.shake(Math.min(0.42, 0.1 + amount / 95));
    this.sfx("hurt", 0.18);
    this.flushHud(true);
    if (this.player.health <= 0) {
      this.player.health = 0;
      this.player.alive = false;
      this.onPlayerDeath?.(this);
    }
  }

  healPlayer(amount: number) {
    this.player.health = Math.min(this.player.maxHealth, this.player.health + amount);
    this.pickupKey += 1;
    this.flushHud(true);
  }

  /* ------------------------------------------------------------------ hud */

  setHud(partial: HudState) {
    this.hud = { ...this.hud, ...partial };
    this.hudDirty = true;
  }

  message(text: string) {
    this.hud.message = text;
    this.hudDirty = true;
    this.hudTimer = 0;
  }

  private buildRadarState() {
    const blips: RadarBlip[] = [];
    const r = this.radarRange;
    for (const bot of this.bots) {
      if (!bot.alive) continue;
      const dx = bot.pos.x - this.player.pos.x;
      const dz = bot.pos.z - this.player.pos.z;
      if (Math.hypot(dx, dz) <= r * 1.15) {
        blips.push({ dx, dz, kind: bot.elite ? "boss" : "enemy" });
      }
    }
    for (const p of this.pickups) {
      if (!p.active) continue;
      const dx = p.pos.x - this.player.pos.x;
      const dz = p.pos.z - this.player.pos.z;
      if (Math.hypot(dx, dz) <= r * 1.15) {
        blips.push({ dx, dz, kind: "loot" });
      }
    }
    if (this.goalPos) {
      blips.push({
        dx: this.goalPos.x - this.player.pos.x,
        dz: this.goalPos.z - this.player.pos.z,
        kind: "goal",
      });
    }
    return {
      range: r,
      yaw: this.player.yaw,
      blips,
      zone: this.zoneInfo
        ? {
            dx: this.zoneInfo.center.x - this.player.pos.x,
            dz: this.zoneInfo.center.z - this.player.pos.z,
            radius: this.zoneInfo.radius,
          }
        : undefined,
    };
  }

  private flushHud(force = false) {
    if (!force && !this.hudDirty) return;
    const grappleAbility: AbilitySlot[] = this.grappleEnabled
      ? [
          {
            key: "E",
            name: "飞索钩锁",
            cooldown: this.grappleCooldown,
            maxCooldown: this.grappleMaxCooldown,
            active: this.grappleState.active,
          },
        ]
      : [];
    this.callbacks.setHud({
      ...this.hud,
      armor: Math.round(this.player.armor),
      maxArmor: this.player.maxArmor,
      hitKey: this.hitKey,
      hurtKey: this.hurtKey,
      pickupKey: this.pickupKey,
      banner: this.bannerText,
      radar: this.buildRadarState(),
      popups: this.popups.map((p) => ({
        id: p.id,
        x: p.x,
        y: p.y,
        amount: p.amount,
        crit: p.crit,
        label: p.label,
      })),
      abilities: [...grappleAbility, ...this.abilities],
      boss: this.bossHud,
    });
    this.hudDirty = false;
  }

  /* --------------------------------------------------------------- audio */

  sfx(kind: SfxName, volume = 0.2) {
    try {
      if (!this.audio) {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        this.audio = new Ctor();
      }
      const ctx = this.audio;
      if (ctx.state === "suspended") void ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      let dur = 0.12;
      switch (kind) {
        case "shoot":
          osc.type = "square";
          osc.frequency.setValueAtTime(720, now);
          osc.frequency.exponentialRampToValueAtTime(120, now + 0.11);
          dur = 0.11;
          break;
        case "melee":
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(260, now);
          osc.frequency.exponentialRampToValueAtTime(640, now + 0.09);
          dur = 0.12;
          break;
        case "grapple":
          osc.type = "triangle";
          osc.frequency.setValueAtTime(420, now);
          osc.frequency.exponentialRampToValueAtTime(1260, now + 0.18);
          dur = 0.19;
          break;
        case "hit":
          osc.type = "triangle";
          osc.frequency.setValueAtTime(980, now);
          dur = 0.06;
          break;
        case "hurt":
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(70, now + 0.2);
          dur = 0.2;
          break;
        case "jump":
          osc.type = "sine";
          osc.frequency.setValueAtTime(340, now);
          osc.frequency.exponentialRampToValueAtTime(620, now + 0.12);
          dur = 0.13;
          break;
        case "pickup":
          osc.type = "sine";
          osc.frequency.setValueAtTime(680, now);
          osc.frequency.setValueAtTime(1020, now + 0.07);
          dur = 0.16;
          break;
        case "die":
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(420, now);
          osc.frequency.exponentialRampToValueAtTime(60, now + 0.6);
          dur = 0.65;
          break;
        case "win":
          osc.type = "triangle";
          osc.frequency.setValueAtTime(523, now);
          osc.frequency.setValueAtTime(659, now + 0.12);
          osc.frequency.setValueAtTime(784, now + 0.24);
          osc.frequency.setValueAtTime(1046, now + 0.36);
          dur = 0.6;
          break;
        case "arrow":
          osc.type = "triangle";
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(900, now + 0.16);
          dur = 0.18;
          break;
        case "reload":
          osc.type = "square";
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.setValueAtTime(330, now + 0.08);
          dur = 0.18;
          break;
        case "spawn":
          osc.type = "sine";
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.exponentialRampToValueAtTime(420, now + 0.3);
          dur = 0.32;
          break;
        case "tick":
          osc.type = "square";
          osc.frequency.setValueAtTime(1200, now);
          dur = 0.05;
          break;
      }
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + dur);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    } catch {
      /* ignore */
    }
  }

  /* ------------------------------------------------------------ lifecycle */

  requestStart() {
    if (this.state === "ended") return;
    if (this.fallbackMode) {
      if (this.state === "idle" || this.state === "paused") this.state = "playing";
      this.callbacks.onLockChange(true, true);
      return;
    }
    window.clearTimeout(this.lockTimer);
    this.lockTimer = window.setTimeout(() => {
      if (!this.disposed && document.pointerLockElement !== this.canvas) this.enableFallback();
    }, 380);
    try {
      const result = this.canvas.requestPointerLock() as unknown as Promise<void> | undefined;
      if (result && typeof result.catch === "function") {
        result.catch(() => this.enableFallback());
      }
    } catch {
      this.enableFallback();
    }
  }

  private enableFallback() {
    if (this.fallbackMode || this.disposed || this.state === "ended") return;
    window.clearTimeout(this.lockTimer);
    this.fallbackMode = true;
    this.canvas.style.cursor = "crosshair";
    if (this.state === "idle" || this.state === "paused") this.state = "playing";
    this.last = performance.now();
    this.callbacks.onLockChange(true, true);
  }

  private pauseGame() {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.input.clear();
    this.mouse.left = false;
    this.mouse.right = false;
    this.callbacks.onLockChange(false);
  }

  finish(result: "win" | "lose") {
    if (this.state === "ended") return;
    this.state = "ended";
    this.sfx(result === "win" ? "win" : "die", 0.25);
    if (document.pointerLockElement === this.canvas) document.exitPointerLock();
    this.flushHud(true);
  }

  private animate = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.animate);
    const now = performance.now();
    let dt = (now - this.last) / 1000;
    this.last = now;
    if (dt > 0.06) dt = 0.06;
    if (this.state === "playing") {
      this.update(dt);
    }
    this.renderFrame(dt);
  };

  private update(dt: number) {
    this.time += dt;
    this.frame += 1;
    if (this.player.invuln > 0) this.player.invuln -= dt;

    if (this.streakTimer > 0) {
      this.streakTimer -= dt;
      if (this.streakTimer <= 0) this.streakCount = 0;
    }
    if (this.bannerTimer > 0) {
      this.bannerTimer -= dt;
      if (this.bannerTimer <= 0) {
        this.bannerText = undefined;
        this.hudDirty = true;
      }
    }
    for (const p of [...this.popups]) {
      p.ttl -= dt;
      p.y -= dt * 16;
      if (p.ttl <= 0) {
        this.popups.splice(this.popups.indexOf(p), 1);
        this.hudDirty = true;
      }
    }

    this.updateGrapple(dt);
    this.updatePlayer(dt);
    for (const bot of [...this.bots]) this.updateBot(bot, dt);
    this.updateProjectiles(dt);
    this.updatePickups(dt);
    this.updateFx(dt);
    this.onUpdate?.(dt, this);

    this.hudTimer += dt;
    if (this.hud.message && this.hudTimer > 2.4) {
      this.hud.message = undefined;
      this.hudDirty = true;
    }
    if (this.hudTimer > 0.08) this.flushHud(true);
    if (this.player.pos.y < this.killY) {
      this.onFall?.(this);
    }
  }

  private updateViewmodel(dt: number) {
    const p = this.player;
    const speed = Math.hypot(p.vel.x, p.vel.z);
    const swayX = Math.sin(p.bobT * 4.8) * 0.018 * Math.min(1, speed / 5);
    const swayY = Math.abs(Math.cos(p.bobT * 9.6)) * 0.022 * Math.min(1, speed / 5);

    if (this.viewSwing > 0) {
      this.viewSwing = Math.max(0, this.viewSwing - dt * 4.6);
    }
    if (this.viewRecoil > 0) {
      this.viewRecoil = Math.max(0, this.viewRecoil - dt * 6.5);
    }

    const swingPhase = Math.sin(this.viewSwing * Math.PI);
    this.viewRoot.position.set(
      swayX - swingPhase * 0.24 * this.viewSwingDir,
      -swayY - swingPhase * 0.08,
      this.viewRecoil * 0.085,
    );
    this.viewRoot.rotation.set(
      -swingPhase * 0.85 + this.viewRecoil * 0.16 + (p.sprinting ? -0.15 : 0),
      swingPhase * 0.95 * this.viewSwingDir,
      -swingPhase * 0.55 * this.viewSwingDir,
    );

    if (this.viewKind === "flying-sword") {
      this.spiritSwords.forEach((s, i) => {
        const a = this.time * 3.4 + (i * Math.PI * 2) / 3;
        s.position.set(Math.cos(a) * 0.14, Math.sin(a) * 0.12, -this.viewRecoil * 0.25);
        s.rotation.z = a;
      });
    } else if (this.viewKind === "longbow") {
      const arrow = this.viewRoot.getObjectByName("nockedArrow");
      if (arrow) {
        arrow.position.z = -0.05 + this.bowCharge * 0.22;
      }
    } else if (this.viewKind === "torch-blade") {
      const flame = this.viewRoot.getObjectByName("torchFlame");
      if (flame) {
        flame.scale.setScalar(0.92 + Math.sin(this.time * 18) * 0.16);
      }
    }
  }

  private renderFrame(dt: number) {
    const cam = this.camera;
    const p = this.player;
    const bob = p.onGround ? Math.sin(p.bobT * 9.5) * 0.042 * (p.sprinting ? 1.35 : 1) : 0;
    cam.position.set(p.pos.x, p.pos.y + this.eyeHeight - this.stepSmooth + bob, p.pos.z);
    cam.rotation.set(p.pitch, p.yaw, Math.sin(p.bobT * 4.75) * 0.007);
    if (this.shakeAmt > 0.001) {
      cam.position.x += (Math.random() - 0.5) * this.shakeAmt * 0.3;
      cam.position.y += (Math.random() - 0.5) * this.shakeAmt * 0.3;
      cam.rotation.z += (Math.random() - 0.5) * this.shakeAmt * 0.045;
      this.shakeAmt = Math.max(0, this.shakeAmt - dt * 2.5);
    }
    if (this.stepSmooth > 0) this.stepSmooth = Math.max(0, this.stepSmooth - dt * 3.5);
    if (this.torch) {
      this.torch.position.copy(cam.position).add(this.forward.multiplyScalar(0.45));
      this.torch.intensity = 13 + Math.sin(this.time * 12) * 1.4;
    }
    if (this.oceanWater) {
      const uniforms = this.oceanWater.material.uniforms;
      if (uniforms && uniforms["time"]) {
        uniforms["time"].value += dt * 0.65;
      }
    }
    this.updateViewmodel(dt);
    this.sun.position.set(p.pos.x + 45, 70, p.pos.z + 28);
    this.sun.target.position.set(p.pos.x, 0, p.pos.z);
    this.composer.render();
  }

  /* -------------------------------------------------------- player motion */

  private boxFor(pos: THREE.Vector3, radius: number, height: number, out: AABB): AABB {
    out.minX = pos.x - radius;
    out.maxX = pos.x + radius;
    out.minY = pos.y;
    out.maxY = pos.y + height;
    out.minZ = pos.z - radius;
    out.maxZ = pos.z + radius;
    return out;
  }

  private scratch: AABB = { minX: 0, minY: 0, minZ: 0, maxX: 0, maxY: 0, maxZ: 0 };

  private overlaps(box: AABB): boolean {
    for (const c of this.colliders) {
      if (
        box.minX < c.maxX &&
        box.maxX > c.minX &&
        box.minY < c.maxY &&
        box.maxY > c.minY &&
        box.minZ < c.maxZ &&
        box.maxZ > c.minZ
      ) {
        return true;
      }
    }
    return false;
  }

  private groundTop(pos: THREE.Vector3, radius: number, maxY: number): number {
    let top = -Infinity;
    for (const c of this.colliders) {
      if (pos.x + radius <= c.minX || pos.x - radius >= c.maxX) continue;
      if (pos.z + radius <= c.minZ || pos.z - radius >= c.maxZ) continue;
      if (c.maxY <= maxY && c.maxY > top) top = c.maxY;
    }
    return top;
  }

  private moveActor(
    actor: { pos: THREE.Vector3; vel: THREE.Vector3; onGround: boolean },
    radius: number,
    height: number,
    dt: number,
    stepUp: boolean,
  ) {
    const p = actor.pos;
    const wasGrounded = actor.onGround;
    const allowStep = stepUp && wasGrounded;
    const dx = actor.vel.x * dt;
    const dz = actor.vel.z * dt;

    p.x += dx;
    if (this.overlaps(this.boxFor(p, radius, height, this.scratch))) {
      const stepped = allowStep && this.tryStep(p, radius, height);
      if (!stepped) {
        p.x -= dx;
        actor.vel.x = 0;
      }
    }
    p.z += dz;
    if (this.overlaps(this.boxFor(p, radius, height, this.scratch))) {
      const stepped = allowStep && this.tryStep(p, radius, height);
      if (!stepped) {
        p.z -= dz;
        actor.vel.z = 0;
      }
    }

    const dy = actor.vel.y * dt;
    p.y += dy;
    actor.onGround = false;
    if (this.overlaps(this.boxFor(p, radius, height, this.scratch))) {
      if (dy <= 0) {
        p.y -= dy;
        const top = this.groundTop(p, radius, p.y + 0.45);
        if (top > -Infinity) p.y = top;
        actor.onGround = true;
        actor.vel.y = 0;
      } else {
        p.y -= dy;
        actor.vel.y = 0;
      }
    } else if (dy <= 0 && wasGrounded) {
      const top = this.groundTop(p, radius, p.y + 0.28);
      if (top > -Infinity && p.y - top < 0.28) {
        p.y = top;
        actor.onGround = true;
        actor.vel.y = 0;
      }
    }
  }

  private tryStep(pos: THREE.Vector3, radius: number, height: number): boolean {
    const lift = 0.62;
    const y = pos.y;
    pos.y = y + lift;
    const free = !this.overlaps(this.boxFor(pos, radius, height, this.scratch));
    if (!free) {
      pos.y = y;
      return false;
    }
    this.stepSmooth = Math.max(this.stepSmooth, lift);
    return true;
  }

  private tryJump() {
    const p = this.player;
    if (!p.alive) return;
    if (this.grappleState.active) {
      this.grappleState.active = false;
      p.vel.y = this.jumpPower * 1.05;
      p.jumps = 1;
      this.sfx("jump", 0.14);
      return;
    }
    if (p.onGround) {
      p.vel.y = this.jumpPower;
      p.jumps = 1;
      p.onGround = false;
      this.sfx("jump", 0.1);
    } else if (p.jumps < this.maxJumps) {
      p.vel.y = this.jumpPower * 0.95;
      p.jumps += 1;
      this.sfx("jump", 0.12);
      this.ring(new THREE.Vector3(p.pos.x, p.pos.y + 0.1, p.pos.z), 0x38bdf8, 0.95);
    }
  }

  private updatePlayer(dt: number) {
    const p = this.player;
    if (!p.alive) {
      p.vel.set(0, p.vel.y - this.gravity * dt, 0);
      this.moveActor(p, this.playerRadius, this.playerHeight, dt, false);
      return;
    }

    // Optional keyboard look (Arrow keys) + Fallback screen-edge continuous turn
    const turnInput = (this.input.has("lookRight") ? 1 : 0) - (this.input.has("lookLeft") ? 1 : 0);
    const pitchInput = (this.input.has("lookUp") ? 1 : 0) - (this.input.has("lookDown") ? 1 : 0);
    if (turnInput !== 0) p.yaw -= turnInput * 2.1 * dt;
    if (pitchInput !== 0) {
      const limit = Math.PI / 2 - 0.04;
      p.pitch = THREE.MathUtils.clamp(p.pitch + pitchInput * 1.5 * dt, -limit, limit);
    }
    if (this.fallbackMode && Math.abs(this.cursorNormX) > 0.76) {
      const edgeFactor = (Math.abs(this.cursorNormX) - 0.76) / 0.24;
      p.yaw -= Math.sign(this.cursorNormX) * edgeFactor * 1.85 * dt;
    }

    if (this.grappleState.active) {
      this.moveActor(p, this.playerRadius, this.playerHeight, dt, true);
      return;
    }

    // FIXED Three.js Right-Handed Camera Axes:
    // Camera Forward (-Z local) = (-sin(yaw), 0, -cos(yaw))
    // Camera Right   (+X local) = ( cos(yaw), 0, -sin(yaw))
    const forwardInput = (this.input.has("w") ? 1 : 0) - (this.input.has("s") ? 1 : 0);
    const rightInput = (this.input.has("d") ? 1 : 0) - (this.input.has("a") ? 1 : 0);

    const wantSprint = this.input.has("shift") && (forwardInput !== 0 || rightInput !== 0);
    p.sprinting = wantSprint && p.stamina > 1;
    if (p.sprinting) p.stamina = Math.max(0, p.stamina - 22 * dt);
    else p.stamina = Math.min(100, p.stamina + 19 * dt);

    const speed =
      this.playerSpeed * (p.sprinting ? this.sprintMult : 1) * (p.onGround ? 1 : 0.95);
    const fx = -Math.sin(p.yaw);
    const fz = -Math.cos(p.yaw);
    const rx = Math.cos(p.yaw);
    const rz = -Math.sin(p.yaw);

    let wx = forwardInput * fx + rightInput * rx;
    let wz = forwardInput * fz + rightInput * rz;
    const len = Math.hypot(wx, wz);
    if (len > 0) {
      wx = (wx / len) * speed;
      wz = (wz / len) * speed;
    }
    const accel = p.onGround ? 16 : 7;
    p.vel.x += (wx - p.vel.x) * Math.min(1, accel * dt);
    p.vel.z += (wz - p.vel.z) * Math.min(1, accel * dt);
    p.vel.y -= this.gravity * dt;

    this.moveActor(p, this.playerRadius, this.playerHeight, dt, true);
    if (p.onGround) {
      p.jumps = 0;
      p.bobT += dt * Math.hypot(p.vel.x, p.vel.z) * 0.16;
    }
  }

  private updateBot(bot: Bot, dt: number) {
    if (!bot.alive) return;
    if (this.customBotUpdate) {
      this.customBotUpdate(bot, dt);
      if (bot.gravity) {
        bot.vel.y -= this.gravity * dt;
      }
      this.moveActor(bot, bot.radius, bot.height, dt, true);
      this.syncBot(bot, dt);
      return;
    }

    const p = this.player;
    const dx = p.pos.x - bot.pos.x;
    const dz = p.pos.z - bot.pos.z;
    const dy = p.pos.y - bot.pos.y;
    const dist = Math.hypot(dx, dz);

    bot.losTimer -= dt;
    if (bot.losTimer <= 0) {
      bot.losTimer = 0.22 + Math.random() * 0.2;
      const from = this.tmpVec.set(bot.pos.x, bot.pos.y + bot.height * 0.8, bot.pos.z);
      const to = this.tmpVec2
        .set(p.pos.x, p.pos.y + this.eyeHeight * 0.8, p.pos.z)
        .sub(from);
      const d = to.length();
      const hit = this.raycast(from, to.normalize(), d);
      bot.los = !hit || !!hit.bot || hit.distance >= d - 0.6;
    }

    const dirX = dist > 0.01 ? dx / dist : 0;
    const dirZ = dist > 0.01 ? dz / dist : 0;
    let moveX = 0;
    let moveZ = 0;
    if (dist > bot.attackRange * 0.85) {
      moveX = dirX * bot.speed;
      moveZ = dirZ * bot.speed;
    } else if (dist < bot.attackRange * 0.5) {
      moveX = -dirX * bot.speed * 0.4;
      moveZ = -dirZ * bot.speed * 0.4;
    }
    for (const other of this.bots) {
      if (other === bot || !other.alive) continue;
      const ox = bot.pos.x - other.pos.x;
      const oz = bot.pos.z - other.pos.z;
      const od = Math.hypot(ox, oz);
      if (od > 0.001 && od < bot.radius + other.radius + 0.5) {
        moveX += (ox / od) * bot.speed * 0.9;
        moveZ += (oz / od) * bot.speed * 0.9;
      }
    }
    if (bot.onGround && Math.hypot(moveX, moveZ) > 0.2) {
      const ahead = this.tmpVec.set(
        bot.pos.x + dirX * 0.7,
        bot.pos.y,
        bot.pos.z + dirZ * 0.7,
      );
      const blocked = this.overlaps(this.boxFor(ahead, bot.radius, bot.height, this.scratch));
      if (blocked) bot.vel.y = this.jumpPower * 0.75;
    }

    bot.vel.x = moveX;
    bot.vel.z = moveZ;
    if (bot.gravity) bot.vel.y -= this.gravity * dt;
    this.moveActor(bot, bot.radius, bot.height, dt, true);

    bot.cooldown -= dt;
    if (bot.ranged) {
      bot.rangedTimer -= dt;
      if (bot.rangedTimer <= 0 && bot.los && dist < 70 && Math.abs(dy) < 22) {
        bot.rangedTimer = bot.ranged.interval * (0.75 + Math.random() * 0.5);
        const from = new THREE.Vector3(bot.pos.x, bot.pos.y + bot.height * 0.75, bot.pos.z);
        const to = new THREE.Vector3(
          p.pos.x + (Math.random() - 0.5) * bot.ranged.spread,
          p.pos.y + this.eyeHeight * 0.6,
          p.pos.z + (Math.random() - 0.5) * bot.ranged.spread,
        );
        const dir = to.sub(from).normalize();
        this.spawnProjectile({
          pos: from,
          dir,
          speed: bot.ranged.speed,
          damage: bot.ranged.damage,
          owner: "bot",
          color: bot.ranged.color ?? 0xff4444,
          size: 0.12,
        });
        this.sfx("arrow", 0.09);
      }
    } else if (dist < bot.attackRange && Math.abs(dy) < 2.4 && bot.cooldown <= 0) {
      bot.cooldown = bot.attackCooldown;
      this.damagePlayer(bot.damage);
      bot.onAttack?.(bot);
      this.burst(
        new THREE.Vector3(p.pos.x, p.pos.y + 1.2, p.pos.z),
        bot.color,
        8,
        3,
        0.05,
      );
    }
    this.syncBot(bot, dt);
  }

  private syncBot(bot: Bot, dt: number) {
    bot.group.position.copy(bot.pos);
    const dx = this.player.pos.x - bot.pos.x;
    const dz = this.player.pos.z - bot.pos.z;
    if (Math.hypot(dx, dz) > 0.05) {
      bot.group.rotation.y = Math.atan2(dx, dz);
    }
    const speed = Math.hypot(bot.vel.x, bot.vel.z);
    bot.bobPhase += dt * (2.5 + speed * 1.6);
    if (bot.mixer && bot.actions) {
      bot.group.position.y = bot.pos.y;
      const desired: "idle" | "walk" | "run" =
        speed > 3.2 ? "run" : speed > 0.35 ? "walk" : "idle";
      if (bot.actions.current !== desired) {
        const prev = bot.actions[bot.actions.current ?? "idle"];
        const next = bot.actions[desired];
        if (next) {
          next.reset().fadeIn(0.18).play();
          prev?.fadeOut(0.18);
          bot.actions.current = desired;
        }
      }
      bot.mixer.update(dt);
    } else {
      bot.group.position.y =
        bot.pos.y + Math.abs(Math.sin(bot.bobPhase)) * Math.min(0.12, speed * 0.028);
      const swing =
        bot.cooldown > bot.attackCooldown * 0.6 ? -1.25 : Math.sin(bot.bobPhase) * 0.38;
      bot.rightArm.rotation.x = swing;
      bot.leftArm.rotation.x = -Math.sin(bot.bobPhase) * 0.35;
    }

    // Billboard overhead health bar toward player camera
    bot.hpBarGroup.lookAt(this.camera.position);
    const ratio = THREE.MathUtils.clamp(bot.health / bot.maxHealth, 0, 1);
    bot.hpBarFill.scale.x = Math.max(0.001, ratio);
    bot.hpBarFill.position.x = -(1 - ratio) * 0.52;

    if (bot.flash > 0) {
      bot.flash = Math.max(0, bot.flash - dt * 4);
      bot.mat.emissive.setRGB(bot.flash * 0.9, bot.flash * 0.25, bot.flash * 0.2);
    }
  }

  private updateProjectiles(dt: number) {
    for (const proj of [...this.projectiles]) {
      proj.life -= dt;
      if (proj.gravity) proj.vel.y -= proj.gravity * dt;

      // Subtle spirit-sword homing toward nearest enemy in front
      if (proj.owner === "player" && proj.homing && proj.homing > 0) {
        let nearest: Bot | null = null;
        let bestD = 22;
        for (const bot of this.bots) {
          if (!bot.alive) continue;
          const d = proj.pos.distanceTo(bot.pos);
          if (d < bestD) {
            bestD = d;
            nearest = bot;
          }
        }
        if (nearest) {
          const desired = new THREE.Vector3(
            nearest.pos.x - proj.pos.x,
            nearest.pos.y + nearest.height * 0.6 - proj.pos.y,
            nearest.pos.z - proj.pos.z,
          )
            .normalize()
            .multiplyScalar(proj.vel.length());
          proj.vel.lerp(desired, Math.min(1, proj.homing * dt));
        }
      }

      const prev = proj.pos.clone();
      proj.pos.addScaledVector(proj.vel, dt);
      proj.mesh.position.copy(proj.pos);
      proj.mesh.lookAt(proj.pos.clone().add(proj.vel));

      let consumed = false;
      if (proj.owner === "player") {
        for (const bot of this.bots) {
          if (!bot.alive) continue;
          if (
            proj.pos.x > bot.pos.x - bot.radius - proj.radius &&
            proj.pos.x < bot.pos.x + bot.radius + proj.radius &&
            proj.pos.z > bot.pos.z - bot.radius - proj.radius &&
            proj.pos.z < bot.pos.z + bot.radius + proj.radius &&
            proj.pos.y > bot.pos.y - proj.radius &&
            proj.pos.y < bot.pos.y + bot.height + proj.radius
          ) {
            const isCrit = proj.pos.y >= bot.pos.y + bot.height * 0.72;
            this.damageBot(bot, proj.damage * (isCrit ? 1.35 : 1), isCrit);
            this.burst(proj.pos, 0xffd166, 14, 5, 0.07);
            this.hitKey += 1;
            proj.onHit?.({ bot, point: proj.pos.clone() });
            consumed = true;
            break;
          }
        }
      } else {
        const p = this.player;
        if (
          this.player.alive &&
          proj.pos.x > p.pos.x - this.playerRadius - proj.radius &&
          proj.pos.x < p.pos.x + this.playerRadius + proj.radius &&
          proj.pos.z > p.pos.z - this.playerRadius - proj.radius &&
          proj.pos.z < p.pos.z + this.playerRadius + proj.radius &&
          proj.pos.y > p.pos.y - 0.2 &&
          proj.pos.y < p.pos.y + this.playerHeight + 0.2
        ) {
          this.damagePlayer(proj.damage);
          this.burst(proj.pos, 0xff5555, 12, 4, 0.06);
          proj.onHit?.({ point: proj.pos.clone() });
          consumed = true;
        }
      }

      if (!consumed) {
        const dir = proj.pos.clone().sub(prev);
        const dist = dir.length();
        if (dist > 0.0001) {
          const hit = this.raycast(prev, dir.normalize(), dist + proj.radius);
          if (hit && !hit.bot) {
            this.burst(proj.pos, proj.color, 8, 3.2, 0.05);
            proj.onHit?.({ point: proj.pos.clone() });
            consumed = true;
          }
        }
      }

      if (consumed || proj.life <= 0 || proj.pos.y < this.killY) {
        proj.mesh.removeFromParent();
        proj.mesh.traverse((c) => {
          const m = c as THREE.Mesh;
          if (m.geometry) m.geometry.dispose();
        });
        const idx = this.projectiles.indexOf(proj);
        if (idx >= 0) this.projectiles.splice(idx, 1);
      }
    }
  }

  private updatePickups(dt: number) {
    for (const pickup of [...this.pickups]) {
      if (!pickup.active) continue;
      pickup.mesh.rotation.y += dt * 1.9;
      pickup.mesh.position.y = pickup.pos.y + Math.sin(this.time * 2.4 + pickup.pos.x) * 0.14;
      if (!this.player.alive) continue;
      const dx = this.player.pos.x - pickup.pos.x;
      const dz = this.player.pos.z - pickup.pos.z;
      const dy = this.player.pos.y + 0.9 - pickup.pos.y;
      if (dx * dx + dz * dz + dy * dy < pickup.radius * pickup.radius) {
        this.sfx("pickup", 0.16);
        pickup.onPickup(pickup);
        this.removePickup(pickup);
      }
    }
  }

  private updateFx(dt: number) {
    for (const item of [...this.fx]) {
      item.life -= dt;
      if (item.vel) {
        item.vel.y -= item.gravity * dt;
        item.obj.position.addScaledVector(item.vel, dt);
      }
      const t = Math.max(0, item.life / item.maxLife);
      const mat = (item.obj as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
      if (mat && "opacity" in mat) {
        mat.opacity = t;
        mat.transparent = true;
      }
      if (item.fadeScale) item.obj.scale.setScalar(item.baseScale * (0.35 + t * 0.95));
      if (item.life <= 0) {
        item.obj.removeFromParent();
        const mesh = item.obj as THREE.Mesh;
        if (mesh.geometry && !item.sharedGeometry) mesh.geometry.dispose();
        if (mat) mat.dispose();
        const idx = this.fx.indexOf(item);
        if (idx >= 0) this.fx.splice(idx, 1);
      }
    }
  }

  /* ---------------------------------------------------------------- input */

  private attachEvents() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("pointerlockchange", this.handleLockChange);
    document.addEventListener("pointerlockerror", this.handleLockError);
    document.addEventListener("contextmenu", this.preventMenu);
    window.addEventListener("blur", this.handleBlur);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
  }

  private handleLockError = () => {
    this.enableFallback();
  };

  private preventMenu = (event: MouseEvent) => {
    const locked = document.pointerLockElement === this.canvas;
    if (locked || (this.fallbackMode && this.container.contains(event.target as Node))) {
      event.preventDefault();
    }
  };

  private handleBlur = () => {
    if (this.fallbackMode) this.pauseGame();
    this.input.clear();
    this.mouse.left = false;
    this.mouse.right = false;
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape" && this.fallbackMode) {
      this.pauseGame();
      return;
    }
    const locked = document.pointerLockElement === this.canvas;
    if (!locked && !this.fallbackMode) return;
    if (this.fallbackMode && !locked) {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }
    }
    if (event.code === "Space" || event.code.startsWith("Arrow")) event.preventDefault();
    const key = KEY_MAP[event.code];
    if (key === "space" && !event.repeat) this.tryJump();
    if (event.code === "KeyE" && !event.repeat && this.grappleEnabled) {
      this.triggerGrapple();
    }
    if (!event.repeat) this.onKeyDown?.(event.code);
    if (key) this.input.add(key);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    const key = KEY_MAP[event.code];
    if (key) this.input.delete(key);
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (this.state !== "playing") return;
    const locked = document.pointerLockElement === this.canvas;
    if (!locked && !(this.fallbackMode && this.container.contains(event.target as Node))) return;

    let dx = event.movementX;
    let dy = event.movementY;
    if (!locked && this.fallbackMode) {
      const rect = this.container.getBoundingClientRect();
      if (rect.width > 0) {
        this.cursorNormX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      }
      if (dx === 0 && dy === 0 && this.lastMouseX !== null && this.lastMouseY !== null) {
        dx = event.clientX - this.lastMouseX;
        dy = event.clientY - this.lastMouseY;
      }
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    }

    const p = this.player;
    p.yaw -= dx * this.mouseSensitivity;
    p.pitch -= dy * this.mouseSensitivity;
    const limit = Math.PI / 2 - 0.03;
    p.pitch = Math.max(-limit, Math.min(limit, p.pitch));
  };

  private handleMouseDown = (event: MouseEvent) => {
    const locked = document.pointerLockElement === this.canvas;
    if (!locked && !(this.fallbackMode && this.container.contains(event.target as Node))) return;
    if (event.button === 0) {
      this.mouse.left = true;
      this.onLeftDown?.();
    }
    if (event.button === 1 && this.grappleEnabled) {
      event.preventDefault();
      this.triggerGrapple();
    }
    if (event.button === 2) {
      this.mouse.right = true;
      this.onRightDown?.();
    }
  };

  private handleMouseUp = (event: MouseEvent) => {
    if (event.button === 0) {
      this.mouse.left = false;
      this.onLeftUp?.();
    }
    if (event.button === 2) this.mouse.right = false;
  };

  private handleLockChange = () => {
    const locked = document.pointerLockElement === this.canvas;
    this.callbacks.onLockChange(locked);
    if (locked) {
      window.clearTimeout(this.lockTimer);
      this.fallbackMode = false;
      this.canvas.style.cursor = "none";
      if (this.state === "idle" || this.state === "paused") this.state = "playing";
      this.last = performance.now();
    } else if (this.state === "playing") {
      this.state = "paused";
      this.input.clear();
      this.mouse.left = false;
      this.mouse.right = false;
    }
  };

  private resize() {
    const w = Math.max(this.container.clientWidth, 320);
    const h = Math.max(this.container.clientHeight, 240);
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.bloomPass.resolution.set(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  /* ------------------------------------------------------------- teardown */

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("pointerlockchange", this.handleLockChange);
    document.removeEventListener("pointerlockerror", this.handleLockError);
    document.removeEventListener("contextmenu", this.preventMenu);
    window.removeEventListener("blur", this.handleBlur);
    window.clearTimeout(this.lockTimer);
    this.resizeObserver?.disconnect();
    if (document.pointerLockElement === this.canvas) document.exitPointerLock();
    this.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose();
    });
    Object.values(this.textures).forEach((t) => t.dispose());
    this.particleGeo.dispose();
    this.composer.dispose();
    this.renderer.dispose();
    this.canvas.remove();
    try {
      void this.audio?.close();
    } catch {
      /* ignore */
    }
  }
}
