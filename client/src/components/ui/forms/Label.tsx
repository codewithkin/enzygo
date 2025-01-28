interface LabelProps {
    htmlFor: string,
    className?: string,
    children?: React.ReactNode
}

export default function Label ({ htmlFor, children, className }: LabelProps) {
    return (
        <label className={`text-sm font-medium font-inter ${className}`} htmlFor={htmlFor}>{children}</label>
    )
}