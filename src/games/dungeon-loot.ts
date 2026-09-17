import * as THREE from "three";
import { Engine } from "./engine";
import type { GameFactory } from "./types";

const CELLS = 11;
const CELL = 6;
const TOTAL_TREASURES = 8;
const TOTAL_TIME = 220;

interface Cell {
  x: number;
  z: number;
  walls: { n: boolean; s: boolean; e: boolean; w: boolean };
  visited: boolean;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildMaze(): Cell[][] {
  const grid: Cell[][] = [];
  for (let x = 0; x < CELLS; x++) {
    grid[x] = [];
    for (let z = 0; z < CELLS; z++) {
      grid[x][z] = { x, z, walls: { n: true, s: true, e: true, w: true }, visited: false };
    }
  }
  const stack: Cell[] = [grid[0][0]];
  grid[0][0].visited = true;
  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbours: {
      cell: Cell;
      dir: "n" | "s" | "e" | "w";
      opposite: "n" | "s" | "e" | "w";
    }[] = [];
    const { x, z } = current;
    if (z > 0 && !grid[x][z - 1].visited)
      neighbours.push({ cell: grid[x][z - 1], dir: "n", opposite: "s" });
    if (z < CELLS - 1 && !grid[x][z + 1].visited)
      neighbours.push({ cell: grid[x][z + 1], dir: "s", opposite: "n" });
    if (x > 0 && !grid[x - 1][z].visited)
      neighbours.push({ cell: grid[x - 1][z], dir: "w", opposite: "e" });
    if (x < CELLS - 1 && !grid[x + 1][z].visited)
      neighbours.push({ cell: grid[x + 1][z], dir: "e", opposite: "w" });
    if (neighbours.length === 0) {
      stack.pop();
      continue;
    }
    const pick = neighbours[Math.floor(Math.random() * neighbours.length)];
    current.walls[pick.dir] = false;
    pick.cell.walls[pick.opposite] = false;
    pick.cell.visited = true;
    stack.push(pick.cell);
  }
  for (let i = 0; i < 18; i++) {
    const x = Math.floor(rand(1, CELLS - 1));
    const z = Math.floor(rand(1, CELLS - 1));
    const dir = (["n", "s", "e", "w"] as const)[Math.floor(Math.random() * 4)];
    const cell = grid[x][z];
    cell.walls[dir] = false;
    if (dir === "n" && z > 0) grid[x][z - 1].walls.s = false;
    if (dir === "s" && z < CELLS - 1) grid[x][z + 1].walls.n = false;
    if (dir === "w" && x > 0) grid[x - 1][z].walls.e = false;
    if (dir === "e" && x < CELLS - 1) grid[x + 1][z].walls.w = false;
  }
  return grid;
}

const worldX = (cx: number) => (cx - (CELLS - 1) / 2) * CELL;
const worldZ = (cz: number) => (cz - (CELLS - 1) / 2) * CELL;

