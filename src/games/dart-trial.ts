import * as THREE from "three";
import { Engine } from "./engine";
import type { GameFactory } from "./types";

const ROUND_TIME = 62;
const MAG = 16;
const GOAL = 5400;

interface Slot {
  pos: THREE.Vector3;
  axis: "x" | "z" | "y";
  amp: number;
  speed: number;
}

interface Target {
  slot: Slot;
  body: THREE.Mesh;
  weak: THREE.Mesh;
  life: number;
  age: number;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export const createDartTrial: GameFactory = ({ container, callbacks }) => {
  const engine = new Engine(
    container,
    {
      sky: { top: 0x1c1510, bottom: 0x3b2a1c },
      fog: { color: 0x261c14, near: 22, far: 115 },
      ambient: 0.62,
      sun: { color: 0xffd7a3, intensity: 1.3, position: [20, 40, 30] },
      killY: -25,
      bloom: { strength: 0.56, radius: 0.42, threshold: 0.74 },
    },
    callbacks,
  );
  engine.playerSpeed = 7.0;
  engine.maxJumps = 1;
  engine.grappleEnabled = false;
  engine.setViewWeapon("dart");

  const W = 68;
  const D = 46;
  engine.addGround(W, 0x6b4a2f, 0, true);
  engine.addBox({
    x: 0,
    y: 3.6,
    z: -D / 2,
    w: W,
    h: 7.2,
    d: 1.2,
    color: 0x5a3d26,
    texture: "wood",
  });
  engine.addBox({
    x: 0,
    y: 3.6,
    z: D / 2,
    w: W,
    h: 7.2,
    d: 1.2,
    color: 0x5a3d26,
    texture: "wood",
  });
  engine.addBox({
    x: -W / 2,
    y: 3.6,
    z: 0,
    w: 1.2,
    h: 7.2,
    d: D,
    color: 0x5a3d26,
    texture: "wood",
  });
  engine.addBox({
    x: W / 2,
    y: 3.6,
    z: 0,
    w: 1.2,
    h: 7.2,
    d: D,
    color: 0x5a3d26,
    texture: "wood",
  });
  engine.addBox({
    x: 0,
    y: 7.4,
    z: 0,
    w: W,
    h: 0.8,
    d: D,
    color: 0x3d2a1a,
    texture: "wood",
  });

  for (let i = -4; i <= 4; i++) {
    engine.addBox({
      x: i * 7.5,
      y: 6.6,
      z: 0,
      w: 0.7,
      h: 0.7,
      d: D,
      color: 0x4a3320,
      collide: false,
      texture: "wood",
    });
  }

  const lanterns: THREE.Mesh[] = [];
  for (let i = -3; i <= 3; i++) {
    const lantern = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 12, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffd9a0,
        emissive: 0xff9b3d,
        emissiveIntensity: 1.9,
      }),
    );
    lantern.position.set(i * 9, 5.6, rand(-6, 6));
    engine.addMesh(lantern);
    lanterns.push(lantern);
    if (i % 2 === 0) {
      const light = new THREE.PointLight(0xffa64d, 14, 24, 2);
      light.position.copy(lantern.position);
      engine.addMesh(light);
    }
  }

  engine.addBox({
    x: 0,
    y: 0.7,
    z: -D / 2 + 2.6,
    w: W - 4,
    h: 1.4,
    d: 1.6,
    color: 0x7a5433,
    texture: "wood",
  });
  engine.addBox({
    x: 0,
    y: 0.6,
    z: D / 2 - 3,
    w: W - 10,
    h: 1.2,
    d: 2,
    color: 0x7a5433,
    texture: "wood",
  });

  const slots: Slot[] = [];
  for (let i = -4; i <= 4; i++) {
    slots.push({
      pos: new THREE.Vector3(i * 6.4, 1.7, -D / 2 + 4.4),
      axis: "x",
      amp: i % 2 === 0 ? 2.4 : 0,
      speed: rand(0.9, 1.8),
    });
  }
  for (let i = 0; i < 3; i++) {
    slots.push({
      pos: new THREE.Vector3(-W / 2 + 3.2, 1.8, -8 + i * 8),
      axis: "z",
      amp: 2.8,
      speed: rand(0.8, 1.5),
    });
    slots.push({
      pos: new THREE.Vector3(W / 2 - 3.2, 1.8, -8 + i * 8),
      axis: "z",
      amp: 2.8,
      speed: rand(0.8, 1.5),
    });
  }
  slots.push({ pos: new THREE.Vector3(-12, 4.4, -6), axis: "y", amp: 1.5, speed: 1.4 });
  slots.push({ pos: new THREE.Vector3(12, 4.4, -6), axis: "y", amp: 1.5, speed: 1.7 });
  slots.push({ pos: new THREE.Vector3(0, 4.8, -12), axis: "x", amp: 5.5, speed: 1.2 });

  /* --------------------------------------------------------------- state */
  const targets: Target[] = [];
  const usedSlots = new Set<Slot>();
  let score = 0;
  let combo = 0;
  let bestCombo = 0;
  let comboTimer = 0;
  let hits = 0;
  let shots = 0;
  let weakHits = 0;
  let ammo = MAG;
  let reloadTimer = 0;
  let cooldown = 0;
  let fanCd = 0;
  const fanMaxCd = 9;
  let timeLeft = ROUND_TIME;
  let spawnTimer = 0.25;
  let ended = false;

  const multiplier = () => Math.min(5, 1 + Math.floor(combo / 3));

  const removeTarget = (target: Target) => {
    target.body.removeFromParent();
    target.weak.removeFromParent();
    target.body.geometry.dispose();
    target.weak.geometry.dispose();
    (target.body.material as THREE.Material).dispose();
    (target.weak.material as THREE.Material).dispose();
    const wi = engine.worldMeshes.indexOf(target.weak);
    if (wi >= 0) engine.worldMeshes.splice(wi, 1);
    const bi = engine.worldMeshes.indexOf(target.body);
    if (bi >= 0) engine.worldMeshes.splice(bi, 1);
    usedSlots.delete(target.slot);
    const idx = targets.indexOf(target);
    if (idx >= 0) targets.splice(idx, 1);
  };

  const spawnTarget = () => {
    const free = slots.filter((s) => !usedSlots.has(s));
    if (free.length === 0) return;
    const slot = free[Math.floor(Math.random() * free.length)];
    const body = engine.addBox({
      x: slot.pos.x,
      y: slot.pos.y + 1.1,
      z: slot.pos.z,
      w: 1.45,
      h: 2.35,
      d: 0.5,
      color: 0xc9a227,
      roughness: 0.75,
      collide: false,
      texture: "wood",
    });
    const weak = engine.addBox({
      x: slot.pos.x,
      y: slot.pos.y + 2.25,
      z: slot.pos.z,
      w: 0.52,
      h: 0.52,
      d: 0.58,
      color: 0xff3b3b,
      emissive: 0xff1f1f,
      emissiveIntensity: 2.1,
      roughness: 0.3,
      collide: false,
      texture: "none",
    });
    const id = Math.random();
    body.userData.targetId = id;
    weak.userData.targetId = id;
    weak.userData.weak = true;
    usedSlots.add(slot);
    targets.push({ slot, body, weak, life: rand(2.3, 3.8), age: 0 });
  };

  const fire = () => {
    if (cooldown > 0 || reloadTimer > 0) return;
    if (ammo <= 0) {
      reloadTimer = 0.85;
      engine.sfx("reload", 0.14);
      return;
    }
    ammo -= 1;
    cooldown = 0.17;
    shots += 1;
    engine.triggerWeaponRecoil(0.65);
    engine.sfx("shoot", 0.13);
    const origin = engine.eyePos;
    const dir = engine.forward;
    const hit = engine.raycast(origin, dir, 130);
    const end = hit ? hit.point : origin.clone().add(dir.clone().multiplyScalar(60));
    engine.tracer(
      origin.clone().add(new THREE.Vector3(0.22, -0.18, -0.2)),
      end,
      0xffe066,
      0.024,
    );
    engine.shake(0.035);
    if (hit && hit.mesh && hit.mesh.userData.targetId !== undefined) {
      const id = hit.mesh.userData.targetId as number;
      const target = targets.find((t) => t.body.userData.targetId === id);
      const weak = hit.mesh.userData.weak === true;
      if (target) {
        hits += 1;
        if (weak) weakHits += 1;
        combo += 1;
        comboTimer = 2.2;
        bestCombo = Math.max(bestCombo, combo);
        const pts = (weak ? 300 : 120) * multiplier();
        score += pts;
        engine.addDamagePopup(hit.point, pts, weak);
        engine.burst(hit.point, weak ? 0xffe066 : 0xff7043, weak ? 22 : 12, 5.2, 0.07);
        engine.sfx(weak ? "pickup" : "hit", 0.18);
        removeTarget(target);
      }
    } else {
      combo = 0;
      engine.burst(end, 0x9ca3af, 5, 2.4, 0.04);
    }
    if (ammo <= 0) reloadTimer = 0.85;
  };

  const castFanOfKnives = () => {
    if (fanCd > 0 || targets.length === 0) return;
    fanCd = fanMaxCd;
    engine.sfx("win", 0.2);
    engine.shake(0.22);
    engine.message("🎯 绝技·例不虚发！全屏木靶瞬间贯穿");
    const origin = engine.eyePos.add(new THREE.Vector3(0, -0.15, 0));
    for (const t of [...targets]) {
      const pt = t.weak.position.clone();
      engine.tracer(origin, pt, 0x38bdf8, 0.032);
      engine.burst(pt, 0xffe066, 18, 5, 0.07);
      hits += 1;
      weakHits += 1;
      combo += 1;
      bestCombo = Math.max(bestCombo, combo);
      const pts = 300 * multiplier();
      score += pts;
      engine.addDamagePopup(pt, pts, true);
      removeTarget(targetFrom(t));
    }
    comboTimer = 2.5;
  };

  function targetFrom(t: Target) {
    return t;
  }

  engine.onLeftDown = fire;
  engine.onRightDown = castFanOfKnives;
  engine.onKeyDown = (code) => {
    if (code === "KeyR" && reloadTimer <= 0 && ammo < MAG) {
      reloadTimer = 0.75;
      engine.sfx("reload", 0.14);
    }
    if (code === "KeyQ") castFanOfKnives();
  };

  const endGame = () => {
    if (ended) return;
    ended = true;
    const accuracy = shots > 0 ? Math.round((hits / shots) * 100) : 0;
    const outcome = score >= GOAL ? "win" : "lose";
    const bonus = outcome === "win" ? 600 + ammo * 25 : 0;
    engine.finish(outcome);
    callbacks.onEnd({
      outcome,
      score: score + bonus,
      kills: hits,
      durationSec: Math.round(ROUND_TIME - timeLeft),
      title: outcome === "win" ? "例不虚发 · 飞刀宗师！" : "还需再练",
      summary:
        outcome === "win"
          ? `${score} 分、命中率 ${accuracy}%，最高 ${bestCombo} 连击，小李飞刀后继有人。`
          : `拿到 ${score} 分（目标 ${GOAL}），命中率 ${accuracy}%，再来一局！`,
      stats: [
        { label: "得分", value: `${score}` },
        { label: "命中率", value: `${accuracy}%` },
        { label: "眉心暴击", value: `${weakHits}` },
        { label: "最高连击", value: `${bestCombo}` },
      ],
    });
  };

  // FIXED: face directly toward the target gallery (-Z) instead of the back wall
  engine.player.pos.set(0, 0.3, 18);
  engine.lookAt(0, -18);

  // Spawn 4 initial targets right away so the dojo is lively on entry
  for (let i = 0; i < 4; i++) spawnTarget();

  engine.onUpdate = (dt) => {
    timeLeft -= dt;
    cooldown = Math.max(0, cooldown - dt);
    fanCd = Math.max(0, fanCd - dt);
    if (reloadTimer > 0) {
      reloadTimer -= dt;
      if (reloadTimer <= 0) ammo = MAG;
    }
    if (comboTimer > 0) {
      comboTimer -= dt;
      if (comboTimer <= 0) combo = 0;
    }
    if (engine.mouse.left) fire();
    if (timeLeft <= 0) {
      timeLeft = 0;
      endGame();
      return;
    }

    spawnTimer -= dt;
    if (spawnTimer <= 0 && targets.length < 5) {
      spawnTimer = rand(0.3, 0.68);
      spawnTarget();
      engine.sfx("tick", 0.04);
    }

    for (const target of [...targets]) {
      target.age += dt;
      target.life -= dt;
      const offset = Math.sin(engine.time * target.slot.speed) * target.slot.amp;
      const base = target.slot.pos;
      if (target.slot.axis === "x") {
        target.body.position.set(base.x + offset, base.y + 1.1, base.z);
      } else if (target.slot.axis === "z") {
        target.body.position.set(base.x, base.y + 1.1, base.z + offset);
      } else {
        target.body.position.set(base.x, base.y + 1.1 + offset, base.z);
      }
      target.weak.position.set(
        target.body.position.x,
        target.body.position.y + 1.15,
        target.body.position.z,
      );
      const mat = target.body.material as THREE.MeshStandardMaterial;
      mat.emissive.setScalar(
        target.life < 0.6 ? 0.5 + Math.sin(engine.time * 22) * 0.4 : 0,
      );
      if (target.life <= 0) {
        removeTarget(target);
        combo = 0;
      }
    }

    for (const lantern of lanterns) {
      lantern.position.y = 5.6 + Math.sin(engine.time * 1.4 + lantern.position.x) * 0.16;
    }

    engine.abilities = [
      {
        key: "Q / 右键",
        name: "例不虚发",
        cooldown: fanCd,
        maxCooldown: fanMaxCd,
      },
    ];

    const accuracy = shots > 0 ? Math.round((hits / shots) * 100) : 0;
    engine.setHud({
      objective: `${ROUND_TIME} 秒内拿到 ${GOAL} 分 · 命中眉心红点三倍分 · Q/右键 例不虚发`,
      health: Math.round(engine.player.health),
      maxHealth: engine.player.maxHealth,
      weapon: "暴雨梨花鎏金镖",
      ammo,
      maxAmmo: MAG,
      reloading: reloadTimer > 0,
      combo,
      timeLeft: Math.round(timeLeft),
      score: score + (score >= GOAL ? 600 + ammo * 25 : 0),
      extra: [
        { label: "命中率", value: `${accuracy}%`, tone: accuracy > 60 ? "good" : "warn" },
        { label: "连击倍率", value: `x${multiplier()}`, tone: combo > 2 ? "good" : "default" },
        { label: "眉心暴击", value: `${weakHits}`, tone: "good" },
      ],
    });
  };

  engine.setHud({
    objective: `${ROUND_TIME} 秒内拿到 ${GOAL} 分 · Q/右键 全屏飞刀`,
    health: 100,
    maxHealth: 100,
    weapon: "暴雨梨花鎏金镖",
    ammo: MAG,
    maxAmmo: MAG,
  });

  return {
    dispose: () => {
      for (const target of [...targets]) removeTarget(target);
      engine.dispose();
    },
    requestStart: () => engine.requestStart(),
  };
};

export default createDartTrial;
