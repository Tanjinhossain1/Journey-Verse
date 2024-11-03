"use server";

import { db } from "@/lib/db";
import { BlogsPostTable } from "@/lib/schema";
import { desc, eq, notLike } from "drizzle-orm";

export const getBlogsByEmail = async (email: string) => {

    const BlogsPostTableRecord = await db.select().from(BlogsPostTable).where(eq(BlogsPostTable.email, email))

    return BlogsPostTableRecord
}

export const getBlogsByTitle = async (title: string) => {

    const BlogsPostTableRecord = await db.select().from(BlogsPostTable).where(eq(BlogsPostTable.title, title))

    return BlogsPostTableRecord
}

export const getBlogsWIthoutSelected = async (title:string) => {

    const BlogsPostTableRecord = await db.select().from(BlogsPostTable).where(notLike(BlogsPostTable.title,title)).orderBy(desc(BlogsPostTable.createdAt))

    return BlogsPostTableRecord
}
export const getBlogs = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    const BlogsPostTableRecord = await db
      .select()
      .from(BlogsPostTable)
      .limit(limit)
      .offset(offset);
    const TotalBlogs = await db
      .select()
      .from(BlogsPostTable)
  
    return {
        data:BlogsPostTableRecord,
        total:TotalBlogs.length
    };
  };
  

// export const getBlogs = async () => {

//     const BlogsPostTableRecord = await db.select().from(BlogsPostTable);

//     return BlogsPostTableRecord
// }
