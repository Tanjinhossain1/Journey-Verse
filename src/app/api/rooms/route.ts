import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db'; // adjust this path according to your DB configuration
import { eq } from 'drizzle-orm';
import { Rooms } from '@/lib/schema';

// POST request: Add a new room
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, displayImage, price, images, facilities, about, foot_age, bed, adult, kid, hotel} = body;

    const newRoom = await db.insert(Rooms).values({
      title,
      displayImage,
      price,
      images,
      facilities,
      about,
      foot_age,
      bed,
      adult,
      kid,
      hotel,
      
    });

    return NextResponse.json({ success: true, data: newRoom });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ success: false, error: (error as { message: string })?.message }, { status: 500 });
  }
}

// PUT request: Update a room by ID
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, displayImage, price, images, facilities, about, foot_age, bed, adult, kid } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const updatedRoom = await db
      .update(Rooms)
      .set({
        title,
        displayImage,
        price,
        images,
        facilities,
        about,
        foot_age,
        bed,
        adult,
        kid,
      })
      .where(eq(Rooms.id, id))

    return NextResponse.json({ success: true, data: updatedRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    return NextResponse.json({ success: false, error: (error as { message: string }).message }, { status: 500 });
  }
}

// DELETE request: Delete a room by ID (from search params)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    await db.delete(Rooms).where(eq(Rooms.id, parseInt(id)));

    return NextResponse.json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    return NextResponse.json({ success: false, error: (error as { message: string })?.message }, { status: 500 });
  }
}
