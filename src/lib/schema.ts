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
  city: text('city').notNull(),
  country: text('country'),
  displayImage: text('display_image').notNull(),
  price: text('price'),
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
  price: text('price'),
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

export const Orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  cardNumber: text("card_number").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2"),
  city: text("city"),
  stateProvince: text("state_province"),
  zipCode: text("zip_code"),
  country: text("country"),
  specialRequirements: text("special_requirements"),
  couponCode: text("coupon_code"),
  totalAmount: text("totalAmount"),
  checkIn: text("checkIn"),
  checkout: text("checkout"),
  rooms: text("rooms"),
  children: text("children"),
  adults: text("adults"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
// Define the users table with additional fields
export const MyProfile = pgTable("my_profile", {
  id: serial("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email"),
  location: text("location"),
  bio: text("bio"),
  travelStyle: text("travelStyle"),
  favoriteDestination: text("favoriteDestination"),
  bucketList: text("bucketList"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const BlogsPostTable = pgTable("blogs", {
  id: serial("id").notNull().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  category: text("category").notNull(),
  email: text("email").notNull(),
  username: text("username").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const LovedHotels = pgTable("love_hotels", {
  id: serial("id").notNull().primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  hotel_name: text("hotel_name").notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const Subscribe = pgTable("subscribe", {
  id: serial("id").notNull().primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const userTable = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})