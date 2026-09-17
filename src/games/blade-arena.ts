import * as THREE from "three";
import { Engine, type Bot, type ViewWeaponKind } from "./engine";
import type { GameFactory } from "./types";

type WeaponId = "blade" | "bow";

const WEAPONS: Record<
  WeaponId,
  {
    name: string;
    view: ViewWeaponKind;
    melee: boolean;
    damage: number;
    cooldown: number;
    maxAmmo: number;
    reload: number;
    auto: boolean;
  }
> = {
  blade: {
    name: "百炼妖刀 · 斩月",
    view: "katana",
    melee: true,
    damage: 82,
    cooldown: 0.36,
    maxAmmo: Infinity,
    reload: 0,
    auto: true,
  },
  bow: {
    name: "修罗暴雨连弩",
    view: "crossbow",
    melee: false,
    damage: 26,
    cooldown: 0.12,
    maxAmmo: 40,
    reload: 1.15,
    auto: true,
  },
};

interface WaveDef {
  melee: number;
  ranged: number;
  tank: number;
  hp: number;
  speed: number;
  damage: number;
  label: string;
}

const WAVES: WaveDef[] = [
  { melee: 3, ranged: 0, tank: 0, hp: 80, speed: 4.6, damage: 10, label: "第一波 · 初入修罗" },
  { melee: 4, ranged: 1, tank: 0, hp: 92, speed: 4.8, damage: 11, label: "第二波 · 四方围杀" },
  { melee: 5, ranged: 2, tank: 0, hp: 104, speed: 5.0, damage: 12, label: "第三波 · 暗箭难防" },
  { melee: 5, ranged: 2, tank: 1, hp: 118, speed: 5.2, damage: 13, label: "第四波 · 重甲统领" },
  { melee: 7, ranged: 3, tank: 1, hp: 130, speed: 5.4, damage: 14, label: "第五波 · 血战八方" },
  { melee: 8, ranged: 3, tank: 2, hp: 145, speed: 5.6, damage: 15, label: "第六波 · 双魔降临" },
  { melee: 9, ranged: 4, tank: 2, hp: 160, speed: 5.9, damage: 16, label: "第七波 · 剑气如霜" },
  { melee: 10, ranged: 4, tank: 3, hp: 176, speed: 6.1, damage: 18, label: "第八波 · 群狼噬虎" },
  { melee: 12, ranged: 5, tank: 3, hp: 195, speed: 6.4, damage: 20, label: "第九波 · 阿鼻地狱" },
  { melee: 14, ranged: 6, tank: 4, hp: 220, speed: 6.8, damage: 22, label: "第十波 · 剑圣真身" },
];

