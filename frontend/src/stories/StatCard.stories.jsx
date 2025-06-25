import React from 'react';
import { TrendingUp, Users, DollarSign, Activity, ShoppingCart, Eye } from 'lucide-react';
import StatCard from '../components/StatCard';

// Enhanced Meta Configuration
export default {
  title: 'Components/StatCard',
  component: StatCard,
  
  // Component-level parameters
  parameters: {
    docs: {
      description: {
        component: `
# StatCard Component

A versatile statistic display card component that showcases key metrics with visual appeal.

## Features
- **Gradient Background**: Dynamic color-based gradients
- **Icon Support**: Accepts any Lucide React icon
- **Flexible Content**: Title, value, and optional subtitle
- **Color Theming**: Supports multiple color variants
- **Responsive Design**: Adapts to different screen sizes

## Usage
\`\`\`jsx
import { TrendingUp } from 'lucide-react';
import StatCard from './StatCard';

<StatCard 
  title="Total Revenue" 
  value="$12,345" 
  subtitle="+12% from last month"
  icon={TrendingUp}
  color="green"
/>
\`\`\`

## Design System Integration
This component follows our design system's spacing, typography, and color palette standards.
        `,
      },
      inlineStories: false,
      canvas: { 
        sourceState: 'shown' 
      },
    },
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1024px', height: '768px' },
        },
      },
    },
  },

  // Enhanced ArgTypes for better controls
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The main title/label for the statistic',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'The primary value/number to display',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Optional subtitle text (often used for trends or additional context)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    icon: {
      control: { type: 'select' },
      options: ['TrendingUp', 'Users', 'DollarSign', 'Activity', 'ShoppingCart', 'Eye'],
      mapping: {
        TrendingUp,
        Users,
        DollarSign,
        Activity,
        ShoppingCart,
        Eye,
      },
      description: 'Icon component to display (Lucide React icons)',
      table: {
        type: { summary: 'React.Component' },
        defaultValue: { summary: 'undefined' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'gray'],
      description: 'Color theme for the card (affects background, text, and icon colors)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'red' },
      },
    },
  },

  // Default args for all stories
  args: {
    title: 'Total Sales',
    value: '1,234',
    subtitle: '+12% from last month',
    icon: TrendingUp,
    color: 'blue',
  },
};

// Template function
const Template = (args) => <StatCard {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {};

// Different Color Variants
export const ColorVariants = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <StatCard title="Revenue" value="$45,231" subtitle="+20.1% from last month" icon={DollarSign} color="green" />
    <StatCard title="Users" value="2,350" subtitle="+180.1% from last month" icon={Users} color="blue" />
    <StatCard title="Sales" value="12,234" subtitle="+19% from last month" icon={ShoppingCart} color="purple" />
    <StatCard title="Active Now" value="573" subtitle="+201 since last hour" icon={Activity} color="red" />
  </div>
);

// Without Subtitle
export const WithoutSubtitle = Template.bind({});
WithoutSubtitle.args = {
  title: 'Page Views',
  value: '89,432',
  icon: Eye,
  color: 'indigo',
  subtitle: undefined,
};

// Large Numbers
export const LargeNumbers = Template.bind({});
LargeNumbers.args = {
  title: 'Total Downloads',
  value: '1,234,567',
  subtitle: '+5.4% from last quarter',
  icon: TrendingUp,
  color: 'green',
};

// Negative Trend
export const NegativeTrend = Template.bind({});
NegativeTrend.args = {
  title: 'Bounce Rate',
  value: '2.4%',
  subtitle: '-0.5% from last month',
  icon: Activity,
  color: 'red',
};

// Interactive Playground
export const Playground = Template.bind({});
Playground.args = {
  title: 'Custom Metric',
  value: '999',
  subtitle: 'Custom subtitle here',
  icon: TrendingUp,
  color: 'blue',
};

// Dashboard Layout Example
export const DashboardLayout = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Revenue" 
        value="$45,231.89" 
        subtitle="+20.1% from last month" 
        icon={DollarSign} 
        color="green" 
      />
      <StatCard 
        title="Subscriptions" 
        value="+2350" 
        subtitle="+180.1% from last month" 
        icon={Users} 
        color="blue" 
      />
      <StatCard 
        title="Sales" 
        value="+12,234" 
        subtitle="+19% from last month" 
        icon={ShoppingCart} 
        color="purple" 
      />
      <StatCard 
        title="Active Now" 
        value="+573" 
        subtitle="+201 since last hour" 
        icon={Activity} 
        color="red" 
      />
    </div>
  </div>
);
DashboardLayout.parameters = {
  layout: 'fullscreen',
};

// Responsive Test
export const ResponsiveTest = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 gap-4">
      <StatCard title="Mobile View" value="100%" subtitle="Single column" icon={Eye} color="blue" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <StatCard title="Tablet" value="50%" subtitle="Two columns" icon={Users} color="green" />
      <StatCard title="View" value="50%" subtitle="Layout test" icon={Activity} color="purple" />
    </div>
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Desktop" value="25%" icon={DollarSign} color="red" />
      <StatCard title="Four" value="25%" icon={ShoppingCart} color="blue" />
      <StatCard title="Column" value="25%" icon={TrendingUp} color="green" />
      <StatCard title="Layout" value="25%" icon={Eye} color="purple" />
    </div>
  </div>
);