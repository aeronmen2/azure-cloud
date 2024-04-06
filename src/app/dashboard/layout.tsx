import Logout from "@/ui/dashboard/logout"
import { auth } from "auth"
import React from "react"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div className="">
      <div className="flex m-3 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <h1 className={`text-white text-7xl`}>Hello, {session?.user.name}!</h1>
        <div className="p-2">
          <Logout />
        </div>
      </div>
      <div className="flex-grow m-3 overflow-y-auto">{children}</div>
    </div>
  )
}
