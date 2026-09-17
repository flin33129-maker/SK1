import * as THREE from "three";
import { Engine } from "./engine";
import type { GameFactory } from "./types";

interface WaveDef {
  grunts: number;
  hunters: number;
  flyers: number;
  hp: number;
  speed: number;
  damage: number;
  label: string;
}

const WAVES: WaveDef[] = [
  { grunts: 5, hunters: 0, flyers: 0, hp: 60, speed: 3.1, damage: 10, label: "第一波 · 先锋游兵" },
  { grunts: 7, hunters: 1, flyers: 0, hp: 72, speed: 3.3, damage: 11, label: "第二波 · 破阵步卒" },
  { grunts: 8, hunters: 2, flyers: 1, hp: 84, speed: 3.5, damage: 12, label: "第三波 · 飞魔初现" },
  { grunts: 10, hunters: 2, flyers: 2, hp: 96, speed: 3.7, damage: 13, label: "第四波 · 四面合围" },
  { grunts: 12, hunters: 3, flyers: 2, hp: 108, speed: 3.9, damage: 14, label: "第五波 · 铁甲狂潮" },
  { grunts: 13, hunters: 4, flyers: 3, hp: 122, speed: 4.1, damage: 15, label: "第六波 · 血月当空" },
  { grunts: 15, hunters: 5, flyers: 3, hp: 136, speed: 4.3, damage: 17, label: "第七波 · 魔将亲征" },
  { grunts: 18, hunters: 6, flyers: 4, hp: 155, speed: 4.6, damage: 19, label: "第八波 · 孤城末夜" },
];

