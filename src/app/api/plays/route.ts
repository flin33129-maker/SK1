import { NextRequest } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { plays } from "@/db/schema";
import { getGame } from "@/lib/games";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let slug = "";
  try {
    const body = (await request.json()) as { slug?: string };
    slug = typeof body.slug === "string" ? body.slug : "";
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
  if (!getGame(slug)) return Response.json({ error: "unknown game" }, { status: 404 });

  await db
    .insert(plays)
    .values({ slug, count: 1 })
    .onConflictDoUpdate({
      target: plays.slug,
      set: { count: sql`${plays.count} + 1`, lastPlayedAt: new Date() },
    });

  return Response.json({ ok: true });
}
