"use server";

import { db } from "@/lib/db";
import { City } from "@/lib/schema";

export const getCity = async () =>{

    const cityRecord = await db.select().from(City);

    return cityRecord
}