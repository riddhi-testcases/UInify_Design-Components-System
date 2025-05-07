import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

const toastVariants = cva(
  'w-full sm:max-w-sm rounded-lg shadow-md p-4 flex items-start gap-3 border transform transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-right',
  {
    variants: {
      type: {
        info: 'bg-primary-50 border-primary-200 text-primary-900',
        success: 'bg-success-50 border-success-200 text-success-900',
        warning: 'bg-warning-50 border-warning-200 text-warning-900',
        error: 'bg-error-50 border-error-200 text-error-900',
      },
      variant: {
        default: '',
        outline: 'bg-white',
      },
      size: {
        default: '',
        sm: 'text-sm p-3',
        lg: 'text-base p-4',
      },
    },
    defaultVariants: {
      type: 'info',
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id?: string;
  title?: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  duration?: number;
  progress?: boolean;
}

const defaultIcons = {
  info: <Info className="text-primary-600" />,
  success: <CheckCircle2 className="text-success-600" />,
  warning: <AlertCircle className="text-warning-600" />,
  error: <XCircle className="text-error-600" />,
};

const Toast: React.FC<ToastProps> = ({
  type = 'info',
  variant,
  size,
  title,
  content,
  icon,
  action,
  closable = true,
  onClose,
  className,
  duration = 5000,
  progress = true,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-close timer
  useEffect(() => {
    if (duration <= 0 || isPaused) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 100;
        return newTime <= 0 ? 0 : newTime;
      });
    }, 100);
    
    if (timeLeft === 0 && onClose) {
      onClose();
    }
    
    return () => clearInterval(interval);
  }, [duration, timeLeft, onClose, isPaused]);
  
  // Handle mouse enter/leave for pausing
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  
  // Get default icon based on type
  const toastIcon = icon ?? defaultIcons[type];
  
  // Calculate progress percentage
  const progressPercentage = (timeLeft / duration) * 100;

  return (
    <div
      role="alert"
      className={cn(toastVariants({ type, variant, size }), className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-labelledby={title ? 'toast-title' : undefined}
      aria-describedby="toast-description"
    >
      {toastIcon && <div className="flex-shrink-0 pt-0.5">{toastIcon}</div>}
      
      <div className="flex-1 min-w-0">
        {title && (
          <div id="toast-title" className="font-medium mb-1">{title}</div>
        )}
        <div id="toast-description" className="text-sm">{content}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
      
      {closable && (
        <button
          type="button"
          className={cn(
            'flex-shrink-0 rounded-full p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
            type === 'info' && 'focus:ring-primary-500',
            type === 'success' && 'focus:ring-success-500',
            type === 'warning' && 'focus:ring-warning-500',
            type === 'error' && 'focus:ring-error-500'
          )}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      )}
      
      {progress && duration > 0 && (
        <div 
          className="absolute bottom-0 left-0 h-1 bg-opacity-20 transition-all"
          style={{ 
            width: `${progressPercentage}%`,
            backgroundColor: type === 'info' ? 'var(--primary-600)' :
                            type === 'success' ? 'var(--success-600)' :
                            type === 'warning' ? 'var(--warning-600)' :
                            'var(--error-600)',
          }}
        />
      )}
    </div>
  );
};

export default Toast;