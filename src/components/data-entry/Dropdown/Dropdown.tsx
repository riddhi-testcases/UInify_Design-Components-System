import React, { forwardRef, useState, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../foundation/Typography';

const dropdownVariants = cva(
  'w-full rounded-md border border-neutral-300 bg-white px-3 text-neutral-900 shadow-sm transition-colors flex items-center justify-between',
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
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      state: 'default',
    },
  }
);

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange' | 'size'>,
    VariantProps<typeof dropdownVariants> {
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  label?: string;
  helperText?: string;
  errorText?: string;
  placeholder?: string;
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  maxHeight?: number;
  containerClassName?: string;
  optionsContainerClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  errorTextClassName?: string;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  ({
    className,
    containerClassName,
    optionsContainerClassName,
    optionClassName,
    labelClassName,
    helperTextClassName,
    errorTextClassName,
    size,
    variant,
    state,
    options,
    value = '',
    onChange,
    label,
    helperText,
    errorText,
    placeholder = 'Select...',
    clearable = false,
    searchable = false,
    multiple = false,
    maxHeight = 250,
    disabled,
    required,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const id = useId();
    
    // Convert value to array for consistent handling
    const values = multiple 
      ? Array.isArray(value) ? value : value ? [value] : []
      : Array.isArray(value) ? [value[0] || ''] : [value];
      
    // Filter options based on search
    const filteredOptions = searchable && searchValue
      ? options.filter(option => 
          option.label.toLowerCase().includes(searchValue.toLowerCase()))
      : options;
      
    // Get selected option labels for display
    const getDisplayValue = () => {
      if (values.length === 0) return placeholder;
      
      const selectedOptions = options.filter(option => values.includes(option.value));
      return selectedOptions.map(option => option.label).join(', ');
    };
    
    // Handle option selection
    const handleSelect = (option: DropdownOption) => {
      if (option.disabled) return;
      
      if (multiple) {
        const newValues = values.includes(option.value)
          ? values.filter(v => v !== option.value)
          : [...values, option.value];
          
        onChange?.(newValues);
      } else {
        onChange?.(option.value);
        setIsOpen(false);
      }
    };
    
    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(multiple ? [] : '');
    };
    
    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          if (!isOpen) setIsOpen(true);
          break;
      }
    };
    
    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest(`#${id}-dropdown`)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [id]);

    return (
      <div className={cn('w-full space-y-1.5 relative', containerClassName)} id={`${id}-dropdown`}>
        {label && (
          <Typography 
            variant="label" 
            as="label" 
            htmlFor={`${id}-button`}
            className={cn(
              'mb-1 block',
              disabled && 'text-neutral-500',
              labelClassName
            )}
          >
            {label} {required && <span className="text-error-500">*</span>}
          </Typography>
        )}
        
        <button
          id={`${id}-button`}
          ref={ref}
          type="button"
          className={cn(
            dropdownVariants({ size, variant, state }),
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-invalid={state === 'error'}
          aria-describedby={
            `${id}-helper ${id}-error`
          }
          {...props}
        >
          <span className="flex-grow text-left truncate">
            {getDisplayValue()}
          </span>
          <div className="flex items-center">
            {(clearable && values.length > 0) && (
              <button
                type="button"
                className="mr-1 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                onClick={handleClear}
                aria-label="Clear selection"
                tabIndex={-1}
              >
                <X size={16} />
              </button>
            )}
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>
        
        {isOpen && (
          <div 
            className={cn(
              'absolute z-10 mt-1 w-full rounded-md border border-neutral-200 bg-white shadow-lg py-1',
              optionsContainerClassName
            )}
            style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto' }}
            role="listbox"
            aria-multiselectable={multiple}
            aria-labelledby={label ? `${id}-label` : undefined}
          >
            {searchable && (
              <div className="px-2 py-1 sticky top-0 bg-white border-b border-neutral-100">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:border-primary-500"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
            )}
            
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-neutral-500">No options found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = values.includes(option.value);
                return (
                  <div
                    key={option.value}
                    className={cn(
                      'px-3 py-2 text-sm cursor-pointer flex items-center',
                      isSelected ? 'bg-primary-50 text-primary-700' : 'hover:bg-neutral-50',
                      option.disabled && 'opacity-50 cursor-not-allowed',
                      optionClassName
                    )}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                  >
                    {multiple && (
                      <span className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                        isSelected 
                          ? 'border-primary-500 bg-primary-500 text-white' 
                          : 'border-neutral-300'
                      )}>
                        {isSelected && <Check size={12} />}
                      </span>
                    )}
                    <span className="flex-grow">{option.label}</span>
                    {!multiple && isSelected && (
                      <Check size={16} className="ml-2 text-primary-500" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
        
        {helperText && !errorText && (
          <Typography
            variant="helper"
            id={`${id}-helper`}
            className={cn('text-neutral-500', helperTextClassName)}
          >
            {helperText}
          </Typography>
        )}
        
        {errorText && (
          <Typography
            variant="helper"
            color="error"
            id={`${id}-error`}
            className={cn('text-error-500', errorTextClassName)}
          >
            {errorText}
          </Typography>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;