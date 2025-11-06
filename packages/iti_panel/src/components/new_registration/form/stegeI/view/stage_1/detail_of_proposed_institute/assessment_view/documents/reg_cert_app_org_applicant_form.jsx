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
import { FileField } from "../../../../../../../../formik/Inputs/FileField";
import { DocumentFormContext } from "../documents";
import { OrgCertItiRepliedView } from "./org_registration_certificate/replyView";
import { formatedDate } from "@/helpers";


export const RegCertOrgAppliForm = ({ data, step, view: viewProp = false, isView = false }) => {

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
  // const register = useFunctionRegistry();
  // useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);


  // const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND}`, () => { return { submitNow } }); }
  // useEffect(() => { formFunction(); }, [formRef]);


  // const form = async () => {
  //   console.log(formRef.current.isValid);
  //   if (formRef.current.isValid) {
  //     await set_da_status_possasion_of_land(appId, formRef.current.values);
  //     setAnyChangesMade(false);
  //     setEditMode(false);
  //     setReviewStatus(C.SL.REVIEWED);
  //     setViewType(C.SL.VIEW);
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }


  // const submitNow = async () => {
  //   console.log(reviewStatus);
  //   switch (reviewStatus) {
  //     case C.SL.PENDING:
  //       return await form();
  //     case C.SL.REVIEWED:
  //       switch (editMode) {
  //         case true:
  //           return await form();
  //         case false:
  //           return true;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }

  const [isValidEmailTyped, setIsValidEmailTyped] = useState(false);
  const emailSchema = yup.string().email("Invalid email address").required("Email is required");
  const validationLayer = async (email) => {
    try {
      await emailSchema.validate(email);
      setIsValidEmailTyped(true); // valid
    } catch (err) {
      setIsValidEmailTyped(false); // invalid
    }
  }
  const verifyEmailOtp = async (email) => {
    const { value: otp } = await Swal.fire({
      title: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
      input: "text",          // input type
      // inputLabel: "OTP Code",
      inputPlaceholder: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
      showCancelButton: true, // user can cancel
      confirmButtonText: "Verify",
      cancelButtonText: "Cancel",
      allowOutsideClick: false, // cannot close by clicking outside
      allowEscapeKey: false,    // cannot close by pressing Escape
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter OTP!";
        }
        if (!/^\d{4,6}$/.test(value)) {
          return "OTP must be 4-6 digits";
        }
      },
    });

    if (otp) {
      console.log("User entered OTP:", otp);
      // Here you can call your API to verify OTP
      formikRef.current.setFieldValue('is_verified_email_id_of_authorized_signatory', true);

    } else {
      console.log("User cancelled OTP input");
      // setOtpSent(false);
    }
  }

  // const [language, setLanguage] = useState([]);
  const [id_proof_master, setId_proof_master] = useState([]);
  const [designation_master, setDesignation_master] = useState([]);



  const mobileSchema = yup.string().required("Please enter contact number").matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number");
  const [isValidMobileTyped, setIsValidMobileTyped] = useState(false);
  const validationLayer2 = async (mobile) => {
    try {
      await mobileSchema.validate(mobile);
      setIsValidMobileTyped(true); // valid
    } catch (err) {
      setIsValidMobileTyped(false); // invalid
    }
  }
  const verifyMobileOtp = async (mobile) => {
    const { value: otp } = await Swal.fire({
      title: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
      input: "text",          // input type
      // inputLabel: "OTP Code",
      inputPlaceholder: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
      showCancelButton: true, // user can cancel
      confirmButtonText: "Verify",
      cancelButtonText: "Cancel",
      allowOutsideClick: false, // cannot close by clicking outside
      allowEscapeKey: false,    // cannot close by pressing Escape
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter OTP!";
        }
        if (!/^\d{4,6}$/.test(value)) {
          return "OTP must be 4-6 digits";
        }
      },
    });

    if (otp) {
      console.log("User entered OTP:", otp);
      // Here you can call your API to verify OTP
      formikRef.current.setFieldValue('is_verified_mobile_number_of_authorized_signatory', true);

    } else {
      console.log("User cancelled OTP input");
      // setOtpSent(false);
    }
  }


  //Important Attaching to Context 
  let obj = { changeInForm: true, refNo: data.uniqueId, editMode: true, getData: () => { return formikRef } }
  const [formId, setFormId] = useState(C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION); // true || false
  const { registerForm, unregisterForm } = useContext(DocumentFormContext);
  registerForm(formId, obj);
  useEffect(() => {
    if (formikRef.current) {
      registerForm(formId, obj);
    }
    // return () => unregisterForm(formId);
  }, [formikRef, formId, registerForm, unregisterForm, obj]);
  const hChangeInForm = async () => {
    // await formRef.current.submitForm();
    console.log("land document da action registered");
    registerForm(formId, obj);
  }
  useEffect(() => {
    registerForm(formId, obj);
  }, [appId]);
  useEffect(() => {
    registerForm(formId, obj);
  }, [formikRef]);
  useEffect(() => {
    hChangeInForm();
  }, [appId]);
  useEffect(() => {
    if (data.Verificiation === null) {
      setAnyChangesMade(true);
    }
  }, [data]);

  const onEdit = () => {
    setReviewStatus(C.SL.PENDING);
    setAnyChangesMade(true);
  }

  return (
    <>
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
      <hr />
      {data?.da_status == C.SL.REPLIED ? (<OrgCertItiRepliedView />) : (
        <Formik
          enableReinitialize={true}
          innerRef={formikRef}
          initialValues={st1documentuploads.intiValuesRegistrationCertificateOrg}
          validationSchema={st1documentuploads.valSchemaForRegistrationCertificateOrg}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors, touched, handleBlur }) => {
            console.log(errors)
            return (<>
              <ContextMap.stageIAsmtAppDocUpload.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur }} >
                <Form noValidate onSubmit={handleSubmit}>
                  <Card className="custom-card border border-primary">
                    <Card.Body>
                      <BootstrapForm.Group>
                        <Form.Label>
                          Select Registration Certificate of Applicant Organization
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {!values.doc_of_registration_cert_of_applicant_org ? (
                          <>
                            <BootstrapForm.Control
                              type="file"
                              onChange={(e) =>
                                setFieldValue(
                                  "doc_of_registration_cert_of_applicant_org",
                                  e.target.files[0]
                                )
                              }
                              isInvalid={!!errors.doc_of_registration_cert_of_applicant_org}
                            />
                            <ErrorMessage
                              name="doc_of_registration_cert_of_applicant_org"
                              component="div"
                              style={{ color: "red" }}
                            />
                          </>
                        ) : (
                          <div>
                            {/* Show selected file name */}
                            <strong>{values.doc_of_registration_cert_of_applicant_org.name}</strong>
                            <hr />

                            <div className="d-flex gap-2">
                              {/* View Button */}
                              <Button
                                variant="info"
                                size="sm"
                                onClick={() => {
                                  const fileURL = URL.createObjectURL(
                                    values.doc_of_registration_cert_of_applicant_org
                                  );
                                  window.open(fileURL, "_blank");
                                  URL.revokeObjectURL(fileURL); // clean up memory
                                }}
                              >
                                View
                              </Button>

                              {/* Remove Button */}
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() =>
                                  setFieldValue("doc_of_registration_cert_of_applicant_org", null)
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        )}
                      </BootstrapForm.Group>

                      {/* <BootstrapForm.Group>
                        <Form.Label>
                          Select Registration Certificate of Applicant Organization
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <BootstrapForm.Control
                          type="file"
                          onChange={(e) =>
                            setFieldValue(`doc_of_registration_cert_of_applicant_org`, e.target.files[0])
                          }
                          isInvalid={!!errors.doc_of_registration_cert_of_applicant_org}

                        />
                        <ErrorMessage
                          name={`doc_of_registration_cert_of_applicant_org`}
                          component="div"
                          style={{ color: "red" }}
                        />
                      </BootstrapForm.Group> */}
                    </Card.Body>
                  </Card>
                </Form >
              </ContextMap.stageIAsmtAppDocUpload.Provider>
            </>)
          }}
        </Formik>
      )}


    </>
  );
};








