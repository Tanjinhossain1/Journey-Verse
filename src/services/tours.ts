"use server";

import { db } from "@/lib/db";
import { TourOrders, Tours } from "@/lib/schema";
import { and, eq, ne } from "drizzle-orm";


export const getTOurs = async () => {

    const tourRecord = await db.select().from(Tours);

    return tourRecord
}

export const getDetailedTour = async (title: string) => {

    const tourRecord = await db.select().from(Tours).where(eq(Tours.title, title))

    return tourRecord
}

export const getTheTourBookingStatus = async (title: string,email:string) => {

    const tourRecord = await db.select().from(TourOrders).where(and(eq(TourOrders.tour_name, title),eq(TourOrders.email, email)))

    return tourRecord
}

export const getToursByCity = async (city?: string) => {
    if (city) {

        const ToursRecord = await db.select().from(Tours).where(eq(Tours.city, city))

        return ToursRecord;
    } else {
        const ToursRecord = await db.select().from(Tours);

        return ToursRecord;
    }
}

export const getToursByPrice = async (price: 'low' | 'high') => {
    const ToursRecord = await db.select().from(Tours);

    // Convert the `price` field from string to number and sort based on `price` parameter
    const sortedTours = ToursRecord.sort((a, b) => {
        const priceA = parseFloat(a.price ? a.price : "");
        const priceB = parseFloat(b.price ? b.price : '');

        return price === 'low' ? priceA - priceB : priceB - priceA;
    });

    return sortedTours;
}
export const getToursByOrder = async (order: 'a' | 'z') => {
    const ToursRecord = await db.select().from(Tours);

    // Sort ToursRecord by title based on `order` parameter
    const sortedTours = ToursRecord.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (order === 'a') {
            return titleA.localeCompare(titleB); // Ascending order
        } else {
            return titleB.localeCompare(titleA); // Descending order
        }
    });

    return sortedTours;
};

export const getUserTourOrders = async (email:string) => {

    const OrdersRecord = await db.select().from(TourOrders).where(eq(TourOrders.email,email))

    return OrdersRecord;
}
export const getTourOrders = async () => {

    const OrdersRecord = await db.select().from(TourOrders)

    return OrdersRecord;
}

export const getPaginatedTour = async (page = 1, limit = 10, city?: string,title?:string) => {
    const offset = (page - 1) * limit;
    if (city) {

        const [toursData] = await Promise.all([
            db.select().from(Tours).limit(limit).offset(offset).where(eq(Tours.city, city)),
        ]);

        return {
            data: toursData,
            totalRecords: toursData.length, // totalRecords is now directly returned
        };
    } else if(title){
        const [toursData] = await Promise.all([
            db.select().from(Tours).limit(limit).offset(offset).where(ne(Tours.title, title)),
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