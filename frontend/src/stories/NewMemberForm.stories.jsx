import React from 'react';


import NewMemberForm from '../components/NewMemberForm';

export default {
  title: 'Components/NewMemberForm',
  component: NewMemberForm,
  args: {},
}

const Template = (args) => <NewMemberForm {...args} />;

export const Story = Template.bind({});
Story.args = {};
Story.parameters = {
  docs: {
    description: {
      story: 'A form component for adding new members, including fields for personal information and a submit button.',
    },
  },
};