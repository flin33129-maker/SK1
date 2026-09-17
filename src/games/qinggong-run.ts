import * as THREE from "three";
import { Engine } from "./engine";
import type { GameFactory } from "./types";

const TOTAL_TIME = 175;

interface Segment {
  mesh: THREE.Mesh;
  center: THREE.Vector3;
  crumble: boolean;
  timer: number;
  gone: boolean;
  pad: boolean;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export const createQinggongRun: GameFactory = ({ container, callbacks }) => {
  const engine = new Engine(
    container,
    {
      sky: { top: 0x060b20, bottom: 0x1e2959 },
      fog: { color: 0x101935, near: 28, far: 210 },
      ambient: 0.45,
      sun: { color: 0x93c5fd, intensity: 0.78, position: [-50, 65, 30], shadows: false },
      killY: -60,
      bloom: { strength: 0.62, radius: 0.45, threshold: 0.72 },
    },
    callbacks,
  );
  engine.playerSpeed = 8.8;
  engine.sprintMult = 1.38;
  engine.jumpPower = 10.0;
  engine.maxJumps = 2;
  engine.grappleEnabled = true;
  engine.grappleMaxCooldown = 2.0;
  engine.radarRange = 75;
  engine.setViewWeapon("parkour-hands");

  engine.addGround(700, 0x141d2e, -18, true);

  const segments: Segment[] = [];
  const beads: THREE.Vector3[] = [];
  let beadCount = 0;
  const checkpoints: THREE.Vector3[] = [];
  const lanterns: THREE.Mesh[] = [];

  const addRoof = (
    x: number,
    y: number,
    z: number,
    w: number,
    d: number,
    opts: { crumble?: boolean; pad?: boolean; body?: boolean } = {},
  ) => {
    const roofColor = opts.crumble ? 0x784c2c : opts.pad ? 0x0d9488 : 0x334155;
    const roof = engine.addBox({
      x,
      y: y - 0.25,
      z,
      w,
      h: 0.5,
      d,
      color: roofColor,
      roughness: 0.85,
      emissive: opts.pad ? 0x14b8a6 : 0x000000,
      emissiveIntensity: opts.pad ? 1.2 : 0,
      texture: opts.pad ? "none" : "roof",
    });
    engine.addBox({
      x,
      y: y - 0.62,
      z,
      w: w * 0.86,
      h: 0.28,
      d: d * 0.9,
      color: 0x1e293b,
      texture: "wood",
    });
    if (opts.body !== false) {
      engine.addBox({
        x,
        y: y - 2.6,
        z,
        w: w * 0.8,
        h: 3.8,
        d: d * 0.78,
        color: 0x262033,
        roughness: 1,
        texture: "stone",
      });
      for (let i = 0; i < 3; i++) {
        const wx = x + (i - 1) * (w * 0.26);
        engine.addBox({
          x: wx,
          y: y - 1.8,
          z: z + d * 0.4,
          w: 0.8,
          h: 1.1,
          d: 0.1,
          color: 0xffcc88,
          emissive: 0xff9d4d,
          emissiveIntensity: 1.4,
          collide: false,
          texture: "none",
        });
      }
    }
    segments.push({
      mesh: roof,
      center: new THREE.Vector3(x, y, z),
      crumble: !!opts.crumble,
      timer: 0,
      gone: false,
      pad: !!opts.pad,
    });
    return roof;
  };

  let x = 0;
  let z = 0;
  let y = 0;
  let index = 0;
  const goal = new THREE.Vector3();
  checkpoints.push(new THREE.Vector3(0, 0.2, 0));

  while (index < 52) {
    const isCheckpoint = index > 0 && index % 11 === 0;
    const isBeam = !isCheckpoint && index > 4 && index % 7 === 3;
    const isCrumble = !isCheckpoint && !isBeam && index > 8 && index % 9 === 5;
    const isPad = !isCheckpoint && !isBeam && !isCrumble && index > 6 && index % 8 === 4;
    const w = isBeam ? 2.1 : isCheckpoint ? 9.5 : rand(5.0, 8.2);
    const d = isBeam ? rand(6.5, 8.5) : isCheckpoint ? 9.5 : rand(5.8, 8.2);
    addRoof(x, y, z, w, d, { crumble: isCrumble, pad: isPad, body: !isBeam });

    if (isCheckpoint) {
      checkpoints.push(new THREE.Vector3(x, y + 0.1, z));
      for (const side of [-1, 1]) {
        const pole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 3.4, 6),
          new THREE.MeshStandardMaterial({ color: 0x8a5a3b, roughness: 0.9 }),
        );
        pole.position.set(x + side * (w / 2 - 0.6), y + 1.7, z);
        engine.addMesh(pole);
        const lamp = new THREE.Mesh(
          new THREE.SphereGeometry(0.42, 10, 8),
          new THREE.MeshStandardMaterial({
            color: 0xffd28a,
            emissive: 0xff8c3a,
            emissiveIntensity: 2.0,
          }),
        );
        lamp.position.set(x + side * (w / 2 - 0.6), y + 3.5, z);
        engine.addMesh(lamp);
        lanterns.push(lamp);
      }
    } else if (Math.random() < 0.68) {
      const bx = x + rand(-w * 0.28, w * 0.28);
      const bz = z + rand(-d * 0.28, d * 0.28);
      beads.push(new THREE.Vector3(bx, y + 1.15, bz));
    }

