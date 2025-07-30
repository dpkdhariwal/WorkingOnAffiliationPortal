
import { Row, Col, Card, Form, InputGroup, Button, Table, Modal } from "react-bootstrap";
import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";

import { Formik, Field, FieldArray } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import * as formik from "formik";
import ReqSign from "../../../components/new_registration/form/comp/requiredSign";

import { Form as BootstrapForm } from "react-bootstrap";


import Pageheader from "../../../layouts/Pageheader";

export const AddNewMemberByState = () => {


  const formikRef = useRef();


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const authUser = useSelector((state) => state.loginUserReducer);

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
            // dispatch({ type: UPDATE_BUILDING_DETAILS, payload: values });
            // dispatch({ type: "set_filled_step_II", payload: { step: 1 }, });
            // dispatch({ type: "reg_set_active_stepII", payload: { step: 2 } });
            // setActive(reg.stepsII[1]);




            Swal.close();
          },
        });
      } else {
        console.log("User cancelled save");
      }
    });
  };

  return (
    <Fragment>
      <Pageheader
        mainheading={`Add New Inpsection Member`}
        parentfolder="Dashboard"
        activepage="Add New Inpsection Member"
      />
      <>
        {false && (<Formik
          innerRef={formikRef}
          // initialValues={Building_Detail_initialValues}
          // validationSchema={yup.object().shape(building_detail_yup_object)}
          onSubmit={(values) => {
            submit(values);
            console.log("Form Values", values);
          }}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Card className="custom-card border border-primary">
                <Card.Header>
                  <div className="card-title" style={{ textTransform: "none" }}>
                    <h5>Add New Inpsection Member</h5>
                  </div>
                </Card.Header>
                <Card.Body>
                  <h6>Building Plan</h6>
                  <hr />
                  <h6>Building Completion Certificate (BCC)</h6>
                  <Row style={{ marginTop: "1rem" }}>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>
                          Document Language for Building Completion Certificate
                          (BCC)
                          <ReqSign />
                        </Form.Label>
                        <Field
                          required
                          name="language_for_building_completion_certificate"
                          as="select"
                          className="form-control"
                          onChange={handleChange}
                          isInvalid={
                            touched.language_for_building_completion_certificate &&
                            !!errors.language_for_building_completion_certificate
                          }
                        >
                          {/* {languages.map((lang, i) => (
                            <option key={i} value={lang}>
                              {lang}
                            </option>
                          ))} */}
                        </Field>
                        {touched.language_for_building_completion_certificate && errors.language_for_building_completion_certificate && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-block"
                          >
                            {errors.language_for_building_completion_certificate}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>
                          Upload Original Building Completion Certificate (BCC)
                          <ReqSign />
                          <br />
                          (As per Annexure-10):{" "}
                          <Button
                            variant="link"
                            className="rounded-pill btn-wave"
                          >
                            Download Format
                          </Button>
                        </Form.Label>
                        {/* <div className="d-flex align-items-center gap-2"> */}
                        <Form.Control required type="file"
                          name="building_completion_certificate"
                          // value={values?.building_completion_certificate}
                          onChange={handleChange}
                          isInvalid={
                            touched.building_completion_certificate &&
                            !!errors.building_completion_certificate
                          } />
                        {/* <Button variant="primary">Upload</Button> */}
                        {/* </div> */}
                        {touched.notarised_document_of_building_plan &&
                          errors.building_completion_certificate && (
                            <BootstrapForm.Control.Feedback type="invalid">
                              {errors.building_completion_certificate}
                            </BootstrapForm.Control.Feedback>
                          )}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>
                          Upload Hindi/English Notarised Copy of document
                          <ReqSign />
                        </Form.Label>
                        {/* <div className="d-flex align-items-center gap-2"> */}
                        <Form.Control type="file" name="notarised_document_of_bcc"
                          // value={values?.notarised_document_of_bcc}
                          onChange={handleChange}
                          isInvalid={
                            touched.notarised_document_of_bcc &&
                            !!errors.notarised_document_of_bcc
                          } />
                        {/* <Button variant="primary">Upload</Button> */}
                        {/* </div> */}
                        {touched.notarised_document_of_bcc &&
                          errors.notarised_document_of_bcc && (
                            <BootstrapForm.Control.Feedback type="invalid">
                              {errors.notarised_document_of_bcc}
                            </BootstrapForm.Control.Feedback>
                          )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <hr />
                  <h6>Name of Issuing Authority for BCC</h6>
                  <Row style={{ marginTop: "1rem" }}>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          Name of issued Authority
                          <ReqSign />
                        </Form.Label>
                        <Field placeholder="Enter BCC Issued Authority Name" required name="name_of_bcc_issued_authority" as={Form.Control} value={values?.name_of_bcc_issued_authority} onChange={handleChange}
                          isInvalid={
                            touched.name_of_bcc_issued_authority &&
                            !!errors.name_of_bcc_issued_authority
                          } />
                        {touched.name_of_bcc_issued_authority &&
                          errors.name_of_bcc_issued_authority && (
                            <BootstrapForm.Control.Feedback type="invalid">
                              {errors.name_of_bcc_issued_authority}
                            </BootstrapForm.Control.Feedback>
                          )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          Date of Issued
                          <ReqSign />
                        </Form.Label>
                        <Form.Control required type="date" name="date_of_bcc_issued" as={Form.Control} value={values?.date_of_bcc_issued} onChange={handleChange}
                          isInvalid={
                            touched.date_of_bcc_issued &&
                            !!errors.date_of_bcc_issued
                          } />
                        {touched.date_of_bcc_issued &&
                          errors.date_of_bcc_issued && (
                            <BootstrapForm.Control.Feedback type="invalid">
                              {errors.date_of_bcc_issued}
                            </BootstrapForm.Control.Feedback>
                          )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr />
                  <Card className="custom-card border border-info ">
                    <Card.Header>
                      <div
                        className="card-title"
                        style={{ textTransform: "none" }}
                      >
                        Photos of Building
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row style={{ marginTop: "1rem" }}>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Upload Front View Photo of Building
                              <ReqSign />
                            </Form.Label>
                            {/* <div className="d-flex align-items-center gap-2"> */}
                            <Form.Control type="file" name="front_view_photo_of_building"
                              //  value={values?.front_view_photo_of_building}
                              onChange={handleChange}
                              isInvalid={
                                touched.front_view_photo_of_building &&
                                !!errors.front_view_photo_of_building
                              } /> {touched.front_view_photo_of_building &&
                                errors.front_view_photo_of_building && (
                                  <BootstrapForm.Control.Feedback type="invalid">
                                    {errors.front_view_photo_of_building}
                                  </BootstrapForm.Control.Feedback>
                                )}
                            {/* <Button variant="primary">Upload</Button> */}
                            {/* </div> */}
                            <Form.Control.Feedback type="invalid">
                              Select Document
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              Upload Side View Photo of Building
                              <ReqSign />
                            </Form.Label>
                            {/* <div className="d-flex align-items-center gap-2"> */}
                            <Form.Control type="file" name="side_view_photo_of_building"
                              // value={values?.side_view_photo_of_building}
                              onChange={handleChange}
                              isInvalid={
                                touched.side_view_photo_of_building &&
                                !!errors.side_view_photo_of_building
                              } /> {touched.side_view_photo_of_building &&
                                errors.side_view_photo_of_building && (
                                  <BootstrapForm.Control.Feedback type="invalid">
                                    {errors.side_view_photo_of_building}
                                  </BootstrapForm.Control.Feedback>
                                )}
                            {/* <Button variant="primary">Upload</Button>
                                </div> */}
                            <Form.Control.Feedback type="invalid">
                              Select Document
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6} style={{ marginTop: "10px" }}>
                          <Form.Group>
                            <Form.Label>
                              Upload Entrance Gate Photo of Plot (with Signage
                              Board)
                              <ReqSign />
                            </Form.Label>
                            {/* <div className="d-flex align-items-center gap-2"> */}
                            <Form.Control type="file" name="entrance_gate_photo_of_plot_with_signage_board"
                              // value={values?.entrance_gate_photo_of_plot_with_signage_board}
                              onChange={handleChange}
                              isInvalid={
                                touched.entrance_gate_photo_of_plot_with_signage_board &&
                                !!errors.entrance_gate_photo_of_plot_with_signage_board
                              } /> {touched.entrance_gate_photo_of_plot_with_signage_board &&
                                errors.entrance_gate_photo_of_plot_with_signage_board && (
                                  <BootstrapForm.Control.Feedback type="invalid">
                                    {errors.entrance_gate_photo_of_plot_with_signage_board}
                                  </BootstrapForm.Control.Feedback>
                                )}
                            {/* <Button variant="primary">Upload</Button>
                                </div> */}
                            <Form.Control.Feedback type="invalid">
                              Select Document
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <hr />
                      <div className="invoice-notes text-danger">
                        <label className="main-content-label tx-13">Notes</label>
                        <p>
                          <ol>
                            <li>Upload Geo tagged Photo</li>
                            <li>
                              Geotagged photo may be taken from any apps having
                              such functionality, These geotagged photos must
                              mention <b>date, time, latitude and longitude.</b>
                            </li>
                          </ol>
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
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
                  </div>
                </Card.Footer>
              </Card>
            </Form>
          )}
        </Formik>)}
      </>
    </Fragment>
  );
};
