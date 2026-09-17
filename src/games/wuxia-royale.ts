import * as THREE from "three";
import { Engine, type Bot, type ViewWeaponKind } from "./engine";
import type { GameFactory } from "./types";

type WeaponId = "blade" | "sleeve" | "sword";

interface WeaponDef {
  id: WeaponId;
  name: string;
  view: ViewWeaponKind;
  melee: boolean;
  damage: number;
  cooldown: number;
  range: number;
  maxAmmo: number;
  reload: number;
  speed: number;
  gravity: number;
  size: number;
  color: number;
  spread: number;
  auto: boolean;
  homing: number;
}

const WEAPONS: Record<WeaponId, WeaponDef> = {
  blade: {
    id: "blade",
    name: "雁翎太刀 · 剑气斩",
    view: "katana",
    melee: true,
    damage: 68,
    cooldown: 0.4,
    range: 3.5,
    maxAmmo: Infinity,
    reload: 0,
    speed: 0,
    gravity: 0,
    size: 0,
    color: 0x38bdf8,
    spread: 0,
    auto: true,
    homing: 0,
  },
  sleeve: {
    id: "sleeve",
    name: "诸葛神臂连弩",
    view: "crossbow",
    melee: false,
    damage: 29,
    cooldown: 0.16,
    range: 160,
    maxAmmo: 64,
    reload: 1.05,
    speed: 74,
    gravity: 4,
    size: 0.09,
    color: 0xffe08a,
    spread: 0.011,
    auto: true,
    homing: 0,
  },
  sword: {
    id: "sword",
    name: "太虚御剑飞刃",
    view: "flying-sword",
    melee: false,
    damage: 92,
    cooldown: 0.62,
    range: 200,
    maxAmmo: 12,
    reload: 1.5,
    speed: 52,
    gravity: 0,
    size: 0.16,
    color: 0x38bdf8,
    spread: 0,
    auto: false,
    homing: 3.2,
  },
};

const PHASES = [
  { radius: 122, wait: 20, shrink: 22, dps: 2 },
  { radius: 84, wait: 17, shrink: 20, dps: 4 },
  { radius: 54, wait: 15, shrink: 18, dps: 7 },
  { radius: 32, wait: 13, shrink: 16, dps: 10 },
  { radius: 16, wait: 11, shrink: 14, dps: 14 },
  { radius: 6, wait: 9, shrink: 400, dps: 18 },
];

