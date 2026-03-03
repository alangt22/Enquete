import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "./prisma"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: { params: { prompt: "consent", access_type: "offline", response_type: "code" } },
    }),
    Credentials({
      name: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({ 
          where: { email: credentials.email as string } })

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(credentials.password as string, user.password)
        
        if (!isValid) return null

        return user
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Gerando JWT real
        const payload = { id: user.id, email: user.email }
        token.accessToken = jwt.sign(payload, process.env.NEXTAUTH_SECRET!, { expiresIn: "1h" })
        token.id = user.id
        token.email = user.email
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.accessToken = token.accessToken as string // JWT real
      }
      return session
    },
  },
})