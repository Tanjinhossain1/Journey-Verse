"use server";

import { db } from "@/lib/db";
import { Tours } from "@/lib/schema";
import { eq } from "drizzle-orm";


export const getTOurs = async () => {

    const tourRecord = await db.select().from(Tours);

    return tourRecord
}

export const getDetailedTour = async (title: string) => {

    const tourRecord = await db.select().from(Tours).where(eq(Tours.title, title))

    return tourRecord
}

export const getPaginatedTour = async (page = 1, limit = 10, city?: string) => {
    const offset = (page - 1) * limit;
    if (city) {

        const [toursData] = await Promise.all([
            db.select().from(Tours).limit(limit).offset(offset).where(eq(Tours.city, city)),
        ]);

        return {
            data: toursData,
            totalRecords: toursData.length, // totalRecords is now directly returned
        };
    } else {
        const [toursData, totalRecords] = await Promise.all([
            db.select().from(Tours).limit(limit).offset(offset),
            db.$count(Tours), // Use $count to get the total number of tour records
        ]);

        return {
            data: toursData,
            totalRecords: totalRecords, // totalRecords is now directly returned
        };
    }

};
// Define the Review type, or use an existing one if available
type Review = {
    name: string, email: string, content: string,
    // Add more fields as necessary
};

export const updateTourReview = async (id: string, newReview: Review) => {
    try {
        // Fetch the current tour record
        const [tourRecord] = await db.select().from(Tours).where(eq(Tours.id, Number(id)));

        if (!tourRecord) {
            throw new Error(`tour with title "${id}" not found.`);
        }

        // Cast reviews to an array of Review objects, or initialize it as an empty array if null
        const currentReviews = (tourRecord.reviews as Review[]) || [];

        // Add the new review
        const updatedReviews = [...currentReviews, newReview];

        // Update the tour record with the new reviews array
        await db
            .update(Tours)
            .set({ reviews: updatedReviews })
            .where(eq(Tours.id, tourRecord.id));

        return { success: true, message: 'Review added successfully' };
    } catch (error) {
        console.error('Error updating review:', error);
        return { success: false, message: (error as { message: string })?.message };
    }
};