import clsx from "clsx"
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  disabled?: boolean
}

export function Button({
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors",
        {
          "bg-blue-500 text-white hover:bg-blue-400": !disabled,
          "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50": disabled,
        },
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
