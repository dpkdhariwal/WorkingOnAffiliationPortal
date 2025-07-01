import { Fragment, useRef, useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Form as BootstrapForm } from "react-bootstrap";

import * as formik from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { entityCategories } from "../../../../constants";
// import Exclamation from "../comp/PrimeReact/PrimeReact";
import { yupObject, initialValues } from "../../../../reducers/newAppReducer";
import PropTypes from "prop-types";
import Select from "react-select";
import { IndianStates } from "../../../../constants";

const BasicDetailsofApplicantOrganization = ({ setActive }) => {
  const dispatch = useDispatch();
  const reg = useSelector((state) => state.reg);
  const stepInfo = reg.steps[0];
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    console.log(stepInfo.filled);
  }, []);

  const { Formik } = formik;
  const formRef2 = useRef();

  //Custom Validation
  const stageI1_info = useSelector((state) => state.theme.new_registration);
  // useEffect(() => { console.log("stageI1_info", stageI1_info); }, []);

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
            dispatch({ type: "set_comp_stateI_III", payload: values });

            // simulate async save (remove setTimeout if dispatch is sync)
            setTimeout(() => {
              Swal.close(); // close loading alert
              console.log(reg.steps[0]);
              dispatch({
                type: "set_filled_step",
                payload: { step: 0 },
              });
              dispatch({
                type: "reg_set_active_step",
                payload: { step: 1 },
              });
              setActive(reg.steps[1]);
            }, 1000); // optional delay
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
        validationSchema={yup.object().shape(yupObject)}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          submit(values);
        }}
        validateOnChange={(data1, data2) =>
          console.log(data1, data2, "validateOnChange")
        }
        initialValues={initialValues}
        validateOnBlur={true}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Card className="custom-card shadow">
            <Card.Header>
              <div className="card-title" style={{ textTransform: "none" }}>
                Basic Details of Applicant Entity
              </div>
            </Card.Header>
            <Card.Body>
              <Form ref={formRef2} onSubmit={handleSubmit}>
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
                  <Form.Group as={Col} md="4">
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
                      error="Enter Name of Applicant"
                      required
                      type="text"
                      name="name_of_applicant_entity"
                      value={values.name_of_applicant_entity}
                      onChange={handleChange}
                      isInvalid={
                        touched.name_of_applicant_entity &&
                        !!errors.name_of_applicant_entity
                      }
                      placeholder={`Enter Here`}
                    />

                    {touched.name_of_applicant_entity &&
                      errors.name_of_applicant_entity && (
                        <Form.Control.Feedback
                          type="invalid"
                          className="d-block"
                        >
                          {errors.name_of_applicant_entity}
                        </Form.Control.Feedback>
                      )}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
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
                    <hr></hr>
                  </Col>
                  <Col md={12}>
                    <Row className="mb-3">
                      <BootstrapForm.Group
                        as={Col}
                        md="3"
                        controlId="ApplicantEntityState"
                      >
                        <BootstrapForm.Label>
                          Applicant Entity State{" "}
                          <span style={{ color: "red" }}>*</span>
                        </BootstrapForm.Label>
                        <BootstrapForm.Select
                          size="lg"
                          name="ApplicantEntityState"
                          value={values.ApplicantEntityState}
                          onChange={handleChange}
                          isInvalid={
                            touched.ApplicantEntityState &&
                            !!errors.ApplicantEntityState
                          }
                        >
                          {IndianStates.map((state) => (
                            <option key={state.value} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </BootstrapForm.Select>

                        {touched.ApplicantEntityState &&
                          errors.ApplicantEntityState && (
                            <BootstrapForm.Control.Feedback type="invalid">
                              {errors.ApplicantEntityState}
                            </BootstrapForm.Control.Feedback>
                          )}
                      </BootstrapForm.Group>

                      <BootstrapForm.Group
                        as={Col}
                        md="3"
                        controlId="ApplicantEntityDistrict"
                      >
                        <BootstrapForm.Label>
                          Applicant Entity District{" "}
                          <span style={{ color: "red" }}>*</span>
                        </BootstrapForm.Label>
                        <BootstrapForm.Select
                          size="lg"
                          name="ApplicantEntityDistrict"
                          value={values.ApplicantEntityDistrict}
                          onChange={handleChange}
                          isInvalid={
                            touched.ApplicantEntityDistrict &&
                            !!errors.ApplicantEntityDistrict
                          }
                        >
                          {district.map((district) => (
                            <option key={district.value} value={district.value}>
                              {district.label}
                            </option>
                          ))}
                        </BootstrapForm.Select>

                        {touched.ApplicantEntityState &&
                          errors.ApplicantEntityState && (
                            <BootstrapForm.Control.Feedback type="invalid">
                              {errors.ApplicantEntityState}
                            </BootstrapForm.Control.Feedback>
                          )}
                      </BootstrapForm.Group>

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
                          name="ApplicantEntityTown_City"
                          onChange={handleChange}
                        />
                        {touched.ApplicantEntityTown_City &&
                          errors.ApplicantEntityTown_City && (
                            <Form.Control.Feedback type="invalid">
                              {errors.ApplicantEntityTown_City}
                            </Form.Control.Feedback>
                          )}
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
                          name="ApplicantEntityBlock_Tehsil"
                        />
                        {touched.ApplicantEntityBlock_Tehsil &&
                          errors.ApplicantEntityBlock_Tehsil && (
                            <Form.Control.Feedback type="invalid">
                              {errors.ApplicantEntityBlock_Tehsil}
                            </Form.Control.Feedback>
                          )}
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
                          name="ApplicantEntitySector_Village"
                        />
                        {touched.ApplicantEntitySector_Village &&
                          errors.ApplicantEntitySector_Village && (
                            <Form.Control.Feedback type="invalid">
                              {errors.ApplicantEntitySector_Village}
                            </Form.Control.Feedback>
                          )}
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
                          name="ApplicantEntityPincode"
                        />
                        {touched.ApplicantEntityPincode &&
                          errors.ApplicantEntityPincode && (
                            <Form.Control.Feedback type="invalid">
                              {errors.ApplicantEntityPincode}
                            </Form.Control.Feedback>
                          )}
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
                          name="ApplicantEntityPlotNumber_KhasaraNumber_GataNumber"
                        />
                        {touched.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber &&
                          errors.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber && (
                            <Form.Control.Feedback type="invalid">
                              {
                                errors.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber
                              }
                            </Form.Control.Feedback>
                          )}
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
                          name="ApplicantEntityLandmark"
                        />
                        {touched.ApplicantEntityLandmark &&
                          errors.ApplicantEntityLandmark && (
                            <Form.Control.Feedback type="invalid">
                              {errors.ApplicantEntityLandmark}
                            </Form.Control.Feedback>
                          )}
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
                        name="ApplicantEntityEmailId"
                        placeholder="Applicant Entity Email Id"
                        defaultValue=""
                      />
                      <Button variant="primary">Verify</Button>

                      {touched.ApplicantEntityEmailId &&
                        errors.ApplicantEntityEmailId && (
                          <Form.Control.Feedback type="invalid">
                            {errors.ApplicantEntityEmailId}
                          </Form.Control.Feedback>
                        )}
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
                        name="ApplicantContactNumber"
                        placeholder="Applicant Contact Number"
                        defaultValue=""
                      />
                      <Button variant="primary">Verify</Button>

                      {touched.ApplicantContactNumber &&
                        errors.ApplicantContactNumber && (
                          <Form.Control.Feedback type="invalid">
                            {errors.ApplicantContactNumber}
                          </Form.Control.Feedback>
                        )}
                    </div>
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
                                  <Form.Group as={Col} md="6">
                                    <Form.Label>
                                      ITI Name
                                      <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                      required
                                      type="text"
                                      name="name_of_other_iti"
                                      placeholder="run_ITIName"
                                      defaultValue=""
                                    />
                                    {touched.run_ITIName && errors.run_ITIName && (
                                      <Form.Control.Feedback type="invalid">
                                        {errors.run_ITIName}
                                      </Form.Control.Feedback>
                                    )}
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
                                      name="run_MISCode"
                                      placeholder="MIS Code"
                                      defaultValue=""
                                    />
                                    {touched.run_MISCode && errors.run_MISCode && (
                                      <Form.Control.Feedback type="invalid">
                                        {errors.run_MISCode}
                                      </Form.Control.Feedback>
                                    )}
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
                                      name="run_State"
                                    >
                                      <option value="">Select State</option>
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
                                    {touched.run_State && errors.run_State && (
                                      <Form.Control.Feedback type="invalid">
                                        {errors.run_State}
                                      </Form.Control.Feedback>
                                    )}
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
                                      name="run_District"
                                    >
                                      <option value="" selected>
                                        Select District
                                      </option>
                                      <option value="Delhi">Delhi</option>
                                      <option value="Mumbai">Mumbai</option>
                                      <option value="Bengaluru">Bengaluru</option>
                                      <option value="Chennai">Chennai</option>
                                      <option value="Kolkata">Kolkata</option>
                                    </Form.Control>
                                    {touched.run_District &&
                                      errors.run_District && (
                                        <Form.Control.Feedback type="invalid">
                                          {errors.run_District}
                                        </Form.Control.Feedback>
                                      )}
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
                                      name="run_TownCity"
                                    />
                                    {touched.run_TownCity &&
                                      errors.run_TownCity && (
                                        <Form.Control.Feedback type="invalid">
                                          {errors.run_TownCity}
                                        </Form.Control.Feedback>
                                      )}
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
                                      name="run_BlockTehsil"
                                    />
                                    {touched.run_BlockTehsil &&
                                      errors.run_BlockTehsil && (
                                        <Form.Control.Feedback type="invalid">
                                          {errors.run_BlockTehsil}
                                        </Form.Control.Feedback>
                                      )}
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
                                      name="run_Pincode"
                                    />
                                    {touched.run_Pincode && errors.run_Pincode && (
                                      <Form.Control.Feedback type="invalid">
                                        {errors.run_Pincode}
                                      </Form.Control.Feedback>
                                    )}
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
                                      name="run_PlotNumber_KhasaraNumber"
                                    />
                                    {touched.run_PlotNumber_KhasaraNumber &&
                                      errors.run_PlotNumber_KhasaraNumber && (
                                        <Form.Control.Feedback type="invalid">
                                          {errors.run_PlotNumber_KhasaraNumber}
                                        </Form.Control.Feedback>
                                      )}
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
                                      name="run_Landmark"
                                    />
                                    {touched.run_Landmark &&
                                      errors.run_Landmark && (
                                        <Form.Control.Feedback type="invalid">
                                          {errors.run_Landmark}
                                        </Form.Control.Feedback>
                                      )}
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
              <div className="d-flex justify-content-between mb-3">
                <Button
                  className="p-2"
                  variant="success"
                  onClick={() => formikRef.current?.submitForm()}
                >
                  Save & Continue
                </Button>

                {stepInfo.filled === true && (
                  <Button
                    className="p-2"
                    variant="warning"
                    onClick={() => {
                      setActive(reg.steps[1]);
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </Card.Footer>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

BasicDetailsofApplicantOrganization.propTypes = {
  setActive: PropTypes.func.isRequired,
};
export default BasicDetailsofApplicantOrganization;
