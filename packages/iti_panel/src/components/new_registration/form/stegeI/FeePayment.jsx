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

import { UPDATE_SET_FEE_STATUS } from "../../../../constants"

const FeePayment = ({ setActive }) => {
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

  const PropInstiInfo = useSelector((state) => state.ProposedInstituteInfo);

  const reg = useSelector((state) => state.reg);

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
            dispatch({ type: UPDATE_SET_FEE_STATUS, payload: PropInstiInfo });
            Swal.close();

            Swal.showLoading();
            Swal.fire({
              title: "Fee Payment",
              text: "You Have Paid Stage-I Fee",
              icon: "success",
              confirmButtonText: "Ok, Go Next",
            }).then((result) => {
              if (result.isConfirmed) {
                // User confirmed – now show loading or save directly
                Swal.fire({
                  title: "Saving...",
                  didOpen: () => {
                    dispatch({ type: "set_filled_step", payload: { step: 4 }, });
                    dispatch({ type: "reg_set_active_step", payload: { step: 5 } });
                    setActive(reg.steps[5]);
                    Swal.close();
                  },
                });
              } else {
                console.log("User cancelled save");
              }
            });
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
              <p>
                <ul>
                  <li>Please preview the application before fee payment. No editing in
                    application would be allowed after fee payment.</li></ul></p>
              <div className="d-grid gap-2 mb-4">
                {/* <ViewApplication /> */}
                <Button size="lg" onClick={() => navigate('/dashboard/application_stage_1_form')}>
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

              {PropInstiInfo.type_of_institute === "Government" ? (<Card
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
              </Card>) : PropInstiInfo.type_of_institute === "Private" ? (<Card
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
              {PropInstiInfo.type_of_institute === "Government" ? (
                <Button size="lg" variant="facebook" onClick={() => formikRef.current?.submitForm()}
                >
                  Save & Next
                </Button>
              ) : PropInstiInfo.type_of_institute === "Private" ? (
                <Button size="lg" variant="instagram" onClick={() => formikRef.current?.submitForm()} >
                  Pay
                </Button>
              ) : ''}
            </Card.Footer>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

export default FeePayment;
