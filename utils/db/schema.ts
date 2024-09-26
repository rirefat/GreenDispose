import { integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Users Table
export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: varchar('email', { length: 50 }).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

// Reports Table
export const Reports = pgTable('reports', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => Users.id).notNull(),
    location: text('location').notNull(),
    wasteType: varchar('waste_type', { length: 255 }).notNull(),
    amount: varchar('amount', { length: 255 }).notNull(),
    imageUrl: text('image_url'),
    verificationResult: jsonb('verification_result'),
    status: varchar('status', { length: 255 }).notNull().default('pending'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    collectorId: integer('collector_id').references(() => Users.id)
});