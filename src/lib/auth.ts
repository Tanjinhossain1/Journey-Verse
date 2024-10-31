import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { userTable } from "@/lib/schema";
import { User } from "@/types/user";

export const authOptions: NextAuthOptions = {
    providers: [
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
            if (user) {
                token.email = user.email;
                token.fullName = user.fullName;
                token.role = user.role;
                token.id = user.id;
                token.picture = user.role;
                token.name = user.fullName
            }
            return token;
        },
        async session({ session, token }) {
            session.user.email = token.email;
            session.user.fullName = token.fullName;
            session.user.role = token.role;
            session.user.id = token.id;
            return session;
        },
    },
    
    pages: {
        signIn: "/login",
    },
};
