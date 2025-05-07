import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../../components/feedback/Alert';
import { BellRing, HelpCircle, ExternalLink } from 'lucide-react';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Alert

The Alert component is used to display important messages to the user.

## Features
- Different types: info, success, warning, error
- Variants: default, outline, solid
- Optional title and description
- Custom icons
- Action buttons
- Closable alerts

## Accessibility
- Uses appropriate ARIA role="alert"
- Semantic structure with appropriate headings
- Keyboard accessible close button
- Focus management
- Sufficient color contrast

## Usage Guidelines
- Use the appropriate type based on the message content
- Keep messages clear and concise
- Provide actionable information when possible
- Position alerts where they will be noticed but not disruptive
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert type',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'solid'],
      description: 'Alert visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Alert size',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    description: {
      control: 'text',
      description: 'Alert description',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the alert can be closed',
    },
  },
  args: {
    type: 'info',
    variant: 'default',
    size: 'default',
    title: 'Information',
    description: 'This is an alert message.',
    closable: false,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Information',
    description: 'This is a standard informational alert.',
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert
        type="info"
        title="Information"
        description="This is an informational message."
      />
      <Alert
        type="success"
        title="Success"
        description="Your changes have been saved."
      />
      <Alert
        type="warning"
        title="Warning"
        description="This action cannot be undone."
      />
      <Alert
        type="error"
        title="Error"
        description="There was a problem with your request."
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert
        type="info"
        variant="default"
        title="Default Variant"
        description="This uses the default styling with a filled background."
      />
      <Alert
        type="info"
        variant="outline"
        title="Outline Variant"
        description="This uses an outline style with a white background."
      />
      <Alert
        type="info"
        variant="solid"
        title="Solid Variant"
        description="This uses a solid colored background for stronger emphasis."
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert
        type="info"
        size="sm"
        title="Small Alert"
        description="This is a small-sized alert."
      />
      <Alert
        type="info"
        size="default"
        title="Default Alert"
        description="This is a default-sized alert."
      />
      <Alert
        type="info"
        size="lg"
        title="Large Alert"
        description="This is a large-sized alert with more padding."
      />
    </div>
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert
        type="info"
        icon={<BellRing className="size-4" />}
        title="Notification"
        description="You have new messages in your inbox."
      />
      <Alert
        type="warning"
        icon={<HelpCircle className="size-4" />}
        title="Help Required"
        description="You need to provide additional information."
      />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Alert
        type="info"
        title="New Feature Available"
        description="We've added new capabilities to your account."
        action={
          <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
            Learn More
          </button>
        }
      />
      <Alert
        type="warning"
        title="Account Verification Required"
        description="Please verify your email address to continue."
        action={
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-warning-600 text-white rounded hover:bg-warning-700">
              Verify Now
            </button>
            <button className="px-3 py-1 text-sm border border-warning-600 text-warning-600 rounded hover:bg-warning-50">
              Remind Later
            </button>
          </div>
        }
      />
    </div>
  ),
};

export const Closable: Story = {
  args: {
    type: 'success',
    title: 'Password Updated',
    description: 'Your password has been successfully changed.',
    closable: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    type: 'info',
    title: undefined,
    description: 'This alert has only a description without a title.',
  },
};

export const WithLinkAction: Story = {
  render: () => (
    <Alert
      type="info"
      title="Documentation"
      description="Learn more about using this component in our documentation."
      action={
        <a href="#" className="flex items-center text-sm text-primary-600 hover:underline">
          View Docs <ExternalLink className="ml-1 size-3" />
        </a>
      }
    />
  ),
};

export const Playground: Story = {
  args: {
    type: 'warning',
    variant: 'default',
    size: 'default',
    title: 'Custom Alert',
    description: 'This is a customizable alert component.',
    closable: true,
  },
};