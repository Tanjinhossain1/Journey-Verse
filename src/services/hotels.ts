"use server";

import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";
import { eq, ilike } from "drizzle-orm";

export const getHotels = async () => {

    const HotelsRecord = await db.select().from(hotels);

    return HotelsRecord;
}
export const getPaginatedHotels = async (page = 1, limit = 10, city?: string) => {
    const offset = (page - 1) * limit;
    if (city) {

        const [hotelsData] = await Promise.all([
            db.select().from(hotels).limit(limit).offset(offset).where(eq(hotels.city, city)),
        ]);

        return {
            data: hotelsData,
            totalRecords: hotelsData.length, // totalRecords is now directly returned
        };
    } else {
        const [hotelsData, totalRecords] = await Promise.all([
            db.select().from(hotels).limit(limit).offset(offset),
            db.$count(hotels), // Use $count to get the total number of hotel records
        ]);

        return {
            data: hotelsData,
            totalRecords: totalRecords, // totalRecords is now directly returned
        };
    }

};

export const getHotelsByPrice = async (price: 'low' | 'high') => {
    const HotelsRecord = await db.select().from(hotels);

    // Convert the `price` field from string to number and sort based on `price` parameter
    const sortedHotels = HotelsRecord.sort((a, b) => {
        const priceA = parseFloat(a.price ? a.price : "");
        const priceB = parseFloat(b.price ? b.price : '');

        return price === 'low' ? priceA - priceB : priceB - priceA;
    });

    return sortedHotels;
}
export const getHotelsByOrder = async (order: 'a' | 'z') => {
    const HotelsRecord = await db.select().from(hotels);

    // Sort HotelsRecord by title based on `order` parameter
    const sortedHotels = HotelsRecord.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (order === 'a') {
            return titleA.localeCompare(titleB); // Ascending order
        } else {
            return titleB.localeCompare(titleA); // Descending order
        }
    });

    return sortedHotels;
};


export const getHotelsByCity = async (city?: string, country?: string) => {
    if (city) {

        const HotelsRecord = await db.select().from(hotels).where(eq(hotels.city, city))

        return HotelsRecord;
    } else if (country) {

        const HotelsRecord = await db.select().from(hotels).where(eq(hotels.country, country))

        return HotelsRecord;

    } else {
        const HotelsRecord = await db.select().from(hotels);

        return HotelsRecord;
    }
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
        return { success: false, message: (error as { message: string })?.message };
    }
};
