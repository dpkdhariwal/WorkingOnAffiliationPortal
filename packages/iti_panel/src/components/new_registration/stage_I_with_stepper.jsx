import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";

import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pageheader from "../../layouts/Pageheader";
import Stepper from "@keyvaluesystems/react-stepper";

import CategoryOfApplicantOrganization from "./form/stegeI/CategoryOfApplicantOrganization";
import BasicDetailsofApplicantOrganization from "./form/stegeI/BasicDetailsofApplicantOrganization";
import DetailsOfTheProposedInstitute from "./form/stegeI/DetailsOfTheProposedInstitute";
import DetailsOfTheLandToBeUsedForTheITI from "./form/stegeI/DetailsOfTheLandToBeUsedForTheITI";
import DetailsOfDocumentsToBeUploaded from "./form/stegeI/DetailsOfDocumentsToBeUploaded";
import PreviewOfApplication from "./form/stegeI/PreviewOfApplication";
import DetailsOfTradeUnitForAffiliation from "./form/stegeI/DetailsOfTradeUnitForAffiliation";
import FeePayment from "./form/stegeI/FeePayment";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { LandDocuments } from "./form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/land_documents"

import { Documents } from "./form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/documents"

import { STAGE_I__FEE_PAID, STAGE_I__FEE_EXEMPTED, STAGE_I__SUBMIT_PENDING, STAGE_I__FEE_PENDING, STAGE_I__SUBMITED, STAGE_I__DOCUMENT_PENDING } from "../../constants";

import { AppStatusContext } from "../../services/context";
import { getAppCurrentStatus } from "../../db/users";
import { STEPPER_STYLE,STAGE_I_APP_FORM_FLOW, FILLED, ST1FC } from "../../constants";

export const StageIForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const data = STAGE_I_APP_FORM_FLOW.map((step) => ({ ...step, completed: step.status === FILLED }));
  const [steps, setSteps] = useState(data);
  const handleStepClick = (step, index) => { setActiveStep(index) };

  

  const [appStatus, setAppStatus] = useState({});

  useEffect(() => {
    getAppCurrentStatus(appId).then((data) => {
      setAppStatus(data[0])
    });
  }, []);

            

          

          

            
 const goToSection = (step, index = null) => {
    setActiveStep(step);
  };
              

  const setStepContent = (step, stepIndex) => {
    console.log(step, stepIndex);
    switch (step.step) {
      case ST1FC.APPLICANT_ENTITY_DETAILS.step:
        return <BasicDetailsofApplicantOrganization setActive={goToSection} />
      case ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step:
        return <DetailsOfTheProposedInstitute setActive={goToSection} />
      case ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step:
        return <DetailsOfTradeUnitForAffiliation setActive={goToSection} />
      case ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step:
        return <DetailsOfTheLandToBeUsedForTheITI setActive={goToSection} />
      case ST1FC.FEE_PAYMENT.step:
        return <FeePayment setActive={goToSection} />
      case ST1FC.DOCUMENTS_UPLOAD.step:
        return <DetailsOfDocumentsToBeUploaded setActive={goToSection} />
      default:
        return ''
    }
  }

  useEffect(() => {
      const data = STAGE_I_APP_FORM_FLOW.map((step) => ({ ...step, completed: step.status === FILLED }));
      const firstFilledIndex = STAGE_I_APP_FORM_FLOW.findIndex(step => step.status === FILLED);
      const currentStep = firstFilledIndex !== -1 ? firstFilledIndex : 0;
      setSteps(data);
      setActiveStep(currentStep);
    }, []);

  return (
    <Fragment>
      <Stepper
        styles={STEPPER_STYLE}
        steps={steps}
        currentStepIndex={activeStep}
        orientation="horizontal"
        labelPosition="bottom"
        onStepClick={handleStepClick}
        stepContent={setStepContent}
      />
    </Fragment>
  );
};
