// app/api/countries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { countries } from '@/lib/schema';
import { sql } from 'drizzle-orm';

// GET request handler
export async function GET() {
    try {
      const allCountries = await db.select().from(countries); // Fetch all countries from the database
      return NextResponse.json(allCountries); // Return the countries as JSON response
    } catch (error) {
      console.error('Error fetching countries:', error);
      return NextResponse.error(); // Handle error response
    }
  }
  
// POST handler to create a new country
export async function POST(req: NextRequest) {
  try{

    const { name } = await req.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    // Insert country into database
    const newCountry = await db.insert(countries).values({ name }).returning();
    
    return NextResponse.json(newCountry[0], { status: 201 });
  }catch(error){
    return NextResponse.json({ error });
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
  const deletedCountry = await db.delete(countries).where(sql`${countries.id} = ${id}`).returning();

  if (deletedCountry.length === 0) {
    return NextResponse.json({ error: 'Country not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Country deleted successfully' });
}
