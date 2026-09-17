import type { GameFactory } from "./types";

const factories: Record<string, () => Promise<{ default: GameFactory }>> = {
  "wuxia-royale": () => import("./wuxia-royale"),
  "qinggong-run": () => import("./qinggong-run"),
  "arrow-sanctum": () => import("./arrow-sanctum"),
  "blade-arena": () => import("./blade-arena"),
  "dungeon-loot": () => import("./dungeon-loot"),
  "dart-trial": () => import("./dart-trial"),
};

export async function loadGameFactory(slug: string): Promise<GameFactory | null> {
  const loader = factories[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default ?? null;
}
