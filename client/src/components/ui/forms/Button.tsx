import { Loader2 } from "lucide-react"

interface ButtonProps {
    loading?: boolean,
    loadingText: string,
    children: string,
    className?: string,
    type?: "button" | "submit" | "reset"
}

export default function Button ({loading, loadingText, children, className, type="submit"}: ButtonProps) {
    return loading ? (
        <button type={type} className={`w-full rounded-md font-roboto font-medium text-md bg-purple-600 px-4 py-2 text-white flex gap-2 items-center justify-center ${className}`}>
            <Loader2 
                className="animate-spin" 
                size={20}
            />
            
            <span>{loadingText}</span>
        </button>         
    ) :
    (
        <button type={type} className={`w-full rounded-md font-roboto font-medium text-md bg-purple-600 px-4 py-2 text-white ${className}`}>{children}</button>
    )
}