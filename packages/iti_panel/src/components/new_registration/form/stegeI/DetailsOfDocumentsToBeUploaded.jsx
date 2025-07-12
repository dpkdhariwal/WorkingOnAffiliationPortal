import { Fragment, useEffect, useRef } from "react";
import { Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Form as BootstrapForm } from "react-bootstrap";

import { languages, ADD_MORE_LAND_DOCUMENT, SET_STAGE_I__DOCUMENT_STATUS } from "../../../../constants";
import { land_documents_yupObject } from "../../../../reducers/document_upload";


const DetailsOfDocumentsToBeUploaded = ({setActive}) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const land_info = useSelector((state) => state.land_info_reducer);
  const land_documents_initial_values = useSelector((state) => state.land_documents_reducer);
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
            dispatch({ type: SET_STAGE_I__DOCUMENT_STATUS, payload: values });
            dispatch({ type: "set_filled_step", payload: { step: 5 }, });
            dispatch({ type: "reg_set_active_step", payload: { step: 5 } });
            setActive(reg.steps[5]);

          },
        });
      } else {
        console.log("User cancelled save");
      }
    });
  };

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
              {land_info.possession_of_land == 'owned' && (<Card className="custom-card border border-primary">
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
                  <Button
                    onClick={() => formikRef.current?.submitForm()}
                    size="lg"
                    variant="success"
                    className="btn-wave"
                  >
                    Submit Application
                  </Button>
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
