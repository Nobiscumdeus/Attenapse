import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{e as g}from"./iframe-DMhsdgcO.js";import{E as u}from"./EditModal-Pr4Jyrab.js";import"./createLucideIcon-nNh83jiZ.js";import"./user-uaGvAcwb.js";const oe={title:"Components/Modals/EditMemberModal",component:u,parameters:{layout:"fullscreen",docs:{description:{component:`
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
        `}}},argTypes:{member:{description:"Member object containing all the member information",control:{type:"object"}},onSubmit:{description:"Callback function called when form is submitted",action:"submitted"},onCancel:{description:"Callback function called when modal is cancelled",action:"cancelled"}}},M={id:1,first_name:"John",last_name:"Doe",email:"john.doe@example.com",phone:"+234-800-123-4567",address:"123 Church Street, Victoria Island, Lagos, Nigeria",emergency_contact:"+234-800-987-6543",date_of_birth:"1990-05-15T00:00:00",sex:"Male",is_executive:!0,office:"Youth Leader",is_new_member:!1,is_active:!0,joined_date:"2020-01-15T00:00:00"},K={id:2,first_name:"Jane",last_name:"Smith",is_active:!0,joined_date:"2023-08-20T00:00:00"},Q={id:3,first_name:"Pastor",last_name:"Williams",email:"pastor.williams@church.org",phone:"+234-701-234-5678",address:"45 Sanctuary Road, Ikeja, Lagos, Nigeria",emergency_contact:"+234-701-876-5432",date_of_birth:"1975-03-22T00:00:00",sex:"Male",is_executive:!0,office:"Senior Pastor",is_new_member:!1,is_active:!0,joined_date:"2010-06-01T00:00:00"},X={id:4,first_name:"Sarah",last_name:"Johnson",email:"sarah.johnson@gmail.com",phone:"+234-802-345-6789",date_of_birth:"1995-11-08T00:00:00",sex:"Female",is_executive:!1,office:"",is_new_member:!0,is_active:!0,joined_date:"2024-12-01T00:00:00"},Z={id:5,first_name:"Michael",last_name:"Brown",email:"michael.brown@yahoo.com",phone:"+234-803-456-7890",address:"78 Grace Avenue, Surulere, Lagos, Nigeria",emergency_contact:"+234-803-987-6543",date_of_birth:"1988-07-12T00:00:00",sex:"Male",is_executive:!1,office:"Former Usher",is_new_member:!1,is_active:!1,joined_date:"2018-04-10T00:00:00"},c=t=>e.jsx(u,{...t}),a=c.bind({});a.args={member:M};a.storyName="Complete Member Profile";a.parameters={docs:{description:{story:"Shows the modal with a complete member profile including all fields populated. This represents the most common use case where a member has provided comprehensive information."}}};const s=c.bind({});s.args={member:K};s.storyName="Minimal Member Information";s.parameters={docs:{description:{story:"Displays the modal for a member with minimal information. Only first name, last name, and basic membership details are available. This scenario is common for members who haven't completed their full profile."}}};const o=c.bind({});o.args={member:Q};o.storyName="Executive-Member";o.parameters={docs:{description:{story:'Shows the modal for an executive member (Pastor) with leadership responsibilities. Notice the executive checkbox is checked and the office field shows "Senior Pastor".'}}};const i=c.bind({});i.args={member:X};i.storyName="New-Member";i.parameters={docs:{description:{story:'Displays the modal for a newly joined member. The "New Member" checkbox is checked, indicating they recently joined the church. This helps staff identify members who may need additional orientation.'}}};const n=c.bind({});n.args={member:Z};n.storyName="Inactive-Member";n.parameters={docs:{description:{story:'Shows the modal for an inactive member. The "Active Member" checkbox is unchecked, and the office shows "Former Usher", indicating their previous role before becoming inactive.'}}};const m=c.bind({});m.args={member:null};m.storyName="Create New-Member";m.parameters={docs:{description:{story:"Shows the modal in create mode with empty fields. This is used when adding a completely new member to the system. All fields start empty except for default values."}}};const p={render:()=>{const[t,d]=g.useState(!0),r={id:6,first_name:"",last_name:"",email:"invalid-email",phone:"abc123",is_active:!0,joined_date:"2024-01-01T00:00:00"},v=l=>{console.log("Form submitted with data:",l)};return t?e.jsx(u,{member:r,onSubmit:v,onCancel:()=>d(!1)}):e.jsx("div",{className:"p-8 text-center",children:e.jsx("button",{className:"bg-blue-600 text-white px-4 py-2 rounded",onClick:()=>d(!0),children:"Show Modal with Validation Errors"})})},name:"With Validation_Errors",parameters:{docs:{description:{story:"Demonstrates the modal's validation behavior. Try submitting the form to see validation errors for empty required fields and invalid email format."}}}},b={render:()=>{const[t,d]=g.useState(!1),[r,v]=g.useState(M),[l,h]=g.useState(""),H=G=>{v(G),h("Member information updated successfully!"),d(!1),setTimeout(()=>h(""),3e3)},$=()=>{d(!1),h("Edit cancelled"),setTimeout(()=>h(""),2e3)};return e.jsxs("div",{className:"min-h-screen bg-gray-100 p-8",children:[e.jsxs("div",{className:"max-w-2xl mx-auto",children:[e.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6 mb-4",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Current Member Information"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Name:"})," ",r.first_name," ",r.last_name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",r.email||"Not provided"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",r.phone||"Not provided"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Status:"}),r.is_executive&&" Executive",r.is_new_member&&" New Member",r.is_active?" Active":" Inactive"]})]}),e.jsx("button",{onClick:()=>d(!0),className:"mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",children:"Edit Member"})]}),l&&e.jsx("div",{className:`p-4 rounded mb-4 ${l.includes("successfully")?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}`,children:l})]}),t&&e.jsx(u,{member:r,onSubmit:H,onCancel:$})]})},name:"Interactive_Example",parameters:{layout:"fullscreen",docs:{description:{story:"A fully interactive example showing how the modal integrates with a parent component. You can edit member information and see the changes reflected in the main view."}}}},f={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Responsive Design Test"}),e.jsx("p",{className:"text-gray-600",children:"The modal adapts to different screen sizes. Try resizing your browser window."})]}),e.jsx(u,{member:M,onSubmit:t=>console.log("Submitted:",t),onCancel:()=>console.log("Cancelled")})]}),name:"ResponsiveBehavior",parameters:{viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Demonstrates how the modal responds to different screen sizes. The layout adjusts from a multi-column grid on desktop to a single column on mobile devices."}}}};var w,x,y;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:"args => <EditMemberModal {...args} />",...(y=(x=a.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var _,S,N;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:"args => <EditMemberModal {...args} />",...(N=(S=s.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var j,E,T;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:"args => <EditMemberModal {...args} />",...(T=(E=o.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var C,I,k;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:"args => <EditMemberModal {...args} />",...(k=(I=i.parameters)==null?void 0:I.docs)==null?void 0:k.source}}};var D,R,A;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:"args => <EditMemberModal {...args} />",...(A=(R=n.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var V,P,z;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:"args => <EditMemberModal {...args} />",...(z=(P=m.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var W,F,B;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const [showModal, setShowModal] = React.useState(true);
    const memberWithErrors = {
      id: 6,
      first_name: "",
      // Empty to trigger validation
      last_name: "",
      // Empty to trigger validation
      email: "invalid-email",
      // Invalid email format
      phone: "abc123",
      // Invalid phone format
      is_active: true,
      joined_date: "2024-01-01T00:00:00"
    };
    const handleSubmit = data => {
      console.log('Form submitted with data:', data);
      // Don't hide modal to show validation errors
    };
    return showModal ? <EditMemberModal member={memberWithErrors} onSubmit={handleSubmit} onCancel={() => setShowModal(false)} /> : <div className="p-8 text-center">\r
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>\r
          Show Modal with Validation Errors\r
        </button>\r
      </div>;
  },
  name: 'With Validation_Errors',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the modal\\'s validation behavior. Try submitting the form to see validation errors for empty required fields and invalid email format.'
      }
    }
  }
}`,...(B=(F=p.parameters)==null?void 0:F.docs)==null?void 0:B.source}}};var L,q,J;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    const [showModal, setShowModal] = React.useState(false);
    const [currentMember, setCurrentMember] = React.useState(completeMember);
    const [message, setMessage] = React.useState('');
    const handleSubmit = formData => {
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
    return <div className="min-h-screen bg-gray-100 p-8">\r
        <div className="max-w-2xl mx-auto">\r
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">\r
            <h2 className="text-xl font-bold mb-4">Current Member Information</h2>\r
            <div className="space-y-2 text-sm">\r
              <p><strong>Name:</strong> {currentMember.first_name} {currentMember.last_name}</p>\r
              <p><strong>Email:</strong> {currentMember.email || 'Not provided'}</p>\r
              <p><strong>Phone:</strong> {currentMember.phone || 'Not provided'}</p>\r
              <p><strong>Status:</strong> \r
                {currentMember.is_executive && ' Executive'} \r
                {currentMember.is_new_member && ' New Member'} \r
                {currentMember.is_active ? ' Active' : ' Inactive'}\r
              </p>\r
            </div>\r
            <button onClick={() => setShowModal(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">\r
              Edit Member\r
            </button>\r
          </div>\r
          \r
          {message && <div className={\`p-4 rounded mb-4 \${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}\`}>\r
              {message}\r
            </div>}\r
        </div>\r
\r
        {showModal && <EditMemberModal member={currentMember} onSubmit={handleSubmit} onCancel={handleCancel} />}\r
      </div>;
  },
  name: 'Interactive_Example',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'A fully interactive example showing how the modal integrates with a parent component. You can edit member information and see the changes reflected in the main view.'
      }
    }
  }
}`,...(J=(q=b.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var O,U,Y;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <div className="text-center mb-8">\r
        <h3 className="text-lg font-semibold mb-2">Responsive Design Test</h3>\r
        <p className="text-gray-600">The modal adapts to different screen sizes. Try resizing your browser window.</p>\r
      </div>\r
      <EditMemberModal member={completeMember} onSubmit={data => console.log('Submitted:', data)} onCancel={() => console.log('Cancelled')} />\r
    </div>,
  name: 'ResponsiveBehavior',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Demonstrates how the modal responds to different screen sizes. The layout adjusts from a multi-column grid on desktop to a single column on mobile devices.'
      }
    }
  }
}`,...(Y=(U=f.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};const ie=["Default","MinimalInformation","ExecutiveMember","NewMember","InactiveMember","CreateNewMember","WithValidationErrors","InteractiveExample","ResponsiveBehavior"];export{m as CreateNewMember,a as Default,o as ExecutiveMember,n as InactiveMember,b as InteractiveExample,s as MinimalInformation,i as NewMember,f as ResponsiveBehavior,p as WithValidationErrors,ie as __namedExportsOrder,oe as default};
