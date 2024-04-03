import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { authConfig } from "./auth.config"
import { users } from "@/data/users"

async function getUser(username: string): Promise<User | any> {
  try {
    const user = (await users.find(
      (user: User) => user.name === username
    )) as User

    return user
  } catch (error) {
    throw new Error("Failed too fetch user.")
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string() })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data
          const user = await getUser(username)

          if (!user) {
            return null
          }

          if (user.password === password) {
            return user
          }
        }

        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {},
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.name = user.name
        token.role = user.role
        token.description = user.description
      }

      return token
    },
    session({ session, token }) {
      session.user.name = token.name
      session.user.role = token.role
      session.user.description = token.description

      return session
    },
  },
})
