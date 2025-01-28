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
            className={`placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-purple-500 outline-0 ring-0 border border-gray-300 rounded-md pl-4 py-2 min-w-[300px] ${className}`} 
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