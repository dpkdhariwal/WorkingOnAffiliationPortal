import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ViewApplication } from "./Modal/view_application";

const FeePayment = () => {
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

  return (
    <Fragment>
      <Formik
        validationSchema={yup.object().shape({
          category: yup.string().required("Please select a category"),
          Is_the_applicant_running_any_other_iti: yup
            .string()
            .required("Please select if applicant is running any other ITI"),
        })}
        validateOnChange={() => console.log("validateOnChange")}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          setisHidden(false); // Show "Next" button after submission
          let timerInterval;
          Swal.fire({
            title: "Saving on Local Storage",
            html: "Please wait...",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer()?.querySelector("b");
              if (b) {
                timerInterval = setInterval(() => {
                  const remainingTime = Swal.getTimerLeft();
                  if (remainingTime) {
                    b.textContent = remainingTime.toString();
                  }
                }, 100);
              }
              dispatch({ type: "set_comp_stateI_III", payload: values });
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          })
            .then((result) => {
              // throw new Error("Error saving to local storage");
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                // Do something when the timer expires
              }
              navigate(
                "?stage=1&form_id=Basic Details of Applicant  Organization"
              );
            })
            .catch((error) => {
              console.error("Error saving to local storage:", error);
            });
        }}
        initialValues={{
          category: "",
          Is_the_applicant_running_any_other_iti: "yes",
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
              <p><ul>
                <li>Please preview the application before fee payment. No editing in
                application would be allowed after fee payment.</li></ul></p>
              <div className="d-grid gap-2 mb-4">
                <ViewApplication />
              </div>
                

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I have previewed the application and I am sure that all the
                  details are correct. <span style={{ color: "red" }}>*</span>{" "}
                  {/* <span>
                    (As per Annexure-3):{" "}
                    <Button variant="link" className="rounded-pill btn-wave">
                      Download Format
                    </Button>
                  </span> */}
                </label>
              </div>

              <Card
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
              </Card>
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
                <Card.Footer  className="d-flex justify-content-end">
                              <Button size="lg" variant="instagram">Pay</Button>
                </Card.Footer>
              </Card>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

export default FeePayment;
