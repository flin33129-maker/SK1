"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { GameMeta } from "@/lib/games";

export interface GameStat {
  slug: string;
  plays: number;
  best: number;
  runs: number;
}

export default function GameLibrary({ games, stats }: { games: GameMeta[]; stats: GameStat[] }) {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>(["全部"]);
    games.forEach((g) => set.add(g.category));
    return Array.from(set);
  }, [games]);

  const statMap = useMemo(() => {
    const map = new Map<string, GameStat>();
    stats.forEach((s) => map.set(s.slug, s));
    return map;
  }, [stats]);

  const filtered = games.filter((g) => {
    const matchCat = category === "全部" || g.category === category;
    const q = query.trim().toLowerCase();
    const matchQuery =
      q.length === 0 ||
      g.name.toLowerCase().includes(q) ||
      g.en.toLowerCase().includes(q) ||
      g.tagline.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchQuery;
  });

  return (
    <section id="games" className="mx-auto w-full max-w-7xl px-4">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">游戏库 · {games.length} 款</h2>
          <p className="mt-1 text-sm text-slate-400">
            全部为浏览器内运行的 3D WebGL 游戏，无需下载安装，点击即玩。
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索游戏 / 玩法标签…"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-amber-400/60"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              category === cat
                ? "bg-amber-400 text-slate-950"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((game) => {
          const stat = statMap.get(game.slug);
          return (
            <Link
              key={game.slug}
              href={`/play/${game.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 transition hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={game.cover}
                  alt={game.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  priority={false}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${game.accent}`} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{game.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold leading-tight text-white">{game.name}</h3>
                      <p className="text-[11px] uppercase tracking-widest text-slate-300">{game.en}</p>
                    </div>
                  </div>
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-semibold text-amber-200 backdrop-blur">
                  {game.category}
                </span>
              </div>

              <div className="space-y-3 p-4">
                <p className="text-xs font-medium text-amber-200">{game.tagline}</p>
                <p className="line-clamp-3 text-xs leading-relaxed text-slate-400">{game.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {game.tags.map((tag) => (
                    <span key={tag} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-slate-400">
                  <span>难度 {"★".repeat(game.difficulty)}{"☆".repeat(5 - game.difficulty)}</span>
                  <span>{stat?.plays ?? 0} 次游玩</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">最高分</span>
                  <span className="font-semibold text-emerald-300">{(stat?.best ?? 0).toLocaleString()}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-sm text-slate-400">
          没有匹配的游戏，换个关键词试试。
        </p>
      )}
    </section>
  );
}
