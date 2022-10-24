import { FC } from 'react'

interface LayoutProps {
  children: JSX.Element
}
export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="max-w-xl max-md:p-2 md:mx-auto">{children}</div>
}
