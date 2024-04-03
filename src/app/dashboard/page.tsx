import SideNav from "@/ui/dashboard/sidenav"
import { auth } from "../../../auth"

export default async function Page() {
  const session = await auth()

  return (
    <div className="flex w-screen h-screen">
      <h1>Hello, {session?.user.name}! </h1>
      {session?.user.role === "full-access" ? (
        <>
          <h1>Welcome to the dashboard!</h1>
          <SideNav />
        </>
      ) : session?.user.role === "partial-access" ? (
        <>
          <h1>You have partial access to the dashboard.</h1>
          <SideNav />
        </>
      ) : (
        <>
          <h1>You have no access to any virtual machines. Sorry...</h1>
          <SideNav />
        </>
      )}
    </div>
  )
}
