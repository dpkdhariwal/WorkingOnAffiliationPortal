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
import { LandDocuments } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/land_documents"

import { Documents } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/documents"

import { STAGE_I__FEE_PAID, STAGE_I__FEE_EXEMPTED, STAGE_I__SUBMIT_PENDING, STAGE_I__FEE_PENDING, STAGE_I__SUBMITED, STAGE_I__DOCUMENT_PENDING } from "../../constants";

const New_registration = () => {
  const reg = useSelector((state) => state.reg);
  const [activeStep, setActiveStep] = useState(reg.steps[0]);

  const AppliInfo = useSelector((state) => state.AppliInfo);


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
        <DetailsOfTradeUnitForAffiliation setActive={goToSection} />
      ) : // To be Work
        activeStep.label === "Details of the Land to be used for the ITI" ? (
          <DetailsOfTheLandToBeUsedForTheITI setActive={goToSection} />
        ) : // To be Work
          activeStep.label === "Preview of Application" ? (
            <PreviewOfApplication setActive={goToSection} />
          ) : // To be Work
            activeStep.label === "Fee Payment" ? (
              AppliInfo.stage_I_fee_status === STAGE_I__FEE_PAID ? (<StageIPaidInfo/>) : AppliInfo.stage_I_fee_status === STAGE_I__FEE_EXEMPTED ? (<StageIExemtedInfo />) : <FeePayment setActive={goToSection} />
            ) : // To be Work
              activeStep.label === "Documents Upload" ? (
                (AppliInfo.stage_I_fee_status === STAGE_I__FEE_PENDING) ? (<h5>First Complete the Stage-I and Pay the Fee</h5>) :
                  (AppliInfo.stage_I_fee_status === STAGE_I__FEE_PAID || AppliInfo.stage_I_fee_status === STAGE_I__FEE_EXEMPTED && AppliInfo.app_status_awaiting == STAGE_I__DOCUMENT_PENDING) ? (<DetailsOfDocumentsToBeUploaded setActive={goToSection} />) :
                    <>
                      <LandDocuments view={true} />
                      <Documents view={true} />
                    </>

              ) : (
                // To be Work
                <p>Something Went Wrong</p>
              )}
    </Fragment>
  );
};

export default New_registration;

export const StageIExemtedInfo = () => {

  return (
    <>

      <div>
        <Card className="custom-card border border-primary">
          {/* <Card.Header>
            <div className="card-title" style={{ textTransform: "none" }}>
              <h5> Stage-I Fee Exempted</h5>
            </div>
          </Card.Header> */}
          <Card.Body>
            <Row style={{ marginTop: "1rem" }}>
              <Col md={12}>
                <div className="jumbotron">
                  <h1 className="display-4"> ✅ Successfully stage-I complited.</h1>
                  <p className="lead">
                    Thank you for submitting your application, your Registration for Stage I has been Completed. <br /> You can now upload relavent documents of stage I
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
          {/* <Card.Footer>
          
        </Card.Footer> */}
        </Card>

        <Card className="custom-card border border-primary">
          {/* <Card.Header>
            <div className="card-title" style={{ textTransform: "none" }}>
              <h5> Stage I Fee Exempted</h5>
            </div>
          </Card.Header> */}
          <Card.Body>
            <Row style={{ marginTop: "1rem" }}>
              <Col md={12}>
                <table style={{ width: "98%" }} className="custom-table"
                >
                  <tbody>
                    <tr>
                      <th>Allication Id:</th>
                      <td>ABC123</td>
                    </tr>
                    <tr>
                      <th>Payment Status:</th>
                      <td>Exempted</td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                      <td>Successfull</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between mb-3">
              <Button 
                className="p-2" variant="warning">
                Previous
              </Button>
              <Button className="p-2"
                variant="success"
              >
                Upload Document
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>

    </>
  )

}

export const StageIPaidInfo = () => {

  return (
    <>

      <div>
        <Card className="custom-card border border-primary">
          {/* <Card.Header>
            <div className="card-title" style={{ textTransform: "none" }}>
              <h5> Stage-I Fee Exempted</h5>
            </div>
          </Card.Header> */}
          <Card.Body>
            <Row style={{ marginTop: "1rem" }}>
              <Col md={12}>
                <div className="jumbotron">
                  <h1 className="display-4"> ✅ Payment Successfully Stage-I Completed</h1>
                  <p className="lead">
                    Thank you, for submitting your Application. <br/> 
                    Your Registration for Stage-I has been completed. You can now upload relavent document
                  </p>
                  <p className="lead">
                    Your Payment has been received and recorded successfully. Please keep the Transation Id for your reference.
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
          {/* <Card.Footer>
          
        </Card.Footer> */}
        </Card>

        <Card className="custom-card border border-primary">
          {/* <Card.Header>
            <div className="card-title" style={{ textTransform: "none" }}>
              <h5> Stage I Fee Exempted</h5>
            </div>
          </Card.Header> */}
          <Card.Body>
            <Row style={{ marginTop: "1rem" }}>
              <Col md={12}>
                <table style={{ width: "98%" }} className="custom-table"
                >
                  <tbody>
                    <tr>
                      <th>Allication Id:</th>
                      <td>ABC123</td>
                    </tr>
                    <tr>
                      <th>Transaction ID:</th>
                      <td>ABC123</td>
                    </tr>
                    <tr>
                      <th>Payment Date:</th>
                      <td>Paid</td>
                    </tr>
                    <tr>
                      <th>Amount Paid:</th>
                      <td>Rs. 10,000</td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                      <td>Successfull</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between mb-3">
              <Button 
                className="p-2" variant="warning">
                Previous
              </Button>
              <Button className="p-2"
                variant="success"
              >
                Upload Document
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>

    </>
  )

}
