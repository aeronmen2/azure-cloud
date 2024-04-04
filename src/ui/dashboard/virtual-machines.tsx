import Image, { StaticImageData } from "next/image"
import CreateVM from "./create-vm"

interface VirtualMachinesProps {
  name: string
  logo: StaticImageData
  machine: string
}

const VirtualMachines = ({ name, logo, machine }: VirtualMachinesProps) => {
  return (
    <div className="bg-slate-200 m-4 p-4 rounded-lg">
      <div className="flex justify-center items-center">
        <Image
          className="object-contain h-[150px] w-[150px]"
          src={logo}
          alt={name}
        />
      </div>
      <CreateVM machine={machine} /> {/* Pass isCreating */}
    </div>
  )
}

export default VirtualMachines
