import { NextRequest } from "next/server";
import { and, desc, eq, gt, sql } from "drizzle-orm";
import { db } from "@/db";
import { scores } from "@/db/schema";
import { getGame } from "@/lib/games";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("game");
  const limitRaw = Number(searchParams.get("limit") ?? 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.trunc(limitRaw), 1), 50) : 10;

  if (!slug) {
    const rows = await db.select().from(scores).orderBy(desc(scores.createdAt)).limit(limit);
    return Response.json({ scores: rows });
  }
  if (!getGame(slug)) {
    return Response.json({ error: "unknown game" }, { status: 404 });
  }
  const rows = await db
    .select()
    .from(scores)
    .where(eq(scores.gameSlug, slug))
    .orderBy(desc(scores.score), desc(scores.createdAt))
    .limit(limit);
  return Response.json({ scores: rows });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const slug = typeof body.gameSlug === "string" ? body.gameSlug : "";
  const game = getGame(slug);
  if (!game) return Response.json({ error: "unknown game" }, { status: 404 });

  const rawName = typeof body.playerName === "string" ? body.playerName.trim() : "";
  const playerName = (rawName || "无名侠客").slice(0, 18);
  const score = Math.max(0, Math.min(9_999_999, Math.trunc(Number(body.score) || 0)));
  const kills = Math.max(0, Math.min(9_999, Math.trunc(Number(body.kills) || 0)));
  const wave = Math.max(0, Math.min(9_999, Math.trunc(Number(body.wave) || 0)));
  const durationSec = Math.max(0, Math.min(86_400, Math.trunc(Number(body.durationSec) || 0)));
  const won = Boolean(body.won);
  const note = typeof body.note === "string" ? body.note.slice(0, 60) : null;

  const [row] = await db
    .insert(scores)
    .values({ gameSlug: slug, playerName, score, kills, wave, durationSec, won, note })
    .returning();

  const [{ better }] = await db
    .select({ better: sql<number>`count(*)::int` })
    .from(scores)
    .where(and(eq(scores.gameSlug, slug), gt(scores.score, score)));

  return Response.json({ score: row, rank: Number(better) + 1 }, { status: 201 });
}
