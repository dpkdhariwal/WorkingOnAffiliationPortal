import Dashboard from "./../components/dashboard/Dashboard";
// import New_registration from './../components/new_registration/new_registration';

// Applicant Screens
import { Start, SelectCategory } from "../screens/Applicant/Application";

import New_registration from "./../components/new_registration/new_registration_test";

import Form_stageII from "../components/new_registration/form_stageII";

import GeoTaggedPhoto from "../components/geotagged";

import Assessment from "../components/Assessment/Assessment";
import AssessmentII from "../components/Assessment/AssessmentII";
import { TimeLine } from "../components/TimeLine/TimeLine";

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
        path: `AssessmentII`,
        elementName: <AssessmentII />,
      },
      {
        id: 1,
        path: `TimeLine`,
        elementName: <TimeLine />,
      },
    ],
  },
];
