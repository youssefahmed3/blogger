import type { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import bcrypt from "bcryptjs";
import { Account, User as AuthUser } from "next-auth";

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                try {
                    await connectToDb();
                    const user = await User.findOne({ email: credentials?.email })

                    const passwordMatch = bcrypt.compare(credentials?.password as string, user?.password as string);

                    if (!passwordMatch) {
                        return null
                    }

                    return user;

                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "github") {
                await connectToDb();
                try {
                    // Check if the user already exists in the database
                    let existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        // If the user doesn't exist, create a new user
                        existingUser = await User.create({
                            username: user.name,
                            email: user.email,
                            avatar: user.image,
                            githubId: account.id, // Store the GitHub account ID
                        });
                    } else {
                        // If the user already exists, update their GitHub account ID
                        existingUser.githubId = account.id;
                        await existingUser.save();
                    }

                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }

            if (account?.provider === "credentials") {
                return true;
            }

            // If the provider is not "github" or "credentials", disallow sign in
            return false;
        },
        async jwt({ token, user }) {
            // If the token is being created for the first time for a user
            if (user) {
                // Include the user's email in the token
                token.email = user.email;
            }

            return token;
        },
        async session({ session, token }) {
            try {
                await connectToDb();
                // Find the user in MongoDB
                if(token.email) {
                    const dbUser = await User.findOne({ email: token.email });
    
                    // Add the user from MongoDB to the session
                    session.user = dbUser;
                    console.log("New", token);
                }

                return session;
            } catch (error: any) {
                console.log(error.message);
                return session;
            }
        },

    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
        signOut: "/",
    },
}