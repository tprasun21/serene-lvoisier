import { pgTable, text, timestamp, integer, boolean, jsonb, primaryKey, unique } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { category, article } from "./content";

export const newsSource = pgTable("news_source", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  hostname: text("hostname").notNull(),
  baseUrl: text("base_url").notNull(),
  sourceType: text("source_type").notNull(),
  status: text("status").notNull(),
  fetchMethod: text("fetch_method").notNull(),
  fallbackFetchMethodsJson: jsonb("fallback_fetch_methods_json"),
  description: text("description"),
  logoUrl: text("logo_url"),
  defaultCategoryId: text("default_category_id").references(() => category.id, { onDelete: "set null" }),
  contentRights: text("content_rights").notNull(), // (metadata | excerpt | full)
  robotsStatus: text("robots_status"),
  termsUrl: text("terms_url"),
  privacyUrl: text("privacy_url"),
  refreshIntervalMinutes: integer("refresh_interval_minutes").notNull().default(60),
  parsingRulesJson: jsonb("parsing_rules_json"),
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
  lastSuccessAt: timestamp("last_success_at", { withTimezone: true }),
  lastFailureAt: timestamp("last_failure_at", { withTimezone: true }),
  consecutiveFailures: integer("consecutive_failures").default(0).notNull(),
  nextFetchAt: timestamp("next_fetch_at", { withTimezone: true }),
  createdBy: text("created_by").references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sourceFeed = pgTable("source_feed", {
  id: text("id").primaryKey(),
  sourceId: text("source_id").notNull().references(() => newsSource.id, { onDelete: "cascade" }),
  feedUrl: text("feed_url").notNull(),
  feedType: text("feed_type").notNull(),
  isPrimary: boolean("is_primary").default(false).notNull(),
  etag: text("etag"),
  lastModified: text("last_modified"), // often a string from HTTP headers
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
  lastSuccessAt: timestamp("last_success_at", { withTimezone: true }),
  status: text("status").notNull(),
});

export const sourceFetch = pgTable("source_fetch", {
  id: text("id").primaryKey(),
  sourceId: text("source_id").notNull().references(() => newsSource.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  status: text("status").notNull(),
  httpStatus: integer("http_status"),
  responseTimeMs: integer("response_time_ms"),
  articlesDiscovered: integer("articles_discovered"),
  articlesExtracted: integer("articles_extracted"),
  articlesFailed: integer("articles_failed"),
  errorClass: text("error_class"),
});

export const sourceArticle = pgTable("source_article", {
  id: text("id").primaryKey(),
  sourceId: text("source_id").notNull().references(() => newsSource.id, { onDelete: "cascade" }),
  articleId: text("article_id").references(() => article.id, { onDelete: "set null" }),
  externalId: text("external_id").notNull(),
  canonicalUrl: text("canonical_url"),
  discoveredAt: timestamp("discovered_at", { withTimezone: true }).defaultNow().notNull(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).defaultNow().notNull(),
});

export const userSource = pgTable("user_source", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  sourceId: text("source_id").notNull().references(() => newsSource.id, { onDelete: "cascade" }),
  customUrl: text("custom_url"),
  status: text("status").notNull(),
  isPinned: boolean("is_pinned").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    userSourceUnique: unique().on(table.userId, table.sourceId),
  };
});

export const userSourcePreference = pgTable("user_source_preference", {
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  sourceId: text("source_id").notNull().references(() => newsSource.id, { onDelete: "cascade" }),
  topicsJson: jsonb("topics_json"),
  muted: boolean("muted").default(false).notNull(),
  priority: integer("priority").default(0).notNull(),
  includeInRecommendations: boolean("include_in_recommendations").default(true).notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.sourceId] }),
  };
});
