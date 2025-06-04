
export const MENUITEMS = [
	{
		menutitle: "DASHBOARD",
	},
	{
		path: `${import.meta.env.BASE_URL}dashboard/dashboard`, title: "Dashboard", icon: 'ti-home', type: "link", active: false, selected: false, dirchange: false
	},

	// {
	// 	title: "Submenu", icon: 'ti-menu', type: "sub", active: false, selected: false, dirchange: false, children: [
	// 		{ path: '#Submenu-01', type: "link", active: false, selected: false, dirchange: false, title: "Submenu-01" },
	// 		{
	// 			title: "Submenu-02", type: "sub", active: false, selected: false, dirchange: false, children: [
	// 				{ path: '#Level-01', type: "link", active: false, selected: false, dirchange: false, title: "Level-01" },
	// 				{
	// 					title: "Level-02", type: "sub", active: false, selected: false, dirchange: false, children: [
	// 						{ path: '#Level-11', type: "link", active: false, selected: false, dirchange: false, title: "Level-11" },
	// 						{ path: '#Level-12', type: "link", active: false, selected: false, dirchange: false, title: "Level-12" },
	// 					],
	// 				},
	// 			],
	// 		},
	// 	],
	// },
	// {
	// 	title: "Authentication", icon: 'ti-lock', type: "sub", active: false, selected: false, dirchange: false, children: [
	// 		{ path: `${import.meta.env.BASE_URL}custompages/error505`, type: "link", active: false, selected: false, dirchange: false, title: "Error505" },
	// 	],
	// },
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

	

];