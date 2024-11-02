
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import for the database connection
import { BlogsPostTable } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

// POST: Create a new post
export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields (you can use Zod or similar library for more complex validation)
        if (!data.title || !data.image || !data.category || !data.email || !data.username || !data.content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newPost = {
            title: data.title,
            description: data.description,
            image: data.image,
            category: data.category,
            email: data.email,
            username: data.username,
            content: data.content,
        };

        const result = await db.insert(BlogsPostTable).values(newPost).returning().execute();
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
export async function PUT(request: Request) {
    try {
        const data = await request.json();

        // Check for required fields
        if (!data.title||!data.id || !data.image || !data.category || !data.email || !data.username || !data.content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingPost = await db.select().from(BlogsPostTable).where(eq(BlogsPostTable.id, parseInt(data.id))).execute();

        if (!existingPost.length) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const updatedPost = {
            title: data.title,
            description: data.description,
            image: data.image,
            category: data.category,
            email: data.email,
            username: data.username,
            content: data.content,
            updatedAt: new Date(), // Update the timestamp
        };

        const result = await db.update(BlogsPostTable)
            .set(updatedPost)
            .where(eq(BlogsPostTable.id, parseInt(data?.id)))
            .returning()
            .execute();

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
  
    // Delete Blogs from database
    const deletedBlogs = await db.delete(BlogsPostTable).where(sql`${BlogsPostTable.id} = ${id}`).returning();
  
    if (deletedBlogs.length === 0) {
      return NextResponse.json({ error: 'Blog Post not found' }, { status: 404 });
    }
  
    return NextResponse.json({ message: 'Blog Post deleted successfully' });
  }