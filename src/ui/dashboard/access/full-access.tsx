import Windows from "../vms/windows"
import Debian from "../vms/debian"
import Ubuntu from "../vms/ubuntu"
import { lusitana } from "@/ui/fonts"

const FullAccess = () => {
  return (
    <div className="w-full bg-red-50 rounded-lg">
      <h1 className={`${lusitana.className} text-xl px-4 pt-4`}>
        You have access to three Virtual Machines!
      </h1>
      <div className="flex bg-red-50">
        <Windows />
        <Debian />
        <Ubuntu />
      </div>
    </div>
  )
}

export default FullAccess
