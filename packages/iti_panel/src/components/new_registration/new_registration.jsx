import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pageheader from "../../layouts/Pageheader";
// import { Stepper, Step } from "react-form-stepper";

// import CategoryOfApplicantOrganization from "./form/stegeI/CategoryOfApplicantOrganization";
// import BasicDetailsofApplicantOrganization from "./form/stegeI/BasicDetailsofApplicantOrganization";
// import DetailsOfTheProposedInstitute from "./form/stegeI/DetailsOfTheProposedInstitute";
// import DetailsOfTheLandToBeUsedForTheITI from "./form/stegeI/DetailsOfTheLandToBeUsedForTheITI";
// import DetailsOfDocumentsToBeUploaded from "./form/stegeI/DetailsOfDocumentsToBeUploaded";
// import PreviewOfApplication from "./form/stegeI/PreviewOfApplication";
// import DetailsOfTradeUnitForAffiliation from "./form/stegeI/DetailsOfTradeUnitForAffiliation";
// import FeePayment from "./form/stegeI/FeePayment";
import { useLocation } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import { LandDocuments } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/land_documents"

// import { Documents } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/documents"

// import { STAGE_I__FEE_PAID, STAGE_I__FEE_EXEMPTED, STAGE_I__SUBMIT_PENDING, STAGE_I__FEE_PENDING, STAGE_I__SUBMITED, STAGE_I__DOCUMENT_PENDING } from "affserver";

import { AppStatusContext } from "../../services/context";
import { getAppCurrentStatus } from "../../db/users";

import { StageIForm } from "./stage_I_with_stepper";

export const New_registration = () => {
  const reg = useSelector((state) => state.reg);
  const [activeStep, setActiveStep] = useState(reg.steps[0]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  useEffect(() => { console.log(activeStep); }, [reg]);


  const [appStatus, setAppStatus] = useState({});

  useEffect(() => { getAppCurrentStatus(appId).then((data) => { setAppStatus(data[0]) }); }, []);

  return (
    <Fragment>
      <AppStatusContext.Provider value={{ appStatus }} >
        <Pageheader mainheading={`New Application Stage-I Form`} parentfolder="Dashboard" activepage="New Registration" />
        <StageIForm />
      </AppStatusContext.Provider>
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
                    Thank you, for submitting your Application. <br />
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
