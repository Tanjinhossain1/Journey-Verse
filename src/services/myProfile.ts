"use server";

import { db } from "@/lib/db";
import { MyProfile } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const getMyProfile = async (email:string) => {

    const MyProfileRecord = await db.select().from(MyProfile).where(eq(MyProfile.email, email))

    return MyProfileRecord[0];
}