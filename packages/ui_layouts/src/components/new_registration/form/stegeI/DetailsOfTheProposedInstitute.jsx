import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const DetailsOfTheProposedInstitute = () => {
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
          is_falls_under_hill_area_hill: "no",
          is_falls_under_border_district: "no",
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Card className="custom-card shadow">
            <Card.Header>
              <div className="card-title" style={{ textTransform: "none" }}>
                Details of the Proposed Institute
              </div>
            </Card.Header>
            <Card.Body>
              <Form ref={formRef2} onSubmit={handleSubmit} validated>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>
                      Name of the Applicant Institute
                      <span style={{ color: "red" }}>*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="name_of_applicant_institute"
                      placeholder="Name of the applicant Institute "
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Col md={6}>
                    <div className="d-flex justify-content-center mb-3">
                      <div className="p-2"><Form.Group controlId="validationCustom01">
                        <Form.Label>
                          Type of Institute?
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div>
                          <Form.Check
                            inline
                            type="radio"
                            label="Government"
                            name="type_of_institute"
                            value="Government"
                            onChange={handleChange}
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Private"
                            name="type_of_institute"
                            value="Private"
                            onChange={handleChange}
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.Is_the_applicant_running_any_other_iti}
                        </Form.Control.Feedback>
                      </Form.Group></div>
                    </div>
                   
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
                          Complete Postal Address of the Applicant Institute
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
                              State<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              as="select"
                              required
                              name="state_of_other_iti"
                            >
                              <option value="" selected>
                                Select State
                              </option>
                              <option value="Andhra Pradesh">
                                Andhra Pradesh
                              </option>
                              <option value="Arunachal Pradesh">
                                Arunachal Pradesh
                              </option>
                              <option value="Assam">Assam</option>
                              <option value="Bihar">Bihar</option>
                              <option value="Chhattisgarh">Chhattisgarh</option>
                              <option value="Goa">Goa</option>
                              <option value="Gujarat">Gujarat</option>
                              <option value="Haryana">Haryana</option>
                              <option value="Himachal Pradesh">
                                Himachal Pradesh
                              </option>
                              <option value="Jharkhand">Jharkhand</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Kerala">Kerala</option>
                              <option value="Madhya Pradesh">
                                Madhya Pradesh
                              </option>
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="Manipur">Manipur</option>
                              <option value="Meghalaya">Meghalaya</option>
                              <option value="Mizoram">Mizoram</option>
                              <option value="Nagaland">Nagaland</option>
                              <option value="Odisha">Odisha</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Rajasthan">Rajasthan</option>
                              <option value="Sikkim">Sikkim</option>
                              <option value="Tamil Nadu">Tamil Nadu</option>
                              <option value="Telangana">Telangana</option>
                              <option value="Tripura">Tripura</option>
                              <option value="Uttar Pradesh">
                                Uttar Pradesh
                              </option>
                              <option value="Uttarakhand">Uttarakhand</option>
                              <option value="West Bengal">West Bengal</option>
                              <option value="Andaman and Nicobar Islands">
                                Andaman and Nicobar Islands
                              </option>
                              <option value="Chandigarh">Chandigarh</option>
                              <option value="Dadra and Nagar Haveli and Daman and Diu">
                                Dadra and Nagar Haveli and Daman and Diu
                              </option>
                              <option value="Delhi">Delhi</option>
                              <option value="Jammu and Kashmir">
                                Jammu and Kashmir
                              </option>
                              <option value="Ladakh">Ladakh</option>
                              <option value="Lakshadweep">Lakshadweep</option>
                              <option value="Puducherry">Puducherry</option>
                            </Form.Control>
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
                              District<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              as="select"
                              required
                              name="district_of_other_iti"
                            >
                              <option value="" selected>
                                Select District
                              </option>
                              {/* <option value="Delhi">Delhi</option>
                              <option value="Mumbai">Mumbai</option>
                              <option value="Bengaluru">Bengaluru</option>
                              <option value="Chennai">Chennai</option>
                              <option value="Kolkata">Kolkata</option> */}
                            </Form.Control>
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
                              Town/City<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Town/City"
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
                              Block/Tehsil
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Block/Tehsil"
                              name="block_or_tehsil_of_other_iti"
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
                              Sector/Village
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Sector/Village"
                              name="block_or_tehsil_of_other_iti"
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
                              Pincode<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Pincode"
                              name="pincode_of_other_iti"
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
                              Plot Number/Khasara Number/Gata Number
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Plot Number/Khasara Number/Gata Number"
                              name="plot_number_khasara_number_of_other_iti"
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
                              Landmark<span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Landmark"
                              name="Landmark"
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
                        <h6>Institute Location</h6>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md={4}
                            controlId="validationCustom01"
                          >
                            <Form.Label>
                              Type of Institute
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <div>
                              <Form.Check
                                inline
                                type="radio"
                                label="Urban"
                                name="institute_location"
                                value="Urban"
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
                                label="Rural"
                                name="institute_location"
                                value="Rural"
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

                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>
                                Falls Under Hill Area/Hill?
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <div>
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  name="is_falls_under_hill_area_hill"
                                  value="yes"
                                  onChange={handleChange}
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  name="is_falls_under_hill_area_hill"
                                  value="no"
                                  onChange={handleChange}
                                />
                              </div>
                              <Form.Control.Feedback type="invalid">
                                {errors.category}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex">
                              <div className="p-2 flex-fill">
                                {values.is_falls_under_hill_area_hill ===
                                  "yes" && (
                                  <div className="p-2 flex-fill">
                                    <Form.Group controlId="validationCustom02">
                                      <Form.Label>
                                        If Yes, Upload Supporting Government
                                        Notification/Order/Circular
                                        <span style={{ color: "red" }}>*</span>
                                      </Form.Label>
                                      <Form.Control
                                        required
                                        type="file"
                                        name="name_of_other_iti"
                                        onChange={handleChange} // if using Formik or handling file upload
                                        isInvalid={
                                          touched.name_of_other_iti &&
                                          !!errors.name_of_other_iti
                                        }
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {errors.name_of_other_iti}
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Col>

                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>
                                Falls Under Border District?
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <div>
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  name="is_falls_under_border_district"
                                  value="yes"
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
                                  label="No"
                                  name="is_falls_under_border_district"
                                  value="no"
                                  onChange={handleChange}
                                  // checked={
                                  //   values.Is_the_applicant_running_any_other_iti ===
                                  //   "no"
                                  // }
                                  // isInvalid={
                                  //   touched.Is_the_applicant_running_any_other_iti &&
                                  //   !!errors.Is_the_applicant_running_any_other_iti
                                  // }
                                />
                              </div>
                              <Form.Control.Feedback type="invalid">
                                {errors.category}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex">
                              {values.is_falls_under_border_district ===
                                "yes" && (
                                <div className="p-2 flex-fill">
                                  <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationCustom02"
                                  >
                                    <Form.Label>
                                      If Yes, Upload Supporting Government
                                      Notification/Order/Circular
                                      <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                      required
                                      type="file"
                                      name="name_of_other_iti"
                                      onChange={handleChange} // if using Formik or handling file upload
                                      isInvalid={
                                        touched.name_of_other_iti &&
                                        !!errors.name_of_other_iti
                                      }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {errors.name_of_other_iti}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>
                      Whether Applying Under Mini Skill Training Institute
                      (MSTI) Category?
                      <span style={{ color: "red" }}>
                        *{" "}
                        <i
                          className="fe fe-help-circle"
                          style={{ cursor: "pointer", color: "#6c757d" }}
                          title="Mini Skill Training Institute (MSTI): Mini Skill Training Institutes (MSTIs) are smaller-scale ITIs established with some relaxed affiliation norms in unserved areas or blocks where no Industrial Training Institutes (ITIs) are present."
                          onClick={() => alert(`Info about About`)} // Replace with your actual logic
                        ></i>
                      </span>
                    </Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label="Yes"
                        name="WhetherapplyingUnderMiniSkillTrainingInstitute(MSTI)Category"
                        value="yes"
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
                        label="No"
                        name="WhetherapplyingUnderMiniSkillTrainingInstitute(MSTI)Category"
                        value="no"
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
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>
                      Whether the Institute Is Exclusive for Women Trainees?
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label="Yes"
                        name="Whether_the_institute_is_exclusive_for_women_trainees"
                        value="yes"
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
                        label="No"
                        name="Whether_the_institute_is_exclusive_for_women_trainees"
                        value="no"
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
                          Coordinates of institute <span style={{'font-weight': 'normal'}}>(For example Delhi - 28.7041°
                          N, 77.1025° E)</span>
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
                              Latitude<span style={{ color: "red" }}>*</span>
                            </Form.Label>

                            <InputGroup>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Latitude"
                                name="latitude"
                              />
                              <Button variant="outline-secondary">
                                Degree
                              </Button>
                              <Button variant="outline-secondary">N</Button>
                            </InputGroup>

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
                              Longitude<span style={{ color: "red" }}>*</span>
                            </Form.Label>

                            <InputGroup>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Longitude"
                                name="Longitude"
                              />
                              <Button variant="outline-secondary">
                                Degree
                              </Button>
                              <Button variant="outline-secondary">E</Button>
                            </InputGroup>

                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

export default DetailsOfTheProposedInstitute;
