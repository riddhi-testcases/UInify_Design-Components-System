import React, { useState } from 'react';
import { BellRing, ChevronDown, MoveDown, Search, Settings } from 'lucide-react';

import { Typography } from './components/foundation/Typography';
import { TextField } from './components/data-entry/TextField';
import { Dropdown } from './components/data-entry/Dropdown';
import { Alert } from './components/feedback/Alert';
import { ToastProvider, useToast } from './components/feedback/Toast';

const countries = [
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
  { value: 'in', label: 'India' },
];

const DemoContent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [alertVisible, setAlertVisible] = useState(true);
  
  const toast = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !country) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    toast.success('Form submitted successfully!', {
      title: 'Success',
      duration: 5000,
    });
  };
  
  const showToast = (type: 'info' | 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'info':
        toast.info('This is an informational message.', {
          title: 'Information',
        });
        break;
      case 'success':
        toast.success('Operation completed successfully!', {
          title: 'Success',
        });
        break;
      case 'warning':
        toast.warning('This action may have consequences.', {
          title: 'Warning',
        });
        break;
      case 'error':
        toast.error('An error occurred while processing your request.', {
          title: 'Error',
          duration: 0, // Won't auto-dismiss
        });
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-10">
        <Typography variant="h2" className="mb-2">
          <span className="font-bold">UI</span>nify
        </Typography>
        <Typography variant="body1" color="muted">
          A showcase of typography, data entry, and feedback components.
        </Typography>
      </div>
      
      {/* Typography Section */}
      <section className="mb-10">
        <Typography variant="h3" className="mb-4">Typography</Typography>
        <div className="grid gap-4 p-6 bg-white rounded-lg shadow-sm">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
          <Typography variant="body1">
            Body 1 - The quick brown fox jumps over the lazy dog. This is a paragraph of text that demonstrates 
            the body1 text style with normal line height and proper readability.
          </Typography>
          <Typography variant="body2">
            Body 2 - The quick brown fox jumps over the lazy dog. This paragraph shows the body2 text style, 
            which is slightly smaller but still maintains good readability for supporting content.
          </Typography>
          <Typography variant="caption">Caption text for additional information</Typography>
          <Typography variant="overline">OVERLINE TEXT IN UPPERCASE</Typography>
          <Typography variant="label">Form Label</Typography>
          <Typography variant="helper">Helper text for form fields</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Typography variant="h6" className="mb-2">Text Colors</Typography>
              <div className="space-y-2">
                <Typography color="primary">Primary Color Text</Typography>
                <Typography color="secondary">Secondary Color Text</Typography>
                <Typography color="accent">Accent Color Text</Typography>
                <Typography color="success">Success Color Text</Typography>
                <Typography color="warning">Warning Color Text</Typography>
                <Typography color="error">Error Color Text</Typography>
                <Typography color="muted">Muted Color Text</Typography>
              </div>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">Text Transforms</Typography>
              <div className="space-y-2">
                <Typography transform="uppercase">Uppercase Text</Typography>
                <Typography transform="lowercase">LOWERCASE TEXT</Typography>
                <Typography transform="capitalize">capitalize each word</Typography>
                <Typography weight="light">Light Weight Text</Typography>
                <Typography weight="medium">Medium Weight Text</Typography>
                <Typography weight="bold">Bold Weight Text</Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Data Entry Section */}
      <section className="mb-10">
        <Typography variant="h3" className="mb-4">Data Entry Components</Typography>
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
          {/* Text Input Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              helperText="Your full name as it appears on your ID"
            />
            
            <TextField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              leftIcon={<Search size={18} />}
              required
              clearable
            />
            
            <TextField
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              helperText="Must be at least 8 characters"
            />
            
            <TextField
              label="Website"
              id="website"
              placeholder="https://example.com"
              state="error"
              errorText="Please enter a valid URL"
            />
            
            <TextField
              label="Username"
              id="username"
              placeholder="Username"
              variant="filled"
              leftIcon={<Settings size={18} />}
              clearable
            />
            
            <TextField
              label="Address"
              id="address"
              placeholder="Your address"
              variant="outlined"
              disabled
              helperText="This field is disabled"
            />
          </div>
          
          {/* Dropdown Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Dropdown
              label="Country"
              id="country"
              options={countries}
              value={country}
              onChange={(value) => setCountry(value as string)}
              placeholder="Select a country"
              required
              helperText="Select your country of residence"
              clearable
            />
            
            <Dropdown
              label="Interests"
              id="interests"
              options={[
                { value: 'technology', label: 'Technology' },
                { value: 'design', label: 'Design' },
                { value: 'business', label: 'Business' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'education', label: 'Education' },
              ]}
              value={interests}
              onChange={(value) => setInterests(value as string[])}
              placeholder="Select your interests"
              multiple
              searchable
            />
            
            <Dropdown
              label="Size"
              id="size"
              options={[
                { value: 'xs', label: 'Extra Small' },
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' },
                { value: 'xl', label: 'Extra Large' },
              ]}
              placeholder="Select a size"
              variant="filled"
            />
            
            <Dropdown
              label="Status"
              id="status"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'pending', label: 'Pending' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
              placeholder="Select status"
              variant="outlined"
              state="error"
              errorText="This field is required"
            />
          </div>
          
          <div className="pt-4 border-t border-neutral-200">
            <button 
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Submit Form
            </button>
          </div>
        </form>
      </section>
      
      {/* Feedback Components Section */}
      <section className="mb-10">
        <Typography variant="h3" className="mb-4">Feedback Components</Typography>
        
        {/* Alert Examples */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-lg shadow-sm">
          <Typography variant="h4" className="mb-4">Alert Banners</Typography>
          
          {alertVisible && (
            <Alert
              type="info"
              title="Information"
              description="This is an informational alert that provides helpful context."
              closable
              onClose={() => setAlertVisible(false)}
            />
          )}
          
          <Alert
            type="success"
            title="Success"
            description="Your changes have been saved successfully."
          />
          
          <Alert
            type="warning"
            title="Warning"
            description="This action may have consequences. Please proceed with caution."
            variant="outline"
          />
          
          <Alert
            type="error"
            title="Error"
            description="There was a problem processing your request. Please try again."
            variant="solid"
            action={
              <button className="px-3 py-1 text-sm bg-white text-error-700 rounded hover:bg-opacity-90">
                Retry
              </button>
            }
          />
          
          <Alert
            type="info"
            icon={<BellRing className="h-4 w-4" />}
            description="You have 3 new notifications. Check your inbox."
            size="sm"
          />
        </div>
        
        {/* Toast Examples */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
          <Typography variant="h4" className="mb-4">Toast Notifications</Typography>
          <Typography variant="body2" className="mb-4">
            Click the buttons below to show different types of toast notifications.
          </Typography>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => showToast('info')}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Show Info Toast
            </button>
            
            <button
              onClick={() => showToast('success')}
              className="px-4 py-2 bg-success-600 text-white rounded-md hover:bg-success-700 focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2"
            >
              Show Success Toast
            </button>
            
            <button
              onClick={() => showToast('warning')}
              className="px-4 py-2 bg-warning-600 text-white rounded-md hover:bg-warning-700 focus:outline-none focus:ring-2 focus:ring-warning-500 focus:ring-offset-2"
            >
              Show Warning Toast
            </button>
            
            <button
              onClick={() => showToast('error')}
              className="px-4 py-2 bg-error-600 text-white rounded-md hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2"
            >
              Show Error Toast
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-neutral-200">
        <Typography variant="body2" align="center" color="muted">
          © 2025 UInify. Made by Riddhi Chakraborty. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-neutral-50">
        <DemoContent />
      </div>
    </ToastProvider>
  );
}

export default App;