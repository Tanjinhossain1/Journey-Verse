import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { userTable } from "@/lib/schema";
import { User } from "@/types/user";

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = await db.select().from(userTable).where(eq(userTable.email, credentials.email)).execute();
                if (user && user[0] && await bcrypt.compare(credentials.password, user[0].password)) {
                    return {
                        id: `${user[0].id}`,
                        email: user[0].email,
                        fullName: user[0].fullName,
                        role: user[0].role,
                    } as User;
                }

                return null;
            },
        }),
         
    ],
    callbacks: {
        async jwt({ token, user }) {
            // const emailCounter:Record<string, number>  = {}; // In-memory store for demonstration
            if (user) {
                token.email = user.email;
                // if (!token.email) {
                //     const baseName = user.name?.replace(/\s+/g, '').toLowerCase(); // Remove spaces, make lowercase
                //     if (baseName) {
                //         // Increment the count for this name
                //         emailCounter[baseName] = (emailCounter[baseName] || 0) + 1;
                //         const newEmail = `${baseName}${emailCounter[baseName]}@gmail.com`;
                //         token.email = newEmail;
                //     } else {
                //         token.email = `unknown${Date.now()}@gmail.com`; // Fallback for missing name
                //     }
                // }
                token.fullName = user.fullName;
                token.role = user.role;
                token.id = user.id;
                token.picture = user.role || token.picture;
                token.image = user.image;
                token.name = user.fullName || user.name
            }
            return token;
        },
        async session({ session, token }) {
            session.user.email = token.email;
            session.user.fullName = token.fullName;
            session.user.name = token.fullName || token.name;
            session.user.role = token.role;
            token.image = token.image;
            session.user.id = token.id;
            return session;
        },
    },
    
    pages: {
        signIn: "/login/in",
    },
};
