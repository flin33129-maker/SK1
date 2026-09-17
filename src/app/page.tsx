import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { plays, scores } from "@/db/schema";
import GameLibrary, { type GameStat } from "@/components/GameLibrary";
import { GAMES, getGame } from "@/lib/games";

export const dynamic = "force-dynamic";

interface RecentRun {
  id: number;
  gameSlug: string;
  playerName: string;
  score: number;
  won: boolean;
  createdAt: Date;
}

async function loadStats() {
  try {
    const playRows = await db.select().from(plays);
    const agg = await db
      .select({
        slug: scores.gameSlug,
        best: sql<number>`max(${scores.score})::int`,
        runs: sql<number>`count(*)::int`,
      })
      .from(scores)
      .groupBy(scores.gameSlug);
    const recent = await db.select().from(scores).orderBy(desc(scores.createdAt)).limit(6);
    const stats: GameStat[] = GAMES.map((game) => {
      const p = playRows.find((row) => row.slug === game.slug);
      const a = agg.find((row) => row.slug === game.slug);
      return {
        slug: game.slug,
        plays: p?.count ?? 0,
        best: a?.best ?? 0,
        runs: a?.runs ?? 0,
      };
    });
    return { stats, recent: recent as RecentRun[] };
  } catch {
    return { stats: [] as GameStat[], recent: [] as RecentRun[] };
  }
}

export default async function HomePage() {
  const { stats, recent } = await loadStats();
  const totalPlays = stats.reduce((sum, s) => sum + s.plays, 0);
  const totalRuns = stats.reduce((sum, s) => sum + s.runs, 0);
  const bestRun = recent.length > 0 ? stats.reduce((best, s) => (s.best > best ? s.best : best), 0) : 0;

  return (
    <main className="min-h-screen">
      {/* ------------------------------------------------------------ hero */}
      <div className="grid-glow relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,41,59,0.35),transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:py-24">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-amber-200">
              SK1 · GAME WORKSTATION
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
              Next.js 16 · Three.js WebGL · PostgreSQL + Drizzle
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.1] text-white sm:text-6xl">
            游戏工作站
            <span className="block bg-gradient-to-r from-amber-300 via-rose-400 to-sky-400 bg-clip-text text-transparent">
              3D 武侠 FPS · 浏览器即玩
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            六款自研 3D 第一人称游戏，全部由同一套 WebGL 引擎驱动：大逃杀缩圈、轻功跑酷、弓箭守城、无尽竞技场、程序生成地牢、极限靶场。
            战绩实时写入 PostgreSQL，全站排行榜即刻可比。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/play/wuxia-royale"
              className="rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-rose-500/20 transition hover:brightness-110"
            >
              🗡️ 立即开黑 · 侠影求生（吃鸡）
            </Link>
            <Link
              href="#games"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              浏览全部 {GAMES.length} 款游戏
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "在库游戏", value: GAMES.length.toString() },
              { label: "累计开局", value: totalPlays.toLocaleString() },
              { label: "已入库战绩", value: totalRuns.toLocaleString() },
              { label: "全站最高分", value: bestRun.toLocaleString() },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                <dt className="text-[11px] uppercase tracking-widest text-slate-400">{item.label}</dt>
                <dd className="mt-1 text-2xl font-bold tabular-nums text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ----------------------------------------------------------- games */}
      <div className="py-14">
        <GameLibrary games={GAMES} stats={stats} />
      </div>

      {/* --------------------------------------------------------- recent */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-14">
        <h2 className="text-xl font-bold text-white">最新战绩</h2>
        <p className="mt-1 text-sm text-slate-400">全站最近提交的六条记录，战绩均存于 PostgreSQL。</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          {recent.length === 0 ? (
            <p className="bg-slate-900/50 p-8 text-center text-sm text-slate-400">
              还没有人上榜，去玩一局抢占第一名吧！
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[11px] uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-4 py-3">侠号</th>
                  <th className="px-4 py-3">游戏</th>
                  <th className="px-4 py-3">得分</th>
                  <th className="px-4 py-3">结果</th>
                  <th className="px-4 py-3">时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-900/40">
                {recent.map((run) => (
                  <tr key={run.id}>
                    <td className="px-4 py-3 font-semibold text-white">{run.playerName}</td>
                    <td className="px-4 py-3 text-slate-300">
                      <Link href={`/play/${run.gameSlug}`} className="hover:text-amber-300">
                        {getGame(run.gameSlug)?.name ?? run.gameSlug}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-bold tabular-nums text-amber-300">{run.score.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {run.won ? (
                        <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-300">胜利</span>
                      ) : (
                        <span className="rounded bg-rose-500/15 px-2 py-0.5 text-[11px] text-rose-300">失败</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-500">
                      {new Date(run.createdAt).toLocaleString("zh-CN", { hour12: false })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------- tech bar */}
      <section className="border-t border-white/5 bg-slate-950/60">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3">
          {[
            {
              title: "自研 WebGL 引擎",
              body: "Three.js 渲染 + 自写 AABB 碰撞、弹道模拟、AI 行为树、WebAudio 合成音效，六款游戏共用一套内核。",
            },
            {
              title: "战绩即服务",
              body: "Drizzle ORM + PostgreSQL 存储每局分数、击杀、波次与时长，API 路由提供 /api/scores 与 /api/plays。",
            },
            {
              title: "开箱即部署",
              body: "代码可直接推送到 GitHub 仓库（flin33129-maker/SK1），配合 Vercel + 任意 Postgres 一键上线。",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-bold text-amber-200">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-[11px] text-slate-500">
        SK1 游戏工作站 · 键鼠操作，建议桌面端 Chrome / Edge / Firefox · 源码：github.com/flin33129-maker/SK1
      </footer>
    </main>
  );
}
