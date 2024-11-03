import { NextResponse } from "next/server";
import { and, eq, gte, lte } from "drizzle-orm";
import { Orders } from "@/lib/schema";
import { db } from "@/lib/db";

// GET: Check availability for given dates
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const checkIn = searchParams.get("checkIn");
    const checkout = searchParams.get("checkout");
    const hotel_name = searchParams.get("hotel_name");
    const room_name = searchParams.get("room_name");

    if (!checkIn || !checkout || !hotel_name) {
        return NextResponse.json({ error: "Check-in and checkout dates are required" }, { status: 400 });
    }

    try {
        // Convert checkIn and checkout to strings
        const checkInDate = new Date(checkIn).toISOString();
        const checkoutDate = new Date(checkout).toISOString();
        let overlappingOrders;
        if (room_name) {
            overlappingOrders = await db
                .select()
                .from(Orders)
                .where(
                    and(
                        lte(Orders.checkIn, checkoutDate),
                        gte(Orders.checkout, checkInDate),
                        eq(Orders.hotel_name, hotel_name),
                        eq(Orders.room_name, room_name)
                    )
                );
        } else {
            // Check for any overlapping bookings
            overlappingOrders = await db
                .select()
                .from(Orders)
                .where(
                    and(
                        lte(Orders.checkIn, checkoutDate),
                        gte(Orders.checkout, checkInDate),
                        eq(Orders.hotel_name, hotel_name),
                    )
                );
        }

        if (overlappingOrders.length > 0) {
            return NextResponse.json({ available: false, message: "Room is already booked for the selected dates" }, { status: 200 });
        }

        return NextResponse.json({ available: true, message: "Room is available for the selected dates" }, { status: 200 });
    } catch (error) {
        console.error("Error checking availability:", error);
        return NextResponse.json({ error: "Failed to check availability" }, { status: 500 });
    }
}
