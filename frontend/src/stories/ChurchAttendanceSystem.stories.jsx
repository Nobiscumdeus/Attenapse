import ChurchAttendanceSystem from "../components/Home";

/**
 * Storybook documentation for the Church Attendance System
 * 
 * This documents the main application component and its key features
 */

export default{
    title:'Bethel Church/Church Attendance System',
    component:ChurchAttendanceSystem,
    parameters:{
        //Optional 
        layout:'fullscreen',
        docs:{
            description:{
                component:"The Church Attendance System allows members to check in and out, view attendance records, and manage member information. It includes features for both regular and new members, with real-time updates and notifications.",

            }
        }
    }
}

//Template for creating stories
const Template =(args) =><ChurchAttendanceSystem {...args} />;

/**
 * Default view of the application
 * Shows the system in its initial state
 */

export const Default=Template.bind();
Default.storyName='Default View';


/**
 * Dashboard View
 * Demonstrates the dashboard tab with sample data
 */

export const DashboardView = Template.bind({});

DashboardView.storyName='Dashboard Tab';

DashboardView.parameters={
     // Mock the initial state to show dashboard
  initialState: {
    activeTab: "dashboard",
    stats: {
      total_members: 125,
      new_members: 15,
      today_attendance: 87,
      attendance_percentage: 70
    }
  }
}

/**
 * Member Management View
 * Shows the members tab with sample data
 */

export const MemberManagement = Template.bind({});
MemberManagement.storyName = 'Members Tab';
MemberManagement.parameters = {
  initialState: {
    activeTab: "members",
    members: [
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        is_new_member: false,
        is_active: true,
        joined_date: "2023-01-15"
      },
      // Add more sample members as needed
    ]
  }
};

/**
 * Attendance View
 * Shows the attendance marking interface
 */
export const AttendanceView = Template.bind({});
AttendanceView.storyName = 'Attendance Tab';
AttendanceView.parameters = {
  initialState: {
    activeTab: "attendance",
    members: [
      // Sample members data
    ],
    attendance: [
      // Sample attendance data
    ]
  }
};