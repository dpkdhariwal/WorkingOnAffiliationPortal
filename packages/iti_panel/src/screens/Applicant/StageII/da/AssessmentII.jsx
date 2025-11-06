import React, { Fragment, useRef, useState, useEffect } from "react";
import Pageheader from "@/layouts/Pageheader";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Card, Badge, Row, Col, Form, Tab, Nav, Button } from "react-bootstrap";
import Stepper from "@keyvaluesystems/react-stepper";

import * as gen from "@/services/general/index";

// import {
//   BuildingPlanView,
//   BuildingPlanAction,
//   BccView,
//   BccViewAction,
//   PhotosOfBuilding,
//   PhotosOfBuildingAction,
// } from "../new_registration/form/stateII/BuildingPlan";

// import {
//   ElectricityConnectionDetailsView,
//   ElectricityConnectionDetailsAction,
//   BackupPowerSupplyView,
//   BackupPowerSupplyAction,
//   FireAndSafetyCertificateView,
//   FireAndSafetyCertificateAction,
// } from "../new_registration/form/stateII/ElectricityConnectionDetails";


// import AssessmentMte from "./stage-II/AssessmentMte";

// import AssessmentCivilInfraStruction from "./stage-II/AssessmentCivilInfraStruction";
// import { Assessment_Amenities } from "../new_registration/form/stateII/Amenities";
// import { Assessment_SignageBoards } from "../new_registration/form/stateII/SignageBoards";

// import { STAGE_II__ASSESSMENT } from "affserver";
// import { setAppFlow } from "../../db/users";

import { Link, useNavigate } from "react-router-dom";

import * as cons from "affserver";

import * as C from "affserver";

import { ContextMap } from "@/components/formik/contexts/index";



const LINE_HEIGHT = 400;


import { useContext } from "react";
import * as formik from "formik";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import SwalManager from "@/common/SwalManager";
import { BuildingDetailAssessment } from "./applicant/AssessmentII/Building Detail/asmt_BuildingDetail";
import { CivilInfrastructureAssessment } from "@/screens/Applicant/StageII/da/applicant/AssessmentII/Civil Infrastructure Detail/CivilInfrastructureAssessment";
import { AmenitiesAssessment } from "@/screens/Applicant/StageII/da/applicant/AssessmentII/Amenities Area/Amenities";
import { SignageBoards } from "@/screens/Applicant/StageII/da/applicant/AssessmentII/Signage Boards/SignageBoards";
import { ElectricityConnectionAssessment } from "@/screens/Applicant/StageII/da/applicant/AssessmentII/Electricity Connection Details/ElectricityConnection";
import { TradewiseMachineryToolsEquipmentAssesment } from "@/screens/Applicant/StageII/da/applicant/AssessmentII/Tradewise Machinery Tools Equipment Details/TradewiseMachineryToolsEquipment";
import { ReviewAssessment } from "@/screens/Applicant/StageII/da/applicant/AssessmentII/ReviewAssessment/ReviewAssessment";


