import Image, { StaticImageData } from "next/image"
import CreateVM from "./create-vm"
import React from "react"
import { lusitana } from "../fonts"

interface VirtualMachinesProps {
  name: string
  logo: StaticImageData
  machine: string
  isCreationAllowed: boolean
  setIsCreationAllowed: React.Dispatch<React.SetStateAction<boolean>>
}

const VirtualMachines = ({
  name,
  logo,
  machine,
  isCreationAllowed,
  setIsCreationAllowed,
}: VirtualMachinesProps) => {
  return (
    <div className="bg-gray-100 m-4 p-4 rounded-lg w-1/3 text-center">
      <h1 className={`${lusitana.className} text-3xl mb-4`}>{name}</h1>
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <Image
            className="object-contain h-[200px] w-[200px]"
            src={logo}
            alt={name}
          />
        </div>
        <CreateVM
          machine={machine}
          isCreationAllowed={isCreationAllowed}
          setIsCreationAllowed={setIsCreationAllowed}
        />
      </div>
    </div>
  )
}

export default VirtualMachines
