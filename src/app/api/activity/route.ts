import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm"; // For query filtering
import { Activity } from "@/lib/schema";
import { db } from "@/lib/db";

// POST request to create a new tour
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Insert the new tour data
    const result = await db.insert(Activity).values(data).returning();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating tour:", error);
    return NextResponse.json({ error: "Failed to create tour" }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const { id, city, title, totalRating, price, displayImage, images, totalDuration, tourType, groupSize, languages, about, highlight, included, excluded, itinerary, durations, questions, discounts, reviews, specificReviews } = data;

        if (!id) {
            return NextResponse.json({ error: "Activity ID is required" }, { status: 400 });
        }

        // Log the payload to debug
        console.log("Update payload:", data);

        // Update specific fields in the database
        const result = await db.update(Activity)
            .set({
                city,
                title,
                totalRating,
                price,
                displayImage,
                images,
                totalDuration,
                tourType,
                groupSize,
                languages,
                about,
                highlight,
                included,
                excluded,
                itinerary,
                durations,
                questions,
                discounts,
                reviews,
                specificReviews,
            })
            .where(eq(Activity.id, id))
            .returning();

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating tour:", error); // Log the full error
        return NextResponse.json({ error: "Failed to update tour" }, { status: 500 });
    }
}

  

// DELETE request to delete a tour by id from search params
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Activity ID is required" }, { status: 400 });
    }

    // Delete the tour with the given id
    const result = await db.delete(Activity).where(eq(Activity.id, Number(id))).returning();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error deleting tour:", error);
    return NextResponse.json({ error: "Failed to delete Activity" }, { status: 500 });
  }
}
