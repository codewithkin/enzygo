interface LabelProps {
    htmlFor: string,
    className?: string,
    children?: React.ReactNode
}

export default function Label ({ htmlFor, children, className }: LabelProps) {
    return (
        <label className={`${className}`} htmlFor={htmlFor}>{children}</label>
    )
}