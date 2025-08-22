import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Pageheader from "../../layouts/Pageheader";
import Stepper from "@keyvaluesystems/react-stepper";
import BasicDetailsofApplicantOrganization from "../../../components/new_registration/form/stegeI/BasicDetailsofApplicantOrganization";
import DetailsOfTheProposedInstitute from "../../../components/new_registration/form/stegeI/DetailsOfTheProposedInstitute";
import DetailsOfTheLandToBeUsedForTheITI from "../../../components/new_registration/form/stegeI/DetailsOfTheLandToBeUsedForTheITI";
import DetailsOfDocumentsToBeUploaded from "../../../components/new_registration/form/stegeI/DetailsOfDocumentsToBeUploaded";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";


import { getAppCurrentStatus, getStage1FormFlow, setAppFlow, updateAppFlowStatus, updateAssessmentStatus } from "../../../db/users";
import { STEPPER_STYLE, STAGE_I_APP_FORM_FLOW, FILLED, ST1FC } from "../../../constants";
import * as C from "../../../constants";
import * as cons from "../../../constants";
import { getAppFlowByStep } from "../../../db/forms/stageI/get/get";
import { Assessment_Basic_Detail } from "../../../components/new_registration/form/stegeI/BasicDetailsofApplicantOrganization";
import { Assessment_Proposed_Institute } from "../../../components/new_registration/form/stegeI/DetailsOfTheProposedInstitute";
import { Name_of_the_institute } from "../../../components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/name_of_the_institute";
import { AddressOfInstitute } from "../../../components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/view/Address_of_Institute";
import { InstituteLocation } from "../../../components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/instituteLocation";
import { Assessment_DetailsOfDocumentsToBeUploaded } from "../../../components/new_registration/form/stegeI/DetailsOfTradeUnitForAffiliation";
import {
  LandDocuments, LandInfo,
  PossessionOfLand,
  LandArea
} from "../../../components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/land_documents"
import {
  Documents, IdProofOfAuthorizedSignatory,
  RegistrationCertificateOfApplicantOrganization,
  IdProofOfSecretaryChairpersonPresident,
  ResolutionCertificate
} from "../../../components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/documents"
import { MarkAsCompleteStageIAssessment } from "../../../components/Assessment/AssessmentI";
import { getAssessmentStageIFlowById, getAssessmentStatus, markAsCompleteStageAssessmentFlow, setAssessmentStatus, setNewStatusOfAppByStep, setStageIAssessmentFlow } from "../../../db/forms/stageI/set/set";

import { Navigations, AsessementIActions } from "../../../components/Assessment/components"

import SwalManager from "../../../common/SwalManager";
import * as set from "../../../db/forms/stageI/set/set";
import Swal from "sweetalert2";

