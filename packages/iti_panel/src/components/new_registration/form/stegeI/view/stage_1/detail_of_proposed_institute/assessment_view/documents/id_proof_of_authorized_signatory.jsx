import React, { createContext, useRef, useContext, Fragment, useState, useEffect, useTransition } from "react";
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
import * as gen from "../../../../../../../../../services/state/index";

import { useTranslation } from 'react-i18next';
import { IdProofAuthSignRepliedView } from "./authorized_signatory/replyView";
import { formatedDate } from "@/helpers";

export const IdProofUpoloadFormApplicant = ({ data, step, view: viewProp = false, isView = false }) => {
  const { t } = useTranslation();

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
  // const [language, setLanguage] = useState([]);

  const [id_proof_master, setId_proof_master] = useState([]);
  // const loadData = async () => {
  //   let resp, result;
  //   try {
  //     // let r1 = await ap.getProposedInstDetailsAutoFill(appId);
  //     // setProposedInst(r1.data);

  //     // let r2 = await ap.getInstLandDetails(appId);
  //     // setLandInfo(r2.data);

  //     // setLand_owned_lands_details(r2.data);
  //     // setLand_inst_details(r2.data);
  //     // setlLand_leased_lands_details(r2.data);


  //     // let r3 = await gen.geLanguages(appId);
  //     // setLanguage(r3.data);


  //     // Setting Up Id Proof Master
  //     let r4 = await gen.getMasters(C.MastersKey.ID_PROOF);
  //     setId_proof_master(r4.data);


  //     // // Setting Up Designation Master
  //     // let r5 = await gen.getMasters(C.MastersKey.DESIGNATION);
  //     // setDesignation_master(r5.data);


  //     result = resp.data;
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   loadData();
  // }, []);

  const loadInfo = async () => {
    try {
      let r4 = await gen.getMasters(C.MastersKey.ID_PROOF);
      setId_proof_master(r4.data);
    } catch (error) {
      console.log(error);
    }
    // let result = await get_da_status_possasion_of_land(appId);
    // console.log(result);
    // let assessment_status = await set.getAssessmentProgressStatus(appId);
    // setAStatus(assessment_status);
    // const lastObj = result[result.length - 1];
    // if (lastObj) {
    //   setInitValue(lastObj);
    //   console.log(lastObj);
    //   setFormData(lastObj);
    //   setFormSubmited(true);
    //   setReviewStatus(C.SL.REVIEWED);
    //   setViewType(C.SL.VIEW);
    // }
  }

  useEffect(() => {
    loadInfo();
  }, [appId]);


  useEffect(() => {
    console.log(aStatus);
  }, [aStatus]);


  const formRef = useRef();

  useEffect(() => {
    console.log(id_proof_master);
  }, [id_proof_master])


  console.log(data.da_status);



  //Important Attaching to Context 
  let obj = { changeInForm: true, refNo: data.uniqueId, editMode: true, getData: () => { return formikRef } }
  const [formId, setFormId] = useState(C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY); // true || false
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
  }, [formRef]);
  // End
  useEffect(() => {
    hChangeInForm();
  }, [appId]);
  useEffect(() => {
    if (data.Verificiation === null) {
      setAnyChangesMade(true);
    }
  }, [data]);



  // Verification Code
  const [isValidEmailTyped, setIsValidEmailTyped] = useState(false);
  const emailSchema = yup.string().email("Invalid email address").required("Email is required");
  const validationLayer = async (email) => {
    try {
      await emailSchema.validate(email);
      setIsValidEmailTyped(true); // valid
      formikRef.current.setFieldValue('is_verified_email_id_of_authorized_signatory', true);

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


  const mobileSchema = yup.string().required("Please enter contact number").matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number");
  const [isValidMobileTyped, setIsValidMobileTyped] = useState(false);
  const validationLayer2 = async (mobile) => {
    try {
      await mobileSchema.validate(mobile);
      setIsValidMobileTyped(true); // valid
      formikRef.current.setFieldValue('is_verified_mobile_number_of_authorized_signatory', true);

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


  // useEffect(() => {

  //   if (data?.da_status == C.SL.REPLIED) {
  //     const { name, email_id, mobile_number, id_proof_type, id_proof_number, document } = data?.latest_auth_signatory_detail;
  //   }

  //   console.log(data, formikRef);
  // }, [formikRef])

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
      {data?.da_status == C.SL.REPLIED ? (<IdProofAuthSignRepliedView data={data}/>) : (
        <Formik
          enableReinitialize={true}
          innerRef={formikRef}
          initialValues={st1documentuploads.intiValuesAuthorizedSignatory}
          validationSchema={st1documentuploads.valSchemaForAuthorizedSignatory}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, errors, touched, handleBlur }) => {
            console.log(errors)
            return (<>
              <ContextMap.stageIAsmtAppDocUpload.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur }} >
                <Form noValidate onSubmit={handleSubmit}>
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
                            <BootstrapForm.Group as={Col} md="4">
                              <Form.Label>
                                Name<span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <BootstrapForm.Control
                                type="text"
                                size="lg"
                                name="name_of_authorized_signatory" // 👈 same path
                                value={values.name_of_authorized_signatory}
                                onChange={handleChange}
                                isInvalid={!!errors.name_of_authorized_signatory}
                                isValid={
                                  touched.name_of_authorized_signatory &&
                                  !errors.name_of_authorized_signatory
                                }
                                placeholder="Name"
                              />
                              <ErrorMessage
                                name="name_of_authorized_signatory"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </BootstrapForm.Group>

                            {/* Email has to Verify with OTP */}
                            <Col md={4}>
                              <TextField label="Email Id"
                                name="email_id_of_authorized_signatory"
                                type="text"
                                mandatory
                                contextName="stageIAsmtAppDocUpload"
                                size="lg"
                                onValueChange={(value, event) => {
                                  console.log("New username:", value);
                                  // setUsername(value); // optional: store in local state
                                  validationLayer(value)
                                }}
                                showVerifyButton={isValidEmailTyped}
                                onVerify={(val) => verifyEmailOtp(val)}
                              />
                            </Col>


                            <Col md={4}>
                              <TextField label="Number Number"
                                name="mobile_number_of_authorized_signatory"
                                type="text"
                                mandatory
                                contextName="stageIAsmtAppDocUpload"
                                size="lg"
                                onValueChange={(value, event) => {
                                  console.log("New username:", value);
                                  // setUsername(value); // optional: store in local state
                                  validationLayer2(value)
                                }}
                                showVerifyButton={isValidMobileTyped}
                                onVerify={(val) => verifyMobileOtp(val)}
                              />
                            </Col>
                          </Row>
                          <Row style={{ marginTop: "1rem" }}>
                            <BootstrapForm.Group as={Col} md={4}>
                              <Form.Label>
                                Select ID Proof Type<span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <BootstrapForm.Select
                                size="lg"
                                name="id_proof_of_authorized_signatory"
                                value={values.id_proof_of_authorized_signatory}
                                onChange={handleChange}
                                isInvalid={!!errors.id_proof_of_authorized_signatory}
                                isValid={
                                  touched.id_proof_of_authorized_signatory &&
                                  !errors.id_proof_of_authorized_signatory
                                }
                              >
                                {id_proof_master.map((item, i) => (
                                  <option key={i} value={item.id_proof_name}>
                                    {item.id_proof_name}
                                  </option>
                                ))}
                              </BootstrapForm.Select>
                              <ErrorMessage
                                name="id_proof_of_authorized_signatory"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </BootstrapForm.Group>

                            <BootstrapForm.Group as={Col} md="4">
                              <Form.Label>
                                Enter ID Proof Number<span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <BootstrapForm.Control
                                type="text"
                                size="lg"
                                name="id_proof_number_of_authorized_signatory" // 👈 same path
                                value={values.id_proof_number_of_authorized_signatory}
                                onChange={handleChange}
                                isInvalid={!!errors.id_proof_number_of_authorized_signatory}
                                isValid={
                                  touched.id_proof_number_of_authorized_signatory &&
                                  !errors.id_proof_number_of_authorized_signatory
                                }
                                placeholder="Mobile Number"
                              />
                              <ErrorMessage
                                name="id_proof_number_of_authorized_signatory"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </BootstrapForm.Group>

                            <Col md={4}>
                              <FileField
                                label="Document Upload"
                                name="id_proof_docs_of_authorized_signatory"
                                mandatory
                                accept=".pdf,.jpg,.png"
                                contextName="stageIAsmtAppDocUpload"
                              />
                            </Col>

                          </Row>
                        </Card.Body>
                      </Card>
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








