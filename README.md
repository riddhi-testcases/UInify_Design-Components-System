# Design System Components

This project implements a professional design system featuring typography components, data entry elements, and feedback components. Built with React, TypeScript, and Tailwind CSS, with documentation in Storybook.

## Core Components

### Foundation
- **Typography System**: A comprehensive typography system with tokens for font-size, weight, line-height, and letter-spacing.

### Data Entry
- **Text Input**: Customizable text input with support for various states, variants, and features like password visibility toggle and clearable inputs.
- **Dropdown**: Select component with support for single/multiple selection, searchable options, and keyboard navigation.

### Feedback
- **Toast Notifications**: Non-intrusive notifications with auto-dismiss, progress indicator, and action support.
- **Alert Banners**: Contextual feedback messages for different scenarios (info, success, warning, error).

## Features

- Comprehensive typography system with tokens for font-size, weight, line-height, and letter-spacing
- Text Input and Dropdown components with support for all states and variants
- Toast and Alert Banner components with configurable options
- Light/dark mode theming support across all components
- Comprehensive Storybook documentation for all components
- Accessibility-first approach with proper ARIA attributes and keyboard navigation
- Responsive behavior across all viewport sizes

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Building

```bash
# Build for production
npm run build

# Build Storybook
npm run build-storybook
```

## Project Structure

```
src/
├── components/
│   ├── foundation/
│   │   └── Typography/
│   ├── data-entry/
│   │   ├── TextField/
│   │   └── Dropdown/
│   └── feedback/
│       ├── Toast/
│       └── Alert/
├── lib/
│   └── utils.ts
└── stories/
    ├── foundation/
    ├── data-entry/
    └── feedback/
```

## Design Principles

- **Consistency**: Unified design language across all components
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Flexibility**: Customizable components that adapt to different contexts
- **Performance**: Lightweight implementation with minimal dependencies
- **Documentation**: Comprehensive documentation in Storybook