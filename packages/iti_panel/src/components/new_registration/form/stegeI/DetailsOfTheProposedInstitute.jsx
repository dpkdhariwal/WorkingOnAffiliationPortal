import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ChatMessage } from "../../../Assessment/ReviewTrail";
import { Formik, Field, FieldArray } from "formik";

import { dpi_initialValues, dpi_yupObject, intiValues_pi_yupObject } from "../../../../reducers/newAppReducer";
import { UPDATE_PURPOSED_INSTI_INFO } from "affserver";

import { setProposedInstDetails } from "../../../../db/appList";
import { useLocation } from "react-router-dom";

import { getProposedInstDetailsByUserId } from "../../../../db/users";
import { useContext } from "react";
import { AppStatusContext } from "../../../../services/context";

import * as ap from "../../../../services/applicant/index";

const DetailsOfTheProposedInstitute = ({ step, setActive, refreshSteps }) => {
  const authUser = useSelector((state) => state.loginUserReducer);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const { appStatus } = useContext(AppStatusContext);

  const [isHidden, setisHidden] = useState([true]);
  const [initValues, setInitValues] = useState({});

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

  const gotoPrev = () => {
    setActive(reg.steps[0]);
  }

  const gotoNext = () => {
    console.log("gotoNext called");
    navigate("?stage=1&form_id=Details of the Proposed Institute");
  };

  const formikRef = useRef();
  const reg = useSelector((state) => state.reg);

  const submit = async (values) => {

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the form data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      console.log("User cancelled save");
      return;
    }

    try {
      // let result = setProposedInstDetails(step, values, appId, authUser);
      await ap.setProposedInstDetails(step, values, appId);

      refreshSteps();
      Swal.fire("Saved!", "Your form data has been saved.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while saving.", "error");
    }

  };

  const PropInstiInfo = useSelector((state) => state.ProposedInstituteInfo);


  const loadData = async () => {
    // const data = await getProposedInstDetailsByUserId(appId);
    const result = await ap.getProposedInstDetailsAutoFill(appId);
    const data = result.data;

    const combinedData = { ...data.pro_insti_address[0], ...data.pro_insti_details };
    let newData = { ...dpi_initialValues, ...combinedData };
    console.log(newData, data.pro_insti_address[0], data.pro_insti_details, dpi_initialValues);

    console.log(newData);

    let newV = { ...intiValues_pi_yupObject, ...newData };

    console.log(newV);

    formikRef.current.setValues(newV); // update entire form
  };
  useEffect(() => {
    loadData();
  }, []);



  return (
    <Fragment>
      <Formik
        enableReinitialize
        innerRef={formikRef}
        validationSchema={yup.object().shape(dpi_yupObject)}
        validateOnChange={true}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          submit(values);
        }}
        initialValues={intiValues_pi_yupObject}
      >
        {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => {

          console.log(values);
          return (
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
                        value={values.name_of_applicant_institute}
                        placeholder="Name of the applicant Institute"
                        onChange={handleChange}
                        isInvalid={touched.name_of_applicant_institute && !!errors.name_of_applicant_institute}
                      />

                      {touched.name_of_applicant_institute && errors.name_of_applicant_institute && (
                        <Form.Control.Feedback
                          type="invalid"
                          className="d-block"
                        >
                          {errors.name_of_applicant_institute}
                        </Form.Control.Feedback>
                      )}

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
                              isInvalid={touched.type_of_institute && !!errors.type_of_institute}
                              checked={values.type_of_institute === 'Government'}

                            />
                            <Form.Check
                              inline
                              type="radio"
                              label="Private"
                              name="type_of_institute"
                              value="Private"
                              onChange={handleChange}
                              isInvalid={touched.type_of_institute && !!errors.type_of_institute}
                              checked={values.type_of_institute === 'Private'}

                            />
                          </div>
                          {touched.type_of_institute && errors.type_of_institute && (
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors.type_of_institute}
                            </Form.Control.Feedback>
                          )}
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
                                name="cmp_post_state"
                                value={values.cmp_post_state}
                                onChange={handleChange}
                                isInvalid={touched.cmp_post_state && !!errors.cmp_post_state}

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
                              {touched.cmp_post_state && errors.cmp_post_state && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.cmp_post_state}
                                </Form.Control.Feedback>
                              )}
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
                                name="cmp_post_district"
                                onChange={handleChange}
                                isInvalid={touched.cmp_post_district && !!errors.cmp_post_district}
                                value={values.cmp_post_district}

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
                              {touched.cmp_post_district && errors.cmp_post_district && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.cmp_post_district}
                                </Form.Control.Feedback>
                              )}
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
                                name="cmp_post_city"
                                onChange={handleChange}
                                isInvalid={touched.cmp_post_city && !!errors.cmp_post_city}
                                value={values.cmp_post_city}

                              />

                              {touched.cmp_post_city && errors.cmp_post_city && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.cmp_post_city}
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
                                name="cmp_post_block_or_tehsil"
                                onChange={handleChange}
                                isInvalid={touched.cmp_post_block_or_tehsil && !!errors.cmp_post_block_or_tehsil}
                                value={values.cmp_post_block_or_tehsil}

                              />
                              {touched.cmp_post_block_or_tehsil && errors.cmp_post_block_or_tehsil && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.cmp_post_block_or_tehsil}
                                </Form.Control.Feedback>
                              )}
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
                                name="cmp_post_sector_village"
                                onChange={handleChange}
                                isInvalid={touched.cmp_post_sector_village && !!errors.cmp_post_sector_village}
                                value={values.cmp_post_sector_village}

                              />

                              {touched.cmp_post_sector_village && errors.cmp_post_sector_village && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.cmp_post_sector_village}
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
                                name="cmp_post_pincode"
                                inputMode="numeric"
                                pattern="\d*"
                                onChange={(e) => {
                                  // Keep only digits and limit to 10 characters
                                  const cleanedValue = e.target.value.replace(/\D/g, "").slice(0, 6);
                                  handleChange({
                                    target: {
                                      name: e.target.name,
                                      value: cleanedValue,
                                    },
                                  });
                                }}
                                isInvalid={touched.cmp_post_pincode && !!errors.cmp_post_pincode}
                                value={values.cmp_post_pincode}

                              />
                              {touched.cmp_post_pincode && errors.cmp_post_pincode && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.cmp_post_pincode}
                                </Form.Control.Feedback>
                              )}
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
                                name="cmp_post_plot_number_khasara_number"
                                onChange={handleChange}
                                isInvalid={touched.cmp_post_plot_number_khasara_number && !!errors.cmp_post_plot_number_khasara_number}
                                value={values.cmp_post_plot_number_khasara_number}


                              />
                              {touched.cmp_post_plot_number_khasara_number && errors.cmp_post_plot_number_khasara_number && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.cmp_post_plot_number_khasara_number}
                                </Form.Control.Feedback>
                              )}
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
                                name="cmp_post_landmark"
                                onChange={handleChange}
                                isInvalid={touched.cmp_post_landmark && !!errors.cmp_post_landmark}
                                value={values.cmp_post_landmark}
                              />
                              {touched.cmp_post_landmark && errors.cmp_post_landmark && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.cmp_post_landmark}
                                </Form.Control.Feedback>
                              )}
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
                                  checked={
                                    values.institute_location ===
                                    "Urban"
                                  }
                                  isInvalid={
                                    touched.institute_location &&
                                    !!errors.institute_location
                                  }
                                />
                                <Form.Check
                                  inline
                                  type="radio"
                                  label="Rural"
                                  name="institute_location"
                                  value="Rural"
                                  onChange={handleChange}
                                  checked={
                                    values.institute_location === "Rural"
                                  }
                                  isInvalid={
                                    touched.institute_location &&
                                    !!errors.institute_location
                                  }
                                />
                              </div>
                              {touched.institute_location && errors.institute_location && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.institute_location}
                                </Form.Control.Feedback>
                              )}
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

                                    checked={
                                      values.is_falls_under_hill_area_hill === "yes"
                                    }
                                    isInvalid={
                                      touched.is_falls_under_hill_area_hill &&
                                      !!errors.is_falls_under_hill_area_hill
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="No"
                                    name="is_falls_under_hill_area_hill"
                                    value="no"
                                    onChange={handleChange}

                                    checked={
                                      values.is_falls_under_hill_area_hill === "no"
                                    }
                                    isInvalid={
                                      touched.is_falls_under_hill_area_hill &&
                                      !!errors.is_falls_under_hill_area_hill
                                    }
                                  />
                                </div>
                                {touched.is_falls_under_hill_area_hill && errors.is_falls_under_hill_area_hill && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block"
                                  >
                                    {errors.is_falls_under_hill_area_hill}
                                  </Form.Control.Feedback>
                                )}
                              </Form.Group>

                              <div className="d-flex">
                                <div className="p-2 flex-fill">
                                  {values.is_falls_under_hill_area_hill ===
                                    "yes" && (
                                      <>
                                        <div className="p-2 flex-fill">
                                          <Form.Group controlId="validationCustom02">
                                            <Form.Label>
                                              If Yes, Upload Supporting Government
                                              Notification/Order/Circular
                                              <span style={{ color: "red" }}>*</span>
                                            </Form.Label>
                                            {values.Falls_Under_Hill_Area_Hill__Supporting_Doc ? (
                                              <div className="btn-list">
                                                <Button variant="primary"
                                                  href={values.Falls_Under_Hill_Area_Hill__Supporting_Doc}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="btn-w-xs btn-wave">View</Button>
                                                <Button variant='secondary' onClick={() => { setFieldValue("Falls_Under_Hill_Area_Hill__Supporting_Doc", null); }} className="btn-w-sm btn-wave">Remove</Button></div>
                                            ) : (<Form.Control
                                              required
                                              type="file"
                                              name="Falls_Under_Hill_Area_Hill__Supporting_Doc"
                                              onChange={(event) => {
                                                const file = event.currentTarget.files[0];
                                                if (file) {
                                                  const url = URL.createObjectURL(file);
                                                  setFieldValue("Falls_Under_Hill_Area_Hill__Supporting_Doc", url);
                                                }
                                              }}
                                              isInvalid={
                                                touched.Falls_Under_Hill_Area_Hill__Supporting_Doc &&
                                                !!errors.Falls_Under_Hill_Area_Hill__Supporting_Doc
                                              }
                                            />)}

                                            {touched.Falls_Under_Hill_Area_Hill__Supporting_Doc && errors.Falls_Under_Hill_Area_Hill__Supporting_Doc && (
                                              <Form.Control.Feedback
                                                type="invalid"
                                                className="d-block"
                                              >
                                                {errors.Falls_Under_Hill_Area_Hill__Supporting_Doc}
                                              </Form.Control.Feedback>
                                            )}
                                          </Form.Group>
                                        </div>

                                      </>
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
                                    checked={
                                      values.is_falls_under_border_district ===
                                      "yes"
                                    }
                                    isInvalid={
                                      touched.is_falls_under_border_district &&
                                      !!errors.is_falls_under_border_district
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="No"
                                    name="is_falls_under_border_district"
                                    value="no"
                                    onChange={handleChange}
                                    checked={
                                      values.is_falls_under_border_district ===
                                      "no"
                                    }
                                    isInvalid={
                                      touched.is_falls_under_border_district &&
                                      !!errors.is_falls_under_border_district
                                    }
                                  />
                                </div>
                                {touched.is_falls_under_border_district && errors.is_falls_under_border_district && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block"
                                  >
                                    {errors.is_falls_under_border_district}
                                  </Form.Control.Feedback>
                                )}
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
                                          name="Falls_Under_Border_District__Supporting_Doc"
                                          onChange={handleChange} // if using Formik or handling file upload
                                          isInvalid={
                                            touched.Falls_Under_Border_District__Supporting_Doc &&
                                            !!errors.Falls_Under_Border_District__Supporting_Doc
                                          }

                                        />
                                        {touched.Falls_Under_Border_District__Supporting_Doc && errors.Falls_Under_Border_District__Supporting_Doc && (
                                          <Form.Control.Feedback
                                            type="invalid"
                                            className="d-block"
                                          >
                                            {errors.Falls_Under_Border_District__Supporting_Doc}
                                          </Form.Control.Feedback>
                                        )}
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
                          name="under_msti_category"
                          value="yes"
                          onChange={handleChange}
                          checked={
                            values.under_msti_category ===
                            "yes"
                          }
                          isInvalid={
                            touched.under_msti_category &&
                            !!errors.under_msti_category
                          }
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="under_msti_category"
                          value="no"
                          onChange={handleChange}
                          checked={
                            values.under_msti_category === "no"
                          }
                          isInvalid={
                            touched.under_msti_category &&
                            !!errors.under_msti_category
                          }
                        />
                      </div>
                      {touched.under_msti_category && errors.under_msti_category && (
                        <Form.Control.Feedback
                          type="invalid"
                          className="d-block"
                        >
                          {errors.under_msti_category}
                        </Form.Control.Feedback>
                      )}
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
                          checked={
                            values.Whether_the_institute_is_exclusive_for_women_trainees ===
                            "yes"
                          }
                          isInvalid={
                            touched.Whether_the_institute_is_exclusive_for_women_trainees &&
                            !!errors.Whether_the_institute_is_exclusive_for_women_trainees
                          }
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="Whether_the_institute_is_exclusive_for_women_trainees"
                          value="no"
                          onChange={handleChange}
                          checked={
                            values.Whether_the_institute_is_exclusive_for_women_trainees === "no"
                          }
                          isInvalid={
                            touched.Whether_the_institute_is_exclusive_for_women_trainees &&
                            !!errors.Whether_the_institute_is_exclusive_for_women_trainees
                          }
                        />
                      </div>
                      {touched.Whether_the_institute_is_exclusive_for_women_trainees && errors.Whether_the_institute_is_exclusive_for_women_trainees && (
                        <Form.Control.Feedback
                          type="invalid"
                          className="d-block"
                        >
                          {errors.Whether_the_institute_is_exclusive_for_women_trainees}
                        </Form.Control.Feedback>
                      )}
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
                            Coordinates of institute <span style={{ 'font-weight': 'normal' }}>(For example Delhi - 28.7041°
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
                                  inputMode="decimal" // mobile numeric keyboard with dot
                                  placeholder="Latitude"
                                  name="latitude"
                                  onChange={(e) => {
                                    // Allow only digits and one decimal point
                                    const cleanedValue = e.target.value.replace(/[^0-9.]/g, "");

                                    // Prevent multiple decimals
                                    const validValue = cleanedValue.split('.').length > 2
                                      ? cleanedValue.slice(0, -1)
                                      : cleanedValue;

                                    handleChange({
                                      target: {
                                        name: e.target.name,
                                        value: validValue,
                                      },
                                    });
                                  }}
                                  value={values.latitude}
                                  isInvalid={touched.latitude && !!errors.latitude}
                                />
                                <Button variant="outline-secondary">Degree</Button>
                                <Button variant="outline-secondary">N</Button>
                              </InputGroup>


                              {touched.latitude && errors.latitude && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.latitude}
                                </Form.Control.Feedback>
                              )}
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
                                  inputMode="decimal" // mobile numeric keyboard with dot
                                  onChange={(e) => {
                                    // Allow only digits and one decimal point
                                    const cleanedValue = e.target.value.replace(/[^0-9.]/g, "");

                                    // Prevent multiple decimals
                                    const validValue = cleanedValue.split('.').length > 2
                                      ? cleanedValue.slice(0, -1)
                                      : cleanedValue;

                                    handleChange({
                                      target: {
                                        name: e.target.name,
                                        value: validValue,
                                      },
                                    });
                                  }}
                                  value={values.Longitude}
                                  isInvalid={
                                    touched.Longitude &&
                                    !!errors.Longitude
                                  }
                                />
                                <Button variant="outline-secondary">
                                  Degree
                                </Button>
                                <Button variant="outline-secondary">E</Button>
                              </InputGroup>

                              {touched.Longitude && errors.Longitude && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="d-block"
                                >
                                  {errors.Longitude}
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-between mb-3">
                  <Button onClick={() => {
                    setActive(reg.steps[0]);
                  }}
                    className="p-2" variant="warning">
                    Previous
                  </Button>

                  <Button className="p-2"
                    variant="success"
                    onClick={() => formikRef.current?.submitForm()}
                  >
                    Save & Continue
                  </Button>
                </div>


              </Card.Footer>
            </Card>
          )
        }}
      </Formik>
    </Fragment>
  );
};

