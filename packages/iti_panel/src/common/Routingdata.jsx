import Dashboard from "./../components/dashboard/Dashboard";
// import New_registration from './../components/new_registration/new_registration';

// Applicant Screens
import { Start, SelectCategory, SelectAffCategoryForNewApp } from "../screens/Applicant/Application";

import New_registration from "../components/new_registration/new_registration";

import Form_stageII from "../components/new_registration/form_stageII";

import GeoTaggedPhoto from "../components/geotagged";

import Assessment from "../components/Assessment/Assessment";
import AssessmentII from "../components/Assessment/AssessmentII";
import AssessmentI from "../components/Assessment/AssessmentI";

import { TimeLine } from "../components/TimeLine/TimeLine";
import { TimeLineFinalTest } from "../screens/TimeLine"
import RdDashboard from "../../../ui_layouts_collaborate/src/components/Assessment/RdDashboard";
import Compliance from "../../../ui_layouts_collaborate/src/components/Assessment/Compliance";
import StateDashboard from "../../../ui_layouts_collaborate/src/components/Assessment/StateDashboard";
import AddIcMember from "../../../ui_layouts_collaborate/src/components/Assessment/AddIcMember";

import RdUser from "../../../ui_layouts_collaborate/src/components/Assessment/RdUser";
import ViewApplicationStageOne from "../screens/common_screens/StageI/ApplicationView/application_view_stage_1";
import { NocGenerateForm } from "../components/new_registration/NocGenerateForm";
import { AddStaffDetail } from "../components/new_registration/AddStaffDetail";
import { InspectionSlotSelection } from "../components/new_registration/InspectionSlotSelection";
import { AppList } from "../screens/Applicant/AppList";
// import {GridExample} from "../screens/Applicant/AppList_ag-grid";
import Test from "../components/test";
import { lazy } from "react";


import { NewAppRegistration } from "../screens/RegNewApplication/NewAppRegistration";
import { AddNewMemberByState } from "../screens/state/state_admin/add-new-member";
// import { ReviewAssessment } from "../screens/state/assessor/stage_I_assessment";
import DstAffiliation from "../components/DST/DstAffiliation";
import { StageIDocumentUploads } from "../screens/Applicant/StageI/da/stageIDocumentUploads"
import { RemoveAssessmentDeficiencies } from "@/screens/Applicant/StageII/da/AssessmentII";

import { StageIAssessment } from "@/screens/Applicant/StageI/AssessmentI/stage_I_assessment";

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
        elementName: <SelectAffCategoryForNewApp />,
      },
      {
        id: 1,
        path: `new_registration`,
        elementName: <New_registration />,
      },
      {
        id: 1,
        path: `AppList`,
        elementName: <AppList />,
      },
      // {
      //   id: 1, 
      //   path: `AppListGrid`,
      //   elementName: <GridExample />,
      // },

      {
        id: 1,
        path: `generateNoc`,
        elementName: <NocGenerateForm />,
      },
      {
        id: 1,
        path: `AddStaffDetail`,
        elementName: <AddStaffDetail />,
      },

      {
        id: 1,
        path: `InspectionSlotSelection`,
        elementName: <InspectionSlotSelection />,
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
        path: `Upload-Documents`,
        elementName: <StageIDocumentUploads />,
      },

      {
        id: 1,
        path: `remove-deficiencies`,
        elementName: <StageIAssessment />,
      },
      {
        id: 1,
        path: `Stage-II-Upload-Documents`,
        elementName: <RemoveAssessmentDeficiencies />,
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


      {
        id: 1,
        path: "new-app-registration",
        elementName: <NewAppRegistration />,
      },

      {
        id: 1,
        path: `member-list`,
        elementName: <h5>To be Continue...</h5>,
      },
      {
        id: 1,
        path: `add-new-member`,
        elementName: <AddNewMemberByState />,
      },

      // {
      //   id: 1,
      //   path: `viewAssessment`,
      //   elementName: <ReviewAssessment />,
      // },
      {
        id: 1,
        path: "DstAffiliation",
        elementName: <DstAffiliation />,
      },
    ],
  },
];
