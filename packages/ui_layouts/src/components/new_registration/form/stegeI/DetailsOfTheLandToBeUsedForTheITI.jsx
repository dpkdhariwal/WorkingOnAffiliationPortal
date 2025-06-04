import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const DetailsOfTheLandToBeUsedForTheITI = () => {
  const [isHidden, setisHidden] = useState([true]);

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  //Custom Validation
  const stageI1_info = useSelector((state) => state.theme.new_registration);
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
          <Card className="custom-card shadow">
            <Card.Header>
              <div className="card-title" style={{ textTransform: "none" }}>
                <h4>Details of Land</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Form ref={formRef2} onSubmit={handleSubmit} validated>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>
                      Possession of Land<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label="Owned "
                        name="possession_of_land"
                        value="owned "
                        onChange={handleChange}
                        // checked={
                        //   values.Is_the_applicant_running_any_other_iti ===
                        //   "yes"
                        // }
                        // isInvalid={
                        //   touched.Is_the_applicant_running_any_other_iti &&
                        //   !!errors.Is_the_applicant_running_any_other_iti
                        // }
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="Leased"
                        name="possession_of_land"
                        value="leased"
                        onChange={handleChange}
                        // checked={
                        //   values.Is_the_applicant_running_any_other_iti === "no"
                        // }
                        // isInvalid={
                        //   touched.Is_the_applicant_running_any_other_iti &&
                        //   !!errors.Is_the_applicant_running_any_other_iti
                        // }
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.Is_the_applicant_running_any_other_iti}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Col md="12">
                    <Card className="border border-info custom-card">
                      <Card.Header>
                        <div
                          className="card-title"
                          style={{ textTransform: "none" }}
                        >
                          Owned Land
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Land Owner’s Name
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Land Owner’s Name"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Land Registration Number
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Land Registration Number"
                              name="block_or_tehsil_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md="12">
                    <Card className="border border-info custom-card">
                      <Card.Header>
                        <div
                          className="card-title"
                          style={{ textTransform: "none" }}
                        >
                          Leased Land
                          <div>
                            <p style={{ "font-weight": "400" }}>
                              (For leased land, the lease deed should be
                              registered between the lessor and lessee for a
                              minimum period of six years from the date of the
                              application.)
                            </p>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Name of Lessor
                              <span style={{ color: "red" }}>
                                *{" "}
                                <i
                                  className="fe fe-help-circle"
                                  style={{
                                    cursor: "pointer",
                                    color: "#6c757d",
                                  }}
                                  title="The lessor is the person or party who owns an asset or property and grants the right to use it to another party under a lease agreement."
                                  onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                ></i>
                              </span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter Name of Lessor"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Name of Lessee
                              <span style={{ color: "red" }}>
                                *
                                <i
                                  className="fe fe-help-circle"
                                  style={{
                                    cursor: "pointer",
                                    color: "#6c757d",
                                  }}
                                  title="The lessee is the person or party who receives the right to use an asset or property from the lessor in exchange for payment, usually called rent, as per the term and condition defined in a lease agreement."
                                  onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                ></i>
                              </span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter Name of Lessee"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Lease Deed Numbe
                              <span style={{ color: "red" }}>
                                *
                                <i
                                  className="fe fe-help-circle"
                                  style={{
                                    cursor: "pointer",
                                    color: "#6c757d",
                                  }}
                                  title=" It refers to the official registration or reference number assigned by
the registering authority to a lease deed, serving as proof of the legal validity and record
of the lease agreement between the property owner and the lessee."
                                  onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                ></i>
                              </span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Lease Deed Number"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Date of Commencement
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="date"
                              placeholder="Date of Commencement"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom03"
                          >
                            <Form.Label>
                              Date of Expiry
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="date"
                              placeholder="Date of Commencement"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>
                      Land Area (In Square Metres)
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Land Area (in Square Metres)"
                        name="land_area_in_square_metres"
                      />
                      <Button variant="outline-secondary">
                        In Square Metres
                      </Button>
                    </InputGroup>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

export default DetailsOfTheLandToBeUsedForTheITI;
