"use server";

import { db } from "@/lib/db";
import { Orders } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const getOrders = async () => {

    const OrdersRecord = await db.select().from(Orders);

    return OrdersRecord;
}
export const getUserOrders = async (email:string) => {

    const OrdersRecord = await db.select().from(Orders).where(eq(Orders.email,email))

    return OrdersRecord;
}