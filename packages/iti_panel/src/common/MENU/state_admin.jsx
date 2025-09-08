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
  //STATE ADMIN
  {
    allowTo: ["state_admin"],
    menutitle: "DASHBOARD",
    menuGroup: "dashboard",
  },
  {
    allowTo: ["state_admin"],
    path: `${import.meta.env.BASE_URL}dashboard/state_admin`,
    title: "Dashboard",
    icon: "ti-home",
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
    menuGroup: "dashboard",
  },

  {
    allowTo: ["state_admin"],
    title: "Members",
    icon: 'ti-wallet',
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    children: [
      { path: 'member-list', type: "link", active: false, selected: false, dirchange: false, title: "Member List" },
      { path: 'add-new-member', type: "link", active: false, selected: false, dirchange: false, title: "Add New Member" },
    ],
  },


];
export default MENUITEMS;