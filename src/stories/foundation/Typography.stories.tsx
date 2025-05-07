import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../../components/foundation/Typography';

const meta = {
  title: 'Foundation/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Typography System

A comprehensive typography system that provides consistent text styling across your application while maintaining accessibility and responsive behavior.

## Component Anatomy

The Typography component is built with:
- Semantic HTML elements (h1-h6, p, span, label)
- Tailwind CSS classes for styling
- CSS variables for theming
- Responsive modifiers

## Props API

| Prop | Type | Description |
|------|------|-------------|
| variant | 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body1' \| 'body2' \| 'caption' \| 'overline' \| 'label' \| 'helper' | Determines the base styling and semantic element |
| weight | 'light' \| 'regular' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' | Controls font weight |
| align | 'left' \| 'center' \| 'right' \| 'justify' | Text alignment |
| color | 'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'muted' | Text color with dark mode support |
| transform | 'uppercase' \| 'lowercase' \| 'capitalize' \| 'normal' | Text transformation |
| truncate | boolean | Enable text truncation |
| as | keyof JSX.IntrinsicElements | Override the HTML element |

## Accessibility

### ARIA Attributes
- Proper heading hierarchy (h1-h6)
- Semantic HTML elements
- aria-label support
- aria-describedby support

### Focus Management
- Keyboard navigation support
- Focus visible indicators
- Tab order preservation

### Color Contrast
- WCAG 2.1 AA compliant color contrast ratios
- Dark mode support with appropriate contrast
- Color combinations tested for accessibility

## Theming Support

### Brand Tokens
- Primary colors
- Secondary colors
- Accent colors
- Semantic colors (success, warning, error)
- Neutral colors

### Dark Mode
- Automatic dark mode detection
- Manual dark mode toggle support
- Preserved contrast ratios
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Fluid typography scaling
- Breakpoint-based adjustments
- Consistent spacing

## Best Practices

### Do's
✅ Use semantic HTML elements
✅ Maintain heading hierarchy
✅ Use appropriate color contrast
✅ Implement responsive typography
✅ Follow accessibility guidelines
✅ Use brand colors consistently
✅ Test with screen readers
✅ Support keyboard navigation

### Don'ts
❌ Skip heading levels
❌ Use color as sole indicator
❌ Override default line heights
❌ Ignore color contrast
❌ Use non-semantic elements
❌ Hardcode font sizes
❌ Neglect dark mode
❌ Forget about mobile users

## Use Cases

1. **Content Headers**
   - Page titles
   - Section headings
   - Modal titles
   - Card headers

2. **Body Content**
   - Paragraphs
   - Lists
   - Descriptions
   - Article text

3. **UI Elements**
   - Form labels
   - Button text
   - Navigation items
   - Helper text

4. **Metadata**
   - Timestamps
   - Categories
   - Tags
   - Captions

## States & Variants

### Heading Variants
- h1: Large titles
- h2: Section headers
- h3: Subsection headers
- h4-h6: Smaller subdivisions

### Text Variants
- body1: Main content
- body2: Supporting text
- caption: Small print
- overline: Category labels
- label: Form labels
- helper: Assistance text

### Interactive States
- Hover effects
- Focus states
- Active states
- Disabled states

## Interaction Behavior

### Responsive Text
- Fluid scaling
- Breakpoint adjustments
- Container queries
- Minimum/maximum sizes

### Animation
- Color transitions
- Size adjustments
- Opacity changes
- Transform effects

### User Interaction
- Selection behavior
- Copy/paste support
- Screen reader compatibility
- Keyboard navigation
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'overline', 'label', 'helper'],
      description: 'Typography variant that determines the base styling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body1' },
      },
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold'],
      description: 'Font weight to apply',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'muted'],
      description: 'Text color with dark mode support',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    transform: {
      control: 'select',
      options: ['uppercase', 'lowercase', 'capitalize', 'normal'],
      description: 'Text transformation to apply',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'normal' },
      },
    },
    truncate: {
      control: 'boolean',
      description: 'Whether to truncate text with ellipsis',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    as: {
      control: 'text',
      description: 'Override the HTML element',
      table: {
        type: { summary: 'keyof JSX.IntrinsicElements' },
      },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-3xl">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-3xl">
      <Typography variant="body1">
        Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <Typography variant="body2">
        Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
    </div>
  ),
};

export const UtilityText: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
      <Typography variant="caption">Caption text for additional context</Typography>
      <Typography variant="overline">Overline text for categories</Typography>
      <Typography variant="label">Form field label</Typography>
      <Typography variant="helper">Helper text for form fields</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
      <Typography color="default">Default color with dark mode support</Typography>
      <Typography color="primary">Primary brand color</Typography>
      <Typography color="secondary">Secondary brand color</Typography>
      <Typography color="accent">Accent color for emphasis</Typography>
      <Typography color="success">Success messages</Typography>
      <Typography color="warning">Warning messages</Typography>
      <Typography color="error">Error messages</Typography>
      <Typography color="muted">Muted text for less emphasis</Typography>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-2 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
      <Typography weight="light">Light weight (300)</Typography>
      <Typography weight="regular">Regular weight (400)</Typography>
      <Typography weight="medium">Medium weight (500)</Typography>
      <Typography weight="semibold">Semibold weight (600)</Typography>
      <Typography weight="bold">Bold weight (700)</Typography>
      <Typography weight="extrabold">Extra bold weight (800)</Typography>
    </div>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
      <Typography align="left">Left-aligned text (default)</Typography>
      <Typography align="center">Center-aligned text</Typography>
      <Typography align="right">Right-aligned text</Typography>
      <Typography align="justify">
        Justified text that spans multiple lines. This text demonstrates how justified alignment 
        works with longer content blocks, creating even margins on both sides.
      </Typography>
    </div>
  ),
};

export const TextTransformations: Story = {
  render: () => (
    <div className="space-y-2 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
      <Typography transform="uppercase">uppercase text</Typography>
      <Typography transform="lowercase">LOWERCASE TEXT</Typography>
      <Typography transform="capitalize">capitalize each word</Typography>
      <Typography transform="normal">Normal case text</Typography>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div className="max-w-xs p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
      <Typography truncate>
        This is a very long text that will be truncated with an ellipsis when it reaches 
        the end of its container because we've enabled the truncate property.
      </Typography>
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
      <Typography variant="h1">
        Responsive Heading
      </Typography>
      <Typography variant="body1">
        This text and the heading above will adjust their size based on the viewport width. 
        Try resizing your browser window to see how they respond.
      </Typography>
    </div>
  ),
};

export const SemanticOverride: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
      <Typography variant="h1" as="div">
        Heading styled text in a div
      </Typography>
      <Typography variant="body1" as="span">
        Body text in a span element
      </Typography>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-neutral-800 rounded-lg shadow-lg">
      <Typography variant="h2" color="default">Dark Mode Typography</Typography>
      <Typography variant="body1" color="default">
        Text automatically adjusts for dark mode with appropriate contrast ratios and color adjustments.
      </Typography>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Typography variant="h6" color="primary">Primary Text</Typography>
          <Typography variant="body2" color="primary">With dark mode colors</Typography>
        </div>
        <div>
          <Typography variant="h6" color="secondary">Secondary Text</Typography>
          <Typography variant="body2" color="secondary">With dark mode colors</Typography>
        </div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'body1',
    children: 'Customize this text using the controls below',
    color: 'default',
    weight: 'regular',
    align: 'left',
    transform: 'normal',
    truncate: false,
  },
};