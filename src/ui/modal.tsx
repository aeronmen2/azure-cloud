import React from "react"

interface ModalProps {
  children: React.ReactNode
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div className="z-10 absolute inset-0 flex items-center justify-center">
      <div className="bg-gray-50 p-6 rounded-lg w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Virtual Machine creation progress...
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
