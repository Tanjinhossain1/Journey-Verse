"use server";

import { db } from "@/lib/db";
import { ActivitiesOrders, Activity } from "@/lib/schema";
import { and, eq, ne } from "drizzle-orm";


export const getActivity = async () => {

    const ActivityRecord = await db.select().from(Activity);

    return ActivityRecord
}

export const getDetailedActivity = async (title: string) => {

    const ActivityRecord = await db.select().from(Activity).where(eq(Activity.title, title))

    return ActivityRecord
}

export const getTheActivityBookingStatus = async (title: string, email: string) => {

    const ActivityRecord = await db.select().from(ActivitiesOrders).where(and(eq(ActivitiesOrders.activity_name, title), eq(ActivitiesOrders.email, email)))

    return ActivityRecord
}

export const getActivityByCity = async (city?: string) => {
    if (city) {

        const ActivityRecord = await db.select().from(Activity).where(eq(Activity.city, city))

        return ActivityRecord;
    } else {
        const ActivityRecord = await db.select().from(Activity);

        return ActivityRecord;
    }
}
export const getActivityOrders = async () => {

    const OrdersRecord = await db.select().from(ActivitiesOrders)

    return OrdersRecord;
}

export const getActivityByPrice = async (price: 'low' | 'high') => {
    const ActivityRecord = await db.select().from(Activity);

    // Convert the `price` field from string to number and sort based on `price` parameter
    const sortedActivity = ActivityRecord.sort((a, b) => {
        const priceA = parseFloat(a.price ? a.price : "");
        const priceB = parseFloat(b.price ? b.price : '');

        return price === 'low' ? priceA - priceB : priceB - priceA;
    });

    return sortedActivity;
}
export const getActivityByOrder = async (order: 'a' | 'z') => {
    const ActivityRecord = await db.select().from(Activity);

    // Sort ActivityRecord by title based on `order` parameter
    const sortedActivity = ActivityRecord.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (order === 'a') {
            return titleA.localeCompare(titleB); // Ascending order
        } else {
            return titleB.localeCompare(titleA); // Descending order
        }
    });

    return sortedActivity;
};

export const getUserActivitiesOrders = async (email: string) => {

    const OrdersRecord = await db.select().from(ActivitiesOrders).where(eq(ActivitiesOrders.email, email))

    return OrdersRecord;
}
export const getActivitiesOrders = async () => {

    const OrdersRecord = await db.select().from(ActivitiesOrders)

    return OrdersRecord;
}

export const getPaginatedActivity = async (page = 1, limit = 10, city?: string, title?: string) => {
    const offset = (page - 1) * limit;
    if (city) {

        const [ActivityData] = await Promise.all([
            db.select().from(Activity).limit(limit).offset(offset).where(eq(Activity.city, city)),
        ]);

        return {
            data: ActivityData,
            totalRecords: ActivityData.length, // totalRecords is now directly returned
        };
    } else if (title) {
        const [ActivityData] = await Promise.all([
            db.select().from(Activity).limit(limit).offset(offset).where(ne(Activity.title, title)),
        ]);

        return {
            data: ActivityData,
            totalRecords: ActivityData.length, // totalRecords is now directly returned
        };
    } else {
        const [ActivityData, totalRecords] = await Promise.all([
            db.select().from(Activity).limit(limit).offset(offset),
            db.$count(Activity), // Use $count to get the total number of Activity records
        ]);

        return {
            data: ActivityData,
            totalRecords: totalRecords, // totalRecords is now directly returned
        };
    }

};
// Define the Review type, or use an existing one if available
type Review = {
    name: string, email: string, content: string,
    // Add more fields as necessary
};

export const updateActivityReview = async (id: string, newReview: Review) => {
    try {
        // Fetch the current Activity record
        const [ActivityRecord] = await db.select().from(Activity).where(eq(Activity.id, Number(id)));

        if (!ActivityRecord) {
            throw new Error(`Activity with title "${id}" not found.`);
        }

        // Cast reviews to an array of Review objects, or initialize it as an empty array if null
        const currentReviews = (ActivityRecord.reviews as Review[]) || [];

        // Add the new review
        const updatedReviews = [...currentReviews, newReview];

        // Update the Activity record with the new reviews array
        await db
            .update(Activity)
            .set({ reviews: updatedReviews })
            .where(eq(Activity.id, ActivityRecord.id));

        return { success: true, message: 'Review added successfully' };
    } catch (error) {
        console.error('Error updating review:', error);
        return { success: false, message: (error as { message: string })?.message };
    }
};