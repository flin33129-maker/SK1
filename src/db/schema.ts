import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/** 单局战绩 */
export const scores = pgTable(
  "scores",
  {
    id: serial("id").primaryKey(),
    gameSlug: text("game_slug").notNull(),
    playerName: text("player_name").notNull(),
    score: integer("score").notNull(),
    kills: integer("kills").notNull().default(0),
    wave: integer("wave").notNull().default(0),
    durationSec: integer("duration_sec").notNull().default(0),
    won: boolean("won").notNull().default(false),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("scores_game_score_idx").on(t.gameSlug, t.score),
    index("scores_created_idx").on(t.createdAt),
  ],
);

/** 游玩次数统计 */
export const plays = pgTable(
  "plays",
  {
    slug: text("slug").primaryKey(),
    count: integer("count").notNull().default(0),
    lastPlayedAt: timestamp("last_played_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("plays_slug_key").on(t.slug)],
);

export type ScoreRow = typeof scores.$inferSelect;
export type PlayRow = typeof plays.$inferSelect;
