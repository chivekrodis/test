import { FC } from "react"

interface LayoutProps {
    children: JSX.Element
}
export const Layout: FC<LayoutProps> = ({ children }) => {
    return <div className="mx-auto max-w-4xl p-2">{children}</div>
}