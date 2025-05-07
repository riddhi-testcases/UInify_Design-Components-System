import React, { createContext, useState, useRef, useContext, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import Toast, { ToastProps } from './Toast';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions extends Omit<ToastProps, 'id' | 'onClose'> {
  id?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  info: (content: React.ReactNode, options?: Omit<ToastOptions, 'content' | 'type'>) => string;
  success: (content: React.ReactNode, options?: Omit<ToastOptions, 'content' | 'type'>) => string;
  warning: (content: React.ReactNode, options?: Omit<ToastOptions, 'content' | 'type'>) => string;
  error: (content: React.ReactNode, options?: Omit<ToastOptions, 'content' | 'type'>) => string;
  update: (id: string, options: ToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export interface ToastItem extends ToastProps {
  id: string;
  timeout?: NodeJS.Timeout;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
}

const placementClasses = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  placement = 'top-right',
  maxToasts = 5
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastCounter = useRef(0);
  
  // Create a new toast
  const toast = useCallback((options: ToastOptions): string => {
    const id = options.id || `toast-${toastCounter.current++}`;
    const duration = options.duration ?? 5000;
    
    // Add new toast to the list
    setToasts(prev => {
      // If we already have a toast with this ID, update it instead
      const existingIndex = prev.findIndex(t => t.id === id);
      if (existingIndex !== -1) {
        const updatedToasts = [...prev];
        updatedToasts[existingIndex] = { ...updatedToasts[existingIndex], ...options, id };
        return updatedToasts;
      }
      
      // Otherwise add a new toast, limiting to maxToasts
      let newToasts = [...prev, { ...options, id }];
      if (newToasts.length > maxToasts) {
        newToasts = newToasts.slice(-maxToasts);
      }
      return newToasts;
    });
    
    // Set timeout to automatically remove toast
    if (duration > 0) {
      const timeout = setTimeout(() => {
        dismiss(id);
      }, duration);
      
      // Store timeout reference
      setToasts(prev => 
        prev.map(t => t.id === id ? { ...t, timeout } : t)
      );
    }
    
    return id;
  }, [maxToasts]);
  
  // Helper methods for specific toast types
  const info = useCallback((content: React.ReactNode, options: Omit<ToastOptions, 'content' | 'type'> = {}) => {
    return toast({ ...options, content, type: 'info' });
  }, [toast]);
  
  const success = useCallback((content: React.ReactNode, options: Omit<ToastOptions, 'content' | 'type'> = {}) => {
    return toast({ ...options, content, type: 'success' });
  }, [toast]);
  
  const warning = useCallback((content: React.ReactNode, options: Omit<ToastOptions, 'content' | 'type'> = {}) => {
    return toast({ ...options, content, type: 'warning' });
  }, [toast]);
  
  const error = useCallback((content: React.ReactNode, options: Omit<ToastOptions, 'content' | 'type'> = {}) => {
    return toast({ ...options, content, type: 'error' });
  }, [toast]);
  
  // Update an existing toast
  const update = useCallback((id: string, options: ToastOptions) => {
    setToasts(prev => {
      const index = prev.findIndex(t => t.id === id);
      if (index === -1) return prev;
      
      const updatedToasts = [...prev];
      updatedToasts[index] = { ...updatedToasts[index], ...options, id };
      return updatedToasts;
    });
  }, []);
  
  // Dismiss a single toast
  const dismiss = useCallback((id: string) => {
    setToasts(prev => {
      const toast = prev.find(t => t.id === id);
      
      // Clear timeout if it exists
      if (toast?.timeout) {
        clearTimeout(toast.timeout);
      }
      
      return prev.filter(t => t.id !== id);
    });
  }, []);
  
  // Dismiss all toasts
  const dismissAll = useCallback(() => {
    setToasts(prev => {
      // Clear all timeouts
      prev.forEach(toast => {
        if (toast.timeout) {
          clearTimeout(toast.timeout);
        }
      });
      
      return [];
    });
  }, []);
  
  // Context value
  const value = {
    toast,
    info,
    success,
    warning,
    error,
    update,
    dismiss,
    dismissAll
  };
  
  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof window !== 'undefined' && createPortal(
        <div
          aria-live="polite"
          aria-atomic="true"
          className={cn(
            'fixed z-50 p-4 flex flex-col gap-2 w-full sm:max-w-sm',
            placementClasses[placement],
            (placement === 'top-right' || placement === 'top-left' || placement === 'top-center') 
              ? 'items-start' 
              : 'items-end flex-col-reverse'
          )}
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => dismiss(toast.id)}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};