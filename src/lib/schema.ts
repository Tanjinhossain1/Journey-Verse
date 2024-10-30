// lib/schema.ts
import { pgTable, serial, text, timestamp, json } from 'drizzle-orm/pg-core';

// Define the Country schema
export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const City = pgTable('city', {
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

export const hotels = pgTable('hotels', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  city:text('city').notNull(),
  displayImage: text('display_image').notNull(),
  images: json('images').notNull(), // Array of image URLs
  ratings: json('ratings').notNull(), // JSON object for total and specific ratings
  facilities: json('facilities').notNull(), // Array of facility names
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  about: text('about').notNull(),
  reviews: json('reviews') // Array of review objects
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