export const createDungeonLoot: GameFactory = ({ container, callbacks }) => {
  const engine = new Engine(
    container,
    {
      sky: { top: 0x0a0a0f, bottom: 0x16121e },
      fog: { color: 0x0c0a12, near: 4, far: 38 },
      ambient: 0.22,
      sun: { color: 0x8b6b3a, intensity: 0.3, position: [10, 40, 10], shadows: false },
      killY: -20,
      bloom: { strength: 0.65, radius: 0.45, threshold: 0.7 },
    },
    callbacks,
  );
  engine.playerSpeed = 7.2;
  engine.sprintMult = 1.5;
  engine.maxJumps = 1;
  engine.grappleEnabled = true;
  engine.grappleMaxCooldown = 3.0;
  engine.radarRange = 48;
  engine.addTorch(0xffb066, 16, 28);
  engine.setViewWeapon("torch-blade");

  const grid = buildMaze();
  const half = (CELLS * CELL) / 2 + 2;
  engine.addGround(CELLS * CELL + 8, 0x3a3038, 0, true);
  engine.addBox({
    x: 0,
    y: 5,
    z: 0,
    w: half * 2,
    h: 0.6,
    d: half * 2,
    color: 0x241d26,
    texture: "stone",
  });

  const wallColor = 0x54484f;
  for (let x = 0; x < CELLS; x++) {
    for (let z = 0; z < CELLS; z++) {
      const cell = grid[x][z];
      const cx = worldX(x);
      const cz = worldZ(z);
      if (cell.walls.n) {
        engine.addBox({
          x: cx,
          y: 2,
          z: cz - CELL / 2,
          w: CELL + 0.6,
          h: 4,
          d: 0.6,
          color: wallColor,
          texture: "stone",
        });
      }
      if (cell.walls.w) {
        engine.addBox({
          x: cx - CELL / 2,
          y: 2,
          z: cz,
          w: 0.6,
          h: 4,
          d: CELL + 0.6,
          color: wallColor,
          texture: "stone",
        });
      }
      if (x === CELLS - 1 && cell.walls.e) {
        engine.addBox({
          x: cx + CELL / 2,
          y: 2,
          z: cz,
          w: 0.6,
          h: 4,
          d: CELL + 0.6,
          color: wallColor,
          texture: "stone",
        });
      }
      if (z === CELLS - 1 && cell.walls.s) {
        engine.addBox({
          x: cx,
          y: 2,
          z: cz + CELL / 2,
          w: CELL + 0.6,
          h: 4,
          d: 0.6,
          color: wallColor,
          texture: "stone",
        });
      }
      if ((x * 3 + z * 7) % 11 === 0) {
        engine.addBox({
          x: cx + 1.6,
          y: 1.1,
          z: cz + 1.6,
          w: 0.9,
          h: 2.2,
          d: 0.9,
          color: 0x3d343b,
          texture: "stone",
        });
      }
    }
  }

  const braziers: THREE.Mesh[] = [];
  for (let i = 0; i < 10; i++) {
    const x = Math.floor(rand(0, CELLS));
    const z = Math.floor(rand(0, CELLS));
    const pos = new THREE.Vector3(worldX(x), 0, worldZ(z));
    const bowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.28, 0.6, 10),
      new THREE.MeshStandardMaterial({ color: 0x2b2320, roughness: 1 }),
    );
    bowl.position.set(pos.x, 1.5, pos.z);
    engine.addMesh(bowl);
    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 10, 8),
      new THREE.MeshStandardMaterial({
        color: 0xffc266,
        emissive: 0xff7a18,
        emissiveIntensity: 2.2,
      }),
    );
    flame.position.set(pos.x, 1.95, pos.z);
    engine.addMesh(flame);
    braziers.push(flame);
    if (i < 4) {
      const light = new THREE.PointLight(0xff9a3c, 16, 20, 2);
      light.position.set(pos.x, 2.1, pos.z);
      engine.addMesh(light);
    }
  }

  interface Trap {
    x: number;
    z: number;
    cd: number;
    mesh: THREE.Mesh;
  }
  const traps: Trap[] = [];
  for (let i = 0; i < 14; i++) {
    const x = Math.floor(rand(0, CELLS));
    const z = Math.floor(rand(0, CELLS));
    if (x === 0 && z === 0) continue;
    const tx = worldX(x) + rand(-1, 1);
    const tz = worldZ(z) + rand(-1, 1);
    const plate = engine.addBox({
      x: tx,
      y: 0.06,
      z: tz,
      w: 2.2,
      h: 0.12,
      d: 2.2,
      color: 0x7f1d1d,
      emissive: 0x991b1b,
      emissiveIntensity: 0.6,
      roughness: 0.8,
      collide: false,
      texture: "none",
    });
    for (let s = 0; s < 9; s++) {
      const spike = new THREE.Mesh(
        new THREE.ConeGeometry(0.1, 0.7, 5),
        new THREE.MeshStandardMaterial({ color: 0xd6d3d1, metalness: 0.8, roughness: 0.3 }),
      );
      spike.position.set(tx + ((s % 3) - 1) * 0.65, 0.4, tz + (Math.floor(s / 3) - 1) * 0.65);
      engine.addMesh(spike);
    }
    traps.push({ x: tx, z: tz, cd: 0, mesh: plate });
  }

  const deadEnds: THREE.Vector3[] = [];
  for (let x = 0; x < CELLS; x++) {
    for (let z = 0; z < CELLS; z++) {
      const walls = Object.values(grid[x][z].walls).filter(Boolean).length;
      const far = Math.hypot(x, z);
      if (walls === 3 && far > 2) deadEnds.push(new THREE.Vector3(worldX(x), 0, worldZ(z)));
    }
  }
  const treasureSpots = deadEnds.sort(() => Math.random() - 0.5).slice(0, TOTAL_TREASURES);
  while (treasureSpots.length < TOTAL_TREASURES) {
    treasureSpots.push(
      new THREE.Vector3(
        worldX(Math.floor(rand(1, CELLS - 1))),
        0,
        worldZ(Math.floor(rand(1, CELLS - 1))),
      ),
    );
  }

  let treasures = 0;
  let tookDamage = false;
  for (const spot of treasureSpots) {
    engine.addPickup({
      pos: new THREE.Vector3(spot.x, 1.05, spot.z),
      kind: "treasure",
      label: "鎏金佛像",
      color: 0xfcd34d,
      size: 0.36,
      radius: 1.65,
      onPickup: () => {
        treasures += 1;
        engine.sfx("pickup", 0.2);
        engine.message(
          treasures >= TOTAL_TREASURES
            ? "✨ 八尊金佛已集齐！跟随小地图青色星标前往出口石门"
            : `拾得鎏金佛像 ${treasures}/${TOTAL_TREASURES}`,
        );
      },
    });
  }

  const exitX = worldX(CELLS - 1);
  const exitZ = worldZ(CELLS - 1);
  engine.goalPos = new THREE.Vector3(exitX, 1, exitZ);
  const portal = new THREE.Mesh(
    new THREE.TorusGeometry(1.6, 0.22, 10, 32),
    new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x0ea5e9,
      emissiveIntensity: 2.0,
    }),
  );
  portal.position.set(exitX, 1.9, exitZ);
  engine.addMesh(portal);
  const portalLight = new THREE.PointLight(0x22d3ee, 18, 18, 2);
  portalLight.position.copy(portal.position);
  engine.addMesh(portalLight);

  interface Spirit {
    bot: ReturnType<Engine["addBot"]>;
    target: THREE.Vector3;
    wanderTimer: number;
  }
  const spirits: Spirit[] = [];
  for (let i = 0; i < 7; i++) {
    let px = 0;
    let pz = 0;
    for (let attempt = 0; attempt < 40; attempt++) {
      const x = Math.floor(rand(2, CELLS));
      const z = Math.floor(rand(2, CELLS));
      px = worldX(x);
      pz = worldZ(z);
      if (!engine.isBlocked(px, 0.4, pz, 1, 2) && Math.hypot(px, pz) > 14) break;
    }
    const bot = engine.addBot({
      pos: new THREE.Vector3(px, 0.2, pz),
      health: 90,
      speed: 3.2,
      damage: 14,
      attackRange: 2.2,
      attackCooldown: 1,
      color: 0x5b21b6,
      radius: 0.5,
      height: 1.9,
      kind: "古墓尸傀",
      gravity: true,
    });
    bot.onDeath = () => {
      score += 250;
      kills += 1;
      engine.message("斩灭古墓尸傀 +250");
    };
    spirits.push({ bot, target: new THREE.Vector3(px, 0, pz), wanderTimer: 0 });
  }

  let kills = 0;
  let score = 0;
  let timeLeft = TOTAL_TIME;
  let cooldown = 0;
  let ended = false;

  engine.customBotUpdate = (bot, dt) => {
    const p = engine.player;
    const dx = p.pos.x - bot.pos.x;
    const dz = p.pos.z - bot.pos.z;
    const dist = Math.hypot(dx, dz);
    let chasing = false;
    if (dist < 16) {
      const from = new THREE.Vector3(bot.pos.x, bot.pos.y + 1.5, bot.pos.z);
      const to = new THREE.Vector3(p.pos.x, p.pos.y + 1.3, p.pos.z);
      const dir = to.clone().sub(from);
      const len = dir.length();
      const hit = engine.raycast(from, dir.clone().normalize(), len);
      chasing = !hit || hit.distance >= len - 0.8;
    }
    const state = spirits.find((s) => s.bot === bot);
    if (!state) return;

    if (chasing) {
      bot.vel.x = ((p.pos.x - bot.pos.x) / (dist || 1)) * bot.speed * 1.45;
      bot.vel.z = ((p.pos.z - bot.pos.z) / (dist || 1)) * bot.speed * 1.45;
      bot.cooldown -= dt;
      if (dist < bot.attackRange && bot.cooldown <= 0) {
        bot.cooldown = bot.attackCooldown;
        engine.damagePlayer(bot.damage);
      }
    } else {
      state.wanderTimer -= dt;
      if (
        state.wanderTimer <= 0 ||
        Math.hypot(state.target.x - bot.pos.x, state.target.z - bot.pos.z) < 1.4
      ) {
        state.wanderTimer = rand(3, 7);
        for (let attempt = 0; attempt < 30; attempt++) {
          const x = Math.floor(rand(0, CELLS));
          const z = Math.floor(rand(0, CELLS));
          const nx = worldX(x);
          const nz = worldZ(z);
          if (!engine.isBlocked(nx, 0.4, nz, 1, 2)) {
            state.target.set(nx, 0, nz);
            break;
          }
        }
      }
      const wdx = state.target.x - bot.pos.x;
      const wdz = state.target.z - bot.pos.z;
      const wlen = Math.hypot(wdx, wdz) || 1;
      bot.vel.x = (wdx / wlen) * bot.speed * 0.55;
      bot.vel.z = (wdz / wlen) * bot.speed * 0.55;
    }
    if (
      bot.onGround &&
      engine.isBlocked(
        bot.pos.x + Math.sign(bot.vel.x) * 0.8,
        bot.pos.y + 0.2,
        bot.pos.z + Math.sign(bot.vel.z) * 0.8,
        bot.radius,
        bot.height,
      )
    ) {
      bot.vel.y = engine.jumpPower * 0.7;
    }
  };

  engine.onLeftDown = () => {
    if (cooldown > 0) return;
    cooldown = 0.48;
    engine.sfx("melee", 0.16);
    engine.meleeSwing({ damage: 64, range: 3.1, arc: 0.9, waveColor: 0xf59e0b });
  };

  engine.onPlayerDeath = () => endGame("lose");

  function endGame(outcome: "win" | "lose") {
    if (ended) return;
    ended = true;
    const remaining = Math.max(0, Math.round(timeLeft));
    const base =
      treasures * 400 + kills * 250 + (outcome === "win" ? remaining * 10 + 600 : 0);
    const bonus = !tookDamage ? 800 : 0;
    engine.finish(outcome);
    callbacks.onEnd({
      outcome,
      score: base + bonus,
      kills,
      wave: treasures,
      durationSec: Math.round(TOTAL_TIME - timeLeft),
      title: outcome === "win" ? "摸金校尉 · 满载而逃！" : "困死宝窟",
      summary:
        outcome === "win"
          ? `你携 ${treasures} 尊金佛逃出玄宫宝窟，剩余 ${remaining} 秒。`
          : `倒在黑暗中，已寻得 ${treasures}/${TOTAL_TREASURES} 尊金佛。`,
      stats: [
        { label: "鎏金佛像", value: `${treasures} / ${TOTAL_TREASURES}` },
        { label: "尸傀斩杀", value: `${kills}` },
        { label: "无伤奖励", value: tookDamage ? "未达成" : "+800" },
        { label: "剩余时间", value: `${remaining} 秒` },
      ],
    });
  }

  // Spawn at cell (0,0) and look directly down the open passage
  engine.player.pos.set(worldX(0), 0.4, worldZ(0));
  if (!grid[0][0].walls.s) {
    engine.lookAt(worldX(0), worldZ(1));
  } else {
    engine.lookAt(worldX(1), worldZ(0));
  }

  engine.onUpdate = (dt) => {
    timeLeft -= dt;
    cooldown = Math.max(0, cooldown - dt);
    if (timeLeft <= 0) {
      timeLeft = 0;
      endGame("lose");
      return;
    }
    if (engine.player.health < 99.9) tookDamage = true;

    for (const trap of traps) {
      trap.cd = Math.max(0, trap.cd - dt);
      const on =
        Math.abs(engine.player.pos.x - trap.x) < 1.3 &&
        Math.abs(engine.player.pos.z - trap.z) < 1.3 &&
        Math.abs(engine.player.pos.y - 0) < 0.6;
      const mat = trap.mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = on && trap.cd <= 0 ? 2.2 : 0.5;
      if (on && trap.cd <= 0) {
        trap.cd = 1.4;
        engine.damagePlayer(14);
        engine.shake(0.24);
        engine.message("踩中机关地刺！");
      }
    }

    portal.rotation.z += dt * 1.1;
    portal.rotation.y += dt * 0.5;
    const portalMat = portal.material as THREE.MeshStandardMaterial;
    portalMat.emissiveIntensity = treasures >= TOTAL_TREASURES ? 2.6 : 0.6;
    portalLight.intensity = treasures >= TOTAL_TREASURES ? 26 : 8;

    const distToExit = Math.hypot(engine.player.pos.x - exitX, engine.player.pos.z - exitZ);
    if (distToExit < 2.8) {
      if (treasures >= TOTAL_TREASURES) {
        endGame("win");
        return;
      }
      engine.message(`石门封印中，还需 ${TOTAL_TREASURES - treasures} 尊鎏金佛像`);
    }

    for (const flame of braziers) {
      flame.scale.setScalar(1 + Math.sin(engine.time * 11 + flame.position.x) * 0.16);
    }

    engine.setHud({
      objective:
        treasures >= TOTAL_TREASURES
          ? "✨ 石门已开！跟随雷达青色星标前往出口传送门"
          : `看左上角雷达黄点找齐 ${TOTAL_TREASURES} 尊金佛 · 左键挥剑斩尸傀`,
      health: Math.round(engine.player.health),
      maxHealth: engine.player.maxHealth,
      stamina: Math.round(engine.player.stamina),
      weapon: "赤焰火把 · 龙渊古剑",
      ammo: -1,
      maxAmmo: -1,
      timeLeft: Math.round(timeLeft),
      kills,
      score: treasures * 400 + kills * 250,
      extra: [
        {
          label: "金佛",
          value: `${treasures} / ${TOTAL_TREASURES}`,
          tone: treasures >= TOTAL_TREASURES ? "good" : "default",
        },
        {
          label: "出口距离",
          value: `${Math.round(distToExit)}m`,
          tone: distToExit < 12 ? "good" : "default",
        },
        {
          label: "尸傀",
          value: `${engine.aliveBots().length}`,
          tone: engine.aliveBots().length > 4 ? "warn" : "default",
        },
      ],
    });
  };

  engine.setHud({
    objective: `看雷达黄点找齐 ${TOTAL_TREASURES} 尊金佛，再从对角青色石门逃出`,
    health: 100,
    maxHealth: 100,
    ammo: -1,
    maxAmmo: -1,
    timeLeft: TOTAL_TIME,
  });

  return {
    dispose: () => engine.dispose(),
    requestStart: () => engine.requestStart(),
  };
};

export default createDungeonLoot;
