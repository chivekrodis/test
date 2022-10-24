import { FC } from 'react'

interface ButtonProps {
  handler: () => void
  label: string
}

export const Button: FC<ButtonProps> = ({ handler, label }) => {
  return (
    <button
      className="rounded-md border-2 border-transparent bg-pink-500 py-2 px-4 text-sm font-medium text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      onClick={handler}
    >
      {label}
    </button>
  )
}
