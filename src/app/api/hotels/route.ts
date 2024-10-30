// src/app/api/hotels/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hotels } from '@/lib/schema';
import { sql } from 'drizzle-orm';

// Handle both POST and DELETE requests
export async function POST(req: Request) {
  const { title, displayImage, images, ratings, facilities, about, reviews ,city} = await req.json();

  try {
    // Create a new hotel entry
    const newHotel = {
      title,
      displayImage,
      images,
      ratings,
      facilities,
      about,
      reviews,
      city
    };

    const insertedHotel = await db.insert(hotels).values(newHotel);
    return NextResponse.json(insertedHotel);
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json({ message: "Error creating hotel" }, { status: 500 });
  }
}

// DELETE handler to remove a country by id
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
  
    // Delete country from database
    const deletedCountry = await db.delete(hotels).where(sql`${hotels.id} = ${id}`).returning();
  
    if (deletedCountry.length === 0) {
      return NextResponse.json({ error: 'hotels not found' }, { status: 404 });
    }
  
    return NextResponse.json({ message: 'hotels deleted successfully' });
  }