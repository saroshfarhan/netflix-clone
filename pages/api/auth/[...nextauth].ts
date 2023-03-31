import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import {compare} from 'bcrypt';
import prismadb from '@/lib/prismadb'

import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from "@next-auth/prisma-adapter";



// This code sets up a Next.js authentication system using the NextAuth library. It imports the necessary dependencies from various modules - "next-auth/next", "next-auth/providers/credentials", "bcrypt" and a database connection from "prismadb". Then, it exports a default object which is the configuration object for NextAuth.


// The configuration object sets up an authentication provider called "Credentials" that enables authentication using an email and password combination. It establishes a user using the Prismadb module and checks whether the email and the password match with the stored user data. The configuration also provides page information for rendering the authentication pages, where a user can sign in. Finally, it sets some environment variables like NODE_ENV, NEXTAUTH_JWT_SECRET & NEXTAUTH_SECRET that are required for the authentication system.

// The code exports the configuration object, which can directly be used by the Next.js application to establish authentication services.

export default NextAuth({
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password:{
                    label:"Password",
                    type: "password",
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Email and Password required');
                    
                }
                const user = await prismadb.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });
                if(!user ||  !user.hashedPassword){
                    throw new Error('Email does not exist')
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                if(!isCorrectPassword){
                    throw new Error("Incorrect password")
                }

                return user;
            }
        })
    ],
    pages:{
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt'
    },
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
})