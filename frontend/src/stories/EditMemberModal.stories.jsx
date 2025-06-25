import React from 'react';

import EditMemberModal from '../components/EditModal';
// Default export for Storybook
export default {
  title: 'Components/Modals/EditMemberModal',
  component: EditMemberModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# EditMemberModal Component

A comprehensive modal component for editing church member information. This modal provides a user-friendly interface for updating personal details, contact information, and church-specific data.

## Features
- **Form Validation**: Real-time validation for required fields and email format
- **Responsive Design**: Adapts to different screen sizes with mobile-friendly layout
- **Sectioned Information**: Organized into logical sections (Personal, Contact, Church Info)
- **Status Management**: Handle member status like executive, new member, and active status
- **Error Handling**: Clear error messages and visual feedback
- **Accessibility**: Proper labels, focus management, and keyboard navigation

## Usage
This component is typically used in church management systems for updating member records.
        `,
      },
    },
  },
  argTypes: {
    member: {
      description: 'Member object containing all the member information',
      control: { type: 'object' },
    },
    onSubmit: {
      description: 'Callback function called when form is submitted',
      action: 'submitted',
    },
    onCancel: {
      description: 'Callback function called when modal is cancelled',
      action: 'cancelled',
    },
  },
};

// Sample member data for stories
const completeMember = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  phone: "+234-800-123-4567",
  address: "123 Church Street, Victoria Island, Lagos, Nigeria",
  emergency_contact: "+234-800-987-6543",
  date_of_birth: "1990-05-15T00:00:00",
  sex: "Male",
  is_executive: true,
  office: "Youth Leader",
  is_new_member: false,
  is_active: true,
  joined_date: "2020-01-15T00:00:00"
};

const minimalMember = {
  id: 2,
  first_name: "Jane",
  last_name: "Smith",
  is_active: true,
  joined_date: "2023-08-20T00:00:00"
};

const executiveMember = {
  id: 3,
  first_name: "Pastor",
  last_name: "Williams",
  email: "pastor.williams@church.org",
  phone: "+234-701-234-5678",
  address: "45 Sanctuary Road, Ikeja, Lagos, Nigeria",
  emergency_contact: "+234-701-876-5432",
  date_of_birth: "1975-03-22T00:00:00",
  sex: "Male",
  is_executive: true,
  office: "Senior Pastor",
  is_new_member: false,
  is_active: true,
  joined_date: "2010-06-01T00:00:00"
};

const newMember = {
  id: 4,
  first_name: "Sarah",
  last_name: "Johnson",
  email: "sarah.johnson@gmail.com",
  phone: "+234-802-345-6789",
  date_of_birth: "1995-11-08T00:00:00",
  sex: "Female",
  is_executive: false,
  office: "",
  is_new_member: true,
  is_active: true,
  joined_date: "2024-12-01T00:00:00"
};

const inactiveMember = {
  id: 5,
  first_name: "Michael",
  last_name: "Brown",
  email: "michael.brown@yahoo.com",
  phone: "+234-803-456-7890",
  address: "78 Grace Avenue, Surulere, Lagos, Nigeria",
  emergency_contact: "+234-803-987-6543",
  date_of_birth: "1988-07-12T00:00:00",
  sex: "Male",
  is_executive: false,
  office: "Former Usher",
  is_new_member: false,
  is_active: false,
  joined_date: "2018-04-10T00:00:00"
};

// Template for creating stories
const Template = (args) => <EditMemberModal {...args} />;

// Primary story - Complete member with all information
export const Default = Template.bind({});
Default.args = {
  member: completeMember,
};
Default.storyName = 'Complete Member Profile';
Default.parameters = {
  docs: {
    description: {
      story: 'Shows the modal with a complete member profile including all fields populated. This represents the most common use case where a member has provided comprehensive information.',
    },
  },
};

// Minimal member with only required fields
export const MinimalInformation = Template.bind({});
MinimalInformation.args = {
  member: minimalMember,
};
MinimalInformation.storyName = 'Minimal Member Information';
MinimalInformation.parameters = {
  docs: {
    description: {
      story: 'Displays the modal for a member with minimal information. Only first name, last name, and basic membership details are available. This scenario is common for members who haven\'t completed their full profile.',
    },
  },
};

// Executive member
export const ExecutiveMember = Template.bind({});
ExecutiveMember.args = {
  member: executiveMember,
};
ExecutiveMember.storyName = 'Executive-Member';
ExecutiveMember.parameters = {
  docs: {
    description: {
      story: 'Shows the modal for an executive member (Pastor) with leadership responsibilities. Notice the executive checkbox is checked and the office field shows "Senior Pastor".',
    },
  },
};

// New member
export const NewMember = Template.bind({});
NewMember.args = {
  member: newMember,
};
NewMember.storyName = 'New-Member';
NewMember.parameters = {
  docs: {
    description: {
      story: 'Displays the modal for a newly joined member. The "New Member" checkbox is checked, indicating they recently joined the church. This helps staff identify members who may need additional orientation.',
    },
  },
};

// Inactive member
export const InactiveMember = Template.bind({});
InactiveMember.args = {
  member: inactiveMember,
};
InactiveMember.storyName = 'Inactive-Member';
InactiveMember.parameters = {
  docs: {
    description: {
      story: 'Shows the modal for an inactive member. The "Active Member" checkbox is unchecked, and the office shows "Former Usher", indicating their previous role before becoming inactive.',
    },
  },
};

// Creating new member (empty form)
export const CreateNewMember = Template.bind({});
CreateNewMember.args = {
  member: null,
};
CreateNewMember.storyName = 'Create New-Member';
CreateNewMember.parameters = {
  docs: {
    description: {
      story: 'Shows the modal in create mode with empty fields. This is used when adding a completely new member to the system. All fields start empty except for default values.',
    },
  },
};

// With validation errors
export const WithValidationErrors = {
  render: () => {
    const [showModal, setShowModal] = React.useState(true);
    
    const memberWithErrors = {
      id: 6,
      first_name: "", // Empty to trigger validation
      last_name: "",  // Empty to trigger validation
      email: "invalid-email", // Invalid email format
      phone: "abc123", // Invalid phone format
      is_active: true,
      joined_date: "2024-01-01T00:00:00"
    };

    const handleSubmit = (data) => {
      console.log('Form submitted with data:', data);
      // Don't hide modal to show validation errors
    };

    return showModal ? (
      <EditMemberModal
        member={memberWithErrors}
        onSubmit={handleSubmit}
        onCancel={() => setShowModal(false)}
      />
    ) : (
      <div className="p-8 text-center">
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Show Modal with Validation Errors
        </button>
      </div>
    );
  },
  name: 'With Validation_Errors',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the modal\'s validation behavior. Try submitting the form to see validation errors for empty required fields and invalid email format.',
      },
    },
  },
};

// Interactive example with state management
export const InteractiveExample = {
  render: () => {
    const [showModal, setShowModal] = React.useState(false);
    const [currentMember, setCurrentMember] = React.useState(completeMember);
    const [message, setMessage] = React.useState('');

    const handleSubmit = (formData) => {
      setCurrentMember(formData);
      setMessage('Member information updated successfully!');
      setShowModal(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    };

    const handleCancel = () => {
      setShowModal(false);
      setMessage('Edit cancelled');
      setTimeout(() => setMessage(''), 2000);
    };

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-bold mb-4">Current Member Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {currentMember.first_name} {currentMember.last_name}</p>
              <p><strong>Email:</strong> {currentMember.email || 'Not provided'}</p>
              <p><strong>Phone:</strong> {currentMember.phone || 'Not provided'}</p>
              <p><strong>Status:</strong> 
                {currentMember.is_executive && ' Executive'} 
                {currentMember.is_new_member && ' New Member'} 
                {currentMember.is_active ? ' Active' : ' Inactive'}
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Member
            </button>
          </div>
          
          {message && (
            <div className={`p-4 rounded mb-4 ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {message}
            </div>
          )}
        </div>

        {showModal && (
          <EditMemberModal
            member={currentMember}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    );
  },
  name: 'Interactive_Example',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'A fully interactive example showing how the modal integrates with a parent component. You can edit member information and see the changes reflected in the main view.',
      },
    },
  },
};

// Responsive behavior demonstration
export const ResponsiveBehavior = {
  render: () => (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold mb-2">Responsive Design Test</h3>
        <p className="text-gray-600">The modal adapts to different screen sizes. Try resizing your browser window.</p>
      </div>
      <EditMemberModal
        member={completeMember}
        onSubmit={(data) => console.log('Submitted:', data)}
        onCancel={() => console.log('Cancelled')}
      />
    </div>
  ),
  name: 'ResponsiveBehavior',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Demonstrates how the modal responds to different screen sizes. The layout adjusts from a multi-column grid on desktop to a single column on mobile devices.',
      },
    },
  },
};