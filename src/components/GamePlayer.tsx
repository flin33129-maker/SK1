"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { loadGameFactory } from "@/games/registry";
import type { GameHandle, GameResult, HudState, RadarState } from "@/games/types";
import type { GameMeta } from "@/lib/games";

function fmtTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Player-centric rotating tactical radar (up = camera forward direction) */
function TacticalRadar({ radar }: { radar: RadarState }) {
  const size = 136;
  const half = size / 2;
  const scale = (half - 10) / Math.max(radar.range, 1);

  // Rotate world offset (dx, dz) into camera-local coordinates where -Y on SVG is forward
  // Since forward = (-sin(yaw), -cos(yaw)) and right = (cos(yaw), -sin(yaw)):
  // localX = dx * cos(yaw) - dz * sin(yaw)
  // localForward = -dx * sin(yaw) - dz * cos(yaw)
  // SVG X = half + localX * scale, SVG Y = half - localForward * scale
  const sin = Math.sin(radar.yaw);
  const cos = Math.cos(radar.yaw);
  const project = (dx: number, dz: number) => {
    const lx = dx * cos - dz * sin;
    const lf = -dx * sin - dz * cos;
    const dist = Math.hypot(lx, lf);
    const maxR = radar.range * 0.94;
    const clamped = dist > maxR ? maxR / dist : 1;
    return {
      x: half + lx * clamped * scale,
      y: half - lf * clamped * scale,
    };
  };

  const zonePt = radar.zone ? project(radar.zone.dx, radar.zone.dz) : null;

  return (
    <div className="relative h-[136px] w-[136px] overflow-hidden rounded-full border border-amber-300/35 bg-slate-950/75 shadow-lg shadow-black/60 backdrop-blur-md">
      <svg width={size} height={size} className="block">
        <circle cx={half} cy={half} r={half - 4} fill="none" stroke="rgba(148,163,184,0.18)" />
        <circle cx={half} cy={half} r={(half - 4) * 0.55} fill="none" stroke="rgba(148,163,184,0.14)" />
        <line x1={half} y1={4} x2={half} y2={size - 4} stroke="rgba(148,163,184,0.12)" />
        <line x1={4} y1={half} x2={size - 4} y2={half} stroke="rgba(148,163,184,0.12)" />
        {/* FOV cone */}
        <polygon
          points={`${half},${half} ${half - 34},10 ${half + 34},10`}
          fill="rgba(56,189,248,0.12)"
        />
        {/* Safe zone circle */}
        {zonePt && radar.zone && (
          <circle
            cx={zonePt.x}
            cy={zonePt.y}
            r={Math.max(6, radar.zone.radius * scale)}
            fill="none"
            stroke="rgba(56,189,248,0.7)"
            strokeDasharray="4 2"
            strokeWidth={1.5}
          />
        )}
        {/* Blips */}
        {radar.blips.map((b, idx) => {
          const pt = project(b.dx, b.dz);
          if (b.kind === "goal") {
            return (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={5}
                fill="#22d3ee"
                stroke="#ffffff"
                strokeWidth={1.5}
              />
            );
          }
          if (b.kind === "boss") {
            return (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={4.5}
                fill="#f59e0b"
                stroke="#fef08a"
                strokeWidth={1.2}
              />
            );
          }
          if (b.kind === "enemy") {
            return <circle key={idx} cx={pt.x} cy={pt.y} r={3.4} fill="#f43f5e" />;
          }
          return <circle key={idx} cx={pt.x} cy={pt.y} r={2.6} fill="#facc15" />;
        })}
        {/* Player arrow at center pointing UP */}
        <polygon
          points={`${half},${half - 6} ${half - 4.5},${half + 5} ${half},${half + 2.5} ${half + 4.5},${half + 5}`}
          fill="#fbbf24"
          stroke="#090d16"
          strokeWidth={1}
        />
      </svg>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-widest text-slate-400">
        RADAR
      </span>
    </div>
  );
}

