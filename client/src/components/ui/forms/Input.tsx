interface InputProps {
    className?: string,
    name: string,
    id?: string,
    type?: string,
    placeholder: string,
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
    disabled?: boolean
}

export default function Input ({className, name, id, type = "text", placeholder, value, onChange, onBlur, disabled}: InputProps) {
    return (
        <input 
            className={`${className}`} 
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
        />
    )
}