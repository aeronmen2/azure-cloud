"use client"

import React, { useState } from "react"
import { Button } from "../button"
import Modal from "../modal"
import { launchCreateResources } from "@/lib/vms/create-vm"

interface CreateVMProps {
  machine: string
  isCreationAllowed: boolean
  setIsCreationAllowed: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateVM = ({
  machine,
  isCreationAllowed,
  setIsCreationAllowed,
}: CreateVMProps) => {
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateVM = async ({ machine }: { machine: string }) => {
    setIsCreating(true)
    setIsCreationAllowed(false)

    try {
      await launchCreateResources(machine)
      setIsCreating(false)
    } catch (error) {
      console.error("Failed to create VM:", error)
    } finally {
      setIsCreationAllowed(true)
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          handleCreateVM({ machine })
        }}
        className="mt-4"
        disabled={!isCreationAllowed || isCreating}
      >
        Create
      </Button>
      {isCreating && <Modal>Creating {machine} VM...</Modal>}
    </>
  )
}

export default CreateVM
