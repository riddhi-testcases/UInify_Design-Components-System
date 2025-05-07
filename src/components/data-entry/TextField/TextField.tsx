import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff, X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../foundation/Typography';

const inputVariants = cva(
  'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm transition-colors',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
      variant: {
        default: 'focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none',
        filled: 'bg-neutral-100 border-transparent focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none',
        outlined: 'bg-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none',
      },
      state: {
        default: '',
        error: 'border-error-500 focus:border-error-500 focus:ring-error-200',
        success: 'border-success-500 focus:border-success-500 focus:ring-success-200',
      },
      iconPosition: {
        left: 'pl-10',
        right: 'pr-10',
        both: 'pl-10 pr-10',
        none: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      state: 'default',
      iconPosition: 'none',
    },
  }
);

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  errorTextClassName?: string;
  iconContainerClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({
    className,
    containerClassName,
    labelClassName,
    helperTextClassName,
    errorTextClassName,
    iconContainerClassName,
    type = 'text',
    size,
    variant,
    state,
    label,
    helperText,
    errorText,
    leftIcon,
    rightIcon,
    clearable,
    disabled,
    required,
    value = '',
    onChange,
    iconPosition: iconPositionProp,
    ...props
  }, ref) => {
    const [localValue, setLocalValue] = useState(value.toString());
    const [showPassword, setShowPassword] = useState(false);

    // Determine actual input type based on password visibility
    const actualType = type === 'password' && showPassword ? 'text' : type;
    
    // Calculate icon position
    let iconPosition = iconPositionProp;
    if (!iconPosition) {
      if (leftIcon && (rightIcon || clearable || type === 'password')) {
        iconPosition = 'both';
      } else if (leftIcon) {
        iconPosition = 'left';
      } else if (rightIcon || clearable || type === 'password') {
        iconPosition = 'right';
      } else {
        iconPosition = 'none';
      }
    }

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      onChange?.(e);
    };

    // Handle clear button click
    const handleClear = () => {
      const emptyEvent = {
        target: { value: '', name: props.name },
      } as React.ChangeEvent<HTMLInputElement>;
      setLocalValue('');
      onChange?.(emptyEvent);
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Determine right icon based on conditions
    const renderRightIcon = () => {
      if (type === 'password') {
        return (
          <button
            type="button"
            tabIndex={-1}
            className="text-neutral-500 hover:text-neutral-700 focus:outline-none"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        );
      }
      
      if (clearable && localValue) {
        return (
          <button
            type="button"
            tabIndex={-1}
            className="text-neutral-500 hover:text-neutral-700 focus:outline-none"
            onClick={handleClear}
            aria-label="Clear input"
          >
            <X size={18} />
          </button>
        );
      }
      
      return rightIcon;
    };

    return (
      <div className={cn('w-full space-y-1.5', containerClassName)}>
        {label && (
          <Typography 
            variant="label" 
            as="label" 
            htmlFor={props.id} 
            className={cn(
              'mb-1 block',
              disabled && 'text-neutral-500',
              labelClassName
            )}
          >
            {label} {required && <span className="text-error-500">*</span>}
          </Typography>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className={cn('absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500', iconContainerClassName)}>
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={actualType}
            className={cn(
              inputVariants({ size, variant, state, iconPosition }),
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            disabled={disabled}
            value={localValue}
            onChange={handleChange}
            required={required}
            aria-invalid={state === 'error'}
            aria-describedby={
              props.id
                ? `${props.id}-helper ${props.id}-error`
                : undefined
            }
            {...props}
          />
          
          {(rightIcon || clearable || type === 'password') && (
            <div className={cn('absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500', iconContainerClassName)}>
              {renderRightIcon()}
            </div>
          )}
        </div>
        
        {helperText && !errorText && (
          <Typography
            variant="helper"
            id={props.id ? `${props.id}-helper` : undefined}
            className={cn('text-neutral-500', helperTextClassName)}
          >
            {helperText}
          </Typography>
        )}
        
        {errorText && (
          <Typography
            variant="helper"
            color="error"
            id={props.id ? `${props.id}-error` : undefined}
            className={cn('text-error-500', errorTextClassName)}
          >
            {errorText}
          </Typography>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;