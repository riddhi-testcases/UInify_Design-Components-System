import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Toast } from '../../components/feedback/Toast';
import { ToastProvider, useToast } from '../../components/feedback/Toast';
import { BellRing, ExternalLink } from 'lucide-react';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Toast

Toast notifications provide brief messages about app processes without interrupting the user experience.

## Features
- Different types: info, success, warning, error
- Optional title and description
- Custom icons and actions
- Automated dismissal with configurable duration
- Progress indicator
- Pause on hover

## Accessibility
- Uses appropriate ARIA roles and attributes
- Focus management for interactive elements
- Sufficient color contrast
- Screen reader announcements

## Usage Guidelines
- Keep messages brief and actionable
- Use appropriate type based on the message content
- Avoid showing too many toasts simultaneously
- Position toasts consistently in the UI
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Toast type',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Toast visual variant',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Toast size',
    },
    title: {
      control: 'text',
      description: 'Toast title',
    },
    content: {
      control: 'text',
      description: 'Toast content/description',
    },
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before auto-dismissal (0 for no auto-dismiss)',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the toast can be closed',
    },
    progress: {
      control: 'boolean',
      description: 'Whether to show a progress indicator',
    },
  },
  args: {
    type: 'info',
    variant: 'default',
    size: 'default',
    title: undefined,
    content: 'This is a toast message.',
    duration: 5000,
    closable: true,
    progress: true,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a standard toast notification.',
  },
};

// Interactive example with ToastProvider
const ToastDemo = () => {
  const toast = useToast();
  
  const showToast = (type: 'info' | 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'info':
        toast.info('This is an informational message.');
        break;
      case 'success':
        toast.success('Operation completed successfully!');
        break;
      case 'warning':
        toast.warning('This action may have consequences.');
        break;
      case 'error':
        toast.error('An error occurred during the operation.');
        break;
    }
  };
  
  return (
    <div className="p-6 space-y-4 bg-white rounded-lg shadow w-[400px]">
      <h3 className="text-lg font-medium">Toast Notifications</h3>
      <p className="text-sm text-neutral-600">
        Click the buttons below to show different types of toast notifications.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => showToast('info')}
          className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Info
        </button>
        <button
          onClick={() => showToast('success')}
          className="px-3 py-1 bg-success-600 text-white rounded-md hover:bg-success-700"
        >
          Success
        </button>
        <button
          onClick={() => showToast('warning')}
          className="px-3 py-1 bg-warning-600 text-white rounded-md hover:bg-warning-700"
        >
          Warning
        </button>
        <button
          onClick={() => showToast('error')}
          className="px-3 py-1 bg-error-600 text-white rounded-md hover:bg-error-700"
        >
          Error
        </button>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo that shows how to use the ToastProvider and useToast hook.',
      },
    },
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <Toast
        type="info"
        title="Information"
        content="This is an informational message."
      />
      <Toast
        type="success"
        title="Success"
        content="Operation completed successfully!"
      />
      <Toast
        type="warning"
        title="Warning"
        content="This action may have consequences."
      />
      <Toast
        type="error"
        title="Error"
        content="An error occurred during the operation."
      />
    </div>
  ),
};

export const WithTitle: Story = {
  args: {
    type: 'info',
    title: 'Information',
    content: 'This toast includes a title above the content.',
  },
};

export const WithCustomIcon: Story = {
  args: {
    type: 'info',
    title: 'New Notification',
    content: 'You have a new message in your inbox.',
    icon: <BellRing className="text-primary-600" />,
  },
};

export const WithAction: Story = {
  args: {
    type: 'success',
    title: 'File Uploaded',
    content: 'Your document has been uploaded successfully.',
    action: (
      <a href="#" className="flex items-center text-sm font-medium text-primary-600 hover:underline">
        View File <ExternalLink className="ml-1 size-3" />
      </a>
    ),
  },
};

export const Persistent: Story = {
  args: {
    type: 'warning',
    title: 'Maintenance Alert',
    content: 'The system will be unavailable on Sunday from 2-4 AM for scheduled maintenance.',
    duration: 0, // No auto-dismiss
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <Toast
        type="info"
        variant="default"
        title="Default Variant"
        content="This uses the default styling."
      />
      <Toast
        type="info"
        variant="outline"
        title="Outline Variant"
        content="This uses an outline style with a white background."
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[350px]">
      <Toast
        type="info"
        size="sm"
        title="Small"
        content="This is a small-sized toast."
      />
      <Toast
        type="info"
        size="default"
        title="Default"
        content="This is a default-sized toast."
      />
      <Toast
        type="info"
        size="lg"
        title="Large"
        content="This is a large-sized toast."
      />
    </div>
  ),
};

export const WithProgressIndicator: Story = {
  args: {
    type: 'info',
    content: 'This toast shows a progress indicator at the bottom.',
    progress: true,
    duration: 5000,
  },
};

export const Playground: Story = {
  args: {
    type: 'success',
    variant: 'default',
    size: 'default',
    title: 'Custom Toast',
    content: 'This is a customizable toast notification.',
    duration: 5000,
    closable: true,
    progress: true,
  },
};