import { db } from "@/lib/db";
import { LovedHotels } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { fullName, email, hotel_name } = await request.json();
  const newHotel = await db
    .insert(LovedHotels)
    .values({ fullName, email, hotel_name })
    .returning();
  return NextResponse.json(newHotel[0]);
}

export async function PUT(request: Request) {
  const { id, fullName, email, hotel_name } = await request.json();
  const updatedHotel = await db
    .update(LovedHotels)
    .set({ fullName, email, hotel_name })
    .where(eq(LovedHotels.id, Number(id)))
    .returning();
  return NextResponse.json(updatedHotel[0]);
}

// DELETE handler to remove a country by id
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
  
    // Delete country from database
    const deletedCountry = await db.delete(LovedHotels).where(sql`${LovedHotels.id} = ${id}`).returning();
  
    if (deletedCountry.length === 0) {
      return NextResponse.json({ error: 'Loved Hotel not found' }, { status: 404 });
    }
  
    return NextResponse.json({ message: 'Loved Hotel deleted successfully' });
  }