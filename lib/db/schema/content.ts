import { pgTable, text, timestamp, integer, jsonb, primaryKey, customType } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { newsSource } from "./sources";

const tsvector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});

export const category = pgTable("category", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const article = pgTable("article", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  dek: text("dek"),
  body: text("body"),
  excerpt: text("excerpt"),
  contentMode: text("content_mode").notNull(), // (metadata | excerpt | full)
  categoryId: text("category_id").references(() => category.id, { onDelete: "set null" }),
  authorId: text("author_id").references(() => user.id, { onDelete: "set null" }), // first-party, nullable
  authorName: text("author_name"), // external
  heroImageUrl: text("hero_image_url"),
  imageUrlsJson: jsonb("image_urls_json"),
  status: text("status").notNull(), // (draft | discovered | fetching | extracted | published | updated | failed | removed)
  publishedAt: timestamp("published_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  extractedAt: timestamp("extracted_at", { withTimezone: true }),
  readingTimeMinutes: integer("reading_time_minutes"),
  sourceId: text("source_id").references(() => newsSource.id, { onDelete: "set null" }), // nullable
  sourceName: text("source_name"),
  sourceUrl: text("source_url"),
  canonicalUrl: text("canonical_url"),
  urlHash: text("url_hash").unique(),
  language: text("language"),
  tagsJson: jsonb("tags_json"),
  location: text("location"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  ogImage: text("og_image"),
  searchVector: tsvector("search_vector"),
});

export const articleCategory = pgTable("article_category", {
  articleId: text("article_id").notNull().references(() => article.id, { onDelete: "cascade" }),
  categoryId: text("category_id").notNull().references(() => category.id, { onDelete: "cascade" }),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.articleId, table.categoryId] }),
  };
});
