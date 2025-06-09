let initialState = {
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
          assignedTo: "applicant",
          actionsAllow: [
            {
              action: "form-submit",
              actionName: "Fill Application Stage-I Form",
              assignedTo: "applicant",
            },
          ],
        },
      ],
    },
    {
      stage: "NOC",
      subStages: [
        {
          title: "No Objection Certificate (NOC) by State Directorate",
          Subtitle: "NOC Issuance Penidng",
          desc: "State Directorate has to Generate NOC",
          status: "Pending",
          assignedDateTime: "2025-08-20 13:24:00",
          assignedTo: "state_assessor",
          actionsAllow: [
            {
              action: "view-application",
              actionName: "View Application",
              assignedTo: "state_assessor",
            },
            {
              action: "generate-noc",
              actionName: "Generate NOC",
              assignedTo: "state_assessor",
            },
          ],
        },
      ],
    },
    {
      stage: "Desktop Assessment",
      subStages: [
        {
          title: "Desktop Assessment",
          Subtitle: "Desktop Assessment",
          desc: "Under Development",
          status: "Pending",
          assignedDateTime: "2025-08-20 13:24:00",
          assignedTo: "state_assessor",
          actionsAllow: [
            {
              action: "view-application",
              actionName: "View Application",
              assignedTo: "state_assessor",
            },
            {
              action: "generate-noc",
              actionName: "Generate NOC",
              assignedTo: "state_assessor",
            },
          ],
        },
      ],
    },
    {
      stage: "RDSDE",
      subStages: [
        {
          title: "RDSDE",
          Subtitle: "RDSDE",
          desc: "Under Development",
          status: "Pending",
          assignedDateTime: "2025-08-20 13:24:00",
          assignedTo: "state_assessor",
          actionsAllow: [
            {
              action: "view-application",
              actionName: "View Application",
              assignedTo: "state_assessor",
            },
            {
              action: "generate-noc",
              actionName: "Generate NOC",
              assignedTo: "state_assessor",
            },
          ],
        },
      ],
    },
    {
      stage: "DGT",
      subStages: [
        {
          title: "DGT",
          Subtitle: "DGT",
          desc: "Under Development",
          status: "Pending",
          assignedDateTime: "2025-08-20 13:24:00",
          assignedTo: "state_assessor",
          actionsAllow: [
            {
              action: "view-application",
              actionName: "View Application",
              assignedTo: "state_assessor",
            },
            {
              action: "generate-noc",
              actionName: "Generate NOC",
              assignedTo: "state_assessor",
            },
          ],
        },
      ],
    },
  ],
};

const TimeLine = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "setAsSubmitApplicationStageI":
      state = {
        ...state,
        timeline: state.timeline.map((stage) =>
          stage.stage === "Stage-I"
            ? {
                ...stage,
                subStages: stage.subStages.map((sub) =>
                  sub.title === "Stage-I Applcation"
                    ? { ...sub, status: "Completed" }
                    : sub
                ),
              }
            : stage
        ),
      };

      var obj = {
        stage: "NOC",
        subStages: [
          {
            title: "No Objection Certificate (NOC) by State Directorate",
            Subtitle: "NOC Issuance Penidng",
            desc: "State Directorate has to Generate NOC",
            status: "Pending",
            assignedDateTime: "2025-08-20 13:24:00",
            assignedTo: "state_assessor",
            actionsAllow: [
              {
                action: "view-application",
                actionName: "View Application",
                assignedTo: "state_assessor",
              },
              {
                action: "generate-noc",
                actionName: "Generate NOC",
                assignedTo: "state_assessor",
              },
            ],
          },
        ],
      };

      state.timeline.push(obj);

      return state;

    default:
      return state;
  }
};

export default TimeLine;
