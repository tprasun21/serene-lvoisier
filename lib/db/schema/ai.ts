import { pgTable, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { article } from "./content";

export const openrouterCredential = pgTable("openrouter_credential", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
  encryptedApiKey: text("encrypted_api_key").notNull(),
  encryptionKeyVersion: text("encryption_key_version").notNull(),
  keyFingerprint: text("key_fingerprint").notNull(),
  keyHint: text("key_hint").notNull(),
  status: text("status").notNull(),
  lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const aiModel = pgTable("ai_model", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").notNull(),
  modelId: text("model_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  pricingJson: jsonb("pricing_json"),
  architectureJson: jsonb("architecture_json"),
  supportedParametersJson: jsonb("supported_parameters_json"),
  inputModalitiesJson: jsonb("input_modalities_json"),
  outputModalitiesJson: jsonb("output_modalities_json"),
  contextLength: integer("context_length"),
  isFreeEligible: boolean("is_free_eligible").notNull(),
  status: text("status").notNull(), // (active | stale | removed)
  catalogSeenAt: timestamp("catalog_seen_at", { withTimezone: true }),
  lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const aiModelHealth = pgTable("ai_model_health", {
  id: text("id").primaryKey(),
  modelId: text("model_id").notNull().references(() => aiModel.modelId, { onDelete: "cascade" }),
  keyFingerprint: text("key_fingerprint").notNull(),
  testedAt: timestamp("tested_at", { withTimezone: true }).defaultNow().notNull(),
  success: boolean("success").notNull(),
  latencyMs: integer("latency_ms"),
  httpStatus: integer("http_status"),
  errorCode: text("error_code"),
  errorClass: text("error_class"),
  responseModel: text("response_model"),
  notes: text("notes"),
});

export const userAiPreferences = pgTable("user_ai_preferences", {
  userId: text("user_id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
  primaryModelId: text("primary_model_id"), // FK intentionally omitted or could point to aiModel
  fallbackModelIdsJson: jsonb("fallback_model_ids_json"),
  autoFallbackEnabled: boolean("auto_fallback_enabled").default(true).notNull(),
  lastCatalogSyncAt: timestamp("last_catalog_sync_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const aiRequest = pgTable("ai_request", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  requestType: text("request_type").notNull(),
  promptVersion: text("prompt_version"),
  selectedModelId: text("selected_model_id"),
  effectiveModelId: text("effective_model_id"),
  status: text("status").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  latencyMs: integer("latency_ms"),
  errorClass: text("error_class"),
});

export const aiRequestAttempt = pgTable("ai_request_attempt", {
  id: text("id").primaryKey(),
  requestId: text("request_id").notNull().references(() => aiRequest.id, { onDelete: "cascade" }),
  attemptNumber: integer("attempt_number").notNull(),
  modelId: text("model_id").notNull(),
  responseModel: text("response_model"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  success: boolean("success").notNull(),
  httpStatus: integer("http_status"),
  errorClass: text("error_class"),
  latencyMs: integer("latency_ms"),
});

export const aiSummary = pgTable("ai_summary", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  articleId: text("article_id").notNull().references(() => article.id, { onDelete: "cascade" }),
  modelUsed: text("model_used"),
  promptVersion: text("prompt_version"),
  language: text("language"),
  maxLength: integer("max_length"),
  summary: text("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
