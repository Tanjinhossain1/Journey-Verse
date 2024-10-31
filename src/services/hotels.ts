"use server";

import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const getHotels = async () =>{

    const HotelsRecord = await db.select().from(hotels);

    return HotelsRecord;
}
export const getDetailsHotels = async (title:string) =>{

    const HotelsRecord = await db.select().from(hotels).where(eq(hotels.title, title));

    return HotelsRecord;
}