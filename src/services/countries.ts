"use server";

import { db } from "@/lib/db";
import { countries } from "@/lib/schema";

export const getCountries = async () =>{

    const countriesRecord = await db.select().from(countries);

    return countriesRecord
}