const PILLAR_MAX = 650;
const WALL = 46;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export const createArrowSanctum: GameFactory = ({ container, callbacks }) => {
  const engine = new Engine(
    container,
    {
      sky: { top: 0x1e1333, bottom: 0x8b3a2f },
      fog: { color: 0x5c2f29, near: 42, far: 220 },
      ambient: 0.55,
      sun: { color: 0xffb27a, intensity: 1.35, position: [-60, 55, 40] },
      killY: -40,
      bloom: { strength: 0.58, radius: 0.44, threshold: 0.74 },
    },
    callbacks,
  );
  engine.playerSpeed = 7.6;
  engine.maxJumps = 2;
  engine.grappleEnabled = true;
  engine.grappleMaxCooldown = 3.0;
  engine.radarRange = 95;
  engine.setViewWeapon("longbow");

  engine.addGround(320, 0x6b5a44, 0, true);

  engine.addBox({ x: 0, y: 0.4, z: 0, w: 34, h: 0.8, d: 34, color: 0x8a8378, texture: "stone" });
  engine.addBox({ x: 0, y: 0.95, z: 0, w: 16, h: 0.3, d: 16, color: 0xa39a8b, texture: "stone" });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    engine.addBox({
      x: Math.cos(a) * 15,
      y: 1.6,
      z: Math.sin(a) * 15,
      w: 1.4,
      h: 2.4,
      d: 1.4,
      color: 0x6f6659,
      rotationY: a,
      texture: "stone",
    });
  }

  // Spirit Pillar
  const pillarGroup = new THREE.Group();
  const crystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(2.4, 0),
    new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: 0x22d3ee,
      emissiveIntensity: 1.9,
      roughness: 0.15,
      metalness: 0.3,
    }),
  );
  crystal.position.y = 5.4;
  pillarGroup.add(crystal);
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(2.6, 3.2, 2.2, 12),
    new THREE.MeshStandardMaterial({ color: 0x5f5850, roughness: 1 }),
  );
  base.position.y = 2;
  pillarGroup.add(base);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.4, 0.12, 8, 40),
    new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: 1.6,
    }),
  );
  ring.position.y = 5.4;
  ring.rotation.x = Math.PI / 2;
  pillarGroup.add(ring);
  const pillarLight = new THREE.PointLight(0x67e8f9, 26, 40, 2);
  pillarLight.position.y = 5.4;
  pillarGroup.add(pillarLight);
  engine.addMesh(pillarGroup);
  engine.goalPos = new THREE.Vector3(0, 0, 0);

  const gate = 9;
  const seg = (WALL * 2 - gate) / 2;
  for (const axis of ["x", "z"] as const) {
    for (const sign of [-1, 1]) {
      for (const side of [-1, 1]) {
        const offset = gate / 2 + seg / 2 + side * seg;
        engine.addBox({
          x: axis === "x" ? sign * WALL : offset,
          y: 3.2,
          z: axis === "x" ? offset : sign * WALL,
          w: axis === "x" ? 2.4 : seg,
          h: 6.4,
          d: axis === "x" ? seg : 2.4,
          color: 0x7a6a58,
          texture: "stone",
        });
      }
      for (let i = -6; i <= 6; i++) {
        engine.addBox({
          x: axis === "x" ? sign * WALL : i * 3.2,
          y: 7,
          z: axis === "x" ? i * 3.2 : sign * WALL,
          w: axis === "x" ? 2.8 : 1.6,
          h: 1.2,
          d: axis === "x" ? 1.6 : 2.8,
          color: 0x6a5b4b,
          texture: "stone",
        });
      }
      for (let s = 0; s < 9; s++) {
        const inner = sign * (WALL - 6);
        engine.addBox({
          x: axis === "x" ? sign * WALL + 2.2 : inner - s * 2.2,
          y: 0.5 + s * 0.78,
          z: axis === "x" ? inner - s * 2.2 : sign * WALL - 2.2,
          w: axis === "x" ? 3 : 2.4,
          h: 0.8,
          d: axis === "x" ? 2.4 : 3,
          color: 0x8b7c69,
          texture: "stone",
        });
      }
    }
  }

  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      engine.addBox({ x: sx * 30, y: 3, z: sz * 30, w: 5, h: 6, d: 5, color: 0x6f6152, texture: "stone" });
      engine.addBox({ x: sx * 30, y: 6.4, z: sz * 30, w: 7, h: 0.8, d: 7, color: 0x5c4f42, texture: "roof" });
    }
  }

  /* --------------------------------------------------------------- state */
  let wave = 0;
  let pending: { role: "grunt" | "hunter" | "flyer"; delay: number }[] = [];
  let breakTimer = 4.5;
  let kills = 0;
  let pillarHp = PILLAR_MAX;
  let score = 0;
  let shots = 0;
  let hits = 0;
  let ended = false;
  let charge = 0;
  let charging = false;
  let nocked = true;
  let nockedTimer = 0.45;
  let volleyCd = 0;
  const volleyMaxCd = 10;

  const spawnEnemy = (role: "grunt" | "hunter" | "flyer") => {
    for (let attempt = 0; attempt < 40; attempt++) {
      const a = rand(0, Math.PI * 2);
      const dist = rand(60, 86);
      const px = Math.cos(a) * dist;
      const pz = Math.sin(a) * dist;
      if (engine.isBlocked(px, 1, pz, 1.4, 2)) continue;
      const def = WAVES[Math.min(wave, WAVES.length - 1)];
      const isFlyer = role === "flyer";
      const bot = engine.addBot({
        pos: new THREE.Vector3(px, isFlyer ? rand(6, 10) : 0.1, pz),
        health: isFlyer ? def.hp * 0.75 : def.hp,
        speed: isFlyer ? def.speed * 1.45 : role === "hunter" ? def.speed * 1.15 : def.speed,
        damage: def.damage,
        attackRange: role === "hunter" ? 2.3 : 3.2,
        attackCooldown: role === "hunter" ? 0.95 : 1.3,
        color: isFlyer ? 0x7c3aed : role === "hunter" ? 0xdc2626 : 0x4b5563,
        radius: isFlyer ? 0.5 : 0.48,
        height: isFlyer ? 1.65 : 1.9,
        kind: isFlyer ? "飞天夜叉" : role === "hunter" ? "血影猎手" : "攻城魔兵",
        gravity: !isFlyer,
        elite: role === "flyer",
        ranged:
          role === "hunter"
            ? { interval: 1.5, speed: 34, damage: def.damage * 0.75, spread: 1.3, color: 0xffa07a }
            : null,
      });
      bot.data.role = role === "grunt" ? 0 : role === "hunter" ? 1 : 2;
      bot.onDeath = () => {
        kills += 1;
        score += 130;
        volleyCd = Math.max(0, volleyCd - 1);
      };
      return;
    }
  };

  engine.customBotUpdate = (bot, dt) => {
    const p = engine.player;
    const role = bot.data.role ?? 0;
    if (role === 2) {
      const dx = 0 - bot.pos.x;
      const dy = 4.6 - bot.pos.y;
      const dz = 0 - bot.pos.z;
      const dist = Math.hypot(dx, dy, dz);
      bot.vel.set((dx / dist) * bot.speed, (dy / dist) * bot.speed, (dz / dist) * bot.speed);
      if (dist < 3.4) {
        engine.burst(bot.pos.clone(), 0xa855f7, 26, 8, 0.12);
        pillarHp -= bot.damage * 2.2;
        engine.shake(0.45);
        engine.sfx("hurt", 0.2);
        engine.message("⚠️ 飞天夜叉撞击中央灵柱！");
        bot.onDeath = undefined;
        engine.removeBot(bot);
      }
      return;
    }
    if (role === 1) {
      const dx = p.pos.x - bot.pos.x;
      const dz = p.pos.z - bot.pos.z;
      const dist = Math.hypot(dx, dz);
      const dirX = dist > 0.01 ? dx / dist : 0;
      const dirZ = dist > 0.01 ? dz / dist : 0;
      bot.vel.x = dirX * bot.speed;
      bot.vel.z = dirZ * bot.speed;
      bot.cooldown -= dt;
      if (dist < bot.attackRange && Math.abs(p.pos.y - bot.pos.y) < 2.6 && bot.cooldown <= 0) {
        bot.cooldown = bot.attackCooldown;
        engine.damagePlayer(bot.damage);
      }
      if (
        bot.onGround &&
        engine.isBlocked(
          bot.pos.x + dirX * 0.9,
          bot.pos.y + 0.2,
          bot.pos.z + dirZ * 0.9,
          bot.radius,
          bot.height,
        )
      ) {
        bot.vel.y = engine.jumpPower * 0.85;
      }
      return;
    }
    const dx = 0 - bot.pos.x;
    const dz = 0 - bot.pos.z;
    const dist = Math.hypot(dx, dz);
    const dirX = dist > 0.01 ? dx / dist : 0;
    const dirZ = dist > 0.01 ? dz / dist : 0;
    bot.vel.x = dirX * bot.speed;
    bot.vel.z = dirZ * bot.speed;
    bot.cooldown -= dt;
    if (dist < bot.attackRange) {
      bot.vel.x = 0;
      bot.vel.z = 0;
      if (bot.cooldown <= 0) {
        bot.cooldown = bot.attackCooldown;
        pillarHp -= bot.damage;
        engine.burst(new THREE.Vector3(0, 3.4, 0), 0x67e8f9, 8, 3, 0.06);
        engine.shake(0.12);
      }
    }
    if (
      bot.onGround &&
      engine.isBlocked(
        bot.pos.x + dirX * 0.9,
        bot.pos.y + 0.2,
        bot.pos.z + dirZ * 0.9,
        bot.radius,
        bot.height,
      )
    ) {
      bot.vel.y = engine.jumpPower * 0.8;
    }
  };

  const releaseArrow = () => {
    if (!charging) return;
    charging = false;
    engine.setBowCharge(0);
    engine.updateBowPreview(false, 0, 0);
    const power = THREE.MathUtils.clamp(charge / 0.95, 0.18, 1);
    charge = 0;
    if (!nocked) return;
    nocked = false;
    nockedTimer = 0.42; // FIXED: properly reset nockedTimer on every shot
    shots += 1;
    engine.sfx("arrow", 0.18);
    engine.shake(0.08 + power * 0.14);
    const origin = engine.eyePos;
    const dir = engine.forward;
    engine.spawnProjectile({
      pos: origin.clone().add(dir.clone().multiplyScalar(0.75)).add(new THREE.Vector3(0, -0.1, 0)),
      dir,
      speed: 36 + power * 56,
      damage: 42 + power * 84,
      owner: "player",
      color: 0xfef08a,
      gravity: 12,
      size: 0.11,
      radius: 0.45,
      life: 4,
      onHit: () => {
        hits += 1;
        score += 25;
      },
    });
  };

  const castVolley = () => {
    if (volleyCd > 0) {
      engine.message(`流星箭雨冷却中（${volleyCd.toFixed(1)}s）`);
      return;
    }
    volleyCd = volleyMaxCd;
    engine.sfx("arrow", 0.22);
    engine.shake(0.24);
    engine.message("🏹 绝技·流星火雨！七箭连珠");
    const origin = engine.eyePos;
    const baseDir = engine.forward;
    for (let i = -3; i <= 3; i++) {
      const dir = baseDir
        .clone()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), i * 0.055)
        .normalize();
      engine.spawnProjectile({
        pos: origin.clone().add(dir.clone().multiplyScalar(0.8)),
        dir,
        speed: 78,
        damage: 95,
        owner: "player",
        color: 0xf97316,
        gravity: 9,
        size: 0.14,
        radius: 0.55,
        life: 4,
      });
    }
  };

  engine.onLeftDown = () => {
    if (!nocked) return;
    charging = true;
    charge = 0;
  };
  engine.onLeftUp = () => releaseArrow();
  engine.onRightDown = () => castVolley();
  engine.onKeyDown = (code) => {
    if (code === "KeyQ") castVolley();
  };

  const startWave = () => {
    const def = WAVES[wave];
    pending = [];
    let delay = 0;
    for (let i = 0; i < def.grunts; i++) {
      pending.push({ role: "grunt", delay });
      delay += rand(0.25, 0.65);
    }
    for (let i = 0; i < def.hunters; i++) {
      pending.push({ role: "hunter", delay: rand(1, 5) });
    }
    for (let i = 0; i < def.flyers; i++) {
      pending.push({ role: "flyer", delay: rand(2, 7) });
    }
    engine.message(`${def.label} · ${def.grunts + def.hunters + def.flyers} 名敌军来袭`);
    engine.sfx("spawn", 0.2);
  };

  // Start Wave 1 immediately
  startWave();

  const endGame = (outcome: "win" | "lose") => {
    if (ended) return;
    ended = true;
    const accuracy = shots > 0 ? Math.round((hits / shots) * 100) : 0;
    const finalScore = score + (outcome === "win" ? 1500 + Math.round(pillarHp) : 0);
    engine.finish(outcome);
    callbacks.onEnd({
      outcome,
      score: finalScore,
      kills,
      wave: wave + 1,
      durationSec: Math.round(engine.time),
      title: outcome === "win" ? "孤城不落 · 箭神无双！" : "灵柱崩碎",
      summary:
        outcome === "win"
          ? `八波魔军尽退，灵柱尚余 ${Math.max(0, Math.round(pillarHp))} 点灵力。`
          : `坚守至第 ${wave + 1} 波，射杀 ${kills} 名魔兵。`,
      stats: [
        { label: "坚守波次", value: `${Math.min(wave + 1, WAVES.length)} / ${WAVES.length}` },
        { label: "射杀数", value: `${kills}` },
        { label: "灵柱灵力", value: `${Math.max(0, Math.round(pillarHp))} / ${PILLAR_MAX}` },
        { label: "命中率", value: `${accuracy}%` },
      ],
    });
  };

  engine.onPlayerDeath = () => endGame("lose");

  // Spawn on the keep terrace facing the Spirit Pillar (-Z)
  engine.player.pos.set(0, 1.25, 14);
  engine.lookAt(0, 0);

  engine.onUpdate = (dt) => {
    volleyCd = Math.max(0, volleyCd - dt);
    if (charging) {
      charge = Math.min(charge + dt, 0.95);
      const power = THREE.MathUtils.clamp(charge / 0.95, 0.18, 1);
      engine.setBowCharge(power);
      engine.updateBowPreview(true, 36 + power * 56, 12);
    }
    if (!nocked) {
      nockedTimer -= dt;
      if (nockedTimer <= 0) nocked = true;
    }
    if (pillarHp <= 0) {
      pillarHp = 0;
      endGame("lose");
      return;
    }

    for (const item of [...pending]) {
      item.delay -= dt;
      if (item.delay <= 0) {
        spawnEnemy(item.role);
        pending.splice(pending.indexOf(item), 1);
      }
    }

    const alive = engine.aliveBots().length;
    if (pending.length === 0 && alive === 0) {
      if (wave >= WAVES.length - 1) {
        endGame("win");
        return;
      }
      breakTimer -= dt;
      if (breakTimer <= 0) {
        wave += 1;
        breakTimer = 5.0;
        engine.healPlayer(25);
        nocked = true;
        startWave();
      }
    }

    const hpRatio = pillarHp / PILLAR_MAX;
    crystal.rotation.y += dt * 0.8;
    crystal.rotation.x += dt * 0.3;
    crystal.position.y = 5.4 + Math.sin(engine.time * 1.6) * 0.22;
    ring.rotation.z += dt * 1.2;
    const crystalMat = crystal.material as THREE.MeshStandardMaterial;
    crystalMat.emissive.setRGB(
      0.13 + (1 - hpRatio) * 0.8,
      0.83 * hpRatio + 0.05,
      0.99 * hpRatio,
    );
    pillarLight.intensity = 14 + hpRatio * 18 + Math.sin(engine.time * 6) * 2;

    engine.bossHud = {
      name: "中央护城灵柱",
      health: Math.max(0, Math.round(pillarHp)),
      maxHealth: PILLAR_MAX,
    };

    engine.abilities = [
      {
        key: "Q / 右键",
        name: "流星火雨",
        cooldown: volleyCd,
        maxCooldown: volleyMaxCd,
      },
    ];

    engine.setHud({
      objective: `守卫中央灵柱 · ${WAVES[Math.min(wave, WAVES.length - 1)].label}（长按左键显示3D弹道）`,
      health: Math.round(engine.player.health),
      maxHealth: engine.player.maxHealth,
      weapon: charging
        ? `神臂长弓 · 蓄力 ${((charge / 0.95) * 100).toFixed(0)}%`
        : nocked
          ? "神臂长弓 · 已搭箭"
          : "搭箭中…",
      ammo: -1,
      maxAmmo: -1,
      reloading: !nocked,
      kills,
      wave: wave + 1,
      score,
      extra: [
        {
          label: "灵柱灵力",
          value: `${Math.max(0, Math.round(pillarHp))}`,
          tone: hpRatio < 0.35 ? "warn" : "good",
        },
        { label: "来袭魔兵", value: `${alive + pending.length}` },
        {
          label: "下一波",
          value:
            pending.length === 0 && alive === 0 ? `${Math.max(0, Math.ceil(breakTimer))}s` : "交战中",
        },
      ],
    });
  };

  engine.setHud({
    objective: "长按左键蓄力（带实时3D弹道线） · Q/右键释放流星火雨 · E 飞索上城墙",
    health: 100,
    maxHealth: 100,
    ammo: -1,
    maxAmmo: -1,
    weapon: "神臂长弓",
  });

  return {
    dispose: () => engine.dispose(),
    requestStart: () => engine.requestStart(),
  };
};

export default createArrowSanctum;
