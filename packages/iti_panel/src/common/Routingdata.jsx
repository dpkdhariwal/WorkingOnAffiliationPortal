import Dashboard from "./../components/dashboard/Dashboard";
// import New_registration from './../components/new_registration/new_registration';

// Applicant Screens
import { Start, SelectCategory } from "../screens/Applicant/Application";

import New_registration from "../components/new_registration/new_registration";

import Form_stageII from "../components/new_registration/form_stageII";

import GeoTaggedPhoto from "../components/geotagged";

import Assessment from "../components/Assessment/Assessment";
import AssessmentII from "../components/Assessment/AssessmentII";
import AssessmentI from "../components/Assessment/AssessmentI";

import { TimeLine } from "../components/TimeLine/TimeLine";
import {TimeLineFinalTest} from "../screens/TimeLine"
import RdDashboard from "../../../ui_layouts_collaborate/src/components/Assessment/RdDashboard";
import Compliance from "../../../ui_layouts_collaborate/src/components/Assessment/Compliance";
import StateDashboard from "../../../ui_layouts_collaborate/src/components/Assessment/StateDashboard";
import AddIcMember from "../../../ui_layouts_collaborate/src/components/Assessment/AddIcMember";

import RdUser from "../../../ui_layouts_collaborate/src/components/Assessment/RdUser";
import ViewApplicationStageOne from "../components/new_registration/application_view_stage_1";
export const Routedata = [
  {
    id: 1,
    path: `${import.meta.env.BASE_URL}dashboard/`,
    elementName: <Dashboard />,
    children: [
      {
        allowTo: "applicant",
        id: 1,
        path: `Application`,
        elementName: <Start />,
      },
      {
        id: 1,
        path: `new_registration`,
        elementName: <New_registration />,
      },
      {
        id: 1,
        path: `application_stage_1_form`,
        elementName: <ViewApplicationStageOne />,
      },
      {
        id: 1,
        path: `form_stageII`,
        elementName: <Form_stageII />,
      },
      {
        id: 1,
        path: `geoTaggedSample`,
        elementName: <GeoTaggedPhoto />,
      },
      {
        allowTo: "applicant",
        id: 1,
        path: `Assessment`,
        elementName: <Assessment />,
      },
      {
        id: 1,
        path: `AssessmentI`,
        elementName: <AssessmentI />,
      },
      {
        id: 1,
        path: `AssessmentII`,
        elementName: <AssessmentII />,
      },
      {
        id: 1,
        path: `TimeLine`,
        elementName: <TimeLine />,
      },
      {
        id: 1,
        path: `TestTime`,
        elementName: <TimeLineFinalTest />,
      },
      {
        id: 1,
        path: `rdsde`,
        elementName: <RdDashboard />,
      },
      {
        id: 1,
        path: `rdsde/compliances`,
        elementName: <Compliance />,
      },
      {
        id: 1,
        path: `rdsde/AddIcvcMember`,
        elementName: <AddIcMember />,
      },
      {
        id: 1,
        path: `rdsde/MemberList`,
        elementName: <RdUser />,
      },

      // State Admin
      {
        id: 1,
        path: `state_admin`,
        elementName: <StateDashboard />,
      },
      {
        id: 1,
        path: `state_admin/AddStateMembers`,
        elementName: <AddIcMember />,
      },
    ],
  },
];
