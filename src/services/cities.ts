"use server";

import { db } from "@/lib/db";
import { City } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const getCity = async () => {

    const cityRecord = await db.select().from(City);

    return cityRecord
}

export const getDetailedCity = async (city: string) => {

    const cityRecord = await db.select().from(City).where(eq(City.city, city))

    return cityRecord
}