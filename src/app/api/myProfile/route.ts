import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { MyProfile } from "@/lib/schema";
import { db } from "@/lib/db";

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { name, location, bio, travelStyle, favoriteDestination, bucketList, email } = data;

        // Check if user with the same name already exists
        const existingUser = await db.select().from(MyProfile).where(eq(MyProfile.email, email)).execute();

        if (existingUser.length > 0) {
            // User exists, update the record
            const updatedUser = await db.update(MyProfile)
                .set({
                    location,
                    bio,
                    travelStyle,
                    favoriteDestination,
                    bucketList,
                    name,
                })
                .where(eq(MyProfile.email, email))
                .returning()
                .execute();

            return NextResponse.json(updatedUser, { status: 200 });
        } else {
            // User does not exist, create a new record
            const newUser = await db.insert(MyProfile)
                .values({
                    name,
                    location,
                    bio,
                    email,
                    travelStyle,
                    favoriteDestination,
                    bucketList,
                })
                .returning()
                .execute();

            return NextResponse.json(newUser, { status: 201 });
        }
    } catch (error) {
        console.error("Error handling user:", error);
        return NextResponse.json({ error: "Failed to process user data" }, { status: 500 });
    }
}
