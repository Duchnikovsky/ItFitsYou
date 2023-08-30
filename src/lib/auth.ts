import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { z } from "zod";
import bcrypt from "bcrypt";

export const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signIn",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "text", placeholder: "test@test.com" },
        password: { type: "password", placeholder: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = z
          .object({
            email: z
              .string()
              .regex(
                /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
                "Invalid email format"
              ),
            password: z
              .string()
              .min(5, "Password should be 5-20 characters long")
              .max(20, "Password should be 5-20 characters long"),
          })
          .parse(credentials);
        const user = await db.user.findFirst({
          where: {
            email: email,
          },
        });
        if (!user) {
          throw new Error("Email or password is incorrect");
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
          throw new Error("Email or password is incorrect");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });
      
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
      };
    },
    redirect() {
      return "/";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export function getAuthSession() {
  return getServerSession(AuthOptions);
}
