CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"role" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "bookmark" (
	"user_id" text NOT NULL,
	"article_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookmark_user_id_article_id_pk" PRIMARY KEY("user_id","article_id")
);
--> statement-breakpoint
CREATE TABLE "reading_history" (
	"user_id" text NOT NULL,
	"article_id" text NOT NULL,
	"read_at" timestamp with time zone DEFAULT now() NOT NULL,
	"progress_percent" integer NOT NULL,
	CONSTRAINT "reading_history_user_id_article_id_pk" PRIMARY KEY("user_id","article_id")
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"user_id" text PRIMARY KEY NOT NULL,
	"display_name" text,
	"avatar_url" text,
	"language" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "article" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"dek" text,
	"body" text,
	"excerpt" text,
	"content_mode" text NOT NULL,
	"category_id" text,
	"author_id" text,
	"author_name" text,
	"hero_image_url" text,
	"image_urls_json" jsonb,
	"status" text NOT NULL,
	"published_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"extracted_at" timestamp with time zone,
	"reading_time_minutes" integer,
	"source_id" text,
	"source_name" text,
	"source_url" text,
	"canonical_url" text,
	"url_hash" text,
	"language" text,
	"tags_json" jsonb,
	"location" text,
	"seo_title" text,
	"seo_description" text,
	"og_image" text,
	"search_vector" "tsvector",
	CONSTRAINT "article_slug_unique" UNIQUE("slug"),
	CONSTRAINT "article_url_hash_unique" UNIQUE("url_hash")
);
--> statement-breakpoint
CREATE TABLE "article_category" (
	"article_id" text NOT NULL,
	"category_id" text NOT NULL,
	CONSTRAINT "article_category_article_id_category_id_pk" PRIMARY KEY("article_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "category_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "news_source" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"hostname" text NOT NULL,
	"base_url" text NOT NULL,
	"source_type" text NOT NULL,
	"status" text NOT NULL,
	"fetch_method" text NOT NULL,
	"fallback_fetch_methods_json" jsonb,
	"description" text,
	"logo_url" text,
	"default_category_id" text,
	"content_rights" text NOT NULL,
	"robots_status" text,
	"terms_url" text,
	"privacy_url" text,
	"refresh_interval_minutes" integer DEFAULT 60 NOT NULL,
	"parsing_rules_json" jsonb,
	"last_checked_at" timestamp with time zone,
	"last_success_at" timestamp with time zone,
	"last_failure_at" timestamp with time zone,
	"consecutive_failures" integer DEFAULT 0 NOT NULL,
	"next_fetch_at" timestamp with time zone,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_article" (
	"id" text PRIMARY KEY NOT NULL,
	"source_id" text NOT NULL,
	"article_id" text,
	"external_id" text NOT NULL,
	"canonical_url" text,
	"discovered_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_feed" (
	"id" text PRIMARY KEY NOT NULL,
	"source_id" text NOT NULL,
	"feed_url" text NOT NULL,
	"feed_type" text NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"etag" text,
	"last_modified" text,
	"last_checked_at" timestamp with time zone,
	"last_success_at" timestamp with time zone,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_fetch" (
	"id" text PRIMARY KEY NOT NULL,
	"source_id" text NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"status" text NOT NULL,
	"http_status" integer,
	"response_time_ms" integer,
	"articles_discovered" integer,
	"articles_extracted" integer,
	"articles_failed" integer,
	"error_class" text
);
--> statement-breakpoint
CREATE TABLE "user_source" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"source_id" text NOT NULL,
	"custom_url" text,
	"status" text NOT NULL,
	"is_pinned" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_source_user_id_source_id_unique" UNIQUE("user_id","source_id")
);
--> statement-breakpoint
CREATE TABLE "user_source_preference" (
	"user_id" text NOT NULL,
	"source_id" text NOT NULL,
	"topics_json" jsonb,
	"muted" boolean DEFAULT false NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"include_in_recommendations" boolean DEFAULT true NOT NULL,
	CONSTRAINT "user_source_preference_user_id_source_id_pk" PRIMARY KEY("user_id","source_id")
);
--> statement-breakpoint
CREATE TABLE "ai_model" (
	"id" text PRIMARY KEY NOT NULL,
	"provider_id" text NOT NULL,
	"model_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"pricing_json" jsonb,
	"architecture_json" jsonb,
	"supported_parameters_json" jsonb,
	"input_modalities_json" jsonb,
	"output_modalities_json" jsonb,
	"context_length" integer,
	"is_free_eligible" boolean NOT NULL,
	"status" text NOT NULL,
	"catalog_seen_at" timestamp with time zone,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_model_model_id_unique" UNIQUE("model_id")
);
--> statement-breakpoint
CREATE TABLE "ai_model_health" (
	"id" text PRIMARY KEY NOT NULL,
	"model_id" text NOT NULL,
	"key_fingerprint" text NOT NULL,
	"tested_at" timestamp with time zone DEFAULT now() NOT NULL,
	"success" boolean NOT NULL,
	"latency_ms" integer,
	"http_status" integer,
	"error_code" text,
	"error_class" text,
	"response_model" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "ai_request" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"request_type" text NOT NULL,
	"prompt_version" text,
	"selected_model_id" text,
	"effective_model_id" text,
	"status" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"input_tokens" integer,
	"output_tokens" integer,
	"latency_ms" integer,
	"error_class" text
);
--> statement-breakpoint
CREATE TABLE "ai_request_attempt" (
	"id" text PRIMARY KEY NOT NULL,
	"request_id" text NOT NULL,
	"attempt_number" integer NOT NULL,
	"model_id" text NOT NULL,
	"response_model" text,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"success" boolean NOT NULL,
	"http_status" integer,
	"error_class" text,
	"latency_ms" integer
);
--> statement-breakpoint
CREATE TABLE "ai_summary" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"article_id" text NOT NULL,
	"model_used" text,
	"prompt_version" text,
	"language" text,
	"max_length" integer,
	"summary" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "openrouter_credential" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"encrypted_api_key" text NOT NULL,
	"encryption_key_version" text NOT NULL,
	"key_fingerprint" text NOT NULL,
	"key_hint" text NOT NULL,
	"status" text NOT NULL,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "openrouter_credential_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_ai_preferences" (
	"user_id" text PRIMARY KEY NOT NULL,
	"primary_model_id" text,
	"fallback_model_ids_json" jsonb,
	"auto_fallback_enabled" boolean DEFAULT true NOT NULL,
	"last_catalog_sync_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_lock" (
	"key" text PRIMARY KEY NOT NULL,
	"holder" text NOT NULL,
	"acquired_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_history" ADD CONSTRAINT "reading_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_history" ADD CONSTRAINT "reading_history_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_source_id_news_source_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."news_source"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_category" ADD CONSTRAINT "article_category_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_category" ADD CONSTRAINT "article_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news_source" ADD CONSTRAINT "news_source_default_category_id_category_id_fk" FOREIGN KEY ("default_category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news_source" ADD CONSTRAINT "news_source_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_article" ADD CONSTRAINT "source_article_source_id_news_source_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."news_source"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_article" ADD CONSTRAINT "source_article_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_feed" ADD CONSTRAINT "source_feed_source_id_news_source_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."news_source"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_fetch" ADD CONSTRAINT "source_fetch_source_id_news_source_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."news_source"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_source" ADD CONSTRAINT "user_source_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_source" ADD CONSTRAINT "user_source_source_id_news_source_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."news_source"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_source_preference" ADD CONSTRAINT "user_source_preference_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_source_preference" ADD CONSTRAINT "user_source_preference_source_id_news_source_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."news_source"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_model_health" ADD CONSTRAINT "ai_model_health_model_id_ai_model_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."ai_model"("model_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_request" ADD CONSTRAINT "ai_request_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_request_attempt" ADD CONSTRAINT "ai_request_attempt_request_id_ai_request_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."ai_request"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_summary" ADD CONSTRAINT "ai_summary_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_summary" ADD CONSTRAINT "ai_summary_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "openrouter_credential" ADD CONSTRAINT "openrouter_credential_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_ai_preferences" ADD CONSTRAINT "user_ai_preferences_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;