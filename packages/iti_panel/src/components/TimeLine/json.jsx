export const ApplicationFlow = [
  {
    title: "Stage-I Applcation",
    Subtitle: "Stage-I pending",
    desc: "Applicant Has to fill Stage-I Applcation Before Due Date 20/12/2025",
    stage: "Stage-I",
    status: "completed", //  pending | completed
    pending_at: null,
    moreInfo: {},
    action: "not-allow",
  },
  {
    title: "NOC Clearance",
    Subtitle: "",
    desc: "Applicant Has to fill Stage-I Applcation Before Due Date 20/12/2025",
    stage: "Stage-II",
    status: "pending", //  pending | completed
    pending_at: "state",
    moreInfo: {},
    action: "allow",
  },
];

export const AppFlow = {
  applicationId: "APP123",
  timeline: [
    {
      stage: "Stage-I",
      subStages: [
        {
          title: "Stage-I Applcation",
          Subtitle: "Stage-I pending",
          desc: "Stage-I Form Filing",
          status: "Pending", // Pending | Completed
          assignedDateTime: "2025-08-20 13:24:00",
          actionsAllow: [
            {
              action: "form-submit",
              actionName: "Fill Application Stage-I Form",
              assignedTo: "Applicant",
            },
          ],
        },
      ],
    },
    
    // {
    //   stage: "NOC",
    //   subStages: [
    //     {
    //       title: "No Objection Certificate (NOC) by State Directorate",
    //       Subtitle: "NOC Issuance Penidng",
    //       desc: "State Directorate has to Generate NOC",
    //       status: "pending", // Pending | NOC Issued | NOC Rejected | NOC Objection
    //       assignedDateTime: "2025-08-20 13:24:00",
    //       assignedTo: "state",
    //       actions: [
    //         "view-application",
    //         "generate-noc",
    //         "noc-rejected",
    //         "noc-objection",
    //       ],
    //     },
    //   ],
    // },
    // {
    //   stage: "Stage-II",
    //   status: "Pending",
    //   subStages: [],
    // },
  ],
};
