import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Pageheader from "../../layouts/Pageheader";
import Stepper from "@keyvaluesystems/react-stepper";
// import BasicDetailsofApplicantOrganization from "../../../components/new_registration/form/stegeI/BasicDetailsofApplicantOrganization";
// import DetailsOfTheProposedInstitute from "../../../components/new_registration/form/stegeI/DetailsOfTheProposedInstitute";
// import DetailsOfTheLandToBeUsedForTheITI from "../../../components/new_registration/form/stegeI/DetailsOfTheLandToBeUsedForTheITI";
// import DetailsOfDocumentsToBeUploaded from "../../../components/new_registration/form/stegeI/DetailsOfDocumentsToBeUploaded";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";

// import { getAppCurrentStatus, getStage1FormFlow, setAppFlow, updateAppFlowStatus, updateAssessmentStatus } from "../../../db/users";
import { STEPPER_STYLE, STAGE_I_APP_FORM_FLOW, FILLED, ST1FC } from "affserver";
import * as C from "affserver";
import * as cons from "affserver";
// import { getAppFlowByStep } from "../../../db/forms/stageI/get/get";
import { Assessment_Basic_Detail } from "../../../../components/new_registration/form/stegeI/BasicDetailsofApplicantOrganization";
import { Assessment_Proposed_Institute } from "../../../../components/new_registration/form/stegeI/DetailsOfTheProposedInstitute";
import { Name_of_the_institute } from "../../../../components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/name_of_the_institute";
import { AddressOfInstitute } from "../../../../components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/view/Address_of_Institute";
import { InstituteLocation } from "../../../../components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/instituteLocation";
import { Assessment_DetailsOfDocumentsToBeUploaded } from "../../../../components/new_registration/form/stegeI/DetailsOfTradeUnitForAffiliation";
import {
  LandDocuments, LandInfo,
  PossessionOfLand,
  LandArea
} from "@/screens/Applicant/StageI/da/steps/landDocuments/land_documents"
import { Documents } from "@/screens/Applicant/StageI/da/steps/documents/documents"
// import {
//   Documents, IdProofOfAuthorizedSignatory,
//   RegistrationCertificateOfApplicantOrganization,
//   IdProofOfSecretaryChairpersonPresident,
//   ResolutionCertificate
// } from "../../../../components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/documents"
import { MarkAsCompleteStageIAssessment } from "../../../../components/Assessment/AssessmentI";
// import { getAssessmentStageIFlowById, getAssessmentStatus, markAsCompleteStageAssessmentFlow, setAssessmentStatus, setNewStatusOfAppByStep, setStageIAssessmentFlow } from "../../../db/forms/stageI/set/set";

import { Navigations, AsessementIActions } from "../../../../components/Assessment/components"

import SwalManager from "../../../../common/SwalManager";
// import * as set from "../../../db/forms/stageI/set/set";
import Swal from "sweetalert2";

import * as gen from "../../../../services/general";
import * as st from "../../../../services/state/index";

import { ContextMap } from "../../../../components/formik/contexts/index";
import { EntityDetails } from "./steps/entityDetails/EntityDetails";

import { DetailOfProposedInsti } from "@/screens/Applicant/StageI/da/steps/proposed_inst/proInst"
import { TradeUnits } from "@/screens/Applicant/StageI/da/steps/tradeUnits/DetailsOfTradeUnitForAffiliation";
import { ReviewDocuments } from '@/screens/Applicant/StageI/da/steps/ReviewDocuments/ReviewDocuments'


