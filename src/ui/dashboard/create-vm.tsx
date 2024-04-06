"use client"

import React, { useState } from "react"
import { Button } from "../button"
import Modal from "../modal"
import { launchCreateResources } from "@/lib/vms/create-vm"
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert(`Copied to clipboard: ${text}`))
      .catch((error) => setError(`Failed to copy: ${error}`))
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
            <div className="">
              <div className={`text-2xl`}>
                <p>✅ VM created successfully!</p>
              </div>
              <div className="mt-5 items-center">
                <div className="flex">
                  <div className="flex">
                    <p>SSH connection: </p>
                    <p className="text-bold">notadmin@{fqdn}</p>
                  </div>
                  <ClipboardDocumentIcon
                    onClick={() => copyToClipboard(`notadmin@${fqdn}`)}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
                <div className="flex">
                  <p>Password: Pa$$w0rd92</p>
                  <ClipboardDocumentIcon
                    onClick={() => copyToClipboard("Pa$$w0rd92")}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
                <p className="text-red-300">
                  Your machine will be deleted in 10 minutes
                </p>
              </div>
            </div>
          )}
          {error && <p>{error}</p>}
        </Modal>
      )}
    </>
  )
}

export default CreateVM
