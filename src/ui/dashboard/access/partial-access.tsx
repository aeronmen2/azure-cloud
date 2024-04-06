"use client"

import React, { useState } from "react"
import Windows from "../vms/windows"

const PartialAccess = () => {
  const [isCreationAllowed, setIsCreationAllowed] = useState(true)

  return (
    <div className="w-full bg-gray-50 rounded-lg">
      <h1 className={`text-xl px-4 pt-4`}>
        You have access to one Virtual Machine!
      </h1>
      <div className="flex bg-gray-50">
        <Windows
          isCreationAllowed={isCreationAllowed}
          setIsCreationAllowed={setIsCreationAllowed}
        />
      </div>
    </div>
  )
}

export default PartialAccess
