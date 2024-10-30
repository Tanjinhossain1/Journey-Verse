"use server";

import { db } from "@/lib/db";
import { hotels } from "@/lib/schema";

export const getHotels = async () =>{

    const HotelsRecord = await db.select().from(hotels);

    return HotelsRecord;
}