    const gap = rand(3.0, 4.8) + Math.min(index * 0.025, 1.2) + (isPad ? 1.5 : 0);
    const nextD = rand(5.6, 8.0);
    z += d / 2 + gap + nextD / 2;
    x = THREE.MathUtils.clamp(x + rand(-4.0, 4.0), -20, 20);
    y = THREE.MathUtils.clamp(y + rand(-1.2, 1.5), -2, 16);
    index += 1;
  }

  const finalY = y;
  addRoof(x, finalY, z + 8, 14, 14, {});
  goal.set(x, finalY, z + 8);
  engine.goalPos = goal;

  const flagPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 7, 8),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.25 }),
  );
  flagPole.position.set(x, finalY + 3.5, z + 8);
  engine.addMesh(flagPole);
  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 2.2),
    new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.4,
      side: THREE.DoubleSide,
    }),
  );
  flag.position.set(x + 1.9, finalY + 5.6, z + 8);
  engine.addMesh(flag);
  lanterns.push(flag);
  checkpoints.push(new THREE.Vector3(x, finalY, z + 8));

  for (const bead of beads) {
    engine.addPickup({
      pos: bead,
      kind: "bead",
      label: "夜明琉璃珠",
      color: 0x38bdf8,
      size: 0.3,
      radius: 1.75,
      onPickup: () => {
        beadCount += 1;
      },
    });
  }

  // Face directly down the rooftop track (+Z)
  engine.player.pos.set(0, 0.25, 0);
  engine.lookAt(0, 50);
  let checkpointIndex = 0;

  let timeLeft = TOTAL_TIME;
  let dashCooldown = 0;
  let falls = 0;
  let ended = false;
  let airTime = 0;

  const respawn = () => {
    const cp = checkpoints[Math.min(checkpointIndex, checkpoints.length - 1)];
    engine.player.pos.set(cp.x, cp.y + 0.35, cp.z);
    engine.player.vel.set(0, 0, 0);
    engine.lookAt(goal.x, goal.z);
    timeLeft = Math.max(0, timeLeft - 3);
    falls += 1;
    engine.message("坠落！已回到最近存档点（按 E 可用飞索钩住屋顶！）");
    engine.sfx("hurt", 0.16);
  };

  engine.onFall = () => respawn();
  engine.onLeftDown = () => {
    engine.triggerWeaponSwing();
    engine.sfx("melee", 0.12);
    const dir = engine.forward;
    dir.y = 0;
    if (dir.lengthSq() > 0.01) {
      dir.normalize();
      engine.player.vel.addScaledVector(dir, 4.2);
    }
  };

  engine.onKeyDown = (code) => {
    if ((code === "ShiftLeft" || code === "ShiftRight") && dashCooldown <= 0) {
      const dir = engine.forward;
      dir.y = 0;
      if (dir.lengthSq() < 0.01) return;
      dir.normalize();
      engine.player.vel.addScaledVector(dir, 15.5);
      engine.player.vel.y = Math.max(engine.player.vel.y, 3.6);
      dashCooldown = 0.85;
      engine.sfx("jump", 0.16);
      engine.ring(engine.player.pos.clone().setY(engine.player.pos.y + 0.2), 0x38bdf8, 1.4);
    }
  };

  const endGame = (outcome: "win" | "lose") => {
    if (ended) return;
    ended = true;
    const remaining = Math.max(0, Math.round(timeLeft));
    const score =
      outcome === "win" ? beadCount * 150 + remaining * 22 + 800 : beadCount * 150;
    engine.finish(outcome);
    callbacks.onEnd({
      outcome,
      score,
      kills: beadCount,
      durationSec: Math.round(TOTAL_TIME - timeLeft),
      title: outcome === "win" ? "踏雪无痕 · 身法通神！" : "时辰已到",
      summary:
        outcome === "win"
          ? `你踏着长安飞檐抵达终点龙旗，收集琉璃珠 ${beadCount}/${beads.length} 枚。`
          : `时间耗尽，共收集琉璃珠 ${beadCount}/${beads.length} 枚。`,
      stats: [
        { label: "琉璃珠", value: `${beadCount} / ${beads.length}` },
        { label: "坠落次数", value: `${falls}` },
        { label: "存档点进度", value: `${checkpointIndex + 1} / ${checkpoints.length}` },
        { label: "滞空时间", value: `${airTime.toFixed(1)} 秒` },
      ],
    });
  };

  engine.onUpdate = (dt) => {
    timeLeft -= dt;
    dashCooldown = Math.max(0, dashCooldown - dt);
    if (!engine.player.onGround) airTime += dt;
    if (timeLeft <= 0) {
      timeLeft = 0;
      endGame("lose");
      return;
    }

    for (const seg of segments) {
      if (seg.gone) continue;
      if (seg.crumble) {
        const onTop =
          Math.abs(engine.player.pos.x - seg.center.x) < 4 &&
          Math.abs(engine.player.pos.z - seg.center.z) < 4 &&
          Math.abs(engine.player.pos.y - seg.center.y) < 0.45;
        if (onTop) {
          seg.timer += dt;
          if (seg.timer > 0.85) {
            engine.removeCollider(seg.mesh);
            seg.gone = true;
            engine.burst(seg.center.clone().setY(seg.center.y - 0.3), 0x9a6b3f, 20, 4, 0.12);
            engine.sfx("hurt", 0.12);
          }
        }
      }
      if (seg.pad) {
        const onPad =
          Math.abs(engine.player.pos.x - seg.center.x) < 4.4 &&
          Math.abs(engine.player.pos.z - seg.center.z) < 4.4 &&
          Math.abs(engine.player.pos.y - seg.center.y) < 0.55;
        if (onPad && engine.player.vel.y <= 0.25) {
          engine.player.vel.y = 15.8;
          engine.player.jumps = 0;
          engine.sfx("jump", 0.2);
          engine.ring(seg.center.clone().setY(seg.center.y + 0.1), 0x5eead4, 1.6);
        }
      }
    }

    if (engine.player.pos.y < -12) respawn();

    for (let i = checkpointIndex + 1; i < checkpoints.length; i++) {
      const cp = checkpoints[i];
      if (Math.hypot(engine.player.pos.x - cp.x, engine.player.pos.z - cp.z) < 5.5) {
        if (i > checkpointIndex) {
          checkpointIndex = i;
          engine.sfx("pickup", 0.16);
          engine.message(`通过第 ${i + 1} 处飞檐存档点！（+6秒）`);
          timeLeft = Math.min(TOTAL_TIME, timeLeft + 6);
        }
      }
    }

    const distToGoal = Math.hypot(engine.player.pos.x - goal.x, engine.player.pos.z - goal.z);
    if (distToGoal < 6 && Math.abs(engine.player.pos.y - goal.y) < 3.5) {
      endGame("win");
      return;
    }

    for (const lamp of lanterns) {
      lamp.rotation.y += dt * 1.4;
    }

    engine.abilities = [
      {
        key: "Shift",
        name: "凌波突进",
        cooldown: dashCooldown,
        maxCooldown: 0.85,
      },
    ];

    engine.setHud({
      objective: "W 前进 · 空格二段跳 · E 飞索钩住前方屋顶 · Shift 空中突进",
      health: Math.round(engine.player.health),
      maxHealth: engine.player.maxHealth,
      stamina: Math.round(engine.player.stamina),
      weapon: "流光短刃 · 飞索身法",
      ammo: -1,
      maxAmmo: -1,
      timeLeft: Math.round(timeLeft),
      score: beadCount * 150 + Math.round(timeLeft) * 22,
      extra: [
        { label: "琉璃珠", value: `${beadCount} / ${beads.length}`, tone: "good" },
        { label: "距终点", value: `${Math.round(distToGoal)}m`, tone: "good" },
        {
          label: "存档点",
          value: `${checkpointIndex + 1} / ${checkpoints.length}`,
        },
      ],
    });
  };

  engine.setHud({
    objective: "沿屋脊前进抵达龙旗 · 按 E 可发射飞索抓钩",
    timeLeft: TOTAL_TIME,
    health: 100,
    maxHealth: 100,
    ammo: -1,
    maxAmmo: -1,
  });

  return {
    dispose: () => engine.dispose(),
    requestStart: () => engine.requestStart(),
  };
};

export default createQinggongRun;
