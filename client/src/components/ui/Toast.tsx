import { AlertTriangle } from "lucide-react";

interface ToastProps {
    type?: "message-sent" | "message-received" | "error" | "success",
    message?: string,
    duration?: number,
    user?: string
}

export default function Toast ({type, message, duration = 5000, user}: ToastProps) {
    if(message) {
        switch (type) {
            case "error":
                return (
                    <section className="cover-all">
                        {/* Toast */}
                        <article className="rounded-md bg-red-500 shadow-md transition duration-300 ease-in-out flex gap-1 items-center px-4 py-2">
                            {/* Error icon */}
                            <AlertTriangle size={20} color="white" />

                            {/* Toast message */}
                            <span className="text-sm font-inter text-white">
                                {message}
                            </span>
                        </article>
                    </section>
                )

                break;
            
            default:
                <section className="cover-all">
                    {/* Info icon */}
                    <article className="rounded-md bg-white shadow-md transition duration-300 ease-in-out flex gap-4 items-center px-4 py-2 bg-white">
                        {/* Info icon */}
                        <AlertTriangle size={30} />

                        {/* Toast */}
                        <span className="text-md font-inter text-gray-200">
                            {message}
                        </span>
                    </article>
                </section>
            }
        }
}