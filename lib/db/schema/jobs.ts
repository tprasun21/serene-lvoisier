import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const jobLock = pgTable("job_lock", {
  key: text("key").primaryKey(),
  holder: text("holder").notNull(),
  acquiredAt: timestamp("acquired_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
