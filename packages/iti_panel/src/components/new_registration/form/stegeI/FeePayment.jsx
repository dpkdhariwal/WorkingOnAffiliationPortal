import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ViewApplication } from "./Modal/view_application";
import { Form as BootstrapForm } from 'react-bootstrap';

import { UPDATE_SET_FEE_STATUS } from "affserver"
import { useContext } from "react";
import { AppStatusContext } from "../../../../services/context";
import { useLocation } from "react-router-dom";
import { setAppCurrentStatus } from "../../../../db/users";
import { getStageIFeeInfo } from "../../../../db/forms/stageI/get/get";
import { markAsCompleteStageStep, setActiveStage1NextStep } from "../../../../db/forms/stageI/set/set";
import { getAppFlowInfoByStep } from "../../../../db/forms/app/app";
import * as C from "affserver"
const FeePayment = ({ step, setActive }) => {

  const { Formik } = formik;
  const dispatch = useDispatch();
  const { appStatus } = useContext(AppStatusContext);

  const [propInstiInfo, setPropInstiInfo] = useState({});
  const [feeInfo, setFeeInfo] = useState({});


  const navigate = useNavigate();

  // const PropInstiInfo = useSelector((state) => state.ProposedInstituteInfo);
  const reg = useSelector((state) => state.reg);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const authUser = useSelector((state) => state.loginUserReducer);


  const getAppStatusByKey = async () => {
    let result = await getAppFlowInfoByStep(appId, C.STAGE_I_FEE);
    setFeeInfo(result);
    // setPropInstiInfo(result);
  }

  const getStepInfo = async () => {
    console.log(appId);
    let result = await getStageIFeeInfo(appId);
    setPropInstiInfo(result);
  }


  const markAsComplete = async () => {
    await markAsCompleteStageStep(authUser, appId, step.step)
    await setActiveStage1NextStep(appId, step.nextStep);
  }

  useEffect(() => {
    getStepInfo()
    getAppStatusByKey()
  }, []);

  const submit = (values) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the form data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed – now show loading or save directly
        Swal.fire({
          title: "Saving...",
          didOpen: () => {
            Swal.showLoading();

            setAppCurrentStatus(appId, propInstiInfo.type_of_institute).then((data) => {
              console.log(data);
              markAsComplete();

            })

            // let newState = dispatch({ type: UPDATE_SET_FEE_STATUS, payload: PropInstiInfo });
            // console.log(newState);
            Swal.close();

            Swal.showLoading();
            // Swal.fire({
            //   title: "Fee Payment",
            //   text: "You Have Paid Stage-I Fee",
            //   icon: "success",
            //   confirmButtonText: "Ok, Go Next",
            // }).then((result) => {
            //   if (result.isConfirmed) {
            //     // User confirmed – now show loading or save directly
            //     Swal.fire({
            //       title: "Saving...",
            //       didOpen: () => {
            //         dispatch({ type: "set_filled_step", payload: { step: 4 }, });
            //         dispatch({ type: "reg_set_active_step", payload: { step: 5 } });
            //         setActive(reg.steps[5]);
            //         Swal.close();
            //       },
            //     });
            //   } else {
            //     console.log("User cancelled save");
            //   }
            // });
          },
        });
      } else {
        console.log("User cancelled save");
      }
    });
  };
  const formikRef = useRef();

  return (
    <Fragment>

      {feeInfo.status === C.STAGE_I__FEE_PAID ? (<StageIPaidInfo />) : feeInfo.status === C.STAGE_I__FEE_EXEMPTED ? (<StageIExemtedInfo />) : <Formik
        innerRef={formikRef}

        validationSchema={yup.object().shape({
          iaccept: yup.string().required("Mark on I accept check box"),
        })}
        validateOnChange={true}
        onSubmit={(values) => {
          console.log(values);
          submit(values);
        }}
        initialValues={{
          iaccept: "",
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Card className="custom-card border border-primary">
            {/* <Card.Header>
            <div className="card-title" style={{ textTransform: "none" }}>
              Self Declaration
            </div>
          </Card.Header> */}
            <Card.Body>
              <p>
                <ul>
                  <li>Please preview the application before fee payment. No editing in
                    application would be allowed after fee payment.</li></ul></p>
              <div className="d-grid gap-2 mb-4">
                {/* <ViewApplication /> */}
                <Button size="lg" onClick={() => navigate(`/dashboard/application_stage_1_form?appId=${appId}`)}>
                  View Application
                </Button>              </div>


              <div className="form-check">
                <BootstrapForm noValidate onSubmit={handleSubmit}>
                  <BootstrapForm.Check
                    type="checkbox"
                    id="flexCheckDefault"
                    name="iaccept"
                    label="I Accept"
                    value={values.iaccept}
                    onChange={handleChange}
                    isInvalid={touched.iaccept && !!errors.iaccept}
                    feedback={errors.iaccept}
                  // feedbackType="invalid"
                  />
                </BootstrapForm>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I have previewed the application and I am sure that all the
                  details are correct. <span style={{ color: "red" }}>*</span>{" "}
                </label>
              </div>

              {propInstiInfo.type_of_institute === "Government" ? (<Card
                className="custom-card border border-primary"
                style={{ marginTop: "1rem" }}
              >
                <Card.Header>
                  <div className="card-title" style={{ textTransform: "none" }}>
                    Fee Pay Exempted
                  </div>
                </Card.Header>
                <Card.Body>
                  <p>
                    Note:
                    <ol>
                      <li>
                        Government ITIs are exempted from all registration fee
                        for affiliation and accreditation, including conversions
                        from SCVT to NCVET.
                      </li>
                      {/* <li>
                        The above rates may be revised by the DGT at any time,
                        subject to approval from the competent authority.
                      </li> */}
                      <li>
                        No fee shall be charged for applications submitted under
                        the Renewal of Affiliation of ITI and Affiliation for
                        DST application.
                      </li>
                      {/* <li>
                        All payments must be made exclusively through the online
                        payment gateway system provided on portal.
                      </li> */}
                      {/* <li>
                        The above-mentioned registration fee is non-refundable,
                        even if the application is rejected at any stage.
                      </li> */}
                      {/* <li>
                        State/UT Directorates may levy additional fee in
                        accordance with their respective norms and guidelines,
                        including for issuing the NOC. These State-specific fee
                        will be collected by the respective State/UT
                        directorates through their designated platforms or
                        payment modes before the issuance of the NOC. The
                        responsibility for determining and collecting this fee,
                        if any rests solely with the State, with no intervention
                        from the Directorate General of Training (DGT).
                      </li> */}
                    </ol>
                  </p>
                </Card.Body>
              </Card>) : propInstiInfo.type_of_institute === "Private" ? (<Card
                className="custom-card border border-primary"
                style={{ marginTop: "1rem" }}
              >
                <Card.Header>
                  <div className="card-title" style={{ textTransform: "none" }}>
                    Terms and Conditions
                  </div>
                </Card.Header>
                <Card.Body>
                  <p>
                    Note:
                    <ol>
                      {/* <li>
                        Government ITIs are exempted from all registration fee
                        for affiliation and accreditation, including conversions
                        from SCVT to NCVET.
                      </li> */}
                      <li>
                        The above rates may be revised by the DGT at any time,
                        subject to approval from the competent authority.
                      </li>
                      <li>
                        No fee shall be charged for applications submitted under
                        the Renewal of Affiliation of ITI and Affiliation for
                        DST application.
                      </li>
                      <li>
                        All payments must be made exclusively through the online
                        payment gateway system provided on portal.
                      </li>
                      <li>
                        The above-mentioned registration fee is non-refundable,
                        even if the application is rejected at any stage.
                      </li>
                      <li>
                        State/UT Directorates may levy additional fee in
                        accordance with their respective norms and guidelines,
                        including for issuing the NOC. These State-specific fee
                        will be collected by the respective State/UT
                        directorates through their designated platforms or
                        payment modes before the issuance of the NOC. The
                        responsibility for determining and collecting this fee,
                        if any rests solely with the State, with no intervention
                        from the Directorate General of Training (DGT).
                      </li>
                    </ol>
                    <p>
                      {" "}
                      The payment of fee merely does not guarantee the granting
                      of affiliation. The institute must strictly adhere to the
                      prescribed procedures, norms, and guidelines for
                      affiliation and accreditation.
                    </p>
                  </p>
                </Card.Body>
              </Card>) : ''}
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
              {propInstiInfo.type_of_institute === "Government" ? (
                <Button size="lg" variant="facebook" onClick={() => formikRef.current?.submitForm()}
                >
                  Save & Next
                </Button>
              ) : propInstiInfo.type_of_institute === "Private" ? (
                <Button size="lg" variant="instagram" onClick={() => formikRef.current?.submitForm()} >
                  Pay
                </Button>
              ) : ''}
            </Card.Footer>
          </Card>
        )}
      </Formik>}




    </Fragment>
  );
};

export default FeePayment;
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