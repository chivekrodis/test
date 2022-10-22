import { FC } from 'react'

interface ButtonProps {
  handler: () => void
  label: string
}

export const Button: FC<ButtonProps> = ({ handler, label }) => {
  return (
    <button
      className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={handler}
    >
      {label}
    </button>
  )
}
