import { db } from "@/lib/db";
import { Subscribe } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email } = await request.json();
    const isExist = await db.select().from(Subscribe).where(eq(Subscribe.email, email));
    if(isExist && isExist[0] && isExist[0]?.email){
        return NextResponse.json({error:"Already Subscribe"});
    }
    const newSubscription = await db.insert(Subscribe).values({ email }).returning();
    return NextResponse.json(newSubscription[0]);
}

export async function PUT(request: Request) {
    const { id, email } = await request.json();
    const updatedSubscription = await db.update(Subscribe)
        .set({ email })
        .where(eq(Subscribe.id, Number(id)))
        .returning();
    return NextResponse.json(updatedSubscription[0]);
}

// DELETE handler to remove a country by id
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
  
    // Delete country from database
    const deletedCountry = await db.delete(Subscribe).where(sql`${Subscribe.id} = ${id}`).returning();
  
    if (deletedCountry.length === 0) {
      return NextResponse.json({ error: 'Subscribe not found' }, { status: 404 });
    }
  
    return NextResponse.json({ message: 'Subscribe deleted successfully' });
  }