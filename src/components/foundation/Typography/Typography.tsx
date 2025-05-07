import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight lg:text-lg',
      body1: 'text-base leading-7 [&:not(:first-child)]:mt-6',
      body2: 'text-sm leading-6 [&:not(:first-child)]:mt-4',
      caption: 'text-sm text-neutral-500 dark:text-neutral-400',
      overline: 'text-xs uppercase tracking-wider font-medium',
      label: 'text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      helper: 'text-xs text-neutral-500 dark:text-neutral-400',
    },
    weight: {
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    color: {
      default: 'text-neutral-900 dark:text-neutral-50',
      primary: 'text-primary-700 dark:text-primary-300',
      secondary: 'text-secondary-700 dark:text-secondary-300',
      accent: 'text-accent-700 dark:text-accent-300',
      success: 'text-success-700 dark:text-success-300',
      warning: 'text-warning-700 dark:text-warning-300',
      error: 'text-error-700 dark:text-error-300',
      muted: 'text-neutral-500 dark:text-neutral-400',
    },
    transform: {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
      normal: 'normal-case',
    },
  },
  defaultVariants: {
    variant: 'body1',
    color: 'default',
    align: 'left',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements;
  truncate?: boolean;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ 
    as,
    variant, 
    weight, 
    align, 
    color, 
    transform, 
    truncate,
    className, 
    children,
    ...props 
  }, ref) => {
    // Determine the element type based on variant and provided override
    const Component = as || ((): keyof JSX.IntrinsicElements => {
      switch (variant) {
        case 'h1':
          return 'h1';
        case 'h2':
          return 'h2';
        case 'h3':
          return 'h3';
        case 'h4':
          return 'h4';
        case 'h5':
          return 'h5';
        case 'h6':
          return 'h6';
        case 'caption':
        case 'overline':
          return 'span';
        case 'label':
          return 'label';
        default:
          return 'p';
      }
    })();

    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          typographyVariants({ variant, weight, align, color, transform }),
          truncate && 'truncate',
          className
        ),
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';