export default function GamePlayer({ game }: { game: GameMeta }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const handleRef = useRef<GameHandle | null>(null);
  const [hud, setHud] = useState<HudState>({});
  const [status, setStatus] = useState<"loading" | "ready" | "running" | "ended">("loading");
  const [locked, setLocked] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [ossScoreModal, setOssScoreModal] = useState(false);
  const [ossScoreVal, setOssScoreVal] = useState("8500");
  const [ossKillsVal, setOssKillsVal] = useState("12");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const stored = window.localStorage.getItem("sk1-player-name");
    if (stored) setPlayerName(stored);
  }, []);

  useEffect(() => {
    if (game.ossUrl) {
      setStatus("running");
      void fetch("/api/plays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: game.slug }),
      }).catch(() => undefined);
      return;
    }

    let disposed = false;
    let handle: GameHandle | null = null;
    setStatus("loading");
    setResult(null);
    setSaveState("idle");
    setHud({});

    const container = containerRef.current;
    if (!container) return;

    const boot = async () => {
      try {
        const factory = await loadGameFactory(game.slug);
        if (!factory || disposed) return;
        handle = factory({
          container,
          callbacks: {
            setHud: (next) => setHud(next),
            onEnd: (res) => {
              setResult(res);
              setStatus("ended");
            },
            onLockChange: (isLocked, fallback) => {
              setLocked(isLocked);
              setFallbackMode(Boolean(fallback) && isLocked);
              if (isLocked) {
                setStatus((prev) => (prev === "ready" || prev === "loading" ? "running" : prev));
              }
            },
          },
        });
        handleRef.current = handle;
        if (disposed) {
          handle.dispose();
          return;
        }
        setStatus("ready");
        void fetch("/api/plays", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: game.slug }),
        }).catch(() => undefined);
      } catch {
        if (!disposed) setError("引擎初始化失败，请刷新页面重试。");
      }
    };

    void boot();
    return () => {
      disposed = true;
      handle?.dispose();
      handleRef.current = null;
    };
  }, [game.slug, nonce]);

  const start = useCallback(() => {
    handleRef.current?.requestStart();
  }, []);

  const retry = useCallback(() => {
    setNonce((n) => n + 1);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    } else {
      void el.requestFullscreen().catch(() => undefined);
    }
  }, []);

  const router = useRouter();

  const submitScore = useCallback(async () => {
    if (!result) return;
    const name = playerName.trim() || "无名侠客";
    window.localStorage.setItem("sk1-player-name", name);
    setSaveState("saving");
    try {
      const res = await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameSlug: game.slug,
          playerName: name,
          score: result.score,
          kills: result.kills,
          wave: result.wave ?? 0,
          durationSec: result.durationSec,
          won: result.outcome === "win",
          note: result.title,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      setSaveState("saved");
      router.refresh();
    } catch {
      setSaveState("error");
    }
  }, [game.slug, playerName, result, router]);

  const submitOssScore = useCallback(async () => {
    const name = playerName.trim() || "无名指挥官";
    window.localStorage.setItem("sk1-player-name", name);
    setSaveState("saving");
    try {
      const res = await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameSlug: game.slug,
          playerName: name,
          score: Math.max(100, Number(ossScoreVal) || 8500),
          kills: Math.max(0, Number(ossKillsVal) || 0),
          wave: 1,
          durationSec: 180,
          won: true,
          note: "开源3A引擎战绩登记",
        }),
      });
      if (!res.ok) throw new Error("save failed");
      setSaveState("saved");
      router.refresh();
      setTimeout(() => setOssScoreModal(false), 700);
    } catch {
      setSaveState("error");
    }
  }, [game.slug, ossKillsVal, ossScoreVal, playerName, router]);

  if (game.ossUrl) {
    return (
      <div
        ref={wrapperRef}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-amber-400/30 bg-slate-950 shadow-2xl"
      >
        {/* Top control bar for open-source 3D engine */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-900/90 px-4 py-2 text-xs text-slate-200 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-400/20 px-2 py-0.5 text-[11px] font-bold text-amber-300">
              ★ 本地化开源 3A 引擎直连
            </span>
            <span className="font-semibold text-white">{game.name}</span>
            {game.repoUrl && (
              <a
                href={game.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] text-sky-300 transition hover:bg-white/10"
              >
                GitHub 源码 ↗
              </a>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSaveState("idle");
                setOssScoreModal(true);
              }}
              className="rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 px-3 py-1 text-[11px] font-bold text-slate-950 transition hover:brightness-110"
            >
              🏆 登记战绩上榜
            </button>
            <a
              href={game.ossUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-white/20"
            >
              ↗ 独立标签页打开
            </a>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="rounded-lg border border-amber-300/40 bg-amber-400/15 px-2.5 py-1 text-[11px] font-semibold text-amber-200 transition hover:bg-amber-400/25"
            >
              ⛶ 全屏沉浸
            </button>
          </div>
        </div>

        {/* Full-bleed WebGL game canvas iframe */}
        <iframe
          ref={iframeRef}
          src={game.ossUrl}
          title={game.name}
          allow="fullscreen; autoplay; pointer-lock; gamepad; accelerometer; gyroscope"
          className="h-full w-full flex-1 border-0 bg-black"
        />

        {/* Score registration modal for OSS games */}
        {ossScoreModal && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
            <div className="w-full max-w-md rounded-2xl border border-white/15 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">🏆 登记《{game.name}》战绩</h3>
                <button
                  type="button"
                  onClick={() => setOssScoreModal(false)}
                  className="text-sm text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                将你在本局开源 3D 引擎中取得的积分与击毁/关卡数录入 PostgreSQL 全站排行榜：
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] text-slate-300">玩家代号 / 侠号</label>
                  <input
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    maxLength={18}
                    placeholder="例如：苍穹装甲师"
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-300">本局得分</label>
                    <input
                      type="number"
                      value={ossScoreVal}
                      onChange={(e) => setOssScoreVal(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-amber-300 outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300">击毁 / 关卡数</label>
                    <input
                      type="number"
                      value={ossKillsVal}
                      onChange={(e) => setOssKillsVal(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-emerald-300 outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={submitOssScore}
                  disabled={saveState === "saving" || saveState === "saved"}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110 disabled:opacity-60"
                >
                  {saveState === "saving"
                    ? "正在写入数据库…"
                    : saveState === "saved"
                      ? "已写入排行榜 ✓"
                      : "确认提交战绩"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const healthPct = hud.maxHealth
    ? Math.max(0, Math.min(100, ((hud.health ?? 0) / hud.maxHealth) * 100))
    : 100;
  const armorPct = hud.maxArmor
    ? Math.max(0, Math.min(100, ((hud.armor ?? 0) / hud.maxArmor) * 100))
    : 0;
  const staminaPct = Math.max(0, Math.min(100, hud.stamina ?? 100));
  const showOverlay = status !== "running" || !locked;

  return (
    <div
      ref={wrapperRef}
      className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
    >
      <div ref={containerRef} className="absolute inset-0" />

      {/* Fullscreen button */}
      <button
        type="button"
        onClick={toggleFullscreen}
        className="absolute right-3 bottom-20 z-20 rounded-lg border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur-sm transition hover:border-amber-300/60 hover:text-amber-200"
      >
        ⛶ 全屏
      </button>

      {/* ------------------------------------------------------------ HUD */}
      {status === "running" || status === "ended" ? (
        <div className="pointer-events-none absolute inset-0 select-none font-sans text-white">
          {/* Top-left Radar + Objective */}
          <div className="absolute left-4 top-4 flex items-start gap-3">
            {hud.radar && <TacticalRadar radar={hud.radar} />}
            <div className="max-w-xs space-y-2 sm:max-w-md">
              <div className="inline-block rounded-lg border border-amber-400/25 bg-black/55 px-3 py-1.5 text-[12px] leading-tight text-amber-100 backdrop-blur-sm">
                🎯 {hud.objective ?? game.tagline}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(hud.extra ?? []).map((item) => (
                  <span
                    key={item.label}
                    className={`rounded-md px-2 py-1 text-[11px] backdrop-blur-sm ${
                      item.tone === "warn"
                        ? "bg-rose-600/45 text-rose-100"
                        : item.tone === "good"
                          ? "bg-emerald-600/40 text-emerald-100"
                          : "bg-black/50 text-slate-200"
                    }`}
                  >
                    {item.label} <b className="font-semibold">{item.value}</b>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Top-center Boss / Pillar Health Bar & Timer */}
          <div className="absolute left-1/2 top-4 flex -translate-x-1/2 flex-col items-center gap-2">
            {hud.timeLeft !== undefined && (
              <div className="rounded-xl border border-white/10 bg-black/55 px-4 py-1 text-center backdrop-blur-sm">
                <div className="text-[9px] uppercase tracking-[0.2em] text-slate-300">剩余时间</div>
                <div
                  className={`text-lg font-bold tabular-nums ${
                    hud.timeLeft < 20 ? "text-rose-400" : "text-white"
                  }`}
                >
                  {fmtTime(hud.timeLeft)}
                </div>
              </div>
            )}
            {hud.boss && (
              <div className="w-64 rounded-xl border border-amber-400/35 bg-black/65 px-3.5 py-2 backdrop-blur-md sm:w-80">
                <div className="flex items-center justify-between text-[11px] font-semibold text-amber-200">
                  <span>👑 {hud.boss.name}</span>
                  <span className="tabular-nums">
                    {hud.boss.health} / {hud.boss.maxHealth}
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-900">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-yellow-300 transition-all duration-150"
                    style={{
                      width: `${Math.max(0, Math.min(100, (hud.boss.health / hud.boss.maxHealth) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Top-right Score & Kills */}
          <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
            {hud.score !== undefined && (
              <div className="rounded-lg border border-white/10 bg-black/55 px-3 py-1.5 text-right backdrop-blur-sm">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300">战功积分</div>
                <div className="text-lg font-bold tabular-nums text-amber-300">
                  {hud.score.toLocaleString()}
                </div>
              </div>
            )}
            <div className="flex gap-1.5">
              {hud.wave !== undefined && (
                <span className="rounded-md bg-black/50 px-2 py-1 text-[11px] backdrop-blur-sm">
                  第 {hud.wave} 波
                </span>
              )}
              {hud.kills !== undefined && (
                <span className="rounded-md bg-black/50 px-2 py-1 text-[11px] backdrop-blur-sm">
                  斩杀 {hud.kills}
                </span>
              )}
              {hud.combo !== undefined && hud.combo > 1 && (
                <span className="rounded-md bg-fuchsia-600/50 px-2 py-1 text-[11px] font-bold text-fuchsia-100 backdrop-blur-sm">
                  {hud.combo} 连击!
                </span>
              )}
            </div>
          </div>

          {/* Kill streak banner */}
          {hud.banner && (
            <div className="
              absolute left-1/2 top-24 -translate-x-1/2 rounded-full border border-amber-300/60
              bg-gradient-to-r from-rose-600/90 via-amber-500/90 to-rose-600/90
              px-6 py-1.5 text-sm font-black tracking-wider text-white shadow-xl
            ">
              {hud.banner}
            </div>
          )}

          {/* Message toast */}
          {hud.message && (
            <div className="absolute left-1/2 top-36 -translate-x-1/2 rounded-full bg-amber-400/95 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-lg">
              {hud.message}
            </div>
          )}

          {/* Floating 3D->2D damage numbers */}
          {(hud.popups ?? []).map((p) => (
            <div
              key={p.id}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                p.crit ? "text-xl text-amber-300" : "text-base text-rose-200"
              }`}
            >
              {p.crit ? `💥 -${p.amount}` : `-${p.amount}`}
            </div>
          ))}

          {/* Crosshair */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative h-7 w-7">
              <span className="absolute left-1/2 top-0 h-2 w-[2px] -translate-x-1/2 bg-white/85" />
              <span className="absolute bottom-0 left-1/2 h-2 w-[2px] -translate-x-1/2 bg-white/85" />
              <span className="absolute left-0 top-1/2 h-[2px] w-2 -translate-y-1/2 bg-white/85" />
              <span className="absolute right-0 top-1/2 h-[2px] w-2 -translate-y-1/2 bg-white/85" />
              <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300" />
              {hud.hitKey ? (
                <span
                  key={hud.hitKey}
                  className="hitmarker absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45"
                />
              ) : null}
            </div>
          </div>

          {/* Hurt vignette */}
          {hud.hurtKey ? (
            <span key={`hurt-${hud.hurtKey}`} className="hurt-flash absolute inset-0 block" />
          ) : null}

          {fallbackMode && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-lg bg-sky-950/80 px-3 py-1 text-[11px] text-sky-100 backdrop-blur-sm">
              自由视角模式：移动鼠标或按 ← / → 方向键即可 360° 转向 · 按 Esc 暂停
            </div>
          )}

          {/* Bottom-left Armor + Health + Stamina */}
          <div className="absolute bottom-4 left-4 w-64 space-y-1.5 rounded-xl border border-white/10 bg-black/55 p-3 backdrop-blur-md">
            {hud.maxArmor ? (
              <div>
                <div className="mb-0.5 flex items-baseline justify-between text-[10px] text-sky-200">
                  <span>🛡️ 护甲</span>
                  <span className="tabular-nums">
                    {Math.round(hud.armor ?? 0)} / {hud.maxArmor}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-all duration-150"
                    style={{ width: `${armorPct}%` }}
                  />
                </div>
              </div>
            ) : null}
            <div>
              <div className="mb-0.5 flex items-baseline justify-between text-[11px] font-semibold text-slate-200">
                <span>❤️ 气血</span>
                <span className="tabular-nums">
                  {Math.round(hud.health ?? 0)} / {hud.maxHealth ?? 100}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-900">
                <div
                  className={`h-full rounded-full transition-all duration-150 ${
                    healthPct > 55
                      ? "bg-emerald-400"
                      : healthPct > 25
                        ? "bg-amber-400"
                        : "bg-rose-500"
                  }`}
                  style={{ width: `${healthPct}%` }}
                />
              </div>
            </div>
            {hud.stamina !== undefined && (
              <div>
                <div className="mb-0.5 flex items-baseline justify-between text-[10px] text-slate-300">
                  <span>⚡ 真气（Shift 疾跑）</span>
                  <span className="tabular-nums">{Math.round(hud.stamina)}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-900">
                  <div
                    className="h-full rounded-full bg-amber-300"
                    style={{ width: `${staminaPct}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bottom-center Ability Slots (E 飞索 / Q 奥义 / F 瞬步) */}
          {hud.abilities && hud.abilities.length > 0 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
              {hud.abilities.map((ab) => {
                const ready = ab.cooldown <= 0.05;
                return (
                  <div
                    key={ab.key}
                    className={`min-w-[92px] rounded-xl border px-3 py-1.5 text-center backdrop-blur-md transition ${
                      ready
                        ? "border-amber-300/60 bg-slate-900/80 text-white shadow-lg shadow-amber-500/10"
                        : "border-white/10 bg-black/55 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <kbd className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-200">
                        {ab.key}
                      </kbd>
                      <span className="text-[11px] font-semibold">{ab.name}</span>
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold tabular-nums">
                      {ready ? (
                        <span className="text-emerald-300">就绪 READY</span>
                      ) : (
                        <span className="text-amber-300">{ab.cooldown.toFixed(1)}s</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom-right Weapon & Ammo */}
          <div className="absolute bottom-4 right-4 text-right">
            <div className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 backdrop-blur-md">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{game.name}</div>
              <div className="text-sm font-bold text-amber-200">{hud.weapon ?? "—"}</div>
              {hud.ammo !== undefined && hud.ammo >= 0 && (
                <div className="mt-0.5 text-lg font-black tabular-nums">
                  {hud.reloading ? (
                    <span className="text-sm text-amber-300">装填中…</span>
                  ) : (
                    <>
                      {hud.ammo}
                      <span className="text-xs text-slate-400"> / {hud.maxAmmo ?? 0}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* -------------------------------------------------------- overlays */}
      {showOverlay ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-md">
          {status === "loading" && (
            <div className="text-center text-slate-300">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-amber-400/40 border-t-amber-300" />
              <p className="text-sm">正在装配 {game.name} PBR + UnrealBloom 渲染管线…</p>
            </div>
          )}

          {error && (
            <div className="max-w-md rounded-2xl border border-rose-500/30 bg-rose-950/60 p-6 text-center text-rose-100">
              <p className="text-sm">{error}</p>
              <button
                onClick={retry}
                className="mt-4 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
              >
                重试
              </button>
            </div>
          )}

          {status === "ready" && !error && (
            <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/95 to-slate-950/95 p-8 shadow-2xl">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{game.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {game.name} <span className="text-sm font-normal text-slate-400">{game.en}</span>
                  </h2>
                  <p className="text-sm text-amber-200">{game.tagline}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{game.description}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {game.controls.map((c) => (
                  <div key={c.key} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
                    <kbd className="rounded bg-slate-800 px-2 py-1 text-[11px] font-semibold text-amber-200">
                      {c.key}
                    </kbd>
                    <span className="text-xs text-slate-300">{c.action}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">
                计分规则：{game.scoring}
                <br />
                支持鼠标锁定与自由视角双模式（移动鼠标或按 <kbd className="rounded bg-slate-800 px-1">←</kbd>{" "}
                <kbd className="rounded bg-slate-800 px-1">→</kbd> 转向，按{" "}
                <kbd className="rounded bg-slate-800 px-1">Esc</kbd> 暂停）。
              </p>
              <button
                onClick={start}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:brightness-110"
              >
                ⚔️ 点击进入战场（开启 3D 武器与飞索）
              </button>
            </div>
          )}

          {status === "running" && !locked && (
            <div className="text-center">
              <p className="text-2xl font-bold text-white">已暂停</p>
              <p className="mt-2 text-sm text-slate-300">点击下方按钮继续作战</p>
              <button
                onClick={start}
                className="mt-5 rounded-xl bg-amber-400 px-6 py-2.5 font-bold text-slate-950 transition hover:brightness-110"
              >
                继续战斗
              </button>
            </div>
          )}

          {status === "ended" && result && (
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/95 to-slate-950/95 p-8 shadow-2xl">
              <div className="text-center">
                <div className="text-5xl">{result.outcome === "win" ? "🏆" : "💀"}</div>
                <h2
                  className={`mt-3 text-2xl font-bold ${
                    result.outcome === "win" ? "text-amber-300" : "text-rose-300"
                  }`}
                >
                  {result.title}
                </h2>
                <p className="mt-2 text-sm text-slate-300">{result.summary}</p>
                <div className="mt-4 text-5xl font-black tabular-nums text-white">
                  {result.score.toLocaleString()}
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">total score</div>
              </div>

              {result.stats && result.stats.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {result.stats.map((s) => (
                    <div key={s.label} className="rounded-lg bg-white/5 px-3 py-2">
                      <div className="text-[11px] text-slate-400">{s.label}</div>
                      <div className="text-sm font-semibold text-slate-100">{s.value}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={18}
                  placeholder="输入侠号上榜"
                  className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-400/60"
                />
                <button
                  onClick={submitScore}
                  disabled={saveState === "saving" || saveState === "saved"}
                  className="rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110 disabled:opacity-60"
                >
                  {saveState === "saving"
                    ? "提交中…"
                    : saveState === "saved"
                      ? "已上榜 ✓"
                      : "提交战绩"}
                </button>
              </div>
              {saveState === "error" && (
                <p className="mt-2 text-xs text-rose-300">提交失败，请稍后再试。</p>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  onClick={retry}
                  className="flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  再来一局
                </button>
                <Link
                  href={`/play/${game.slug}`}
                  className="flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  查看排行榜
                </Link>
                <Link
                  href="/"
                  className="flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  返回工作站
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
