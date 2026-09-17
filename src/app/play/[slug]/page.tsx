import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { plays, scores } from "@/db/schema";
import GamePlayer from "@/components/GamePlayer";
import { GAMES, getGame } from "@/lib/games";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "游戏不存在 · SK1 游戏工作站" };
  return {
    title: `${game.name} ${game.en} · SK1 游戏工作站`,
    description: game.description,
  };
}

export default async function PlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  let board: (typeof scores.$inferSelect)[] = [];
  let playCount = 0;
  try {
    board = await db
      .select()
      .from(scores)
      .where(eq(scores.gameSlug, slug))
      .orderBy(desc(scores.score), desc(scores.createdAt))
      .limit(10);
    const rows = await db.select().from(plays).where(eq(plays.slug, slug)).limit(1);
    playCount = rows[0]?.count ?? 0;
  } catch {
    board = [];
  }

  const others = GAMES.filter((g) => g.slug !== slug).slice(0, 5);

  return (
    <main className="min-h-screen">
      <header className="border-b border-white/5 bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
            >
              ← 工作站
            </Link>
            <div>
              <h1 className="flex items-center gap-2 text-lg font-bold text-white">
                <span>{game.emoji}</span>
                {game.name}
                <span className="text-xs font-normal text-slate-500">{game.en}</span>
              </h1>
              <p className="text-xs text-amber-200">{game.tagline}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
            <span className="rounded-full bg-white/5 px-3 py-1">{game.category}</span>
            <span className="rounded-full bg-white/5 px-3 py-1">{game.players}</span>
            <span className="rounded-full bg-white/5 px-3 py-1">难度 {"★".repeat(game.difficulty)}</span>
            <span className="rounded-full bg-white/5 px-3 py-1">{playCount} 次开局</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="h-[76vh] min-h-[520px] w-full">
          <GamePlayer game={game} />
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
            <h2 className="text-sm font-bold text-white">操作方式</h2>
            <ul className="mt-3 space-y-2">
              {game.controls.map((c) => (
                <li key={c.key} className="flex items-center gap-3">
                  <kbd className="min-w-[86px] rounded bg-slate-800 px-2 py-1 text-center text-[11px] font-semibold text-amber-200">
                    {c.key}
                  </kbd>
                  <span className="text-xs text-slate-300">{c.action}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-white/5 pt-3 text-[11px] leading-relaxed text-slate-400">
              {game.description}
            </p>
            <p className="mt-2 text-[11px] text-slate-500">计分：{game.scoring}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">排行榜 · TOP 10</h2>
              <span className="text-[10px] uppercase tracking-widest text-slate-500">live</span>
            </div>
            {board.length === 0 ? (
              <p className="mt-4 text-xs text-slate-400">暂无记录，打出第一枪就能霸榜。</p>
            ) : (
              <ol className="mt-3 space-y-1.5">
                {board.map((row, index) => (
                  <li
                    key={row.id}
                    className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs ${
                      index === 0 ? "bg-amber-400/10 text-amber-100" : "bg-white/[0.03] text-slate-300"
                    }`}
                  >
                    <span className="w-5 text-center font-bold tabular-nums text-slate-500">{index + 1}</span>
                    <span className="flex-1 truncate font-semibold">{row.playerName}</span>
                    <span className="tabular-nums text-slate-400">{row.won ? "胜" : "败"}</span>
                    <span className="w-16 text-right font-bold tabular-nums text-amber-300">
                      {row.score.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
            <h2 className="text-sm font-bold text-white">换一款玩</h2>
            <div className="mt-3 grid gap-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/play/${other.slug}`}
                  className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2 text-xs transition hover:bg-white/10"
                >
                  <span className="text-lg">{other.emoji}</span>
                  <span className="flex-1">
                    <span className="block font-semibold text-slate-100">{other.name}</span>
                    <span className="block text-[10px] text-slate-500">{other.tagline}</span>
                  </span>
                  <span className="text-slate-500">→</span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
