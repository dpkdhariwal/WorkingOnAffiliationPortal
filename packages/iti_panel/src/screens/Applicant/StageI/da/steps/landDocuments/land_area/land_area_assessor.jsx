import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";

import { useLocation } from "react-router-dom";

import * as get from "../../../../../../../../db/forms/stageI/get/get";
import * as set from "../../../../../../../../db/forms/stageI/set/set";

import { get_da_status_possasion_of_land, set_da_status_possasion_of_land } from "../../../../../../../../db/forms/stageI/set/set";
import * as C from "affserver";
import SwalManager from "../../../../../../../../common/SwalManager";

import * as st from "../../../../../../../../services/state/index";
import { st1documentuploads } from 'affserver';
import { SelectField } from "../../../../../../../formik/Inputs";

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { ContextMap } from "../../../../../../../formik/contexts";


export const LandAreaAssessor = ({ step, view: viewProp = false, isView = false }) => {

  console.log(step);

  // Location
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

 
  const { Formik } = formik;
  const formRef2 = useRef();
  const formikRef = useRef();

  // useState
  const [view, setView] = useState(viewProp);
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [aStatus, setAStatus] = useState({});
  // End
  const [language, setLanguage] = useState([]);


  const loadInfo = async () => {
    let result = await get_da_status_possasion_of_land(appId);
    console.log(result);
    let assessment_status = await set.getAssessmentProgressStatus(appId);
    setAStatus(assessment_status);
    const lastObj = result[result.length - 1];
    if (lastObj) {
      setInitValue(lastObj);
      console.log(lastObj);
      setFormData(lastObj);
      setFormSubmited(true);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
    }
  }

  useEffect(() => {
    loadInfo();
  }, [appId]);


  useEffect(() => {
    console.log(aStatus);
  }, [aStatus]);



  const formRef = useRef();
  const register = useFunctionRegistry();
  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);


  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);


  const form = async () => {
    console.log(formRef.current.isValid);
    if (formRef.current.isValid) {
      await set_da_status_possasion_of_land(appId, formRef.current.values);
      setAnyChangesMade(false);
      setEditMode(false);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
      return true;
    }
    else {
      return false;
    }
  }


  const submitNow = async () => {
    console.log(reviewStatus);
    switch (reviewStatus) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editMode) {
          case true:
            return await form();
          case false:
            return true;
        }
        break;
      default:
        break;
    }
  }




  return (
    <>
      <Card className="custom-card shadow" style={{ marginTop: '10px', padding: '0px', padddingBlockStart: '0px !importent' }}>
        <Card.Header className="d-flex justify-content-between mb-3 bg bg-danger-gradient">
          <div className="p-2">
            <h5>Land Area</h5>
          </div>
          <div className="p-2"><Button size="md" className="btn-info">View Old Documents</Button></div>
        </Card.Header>
        {/* style={{ padding: "5px" }} */}
        <Card.Body >
          <Card
            className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
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
                State Remark
              </label>
              <div className="ms-auto  d-flex">
                25th April 2025:10:20PM
              </div>
            </Card.Header>
            <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
              <Row className="mb-3">
                <Col md={12}> <b>Whether the Land Area of the applicant institute is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                {formData.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
              </Row>
            </Card.Body>
          </Card>
          <hr />
          <Formik
            enableReinitialize={true}
            innerRef={formikRef}
            initialValues={st1documentuploads.intiValuesForLandDocuments}
            validationSchema={st1documentuploads.valSchemaForLandDocuments}
          >
            {({ handleSubmit, handleChange, setFieldValue, values, errors, touched, handleBlur }) => {
              console.log(errors)
              return (<>
                <ContextMap.stageIAsmtAppDocUpload.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur }} >
                  <Form noValidate onSubmit={handleSubmit}>
                    <FieldArray name="onwed_land_documents">
                      {({ push, remove }) => (
                        <Card className="custom-card border border-primary">
                          <Card.Header>
                            <div className="card-title" style={{ textTransform: "none" }}>
                              Upload Onwed Land Documents
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <Table bordered hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Document Language <span style={{ color: "red" }}>*</span></th>
                                  <th>Original Document <span style={{ color: "red" }}>*</span></th>
                                  <th>Notarised Copy</th>
                                  {/* <th>Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {values.onwed_land_documents.map((doc, index) => (
                                  <tr
                                    key={doc.id} // ✅ stable unique key
                                    style={{
                                      marginBottom: "1rem",
                                      border: "1px solid #ccc",
                                      padding: "10px",
                                    }}
                                  >
                                    <td>{index + 1}</td>
                                    <td>
                                      <SelectField
                                        label="State"
                                        name={`onwed_land_documents[${index}].land_documents_language`}
                                        mandatory
                                        options={language}
                                        contextName="stageIAsmtAppDocUpload"
                                        // onValueChange={(val) => OnApplicantEntityStateChange(val, 'cmp_post_district')}
                                        valueProp="language"
                                        labelProp="language"
                                        size="lg"
                                      />
                                    </td>
                                    <td>
                                      <BootstrapForm.Group>
                                        {values.onwed_land_documents[index].land_documents ? (
                                          <div>
                                            {/* Show selected file name */}
                                            <strong>{values.onwed_land_documents[index].land_documents.name}</strong>
                                            <hr />
                                            {/* View Button */}
                                            <Button
                                              variant="info"
                                              size="sm"
                                              className="ms-2"
                                              onClick={() =>
                                                window.open(
                                                  URL.createObjectURL(values.onwed_land_documents[index].land_documents),
                                                  "_blank"
                                                )
                                              }
                                            >
                                              View
                                            </Button>

                                            {/* Remove Button */}
                                            <Button
                                              variant="danger"
                                              size="sm"
                                              className="ms-2"
                                              onClick={() => setFieldValue(`onwed_land_documents[${index}].land_documents`, null)}
                                            >
                                              Remove
                                            </Button>
                                          </div>
                                        ) : (
                                          <>
                                            <BootstrapForm.Control
                                              type="file"
                                              onChange={(e) =>
                                                setFieldValue(`onwed_land_documents[${index}].land_documents`, e.target.files[0])
                                              }
                                              isInvalid={!!errors.onwed_land_documents?.[index]?.land_documents}

                                            />
                                            <ErrorMessage
                                              name={`onwed_land_documents[${index}].land_documents`}
                                              component="div"
                                              style={{ color: "red" }}
                                            />
                                          </>
                                        )}
                                      </BootstrapForm.Group>
                                    </td>
                                    <td>
                                      <BootstrapForm.Group>
                                        {values.onwed_land_documents[index].land_notarised_documents && values.onwed_land_documents[index].land_documents_language != "Hindi" && values.onwed_land_documents[index].land_documents_language != "English" ? (
                                          <div>
                                            {/* Show selected file name */}
                                            <strong>{values.onwed_land_documents[index].land_notarised_documents.name}</strong>
                                            <hr />
                                            {/* View Button */}
                                            <Button
                                              variant="info"
                                              size="sm"
                                              className="ms-2"
                                              onClick={() =>
                                                window.open(
                                                  URL.createObjectURL(values.onwed_land_documents[index].land_notarised_documents),
                                                  "_blank"
                                                )
                                              }
                                            >
                                              View
                                            </Button>
                                            {/* Remove Button */}
                                            <Button
                                              variant="danger"
                                              size="sm"
                                              className="ms-2"
                                              onClick={() => setFieldValue(`onwed_land_documents[${index}].land_notarised_documents`, null)}
                                            >
                                              Remove
                                            </Button>
                                          </div>
                                        ) : (
                                          <>
                                            <BootstrapForm.Control
                                              disabled={
                                                values.onwed_land_documents[index].land_documents_language === "Hindi" ||
                                                values.onwed_land_documents[index].land_documents_language === "English"
                                              } // ✅ Disable if Hindi/English
                                              type="file"
                                              onChange={(e) =>
                                                setFieldValue(`onwed_land_documents[${index}].land_notarised_documents`, e.target.files[0])
                                              }
                                              isInvalid={!!errors.onwed_land_documents?.[index]?.land_notarised_documents}

                                            />
                                            <ErrorMessage
                                              name={`onwed_land_documents[${index}].land_notarised_documents`}
                                              component="div"
                                              style={{ color: "red" }}
                                            />
                                          </>
                                        )}
                                      </BootstrapForm.Group>
                                    </td>
                                    {false && (<td>
                                      {/* Remove Button */}
                                      {values.onwed_land_documents.length > 1 && (
                                        <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                      )}
                                    </td>)}
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Card.Body>
                          {false && (<Card.Footer className="text-start">
                            <Button className="mb-3" onClick={() =>
                              push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                            }>
                              Add More
                            </Button>
                          </Card.Footer>)}
                        </Card>
                      )}
                    </FieldArray>
                  </Form >
                </ContextMap.stageIAsmtAppDocUpload.Provider>
              </>)
            }}
          </Formik>

        </Card.Body>
      </Card>
    </>
  );
};








