import WindowsLogo from "@/public/windowslogo.png"
import VirtualMachines from "../virtual-machines"
import React from "react"

interface VirtualMachinesProps {
  isCreationAllowed: boolean
  setIsCreationAllowed: React.Dispatch<React.SetStateAction<boolean>>
}

const Windows = ({
  isCreationAllowed,
  setIsCreationAllowed,
}: VirtualMachinesProps) => {
  return (
    <VirtualMachines
      name="Windows"
      logo={WindowsLogo}
      machine="Windows"
      isCreationAllowed={isCreationAllowed}
      setIsCreationAllowed={setIsCreationAllowed}
    />
  )
}

export default Windows