export default DetailsOfTheProposedInstitute;


export const Assessment_Proposed_Institute = () => {
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
        <Col xl={6} lg={6} md={6} sm={6}>
          <Card className="custom-card shadow">
            <Card.Body>
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
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="Private"
                          name="type_of_institute"
                          value="Private"
                        />
                      </div>
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

                          </Form.Control>

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
                            />
                            <Form.Check
                              inline
                              type="radio"
                              label="Rural"
                              name="institute_location"
                              value="Rural"
                            />
                          </div>
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
                              />
                              <Form.Check
                                inline
                                type="radio"
                                label="No"
                                name="is_falls_under_hill_area_hill"
                                value="no"
                              />
                            </div>
                          </Form.Group>
                          <div className="d-flex">
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
                                />
                              </Form.Group>
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
                              />
                              <Form.Check
                                inline
                                type="radio"
                                label="No"
                                name="is_falls_under_border_district"
                                value="no"
                              />
                            </div>
                          </Form.Group>
                          <div className="d-flex">
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
                                />
                              </Form.Group>
                            </div>
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
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="No"
                      name="WhetherapplyingUnderMiniSkillTrainingInstitute(MSTI)Category"
                      value="no"
                    />
                  </div>
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
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="No"
                      name="Whether_the_institute_is_exclusive_for_women_trainees"
                      value="no"
                    />
                  </div>
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
                        Coordinates of institute <span style={{ 'font-weight': 'normal' }}>(For example Delhi - 28.7041°
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
                        </Form.Group>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {true && (<Col xl={6} lg={6} md={6} sm={6}>
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