const ARENA = 40;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export const createBladeArena: GameFactory = ({ container, callbacks }) => {
  const engine = new Engine(
    container,
    {
      sky: { top: 0x160d24, bottom: 0x451222 },
      fog: { color: 0x2a1020, near: 32, far: 155 },
      ambient: 0.48,
      sun: { color: 0xff8f6b, intensity: 1.3, position: [30, 50, -20] },
      killY: -30,
      bloom: { strength: 0.58, radius: 0.44, threshold: 0.74 },
    },
    callbacks,
  );
  engine.playerSpeed = 8.4;
  engine.sprintMult = 1.6;
  engine.maxJumps = 2;
  engine.grappleEnabled = true;
  engine.grappleMaxCooldown = 2.6;
  engine.radarRange = 55;
  engine.setViewWeapon("katana");

  engine.addGround(160, 0x4b4450, 0, true);
  engine.addBox({
    x: 0,
    y: 0.2,
    z: 0,
    w: ARENA * 2,
    h: 0.4,
    d: ARENA * 2,
    color: 0x5a5060,
    texture: "stone",
  });

  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    engine.addBox({
      x: Math.cos(a) * ARENA,
      y: 3,
      z: Math.sin(a) * ARENA,
      w: 5.6,
      h: 6,
      d: 5.6,
      color: i % 2 ? 0x3f3948 : 0x463d4d,
      rotationY: a,
      texture: "stone",
    });
  }

  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.3;
    const px = Math.cos(a) * 22;
    const pz = Math.sin(a) * 22;
    engine.addBox({ x: px, y: 1.4, z: pz, w: 9, h: 2.8, d: 9, color: 0x574c5e, texture: "stone" });
    engine.addBox({ x: px, y: 3.1, z: pz, w: 2, h: 7, d: 2, color: 0x2f2937, texture: "stone" });
  }
  engine.addBox({ x: 0, y: 0.7, z: 0, w: 14, h: 1.4, d: 14, color: 0x6b5f70, texture: "stone" });
  engine.addBox({
    x: 0,
    y: 1.6,
    z: 0,
    w: 3.4,
    h: 0.6,
    d: 3.4,
    color: 0xb91c1c,
    emissive: 0xef4444,
    emissiveIntensity: 0.9,
  });

  const braziers: THREE.Mesh[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const brazier = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 10, 8),
      new THREE.MeshStandardMaterial({
        color: 0xffb347,
        emissive: 0xff5722,
        emissiveIntensity: 2.0,
      }),
    );
    brazier.position.set(Math.cos(a) * 34, 6.8, Math.sin(a) * 34);
    engine.addMesh(brazier);
    braziers.push(brazier);
    if (i % 3 === 0) {
      const light = new THREE.PointLight(0xff7043, 16, 32, 2);
      light.position.copy(brazier.position);
      engine.addMesh(light);
    }
  }

  /* --------------------------------------------------------------- state */
  let weapon: WeaponId = "blade";
  const ammo: Record<WeaponId, number> = { blade: Infinity, bow: 40 };
  let cooldown = 0;
  let reloadTimer = 0;
  let dashCd = 0;
  let kills = 0;
  let combo = 0;
  let comboTimer = 0;
  let bestCombo = 0;
  let score = 0;
  let wave = 0;
  let pending: { role: "melee" | "ranged" | "tank"; delay: number }[] = [];
  let breakTimer = 3.5;
  let ended = false;
  let damageTaken = 0;

  const comboMul = () => Math.min(1 + combo * 0.15, 3);

  const dropLoot = (bot: Bot) => {
    if (Math.random() > 0.42) return;
    const y = engine.surfaceY(bot.pos.x, bot.pos.z, bot.pos.y + 1) + 0.9;
    const isMed = Math.random() < 0.55;
    engine.addPickup({
      pos: new THREE.Vector3(bot.pos.x, y, bot.pos.z),
      kind: isMed ? "med" : "ammo",
      label: isMed ? "血菩提" : "修罗弩匣",
      color: isMed ? 0x4ade80 : 0xfbbf24,
      onPickup: (p) => {
        if (p.kind === "med") {
          engine.healPlayer(32);
          engine.player.armor = Math.min(engine.player.maxArmor, engine.player.armor + 25);
          engine.message("拾取血菩提：气血 +32 · 护甲 +25");
        } else {
          ammo.bow = Math.min(WEAPONS.bow.maxAmmo, ammo.bow + 22);
          engine.message("拾取修罗弩匣 +22");
        }
      },
    });
  };

  const spawnEnemy = (role: "melee" | "ranged" | "tank") => {
    const def = WAVES[wave];
    for (let attempt = 0; attempt < 40; attempt++) {
      const a = rand(0, Math.PI * 2);
      const dist = rand(26, 36);
      const px = Math.cos(a) * dist;
      const pz = Math.sin(a) * dist;
      if (engine.isBlocked(px, 1.2, pz, 1.2, 2)) continue;
      const isTank = role === "tank";
      const isRanged = role === "ranged";
      const bot = engine.addBot({
        pos: new THREE.Vector3(px, 0.4, pz),
        health: isTank ? def.hp * 2.2 : def.hp,
        speed: isTank ? def.speed * 0.75 : isRanged ? def.speed * 0.92 : def.speed,
        damage: isTank ? def.damage * 1.35 : def.damage,
        attackRange: isRanged ? 44 : 2.4,
        attackCooldown: isRanged ? 1.35 : 0.85,
        color: isTank ? 0xf59e0b : isRanged ? 0x7e22ce : 0xb91c1c,
        radius: isTank ? 0.64 : 0.46,
        height: isTank ? 2.25 : 1.85,
        kind: isTank ? "修罗重甲将" : isRanged ? "暗影弩手" : "血衣刺客",
        elite: isTank,
        ranged: isRanged
          ? { interval: 1.4, speed: 40, damage: def.damage * 0.7, spread: 1.2, color: 0xc084fc }
          : null,
      });
      bot.data.role = role === "melee" ? 0 : role === "ranged" ? 1 : 2;
      bot.onDeath = () => {
        kills += 1;
        comboTimer = 4.5;
        combo += 1;
        bestCombo = Math.max(bestCombo, combo);
        score += Math.round((isTank ? 250 : 100) * comboMul());
        dropLoot(bot);
      };
      return;
    }
  };

  engine.customBotUpdate = (bot, dt) => {
    const p = engine.player;
    const dx = p.pos.x - bot.pos.x;
    const dz = p.pos.z - bot.pos.z;
    const dist = Math.hypot(dx, dz);
    const dirX = dist > 0.01 ? dx / dist : 0;
    const dirZ = dist > 0.01 ? dz / dist : 0;
    const role = bot.data.role ?? 0;

    if (role === 1) {
      bot.data.strafeTimer = (bot.data.strafeTimer ?? rand(1, 2)) - dt;
      if (bot.data.strafeTimer <= 0) {
        bot.data.strafeTimer = rand(1, 2.4);
        bot.data.dir = Math.random() < 0.5 ? -1 : 1;
      }
      const want = 15;
      let mx = 0;
      let mz = 0;
      if (dist > want + 4) {
        mx = dirX * bot.speed;
        mz = dirZ * bot.speed;
      } else if (dist < want - 5) {
        mx = -dirX * bot.speed * 0.7;
        mz = -dirZ * bot.speed * 0.7;
      }
      mx += -dirZ * bot.speed * 0.6 * (bot.data.dir ?? 1);
      mz += dirX * bot.speed * 0.6 * (bot.data.dir ?? 1);
      bot.vel.x = mx;
      bot.vel.z = mz;
      bot.rangedTimer -= dt;
      if (bot.rangedTimer <= 0 && dist < 50) {
        bot.rangedTimer = bot.ranged!.interval * rand(0.8, 1.3);
        const from = new THREE.Vector3(bot.pos.x, bot.pos.y + 1.4, bot.pos.z);
        const to = new THREE.Vector3(
          p.pos.x + rand(-1.1, 1.1),
          p.pos.y + 1.1,
          p.pos.z + rand(-1.1, 1.1),
        );
        engine.spawnProjectile({
          pos: from,
          dir: to.sub(from),
          speed: 44,
          damage: bot.ranged!.damage,
          owner: "bot",
          color: 0xc084fc,
          size: 0.1,
        });
        engine.sfx("shoot", 0.06);
      }
    } else {
      const stop = role === 2 ? 2.8 : 1.9;
      const factor = dist < stop * 0.7 ? -0.4 : 1;
      bot.vel.x = dirX * bot.speed * factor;
      bot.vel.z = dirZ * bot.speed * factor;
      bot.cooldown -= dt;
      if (dist < bot.attackRange && Math.abs(p.pos.y - bot.pos.y) < 2.4 && bot.cooldown <= 0) {
        bot.cooldown = bot.attackCooldown;
        engine.damagePlayer(bot.damage);
        engine.burst(
          new THREE.Vector3(p.pos.x, p.pos.y + 1.2, p.pos.z),
          bot.color,
          10,
          3.4,
          0.05,
        );
      }
    }

    if (bot.onGround && Math.hypot(bot.vel.x, bot.vel.z) > 0.4) {
      const nx = bot.pos.x + Math.sign(bot.vel.x) * 0.9;
      const nz = bot.pos.z + Math.sign(bot.vel.z) * 0.9;
      if (engine.isBlocked(nx, bot.pos.y + 0.2, nz, bot.radius, bot.height)) {
        bot.vel.y = engine.jumpPower * 0.9;
      }
    }
  };

  const fire = () => {
    if (cooldown > 0 || reloadTimer > 0) return;
    const def = WEAPONS[weapon];
    if (def.melee) {
      cooldown = def.cooldown;
      engine.sfx("melee", 0.16);
      engine.meleeSwing({ damage: def.damage, range: 3.4, arc: 0.88, waveColor: 0xf97316 });
      return;
    }
    if (ammo.bow <= 0) {
      reloadTimer = def.reload;
      engine.sfx("reload", 0.14);
      return;
    }
    ammo.bow -= 1;
    cooldown = def.cooldown;
    engine.sfx("shoot", 0.12);
    const origin = engine.eyePos;
    const dir = engine.forward;
    dir.x += (Math.random() - 0.5) * 0.016;
    dir.y += (Math.random() - 0.5) * 0.016;
    engine.spawnProjectile({
      pos: origin.clone().add(dir.clone().multiplyScalar(0.7)),
      dir,
      speed: 78,
      damage: def.damage,
      owner: "player",
      color: 0xffe08a,
      size: 0.09,
      life: 2.4,
    });
    engine.shake(0.05);
    if (ammo.bow <= 0) reloadTimer = def.reload;
  };

  const triggerDashSlash = () => {
    if (dashCd > 0) return;
    dashCd = 1.05;
    const dir = engine.forward;
    dir.y = 0;
    if (dir.lengthSq() < 0.01) return;
    dir.normalize();
    engine.player.vel.addScaledVector(dir, 18);
    engine.player.vel.y = Math.max(engine.player.vel.y, 3.4);
    engine.triggerWeaponSwing();
    engine.spawnSlashWave(0xf97316, 85, 42);
    engine.sfx("melee", 0.22);
    engine.ring(engine.player.pos.clone().setY(engine.player.pos.y + 0.4), 0xf97316, 1.8);
    engine.shake(0.2);
    for (const bot of engine.aliveBots()) {
      const d = bot.pos.clone().sub(engine.player.pos);
      if (d.length() < 4.8 && d.clone().normalize().dot(dir) > 0.45) {
        engine.damageBot(bot, 105, true);
      }
    }
  };

  engine.onLeftDown = fire;
  engine.onRightDown = triggerDashSlash;
  engine.onKeyDown = (code) => {
    if (code === "Digit1") {
      weapon = "blade";
      engine.setViewWeapon(WEAPONS.blade.view);
    }
    if (code === "Digit2") {
      weapon = "bow";
      engine.setViewWeapon(WEAPONS.bow.view);
    }
    if (code === "KeyR" && !WEAPONS[weapon].melee && ammo[weapon] < WEAPONS[weapon].maxAmmo) {
      reloadTimer = WEAPONS[weapon].reload;
      engine.sfx("reload", 0.14);
    }
    if (code === "KeyF") triggerDashSlash();
  };

  const startWave = () => {
    const def = WAVES[wave];
    pending = [];
    let delay = 0;
    for (let i = 0; i < def.melee; i++) {
      pending.push({ role: "melee", delay });
      delay += rand(0.2, 0.5);
    }
    for (let i = 0; i < def.ranged; i++) pending.push({ role: "ranged", delay: rand(1, 4) });
    for (let i = 0; i < def.tank; i++) pending.push({ role: "tank", delay: rand(1.5, 4.5) });
    engine.message(`${def.label}（${def.melee + def.ranged + def.tank} 名敌人）`);
    engine.sfx("spawn", 0.2);
  };

  // Start Wave 1 immediately
  startWave();

  const endGame = (outcome: "win" | "lose") => {
    if (ended) return;
    ended = true;
    const finalScore = score + (outcome === "win" ? 2500 : 0) + kills * 20;
    engine.finish(outcome);
    callbacks.onEnd({
      outcome,
      score: finalScore,
      kills,
      wave: wave + 1,
      durationSec: Math.round(engine.time),
      title: outcome === "win" ? "修罗斗神 · 称霸剑台！" : "力竭倒下",
      summary:
        outcome === "win"
          ? `十波尽灭，${kills} 次斩杀，最高 ${bestCombo} 连击。你就是修罗斗剑台之主。`
          : `倒在第 ${wave + 1} 波，斩杀 ${kills} 人，最高 ${bestCombo} 连击。`,
      stats: [
        { label: "波次", value: `${Math.min(wave + 1, WAVES.length)} / ${WAVES.length}` },
        { label: "斩杀", value: `${kills}` },
        { label: "最高连击", value: `${bestCombo}` },
        { label: "承伤", value: `${Math.round(damageTaken)}` },
      ],
    });
  };

  engine.onPlayerDeath = () => endGame("lose");

  let lastHealth = 100;

  // Face center of arena (-Z)
  engine.player.pos.set(0, 1.8, 8);
  engine.lookAt(0, -12);

  engine.onUpdate = (dt) => {
    cooldown = Math.max(0, cooldown - dt);
    dashCd = Math.max(0, dashCd - dt);
    if (reloadTimer > 0) {
      reloadTimer -= dt;
      if (reloadTimer <= 0) ammo[weapon] = WEAPONS[weapon].maxAmmo;
    }
    if (comboTimer > 0) {
      comboTimer -= dt;
      if (comboTimer <= 0) combo = 0;
    }
    if (engine.mouse.left && WEAPONS[weapon].auto) fire();

    const hpNow = engine.player.health;
    if (hpNow < lastHealth) damageTaken += lastHealth - hpNow;
    lastHealth = hpNow;

    for (const item of [...pending]) {
      item.delay -= dt;
      if (item.delay <= 0) {
        spawnEnemy(item.role);
        pending.splice(pending.indexOf(item), 1);
      }
    }

    const alive = engine.aliveBots();
    const eliteBot = alive.find((b) => b.elite);
    engine.bossHud = eliteBot
      ? {
          name: eliteBot.kind,
          health: Math.max(0, Math.round(eliteBot.health)),
          maxHealth: Math.round(eliteBot.maxHealth),
        }
      : null;

    if (pending.length === 0 && alive.length === 0) {
      if (wave >= WAVES.length - 1) {
        endGame("win");
        return;
      }
      breakTimer -= dt;
      if (breakTimer <= 0) {
        wave += 1;
        breakTimer = 4.5;
        engine.healPlayer(25);
        startWave();
      }
    }

    for (const brazier of braziers) {
      brazier.scale.setScalar(1 + Math.sin(engine.time * 9 + brazier.position.x) * 0.12);
    }

    engine.abilities = [
      {
        key: "F / 右键",
        name: "流光瞬步斩",
        cooldown: dashCd,
        maxCooldown: 1.05,
      },
    ];

    engine.setHud({
      objective: `清空第 ${wave + 1} 波敌人 · 1/2 切换太刀与连弩 · F/右键 流光瞬步斩`,
      health: Math.round(engine.player.health),
      maxHealth: engine.player.maxHealth,
      stamina: Math.round(engine.player.stamina),
      weapon: WEAPONS[weapon].name,
      ammo: weapon === "blade" ? -1 : ammo.bow,
      maxAmmo: weapon === "blade" ? -1 : WEAPONS.bow.maxAmmo,
      reloading: reloadTimer > 0,
      kills,
      combo,
      wave: wave + 1,
      score: score + kills * 20,
      extra: [
        {
          label: "场上敌人",
          value: `${alive.length + pending.length}`,
          tone: alive.length > 6 ? "warn" : "default",
        },
        {
          label: "连击倍率",
          value: `x${comboMul().toFixed(2)}`,
          tone: combo > 3 ? "good" : "default",
        },
        {
          label: "瞬步斩",
          value: dashCd > 0 ? `${dashCd.toFixed(1)}s` : "就绪",
          tone: dashCd > 0 ? "default" : "good",
        },
      ],
    });
  };

  engine.setHud({
    objective: "清空每一波敌人 · F/右键 瞬步斩 · E 飞索钩锁",
    health: 100,
    maxHealth: 100,
    weapon: WEAPONS.blade.name,
    ammo: -1,
    maxAmmo: -1,
    wave: 1,
  });

  return {
    dispose: () => engine.dispose(),
    requestStart: () => engine.requestStart(),
  };
};

export default createBladeArena;
