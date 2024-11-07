import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { ActivitiesOrders } from "@/lib/schema";
import { db } from "@/lib/db";

// POST: Create a new order
export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields, use Zod for schema validation if necessary
        const newOrder = {
            fullName: data.fullName,
            cardNumber: data.cardNumber,
            email: data.email,
            phone: data.phone,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2 || null,
            city: data.city,
            stateProvince: data.stateProvince,
            zipCode: data.zipCode,
            country: data.country,
            specialRequirements: data.specialRequirements || null,
            couponCode: data.couponCode || null,
            totalAmount: data.totalAmount || null,
            checkIn: data.checkIn || null,
            checkout: data.checkout || null,
            rooms: data.rooms || null,
            adults: data.adults || null,
            children: data.children || null,
            activity_name: data.activity_name || null,
            status: data.status || null,
        };

        const result = await db.insert(ActivitiesOrders).values(newOrder).returning();
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}

// PUT: Update an existing order
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const orderId = data.id;

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        const updatedOrder = {
            fullName: data.fullName,
            cardNumber: data.cardNumber,
            email: data.email,
            phone: data.phone,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2 || null,
            city: data.city,
            stateProvince: data.stateProvince,
            zipCode: data.zipCode,
            country: data.country,
            specialRequirements: data.specialRequirements || null,
            totalAmount: data.totalAmount || null,
            checkIn: data.checkIn || null,
            checkout: data.checkout || null,
            rooms: data.rooms || null,
            adults: data.adults || null,
            children: data.children || null,
            tour_name: data.tour_name || null,
            status: data.status || null,
        };

        const result = await db.update(ActivitiesOrders).set(updatedOrder).where(eq(ActivitiesOrders.id, orderId)).returning();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
