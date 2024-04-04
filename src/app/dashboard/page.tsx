import { auth } from "../../../auth"
import VmsAccess from "@/ui/dashboard/vms"

export default async function Page() {
  const session = await auth()

  return (
    <div className="flex w-full h-full">
      <VmsAccess role={session?.user.role} />
    </div>
  )
}
