import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stepper from "@keyvaluesystems/react-stepper";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { STEPPER_STYLE, STAGE_I_APP_FORM_FLOW, FILLED, ST1FC } from "affserver";
import * as C from "affserver";
import * as cons from "affserver";
// import { Assessment_Basic_Detail } from "../../../../components/new_registration/form/stegeI/BasicDetailsofApplicantOrganization";
// import { Assessment_Proposed_Institute } from "../../../../components/new_registration/form/stegeI/DetailsOfTheProposedInstitute";
import { Name_of_the_institute } from "@/components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/name_of_the_institute";
import { AddressOfInstitute } from "@/components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/view/Address_of_Institute";
import { InstituteLocation } from "@/components/new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/instituteLocation";
import { Navigations, AsessementIActions } from "@/components/Assessment/components"

import Swal from "sweetalert2";
import * as gen from "@/services/general";
import * as st from "@/services/state/index";
import { ContextMap } from "@/components/formik/contexts/index";
export const DetailOfProposedInsti = ({ step, view: viewProp = false, isView = false, nav }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const Context = ContextMap['stageIAsmtDetails'] || ContextMap.default;
  const { assessmentInfo } = useContext(Context);

  console.log(assessmentInfo);

  const [pinstInfo, setPinstInfo] = useState({});



  const onNext = async () => {

    const confirmResult = await Swal.fire({ title: "Are you sure?", text: "Do you want to Proceed", icon: "question", showCancelButton: true, confirmButtonText: "Okay, Proceed", cancelButtonText: "Cancel", });
    if (!confirmResult.isConfirmed) { console.log("User cancelled save"); return; }

    const result = await Swal.fire("Saved!", "Your form data has been saved.", "success");
    if (result.isConfirmed) {
      try {
        await st.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step, assessmentInfo.assessment_id, nav.step.slno);
        nav.next();
        // window.location.reload();
      } catch (err) {
        console.error("Error while saving:", err);
      }
    }
  }

  useEffect(() => {
    console.log(pinstInfo);
  }, [pinstInfo]);

  useEffect(() => {
    getInfo();
    console.log(appId);
  }, [appId]);

  const getInfo = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        text: "Please wait while we fetch the data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      let resp2 = await gen.getProposedInstDetails(appId);
      setPinstInfo(resp2.data);
      Swal.close();
    } catch (error) {
      Swal.close();
      console.error("Error fetching entity details:", error);
      Swal.fire("Error", "Failed to fetch data.", "error");
    }
  };

  return <>
    <Name_of_the_institute pinstInfo={pinstInfo} />
    <AddressOfInstitute pinstInfo={pinstInfo} />
    <InstituteLocation pinstInfo={pinstInfo} />
    {isView == false && <Navigations onNext={onNext} nav={nav} />}
  </>;
}

