import { NextResponse } from "next/server";
import { and, gte, lte } from "drizzle-orm";
import { Orders } from "@/lib/schema";
import { db } from "@/lib/db";

// GET: Check availability for given dates
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get("checkIn");
    const checkout = searchParams.get("checkout");

    if (!checkIn || !checkout) {
        return NextResponse.json({ error: "Check-in and checkout dates are required" }, { status: 400 });
    }

    try {
        // Convert checkIn and checkout to strings
        const checkInDate = new Date(checkIn).toISOString();
        const checkoutDate = new Date(checkout).toISOString();

        // Check for any overlapping bookings
        const overlappingOrders = await db
            .select()
            .from(Orders)
            .where(
                and(
                    lte(Orders.checkIn, checkoutDate),
                    gte(Orders.checkout, checkInDate)
                )
            );

        if (overlappingOrders.length > 0) {
            return NextResponse.json({ available: false, message: "Room is already booked for the selected dates" }, { status: 200 });
        }

        return NextResponse.json({ available: true, message: "Room is available for the selected dates" }, { status: 200 });
    } catch (error) {
        console.error("Error checking availability:", error);
        return NextResponse.json({ error: "Failed to check availability" }, { status: 500 });
    }
}
