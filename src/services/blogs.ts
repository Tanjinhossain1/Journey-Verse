"use server";

import { db } from "@/lib/db";
import { BlogsPostTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const getBlogsByEmail = async (email: string) => {

    const BlogsPostTableRecord = await db.select().from(BlogsPostTable).where(eq(BlogsPostTable.email, email))

    return BlogsPostTableRecord
}
