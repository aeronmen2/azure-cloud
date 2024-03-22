import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { authConfig } from "./auth.config"
import { users } from "@/data/users"
import { User } from "@/types/userType"

async function getUser(username: string): Promise<User | any> {
  try {
    const user = await users.find((user: User) => user.username === username)

    return user
  } catch (error) {
    throw new Error("Failed too fetch user.")
  }
}

export const { auth, signIn, signOut } = NextAuth({
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
})
