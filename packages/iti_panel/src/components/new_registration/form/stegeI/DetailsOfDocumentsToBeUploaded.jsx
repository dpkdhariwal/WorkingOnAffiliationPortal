import { Fragment, useEffect, useRef, useState } from "react";
import { Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Form as BootstrapForm, Modal } from "react-bootstrap";

import { languages, ADD_MORE_LAND_DOCUMENT, SET_STAGE_I__DOCUMENT_STATUS, STAGE_I_DOCUMENT_UPLAOD } from "affserver";
import { land_documents_yupObject } from "../../../../reducers/document_upload";
import { useContext } from "react";
import { AppStatusContext } from "../../../../services/context";
import { setAppFlow } from "../../../../db/users";
import { useLocation } from "react-router-dom";
import { markAsCompleteStageStep } from "../../../../db/forms/stageI/set/set";

import * as C from "affserver";
import * as ap from "../../../../services/applicant/index";
const DetailsOfDocumentsToBeUploaded = ({ step, setActive, refreshSteps }) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const land_info = useSelector((state) => state.land_info_reducer);
  const land_documents_initial_values = useSelector((state) => state.land_documents_reducer);
  const reg = useSelector((state) => state.reg);
  const { appStatus } = useContext(AppStatusContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const authUser = useSelector((state) => state.loginUserReducer);

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

      // let result = await setAppFlow(appId, STAGE_I_DOCUMENT_UPLAOD);
      // markAsCompleteStageStep(authUser, appId, C.ST1FC.DOCUMENTS_UPLOAD.step);
      // console.log(result);
      // let result = setInstTradeDetails(values, appId, step, authUser);

      await ap.setUploadDocumentStageI(values, step, appId);
      refreshSteps();
      Swal.fire("Saved!", "Your form data has been saved.", "success");
      Swal.close();
      
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while saving.", "error");
    }
  };

  const submitNow = () => {
    formikRef.current?.submitForm()
  }

  return (
    <Fragment>
      <Formik
        enableReinitialize={true} // 👈 key line to re-sync with Redux
        innerRef={formikRef}
        initialValues={land_documents_initial_values}
        validationSchema={land_documents_yupObject}
        onSubmit={(values) => {
          console.log("Form Values", values);
          submit(values);
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => {
          console.log(values)
          return (<>
            <Form noValidate onSubmit={handleSubmit}>
              {land_info.possession_of_land == 'owned' && (
                <Card className="custom-card border border-primary">
                  <Card.Header>
                    <div className="card-title" style={{ textTransform: "none" }}>
                      Land Documents
                    </div>
                  </Card.Header>
                  <Card.Body>

                    <FieldArray name="land_documents">
                      <Card className="mb-3">
                        <Card.Body>
                          {values.land_documents_title.map((doc, index) => (
                            <Row key={index} style={{ marginTop: "1rem" }}>
                              <Col md={3}>
                                <BootstrapForm.Group>
                                  <BootstrapForm.Label>
                                    Document Title <span style={{ color: "red" }}>*</span>
                                  </BootstrapForm.Label>
                                  <Field
                                    placeholder="Enter Title"
                                    name={`land_documents_title[${index}]`}
                                    as={Form.Control}
                                    onChange={handleChange}
                                    isInvalid={
                                      touched.land_documents_title?.[index] &&
                                      !!errors.land_documents_title?.[index]
                                    }
                                  />
                                  <BootstrapForm.Control.Feedback type="invalid">
                                    {errors.land_documents_title?.[index]}
                                  </BootstrapForm.Control.Feedback>
                                </BootstrapForm.Group>
                              </Col>

                              <Col md={3}>
                                <BootstrapForm.Group>
                                  <Form.Label>
                                    Document Language
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <BootstrapForm.Select
                                    size="lg"
                                    name={`land_documents_language[${index}]`}
                                    value={values.land_documents_language[index]}
                                    onChange={handleChange}
                                    isInvalid={
                                      touched.land_documents_language?.[index] &&
                                      !!errors.land_documents_language?.[index]
                                    }
                                  >
                                    <option value="">Select Language</option>
                                    {languages.map((lang, i) => (
                                      <option key={i} value={lang}>
                                        {lang}
                                      </option>
                                    ))}
                                  </BootstrapForm.Select>
                                  <BootstrapForm.Control.Feedback type="invalid">
                                    {errors.land_documents_language?.[index]}
                                  </BootstrapForm.Control.Feedback>
                                </BootstrapForm.Group>
                              </Col>

                              <Col md={3}>
                                <Form.Group>
                                  <Form.Label>
                                    Upload Original Document of Land
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    type="file"
                                    name={`land_original_documents[${index}]`}
                                    onChange={handleChange}
                                    isInvalid={
                                      touched.land_original_documents?.[index]?.file &&
                                      !!errors.land_original_documents?.[index]?.file
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.land_original_documents?.[index]?.file}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>

                              <Col md={3}>
                                <Form.Group>
                                  <Form.Label>
                                    Upload Hindi/English Notarised Copy of
                                    Document{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    type="file"
                                    onChange={(event) => {
                                      setFieldValue(
                                        `land_documents[${index}].file`,
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    dfsff
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                            </Row>
                          ))}
                        </Card.Body>

                        <Card.Footer className="text-end">
                          <Button className="mb-3" onClick={() => dispatch({ type: ADD_MORE_LAND_DOCUMENT })}>
                            Add More
                          </Button>
                        </Card.Footer>
                      </Card>
                    </FieldArray>
                  </Card.Body>
                </Card>)}

              {false && land_info.possession_of_land == 'leased' && (
                <Card className="custom-card border border-primary">
                  <Card.Header>
                    <div className="card-title" style={{ textTransform: "none" }}>
                      Upload Registered Lease Deed Documents
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <FieldArray name="lease_deed_document">
                      <Card className="mb-3">
                        <Card.Body>
                          {values.lease_deed_document.map((doc, index) => (
                            <Row key={index} style={{ marginTop: "1rem" }}>
                              <Col md={3}>
                                <Form.Group>
                                  <Form.Label>
                                    Document Title
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Field
                                    placeholder="Document Title"
                                    name={`lease_deed_document[${index}].title`}
                                    as={Form.Control}
                                    onChange={handleChange}
                                    isInvalid={
                                      touched.lease_deed_document[index].title &&
                                      !!errors.lease_deed_document[index].title
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.land_documents?.[index]?.title}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                              <Col md={3}>
                                <Form.Group>
                                  <Form.Label>
                                    Document Language
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Field
                                    required
                                    name={`lease_deed_document[${index}].language`}
                                    as="select"
                                    className="form-control"
                                  >
                                    {languages.map((lang, i) => (
                                      <option key={i} value={lang}>
                                        {lang}
                                      </option>
                                    ))}
                                  </Field>
                                  <Form.Control.Feedback type="invalid">
                                    {errors.land_documents?.[index]?.language}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                              <Col md={3}>
                                <Form.Group>
                                  <Form.Label>
                                    Upload Original Document of Lease Deed{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    type="file"
                                    onChange={(event) => {
                                      setFieldValue(
                                        `land_documents[${index}].file`,
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.land_documents?.[index]?.file}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>

                              <Col md={3}>
                                <Form.Group>
                                  <Form.Label>
                                    Upload Hindi/English Notarised Copy of
                                    Document{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    type="file"
                                    onChange={(event) => {
                                      setFieldValue(
                                        `land_documents[${index}].file`,
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    ddd
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                            </Row>
                          ))}
                        </Card.Body>
                        <Card.Footer className="text-end">
                          <Button className="mb-3">
                            Add More
                          </Button>
                        </Card.Footer>
                      </Card>
                    </FieldArray>
                  </Card.Body>
                </Card>)}
              {/* @dpkdhariwal */}
              {true && (
                <>
                  <Card className="custom-card border border-primary">
                    <Card.Header>
                      <div className="card-title" style={{ textTransform: "none" }}>
                        Land Use, Land Conversion Certificate (If Applicable)
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Card className="mb-3">
                        <Card.Body>
                          <Row style={{ marginTop: "1rem" }}>
                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Document Title
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field name="land_use_documents" as={Form.Control} />
                                <Form.Control.Feedback type="invalid">
                                  Error
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Document Language
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  required
                                  name={`land_documents_language`}
                                  as="select"
                                  className="form-control"
                                // isInvalid={
                                //   touched.land_documents?.[index]?.language &&
                                //   !!errors.land_documents?.[index]?.language
                                // }
                                >
                                  {languages.map((lang, i) => (
                                    <option key={i} value={lang}>
                                      {lang}
                                    </option>
                                  ))}
                                </Field>
                                <Form.Control.Feedback type="invalid">
                                  Select Document
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Upload Original Document of{" "}
                                  {"Land Use, Land Conversion Certificate"}{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                // onChange={(event) => {
                                //   setFieldValue(
                                //     `land_documents[${index}].file`,
                                //     event.currentTarget.files[0]
                                //   );
                                // }}
                                // isInvalid={
                                //   touched.land_documents?.[index]?.file &&
                                //   !!errors.land_documents?.[index]?.file
                                // }
                                />
                                <Form.Control.Feedback type="invalid">
                                  Select Document
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>

                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Upload Hindi/English Notarised Copy of Document
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={(event) => {
                                    setFieldValue(
                                      `land_documents[${index}].file`,
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  ddd
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>
                  <Card className="custom-card border border-primary">
                    <Card.Header>
                      <div className="card-title" style={{ textTransform: "none" }}>
                        ID Proof of Authorized Signatory{" "}
                        <span>
                          (As per Annexure-5)
                          <Button variant="link" className="rounded-pill btn-wave">
                            Download Format
                          </Button>
                        </span>
                        <i
                          className="fe fe-help-circle"
                          style={{ cursor: "pointer", color: "#6c757d" }}
                          title="An individual formally designated by the applicant to act on itsbehalf in official matters related to affiliation, accreditation, and administrativecommunication."
                          onClick={() => alert(`Info about About`)} // Replace with your actual logic
                        ></i>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Card className="mb-3">
                        <Card.Body>
                          <Row className="mb-3">
                            <Form.Group
                              as={Col}
                              md="3"
                              controlId="validationCustom02"
                            >
                              <Form.Label>
                                Name<span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Name"
                                name="name_of_authorized_signatory"
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
                                Designation<span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Designation"
                                name="designation_of_authorized_signatory"
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
                                Email Id<span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <div className="d-flex align-items-center gap-2">
                                <Form.Control
                                  required
                                  type="email"
                                  placeholder="Email Id"
                                  name="email_id_of_authorized_signatory"
                                />
                                <Button variant="primary">Verify</Button>
                              </div>
                              {/* <InputGroup>
                          <Form.Control
                            required
                            type="email"
                            placeholder="Email Id"
                            name="email_id_of_authorized_signatory"
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-verify-email"
                          >
                            Verify
                          </Button>
                        </InputGroup> */}
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
                              <div className="d-flex align-items-center gap-2">
                                <Form.Control
                                  required
                                  type="tel"
                                  placeholder="Mobile Number"
                                  name="mobile_number_of_authorized_signatory"
                                />
                                <Button variant="primary">Verify</Button>
                              </div>

                              {/* <InputGroup>
                          <Form.Control
                            required
                            type="tel"
                            placeholder="Mobile Number"
                            name="mobile_number_of_authorized_signatory"
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-verify-mobile"
                          >
                            Verify
                          </Button>
                        </InputGroup> */}
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>
                          <Row style={{ marginTop: "1rem" }}>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>
                                  Select ID Proof Type
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  required
                                  name="id_proof"
                                  as="select"
                                  className="form-control"
                                >
                                  {/* {ID_Proof_Doc_list.map((docType, i) => (
                                    <option key={i} value={docType}>
                                      {docType}
                                    </option>
                                  ))} */}
                                </Field>
                                <Form.Control.Feedback type="invalid">
                                  Error
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>
                                  Enter ID Proof Number
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  name="enter _id_proof_number"
                                  as={Form.Control}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Error
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Form.Group as={Col} md={4}>
                              <Form.Label>
                                Document Upload<span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                type="file"
                                onChange={(event) => {
                                  setFieldValue(
                                    `registration_cert_of_applicant_org`,
                                    event.currentTarget.files[0]
                                  );
                                }}
                              // isInvalid={
                              //   touched.land_documents?.[index]?.file &&
                              //   !!errors.land_documents?.[index]?.file
                              // }
                              />
                              <Form.Control.Feedback type="invalid">
                                Error
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>

                  <Card className="custom-card border border-primary">
                    <Card.Body>
                      <Form.Group>
                        <Form.Label>
                          Select Registration Certificate of Applicant Organization
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(event) => {
                            setFieldValue(
                              `registration_cert_of_applicant_org`,
                              event.currentTarget.files[0]
                            );
                          }}
                        // isInvalid={
                        //   touched.land_documents?.[index]?.file &&
                        //   !!errors.land_documents?.[index]?.file
                        // }
                        />
                        <Form.Control.Feedback type="invalid">
                          Error
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Card.Body>
                  </Card>

                  <Card className="custom-card border border-primary">
                    <Card.Header>
                      <div className="card-title" style={{ textTransform: "none" }}>
                        ID Proof of Secretary/Chairperson/President
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Card className="mb-3">
                        <Card.Body>
                          <Row style={{ marginTop: "1rem" }}>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>
                                  Person Designation
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  required
                                  name="id_proof_of_scp"
                                  as="select"
                                  className="form-control"
                                >
                                  {/* {designation.map((desig, i) => (
                                    <option key={i} value={desig}>
                                      {desig}
                                    </option>
                                  ))} */}
                                </Field>
                                <Form.Control.Feedback type="invalid">
                                  Error
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>

                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>
                                  Select ID Proof Type
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  required
                                  name="id_proof_of_scp_type"
                                  as="select"
                                  className="form-control"
                                >
                                  {/* {ID_Proof_Doc_list.map((docType, i) => (
                                    <option key={i} value={docType}>
                                      {docType}
                                    </option>
                                  ))} */}
                                </Field>
                                <Form.Control.Feedback type="invalid">
                                  Error
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>
                                  Enter ID Proof Number
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  name="id_proof_of_scp_number"
                                  as={Form.Control}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Error
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>

                  <Card className="custom-card border border-primary">
                    <Card.Body>
                      <Row style={{ marginTop: "1rem" }}>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>
                            Select Resolution for Starting ITI
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                `registration_cert_of_applicant_org`,
                                event.currentTarget.files[0]
                              );
                            }}
                          // isInvalid={
                          //   touched.land_documents?.[index]?.file &&
                          //   !!errors.land_documents?.[index]?.file
                          // }
                          />
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              View Format for `Resolution for starting ITI` Annexure-3
                            </Form.Label>
                            <Link to="/new_registration/annexure-3" target="_blank">
                              <Button
                                variant="primary"
                                className="rounded-pill btn-wave"
                              >
                                View Annexure-3 Format
                              </Button>
                            </Link>
                          </Form.Group>
                        </Col>
                      </Row>
                      <hr />
                      <Row style={{ marginTop: "1rem" }}>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>
                            Select Resolution from Applicant for Authorized signatory
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                `registration_cert_of_applicant_org`,
                                event.currentTarget.files[0]
                              );
                            }}
                          // isInvalid={
                          //   touched.land_documents?.[index]?.file &&
                          //   !!errors.land_documents?.[index]?.file
                          // }
                          />
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              View Format for `Resolution from Applicant for
                              Authorized Signatory` Annexure-4
                            </Form.Label>
                            <Link to="/new_registration/annexure-3" target="_blank">
                              <Button
                                variant="primary"
                                className="rounded-pill btn-wave"
                              >
                                View Annexure-4 Format
                              </Button>
                            </Link>
                          </Form.Group>
                        </Col>
                      </Row>
                      <hr />
                      <Row style={{ marginTop: "1rem" }}>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>
                            Select Resolution Regarding Earmarking of Land, Building,
                            and other Resources Exclusively Dedicated to the ITI (if
                            any), as per the Format Provided in Annexure-5.
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                `registration_cert_of_applicant_org`,
                                event.currentTarget.files[0]
                              );
                            }}
                          // isInvalid={
                          //   touched.land_documents?.[index]?.file &&
                          //   !!errors.land_documents?.[index]?.file
                          // }
                          />
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>View Format for Annexure-5</Form.Label>
                            <Link to="/new_registration/annexure-3" target="_blank">
                              <Button
                                variant="primary"
                                className="rounded-pill btn-wave"
                              >
                                View Annexure-5 Format
                              </Button>
                            </Link>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </>)}

              <Card className="custom-card border border-primary">
                <Card.Body>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Self Declaration<span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <Row style={{ marginTop: "1rem" }}>
                    <Col md={12}>
                      {`Institute's self-declaration of compliance with Affiliation Norms and acknowledgment of responsibilities, as per Annexure-6`}
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  {/* <Button
                    onClick={() => formikRef.current?.submitForm()}
                    size="lg"
                    variant="success"
                    className="btn-wave"
                  >
                    Submit Application
                  </Button> */}
                  <ConfirmBox submitNow={submitNow} />
                </Card.Footer>
              </Card>
            </Form>
          </>)
        }}
      </Formik>
    </Fragment>
  );
};

export default DetailsOfDocumentsToBeUploaded;


const renderOtpInputs = (otpArray, setOtpArray, refs, onComplete) => (
  <div className="d-flex justify-content-start flex-wrap gap-1 mt-2">
    {otpArray.map((val, idx) => (
      <Form.Control
        key={idx}
        type="text"
        maxLength="1"
        value={val}
        className="text-center p-0"
        style={{
          width: "2rem",
          height: "2rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
        }}
        ref={(el) => (refs.current[idx] = el)}
        onChange={(e) => {
          if (!isNaN(e.target.value)) {
            const updatedOtp = [...otpArray];
            updatedOtp[idx] = e.target.value;
            setOtpArray(updatedOtp);
            if (e.target.value && idx < 5) refs.current[idx + 1].focus();
            if (updatedOtp.every((digit) => digit !== "")) onComplete(true);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && otpArray[idx] === "") {
            if (idx > 0) refs.current[idx - 1].focus();
          }
        }}
      />
    ))}
    {otpArray.every((v) => v !== "") && (
      <span style={{ fontSize: "1.25rem", color: "green", marginLeft: "10px" }}>&#10004;</span>
    )}
  </div>
);
const MyVerticallyCenteredModal = (props) => {


  const [emailTimer, setEmailTimer] = useState(0);
  const [mobileTimer, setMobileTimer] = useState(0);

  const [signupEmailTimer, setSignupEmailTimer] = useState(0);
  const [signupMobileTimer, setSignupMobileTimer] = useState(0);

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [emailOtpVisible, setEmailOtpVisible] = useState(false);
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
  const [emailOtpComplete, setEmailOtpComplete] = useState(false);
  const emailOtpRefs = useRef([]);

  const [mobileOtpVisible, setMobileOtpVisible] = useState(false);
  const [mobileOtp, setMobileOtp] = useState(new Array(6).fill(""));
  const [mobileOtpComplete, setMobileOtpComplete] = useState(false);
  const mobileOtpRefs = useRef([]);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupMobile, setSignupMobile] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState("");

  const [signupEmailOtpVisible, setSignupEmailOtpVisible] = useState(false);
  const [signupEmailOtp, setSignupEmailOtp] = useState(new Array(6).fill(""));
  const [signupEmailOtpComplete, setSignupEmailOtpComplete] = useState(false);
  const signupEmailOtpRefs = useRef([]);

  const [signupMobileOtpVisible, setSignupMobileOtpVisible] = useState(false);
  const [signupMobileOtp, setSignupMobileOtp] = useState(new Array(6).fill(""));
  const [signupMobileOtpComplete, setSignupMobileOtpComplete] = useState(false);
  const signupMobileOtpRefs = useRef([]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [view, setView] = useState("signin");

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h6">
          Submit Stage-I Docuemnts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* className="mt-5" */}
        <div >
          <h3 className="mb-3">
            Dear, <span className="text-primary">Applicant</span>
          </h3>
          <p>
            Your stage I application has been successfully completed. The Application will now be forwarded to the Concerned State Directorage for Assessment. One's submitted, You can not modify your application. You will be notified onces the evaluation is completed.
          </p>

        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={props.submitNow}>Submit Now</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const ConfirmBox = ({ submitNow }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Button variant="success" onClick={() => setModalShow(true)}>
        Save & Next
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        submitNow={submitNow}
      />
    </div>
  )
}