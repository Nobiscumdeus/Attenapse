import React from 'react';

import Pagination from '../components/Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'A flexible pagination component that allows navigation through pages of content with customizable item names and comprehensive page information display.',
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'The currently active page number',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages available',
    },
    totalItems: {
      control: { type: 'number', min: 0 },
      description: 'Total number of items across all pages',
    },
    itemsPerPage: {
      control: { type: 'number', min: 1 },
      description: 'Number of items displayed per page',
    },
    itemName: {
      control: { type: 'text' },
      description: 'Name of the items being paginated (e.g., "members", "products", "results")',
    },
    onPageChange: {
      action: 'page-changed',
      description: 'Callback function called when page changes',
    },
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 95,
    itemsPerPage: 10,
    itemName: 'items',
    onPageChange: (page) => console.log(`Page changed to: ${page}`),
  },
};

const Template = (args) => <Pagination {...args} />;

// Legacy story (for backward compatibility)
export const Story = Template.bind({});
Story.args = {};
Story.parameters = {
  docs: {
    description: {
      story: 'A pagination component that allows navigation through pages of content. It includes next and previous buttons, and displays the current page number.',
    },
  },
};

// Default story
export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story: 'The default pagination component showing typical usage with 10 items per page.',
    },
  },
};

// First page (Previous button disabled)
export const FirstPage = Template.bind({});
FirstPage.args = {
  currentPage: 1,
  totalPages: 5,
  totalItems: 47,
  itemsPerPage: 10,
  itemName: 'results',
};
FirstPage.parameters = {
  docs: {
    description: {
      story: 'Pagination on the first page - Previous button is disabled.',
    },
  },
};

// Last page (Next button disabled)
export const LastPage = Template.bind({});
LastPage.args = {
  currentPage: 5,
  totalPages: 5,
  totalItems: 47,
  itemsPerPage: 10,
  itemName: 'results',
};
LastPage.parameters = {
  docs: {
    description: {
      story: 'Pagination on the last page - Next button is disabled, showing partial items on final page.',
    },
  },
};

// Middle page
export const MiddlePage = Template.bind({});
MiddlePage.args = {
  currentPage: 3,
  totalPages: 5,
  totalItems: 47,
  itemsPerPage: 10,
  itemName: 'products',
};
MiddlePage.parameters = {
  docs: {
    description: {
      story: 'Pagination in the middle - both Previous and Next buttons are enabled.',
    },
  },
};

// Single page (no navigation needed)
export const SinglePage = Template.bind({});
SinglePage.args = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 5,
  itemsPerPage: 10,
  itemName: 'items',
};
SinglePage.parameters = {
  docs: {
    description: {
      story: 'Single page scenario where both navigation buttons are disabled.',
    },
  },
};

// Large dataset
export const LargeDataset = Template.bind({});
LargeDataset.args = {
  currentPage: 42,
  totalPages: 100,
  totalItems: 2500,
  itemsPerPage: 25,
  itemName: 'records',
};
LargeDataset.parameters = {
  docs: {
    description: {
      story: 'Pagination with a large dataset showing how it handles many pages.',
    },
  },
};

// Different item names
export const CustomItemNames = Template.bind({});
CustomItemNames.args = {
  currentPage: 2,
  totalPages: 8,
  totalItems: 156,
  itemsPerPage: 20,
  itemName: 'team members',
};
CustomItemNames.parameters = {
  docs: {
    description: {
      story: 'Pagination with custom item name to show flexibility in labeling.',
    },
  },
};

// Small items per page
export const SmallPageSize = Template.bind({});
SmallPageSize.args = {
  currentPage: 4,
  totalPages: 20,
  totalItems: 100,
  itemsPerPage: 5,
  itemName: 'photos',
};
SmallPageSize.parameters = {
  docs: {
    description: {
      story: 'Pagination with small page size, creating more pages for the same dataset.',
    },
  },
};

// Interactive playground
export const Interactive = Template.bind({});
Interactive.args = {
  currentPage: 1,
  totalPages: 10,
  totalItems: 95,
  itemsPerPage: 10,
  itemName: 'items',
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Interactive version - try changing the controls to see how the pagination responds to different configurations.',
    },
  },
};

// Edge case: No items
export const NoItems = Template.bind({});
NoItems.args = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  itemName: 'results',
};
NoItems.parameters = {
  docs: {
    description: {
      story: 'Edge case showing pagination when there are no items to display.',
    },
  },
};

// Different styling context (you might want to wrap in a container)
export const InCard = (args) => (
  <div className="max-w-4xl mx-auto bg-gray-50 p-4 rounded-lg">
    <div className="bg-white rounded-md shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Data Table</h3>
        <div className="space-y-2">
          {Array.from({ length: args.itemsPerPage }, (_, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded border">
              Sample item {((args.currentPage - 1) * args.itemsPerPage) + i + 1}
            </div>
          ))}
        </div>
      </div>
      <Pagination {...args} />
    </div>
  </div>
);
InCard.args = {
  currentPage: 2,
  totalPages: 5,
  totalItems: 42,
  itemsPerPage: 10,
  itemName: 'entries',
};
InCard.parameters = {
  docs: {
    description: {
      story: 'Pagination component shown in context within a card/table layout.',
    },
  },
};