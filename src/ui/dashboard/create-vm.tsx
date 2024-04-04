"use client"

import React, { useState } from "react"
import { Button } from "../button"
import Modal from "../modal"

interface CreateVMProps {
  machine: string
}

const CreateVM = ({ machine }: CreateVMProps) => {
  const [isCreating, setIsCreating] = useState(false)

  // Global state to disable other VM creations
  const [disableOtherVMs, setDisableOtherVMs] = useState(false)

  const handleCreateVM = async () => {
    setDisableOtherVMs(true) // Disable other VM creations immediately
    setIsCreating(true)
    console.log(`Creating ${machine} VM`)

    try {
      // Simulate VM creation process (replace with actual VM creation logic)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      console.log(`${machine} VM created successfully`)
    } catch (error) {
      console.error(`Error creating ${machine} VM:`, error)
    } finally {
      setIsCreating(false)
      setDisableOtherVMs(false) // Re-enable other VM creations after completion/error
    }
  }

  return (
    <>
      <Button
        onClick={handleCreateVM}
        disabled={disableOtherVMs}
        className="mt-4"
      >
        Create {machine} VM
      </Button>
      {isCreating && (
        <Modal>
          <div>Creating {machine} VM...</div>
        </Modal>
      )}
    </>
  )
}

export default CreateVM