export const RemoveAssessmentDeficiencies = () => {
  const navigate = useNavigate();

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


  // const goToSection = (step, index = null) => {
  //   console.log(step, index);
  //   // setActiveStep(step);
  // };


  const handleStepClick = (step, index) => {
    console.log(step, index);
    if (step.stepStatus === cons.ACTIVE || step.status === cons.FILLED) {
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

  const next = (step, index) => {
    setActiveStep(++index);
    console.log(step, index)
  }

  const finish = (step, index) => {
    console.log(step, index)
  }


  // const SetUpNavigationButton = (step, index) => {
  //   console.log(step, index);
  //   // return <Navigations firstIndex={firstIndex} lastIndex={lastIndex} currentIndex={index} step={step} previous={() => { return previous(step, index) }} next={() => { next(step, index) }} finish={() => { finish(step, index) }} />
  // };

  const setStepContent = (step, stepIndex) => {
    try {
      switch (step.step) {
        case C.ST2FC.BUILDING_DETAIL.step:
          return <BuildingDetailAssessment steps={steps} step={step} nav={object(step, stepIndex)} />;
        case C.ST2FC.CIVIL_INFRASTRUCTURE_DETAIL.step:
          return <CivilInfrastructureAssessment step={step} nav={object(step, stepIndex)} />;
        case C.ST2FC.AMENITIES_AREA.step:
          return <AmenitiesAssessment step={step} nav={object(step, stepIndex)} />;
        case C.ST2FC.SIGNAGE_BOARDS.step:
          return <SignageBoards steps={steps} step={step} nav={object(step, stepIndex)} />;
        case C.ST2FC.ELECTRICITY_CONNECTION_DETAILS.step:
          return <ElectricityConnectionAssessment step={step} nav={object(step, stepIndex)} />;
        case C.ST2FC.TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS.step:
          return <TradewiseMachineryToolsEquipmentAssesment steps={steps} step={step} nav={object(step, stepIndex)} />;
        case C.ST2FC.REVIEW_ASSESSMENT.step:
          return <ReviewAssessment steps={steps} step={step} nav={object(step, stepIndex)} />;
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
      const firstFilledIndex = steps.findIndex(step => step.status === cons.FILLED || step.stepStatus === cons.ACTIVE);
      const reversedIndex = [...steps].reverse().findIndex(step => step.status === cons.FILLED || step.stepStatus === cons.ACTIVE);
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
    let result = await gen.getAppFlowStepInfoByStep(appId, C.STAGE_II__ASSESSMENT);

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
      case 'state_assessor':

        // app_stage_da_flow = await gen.getAsmtFlowForStageII(appId);
        // app_stage_da_flow = app_stage_da_flow.data;
        // setSteps(app_stage_da_flow);
        // break;
        // app_stage_da_flow = await getAssessmentStageIFlowById(appId, C.SL.ASSESSOR);
        // setSteps(app_stage_da_flow);
        app_stage_da_flow = await gen.getAsmtFlowForStageII(appId);
        app_stage_da_flow = app_stage_da_flow.data;
        app_stage_da_flow = app_stage_da_flow.map(item => ({
          ...item,
          completed: item.status === "COMPLETED"
        }));

        setSteps(app_stage_da_flow);
        break;
      default:
        throw new Error("Status Not Found");
    }


    const firstIndex = 0;                 // Always 0 for the first element
    const lastIndex = app_stage_da_flow.length - 1;   // Length minus 1 for the last element
    setFirstIndex(firstIndex);
    setLastIndex(lastIndex);

    const index = app_stage_da_flow.findIndex(item => item.status === "COMPLETED");
    setActiveStep(index);
  };


  // const startDocsVerification = async () => {
  //   console.log("dsfadf");
  //   const confirmed = await SwalManager.confirm("Confirm", "Are You Sure to Start Desktop Assessment", "Start Desktop Assessment Now");
  //   if (!confirmed) return;
  //   try {
  //     SwalManager.showLoading("Starting Desktop Assessment Process...");
  //     await new Promise(res => setTimeout(res, 3000)); // Simulated API call
  //     SwalManager.hide();
  //     let reuslt = await SwalManager.success("Desktop Assessment Started Successfully");

  //     if (reuslt.isConfirmed) {
  //       // await setNewStatusOfAppByStep(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_ON_PROGRESS);
  //       // await gen.setNewStatusOfAppByStep(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_ON_PROGRESS);
  //       await gen.setStageIIAssessmentFlow(appId);
  //       // await setStageIAssessmentFlow(appId);
  //       navigate(0); // In React Router v6
  //     }
  //   } catch (error) {
  //     SwalManager.hide();
  //     await SwalManager.error("Failed to save form data.");
  //   }
  // }

  useEffect(() => { loadData(); }, []);

  return (
    <Fragment>
      <Pageheader
        mainheading="Remove Deficiency Desktop Assessment Stage - II"
        parentfolder="Desktop Assessment Stage - II"
        activepage="Stage I"
      />
      {status === C.STAGE_II__ASSESSMENT_ON_PROGRESS ? (
        <ContextMap.stageIAsmtDetails.Provider value={{ assessmentInfo: assessmentStatus }} >
          <Stepper styles={C.STEPPER_STYLE} steps={steps} currentStepIndex={activeStep} orientation="horizontal" labelPosition="bottom" onStepClick={handleStepClick} stepContent={setStepContent} stepClassName={(i) => i === activeStep ? "bg-blue-500 text-white" : ""} />
        </ContextMap.stageIAsmtDetails.Provider>) :
        status === C.STAGE_II__ASSESSMENT_COMPLETED ? (<h2>Document Verification has Been Completed</h2>) : <h2>Wrong Status</h2>}
    </Fragment>
  );
};

export default RemoveAssessmentDeficiencies;

// const startDocsVerification = async () => {

//   console.log("dfdfadfasdf");

//   // const confirmed = await SwalManager.confirmSave();
//   // if (!confirmed) return;
//   // try {
//   //   SwalManager.showLoading("Starting Desktop Assessment Process...");
//   //   await new Promise(res => setTimeout(res, 3000)); // Simulated API call
//   //   SwalManager.hide();
//   //   let reuslt = await SwalManager.success("Desktop Assessment Started Successfully");

//   //   if (reuslt.isConfirmed) {
//   //     // await setNewStatusOfAppByStep(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_ON_PROGRESS);
//   //     // await gen.setNewStatusOfAppByStep(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_ON_PROGRESS);
//   //     await gen.setStageIAssessmentFlow(appId);
//   //     // await setStageIAssessmentFlow(appId);
//   //     navigate(0); // In React Router v6
//   //   }
//   // } catch (error) {
//   //   SwalManager.hide();
//   //   await SwalManager.error("Failed to save form data.");
//   // }
// }

// const regCategory = useSelector((state) => state.reg.regCategory);
// const StartDocsVerification = ({ startDocsVerification }) => {
//   const appCat = useSelector((state) => state.appCat);
//   const navigate = useNavigate();
//   console.log(appCat.selected);
//   return (
//     <Fragment>
//       <Card className="custom-card">
//         <Card.Header>
//           <div className="card-title">Document Verification for Stage-II</div>
//         </Card.Header>
//         <Card.Body>
//           <p className="card-text">
//             <div>
//               <b>to Start Desktop Assessment of Stage-II:</b><p>To begin the Assessment for Stage-II, please ensure that all required documents are as per prescribed format.
//                 Double-check that each file is clear, complete, and up-to-date.
//                 Submit your documents through the designated upload section.
//                 Incomplete or incorrect submissions may delay the verification process.
//                 Once submitted, you will be notified about the status and next steps.</p>
//             </div>
//           </p>
//           <Button onClick={() => { startDocsVerification() }} >Start Desktop Assessment</Button>
//         </Card.Body>
//       </Card>
//     </Fragment>
//   );
// };


// const MarkAsCompleteStageIAssessment = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const appId = queryParams.get("appId");

//   const { Formik } = formik;
//   const formRef2 = useRef();

//   const submit = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to Mark Comlete Stage I Document Verification",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Mark it!",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // User confirmed – now show loading or save directly
//         Swal.fire({
//           title: "Saving...",
//           didOpen: () => {

//             setAppFlow(appId, STAGE_II__ASSESSMENT);

//             // Swal.showLoading();
//             // dispatch({ type: UPDATE_ENTITY_DETAILS, payload: values });
//             // dispatch({ type: "set_filled_step", payload: { step: 0 }, });
//             // dispatch({ type: "reg_set_active_step", payload: { step: 1 } });
//             // setActive(reg.steps[1]);
//             // console.log(authUser);
//             // setEntityDetails(values, authUser, appId);
//             // Swal.close();
//           },
//         });
//       } else {
//         console.log("User cancelled save");
//       }
//     });
//   };

//   return (
//     <Fragment>

//       <div className="d-flex justify-content-end mb-3 " style={{ marginTop: '15px' }}>
//         <Button onClick={submit} className="btn-success" size="lg">Mark as Complete Stage II Document Verfication</Button>
//       </div>
//     </Fragment>
//   );
// };