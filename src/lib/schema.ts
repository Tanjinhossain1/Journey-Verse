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
  country:text('country'),
  displayImage: text('display_image').notNull(),
  price:text('price'),
  images: json('images').notNull(), // Array of image URLs
  ratings: json('ratings').notNull(), // JSON object for total and specific ratings
  facilities: json('facilities').notNull(), // Array of facility names
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  about: json('about'),
  reviews: json('reviews') // Array of review objects
});

export const Rooms = pgTable('rooms', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  hotel: text('hotel').notNull(),
  displayImage: text('display_image').notNull(),
  price:text('price'),
  images: json('images').notNull(), // Array of strings
  facilities: json('facilities').notNull(), // Array of {name:string}[]
  about: json('about').notNull(), // array of {detail:string}[]
  foot_age: text('foot_age').notNull(),
  bed: text('bed').notNull(),
  adult: text('adult').notNull(),
  kid: text('kid').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
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