import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";

import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pageheader from "../../layouts/Pageheader";
import { Stepper, Step } from "react-form-stepper";

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

const New_registration = () => {
  const reg = useSelector((state) => state.reg);
  const [activeStep, setActiveStep] = useState(reg.steps[0]);

  useEffect(() => {
    console.log(activeStep);
  }, [reg]);

  const goToSection = (step, index = null) => {
    setActiveStep(step);
  };
  return (
    <Fragment>
      <Pageheader
        mainheading={`New Application Stage-I Form`}
        parentfolder="Dashboard"
        activepage="New Registration"
      />
      <Stepper>
        {reg.steps.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => goToSection(item, index)}
              style={{ cursor: "pointer" }}
            >
              <Step
                key={index}
                label={item.label || "Step " + (index + 1)}
                active={item.active === true || index < activeStep.step}
                completed={item.filled} // You might want to base this on actual state
                className={item.filled === true ? "stepper_completed" : ''} // Correct ternary operator syntax
                index={index}
              />
            </div>
          );
        })}
      </Stepper>

      {activeStep.label === "Applicant Entity Details" ? (
        <BasicDetailsofApplicantOrganization setActive={goToSection} />
      ) : activeStep.label === "Applicant Entity Details" ? (
        <BasicDetailsofApplicantOrganization setActive={goToSection} />
      ) : activeStep.label === "Details of the Proposed Institute" ? (
        <DetailsOfTheProposedInstitute setActive={goToSection} />
      ) : activeStep.label ===
        "Details of Trade(s)/Unit(s) for Affiliation" ? (
        <DetailsOfTradeUnitForAffiliation />
      ) : // To be Work
        activeStep.label === "Details of the Land to be used for the ITI" ? (
          <DetailsOfTheLandToBeUsedForTheITI />
        ) : // To be Work
          activeStep.label === "Preview of Application" ? (
            <PreviewOfApplication />
          ) : // To be Work
            activeStep.label === "Fee Payment" ? (
              <FeePayment />
            ) : // To be Work
              activeStep.label === "Documents Upload" ? (
                <DetailsOfDocumentsToBeUploaded />
              ) : (
                // To be Work
                <p>Something Went Wrong</p>
              )}
    </Fragment>
  );
};

export default New_registration;
