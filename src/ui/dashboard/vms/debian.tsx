import DebianLogo from "@/public/debianlogo.png"
import VirtualMachine from "../virtual-machines"
import React from "react"
interface VirtualMachinesProps {
  isCreationAllowed: boolean
  setIsCreationAllowed: React.Dispatch<React.SetStateAction<boolean>>
}

const Debian = ({
  isCreationAllowed,
  setIsCreationAllowed,
}: VirtualMachinesProps) => {
  return (
    <VirtualMachine
      name="Debian"
      logo={DebianLogo}
      machine="debian"
      isCreationAllowed={isCreationAllowed}
      setIsCreationAllowed={setIsCreationAllowed}
    />
  )
}

export default Debian
