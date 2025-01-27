import { ReactNode } from "@tanstack/react-router"

export default function Description({children}: Readonly<{children: ReactNode}>) {
    return (
        <p className="text-gray-500 text-sm">{children}</p>
    )
}