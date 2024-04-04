"use client"

import React, { useState } from "react"
import { Button } from "../button"
import Modal from "../modal"

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

  const handleCreateVM = () => {
    setIsCreating(true)
    setIsCreationAllowed(false)
    console.log(`Creating ${machine} VM`)

    setTimeout(() => {
      setIsCreating(false)
      setIsCreationAllowed(true)
      console.log(`${machine} VM created successfully`)
    }, 3000)
  }

  return (
    <>
      <Button
        onClick={handleCreateVM}
        className="mt-4"
        disabled={!isCreationAllowed}
      >
        Create
      </Button>
      {isCreating && <Modal>Creating {machine} VM...</Modal>}
    </>
  )
}

export default CreateVM
