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

import { UPDATE_STAGE_II_SET_FEE_STATUS } from "affserver";
import { STAGE_II__FEE_PAID, STAGE_II__FEE_EXEMPTED, STAGE_II_FEE } from "affserver";
import { useLocation } from "react-router-dom";

import { getStepStatus, getProposedInstDetailsByUserId, setAppFlow } from "../../../../db/users";

import * as ap from "@/services/applicant/index";
const FeePayment = ({ isView = false, nav }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const PropInstiInfo = useSelector((state) => state.ProposedInstituteInfo);

  const [isHidden, setisHidden] = useState([true]);

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  //Custom Validation
  const stageI1_info = useSelector((state) => state.new_registration);
  // useEffect(() => { console.log("stageI1_info", stageI1_info); }, []);

  const handleExternalSubmit = () => {
    if (formRef2.current) {
      console.log(formRef2.current);
      formRef2.current.requestSubmit(); // Better than .submit() — triggers onSubmit properly
    }
  };

  const navigate = useNavigate();
  // const updateQuery = () => { navigate("?stage=1&form_id=Basic Details of Applicant  Organization"); };

  const gotoNext = () => {
    console.log("gotoNext called");
    navigate("?stage=1&form_id=Details of the Proposed Institute");
  };

  const formikRef = useRef();
  const reg = useSelector((state) => state.reg);

  const submit = async (values) => {
    // console.log(PropInstiInfo);
    // setAppFlow(appId, STAGE_II_FEE);
    // // dispatch({ type: UPDATE_STAGE_II_SET_FEE_STATUS, payload: PropInstiInfo });
    // dispatch({ type: "set_filled_step_II", payload: { step: 5 }, });
    // dispatch({ type: "reg_set_active_stepII", payload: { step: 6 } });
    // setActive(reg.stepsII[6]);

    try {
      Swal.fire({
        title: "Saving...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      });

      // ✅ Wait for API to finish
      await ap.setAsExemptedStageII(values, appId);

      nav.next();

      Swal.close();

      // ✅ Show success alert after saving
      Swal.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your data has been saved successfully.",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then(() => {
        console.log("OK");
        // ✅ Navigate when user clicks OK
        navigate(0); // ← change this to your route
      });
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "Something went wrong while saving. Please try again.",
      });
      console.error(error);
    }
  };

  const AppliInfo = useSelector((state) => state.AppliInfo);

  const [stepInfo, setStepInfo] = useState({});
  const [proInstiInfo, setProInstiInfo] = useState({});


  // useEffect(() => {
  //   getStepStatus(appId, STAGE_II_FEE).then((data) => {
  //     console.log(data[0]);
  //     setStepInfo(data[0]);
  //   });
  //   getProposedInstDetailsByUserId(appId).then((data) => {
  //     console.log(data);
  //     setProInstiInfo(data);
  //   })
  // }, [])


  const loadData = async () => {
    try {
      const resp = await ap.getAppStatus(appId);
      const data = resp.data;
      setStepInfo(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [appId]);

  useEffect(() => {
    console.log(stepInfo);
  }, [stepInfo]);



  return (
    <Fragment>
      {stepInfo?.stageII_fee_info?.status === STAGE_II__FEE_PAID ? (<StageIIPaidInfo />) : stepInfo?.stageII_fee_info?.status === STAGE_II__FEE_EXEMPTED ? (<StageIIExemtedInfo />) :
        <Formik
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

                {false && (<div className="d-grid gap-2 mb-4">
                  <p><ul>
                    <li>Please preview the application before fee payment. No editing in
                      application would be allowed after fee payment.</li></ul></p>
                  <ViewApplication />
                </div>)}

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


                {stepInfo?.institute_info?.type_of_institute === "Government" ? (<Card
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
                </Card>)
                  :
                  stepInfo?.institute_info?.type_of_institute === "Private" ? (
                    <Card
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

                    </Card>)
                    :
                    ''}

              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                {stepInfo?.institute_info?.type_of_institute === "Government" ? (
                  <Button size="lg" variant="facebook" onClick={() => formikRef.current?.submitForm()}
                  >
                    Save & Next
                  </Button>
                ) : stepInfo?.institute_info?.type_of_institute === "Private" ? (
                  <Button size="lg" variant="instagram" onClick={() => formikRef.current?.submitForm()} >
                    Pay
                  </Button>
                ) : ''}
              </Card.Footer>
            </Card>
          )}
        </Formik>
      }
    </Fragment>
  );
};

export default FeePayment;



export const StageIIExemtedInfo = () => {

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
                  <h1 className="display-4"> ✅ Successfully stage-II complited.</h1>
                  <p className="lead">
                    Thank you for submitting your application, your Registration for Stage II has been Completed. <br /> You can now Submit Machinery/Tools/Equipment Details
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
                Save & Next
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>

    </>
  )

}

export const StageIIPaidInfo = () => {

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
                  <h1 className="display-4"> ✅ Payment Successfully Stage-II Completed</h1>
                  <p className="lead">
                    Thank you, for submitting your Application. <br />
                    Your Registration for Stage-II has been completed. You can now Sumibt Machinery, Tools, Equipment Details

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
                Save & Next
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>

    </>
  )

}
