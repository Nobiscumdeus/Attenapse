import React, { useState } from 'react';
import { 
  Home, 
  Settings, 
  User, 
  Bell, 
  Mail, 
  Search, 
  Calendar, 
  FileText, 
  BarChart3, 
  Image,
  Download,
  Upload,
  Heart,
  Star,
  MapPin
} from 'lucide-react';

import TabButton from '../components/TabButton';

export default {
  title: 'Components/TabButton',
  component: TabButton,
  parameters: {
    docs: {
      description: {
        component: 'A flexible tab button component with icon support, hover states, and active state styling. Perfect for navigation tabs, filter buttons, or any button that needs to toggle between active/inactive states.',
      },
    },
  },
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'Unique identifier for the tab button',
    },
    label: {
      control: { type: 'text' },
      description: 'Text label displayed on the button',
    },
    icon: {
      control: { type: 'select' },
      options: [
        'Home', 'Settings', 'User', 'Bell', 'Mail', 'Search', 
        'Calendar', 'FileText', 'BarChart3', 'Image', 'Download', 
        'Upload', 'Heart', 'Star', 'MapPin'
      ],
      mapping: {
        Home, Settings, User, Bell, Mail, Search,
        Calendar, FileText, BarChart3, Image, Download,
        Upload, Heart, Star, MapPin
      },
      description: 'Lucide React icon component to display',
    },
    isActive: {
      control: { type: 'boolean' },
      description: 'Whether the tab button is in active state',
    },
    onClick: {
      action: 'tab-clicked',
      description: 'Callback function called when tab is clicked, receives the id as parameter',
    },
  },
  args: {
    id: 'home',
    label: 'Home',
    icon: Home,
    isActive: false,
    onClick: (id) => console.log(`Tab clicked: ${id}`),
  },
};

const Template = (args) => <TabButton {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story: 'Default tab button in inactive state with Home icon.',
    },
  },
};

// Active state
export const Active = Template.bind({});
Active.args = {
  isActive: true,
  label: 'Dashboard',
  icon: BarChart3,
  id: 'dashboard',
};
Active.parameters = {
  docs: {
    description: {
      story: 'Tab button in active state showing the selected styling with blue background.',
    },
  },
};

// Different icons showcase
export const WithDifferentIcons = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Various Icon Examples</h3>
    <div className="flex flex-wrap gap-3">
      <TabButton id="home" label="Home" icon={Home} isActive={false} onClick={() => {}} />
      <TabButton id="settings" label="Settings" icon={Settings} isActive={false} onClick={() => {}} />
      <TabButton id="profile" label="Profile" icon={User} isActive={true} onClick={() => {}} />
      <TabButton id="notifications" label="Notifications" icon={Bell} isActive={false} onClick={() => {}} />
      <TabButton id="messages" label="Messages" icon={Mail} isActive={false} onClick={() => {}} />
    </div>
  </div>
);
WithDifferentIcons.parameters = {
  docs: {
    description: {
      story: 'Showcase of different icons available for tab buttons with one active state.',
    },
  },
};

// Long labels
export const LongLabels = Template.bind({});
LongLabels.args = {
  id: 'analytics',
  label: 'Advanced Analytics Dashboard',
  icon: BarChart3,
  isActive: false,
};
LongLabels.parameters = {
  docs: {
    description: {
      story: 'Tab button with longer label text to test text wrapping and spacing.',
    },
  },
};

// Short labels
export const ShortLabels = Template.bind({});
ShortLabels.args = {
  id: 'go',
  label: 'Go',
  icon: MapPin,
  isActive: true,
};
ShortLabels.parameters = {
  docs: {
    description: {
      story: 'Tab button with very short label to test minimum width and spacing.',
    },
  },
};

// Interactive tab group
export const InteractiveTabGroup = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Interactive Tab Group</h3>
      <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={setActiveTab}
          />
        ))}
      </div>
      <div className="p-4 bg-white border rounded-lg">
        <h4 className="font-medium">Active Tab Content:</h4>
        <p className="text-gray-600 mt-2">
          You selected: <strong>{tabs.find(t => t.id === activeTab)?.label}</strong>
        </p>
      </div>
    </div>
  );
};
InteractiveTabGroup.parameters = {
  docs: {
    description: {
      story: 'Interactive example showing multiple tab buttons working together with state management.',
    },
  },
};

