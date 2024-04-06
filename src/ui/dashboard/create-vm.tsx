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
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fqdn, setFqdn] = useState<string | null>(null)

  const handleCreateVM = async ({ machine }: { machine: string }) => {
    setIsCreating(true)
    setShowModal(true)
    setIsCreationAllowed(false)

    try {
      const result = await launchCreateResources(machine)
      const fqdn = result || null
      setFqdn(fqdn)
      setIsCreating(false)
    } catch (error: unknown) {
      setError(error as string | null)
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

      {showModal && (
        <Modal>
          {isCreating && (
            <div className="flex items-center m-2">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] ">
                  Loading...
                </span>
              </div>
              <p className="ml-2">Creating {machine} VM...</p>
            </div>
          )}
          {fqdn && (
            <div>
              <p>SSH connection: notadmin@{fqdn}</p>
              <p>Password: Pa$$w0rd92</p>
            </div>
          )}
          {error && <p>{error}</p>}
        </Modal>
      )}
    </>
  )
}

export default CreateVM