const ARENA = 118;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export const createWuxiaRoyale: GameFactory = ({ container, callbacks }) => {
  const engine = new Engine(
    container,
    {
      sky: { top: 0x16224f, bottom: 0xf97316 },
      fog: { color: 0xd97757, near: 55, far: 255 },
      ambient: 0.65,
      sun: { color: 0xffc98a, intensity: 1.5, position: [60, 48, -35] },
      killY: -30,
      bloom: { strength: 0.55, radius: 0.42, threshold: 0.76 },
    },
    callbacks,
  );
  engine.playerSpeed = 8.0;
  engine.maxJumps = 2;
  engine.grappleEnabled = true;
  engine.grappleMaxCooldown = 3.2;
  engine.radarRange = 95;

  /* ------------------------------------------------------------- island */
  engine.addOceanAndAtmosphericSky(14, 165, -0.55);
  engine.addGround(248, 0x6c8052, 0, true);

  const palette = {
    wood: 0x8a5a3b,
    darkWood: 0x5c3a26,
    roof: 0x9e2b2b,
    roofDark: 0x6f1d1d,
    stone: 0x8d8579,
    paper: 0xf5e6c8,
    bamboo: 0x6f8f4a,
  };

  for (let i = 0; i < 96; i++) {
    const angle = (i / 96) * Math.PI * 2 + rand(-0.02, 0.02);
    const r = ARENA + rand(2, 8);
    const h = rand(9, 20);
    engine.addBox({
      x: Math.cos(angle) * r,
      y: h / 2 - 3,
      z: Math.sin(angle) * r,
      w: rand(9, 16),
      h,
      d: rand(9, 16),
      color: 0x6b5f52,
      roughness: 1,
      rotationY: rand(0, Math.PI),
      texture: "stone",
    });
  }

  const spawnPoints: THREE.Vector3[] = [];

  const buildCompound = (cx: number, cz: number, scale: number) => {
    const w = 16 * scale;
    const d = 14 * scale;
    const wallH = 3.4 * scale;
    engine.addBox({
      x: cx,
      y: 0.25,
      z: cz,
      w: w + 3,
      h: 0.5,
      d: d + 3,
      color: palette.stone,
      texture: "stone",
    });

    const doorW = 3.4;
    const segW = (w - doorW) / 2;
    engine.addBox({
      x: cx - (doorW / 2 + segW / 2),
      y: wallH / 2,
      z: cz - d / 2,
      w: segW,
      h: wallH,
      d: 0.6,
      color: palette.wood,
      texture: "wood",
    });
    engine.addBox({
      x: cx + (doorW / 2 + segW / 2),
      y: wallH / 2,
      z: cz - d / 2,
      w: segW,
      h: wallH,
      d: 0.6,
      color: palette.wood,
      texture: "wood",
    });
    engine.addBox({
      x: cx,
      y: wallH / 2,
      z: cz + d / 2,
      w,
      h: wallH,
      d: 0.6,
      color: palette.wood,
      texture: "wood",
    });
    engine.addBox({
      x: cx - w / 2,
      y: wallH / 2,
      z: cz,
      w: 0.6,
      h: wallH,
      d: d,
      color: palette.wood,
      texture: "wood",
    });
    const segD = (d - doorW) / 2;
    engine.addBox({
      x: cx + w / 2,
      y: wallH / 2,
      z: cz - (doorW / 2 + segD / 2),
      w: 0.6,
      h: wallH,
      d: segD,
      color: palette.wood,
      texture: "wood",
    });
    engine.addBox({
      x: cx + w / 2,
      y: wallH / 2,
      z: cz + (doorW / 2 + segD / 2),
      w: 0.6,
      h: wallH,
      d: segD,
      color: palette.wood,
      texture: "wood",
    });

    engine.addBox({
      x: cx,
      y: wallH + 0.3,
      z: cz,
      w: w + 2.4,
      h: 0.6,
      d: d + 2.4,
      color: palette.roof,
      texture: "roof",
    });
    engine.addBox({
      x: cx,
      y: wallH + 1.6,
      z: cz,
      w: w * 0.6,
      h: 2.4,
      d: d * 0.62,
      color: palette.roofDark,
      texture: "roof",
    });
    engine.addBox({
      x: cx,
      y: wallH + 3.1,
      z: cz,
      w: w * 0.32,
      h: 0.5,
      d: d * 0.34,
      color: 0xd4af37,
      metalness: 0.75,
      roughness: 0.28,
    });

    for (let s = 0; s < 4; s++) {
      engine.addBox({
        x: cx - w / 2 - 1.6 - s * 1.3,
        y: (0.9 + s * 0.95) / 2 + 0.02,
        z: cz + d / 2 + 1.2,
        w: 1.5,
        h: 0.9 + s * 0.95,
        d: 1.5,
        color: s % 2 === 0 ? palette.darkWood : palette.wood,
        texture: "wood",
      });
    }
    for (let i = 0; i < 3; i++) {
      engine.addBox({
        x: cx + rand(-w / 3, w / 3),
        y: 0.55,
        z: cz + rand(-d / 3, d / 3),
        w: 1.1,
        h: 1.1,
        d: 1.1,
        color: 0xa4713f,
        rotationY: rand(0, Math.PI),
        texture: "wood",
      });
    }
    spawnPoints.push(new THREE.Vector3(cx, 0.2, cz + d / 2 + 3));
    spawnPoints.push(new THREE.Vector3(cx - w / 2 - 4, 3.6, cz + d / 2 + 2));
  };

  const compounds = [
    [-72, -70],
    [70, -74],
    [-78, 62],
    [66, 68],
    [0, -92],
    [-6, 88],
    [-96, -6],
    [96, 4],
    [34, -30],
    [-38, 26],
    [8, 34],
    [-30, -40],
  ];
  compounds.forEach(([x, z], i) => buildCompound(x, z, i % 3 === 0 ? 1.25 : 1));

  // Central Golden Pagoda
  engine.addBox({ x: 0, y: 0.3, z: 0, w: 26, h: 0.6, d: 26, color: palette.stone, texture: "stone" });
  for (let tier = 0; tier < 4; tier++) {
    const s = 13 - tier * 2.6;
    const y = 0.6 + tier * 4.2;
    engine.addBox({ x: 0, y: y + 2, z: 0, w: s, h: 3.4, d: s, color: palette.paper, texture: "wood" });
    engine.addBox({
      x: 0,
      y: y + 3.9,
      z: 0,
      w: s + 3.2,
      h: 0.5,
      d: s + 3.2,
      color: tier % 2 ? palette.roof : palette.roofDark,
      texture: "roof",
    });
    if (tier < 3) {
      engine.addBox({
        x: 0,
        y: y + 4.6,
        z: s / 2 + 0.4,
        w: 3.4,
        h: 0.5,
        d: 1.6,
        color: palette.darkWood,
        texture: "wood",
      });
    }
  }
  spawnPoints.push(new THREE.Vector3(0, 18, 8));
  engine.addBox({
    x: 0,
    y: 18.5,
    z: 0,
    w: 4,
    h: 0.4,
    d: 4,
    color: 0xd4af37,
    metalness: 0.85,
    roughness: 0.25,
  });

  // Trees & bamboo
  for (let i = 0; i < 85; i++) {
    const x = rand(-ARENA + 6, ARENA - 6);
    const z = rand(-ARENA + 6, ARENA - 6);
    if (engine.isBlocked(x, 1, z, 1.6, 3)) continue;
    if (Math.random() < 0.55) {
      const h = rand(5, 9);
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.5, h, 7),
        new THREE.MeshStandardMaterial({ color: 0x6b4a2f, roughness: 1 }),
      );
      trunk.position.set(x, h / 2, z);
      trunk.castShadow = true;
      engine.addMesh(trunk);
      engine.addColliderBounds(x, h / 2, z, 0.9, h, 0.9);
      for (let f = 0; f < 3; f++) {
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(3.1 - f * 0.7, 3.4, 8),
          new THREE.MeshStandardMaterial({
            color: f % 2 ? 0x3f6b3a : 0x4d7f45,
            roughness: 0.9,
          }),
        );
        cone.position.set(x, h - 0.6 + f * 1.5, z);
        cone.castShadow = true;
        engine.addMesh(cone);
      }
    } else {
      const count = 3 + Math.floor(Math.random() * 4);
      for (let b = 0; b < count; b++) {
        const h = rand(3.5, 6.5);
        const bx = x + rand(-0.9, 0.9);
        const bz = z + rand(-0.9, 0.9);
        const bamboo = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.14, h, 6),
          new THREE.MeshStandardMaterial({ color: palette.bamboo, roughness: 0.7 }),
        );
        bamboo.position.set(bx, h / 2, bz);
        bamboo.castShadow = true;
        engine.addMesh(bamboo);
      }
      engine.addColliderBounds(x, 2.6, z, 1.8, 5.2, 1.8);
    }
  }

  for (let i = 0; i < 36; i++) {
    const x = rand(-ARENA + 4, ARENA - 4);
    const z = rand(-ARENA + 4, ARENA - 4);
    if (engine.isBlocked(x, 1, z, 2.4, 2)) continue;
    const s = rand(1.4, 3.4);
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(s, 0),
      new THREE.MeshStandardMaterial({ color: 0x7c756b, roughness: 1 }),
    );
    rock.position.set(x, s * 0.55, z);
    rock.rotation.set(rand(0, 3), rand(0, 3), rand(0, 3));
    rock.castShadow = true;
    rock.receiveShadow = true;
    engine.addMesh(rock);
    engine.addColliderBounds(x, s * 0.55, z, s * 1.5, s * 1.2, s * 1.5);
  }

  const lanterns: THREE.Mesh[] = [];
  for (let i = 0; i < 26; i++) {
    const lantern = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 10, 8),
      new THREE.MeshStandardMaterial({
        color: 0xffd28a,
        emissive: 0xff9d4d,
        emissiveIntensity: 1.8,
      }),
    );
    lantern.position.set(rand(-ARENA, ARENA), rand(9, 26), rand(-ARENA, ARENA));
    engine.addMesh(lantern);
    lanterns.push(lantern);
  }

  /* --------------------------------------------------------------- state */
  let weapon: WeaponId = "blade";
  const ammo: Record<WeaponId, number> = { blade: Infinity, sleeve: 56, sword: 9 };
  let cooldown = 0;
  let reloadTimer = 0;
  let ultCooldown = 0;
  const ultMaxCooldown = 14;
  let kills = 0;
  let score = 0;
  let ended = false;

  engine.setViewWeapon(WEAPONS[weapon].view);

  const zone = {
    center: new THREE.Vector3(0, 0, 0),
    radius: 160,
    phase: 0,
    mode: "wait" as "wait" | "shrink",
    timer: PHASES[0].wait,
    fromRadius: 160,
    fromCenter: new THREE.Vector3(0, 0, 0),
  };

  const zoneWall = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 90, 72, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  zoneWall.position.y = 40;
  engine.addMesh(zoneWall);

  const zoneRing = new THREE.Mesh(
    new THREE.RingGeometry(0.985, 1, 96),
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    }),
  );
  zoneRing.rotation.x = -Math.PI / 2;
  zoneRing.position.y = 0.08;
  engine.addMesh(zoneRing);

  /* -------------------------------------------------------------- player */
  const start = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
  engine.player.pos.set(start.x, engine.surfaceY(start.x, start.z) + 0.4, start.z);
  engine.lookAt(0, 0);

  const dropLoot = (bot: Bot) => {
    const roll = Math.random();
    const y = engine.surfaceY(bot.pos.x, bot.pos.z, bot.pos.y + 1) + 0.8;
    if (roll < 0.4) {
      engine.addPickup({
        pos: new THREE.Vector3(bot.pos.x, y, bot.pos.z),
        kind: "ammo",
        label: "神臂箭匣",
        color: 0xfbbf24,
        onPickup: () => {
          ammo.sleeve = Math.min(WEAPONS.sleeve.maxAmmo, ammo.sleeve + 26);
          ammo.sword = Math.min(WEAPONS.sword.maxAmmo, ammo.sword + 4);
          engine.message("拾取神臂箭匣：连弩 +26 / 飞刃 +4");
        },
      });
    } else if (roll < 0.75) {
      engine.addPickup({
        pos: new THREE.Vector3(bot.pos.x, y, bot.pos.z),
        kind: "med",
        label: "九花玉露丸",
        color: 0x4ade80,
        onPickup: () => {
          engine.healPlayer(40);
          engine.message("服用九花玉露丸：气血 +40");
        },
      });
    } else {
      engine.addPickup({
        pos: new THREE.Vector3(bot.pos.x, y, bot.pos.z),
        kind: "armor",
        label: "天蚕金丝甲",
        color: 0x38bdf8,
        onPickup: () => {
          engine.player.armor = Math.min(engine.player.maxArmor, engine.player.armor + 50);
          engine.healPlayer(20);
          engine.message("天蚕金丝甲：护甲 +50 · 气血 +20");
        },
      });
    }
  };

  const spawnBot = (i: number) => {
    for (let attempt = 0; attempt < 60; attempt++) {
      const a = (i / 12) * Math.PI * 2 + rand(-0.35, 0.35);
      const dist = rand(46, 102);
      const x = Math.cos(a) * dist;
      const z = Math.sin(a) * dist;
      if (Math.hypot(x - engine.player.pos.x, z - engine.player.pos.z) < 26) continue;
      if (engine.isBlocked(x, 1.2, z, 1.2, 2)) continue;
      const y = engine.surfaceY(x, z) + 0.1;
      const ranged = i % 3 === 1;
      const elite = i === 0 || i === 6;
      const bot = engine.addBot({
        pos: new THREE.Vector3(x, y, z),
        health: (elite ? 150 : 95) + (ranged ? 0 : 25),
        speed: ranged ? 3.8 : rand(4.8, 6.2),
        damage: ranged ? 9 : 15,
        attackRange: ranged ? 42 : 2.4,
        attackCooldown: ranged ? 1.45 : 0.95,
        color: elite ? 0xf59e0b : ranged ? 0x7c3aed : 0xb91c1c,
        radius: 0.46,
        height: elite ? 1.96 : 1.82,
        kind: elite ? "锦衣统领" : ranged ? "神机弩手" : "玄衣刀客",
        elite,
        ranged: ranged
          ? { interval: 1.5, speed: 36, damage: 9, spread: 1.5, color: 0xc084fc }
          : null,
      });
      bot.onDeath = (b) => {
        kills += 1;
        score += b.elite ? 1500 : 1000;
        ultCooldown = Math.max(0, ultCooldown - 3.5);
        dropLoot(b);
        engine.message(`斩杀 ${b.kind}！剩余 ${engine.aliveBots().length} 名对手`);
      };
      return;
    }
  };
  for (let i = 0; i < 12; i++) spawnBot(i);

  for (let i = 0; i < 18; i++) {
    const x = rand(-ARENA + 8, ARENA - 8);
    const z = rand(-ARENA + 8, ARENA - 8);
    if (engine.isBlocked(x, 1, z, 1.4, 2)) continue;
    const kind = i % 3 === 0 ? "med" : i % 3 === 1 ? "armor" : "ammo";
    engine.addPickup({
      pos: new THREE.Vector3(x, engine.surfaceY(x, z) + 0.9, z),
      kind,
      label: kind === "med" ? "九花玉露丸" : kind === "armor" ? "金丝软甲" : "神臂箭匣",
      color: kind === "med" ? 0x4ade80 : kind === "armor" ? 0x38bdf8 : 0xfbbf24,
      onPickup: () => {
        if (kind === "med") {
          engine.healPlayer(35);
          engine.message("服用九花玉露丸 +35");
        } else if (kind === "armor") {
          engine.player.armor = Math.min(engine.player.maxArmor, engine.player.armor + 40);
          engine.message("穿戴金丝软甲：护甲 +40");
        } else {
          ammo.sleeve = Math.min(WEAPONS.sleeve.maxAmmo, ammo.sleeve + 22);
          ammo.sword = Math.min(WEAPONS.sword.maxAmmo, ammo.sword + 3);
          engine.message("拾取箭匣 +22");
        }
      },
    });
  }

  /* ------------------------------------------------------------ bot logic */
  engine.customBotUpdate = (bot, dt) => {
    const p = engine.player;
    const dx = p.pos.x - bot.pos.x;
    const dz = p.pos.z - bot.pos.z;
    const dist = Math.hypot(dx, dz);
    const dirX = dist > 0.01 ? dx / dist : 0;
    const dirZ = dist > 0.01 ? dz / dist : 0;
    const zx = zone.center.x - bot.pos.x;
    const zz = zone.center.z - bot.pos.z;
    const zDist = Math.hypot(zx, zz);
    const outside = zDist > zone.radius - 6;
    const dps = PHASES[Math.min(zone.phase, PHASES.length - 1)].dps;

    if (outside) {
      bot.vel.x = (zx / (zDist || 1)) * bot.speed * 1.25;
      bot.vel.z = (zz / (zDist || 1)) * bot.speed * 1.25;
    } else if (bot.ranged) {
      bot.data.strafeTimer = (bot.data.strafeTimer ?? rand(1, 2.4)) - dt;
      if (bot.data.strafeTimer <= 0) {
        bot.data.strafeTimer = rand(1.2, 2.6);
        bot.data.dir = Math.random() < 0.5 ? -1 : 1;
      }
      const want = 17;
      let mx = 0;
      let mz = 0;
      if (dist > want + 5) {
        mx = dirX * bot.speed;
        mz = dirZ * bot.speed;
      } else if (dist < want - 6) {
        mx = -dirX * bot.speed * 0.8;
        mz = -dirZ * bot.speed * 0.8;
      }
      mx += -dirZ * bot.speed * 0.65 * (bot.data.dir ?? 1);
      mz += dirX * bot.speed * 0.65 * (bot.data.dir ?? 1);
      bot.vel.x = mx;
      bot.vel.z = mz;
      bot.rangedTimer -= dt;
      if (bot.rangedTimer <= 0 && dist < 62) {
        bot.rangedTimer = bot.ranged.interval * rand(0.7, 1.2);
        const from = new THREE.Vector3(bot.pos.x, bot.pos.y + 1.4, bot.pos.z);
        const to = new THREE.Vector3(
          p.pos.x + p.vel.x * 0.25 + rand(-1.4, 1.4),
          p.pos.y + 1.1,
          p.pos.z + p.vel.z * 0.25 + rand(-1.4, 1.4),
        );
        engine.spawnProjectile({
          pos: from,
          dir: to.sub(from),
          speed: 36,
          damage: bot.damage,
          owner: "bot",
          color: 0xc084fc,
          size: 0.12,
        });
        engine.sfx("arrow", 0.07);
      }
    } else {
      const stop = bot.attackRange * 0.8;
      const push = dist < stop * 0.6 ? -0.5 : 1;
      bot.vel.x = dirX * bot.speed * push;
      bot.vel.z = dirZ * bot.speed * push;
      bot.cooldown -= dt;
      if (dist < bot.attackRange && Math.abs(p.pos.y - bot.pos.y) < 2.2 && bot.cooldown <= 0) {
        bot.cooldown = bot.attackCooldown;
        engine.damagePlayer(bot.damage);
        engine.burst(
          new THREE.Vector3(p.pos.x, p.pos.y + 1.2, p.pos.z),
          0xff6b6b,
          9,
          3.4,
          0.05,
        );
      }
    }

    if (bot.onGround && Math.hypot(bot.vel.x, bot.vel.z) > 0.4) {
      const nx = bot.pos.x + Math.sign(bot.vel.x) * 0.8;
      const nz = bot.pos.z + Math.sign(bot.vel.z) * 0.8;
      if (engine.isBlocked(nx, bot.pos.y + 0.2, nz, bot.radius, bot.height)) {
        bot.vel.y = engine.jumpPower * 0.78;
      }
    }

    if (zDist > zone.radius) {
      bot.health -= dps * dt;
      if (bot.health <= 0) {
        engine.burst(
          new THREE.Vector3(bot.pos.x, bot.pos.y + 1, bot.pos.z),
          0x7dd3fc,
          20,
          6,
          0.09,
        );
        engine.message(`${bot.kind} 被天罡毒瘴淘汰`);
        bot.onDeath = undefined;
        engine.removeBot(bot);
      }
    }
  };

  /* ------------------------------------------------------------- weapons */
  const switchWeapon = (next: WeaponId) => {
    weapon = next;
    reloadTimer = 0;
    engine.setViewWeapon(WEAPONS[weapon].view);
  };

  const castUltimate = () => {
    if (ultCooldown > 0) {
      engine.message(`万剑归宗冷却中（${ultCooldown.toFixed(1)}s）`);
      return;
    }
    ultCooldown = ultMaxCooldown;
    engine.sfx("win", 0.22);
    engine.shake(0.32);
    engine.player.armor = Math.min(engine.player.maxArmor, engine.player.armor + 35);
    engine.message("🔥 奥义·万剑归宗！十剑齐发 + 护甲回复");
    const origin = engine.eyePos;
    const baseDir = engine.forward;
    for (let i = 0; i < 10; i++) {
      const a = ((i - 4.5) / 10) * 0.75;
      const dir = baseDir
        .clone()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), a)
        .add(new THREE.Vector3(0, (i % 3) * 0.04, 0))
        .normalize();
      engine.spawnProjectile({
        pos: origin.clone().add(new THREE.Vector3(Math.cos(a) * 0.6, 0.2, Math.sin(a) * 0.6)),
        dir,
        speed: 48,
        damage: 65,
        owner: "player",
        color: 0x38bdf8,
        size: 0.16,
        homing: 4.5,
        life: 3.5,
      });
    }
  };

  const fire = () => {
    const def = WEAPONS[weapon];
    if (cooldown > 0 || reloadTimer > 0) return;
    if (def.melee) {
      cooldown = def.cooldown;
      engine.sfx("melee", 0.16);
      const hit = engine.meleeSwing({
        damage: def.damage,
        range: def.range,
        arc: 0.85,
        waveColor: 0x38bdf8,
      });
      if (hit) engine.shake(0.16);
      return;
    }
    if (ammo[weapon] <= 0) {
      reloadTimer = def.reload;
      engine.sfx("reload", 0.14);
      return;
    }
    ammo[weapon] -= 1;
    cooldown = def.cooldown;
    engine.sfx(def.id === "sword" ? "arrow" : "shoot", 0.14);
    const origin = engine.eyePos;
    const dir = engine.forward;
    dir.x += (Math.random() - 0.5) * def.spread;
    dir.y += (Math.random() - 0.5) * def.spread;
    dir.z += (Math.random() - 0.5) * def.spread;
    engine.spawnProjectile({
      pos: origin.clone().add(dir.clone().multiplyScalar(0.6)),
      dir,
      speed: def.speed,
      damage: def.damage,
      owner: "player",
      color: def.color,
      gravity: def.gravity,
      size: def.size,
      homing: def.homing,
      life: 3.2,
    });
    engine.shake(def.id === "sword" ? 0.18 : 0.05);
    if (ammo[weapon] <= 0) reloadTimer = def.reload;
  };

  engine.onLeftDown = fire;
  engine.onRightDown = () => {
    // Right click: heavy sword wave slash regardless of current weapon
    if (cooldown <= 0) {
      cooldown = 0.55;
      engine.sfx("melee", 0.2);
      engine.meleeSwing({ damage: 82, range: 3.8, arc: 0.9, waveColor: 0xf59e0b });
    }
  };
  engine.onKeyDown = (code) => {
    if (code === "Digit1") switchWeapon("blade");
    if (code === "Digit2") switchWeapon("sleeve");
    if (code === "Digit3") switchWeapon("sword");
    if (code === "KeyQ") castUltimate();
    if (
      code === "KeyR" &&
      reloadTimer <= 0 &&
      !WEAPONS[weapon].melee &&
      ammo[weapon] < WEAPONS[weapon].maxAmmo
    ) {
      reloadTimer = WEAPONS[weapon].reload;
      engine.sfx("reload", 0.14);
    }
  };

  const endGame = (outcome: "win" | "lose") => {
    if (ended) return;
    ended = true;
    const placement = outcome === "win" ? 1 : engine.aliveBots().length + 1;
    const finalScore =
      outcome === "win"
        ? score + 3000 + Math.floor(engine.time) * 8
        : score + Math.floor(engine.time) * 8;
    engine.finish(outcome);
    callbacks.onEnd({
      outcome,
      score: finalScore,
      kills,
      wave: zone.phase + 1,
      durationSec: Math.round(engine.time),
      title: outcome === "win" ? "天选之主 · 今晚吃鸡！" : `侠影陨落 · 第 ${placement} 名`,
      summary:
        outcome === "win"
          ? `你以 ${kills} 次斩杀称霸聚窟孤岛，历劫 ${Math.round(engine.time)} 秒。`
          : `存活 ${Math.round(engine.time)} 秒，斩杀 ${kills} 人，共 ${12 - engine.aliveBots().length} 人被淘汰。`,
      stats: [
        { label: "最终名次", value: `第 ${placement} 名` },
        { label: "斩杀数", value: `${kills}` },
        { label: "天罡圈阶段", value: `${Math.min(zone.phase + 1, PHASES.length)}` },
        { label: "存活时间", value: `${Math.round(engine.time)} 秒` },
      ],
    });
  };

  engine.onPlayerDeath = () => endGame("lose");
  engine.onFall = () => {
    engine.damagePlayer(999);
  };

  /* ---------------------------------------------------------------- update */
  engine.onUpdate = (dt) => {
    cooldown = Math.max(0, cooldown - dt);
    ultCooldown = Math.max(0, ultCooldown - dt);
    if (reloadTimer > 0) {
      reloadTimer -= dt;
      if (reloadTimer <= 0) {
        ammo[weapon] = WEAPONS[weapon].maxAmmo;
      }
    }
    if (engine.mouse.left && WEAPONS[weapon].auto) fire();

    const phase = PHASES[Math.min(zone.phase, PHASES.length - 1)];
    zone.timer -= dt;
    if (zone.mode === "wait" && zone.timer <= 0 && zone.phase < PHASES.length) {
      zone.mode = "shrink";
      zone.timer = phase.shrink;
      zone.fromRadius = zone.radius;
      zone.fromCenter.copy(zone.center);
      const maxShift = Math.max(0, zone.radius - phase.radius) * 0.72;
      const angle = rand(0, Math.PI * 2);
      const shift = rand(0, maxShift);
      zone.center = new THREE.Vector3(
        THREE.MathUtils.clamp(zone.center.x + Math.cos(angle) * shift, -70, 70),
        0,
        THREE.MathUtils.clamp(zone.center.z + Math.sin(angle) * shift, -70, 70),
      );
      engine.message("⚠️ 天罡毒圈开始收缩，按 E 飞索快速入圈！");
      engine.sfx("spawn", 0.16);
    } else if (zone.mode === "shrink") {
      const t = 1 - Math.max(0, zone.timer) / phase.shrink;
      zone.radius = THREE.MathUtils.lerp(zone.fromRadius, phase.radius, Math.min(1, t));
      if (zone.timer <= 0) {
        zone.radius = phase.radius;
        zone.phase += 1;
        zone.mode = "wait";
        zone.timer = PHASES[Math.min(zone.phase, PHASES.length - 1)].wait;
      }
    }

    zoneWall.scale.set(zone.radius, 1, zone.radius);
    zoneWall.position.set(zone.center.x, 40, zone.center.z);
    zoneRing.scale.set(zone.radius, zone.radius, 1);
    zoneRing.position.set(zone.center.x, 0.08, zone.center.z);
    engine.zoneInfo = { center: zone.center, radius: zone.radius };

    const playerDist = Math.hypot(
      engine.player.pos.x - zone.center.x,
      engine.player.pos.z - zone.center.z,
    );
    const outside = playerDist > zone.radius;
    if (outside) {
      engine.damagePlayer(phase.dps * dt * 0.85);
      (zoneWall.material as THREE.MeshBasicMaterial).color.setHex(0xff5c5c);
    } else {
      (zoneWall.material as THREE.MeshBasicMaterial).color.setHex(0x38bdf8);
    }

    const alive = engine.aliveBots();
    if (alive.length === 1 && !alive[0].data.buffed) {
      alive[0].data.buffed = 1;
      alive[0].speed *= 1.22;
      alive[0].health = alive[0].maxHealth = alive[0].maxHealth + 60;
      alive[0].damage += 5;
      engine.message("最终劲敌进入修罗状态！");
    }
    if (alive.length === 0) endGame("win");

    for (const lantern of lanterns) {
      lantern.position.y += Math.sin(engine.time * 0.6 + lantern.position.x) * 0.004;
      lantern.rotation.y += dt * 0.4;
    }

    engine.abilities = [
      {
        key: "Q",
        name: "万剑归宗",
        cooldown: ultCooldown,
        maxCooldown: ultMaxCooldown,
      },
      {
        key: "右键",
        name: "烈阳霸体斩",
        cooldown: Math.max(0, cooldown),
        maxCooldown: 0.55,
      },
    ];

    engine.setHud({
      objective: outside
        ? "⚠️ 身处毒瘴外！按 E 飞索快速进入安全区"
        : "1/2/3 切换太刀·连弩·飞剑 | E 飞索上房 | Q 万剑归宗",
      health: Math.round(engine.player.health),
      maxHealth: engine.player.maxHealth,
      stamina: Math.round(engine.player.stamina),
      weapon: WEAPONS[weapon].name,
      ammo: ammo[weapon] === Infinity ? -1 : ammo[weapon],
      maxAmmo: WEAPONS[weapon].maxAmmo === Infinity ? -1 : WEAPONS[weapon].maxAmmo,
      reloading: reloadTimer > 0,
      kills,
      score: score + Math.floor(engine.time) * 8,
      extra: [
        { label: "战场存活", value: `${alive.length + 1} / 13`, tone: "good" },
        {
          label: "天罡圈",
          value: zone.mode === "wait" ? `${Math.ceil(zone.timer)}s 后缩圈` : "收缩中",
          tone: outside ? "warn" : "default",
        },
        {
          label: "距圈心",
          value: `${Math.round(playerDist)}m`,
          tone: outside ? "warn" : "default",
        },
      ],
    });
  };

  engine.setHud({
    objective: "1/2/3 切换武器 · E 飞索钩锁上房 · Q 万剑归宗",
    health: 100,
    maxHealth: 100,
    weapon: WEAPONS.blade.name,
    ammo: -1,
    maxAmmo: -1,
  });

  return {
    dispose: () => engine.dispose(),
    requestStart: () => engine.requestStart(),
  };
};

export default createWuxiaRoyale;
