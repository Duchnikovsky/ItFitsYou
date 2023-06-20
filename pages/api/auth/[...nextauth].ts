import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from 'bcrypt'
import { prisma } from "../../../lib/db"

const loginSchema = z.object({
  email: z.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, 'Invalid email'),
  password: z.string().min(5, 'Password invalid'),
})

const AuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider(
      {
        credentials: {
          email: { type: 'text', placeholder: 'test@test.com' },
          password: { type: 'password', placeholder: 'password' },
        },
        async authorize(credentials, req) {
          const { email, password } = loginSchema.parse(credentials)
          const user = await prisma.user.findFirst({
            where: {
              email: email,
            }
          })
          if (!user) return null

          const comparePass = await bcrypt.compare(password, user.password)

          if (!comparePass) return null

          return user
        }
      }
    )
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      return session
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id
        token.email = user.email
      }
      return token
    }
  },
  pages: {
    signIn: '/sigin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(AuthOptions)