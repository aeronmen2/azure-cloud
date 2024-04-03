/* eslint-disable no-unused-vars */
import { DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: string; role: string; description: string }
  }
  interface User extends DefaultUser {
    role: string
    description: string
  }
}
