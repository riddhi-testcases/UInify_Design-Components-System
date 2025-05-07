import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../foundation/Typography';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
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
        solid: 'border-transparent [&>svg]:text-white',
      },
      size: {
        sm: 'p-3 text-sm',
        default: 'p-4',
        lg: 'p-6',
      },
    },
    compoundVariants: [
      {
        type: 'info',
        variant: 'solid',
        class: 'bg-primary-600 text-white',
      },
      {
        type: 'success',
        variant: 'solid',
        class: 'bg-success-600 text-white',
      },
      {
        type: 'warning',
        variant: 'solid',
        class: 'bg-warning-600 text-white',
      },
      {
        type: 'error',
        variant: 'solid',
        class: 'bg-error-600 text-white',
      },
    ],
    defaultVariants: {
      type: 'info',
      variant: 'default',
      size: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const defaultIcons = {
  info: <Info className="size-4 text-primary-600" />,
  success: <CheckCircle2 className="size-4 text-success-600" />,
  warning: <AlertCircle className="size-4 text-warning-600" />,
  error: <XCircle className="size-4 text-error-600" />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    className,
    children,
    type = 'info',
    variant,
    size,
    title,
    description,
    icon,
    action,
    closable = false,
    onClose,
    ...props
  }, ref) => {
    // Get default icon based on type
    const alertIcon = icon ?? defaultIcons[type];
    
    // Override icon color if solid variant
    const iconWithClass = variant === 'solid' && React.isValidElement(alertIcon)
      ? React.cloneElement(alertIcon as React.ReactElement, {
          className: cn(
            (alertIcon as React.ReactElement).props.className,
            'text-white'
          ),
        })
      : alertIcon;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ type, variant, size }),
          className
        )}
        {...props}
      >
        {iconWithClass}
        
        <div className="flex flex-col gap-1">
          {title && (
            <Typography
              as="h5"
              variant="h5"
              className={cn('font-medium', iconWithClass && 'pl-7')}
            >
              {title}
            </Typography>
          )}
          
          {description && (
            <Typography
              variant="body2"
              className={cn(iconWithClass && !title && 'pl-7')}
            >
              {description}
            </Typography>
          )}
          
          {children}
          
          {action && (
            <div className={cn('mt-2 flex items-center', iconWithClass && 'pl-7')}>
              {action}
            </div>
          )}
        </div>
        
        {closable && (
          <button
            type="button"
            className={cn(
              'absolute right-4 top-4 rounded hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2',
              variant === 'solid'
                ? 'hover:bg-white focus:ring-white'
                : type === 'info'
                ? 'hover:bg-primary-500 focus:ring-primary-500'
                : type === 'success'
                ? 'hover:bg-success-500 focus:ring-success-500'
                : type === 'warning'
                ? 'hover:bg-warning-500 focus:ring-warning-500'
                : 'hover:bg-error-500 focus:ring-error-500'
            )}
            onClick={onClose}
            aria-label="Close"
          >
            <X className={cn('h-4 w-4', variant === 'solid' ? 'text-white' : '')} />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;