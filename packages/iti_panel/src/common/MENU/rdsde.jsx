export const MENUITEMS = [
  {
    menutitle: "DASHBOARD",
    menuGroup: "dashboard",
  },
  {

    path: `${import.meta.env.BASE_URL}dashboard`,
    title: "Dashboard",
    icon: "ti-home",
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
    menuGroup: "dashboard",
  },

  {
    menutitle: "Applications",
    menuGroup: "app_list",
  },
  
  {
    path: `${import.meta.env.BASE_URL}dashboard/AppList`,
    title: "All Applications",
    icon: "ti-file",
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
    menuGroup: "app_list",
  },

  // RDSDE
  {
    allowTo: ["rdsde"],
    menutitle: "DASHBOARD",
    menuGroup: "dashboard",
  },
  {
    allowTo: ["rdsde"],
    path: `${import.meta.env.BASE_URL}dashboard/rdsde`,
    title: "Dashboard",
    icon: "ti-home",
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
    menuGroup: "dashboard",
  },
  {
    allowTo: ["rdsde"],
    path: `${import.meta.env.BASE_URL}dashboard/rdsde/compliances`,
    title: "Compliances",
    icon: "ti-home",
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
    menuGroup: "dashboard",
  },

  {
    allowTo: ["rdsde"],
    title: "Members",
    icon: 'ti-wallet',
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,

    children: [
      { path: `${import.meta.env.BASE_URL}dashboard/rdsde/AddIcvcMember`, type: "link", active: false, selected: false, dirchange: false, title: "Add ICVC Member" },
      { path: `${import.meta.env.BASE_URL}dashboard/rdsde/MemberList`, type: "link", active: false, selected: false, dirchange: false, title: "Member List" },

    ],
  },
];
export default MENUITEMS;