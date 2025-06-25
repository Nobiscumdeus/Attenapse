import{j as e}from"./jsx-runtime-D_zvdyIk.js";import"./iframe-DMhsdgcO.js";import{U as v,S as t}from"./StatCard-C-MwbeU9.js";import{c as u}from"./createLucideIcon-nNh83jiZ.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],p=u("activity",P);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],b=u("dollar-sign",B);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],g=u("eye",O);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],y=u("shopping-cart",W);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],d=u("trending-up",G),Y={title:"Components/StatCard",component:t,parameters:{docs:{description:{component:`
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
        `},inlineStories:!1,canvas:{sourceState:"shown"}},layout:"padded",backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"},{name:"dark",value:"#1a1a1a"},{name:"gray",value:"#f5f5f5"}]},viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"375px",height:"667px"}},tablet:{name:"Tablet",styles:{width:"768px",height:"1024px"}},desktop:{name:"Desktop",styles:{width:"1024px",height:"768px"}}}}},argTypes:{title:{control:{type:"text"},description:"The main title/label for the statistic",table:{type:{summary:"string"},defaultValue:{summary:"undefined"}}},value:{control:{type:"text"},description:"The primary value/number to display",table:{type:{summary:"string | number"},defaultValue:{summary:"undefined"}}},subtitle:{control:{type:"text"},description:"Optional subtitle text (often used for trends or additional context)",table:{type:{summary:"string"},defaultValue:{summary:"undefined"}}},icon:{control:{type:"select"},options:["TrendingUp","Users","DollarSign","Activity","ShoppingCart","Eye"],mapping:{TrendingUp:d,Users:v,DollarSign:b,Activity:p,ShoppingCart:y,Eye:g},description:"Icon component to display (Lucide React icons)",table:{type:{summary:"React.Component"},defaultValue:{summary:"undefined"}}},color:{control:{type:"select"},options:["red","blue","green","yellow","purple","pink","indigo","gray"],description:"Color theme for the card (affects background, text, and icon colors)",table:{type:{summary:"string"},defaultValue:{summary:"red"}}}},args:{title:"Total Sales",value:"1,234",subtitle:"+12% from last month",icon:d,color:"blue"}},m=q=>e.jsx(t,{...q}),r=m.bind({});r.args={};const a=()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",children:[e.jsx(t,{title:"Revenue",value:"$45,231",subtitle:"+20.1% from last month",icon:b,color:"green"}),e.jsx(t,{title:"Users",value:"2,350",subtitle:"+180.1% from last month",icon:v,color:"blue"}),e.jsx(t,{title:"Sales",value:"12,234",subtitle:"+19% from last month",icon:y,color:"purple"}),e.jsx(t,{title:"Active Now",value:"573",subtitle:"+201 since last hour",icon:p,color:"red"})]}),s=m.bind({});s.args={title:"Page Views",value:"89,432",icon:g,color:"indigo",subtitle:void 0};const l=m.bind({});l.args={title:"Total Downloads",value:"1,234,567",subtitle:"+5.4% from last quarter",icon:d,color:"green"};const i=m.bind({});i.args={title:"Bounce Rate",value:"2.4%",subtitle:"-0.5% from last month",icon:p,color:"red"};const n=m.bind({});n.args={title:"Custom Metric",value:"999",subtitle:"Custom subtitle here",icon:d,color:"blue"};const o=()=>e.jsxs("div",{className:"p-6 bg-gray-50 min-h-screen",children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900 mb-6",children:"Analytics Dashboard"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsx(t,{title:"Total Revenue",value:"$45,231.89",subtitle:"+20.1% from last month",icon:b,color:"green"}),e.jsx(t,{title:"Subscriptions",value:"+2350",subtitle:"+180.1% from last month",icon:v,color:"blue"}),e.jsx(t,{title:"Sales",value:"+12,234",subtitle:"+19% from last month",icon:y,color:"purple"}),e.jsx(t,{title:"Active Now",value:"+573",subtitle:"+201 since last hour",icon:p,color:"red"})]})]});o.parameters={layout:"fullscreen"};const c=()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"grid grid-cols-1 gap-4",children:e.jsx(t,{title:"Mobile View",value:"100%",subtitle:"Single column",icon:g,color:"blue"})}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(t,{title:"Tablet",value:"50%",subtitle:"Two columns",icon:v,color:"green"}),e.jsx(t,{title:"View",value:"50%",subtitle:"Layout test",icon:p,color:"purple"})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-4",children:[e.jsx(t,{title:"Desktop",value:"25%",icon:b,color:"red"}),e.jsx(t,{title:"Four",value:"25%",icon:y,color:"blue"}),e.jsx(t,{title:"Column",value:"25%",icon:d,color:"green"}),e.jsx(t,{title:"Layout",value:"25%",icon:g,color:"purple"})]})]});a.__docgenInfo={description:"",methods:[],displayName:"ColorVariants"};o.__docgenInfo={description:"",methods:[],displayName:"DashboardLayout"};c.__docgenInfo={description:"",methods:[],displayName:"ResponsiveTest"};var h,S,f;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:"args => <StatCard {...args} />",...(f=(S=r.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var x,C,N;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">\r
    <StatCard title="Revenue" value="$45,231" subtitle="+20.1% from last month" icon={DollarSign} color="green" />\r
    <StatCard title="Users" value="2,350" subtitle="+180.1% from last month" icon={Users} color="blue" />\r
    <StatCard title="Sales" value="12,234" subtitle="+19% from last month" icon={ShoppingCart} color="purple" />\r
    <StatCard title="Active Now" value="573" subtitle="+201 since last hour" icon={Activity} color="red" />\r
  </div>`,...(N=(C=a.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var j,T,w;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:"args => <StatCard {...args} />",...(w=(T=s.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var k,D,_;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:"args => <StatCard {...args} />",...(_=(D=l.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var A,L,R;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:"args => <StatCard {...args} />",...(R=(L=i.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var U,V,M;n.parameters={...n.parameters,docs:{...(U=n.parameters)==null?void 0:U.docs,source:{originalSource:"args => <StatCard {...args} />",...(M=(V=n.parameters)==null?void 0:V.docs)==null?void 0:M.source}}};var $,I,E;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`() => <div className="p-6 bg-gray-50 min-h-screen">\r
    <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h1>\r
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">\r
      <StatCard title="Total Revenue" value="$45,231.89" subtitle="+20.1% from last month" icon={DollarSign} color="green" />\r
      <StatCard title="Subscriptions" value="+2350" subtitle="+180.1% from last month" icon={Users} color="blue" />\r
      <StatCard title="Sales" value="+12,234" subtitle="+19% from last month" icon={ShoppingCart} color="purple" />\r
      <StatCard title="Active Now" value="+573" subtitle="+201 since last hour" icon={Activity} color="red" />\r
    </div>\r
  </div>`,...(E=(I=o.parameters)==null?void 0:I.docs)==null?void 0:E.source}}};var z,F,H;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`() => <div className="space-y-4">\r
    <div className="grid grid-cols-1 gap-4">\r
      <StatCard title="Mobile View" value="100%" subtitle="Single column" icon={Eye} color="blue" />\r
    </div>\r
    <div className="grid grid-cols-2 gap-4">\r
      <StatCard title="Tablet" value="50%" subtitle="Two columns" icon={Users} color="green" />\r
      <StatCard title="View" value="50%" subtitle="Layout test" icon={Activity} color="purple" />\r
    </div>\r
    <div className="grid grid-cols-4 gap-4">\r
      <StatCard title="Desktop" value="25%" icon={DollarSign} color="red" />\r
      <StatCard title="Four" value="25%" icon={ShoppingCart} color="blue" />\r
      <StatCard title="Column" value="25%" icon={TrendingUp} color="green" />\r
      <StatCard title="Layout" value="25%" icon={Eye} color="purple" />\r
    </div>\r
  </div>`,...(H=(F=c.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};const Z=["Default","ColorVariants","WithoutSubtitle","LargeNumbers","NegativeTrend","Playground","DashboardLayout","ResponsiveTest"];export{a as ColorVariants,o as DashboardLayout,r as Default,l as LargeNumbers,i as NegativeTrend,n as Playground,c as ResponsiveTest,s as WithoutSubtitle,Z as __namedExportsOrder,Y as default};
