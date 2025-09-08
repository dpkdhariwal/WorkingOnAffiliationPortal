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
];
export default MENUITEMS;