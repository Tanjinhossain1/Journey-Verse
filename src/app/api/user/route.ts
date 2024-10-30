/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/db';
import { userTable } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json();

        const { email, fullName, password, role } = body;

        console.log("body detail created", body);

        if (!email || !fullName || !password || !role) {
            return NextResponse.json({ error: "Missing required fields" });
        }

        // existing user
        const existingUser = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));
        if (existingUser && existingUser[0]) {
            return NextResponse.json({ error: "User Already Register" });
        }

        // Perform the database insertion using Drizzle ORM
        const newUser = await db
            .insert(userTable)
            .values({
                fullName,
                email,
                password: password,
                role,
            }).returning()



        return NextResponse.json({
            success: true,
            message: "successfully created User",
            data: newUser,
        });
    } catch (error) {
        console.error("Error creating article:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}


export async function GET() {
    try {
        // Get user by ID
        const userRecord = await db.select().from(userTable);
        return NextResponse.json(userRecord, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: error.message }, { status: 404 });
    }
}

export async function DELETE(request: Request) {
    try {
        // Get the URL of the request
        const url = new URL(request.url);

        // Extract the user ID from the search parameters
        const id = url.searchParams.get('id'); // Assuming the ID is passed as ?id=someId

        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // Delete user by ID
        const result = await db.delete(userTable).where(eq(userTable.id, Number(id))).execute();

        // Check the affected rows directly
        if (result.rows.length === 0) throw new Error('User not found');

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: error.message }, { status: 404 });
    }
}


