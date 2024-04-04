"use client"

import React, { useState } from "react"
import { lusitana } from "@/ui/fonts"
import Windows from "../vms/windows"
import Debian from "../vms/debian"
import Ubuntu from "../vms/ubuntu"

const FullAccess = () => {
  const [isCreationAllowed, setIsCreationAllowed] = useState(true)

  return (
    <div className="w-full bg-gray-50 rounded-lg">
      <h1 className={`${lusitana.className} text-3xl px-4 pt-4`}>
        You have access to three Virtual Machines!
      </h1>
      <div className="flex bg-gray-50">
        <Windows
          isCreationAllowed={isCreationAllowed}
          setIsCreationAllowed={setIsCreationAllowed}
        />
        <Debian
          isCreationAllowed={isCreationAllowed}
          setIsCreationAllowed={setIsCreationAllowed}
        />
        <Ubuntu
          isCreationAllowed={isCreationAllowed}
          setIsCreationAllowed={setIsCreationAllowed}
        />
      </div>
    </div>
  )
}

export default FullAccess