export const StageIAssessment = () => {
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


  const goToSection = (step, index = null) => {
    console.log(step, index);
    // setActiveStep(step);
  };


  const handleStepClick = (step, index) => {
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
  const next = (step, index) => {
    setActiveStep(++index);
    console.log(step, index)
  }

  const finish = (step, index) => {
    console.log(step, index)
  }


  const SetUpNavigationButton = (step, index) => {
    console.log(step, index);
    // return <Navigations firstIndex={firstIndex} lastIndex={lastIndex} currentIndex={index} step={step} previous={() => { return previous(step, index) }} next={() => { next(step, index) }} finish={() => { finish(step, index) }} />
  };

  const setStepContent = (step, stepIndex) => {
    console.log(step, stepIndex);
    try {
      switch (step.step) {
        case ST1FC.APPLICANT_ENTITY_DETAILS.step:
          return <Assessment_Basic_Detail nav={object(step, stepIndex)} />;
        case ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step:
          return <DetailOfProposedInsti step={step} nav={object(step, stepIndex)} />;
        case ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step:
          return <Assessment_DetailsOfDocumentsToBeUploaded step={step} nav={object(step, stepIndex)} />;
        case ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step:
          return <LandDocuments steps={steps} step={step} nav={object(step, stepIndex)} />;
        case ST1FC.DOCUMENTS_UPLOAD.step:
          return <Documents step={step} nav={object(step, stepIndex)} />;
        case ST1FC.REVIEW_ASSESSMENT.step:
          return <ReviewAssessment steps={steps} step={step} nav={object(step, stepIndex)} />;
        default:
          return ''
      }
    } catch (error) {
      console.log(error);
    }
  }



  const getLastActiveStep = () => {
    const firstFilledIndex = steps.findIndex(step => step.status === FILLED || step.stepStatus === cons.ACTIVE);
    const reversedIndex = [...steps].reverse().findIndex(step => step.status === FILLED || step.stepStatus === cons.ACTIVE);
    const lastFilledIndex = reversedIndex !== -1 ? steps.length - 1 - reversedIndex : -1;
    console.log(lastFilledIndex);
    // setActiveStep(lastFilledIndex);
  }

  useEffect(() => { getLastActiveStep() }, [steps]);

  const loadData = async () => {

    // let result_1 = await getStage1FormFlow(appId);
    // console.log(result_1);
    let result = await getAppFlowByStep(appId, C.STAGE_I__ASSESSMENT);
    console.log(result);
    setStatus(result.status);

    // Assessment Status
    let a_status = await getAssessmentStatus(appId);
    console.log(a_status);
    setAssessmentStatus(a_status);


    // get Application flow by App Id
    let app_stage_da_flow = await getAssessmentStageIFlowById(appId);
    console.log(app_stage_da_flow);
    setSteps(app_stage_da_flow);

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
        await setNewStatusOfAppByStep(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_ON_PROGRESS);
        await setStageIAssessmentFlow(appId);
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
      {status === C.STAGE_I__ASSESSMENT_PENDING ? (<StartDocsVerification startDocsVerification={startDocsVerification} />) :
        status === C.STAGE_I__ASSESSMENT_ON_PROGRESS ? (<Stepper styles={STEPPER_STYLE} steps={steps} currentStepIndex={activeStep} orientation="horizontal" labelPosition="bottom" onStepClick={handleStepClick} stepContent={setStepContent} stepClassName={(i) => i === activeStep ? "bg-blue-500 text-white" : ""} />) :
          status === C.STAGE_I__ASSESSMENT_COMPLETED ? (<h2>Document Verification has Been Completed</h2>) : ''}
    </Fragment>
  );
};

export const DetailOfProposedInsti = ({ step, view: viewProp = false, isView = false, nav }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const onNext = async () => {
    let result = await setStageIAssessmentFlow(appId);
    let data = await markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step);
    nav.next();
  }

  return <><Name_of_the_institute /><AddressOfInstitute /><InstituteLocation />

    {isView == false && <Navigations onNext={onNext} nav={nav} />}
  </>;
}


const StartDocsVerification = ({ startDocsVerification }) => {
  const regCategory = useSelector((state) => state.reg.regCategory);
  const appCat = useSelector((state) => state.appCat);
  const navigate = useNavigate();
  console.log(appCat.selected);

  return (
    <Fragment>
      <Card className="custom-card">
        <Card.Header>
          <div className="card-title">Document Verification for Stage-I</div>
        </Card.Header>
        <Card.Body>
          <p className="card-text">
            <div>
              <b>to Start Document Verification of Stage-I:</b><p>To begin the Document Verification for Stage-I, please ensure that all required documents are ready and in the prescribed format.
                Double-check that each file is clear, complete, and up-to-date.
                Submit your documents through the designated upload section.
                Incomplete or incorrect submissions may delay the verification process.
                Once submitted, you will be notified about the status and next steps.</p>
            </div>
          </p>
          <Button onClick={() => { startDocsVerification() }} >Start Document Verificaiton</Button>
        </Card.Body>
      </Card>
    </Fragment>
  );
};


