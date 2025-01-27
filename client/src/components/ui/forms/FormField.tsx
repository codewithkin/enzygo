interface FormFieldProps {
    children: React.ReactNode,
    className?: string
}

export default function FormField ({children, className}: FormFieldProps) {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}