export const StageIDocumentUploads = () => {

  // AuthUser
  const authUser = useSelector((state) => state.loginUserReducer);


  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const [steps, setSteps] = useState([]);
  const [status, setStatus] = useState({});
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [assessmentStatus, setAssessmentStatus] = useState({});

  const navigate = useNavigate();


  // const goToSection = (step, index = null) => {
  //   console.log(step, index);
  //   // setActiveStep(step);
  // };


  const handleStepClick = (step, index) => {
    console.log(step, index);
    if (step.stepStatus === cons.ACTIVE || step.status === FILLED) {
      setActiveStep(index)
    }
  };

  const object = (step, stepIndex) => {
    let obj = {
      firstIndex: firstIndex,
      lastIndex: lastIndex,
      currentIndex: stepIndex,
      step: step,
      previous: () => { return previous(step, stepIndex); },
      next: () => { return next(step, stepIndex); },
      finish: () => { return finish(step, stepIndex); }
    };
    return obj;
  }



  const previous = (step, index) => {
    console.log(step, index);
    setActiveStep(--index);
    return step;
  }


  // const updateStepStatus = (stepName, newStatus) => {
  //   setSteps(prevSteps =>
  //     prevSteps.map(item =>
  //       item.step === stepName
  //         ? { ...item, status: newStatus, completed: newStatus === 'COMPLETED' }
  //         : item
  //     )
  //   );
  // };

   const completeStepByIndex = (index) => {
    setSteps((prevSteps) =>
      prevSteps.map((step, i) =>
        i === index ? { ...step, status: "COMPLETED" } : step
      )
    );
  };

  const next = (step, index) => {
    let newIndex = ++index;
    setActiveStep(newIndex);
  }

  const finish = (step, index) => {
    console.log(step, index)
  }


  // const SetUpNavigationButton = (step, index) => {
  //   console.log(step, index);
  //   // return <Navigations firstIndex={firstIndex} lastIndex={lastIndex} currentIndex={index} step={step} previous={() => { return previous(step, index) }} next={() => { next(step, index) }} finish={() => { finish(step, index) }} />
  // };

  const setStepContent = (step, stepIndex) => {
    console.log(step, stepIndex);
    try {
      switch (step.step) {
        case ST1FC.APPLICANT_ENTITY_DETAILS.step:
          return <EntityDetails nav={object(step, stepIndex)} />;
        case ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step:
          return <DetailOfProposedInsti step={step} nav={object(step, stepIndex)} />;
        case ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step:
          return <TradeUnits step={step} nav={object(step, stepIndex)} />;
        case ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step:
          return <LandDocuments steps={steps} step={step} nav={object(step, stepIndex)} />;
        case ST1FC.DOCUMENTS_UPLOAD.step:
          return <Documents step={step} nav={object(step, stepIndex)} />;
        case ST1FC.REVIEW_ASSESSMENT.step:
          return <ReviewDocuments steps={steps} step={step} nav={object(step, stepIndex)} />;
        default:
          return ''
      }
    } catch (error) {
      console.log(error);
    }
  }



  const getLastActiveStep = () => {
    console.log(steps.length);
    if (steps.length > 0) {
      const firstFilledIndex = steps.findIndex(step => step.status === FILLED || step.stepStatus === cons.ACTIVE);
      const reversedIndex = [...steps].reverse().findIndex(step => step.status === FILLED || step.stepStatus === cons.ACTIVE);
      const lastFilledIndex = reversedIndex !== -1 ? steps.length - 1 - reversedIndex : -1;
      console.log(lastFilledIndex);
      // setActiveStep(lastFilledIndex);
    }

  }



  useEffect(() => { getLastActiveStep() }, [steps]);

  const loadData = async () => {
    // let result_1 = await getStage1FormFlow(appId);
    // console.log(result_1);
    // let result = await getAppFlowByStep(appId, C.STAGE_I__ASSESSMENT);
    let result = await gen.getAppFlowStepInfoByStep(appId, C.STAGE_I__ASSESSMENT);

    console.log(result.data.status);
    setStatus(result.data.status);

    // Assessment Status
    // let a_status = await getAssessmentStatus(appId);
    let resp = await gen.getAssessmentStatus(appId);
    setAssessmentStatus(resp.data);

    console.log(assessmentStatus);

    // get Application flow by App Id and for
    console.log(authUser);
    let app_stage_da_flow;
    switch (authUser.userType) {
      case 'applicant':
        app_stage_da_flow = await gen.getAssessmentStageIFlowById(appId);
        app_stage_da_flow = app_stage_da_flow.data;
        setSteps(app_stage_da_flow);
        break;
      case 'state_assessor':
        // app_stage_da_flow = await getAssessmentStageIFlowById(appId, C.SL.ASSESSOR);
        // setSteps(app_stage_da_flow);
        app_stage_da_flow = await gen.getAssessmentStageIFlowById(appId);
        app_stage_da_flow = app_stage_da_flow.data;
        setSteps(app_stage_da_flow);
        break;
      default:
        throw new Error("Status Not Found");
    }


    const firstIndex = 0;                 // Always 0 for the first element
    const lastIndex = app_stage_da_flow.length - 1;   // Length minus 1 for the last element
    setFirstIndex(firstIndex);
    setLastIndex(lastIndex);
  };


  const startDocsVerification = async () => {
    const confirmed = await SwalManager.confirmSave();
    if (!confirmed) return;
    try {
      SwalManager.showLoading("Starting Desktop Assessment Process...");
      await new Promise(res => setTimeout(res, 3000)); // Simulated API call
      SwalManager.hide();
      let reuslt = await SwalManager.success("Desktop Assessment Started Successfully");

      if (reuslt.isConfirmed) {
        // await setNewStatusOfAppByStep(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_ON_PROGRESS);
        // await gen.setNewStatusOfAppByStep(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_ON_PROGRESS);
        await gen.setStageIAssessmentFlow(appId);
        // await setStageIAssessmentFlow(appId);
        navigate(0); // In React Router v6
      }
    } catch (error) {
      SwalManager.hide();
      await SwalManager.error("Failed to save form data.");
    }
  }

  useEffect(() => { loadData(); }, []);

  return (
    <Fragment>
      {status === C.STAGE_I__ASSESSMENT_ON_PROGRESS ? (
        <ContextMap.stageIAsmtDetails.Provider value={{ assessmentInfo: assessmentStatus }} >
          <Stepper styles={STEPPER_STYLE} steps={steps} currentStepIndex={activeStep} orientation="horizontal" labelPosition="bottom" onStepClick={handleStepClick} stepContent={setStepContent} stepClassName={(i) => i === activeStep ? "bg-blue-500 text-white" : ""} />
        </ContextMap.stageIAsmtDetails.Provider>) :
        status === C.STAGE_I__ASSESSMENT_COMPLETED ? (<h2>Document Verification has Been Completed</h2>) : <h2>Wrong Status</h2>}
    </Fragment>
  );
};


