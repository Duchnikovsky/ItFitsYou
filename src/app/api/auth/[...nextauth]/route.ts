import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`,{
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body:JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })
        
        const user = await res.json()

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signIn',
  },
});

export {handler as GET, handler as POST}