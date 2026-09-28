import { pgTable, text, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { article } from "./content";

export const userProfile = pgTable("user_profile", {
  userId: text("user_id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  language: text("language"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const bookmark = pgTable("bookmark", {
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  articleId: text("article_id").notNull().references(() => article.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.articleId] }),
  };
});

export const readingHistory = pgTable("reading_history", {
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  articleId: text("article_id").notNull().references(() => article.id, { onDelete: "cascade" }),
  readAt: timestamp("read_at", { withTimezone: true }).defaultNow().notNull(),
  progressPercent: integer("progress_percent").notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.articleId] }),
  };
});
