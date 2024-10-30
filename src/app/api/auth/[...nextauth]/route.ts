/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db"; // Adjust this import as per your database setup
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { userTable } from "@/lib/schema";

interface User {
    id: string; // Change this to string if your user ID is a string
    email: string;
    fullName: string;
    role: string;
    password: string;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                if (!credentials) return null; // Handle undefined credentials

                const user = await db.select().from(userTable).where(eq(userTable.email, credentials.email)).execute();
                if (user && user[0] && await bcrypt.compare(credentials.password, user[0].password)) {
                    return {
                        id: `${user[0].id}`, // Ensure ID type matches User type definition
                        email: user[0].email,
                        fullName: user[0].fullName,
                        role: user[0].role,
                    } as User; // Cast to User type
                }

                return null; // Return null if authentication fails
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            console.log('user  token 1: ', token, user)
            if (user) {
                token.email = user.email;
                token.fullName = user.fullName;
                token.role = user.role;
                token.name = user.role;
                token.picture = user.fullName;
                token.id = user.id; // Optionally include user ID
            }
            return token;
        },
        async session({ session, token }: any) {
            console.log('user  token 2:  ', token, session)
            session.user.email = token?.email as string;
            session.user.fullName = token?.fullName as string;
            session.user.role = token?.role as string;
            session.user.id = token?.id as string; // Optionally include user ID
            return session;
        },
    },
    pages: {
        signIn: "/login", // Custom login page
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
