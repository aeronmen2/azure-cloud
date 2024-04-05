import UbuntuLogo from "@/public/ubuntulogo.png"
import VirtualMachine from "../virtual-machines"
import React from "react"

interface VirtualMachinesProps {
  isCreationAllowed: boolean
  setIsCreationAllowed: React.Dispatch<React.SetStateAction<boolean>>
}

const Ubuntu = ({
  isCreationAllowed,
  setIsCreationAllowed,
}: VirtualMachinesProps) => {
  return (
    <VirtualMachine
      name="Ubuntu"
      logo={UbuntuLogo}
      machine="Ubuntu"
      isCreationAllowed={isCreationAllowed}
      setIsCreationAllowed={setIsCreationAllowed}
    />
  )
}

export default Ubuntu
