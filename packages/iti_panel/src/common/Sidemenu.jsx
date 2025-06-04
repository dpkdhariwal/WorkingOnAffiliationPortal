
export const MENUITEMS = [
	{
		menutitle: "DASHBOARD",
	},
	{
		path: `${import.meta.env.BASE_URL}dashboard/dashboard`, title: "Dashboard", icon: 'ti-home', type: "link", active: false, selected: false, dirchange: false
	},
	{
		menutitle: "NEW REGISTRATION",
	},
	{
		path: `${import.meta.env.BASE_URL}dashboard/new_registration`, title: "New Application", icon: 'ti-file', type: "link", active: false, selected: false, dirchange: false
	},
	{
		path: `${import.meta.env.BASE_URL}dashboard/form_stageII`, title: "stage II Form", icon: 'ti-file', type: "link", active: false, selected: false, dirchange: false
	},

	{
		menutitle: "Example",
	},
	{
		path: `${import.meta.env.BASE_URL}dashboard/geoTaggedSample`, title: "Geo Tagged Sample", icon: 'ti-file', type: "link", active: false, selected: false, dirchange: false
	},
	{
		menutitle: "Assessment",
	},
	{
		path: `${import.meta.env.BASE_URL}dashboard/Assessment`, title: "Assessment", icon: 'ti-file', type: "link", active: false, selected: false, dirchange: false
	},
	{
		path: `${import.meta.env.BASE_URL}dashboard/AssessmentII`, title: "AssessmentII", icon: 'ti-file', type: "link", active: false, selected: false, dirchange: false
	},
	{
		path: `${import.meta.env.BASE_URL}dashboard/TimeLine`, title: "TimeLine", icon: 'ti-file', type: "link", active: false, selected: false, dirchange: false
	},

	

];