// Vertical layout
export const VerticalLayout = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Vertical Tab Layout</h3>
    <div className="flex flex-col space-y-2 w-48">
      <TabButton id="dashboard" label="Dashboard" icon={BarChart3} isActive={true} onClick={() => {}} />
      <TabButton id="users" label="Users" icon={User} isActive={false} onClick={() => {}} />
      <TabButton id="files" label="Files" icon={FileText} isActive={false} onClick={() => {}} />
      <TabButton id="images" label="Images" icon={Image} isActive={false} onClick={() => {}} />
      <TabButton id="settings" label="Settings" icon={Settings} isActive={false} onClick={() => {}} />
    </div>
  </div>
);
VerticalLayout.parameters = {
  docs: {
    description: {
      story: 'Tab buttons arranged vertically, useful for sidebar navigation.',
    },
  },
};

// Different states showcase
export const AllStates = () => (
  <div className="space-y-6">
    <div>
      <h4 className="font-medium mb-3">Inactive State (Default)</h4>
      <TabButton id="inactive" label="Inactive Tab" icon={Home} isActive={false} onClick={() => {}} />
    </div>
    
    <div>
      <h4 className="font-medium mb-3">Active State</h4>
      <TabButton id="active" label="Active Tab" icon={Star} isActive={true} onClick={() => {}} />
    </div>
    
    <div>
      <h4 className="font-medium mb-3">Hover State</h4>
      <p className="text-sm text-gray-600 mb-2">Hover over this button to see the hover effect:</p>
      <TabButton id="hover" label="Hover Me" icon={Heart} isActive={false} onClick={() => {}} />
    </div>
  </div>
);
AllStates.parameters = {
  docs: {
    description: {
      story: 'Showcase of all possible states: inactive, active, and hover effects.',
    },
  },
};

// Action buttons style
export const ActionButtons = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Action Button Style</h3>
    <div className="flex flex-wrap gap-3">
      <TabButton id="upload" label="Upload" icon={Upload} isActive={false} onClick={() => {}} />
      <TabButton id="download" label="Download" icon={Download} isActive={true} onClick={() => {}} />
      <TabButton id="favorite" label="Favorite" icon={Heart} isActive={false} onClick={() => {}} />
      <TabButton id="bookmark" label="Bookmark" icon={Star} isActive={false} onClick={() => {}} />
    </div>
  </div>
);
ActionButtons.parameters = {
  docs: {
    description: {
      story: 'Tab buttons used as action buttons with action-oriented icons and labels.',
    },
  },
};

// Responsive behavior
export const ResponsiveBehavior = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-4">Responsive Behavior</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <TabButton id="resp1" label="Home" icon={Home} isActive={true} onClick={() => {}} />
      <TabButton id="resp2" label="Search Results" icon={Search} isActive={false} onClick={() => {}} />
      <TabButton id="resp3" label="Calendar Events" icon={Calendar} isActive={false} onClick={() => {}} />
      <TabButton id="resp4" label="User Profile Settings" icon={User} isActive={false} onClick={() => {}} />
    </div>
    <p className="text-sm text-gray-600">
      Resize the viewport to see how the buttons adapt to different screen sizes.
    </p>
  </div>
);
ResponsiveBehavior.parameters = {
  docs: {
    description: {
      story: 'Demonstrates how tab buttons behave in responsive grid layouts.',
    },
  },
};

// Edge cases
export const EdgeCases = () => (
  <div className="space-y-6">
    <div>
      <h4 className="font-medium mb-3">Very Long Label</h4>
      <TabButton 
        id="long" 
        label="This is a very long label that might wrap to multiple lines in some cases" 
        icon={FileText} 
        isActive={false} 
        onClick={() => {}} 
      />
    </div>
    
    <div>
      <h4 className="font-medium mb-3">Single Character</h4>
      <TabButton id="single" label="A" icon={Bell} isActive={true} onClick={() => {}} />
    </div>
    
    <div>
      <h4 className="font-medium mb-3">Numbers and Special Characters</h4>
      <div className="flex gap-2">
        <TabButton id="num1" label="123" icon={BarChart3} isActive={false} onClick={() => {}} />
        <TabButton id="special" label="@#$" icon={Mail} isActive={false} onClick={() => {}} />
        <TabButton id="mixed" label="Tab-1" icon={Home} isActive={true} onClick={() => {}} />
      </div>
    </div>
  </div>
);
EdgeCases.parameters = {
  docs: {
    description: {
      story: 'Edge cases including very long labels, single characters, and special characters.',
    },
  },
};

// Playground for testing
export const Playground = Template.bind({});
Playground.args = {
  id: 'playground',
  label: 'Playground',
  icon: Settings,
  isActive: false,
};
Playground.parameters = {
  docs: {
    description: {
      story: 'Interactive playground - use the controls panel to test different configurations.',
    },
  },
};