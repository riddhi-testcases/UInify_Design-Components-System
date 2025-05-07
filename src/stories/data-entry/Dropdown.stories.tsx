import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../../components/data-entry/Dropdown';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'mango', label: 'Mango' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'br', label: 'Brazil' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
  { value: 'pe', label: 'Peru' },
  { value: 'cl', label: 'Chile' },
  { value: 'ec', label: 'Ecuador' },
  { value: 'bo', label: 'Bolivia' },
];

const meta = {
  title: 'Data Entry/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Dropdown / Select

The Dropdown component allows users to select one or multiple options from a list.

## Features
- Single and multiple selection modes
- Searchable option filtering
- Custom styling for options
- Clearable selection
- Keyboard navigation
- Accessible design

## Accessibility
- Keyboard navigable (Arrow keys, Enter, Escape)
- Proper ARIA attributes for dropdown and options
- Focus management
- Screen reader announcements for selections

## Usage Guidelines
- Use for selecting from predefined options
- For fewer than 5 options, consider using radio buttons or checkboxes instead
- For date selection, use a specialized date picker component
- Provide clear labels and helper text when needed
        `,
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options objects with value and label properties',
    },
    value: {
      control: 'text',
      description: 'Current value (string or array of strings for multiple)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Dropdown size',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'Dropdown variant',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Dropdown state',
    },
    label: {
      control: 'text',
      description: 'Dropdown label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no selection',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the dropdown',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when state is error',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the dropdown is required',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button when there is a selection',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether to enable search filtering of options',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether to allow multiple selections',
    },
  },
  args: {
    options: fruitOptions,
    size: 'md',
    variant: 'default',
    state: 'default',
    label: 'Select option',
    placeholder: 'Select...',
    clearable: false,
    searchable: false,
    multiple: false,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Favorite Fruit',
    options: fruitOptions,
    placeholder: 'Select a fruit',
    helperText: 'Choose your favorite fruit',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Select Fruits',
    options: fruitOptions,
    placeholder: 'Select fruits',
    helperText: 'You can select multiple options',
    multiple: true,
  },
};

export const Searchable: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    helperText: 'Type to search countries',
    searchable: true,
  },
};

export const SearchableMultiple: Story = {
  args: {
    label: 'Countries',
    options: countryOptions,
    placeholder: 'Select countries',
    helperText: 'Type to search and select multiple countries',
    searchable: true,
    multiple: true,
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Dropdown
        label="Default"
        options={fruitOptions}
        placeholder="Default state"
      />
      <Dropdown
        label="Success"
        options={fruitOptions}
        placeholder="Success state"
        state="success"
        helperText="Valid selection"
      />
      <Dropdown
        label="Error"
        options={fruitOptions}
        placeholder="Error state"
        state="error"
        errorText="This field is required"
      />
      <Dropdown
        label="Disabled"
        options={fruitOptions}
        placeholder="Disabled state"
        disabled
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Dropdown
        label="Default"
        options={fruitOptions}
        placeholder="Default variant"
        variant="default"
      />
      <Dropdown
        label="Filled"
        options={fruitOptions}
        placeholder="Filled variant"
        variant="filled"
      />
      <Dropdown
        label="Outlined"
        options={fruitOptions}
        placeholder="Outlined variant"
        variant="outlined"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Dropdown
        label="Small"
        options={fruitOptions}
        placeholder="Small size"
        size="sm"
      />
      <Dropdown
        label="Medium"
        options={fruitOptions}
        placeholder="Medium size"
        size="md"
      />
      <Dropdown
        label="Large"
        options={fruitOptions}
        placeholder="Large size"
        size="lg"
      />
    </div>
  ),
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Plans',
    options: [
      { value: 'free', label: 'Free Plan' },
      { value: 'basic', label: 'Basic Plan' },
      { value: 'premium', label: 'Premium Plan' },
      { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
    ],
    placeholder: 'Select a plan',
    helperText: 'The Enterprise plan requires contacting sales',
  },
};

export const Clearable: Story = {
  args: {
    label: 'Clearable Selection',
    options: fruitOptions,
    placeholder: 'Select an option',
    clearable: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    required: true,
  },
};

export const Playground: Story = {
  args: {
    label: 'Custom Dropdown',
    options: countryOptions,
    placeholder: 'Make a selection...',
    helperText: 'This is a customizable dropdown field',
    size: 'md',
    variant: 'default',
    state: 'default',
    clearable: true,
    searchable: true,
    multiple: false,
    required: false,
    disabled: false,
  },
};