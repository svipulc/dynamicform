interface sidebarLabelType {
  label: string;
  route: string;
  imgURL: string;
}

export const sidebarLinks: sidebarLabelType[] = [
  {
    label: "Home",
    route: "/",
    imgURL: "/Home.svg",
  },
  {
    label: "Admin",
    route: "/admin",
    imgURL: "/admin.png",
  },
  {
    label: "User",
    route: "/user",
    imgURL: "/user.png",
  },
];

export interface OptionType {
  label: string;
  value: string;
}

export interface formData {
  tag: string;
  label: string;
  type?: string;
  text?: string;
  placeholder?: string;
  options?: OptionType[];
  fields?: formData[]; // subfields name for storing in local storage
}

export const DummyFormData: formData[] = [
  {
    tag: "fields",
    label: "Name",
    fields: [
      {
        tag: "input",
        label: "First Name",
        text: "firstName",
        type: "text",
      },
      {
        tag: "input",
        label: "Last Name",
        text: "lastName",
        type: "text",
      },
    ],
  },
  {
    tag: "input",
    label: "email",
    type: "email",
  },
  {
    tag: "input",
    label: "password",
    type: "password",
  },

  {
    tag: "switch",
    label: "Enable your Two Factor",
    type: "",
  },
  {
    tag: "fields",
    label: "address",
    fields: [
      {
        tag: "input",
        label: "Line 1",
        text: "line1",
        type: "text",
      },
      {
        tag: "input",
        label: "Line 2",
        text: "line2",
        type: "text",
      },
    ],
  },

  {
    tag: "select",
    label: "Select Your Steck ",
    type: "stack",
    options: [
      {
        label: "Developer",
        value: "developer",
      },
      {
        label: "Designer",
        value: "designer",
      },
    ],
  },

  // all ways on last in form
  {
    tag: "button",
    label: "Submit",
    type: "submit",
  },
];

// export const DummyFormData2 = [
//   {
//     fields: [
//       {
//         component: "field_group",

//         label: "Name",

//         _uid: "eb169f76-4cd9-4513-b673-87c5c7d27e02",

//         fields: [
//           {
//             component: "text",

//             label: "First Name",

//             type: "text",

//             _uid: "5b9b79d2-32f2-42a1-b89f-203dfc0b6b98",
//           },

//           {
//             component: "text",

//             label: "Last Name",

//             type: "text",

//             _uid: "6eff3638-80a7-4427-b07b-4c1be1c6b186",
//           },
//         ],
//       },

//       {
//         component: "text",

//         label: "Email",

//         type: "email",

//         _uid: "7f885969-f8ba-40b9-bf5d-0d57bc9c6a8d",
//       },

//       {
//         component: "text",

//         label: "Phone",

//         type: "text",

//         _uid: "f61233e8-565e-43d0-9c14-7d7f220c6020",
//       },
//     ],
//   },
// ];
