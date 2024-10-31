"use server";

import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";
import { eq, ilike } from "drizzle-orm";

export const getHotels = async () => {

    const HotelsRecord = await db.select().from(hotels);

    return HotelsRecord;
}
export const getDetailsHotels = async (title: string) => {

    const HotelsRecord = await db.select().from(hotels).where(ilike(hotels.title, title));

    return HotelsRecord;
}
// Define the Review type, or use an existing one if available
type Review = {
    name: string, email: string, content: string,
    // Add more fields as necessary
};

export const updateReview = async (id: string, newReview: Review) => {
    try {
        // Fetch the current hotel record
        const [hotelRecord] = await db.select().from(hotels).where(eq(hotels.id, Number(id)));

        if (!hotelRecord) {
            throw new Error(`Hotel with title "${id}" not found.`);
        }

        // Cast reviews to an array of Review objects, or initialize it as an empty array if null
        const currentReviews = (hotelRecord.reviews as Review[]) || [];

        // Add the new review
        const updatedReviews = [...currentReviews, newReview];

        // Update the hotel record with the new reviews array
        await db
            .update(hotels)
            .set({ reviews: updatedReviews })
            .where(eq(hotels.id, hotelRecord.id));

        return { success: true, message: 'Review added successfully' };
    } catch (error) {
        console.error('Error updating review:', error);
        return { success: false, message: (error as {message:string})?.message };
    }
};
