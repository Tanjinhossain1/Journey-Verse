"use server";

import { db } from "@/lib/db";
import { LovedHotels } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

export const getLovedHotels = async (email?:string) => {
    if(email){

        
        const LovedHotelsRecord = await db.select().from(LovedHotels).where(eq(LovedHotels.email, email))
        
        return LovedHotelsRecord;
    }else{
        return { message: "not have"}
    }
}

export const removedLike = async (hotel_name:string) => {
    await db.delete(LovedHotels).where(eq(LovedHotels.hotel_name,hotel_name)).returning();
  
    // if (deletedCountry.length === 0) {
    //   return { error: 'Loved Hotel not found' }
    // }
  
    return { message: 'Loved Hotel deleted successfully'}
}