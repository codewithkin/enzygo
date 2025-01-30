import React from 'react';
import { X } from 'lucide-react';

// Define the basic structure of a toast
export interface Toast {
  id: string;
  message: string;
}

// Props that the Toast component will receive
interface ToastProps {
    toast: Toast;
    onClose: (id: string) => void;
  }

export function Toast({ toast, onClose }: ToastProps) {
    // Auto-close the toast after 5 seconds
    React.useEffect(() => {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, 5000);
  
      // Cleanup the timer when the component unmounts
      return () => clearTimeout(timer);
    }, [toast.id, onClose]);
}