import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../../components/data-entry/TextField';
import { Mail, Lock, Search, User } from 'lucide-react';

const meta = {
  title: 'Data Entry/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Text Field

The TextField component provides a customizable input for collecting user text input.

## Features
- Different variants: default, filled, and outlined
- Various states: default, error, success
- Input types support: text, password, email, etc.
- Left and right icons
- Helper and error text
- Clearable input
- Password visibility toggle
- Responsive design

## Accessibility
- Properly associated labels via htmlFor
- Error states with aria-invalid
- Helper/error text connected with aria-describedby
- Clearly visible focus states
- Proper color contrast

## Usage Guidelines
- Always provide a label for inputs
- Use helper text to provide context or instructions
- Show error messages inline below the input
- Consider using icons to provide visual cues
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'Input variant',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Input state',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when state is error',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button when there is input',
    },
  },
  args: {
    type: 'text',
    size: 'md',
    variant: 'default',
    state: 'default',
    label: 'Label',
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Your unique identifier on the platform',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <TextField
        label="Email"
        placeholder="Enter your email"
        leftIcon={<Mail size={18} />}
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Enter your password"
        leftIcon={<Lock size={18} />}
      />
      <TextField
        label="Search"
        placeholder="Search..."
        leftIcon={<Search size={18} />}
        clearable
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <TextField
        label="Default"
        placeholder="Default state"
      />
      <TextField
        label="Success"
        placeholder="Success state"
        state="success"
        helperText="Input is valid"
      />
      <TextField
        label="Error"
        placeholder="Error state"
        state="error"
        errorText="This field is required"
      />
      <TextField
        label="Disabled"
        placeholder="Disabled state"
        disabled
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <TextField
        label="Default"
        placeholder="Default variant"
        variant="default"
      />
      <TextField
        label="Filled"
        placeholder="Filled variant"
        variant="filled"
      />
      <TextField
        label="Outlined"
        placeholder="Outlined variant"
        variant="outlined"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <TextField
        label="Small"
        placeholder="Small size"
        size="sm"
      />
      <TextField
        label="Medium"
        placeholder="Medium size"
        size="md"
      />
      <TextField
        label="Large"
        placeholder="Large size"
        size="lg"
      />
    </div>
  ),
};

export const WithClearButton: Story = {
  args: {
    label: 'Clearable Input',
    defaultValue: 'This can be cleared',
    clearable: true,
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Click the eye icon to show/hide password',
  },
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
};

export const Playground: Story = {
  args: {
    label: 'Custom Input',
    placeholder: 'Type something...',
    helperText: 'This is a customizable input field',
    type: 'text',
    size: 'md',
    variant: 'default',
    state: 'default',
    clearable: true,
    required: false,
    disabled: false,
  },
};