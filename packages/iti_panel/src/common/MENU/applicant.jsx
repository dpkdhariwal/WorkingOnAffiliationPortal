export const MENUITEMS = [
  {
    allowTo: ["applicant"],
    menutitle: "DASHBOARD",
    menuGroup: "dashboard",
  },
  {

    allowTo: ["applicant"],
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
    allowTo: ["applicant"],
    menutitle: "NEW REGISTRATION",
    menuGroup: "new_registration",
  },
  {
    allowTo: ["applicant"],
    path: `${import.meta.env.BASE_URL}dashboard/Application`,
    title: "Application",
    icon: "ti-file",
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
    menuGroup: "new_registration",
  },
  {
    allowTo: ["applicant"],
    menutitle: "Applications",
    menuGroup: "app_list",
  },

  {
    allowTo: ["applicant"],
    path: `${import.meta.env.BASE_URL}dashboard/AppList`,
    title: "All Applications",
    icon: "ti-file",
    type: "link",
    active: false,
    selected: false,
    dirchange: false,
    menuGroup: "app_list",
  }
];
export default MENUITEMS;