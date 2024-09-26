import { boolean, integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

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

// Rewards table
export const Rewards = pgTable('rewards', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => Users.id).notNull(),
    points: integer('points').notNull().default(0),
    level: integer('level').notNull().default(1),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    isAvailable: boolean('is_available').notNull().default(true),
    description: text('description'),
    name: varchar('name', { length: 255 }).notNull(),
    collectionInfo: text('collection_info').notNull()
});

// Collected Waste Table
export const CollectedWaste = pgTable('collected_waste', {
    id: serial('id').primaryKey(),
    reportId: integer('report_id').references(() => Reports.id).notNull(),
    collectorId: integer('collector_id').references(() => Users.id).notNull(),
    collectionDate: timestamp('collection_date').notNull(),
    status: varchar('status', { length: 20 }).notNull().default('collected')
})