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

// import * as get from "../../../../../../../../db/forms/stageI/get/get";
// import * as set from "../../../../../../../../db/forms/stageI/set/set";

// import { get_da_status_possasion_of_land, set_da_status_possasion_of_land } from "../../../../../../../../db/forms/stageI/set/set";
import * as C from "affserver";
// import SwalManager from "../../../../../../../../common/SwalManager";

// import * as st from "../../../../../../../../services/state/index";
import { st1documentuploads } from 'affserver';
// import { SelectField } from "../../../../../../../formik/Inputs";

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { ContextMap } from "../../../../../../../../formik/contexts/index";
import { SelectField, TextField } from "../../../../../../../../formik/Inputs";
import { land_info_yupObject } from "../../../../../../../../../reducers/newAppReducer";
import { FormContext } from "../land_documents";
import { formatedDate } from "@/helpers";


export const LandAreaApplicantForm = ({ data, step, view: viewProp = false, isView = false }) => {

  console.log(data);

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



  // const loadInfo = async () => {
  //   let result = await get_da_status_possasion_of_land(appId);
  //   console.log(result);
  //   let assessment_status = await set.getAssessmentProgressStatus(appId);
  //   setAStatus(assessment_status);
  //   const lastObj = result[result.length - 1];
  //   if (lastObj) {
  //     setInitValue(lastObj);
  //     console.log(lastObj);
  //     setFormData(lastObj);
  //     setFormSubmited(true);
  //     setReviewStatus(C.SL.REVIEWED);
  //     setViewType(C.SL.VIEW);
  //   }
  // }

  // useEffect(() => {
  //   loadInfo();
  // }, [appId]);


  useEffect(() => {
    console.log(aStatus);
  }, [aStatus]);

  const formRef = useRef();

  //Important Attaching to Context 
  //Important Attaching to Context 
  let obj = { changeInForm: true, refNo: data.uniqueId, editMode: true, getData: () => { return formikRef } }
  const [formId, setFormId] = useState('land_area'); // true || false
  const { registerForm, unregisterForm } = useContext(FormContext);
  registerForm(formId, obj); //TEST

  useEffect(() => {
    if (formikRef.current) {
      registerForm(formId, obj);
    }
    // return () => unregisterForm(formId);
  }, [formikRef, formId, registerForm, unregisterForm]);
  const hChangeInForm = async () => {
    await formikRef?.current?.submitForm();
    console.log("hChangeInForm", formId);
    registerForm(formId, obj);
  }
  useEffect(() => {
    hChangeInForm();
  }, [appId]);

  return (
    <>
      <Row
        style={{
          // backgroundColor: "rgb(245, 245, 245)",
          // margin: "10px 0px 0px",
          borderRadius: 6,
        }}
      >
        <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
          <Card
            className={`border border-2 card custom-card shadow-size-small ${{ yes: "shadow-success border-success", no: "shadow-danger border-danger" }[
              data?.Verificiation?.as_per_norms
            ] || "shadow-primary border-primary"
              } card`}
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
                {formatedDate(data?.Verificiation?.insertDate)}
              </div>
            </Card.Header>
            <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
              <Row className="mb-3">
                <Col md={12}>
                  <b>Whether the Land Area of the applicant institute is as per norms?:</b>
                  <span style={{ textTransform: "capitalize" }}> {data?.Verificiation?.as_per_norms} </span> </Col>
                {data?.Verificiation?.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {data?.Verificiation?.reason} </span> </Col>)}
                {data?.Verificiation?.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{data?.Verificiation?.assessor_comments}</p> </Col>)}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
          {data?.da_status == C.SL.REPLIED ? (
            <Card className="custom-card border border-primary">
              <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                  Entered New Land Area
                </div>
              </Card.Header>
              <Card.Body>
                <h2>{data?.latest_land_area?.land_area} Sq. m</h2>
              </Card.Body>
              <Card.Footer>
                <Button size="sm">Edit</Button>
              </Card.Footer>
            </Card>
          ) : (
            <Formik
              enableReinitialize={true}
              innerRef={formikRef}
              initialValues={{ land_area: C.landDetail.initialValues.land_area_in_square_metres }}
              validationSchema={yup.object().shape({ land_area: land_info_yupObject.land_area_in_square_metres })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("Form submitted with:", values);
                setSubmitting(false);
                // resetForm();
              }}
            >
              {({ handleSubmit, handleChange, setFieldValue, values, errors, touched, handleBlur }) => {
                console.log(errors)
                useEffect(() => {
                  console.log("Registered Again", formId);
                  hChangeInForm();
                }, [values, formId, registerForm]);

                return (<>
                  <ContextMap.stageIAsmtAppDocUpload.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur }} >
                    <Form noValidate onSubmit={handleSubmit}>
                      <Card className="custom-card border border-primary">
                        <Card.Header>
                          <div className="card-title" style={{ textTransform: "none" }}>
                            Enter New Land Area
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <TextField label="Enter Land Area" name="land_area" type="text" mandatory contextName="stageIAsmtAppDocUpload" size="lg" />
                        </Card.Body>
                      </Card>
                    </Form >
                  </ContextMap.stageIAsmtAppDocUpload.Provider>
                </>)
              }}
            </Formik>
          )}

        </Col>
      </Row>
    </>
  );
};








