import { Fragment, useRef, useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Form as BootstrapForm } from "react-bootstrap";
import { Table, Modal } from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";

import * as formik from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { entityCategories } from "../../../../constants";
// import Exclamation from "../comp/PrimeReact/PrimeReact";
import { yupObject, initialValues } from "../../../../reducers/newAppReducer";
import PropTypes from "prop-types";
import Select from "react-select";
import { IndianStates, getDistrictsByState } from "../../../../constants";
import { ChatMessage } from "../../../Assessment/ReviewTrail";

const BasicDetailsofApplicantOrganization = ({ setActive }) => {
  const dispatch = useDispatch();
  const reg = useSelector((state) => state.reg);
  const stepInfo = reg.steps[0];
  const [district, setDistrict] = useState([]);

  // useEffect(() => {
  //   console.log(stepInfo.filled);
  // }, []);

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

  const onStateSelected = (e) => {
    // console.log("Changed:", e.target.name, e.target.value, getDistrictsByState(e.target.value));
    let List = getDistrictsByState(e.target.value);
    setDistrict(List);
  }
  return (
    <Fragment>
      <Formik
        innerRef={formikRef}
        validationSchema={yup.object().shape(yupObject)}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          submit(values);
        }}
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={true} // Enable validation on every field change
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
                          onChange={(e) => {
                            handleChange(e);
                            onStateSelected(e)
                          }}
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
                          {district.map((district, index) => (
                            <option key={index} value={district}>
                              {district}
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
                        controlId="validationCustom02"
                      >
                        <BootstrapForm.Label>
                          Applicant Entity Town/City
                          <span style={{ color: "red" }}>*</span>
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          required
                          type="text"
                          placeholder="Town/City"
                          name="ApplicantEntityTown_City"
                          onChange={handleChange}
                          isInvalid={
                            touched.ApplicantEntityTown_City &&
                            !!errors.ApplicantEntityTown_City
                          }
                        />
                        {touched.ApplicantEntityTown_City &&
                          errors.ApplicantEntityTown_City && (
                            <BootstrapForm.Control.Feedback type="invalid">
                              {errors.ApplicantEntityTown_City}
                            </BootstrapForm.Control.Feedback>
                          )}
                      </BootstrapForm.Group>

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
                          onChange={handleChange}
                          isInvalid={
                            touched.ApplicantEntityBlock_Tehsil &&
                            !!errors.ApplicantEntityBlock_Tehsil
                          }
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
                          onChange={handleChange}
                          isInvalid={
                            touched.ApplicantEntitySector_Village &&
                            !!errors.ApplicantEntitySector_Village
                          }
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
                          onChange={handleChange}

                          isInvalid={
                            touched.ApplicantEntityPincode &&
                            !!errors.ApplicantEntityPincode
                          }
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
                          onChange={handleChange}
                          isInvalid={
                            touched.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber &&
                            !!errors.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber
                          }
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
                          onChange={handleChange}
                          isInvalid={
                            touched.ApplicantEntityLandmark &&
                            !!errors.ApplicantEntityLandmark
                          }
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
                        onChange={handleChange}
                        isInvalid={
                          touched.ApplicantEntityEmailId &&
                          !!errors.ApplicantEntityEmailId
                        }
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
                        onChange={handleChange}
                        isInvalid={
                          touched.ApplicantContactNumber &&
                          !!errors.ApplicantContactNumber
                        }
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
                  "Public Sector Undertaking"
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
                                      values.Is_the_applicant_running_any_other_iti === "yes"
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
                                      values.Is_the_applicant_running_any_other_iti === "no"
                                    }
                                    isInvalid={
                                      touched.Is_the_applicant_running_any_other_iti &&
                                      !!errors.Is_the_applicant_running_any_other_iti
                                    }
                                  />
                                </div>

                                {touched.Is_the_applicant_running_any_other_iti &&
                                  errors.Is_the_applicant_running_any_other_iti && (
                                    <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                                      {errors.Is_the_applicant_running_any_other_iti}
                                    </Form.Control.Feedback>
                                  )}
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
                                  <BootstrapForm.Group
                                    as={Col}
                                    md="6"
                                  >
                                    <BootstrapForm.Label>
                                      ITI Name
                                      <span style={{ color: "red" }}>*</span>
                                    </BootstrapForm.Label>

                                    <BootstrapForm.Control
                                      required
                                      type="text"
                                      placeholder="Enter Running ITI Name"
                                      name="run_ITIName"
                                      onChange={handleChange}
                                      isInvalid={
                                        touched.run_ITIName &&
                                        !!errors.run_ITIName
                                      }
                                    />
                                    {touched.run_ITIName &&
                                      errors.run_ITIName && (
                                        <BootstrapForm.Control.Feedback type="invalid">
                                          {errors.run_ITIName}
                                        </BootstrapForm.Control.Feedback>
                                      )}
                                  </BootstrapForm.Group>


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

export const Assessment_Basic_Detail = () => {
  const MaxData = [
    { value: "Document is not legible", label: "Document is not legible" },
    { value: "Document is irrelevant", label: "Document is irrelevant" },
    {
      value: "Document lacks required information",
      label: "Document lacks required information",
    },
    {
      value:
        "Document is not approved by the competent authority in the State/ UT",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value:
        "Address on the document does not match with the proposed land/ building address",
      label:
        "Address on the document does not match with the proposed land/ building address",
    },
    {
      value:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
      label:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
    },
    {
      value: "Any other reason, please specify",
      label: "Any other reason, please specify",
    },
  ];

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const handleShowModal = (size) => {
    switch (size) {
      case "xl":
        setShowXlModal(true);
        break;
      default:
        break;
    }
    setSelectedSize(size);
  };

  const handleCloseModal = () => {
    setShowXlModal(false);
    setSelectedSize("");
  };

  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);

  const messages = [
    {
      userType: "Assessor",
      username: "Alice",
      text: "Hello!",
      datetime: "10:30 AM",
      isUser: true,
      comp: () => <AssessorRemarkHistory title="Building Plan" />,
    },
    {
      userType: "Applicant",
      username: "You",
      text: "Hi Alice!",
      datetime: "10:31 AM",
      isUser: false,
      comp: ItiRemarkHistory,
    },
    {
      userType: "Assessor",
      username: "Alice",
      text: "Hello!",
      datetime: "10:30 AM",
      isUser: true,
      comp: () => <AssessorRemarkHistory title="Building Plan" />,
    },
  ];
  const stageI1_info = useSelector((state) => state.theme.new_registration);

  return (
    <>
      <Row
        style={{
          backgroundColor: "rgb(245, 245, 245)",
          margin: "10px 0px 0px",
          borderRadius: 6,
          borderStyle: "dashed",
          borderWidth: "thin",
          padding: "10px",
        }}
      >
        <Col xl={12} lg={12} md={12} sm={12}>
          <Form.Label>
            Category of Applicant Entity
            <span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Row className="mb-3">
            <Form.Group as={Col} md="3">
              <div className="d-flex align-items-center gap-2">
                <Form.Check
                  type="radio"
                  // label={label.label}
                  name="category"
                  value="yes"
                />
              </div>

            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>
                Name of Applicant Entity{" "}
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              
              <Form.Control
                error="Enter Name of Applicant"
                required
                type="text"
                name="name_of_applicant_entity"
                value=""
                placeholder={`Enter Here`}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <h6>
                Address of Applicant Entity{" "}
                <span style={{ color: "red" }}>*</span>
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
                    value=""
                  >
                  </BootstrapForm.Select>
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
                    value=""
                  >
                    <option value="">
                        abcd
                      </option>
                  </BootstrapForm.Select>

                </BootstrapForm.Group>

                <BootstrapForm.Group
                  as={Col}
                  md="3"
                  controlId="validationCustom02"
                >
                  <BootstrapForm.Label>
                    Applicant Entity Town/City
                    <span style={{ color: "red" }}>*</span>
                  </BootstrapForm.Label>
                  <BootstrapForm.Control
                    required
                    type="text"
                    placeholder="Town/City"
                    name="ApplicantEntityTown_City"
                  />
                </BootstrapForm.Group>

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
              </div>
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
            "Public Sector Undertaking"
          ].includes('values.category') && (
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
                            />
                            <Form.Check
                              inline
                              type="radio"
                              label="No"
                              name="Is_the_applicant_running_any_other_iti"
                              value="no"
                            />
                          </div>
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
                            <BootstrapForm.Group
                              as={Col}
                              md="6"
                            >
                              <BootstrapForm.Label>
                                ITI Name
                                <span style={{ color: "red" }}>*</span>
                              </BootstrapForm.Label>

                              <BootstrapForm.Control
                                required
                                type="text"
                                placeholder="Enter Running ITI Name"
                                name="run_ITIName"
                              />
                            </BootstrapForm.Group>


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
                            
                            </Form.Group>
                          </Row>
                        )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
        </Col>
        {false && (<Col xl={6} lg={6} md={6} sm={6}>
          <div style={{ padding: 2, background: "#E0ECF5", borderRadius: 6 }}>
            <div className="bg-body-secondary p-3">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg}
                  isUser={msg.isUser}
                  Msg={msg.comp}
                  data={msg}
                />
              ))}
            </div>

            <div className="form-container">
              {formSubmited == false ? (
                <Formik
                  validationSchema={yup.object().shape({
                    as_per_norms: yup
                      .string()
                      .required("Select whether Building plan is as per norms"),

                    category: yup.string().when("as_per_norms", {
                      is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                      then: () =>
                        yup.string().required("Please select a category"),
                      otherwise: () => yup.string().notRequired(),
                    }),

                    assessor_comments: yup.string().when("as_per_norms", {
                      is: "no",
                      then: () =>
                        yup.string().required("Please provide your comments"),
                      otherwise: () => yup.string().notRequired(),
                    }),
                  })}
                  validateOnChange={() => console.log("validateOnChange")}
                  onSubmit={(values) => {
                    console.log("Form submitted with values:", values);
                    setFormData(values);
                    setFormSubmited(true);
                    console.log(formData);
                  }}
                  initialValues={{
                    category: "",
                    as_per_norms: "no",
                    assessor_comments: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    submitForm,
                    values,
                    errors,
                    touched,
                  }) => (
                    <Card style={{ backgroundColor: "#eff3d6" }}>
                      <Card.Header>
                        <label
                          className="main-content-label my-auto"
                          style={{ textTransform: "none" }}
                        >
                          Review Form
                        </label>
                        <div className="ms-auto  d-flex">
                          <Button
                            size="sm"
                            onClick={() => handleShowModal("xl")}
                            type="button"
                            className="rounded-pill btn-wave btn-outline-dark"
                            variant="btn-outline-dark"
                          >
                            Review Instructions
                          </Button>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Form ref={formRef2} onSubmit={handleSubmit} validated>
                          <Row className="mb-3">
                            <Form.Group>
                              <Form.Label>
                                Whether Building plan is as per norms?
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <div>
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  name="as_per_norms"
                                  value="yes"
                                  onChange={handleChange}
                                  checked={values.as_per_norms === "yes"}
                                  isInvalid={
                                    touched.as_per_norms &&
                                    !!errors.as_per_norms
                                  }
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  name="as_per_norms"
                                  value="no"
                                  onChange={handleChange}
                                  checked={values.as_per_norms === "no"}
                                  isInvalid={
                                    touched.as_per_norms &&
                                    !!errors.as_per_norms
                                  }
                                />
                              </div>

                              <Form.Control.Feedback type="invalid">
                                {errors.category}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>
                          {values.as_per_norms === "no" && (
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                              >
                                <Form.Label>
                                  Select the Reason(s) and Raise
                                  Non-Conformities (NC)
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  required
                                  name="category"
                                  as="select"
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  {MaxData.map((lang, i) => {
                                    return (
                                      <option key={i} value={lang.value}>
                                        {lang.label}
                                      </option>
                                    );
                                  })}
                                </Field>
                                <Form.Control.Feedback>
                                  Looks good!
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group
                                required
                                as={Col}
                                md="12"
                                controlId="text-area"
                                style={{ marginTop: "1rem" }}
                              >
                                <Form.Label>
                                  Any other reason, please specify{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  name="assessor_comments"
                                  required
                                  as="textarea"
                                  rows={3}
                                  className={`form-control ${touched.assessor_comments &&
                                    errors.assessor_comments
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                  value={values.assessor_comments}
                                  onChange={handleChange}
                                  isInvalid={
                                    touched.assessor_comments &&
                                    !!errors.assessor_comments
                                  }
                                />
                                {touched.assessor_comments &&
                                  errors.assessor_comments && (
                                    <div className="invalid-feedback">
                                      {errors.assessor_comments}
                                    </div>
                                  )}
                              </Form.Group>
                            </Row>
                          )}
                          <Button variant="primary" onClick={submitForm}>
                            Submit
                          </Button>
                        </Form>
                      </Card.Body>
                      <Card.Footer></Card.Footer>
                    </Card>
                  )}
                </Formik>
              ) : formSubmited == true ? (
                <Card
                  className="border-info"
                  style={
                    formData.as_per_norms == "yes"
                      ? { backgroundColor: "#d6f3e0" }
                      : { backgroundColor: "#f3d6d6" }
                  }
                >
                  <Card.Header>
                    <label
                      className="main-content-label my-auto"
                      style={{ textTransform: "none" }}
                    >
                      Assessor Comments
                    </label>
                    <div className="ms-auto  d-flex">
                      25th April 2025:10:20PM
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-3">
                      <Col md={12}>
                        <b>Whether Building plan is as per norms?:</b>{" "}
                        <span style={{ textTransform: "capitalize" }}>
                          {formData.as_per_norms}
                        </span>
                      </Col>
                      {formData.as_per_norms == "no" && (
                        <Col md={12}>
                          <b>Reason Category:</b>{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {formData.category}
                          </span>
                        </Col>
                      )}

                      {formData.category ==
                        "Any other reason, please specify" && (
                          <Col md={12}>
                            <b>Reason:</b> <p>{formData.assessor_comments}</p>
                          </Col>
                        )}
                    </Row>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setFormSubmited(false);
                        setFormData({});
                      }}
                    >
                      Edit
                    </Button>
                    {/* <Button variant="primary">Submit</Button> */}
                  </Card.Footer>
                </Card>
              ) : (
                <h1>No Data</h1>
              )}
            </div>
          </div>
        </Col>)}
      </Row>

      <Modal show={showXlModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title as="h6">Review Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This section is to guide Desktop Assessor in Desktop Assessment. This
          will act as guide to him. DGT admin can provide sample documents also.
        </Modal.Body>
      </Modal>
    </>
  );
};

export const AssessorRemarkHistory = ({ title }) => {
  return (
    <Card className="custom-card">
      {/* <Card.Header>
        <label
          className="main-content-label my-auto"
          style={{ textTransform: "none" }}
        >
          Assessor Comments
        </label>
        <div className="ms-auto  d-flex">20th April 2025:10:20PM</div>
      </Card.Header> */}
      <Card.Body>
        <Row className="mb-3">
          <Form.Label>
            <b>Whether {title ? title : "Document"} is as per norms?:</b>{" "}
            <u>
              <span>No</span>
            </u>
          </Form.Label>
          <Form.Label>
            <b>Reason:</b>{" "}
            <u>
              <span>Document is Irrelavent</span>
            </u>
          </Form.Label>
          <Form.Label>
            <b>Remark:</b>{" "}
            <u>
              <span>Not Ok</span>
            </u>
          </Form.Label>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <div className="text-gray-7">20th April 2025 10:00AM</div>
      </Card.Footer>
    </Card>
  );
};
export const ItiRemarkHistory = () => {
  const childWindowRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(
    "https://nimionlineadmission.in/iti/downloads/Format-%202%20Resolution%20for%20Establishment%20of%20New%20Industrial%20Training%20Institute.pdf"
  );

  const viewSampleDocument = () => {
    if (childWindowRef.current && !childWindowRef.current.closed) {
      childWindowRef.current.focus();
      return;
    }

    const newWindow = window.open("", "", "width=400,height=400");
    if (!newWindow) {
      alert("Popup blocked.");
      return;
    }

    newWindow.document.title = "Sample Document";

    const container = newWindow.document.createElement("div");
    newWindow.document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);

    root.render(
      <embed src={photoURL} type="application/pdf" width="100%" height="100%" />
      // <img
      //   src={photoURL}
      //   alt="Captured"
      //   style={{ width: "100%", maxWidth: "100%" }}
      // />
    );

    // Optional: Cleanup when the window is closed
    newWindow.addEventListener("beforeunload", () => {
      root.unmount();
    });

    childWindowRef.current = newWindow;
  };

  return (
    <Card className="custom-card shadow border-info">
      <Card.Body>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>
              <b>Remark:</b> <span>Document Uploaded</span>
            </Form.Label>
          </Col>
          <Col md={12}>
            {" "}
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewSampleDocument}
            >
              View Document
            </button>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <div className="text-gray-7">20th April 2025 10:00AM</div>
      </Card.Footer>
    </Card>
  );
};