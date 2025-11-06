import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { STEPPER_STYLE, STAGE_I_APP_FORM_FLOW, FILLED, ST1FC } from "affserver";
import * as C from "affserver";
import { Assessment_Basic_Detail } from "@/components/new_registration/form/stegeI/BasicDetailsofApplicantOrganization";
// import { Assessment_Proposed_Institute } from "../../../../components/new_registration/form/stegeI/DetailsOfTheProposedInstitute";
import { Name_of_the_institute } from "@/components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/name_of_the_institute";
import { AddressOfInstitute } from "@/components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/view/Address_of_Institute";
import { InstituteLocation } from "@/components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/instituteLocation";
import { Assessment_DetailsOfDocumentsToBeUploaded } from "@/components/new_registration/form/stegeI/DetailsOfTradeUnitForAffiliation";
import {
  LandDocuments, LandInfo,
  PossessionOfLand,
  LandArea
} from "@/screens/Applicant/StageI/da/steps/landDocuments/land_documents"
import { Documents } from "@/screens/Applicant/StageI/da/steps/documents/documents"

import { Navigations, AsessementIActions } from "@/components/Assessment/components"
import Swal from "sweetalert2";

import * as st from "@/services/state/index";
import { ContextMap } from "@/components/formik/contexts";



export const ReviewDocuments = ({ steps, step, view: viewProp = false, isView = false, nav }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  console.log(appId);

  // useState
  const [info, setInfo] = useState({});
  const [allCompleted, setAllCompleted] = useState(false);
  const [stepList, setStepList] = useState([]);
  const [vStatus, setVStatus] = useState(false);

  const [daProgressStatusForApplicant, setDaProgressStatusForApplicant] = useState({});

    const Context = ContextMap['stageIAsmtDetails'] || ContextMap.default;
    const { assessmentInfo } = useContext(Context);

    console.log(assessmentInfo);


  // Navigation
  const navigate = useNavigate();



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
    try {
      let resp = await st.getAssessmentProgressStatusApplicant(appId);
      console.log(resp.data);
      setDaProgressStatusForApplicant(resp.data);
    } catch (error) {
      console.log(error);
    }

    // let result, resp;
    // // let result = await set.getAssessmentProgressStatus(appId);
    // resp = await st.getAssessmentProgressStatus(appId);

    // result = resp.data;
    // // console.error(result);
    // const { allCompleted, steps, vStatus } = result;
    // console.log(allCompleted, steps, vStatus);
    // setAllCompleted(allCompleted);
    // setStepList(steps);
    // setVStatus(vStatus);
    // setInfo(result);
    // console.log(allCompleted, steps, vStatus);
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
      console.log(info?.assessmentStatus?.assessment_status);
      switch (info?.assessmentStatus?.assessment_status) {
        case C.SL.ON_PROGRESS:
          console.log(info?.assessmentStatus?.pendingAt);
          switch (info?.assessmentStatus?.pendingAt) {
            case C.SL.PENDING_AT_APPLICANT:
              {
                let allDone = [allCompleted, vStatus].every(Boolean);
                switch (allDone) {
                  case true:
                    return <Button size="lg" variant="danger" onClick={() => { sendApplicationToAssessor() }}  >Send Application to State for Review</Button>;
                  default:
                    return 'Something Went Wrong';
                }
              }
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
              return '-';
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
      // // Update App Flow Status
      // // await updateAppFlowStatus(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_COMPLETED);
      // await gen.setNewStatusOfAppByStep(appId, C.STAGE_I__ASSESSMENT, C.STAGE_I__ASSESSMENT_COMPLETED) /
      //   // Update App Assessment Status
      //   // await updateAssessmentStatus(appId, C.abbreviation.STAGE_I.key, C.SL.VERIFIED, C.SL.NULL);
      // await st.updateAssessmentStatus(appId, C.abbreviation.STAGE_I.key, C.SL.VERIFIED, C.SL.NULL);

      // // await markAsCompleteStageAssessmentFlow(appId, C.ST1FC.REVIEW_ASSESSMENT.step);
      // await st.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.REVIEW_ASSESSMENT.step)

      // // setAppFlow(appId, C.STAGE_I__ASSESSMENT);

      await st.markAsCompleteAssessment(appId);

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
      await st.setSendApplicationToApplicant(appId, info.assessmentStatus.assessment_id);

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


  const sendApplicationToAssessor = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Send Application to State for Review",
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
      await st.setSendApplicationStage1ToState(appId, assessmentInfo.assessment_id);
      Swal.fire("Saved!", "Your form data has been saved.", "success").then((result) => {
        if (result.isConfirmed) {
          // navigate(`/dashboard/AppList/`);
        }
      }).catch(() => {
        Swal.fire({ title: "Error", text: "Something Went Wrong", icon: "Error", showConfirmButton: false, timer: 2000 });
      });

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while saving.", "error");
    }
  }

  return (
    daProgressStatusForApplicant?.allCompleted === true || daProgressStatusForApplicant?.allReplied === true ? (<>
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

      {/* <AsessementIActions appId={appId} nav={nav} finishBtn={setActionButton()} /> */}
      <Navigations nav={nav} lastLabel="Send Application to State for Review" onLast={() => { sendApplicationToAssessor() }} />

    </>) : (<InfoMsg />)
  )
}

export default function InfoMsg() {
  return (
    <div className="container shadow">
      <div className="jumbotron bg-light p-5 rounded-3 shadow-sm">
        <h2 className="display-6 text-danger">
          Please Address Document Deficiencies
        </h2>
        <p className="lead">
          Kindly upload or provide the required documents to clear the identified deficiencies before submitting your application.
        </p>
        <p className="lead">Your application cannot proceed further until all deficiencies are resolved.</p>
        <button className="btn btn-primary btn-lg">Go Back</button>
      </div>
    </div>
  );
}


