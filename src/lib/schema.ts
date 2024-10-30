// lib/schema.ts
import { pgTable, serial, text, timestamp, json } from 'drizzle-orm/pg-core';

// Define the Country schema
export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const city = pgTable('city', {
  id: serial('id').primaryKey().notNull(),
  countryName: text('country_name').notNull(),
  city: text('city').notNull(),
  displayImage: text('display_image').notNull(),
  images: json('images'),
  about: json('about'),
  hotels: text('hotels'),
  tours: text('tours'),
  rentals: text('rentals'),
  cars: text('cars'),
  activities: text('activities'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userTable = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})