export const ReviewAssessment = ({ steps, step, view: viewProp = false, isView = false, nav }) => {


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  console.log(appId);

  // useState
  const [info, setInfo] = useState({});
  const [allCompleted, setAllCompleted] = useState(false);
  const [stepList, setStepList] = useState([]);
  const [vStatus, setVStatus] = useState(false);

  // Navigation
  const navigate = useNavigate();


  const onLast = async () => {

    // Mark as Complete Review this Stage 
    await markAsCompleteStageAssessmentFlow(appId, C.ST1FC.REVIEW_ASSESSMENT.step);

    // // Mark as Compelete Assessment and Set Pending Applicant if Entities Not Verfied  
    // await setAssessmentStatus(appId, C.SL.COMPLETED, C.SL.PENDING_AT_APPLICANT);

    // // Mark Stage Asessement as Completed and App Flow Also marks As Completed 
    // setAppFlow(appId, C.STAGE_I__ASSESSMENT);
  }

  const [docInfo, setDocInfo] = useState([]);
  useEffect(() => {
    if (steps) {
      const docStep = steps.find(step => step.step === ST1FC.DOCUMENTS_UPLOAD.step);
      setDocInfo(docStep);
      console.log("DOCUMENTS_UPLOAD step:", docStep);
    }
  }, [steps]);

  const [docInfo2, setDocInfo2] = useState([]);
  useEffect(() => {
    if (steps) {
      const docStep2 = steps.find(step => step.step === C.ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step);
      setDocInfo2(docStep2);
      console.log("DOCUMENTS_UPLOAD step:", docStep2);
    }
  }, [steps]);


  // Loading Review Details
  const loadInfo = async () => {
    let result = await set.getAssessmentProgressStatus(appId);
    const { allCompleted, steps, vStatus } = result;
    console.log(result);
    setAllCompleted(allCompleted);
    setStepList(steps);
    setVStatus(vStatus);
    setInfo(result);
    console.log(allCompleted, steps, vStatus);
  }

  useEffect(() => {
    loadInfo();
    setActionButton();
  }, [])

  useEffect(() => {
    console.log(info);
  }, [info]);



  const setActionButton = () => {
    console.log(info?.assessmentStatus?.assessment_status);
    try {
      switch (info?.assessmentStatus?.assessment_status) {
        case C.SL.ON_PROGRESS:
          switch (info?.assessmentStatus?.pendingAt) {
            case C.SL.PENDING_AT_APPLICANT:
              return '-';
            case C.SL.PENDING_AT_ASSESSOR:
              {
                let allDone = [allCompleted, vStatus].every(Boolean);
                switch (allDone) {
                  case true:
                    return <Button size="lg" variant="success" onClick={() => { markAsCompleteNow() }}>Mark as Completed Desktop Assessment</Button>;
                  case false:
                    return <Button size="lg" variant="danger" onClick={() => { sendApplicationToApplicant() }}  >Send Application to Applicant for Uploading Documents</Button>;
                  default:
                    return 'Something Went Wrong';
                }
              }
            default:
              break;
          }
          break;
        default:
          return "NA";
      }


    } catch (error) {
      console.log(error);
    }
  }
  const markAsCompleteNow = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Mark as Complete Document Verification",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Okay, Proceed",
      cancelButtonText: "Cancel",
    });
    if (!confirmResult.isConfirmed) {
      console.log("User cancelled save");
      return;
    }
    try {
      // setAppFlow(appId, C.STAGE_I__ASSESSMENT);
      Swal.fire("Saved!", "Your form data has been saved.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while saving.", "error");
    }
  }
  const sendApplicationToApplicant = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Send Application to Applicant for Uploading Documents",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Okay, Proceed",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      console.log("User cancelled save");
      return;
    }

    try {
      // Update App Flow Status
      await updateAppFlowStatus(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_ON_PROGRESS);

      // Update App Assessment Status
      await updateAssessmentStatus(appId, C.abbreviation.STAGE_I.key, C.SL.ON_PROGRESS, C.SL.PENDING_AT_APPLICANT);

      await markAsCompleteStageAssessmentFlow(appId, C.ST1FC.REVIEW_ASSESSMENT.step);

      Swal.fire("Saved!", "Your form data has been saved.", "success").then((result) => {
        if (result.isConfirmed) {
          // navigate(`/dashboard/viewAssessment?appId=${appId}`);
          navigate(`/dashboard/AppList/`);
        }
      }).catch(() => {
        console.log('dfadfasf');
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while saving.", "error");
    }
  }


  console.log(info);

  return (
    info?.allCompleted ? (<>
      <Assessment_Basic_Detail isView={true} />
      <Name_of_the_institute isView={true} />
      <AddressOfInstitute isView={true} />
      <InstituteLocation isView={true} />
      <Assessment_DetailsOfDocumentsToBeUploaded isView={true} />

      {/* Land Documents Starts here */}
      <LandDocuments isView={true} step={docInfo2} />
      <LandInfo isView={true} />

      {/* <PossessionOfLand isView={true} step={docInfo2}  /> */}
      {/* <LandArea isView={true} /> */}
      {/* Ends Here */}

      {/* Documents Starts Here */}
      <Documents isView={true} step={docInfo} />
      {/* Ends Here */}

      <AsessementIActions appId={appId} nav={nav} finishBtn={setActionButton()} />
      {/* <MarkAsCompleteStageIAssessment /> */}
    </>) : (<h2>Assessment Not Yet Completed</h2>)
  )
}


