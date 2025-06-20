import { Fragment, useState, useRef, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { label } from "yet-another-react-lightbox";
import { entityCategories } from "../../../../constants";
// import Exclamation from "../comp/PrimeReact/PrimeReact";

const BasicDetailsofApplicantOrganization = () => {
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
          Is_the_applicant_running_any_other_iti: "no",
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Card className="custom-card shadow">
            <Card.Header>
              <div className="card-title" style={{ textTransform: "none" }}>
                Basic Details of Applicant Entity
              </div>
            </Card.Header>
            <Card.Body>
              <Form ref={formRef2} onSubmit={handleSubmit} validated>
                <Form.Label>
                  Category of Applicant Entity
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Row className="mb-3">
                  {entityCategories.map(
                    (label, index) => (
                      console.log(label),
                      (
                        <Form.Group key={index} as={Col} md="3">
                          <div className="d-flex align-items-center gap-2">
                            <Form.Check
                              key={index}
                              type="radio"
                              label={label.label}
                              name="category"
                              value={label.label}
                              onChange={handleChange}
                              isInvalid={touched.category && !!errors.category}
                              checked={values.category === label.label}
                            />

                            {/* <Exclamation/> */}

                            {label.metaInfo.i != "" && (
                              <i
                                className="fe fe-help-circle"
                                style={{ cursor: "pointer", color: "#6c757d" }}
                                title={label.metaInfo.i}
                                onClick={() =>
                                  alert(`Info about ${label.metaInfo.i}`)
                                } // Replace with your actual logic
                              ></i>
                            )}
                          </div>

                          {touched.category && errors.category && (
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors.category}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      )
                    )
                  )}
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>
                      Name of Applicant Entity{" "}
                      <span style={{ color: "red" }}>*</span>
                      <i
                        className="fe fe-help-circle"
                        style={{ cursor: "pointer", color: "#6c757d" }}
                        title="An individual or entity that submits an application to the DGT for affiliation related purposes, including the establishment of a new Industrial Training Institute (ITI), addition of trades or units in an existing ITI, shifting or relocation of an existing institute, renewal of affiliation, surrender of trades or units in an existing ITI, or any other process as specified under these Norms"
                        onClick={() => alert(`Info about About`)} // Replace with your actual logic
                      ></i>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="name_of_applicant_organization"
                      placeholder="Name of Applicant Entity"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  {/* <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Label>
                      Address of Applicant Entity{" "}
                      <span style={{ color: "red" }}>*</span>
                      <i
                        className="fe fe-help-circle"
                        style={{ cursor: "pointer", color: "#6c757d" }}
                        title="More info about this option"
                        onClick={() => alert(`Info about About`)} // Replace with your actual logic
                      ></i>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="address_of_applicant_organization"
                      placeholder="Address of Applicant Entiry"
                      defaultValue=""
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group> */}
                  <Col md={12}>
                    <Form.Label>
                      <h6>
                        Address of Applicant Entity{" "}
                        <span style={{ color: "red" }}>*</span>
                        {/* <i
                        className="fe fe-help-circle"
                        style={{ cursor: "pointer", color: "#6c757d" }}
                        title="More info about this option"
                        onClick={() => alert(`Info about About`)} // Replace with your actual logic
                      ></i> */}
                      </h6>
                    </Form.Label>
                  </Col>
                  <Col md={12}>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom02"
                      >
                        <Form.Label>
                          Applicant Entity State
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          required
                          name="state_of_other_iti"
                        >
                          <option value="" selected>
                            Select State
                          </option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
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
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
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
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
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
                          Applicant Entity District
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          required
                          name="district_of_other_iti"
                        >
                          <option value="" selected>
                            District
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
                          Applicant Entity Town/City
                          <span style={{ color: "red" }}>*</span>
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
                          Applicant Entity Block/Tehsil
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
                          Applicant Entity Sector/Village
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
                          Applicant Entity Pincode
                          <span style={{ color: "red" }}>*</span>
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
                          Applicant Entity Plot Number/Khasara Number/Gata
                          Number
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
                          Applicant Entity Landmark
                          <span style={{ color: "red" }}>*</span>
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
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>
                      Applicant Entity Email Id{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>

                    <div className="d-flex align-items-center gap-2">
                      <Form.Control
                        required
                        type="email"
                        name="email_of_applicant_organization"
                        placeholder="Applicant Entity Email Id"
                        defaultValue=""
                      />
                      <Button variant="primary">Verify</Button>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Select Document
                    </Form.Control.Feedback>
                    {/* <InputGroup>
                      <Form.Control
                        required
                        type="email"
                        name="email_of_applicant_organization"
                        placeholder="Applicant Entity Email Id"
                        defaultValue=""
                      />
                      <Button variant="outline-secondary" id="button-verify">
                        Verify
                      </Button>
                    </InputGroup> */}
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>
                      Applicant Contact Number
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Control
                        required
                        type="text"
                        name="contact_number_of_applicant"
                        placeholder="Applicant Contact Number"
                        defaultValue=""
                      />
                      <Button variant="primary">Verify</Button>
                    </div>
                    {/* <InputGroup>
                      <Form.Control
                        required
                        type="text"
                        name="contact_number_of_applicant"
                        placeholder="Applicant Contact Number"
                        defaultValue=""
                      />
                      <Button
                        variant="outline-primary"
                        id="button-verify-phone"
                      >
                        Verify
                      </Button>
                    </InputGroup> */}
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {[
                  "Society / Trust",
                  "Private Limited Company",
                  "Public Limited Company",
                  "Union Territory Administration / Society / Trust registered by them",
                ].includes(
                  stageI1_info?.stage_I
                    ?.section_category_of_applicant_organization
                    ?.category_of_applicant_organization
                ) && (
                  <Row className="mb-3">
                    <Col md="12">
                      <Card className="border border-info custom-card">
                        <Card.Header>
                          <div className="card-title">
                            Details of Secretary/Chairperson/President
                            <span style={{ color: "red" }}>*</span>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Row className="mb-3">
                            <Form.Group
                              as={Col}
                              md="3"
                              controlId="validationCustom02"
                            >
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                name="name_of_secretary_chairperson_president"
                                placeholder="Name"
                                defaultValue=""
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
                                Designation
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                name="designation_of_secretary_chairperson_president"
                                placeholder="Designation"
                                defaultValue=""
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
                                Email Id <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                name="email_id_of_secretary_chairperson_president"
                                placeholder="Email Id"
                                defaultValue=""
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
                                Mobile Number
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                name="mobile_number_of_secretary_chairperson_president"
                                placeholder="Mobile Number"
                                defaultValue=""
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
                                ID proof <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                name="id_proof_of_secretary_chairperson_president"
                                placeholder="ID proof"
                                defaultValue=""
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
                )}

                {[
                  "Society / Trust",
                  "Private Limited Company",
                  "Public Limited Company",
                ].includes(values.category) && (
                  <Row className="mb-3">
                    <Col md="12">
                      <Card className="border border-info custom-card">
                        {/* <Card.Header>
                        <div className="card-title">
                          provide details of applicant running any other ITI
                        </div>
                      </Card.Header> */}
                        <Card.Body>
                          <Row className="mb-3">
                            <Form.Group>
                              <Form.Label>
                                Is the Applicant Running Any Other ITI?
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <div>
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  name="Is_the_applicant_running_any_other_iti"
                                  value="yes"
                                  onChange={handleChange}
                                  checked={
                                    values.Is_the_applicant_running_any_other_iti ===
                                    "yes"
                                  }
                                  isInvalid={
                                    touched.Is_the_applicant_running_any_other_iti &&
                                    !!errors.Is_the_applicant_running_any_other_iti
                                  }
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  name="Is_the_applicant_running_any_other_iti"
                                  value="no"
                                  onChange={handleChange}
                                  checked={
                                    values.Is_the_applicant_running_any_other_iti ===
                                    "no"
                                  }
                                  isInvalid={
                                    touched.Is_the_applicant_running_any_other_iti &&
                                    !!errors.Is_the_applicant_running_any_other_iti
                                  }
                                />
                              </div>

                              <Form.Control.Feedback type="invalid">
                                {errors.category}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>
                          {values.Is_the_applicant_running_any_other_iti ===
                            "yes" && (
                            <Row className="mb-3">
                              <Form.Group as={Col} md={12}>
                                <label className="form-label">
                                  If Yes, Please Provide Details of the ITI
                                </label>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom02"
                              >
                                <Form.Label>
                                  ITI Name
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  name="name_of_other_iti"
                                  placeholder="Name"
                                  defaultValue=""
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
                                  MIS Code
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  name="mis_code_of_other_iti"
                                  placeholder="MIS Code"
                                  defaultValue=""
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
                                  State<span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  as="select"
                                  required
                                  name="state_of_other_iti"
                                >
                                  <option value="" disabled>
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
                                  <option value="Chhattisgarh">
                                    Chhattisgarh
                                  </option>
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
                                  <option value="Maharashtra">
                                    Maharashtra
                                  </option>
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
                                  <option value="Uttarakhand">
                                    Uttarakhand
                                  </option>
                                  <option value="West Bengal">
                                    West Bengal
                                  </option>
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
                                  <option value="Lakshadweep">
                                    Lakshadweep
                                  </option>
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
                                  District
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  as="select"
                                  required
                                  name="district_of_other_iti"
                                >
                                  <option value="" disabled>
                                    Select District
                                  </option>
                                  <option value="Delhi">Delhi</option>
                                  <option value="Mumbai">Mumbai</option>
                                  <option value="Bengaluru">Bengaluru</option>
                                  <option value="Chennai">Chennai</option>
                                  <option value="Kolkata">Kolkata</option>
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
                                  Town/City
                                  <span style={{ color: "red" }}>*</span>
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
                                md="3"
                                controlId="validationCustom02"
                              >
                                <Form.Label>
                                  Plot Number/Khasara Number
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="address"
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
                                  Landmark
                                  <span style={{ color: "red" }}>*</span>
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
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                )}
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button  variant="success">Save & Continue</Button>
            </Card.Footer>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

export default BasicDetailsofApplicantOrganization;
