import { Fragment, useEffect, useRef, useState, createContext } from "react";
import { Row, Col, Card, Form, Button, InputGroup, Table } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Form as BootstrapForm, Modal } from "react-bootstrap";

import { languages, ADD_MORE_LAND_DOCUMENT, SET_STAGE_I__DOCUMENT_STATUS, STAGE_I_DOCUMENT_UPLAOD } from "affserver";
import { fileRequired, land_documents_yupObject } from "../../../../reducers/document_upload";
import { useContext } from "react";
import { AppStatusContext } from "../../../../services/context";
import { setAppFlow } from "../../../../db/users";
import { useLocation } from "react-router-dom";
import { markAsCompleteStageStep } from "../../../../db/forms/stageI/set/set";

import * as C from "affserver";
import * as ap from "../../../../services/applicant/index";
import * as gen from "../../../../services/general/index";

import { OtpEmail } from "../../../../components/formik/email/otp_val"
import { Navigations } from "../../../Assessment/components";
import { FileField } from "../../../formik/Inputs/FileField";
import { ContextMap } from "../../../formik/contexts";
import { SelectField, TextField } from "../../../formik/Inputs";
import { useTranslation } from 'react-i18next';
import { st1documentuploads } from "affserver";

import { create } from "zustand";
import { EmailWithVerifyButtonTwo } from "@/components/formik/Inputs/EmailWithVerifyButtonTwo";
import { FileField2 } from "@/components/formik/Inputs/FileField2";
import { viewFile } from "@/helpers";

// ---------------------
// Zustand store
// ---------------------
const useFormStore = create((set) => ({
  formValues: {},
  setFormValues: (values) => set({ formValues: values }),
}));

export const FormContext = createContext();

const DetailsOfDocumentsToBeUploaded = ({ step, setActive, refreshSteps, nav }) => {
  const { formValues, setFormValues } = useFormStore();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const formikRef = useRef();
  const land_info = useSelector((state) => state.land_info_reducer);
  // const land_documents_initial_values = useSelector((state) => state.land_documents_reducer);
  const reg = useSelector((state) => state.reg);
  const { appStatus } = useContext(AppStatusContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const authUser = useSelector((state) => state.loginUserReducer);

  const [proposedInst, setProposedInst] = useState({});
  const [landInfo, setLandInfo] = useState({});

  const [land_owned_lands_details, setLand_owned_lands_details] = useState({});
  const [land_inst_details, setLand_inst_details] = useState({});
  const [land_leased_lands_details, setlLand_leased_lands_details] = useState({});

  const [language, setLanguage] = useState([]);
  const [id_proof_master, setId_proof_master] = useState([]);
  const [designation_master, setDesignation_master] = useState([]);



  const [otpSent, setOtpSent] = useState(false);


  useEffect(() => {
    console.log(language);
  }, [language]);

  useEffect(() => {
    console.log(language);
  }, [proposedInst, landInfo, land_owned_lands_details, land_inst_details, land_leased_lands_details, language]);


  const loadData = async () => {
    let resp, result;
    try {
      let r1 = await ap.getProposedInstDetailsAutoFill(appId);
      setProposedInst(r1.data);

      let r2 = await ap.getInstLandDetails(appId);
      setLandInfo(r2.data);

      setLand_owned_lands_details(r2.data);
      setLand_inst_details(r2.data);
      setlLand_leased_lands_details(r2.data);


      let r3 = await gen.geLanguages(appId);
      setLanguage(r3.data);


      // Setting Up Id Proof Master
      let r4 = await gen.getMasters(C.MastersKey.ID_PROOF);
      setId_proof_master(r4.data);


      // Setting Up Designation Master
      let r5 = await gen.getMasters(C.MastersKey.DESIGNATION);
      setDesignation_master(r5.data);


      result = resp.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log(formikRef);
    formikRef.current.setFieldValue("possession_of_land", land_inst_details?.possession_of_land);

  }, [formikRef, land_inst_details])


  const onLast = async () => {
    formikRef.current.setTouched(
      Object.keys(formikRef.current.values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    if (formikRef.current.isValid != true) {
      throw new Error("Please Submit Form");
    }

    Swal.fire({ title: "Saving...", text: "Please wait while we save your data.", allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
    await ap.setUploadDocumentStageI(formikRef.current.values, step, appId);
    Swal.close();

    Swal.fire("Saved!", "Your form data has been saved.", "success");
    const result2 = await Swal.fire({ icon: "success", title: "Saved!", text: "Your form data has been saved successfully, Go View Time Line", confirmButtonText: "OK", });
    if (result2.isConfirmed) {
      // nav.next();
      navigate('/dashboard/AppList/');
    }
  };

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

  return (
    <Fragment>
      <Formik
        enableReinitialize={true}
        innerRef={formikRef}
        initialValues={st1documentuploads.intiValues}
        validationSchema={st1documentuploads.valSchema}
      // onSubmit={(values) => {
      //   console.log("Form Values", values);
      //   submit(values);
      // }}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors, touched, handleBlur, setFieldError, setFieldTouched }) => {
          console.log(errors)

          return (<>
            <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, setFieldError, setFieldTouched }}>
              <ContextMap.Stage1Form.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur, setFieldError, setFieldTouched }} >
                <Form noValidate onSubmit={handleSubmit}>
                  {values.possession_of_land == 'owned' && (
                    <FieldArray name="onwed_land_documents">
                      {({ push, remove }) => (
                        <Card className="custom-card border border-primary">
                          <Card.Header>
                            <div className="card-title" style={{ textTransform: "none" }}>
                              Onwed Land Documents <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
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
                                  <th>Action</th>
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
                                        contextName="Stage1Form"
                                        // onValueChange={(val) => OnApplicantEntityStateChange(val, 'cmp_post_district')}
                                        valueProp="language"
                                        labelProp="language"
                                        size="lg"
                                      />
                                      {/* <BootstrapForm.Group>
                                      <BootstrapForm.Select
                                        size="lg"
                                        name={`onwed_land_documents[${index}].land_documents_language`}
                                        value={values.onwed_land_documents[index].land_documents_language}
                                        onChange={handleChange}
                                        isInvalid={!!errors.onwed_land_documents?.[index]?.land_documents_language}
                                        isValid={
                                          touched.onwed_land_documents?.[index]?.land_documents_language &&
                                          !errors.onwed_land_documents?.[index]?.land_documents_language
                                        }
                                      >
                                        <option value="">Select Language</option>
                                        {language.map((lang, i) => (
                                          <option key={i} value={lang.language}>
                                            {lang.language}
                                          </option>
                                        ))}
                                      </BootstrapForm.Select>
                                      <ErrorMessage
                                        name={`onwed_land_documents[${index}].land_documents_language`}
                                        component="div"
                                        style={{ color: "red" }}
                                      />
                                    </BootstrapForm.Group> */}
                                    </td>

                                    <td>

                                      <FileField2
                                        // label="If Yes, Upload Supporting Government Notification/Order/Circular"
                                        name={`onwed_land_documents[${index}].land_documents`}
                                        mandatory
                                        accept=".pdf,.jpg,.png"
                                        context={FormContext}
                                        onClickViewFileButton={() => viewFile(values.onwed_land_documents[index].land_documents)}
                                      />

                                     {false && ( <BootstrapForm.Group>
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
                                      </BootstrapForm.Group>)}
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
                                    <td>
                                      {/* Remove Button */}
                                      {values.onwed_land_documents.length > 1 && (
                                        <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Card.Body>
                          <Card.Footer className="text-start">
                            <Button className="mb-3" onClick={() =>
                              push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                            }>
                              Add More
                            </Button>
                          </Card.Footer>
                        </Card>

                      )}
                    </FieldArray>
                  )}
                  {/* {land_inst_details.possession_of_land == 'leased' && ( */}
                  {values.possession_of_land == 'leased' && (
                    <FieldArray name="lease_deed_documents">
                      {({ push, remove }) => (
                        <Card className="custom-card border border-primary">
                          <Card.Header>
                            <div className="card-title" style={{ textTransform: "none" }}>
                              Upload Registered Lease Deed Documents <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
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
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {values.lease_deed_documents.map((doc, index) => (
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
                                      <BootstrapForm.Group>
                                        <BootstrapForm.Select
                                          size="lg"
                                          name={`lease_deed_documents[${index}].language`}
                                          value={values.lease_deed_documents[index].language}
                                          onChange={handleChange}
                                          isInvalid={!!errors.lease_deed_documents?.[index]?.language}
                                          isValid={
                                            touched.lease_deed_documents?.[index]?.language &&
                                            !errors.lease_deed_documents?.[index]?.language
                                          }
                                        >
                                          <option value="">Select Language</option>
                                          {language.map((lang, i) => (
                                            <option key={i} value={lang.language}>
                                              {lang.language}
                                            </option>
                                          ))}
                                        </BootstrapForm.Select>
                                        <ErrorMessage
                                          name={`lease_deed_documents[${index}].language`}
                                          component="div"
                                          style={{ color: "red" }}
                                        />
                                      </BootstrapForm.Group>

                                    </td>

                                    <td>
                                      <BootstrapForm.Group>
                                        {values.lease_deed_documents[index].documents ? (
                                          <div>
                                            {/* Show selected file name */}
                                            <strong>{values.lease_deed_documents[index].documents.name}</strong>
                                            <hr />
                                            {/* View Button */}
                                            <Button
                                              variant="info"
                                              size="sm"
                                              className="ms-2"
                                              onClick={() =>
                                                window.open(
                                                  URL.createObjectURL(values.lease_deed_documents[index].documents),
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
                                              onClick={() => setFieldValue(`lease_deed_documents[${index}].documents`, null)}
                                            >
                                              Remove
                                            </Button>
                                          </div>
                                        ) : (
                                          <>
                                            <BootstrapForm.Control
                                              type="file"
                                              onChange={(e) =>
                                                setFieldValue(`lease_deed_documents[${index}].documents`, e.target.files[0])
                                              }
                                              isInvalid={!!errors.onwed_land_documents?.[index]?.documents}

                                            />
                                            <ErrorMessage
                                              name={`lease_deed_documents[${index}].documents`}
                                              component="div"
                                              style={{ color: "red" }}
                                            />
                                          </>
                                        )}
                                      </BootstrapForm.Group>
                                    </td>

                                    <td>
                                      <BootstrapForm.Group>
                                        {values.lease_deed_documents[index].notarised_documents && values.lease_deed_documents[index].language != "Hindi" && values.lease_deed_documents[index].language != "English" ? (
                                          <div>
                                            {/* Show selected file name */}
                                            <strong>{values.lease_deed_documents[index].notarised_documents.name}</strong>
                                            <hr />
                                            {/* View Button */}
                                            <Button
                                              variant="info"
                                              size="sm"
                                              className="ms-2"
                                              onClick={() =>
                                                window.open(
                                                  URL.createObjectURL(values.lease_deed_documents[index].notarised_documents),
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
                                              onClick={() => setFieldValue(`lease_deed_documents[${index}].notarised_documents`, null)}
                                            >
                                              Remove
                                            </Button>
                                          </div>
                                        ) : (
                                          <>
                                            <BootstrapForm.Control
                                              disabled={
                                                values.lease_deed_documents[index].language === "Hindi" ||
                                                values.lease_deed_documents[index].language === "English"
                                              } // ✅ Disable if Hindi/English
                                              type="file"
                                              onChange={(e) =>
                                                setFieldValue(`lease_deed_documents[${index}].notarised_documents`, e.target.files[0])
                                              }
                                              isInvalid={!!errors.lease_deed_documents?.[index]?.notarised_documents}

                                            />
                                            <ErrorMessage
                                              name={`lease_deed_documents[${index}].notarised_documents`}
                                              component="div"
                                              style={{ color: "red" }}
                                            />
                                          </>
                                        )}
                                      </BootstrapForm.Group>

                                    </td>
                                    <td>
                                      {/* Remove Button */}
                                      {values.lease_deed_documents.length > 1 && (
                                        <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Card.Body>
                          <Card.Footer className="text-start">
                            <Button className="mb-3" onClick={() =>
                              push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                            }>
                              Add More
                            </Button>
                          </Card.Footer>
                        </Card>

                      )}
                    </FieldArray>
                  )}
                  {/* @dpkdhariwal */}
                  {true && (
                    <>
                      <FieldArray name="land_conversion_certificate">
                        {({ push, remove }) => (
                          <Card className="custom-card border border-primary">
                            <Card.Header>
                              <div className="card-title" style={{ textTransform: "none" }}>
                                Land Use, Land Conversion Certificate (If Applicable) <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
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
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {values.land_conversion_certificate.map((doc, index) => (
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
                                        <BootstrapForm.Group>
                                          <BootstrapForm.Select
                                            size="lg"
                                            name={`land_conversion_certificate[${index}].language`}
                                            value={values.land_conversion_certificate[index].language}
                                            onChange={handleChange}
                                            isInvalid={!!errors.land_conversion_certificate?.[index]?.language}
                                            isValid={
                                              touched.land_conversion_certificate?.[index]?.language &&
                                              !errors.land_conversion_certificate?.[index]?.language
                                            }
                                          >
                                            <option value="">Select Language</option>
                                            {language.map((lang, i) => (
                                              <option key={i} value={lang.language}>
                                                {lang.language}
                                              </option>
                                            ))}
                                          </BootstrapForm.Select>
                                          <ErrorMessage
                                            name={`land_conversion_certificate[${index}].language`}
                                            component="div"
                                            style={{ color: "red" }}
                                          />
                                        </BootstrapForm.Group>

                                      </td>

                                      <td>
                                        <BootstrapForm.Group>
                                          {values.land_conversion_certificate[index].documents ? (
                                            <div>
                                              {/* Show selected file name */}
                                              <strong>{values.land_conversion_certificate[index].documents.name}</strong>
                                              <hr />
                                              {/* View Button */}
                                              <Button
                                                variant="info"
                                                size="sm"
                                                className="ms-2"
                                                onClick={() =>
                                                  window.open(
                                                    URL.createObjectURL(values.land_conversion_certificate[index].documents),
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
                                                onClick={() => setFieldValue(`land_conversion_certificate[${index}].documents`, null)}
                                              >
                                                Remove
                                              </Button>
                                            </div>
                                          ) : (
                                            <>
                                              <BootstrapForm.Control
                                                type="file"
                                                onChange={(e) =>
                                                  setFieldValue(`land_conversion_certificate[${index}].documents`, e.target.files[0])
                                                }
                                                isInvalid={!!errors.onwed_land_documents?.[index]?.documents}

                                              />
                                              <ErrorMessage
                                                name={`land_conversion_certificate[${index}].documents`}
                                                component="div"
                                                style={{ color: "red" }}
                                              />
                                            </>
                                          )}
                                        </BootstrapForm.Group>
                                      </td>

                                      <td>
                                        <BootstrapForm.Group>
                                          {values.land_conversion_certificate[index].notarised_documents && values.land_conversion_certificate[index].language != "Hindi" && values.land_conversion_certificate[index].language != "English" ? (
                                            <div>
                                              {/* Show selected file name */}
                                              <strong>{values.land_conversion_certificate[index].notarised_documents.name}</strong>
                                              <hr />
                                              {/* View Button */}
                                              <Button
                                                variant="info"
                                                size="sm"
                                                className="ms-2"
                                                onClick={() =>
                                                  window.open(
                                                    URL.createObjectURL(values.land_conversion_certificate[index].notarised_documents),
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
                                                onClick={() => setFieldValue(`land_conversion_certificate[${index}].notarised_documents`, null)}
                                              >
                                                Remove
                                              </Button>
                                            </div>
                                          ) : (
                                            <>
                                              <BootstrapForm.Control
                                                disabled={
                                                  values.land_conversion_certificate[index].language === "Hindi" ||
                                                  values.land_conversion_certificate[index].language === "English"
                                                } // ✅ Disable if Hindi/English
                                                type="file"
                                                onChange={(e) =>
                                                  setFieldValue(`land_conversion_certificate[${index}].notarised_documents`, e.target.files[0])
                                                }
                                                isInvalid={!!errors.land_conversion_certificate?.[index]?.notarised_documents}

                                              />
                                              <ErrorMessage
                                                name={`land_conversion_certificate[${index}].notarised_documents`}
                                                component="div"
                                                style={{ color: "red" }}
                                              />
                                            </>
                                          )}
                                        </BootstrapForm.Group>

                                      </td>
                                      <td>
                                        {/* Remove Button */}
                                        {values.land_conversion_certificate.length > 1 && (
                                          <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Card.Body>
                            <Card.Footer className="text-start">
                              <Button className="mb-3" onClick={() =>
                                push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                              }>
                                Add More
                              </Button>
                            </Card.Footer>
                          </Card>

                        )}
                      </FieldArray>

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
                            <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB)</span>
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
                                    onChange={(event) => {
                                      // Allow only alphabets and spaces
                                      const sanitized = event.target.value.replace(/[^a-zA-Z\s]/g, "");
                                      // Update Formik value manually
                                      setFieldValue("name_of_authorized_signatory", sanitized);
                                    }}
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
                                  {/* <EmailWithVerifyButtonTwo
                                    label="Email Id"
                                    filedName="email_id_of_authorized_signatory"
                                    // verifyFieldName="isApplicantEntityEmailIdVerified"
                                    mandatory={true}
                                    size="lg"
                                    showVerifyButton={true}
                                    onVerify={(email) => console.log("Verifying email:", email)}
                                    FormContext={FormContext} // Make sure to pass Formik's context here
                                  /> */}
                                  <TextField label="Email Id"
                                    name="email_id_of_authorized_signatory"
                                    type="text"
                                    mandatory
                                    contextName="Stage1Form"
                                    size="lg"
                                    onValueChange={(value, event) => {
                                      console.log("New username:", value);
                                      // setUsername(value); // optional: store in local state
                                      validationLayer(value)
                                    }}
                                    showVerifyButton={isValidEmailTyped}
                                    onVerify={(val) => verifyEmailOtp(val)}
                                  />

                                  {/* <OtpEmail
                                  emailFieldName={'email_id_of_authorized_signatory'}
                                  is_verifiedFieldName={'is_verified_email_id_of_authorized_signatory'}
                                  frmk={{ handleSubmit, handleChange, setFieldValue, values, errors, touched }}
                                  formikRef={formikRef} /> */}

                                  {/* <BootstrapForm.Group className="mb-3">
                                <Form.Label>
                                  Email Id <span style={{ color: "red" }}>*</span>
                                </Form.Label>

                                <InputGroup>
                                  <BootstrapForm.Control
                                    type="text"
                                    size="lg"
                                    name="email_id_of_authorized_signatory"
                                    value={values.email_id_of_authorized_signatory}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email_id_of_authorized_signatory}
                                    isValid={
                                      touched.email_id_of_authorized_signatory &&
                                      !errors.email_id_of_authorized_signatory
                                    }
                                    placeholder="Email"
                                  />

                                  <Button
                                    variant="outline-primary"
                                    type="button"
                                    disabled={errors.email_id_of_authorized_signatory}
                                    onClick={() => {
                                      // 👉 Call backend API to send OTP
                                      console.log("Sending OTP to:", values.email_id_of_authorized_signatory);

                                      // You can set a Formik flag like:
                                      // setFieldValue("otpSent", true);
                                    }}
                                  >
                                    Verify with OTP
                                  </Button>
                                </InputGroup>

                                <ErrorMessage
                                  name="email_id_of_authorized_signatory"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                              </BootstrapForm.Group>
                              <BootstrapForm.Group className="mb-3">
                                <Form.Label>
                                  Enter OTP <span style={{ color: "red" }}>*</span>
                                </Form.Label>

                                <InputGroup>
                                  <BootstrapForm.Control
                                    type="text"
                                    size="sm"
                                    name="otp_email_id_of_authorized_signatory"
                                    value={values.otp_email_id_of_authorized_signatory}
                                    onChange={handleChange}
                                    isInvalid={!!errors.otp_email_id_of_authorized_signatory}
                                    isValid={
                                      touched.otp_email_id_of_authorized_signatory &&
                                      !errors.otp_email_id_of_authorized_signatory
                                    }
                                    placeholder="Enter Valid OTP"
                                  />
                                  <Button
                                    variant="outline-secondary"
                                    type="button"
                                    onClick={() => {
                                      // 👉 Call backend API to resend OTP
                                      console.log("Resending OTP to:", values.email_id_of_authorized_signatory);
                                      alert("OTP resent ✅");
                                    }}
                                  >
                                    Resend OTP
                                  </Button>
                                </InputGroup>

                                <ErrorMessage
                                  name="otp_email_id_of_authorized_signatory"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                              </BootstrapForm.Group> */}
                                </Col>


                                <Col md={4}>
                                  <TextField label="Mobile Number"
                                    name="mobile_number_of_authorized_signatory"
                                    type="text"
                                    mandatory
                                    contextName="Stage1Form"
                                    size="lg"
                                    // onValueChange={(value, event) => {
                                    //   console.log("New username:", value);
                                    //   // setUsername(value); // optional: store in local state
                                    //   validationLayer2(value)
                                    // }}

                                    onValueChange={(value, event) => {
                                      //Remove all non-digits and limit to 10 characters
                                      const sanitized = value.replace(/\D/g, "").slice(0, 10);
                                      // Update the input value (prevents typing beyond 10 digits)
                                      event.target.value = sanitized;
                                      setFieldValue("mobile_number_of_authorized_signatory", sanitized);
                                      console.log(sanitized);

                                      // Run validation only on sanitized value
                                      validationLayer2(sanitized);
                                    }}
                                    showVerifyButton={isValidMobileTyped}
                                    onVerify={(val) => verifyMobileOtp(val)}
                                  />
                                </Col>
                                {/* <BootstrapForm.Group as={Col} md="4">
                                <Form.Label>
                                  Mobile Number<span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <BootstrapForm.Control
                                  type="text"
                                  size="lg"
                                  name="mobile_number_of_authorized_signatory" // 👈 same path
                                  value={values.mobile_number_of_authorized_signatory}
                                  onChange={handleChange}
                                  isInvalid={!!errors.mobile_number_of_authorized_signatory}
                                  isValid={
                                    touched.mobile_number_of_authorized_signatory &&
                                    !errors.mobile_number_of_authorized_signatory
                                  }
                                  placeholder="Mobile Number"
                                />
                                <ErrorMessage
                                  name="mobile_number_of_authorized_signatory"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                              </BootstrapForm.Group> */}
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
                                    <option value="">Select Id Proof</option>
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
                                    placeholder="ID Proof Number"
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
                                    contextName="Stage1Form"
                                  />
                                </Col>

                                {false && (<BootstrapForm.Group as={Col} md={4}>
                                  <Form.Label>
                                    Document Upload<span style={{ color: "red" }}>*</span>
                                  </Form.Label>

                                  {!values.id_proof_docs_of_authorized_signatory ? (
                                    <>
                                      <BootstrapForm.Control
                                        type="file"
                                        onChange={(e) =>
                                          setFieldValue(
                                            "id_proof_docs_of_authorized_signatory",
                                            e.target.files[0]
                                          )
                                        }
                                        isInvalid={!!errors.id_proof_docs_of_authorized_signatory}
                                      />
                                      <ErrorMessage
                                        name="id_proof_docs_of_authorized_signatory"
                                        component="div"
                                        style={{ color: "red" }}
                                      />
                                    </>
                                  ) : (
                                    <div>
                                      {/* Show selected file name */}
                                      <strong>{values.id_proof_docs_of_authorized_signatory.name}</strong>
                                      <hr />

                                      <div className="d-flex gap-2">
                                        {/* View Button */}
                                        <Button
                                          variant="info"
                                          size="sm"
                                          onClick={() => {
                                            const fileURL = URL.createObjectURL(
                                              values.id_proof_docs_of_authorized_signatory
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
                                            setFieldValue("id_proof_docs_of_authorized_signatory", null)
                                          }
                                        >
                                          Remove
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </BootstrapForm.Group>)}



                                {/* <BootstrapForm.Group as={Col} md={4}>
                              <Form.Label>
                                Document Upload<span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <BootstrapForm.Control
                                type="file"
                                onChange={(e) =>
                                  setFieldValue(`id_proof_docs_of_authorized_signatory`, e.target.files[0])
                                }
                                isInvalid={!!errors.id_proof_docs_of_authorized_signatory}

                              />
                              <ErrorMessage
                                name={`id_proof_docs_of_authorized_signatory`}
                                component="div"
                                style={{ color: "red" }}
                              />
                            </BootstrapForm.Group> */}

                              </Row>
                            </Card.Body>
                          </Card>
                        </Card.Body>
                      </Card>

                      <Card className="custom-card border border-primary">
                        <Card.Body>
                          <BootstrapForm.Group>
                            <Form.Label>
                              Select Registration Certificate of Applicant Organization
                              <span style={{ color: "red" }}>*</span> <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
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


                      {true && (
                        <FieldArray name="id_proof_scp">
                          {({ push, remove }) => (
                            <Card className="custom-card border border-primary">
                              <Card.Header>
                                <div className="card-title" style={{ textTransform: "none" }}>
                                  ID Proof of Secretary/Chairperson/President
                                </div> <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
                              </Card.Header>
                              <Card.Body>
                                <Table bordered hover>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Person Designation <span style={{ color: "red" }}>*</span></th>
                                      <th>Select ID Proof Type <span style={{ color: "red" }}>*</span></th>
                                      <th>Enter ID Proof Number <span style={{ color: "red" }}>*</span></th>
                                      <th>Select Document<span style={{ color: "red" }}>*</span></th>
                                      {/* <th>Action</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {values.id_proof_scp.map((doc, index) => {
                                      // get already selected designations
                                      const selectedDesignations = values.id_proof_scp.map(p => p.designation);

                                      const availableOptions = designation_master.filter(
                                        opt => !selectedDesignations.includes(opt.designation) || opt.designation === doc.designation
                                      );
                                      console.log(availableOptions);


                                      return (<tr
                                        key={doc.id}
                                        style={{
                                          marginBottom: "1rem",
                                          border: "1px solid #ccc",
                                          padding: "10px",
                                        }}
                                      >
                                        <td>{index + 1}</td>
                                        <td>
                                          <BootstrapForm.Group>
                                            <BootstrapForm.Select
                                              size="lg"
                                              name={`id_proof_scp[${index}].designation`}
                                              value={values.id_proof_scp[index].designation}
                                              onChange={handleChange}
                                              isInvalid={!!errors.id_proof_scp?.[index]?.designation}
                                              isValid={
                                                touched.id_proof_scp?.[index]?.designation &&
                                                !errors.id_proof_scp?.[index]?.designation
                                              }
                                            >
                                              <option value="">Select Language</option>
                                              {availableOptions.map((item, i) => (
                                                <option key={i} value={item.designation}>
                                                  {item?.designation}
                                                </option>
                                              ))}
                                            </BootstrapForm.Select>
                                            <ErrorMessage
                                              name={`id_proof_scp[${index}].designation`}
                                              component="div"
                                              style={{ color: "red" }}
                                            />
                                          </BootstrapForm.Group>
                                        </td>

                                        <td>
                                          <BootstrapForm.Group>
                                            <BootstrapForm.Select
                                              size="lg"
                                              name={`id_proof_scp[${index}].id_proof_type`}
                                              value={values.id_proof_scp[index].id_proof_type}
                                              onChange={handleChange}
                                              isInvalid={!!errors.id_proof_scp?.[index]?.id_proof_type}
                                              isValid={
                                                touched.id_proof_scp?.[index]?.id_proof_type &&
                                                !errors.id_proof_scp?.[index]?.id_proof_type
                                              }
                                            >
                                              <option value="">Id Proof Type</option>
                                              {id_proof_master.map((lang, i) => (
                                                <option key={i} value={lang.id_proof_name}>
                                                  {lang.id_proof_name}
                                                </option>
                                              ))}
                                            </BootstrapForm.Select>
                                            <ErrorMessage
                                              name={`id_proof_scp[${index}].id_proof_type`}
                                              component="div"
                                              style={{ color: "red" }}
                                            />
                                          </BootstrapForm.Group>
                                        </td>

                                        <td>
                                          <BootstrapForm.Group>
                                            {/* <Form.Label>
                                          Name<span style={{ color: "red" }}>*</span>
                                        </Form.Label> */}
                                            <BootstrapForm.Control
                                              type="text"
                                              size="lg"
                                              name={`id_proof_scp[${index}].id_proof_number`}
                                              value={values.id_proof_scp[index].id_proof_number}
                                              onChange={handleChange}
                                              isInvalid={!!errors.id_proof_scp?.[index]?.id_proof_number}
                                              isValid={
                                                touched.id_proof_scp?.[index]?.id_proof_number &&
                                                !errors.id_proof_scp?.[index]?.id_proof_number
                                              }
                                              placeholder="Name"
                                            />
                                            <ErrorMessage
                                              name={`id_proof_scp[${index}].id_proof_number`}
                                              component="div"
                                              style={{ color: "red" }}
                                            />
                                          </BootstrapForm.Group>
                                        </td>
                                        <td>
                                          <BootstrapForm.Group>
                                            {values.id_proof_scp[index].id_proof_doc ? (
                                              <div>
                                                {/* Show selected file name */}
                                                <strong>{values.id_proof_scp[index].id_proof_doc.name}</strong>
                                                <hr />
                                                {/* View Button */}
                                                <Button
                                                  variant="info"
                                                  size="sm"
                                                  className="ms-2"
                                                  onClick={() =>
                                                    window.open(
                                                      URL.createObjectURL(values.id_proof_scp[index].id_proof_doc),
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
                                                  onClick={() => setFieldValue(`id_proof_scp[${index}].id_proof_doc`, null)}
                                                >
                                                  Remove
                                                </Button>
                                              </div>
                                            ) : (
                                              <>
                                                <BootstrapForm.Control
                                                  type="file"
                                                  onChange={(e) =>
                                                    setFieldValue(`id_proof_scp[${index}].id_proof_doc`, e.target.files[0])
                                                  }
                                                  isInvalid={!!errors.id_proof_scp?.[index]?.id_proof_doc}

                                                />
                                                <ErrorMessage
                                                  name={`id_proof_scp[${index}].id_proof_doc`}
                                                  component="div"
                                                  style={{ color: "red" }}
                                                />
                                              </>
                                            )}
                                          </BootstrapForm.Group>
                                        </td>
                                        {false && (<td>
                                          {/* Remove Button */}
                                          {values.id_proof_scp.length > 1 && (
                                            <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                          )}
                                        </td>)}
                                      </tr>)
                                    })}
                                  </tbody>
                                </Table>
                              </Card.Body>
                              {/* <Card.Footer className="text-start">
                            {values.id_proof_scp.length < 3 && (
                              <Button className="mb-3" onClick={() =>
                                push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                              }>
                                Add More
                              </Button>
                            )}

                          </Card.Footer> */}
                            </Card>

                          )}
                        </FieldArray>)}

                      {false && (<Card className="custom-card border border-primary">
                        <Card.Header>
                          <div className="card-title" style={{ textTransform: "none" }}>
                            ID Proof of Secretary/Chairperson/President
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Card className="mb-3">
                            <Card.Body>
                              <Row style={{ marginTop: "1rem" }}>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Person Designation
                                      <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Field
                                      required
                                      name="designation_of_scp"
                                      as="select"
                                      className="form-control"
                                    >
                                      {designation_master.map((item, i) => (
                                        <option key={i} value={item.designation}>
                                          {item?.designation}
                                        </option>
                                      ))}
                                    </Field>
                                    <Form.Control.Feedback type="invalid">
                                      Error
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>

                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Select ID Proof Type
                                      <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Field
                                      required
                                      name="id_proof_type_of_scp"
                                      as="select"
                                      className="form-control"
                                    >
                                      {id_proof_master.map((item, i) => (
                                        <option key={i} value={item.id_proof_name}>
                                          {item.id_proof_name}
                                        </option>
                                      ))}
                                    </Field>
                                    <Form.Control.Feedback type="invalid">
                                      Error
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Enter ID Proof Number
                                      <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Field
                                      name="id_proof_number_of_scp"
                                      as={Form.Control}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Error
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col md={3}>
                                  <Form.Group>
                                    <Form.Label>
                                      Select Document
                                      <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                      type="file"
                                      name="doc_of_scp"
                                      onChange={(event) => {
                                        setFieldValue(
                                          `doc_of_scp`,
                                          event.currentTarget.files[0]
                                        );
                                      }}
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
                      </Card>)}

                      <Card className="custom-card border border-primary">
                        <Card.Body>
                          <Row style={{ marginTop: "1rem" }}>
                            <BootstrapForm.Group as={Col} md={6}>
                              <Form.Label>
                                Select Resolution for Starting ITI
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>

                              {!values.doc_iti_resolution ? (
                                <>
                                  <BootstrapForm.Control
                                    type="file"
                                    onChange={(e) =>
                                      setFieldValue(
                                        "doc_iti_resolution",
                                        e.target.files[0]
                                      )
                                    }
                                    isInvalid={!!errors.doc_iti_resolution}
                                  />
                                  <ErrorMessage
                                    name="doc_iti_resolution"
                                    component="div"
                                    style={{ color: "red" }}
                                  />
                                </>
                              ) : (
                                <div>
                                  {/* Show selected file name */}
                                  <strong>{values.doc_iti_resolution.name}</strong>
                                  <hr />

                                  <div className="d-flex gap-2">
                                    {/* View Button */}
                                    <Button
                                      variant="info"
                                      size="sm"
                                      onClick={() => {
                                        const fileURL = URL.createObjectURL(
                                          values.doc_iti_resolution
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
                                        setFieldValue("doc_iti_resolution", null)
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </BootstrapForm.Group>

                            {/* <BootstrapForm.Group as={Col} md={6}>
                          <Form.Label>
                            Select Resolution for Starting ITI
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <BootstrapForm.Control
                            type="file"
                            onChange={(e) =>
                              setFieldValue(`doc_iti_resolution`, e.target.files[0])
                            }
                            isInvalid={!!errors.doc_iti_resolution}

                          />
                          <ErrorMessage
                            name={`doc_iti_resolution`}
                            component="div"
                            style={{ color: "red" }}
                          />
                        </BootstrapForm.Group> */}

                            <Col md={6}>
                              <Form.Group>
                                <Form.Label>
                                  View Format for `Resolution for starting ITI` Annexure-3
                                </Form.Label>
                                <Link to="/new_registration/annexure-3" target="_blank">
                                  Download Annexure-3 Format
                                </Link>
                              </Form.Group>
                            </Col>
                          </Row>
                          <hr />
                          <Row style={{ marginTop: "1rem" }}>
                            <BootstrapForm.Group as={Col} md={6}>
                              <Form.Label>
                                Select Resolution from Applicant for Authorized signatory
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>

                              {!values.doc_of_authorized_signatory ? (
                                <>
                                  <BootstrapForm.Control
                                    type="file"
                                    onChange={(e) =>
                                      setFieldValue(
                                        "doc_of_authorized_signatory",
                                        e.target.files[0]
                                      )
                                    }
                                    isInvalid={!!errors.doc_of_authorized_signatory}
                                  />
                                  <ErrorMessage
                                    name="doc_of_authorized_signatory"
                                    component="div"
                                    style={{ color: "red" }}
                                  />
                                </>
                              ) : (
                                <div>
                                  {/* Show selected file name */}
                                  <strong>{values.doc_of_authorized_signatory.name}</strong>
                                  <hr />

                                  <div className="d-flex gap-2">
                                    {/* View Button */}
                                    <Button
                                      variant="info"
                                      size="sm"
                                      onClick={() => {
                                        const fileURL = URL.createObjectURL(
                                          values.doc_of_authorized_signatory
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
                                        setFieldValue("doc_of_authorized_signatory", null)
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </BootstrapForm.Group>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label>
                                  View Format for `Resolution from Applicant for
                                  Authorized Signatory` Annexure-4
                                </Form.Label>
                                <Link to="/new_registration/annexure-3" target="_blank">
                                  Download Annexure-4 Format
                                </Link>
                              </Form.Group>
                            </Col>
                          </Row>
                          <hr />
                          <Row style={{ marginTop: "1rem" }}>
                            <BootstrapForm.Group as={Col} md={6}>
                              <Form.Label>
                                Select Resolution Regarding Earmarking of Land, Building,
                                and other Resources Exclusively Dedicated to the ITI (if
                                any), as per the Format Provided in Annexure-5.
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>

                              {!values.doc_of_land_earmarking ? (
                                <>
                                  <BootstrapForm.Control
                                    type="file"
                                    onChange={(e) =>
                                      setFieldValue(
                                        "doc_of_land_earmarking",
                                        e.target.files[0]
                                      )
                                    }
                                    isInvalid={!!errors.doc_of_land_earmarking}
                                  />
                                  <ErrorMessage
                                    name="doc_of_land_earmarking"
                                    component="div"
                                    style={{ color: "red" }}
                                  />
                                </>
                              ) : (
                                <div>
                                  {/* Show selected file name */}
                                  <strong>{values.doc_of_land_earmarking.name}</strong>
                                  <hr />

                                  <div className="d-flex gap-2">
                                    {/* View Button */}
                                    <Button
                                      variant="info"
                                      size="sm"
                                      onClick={() => {
                                        const fileURL = URL.createObjectURL(
                                          values.doc_of_land_earmarking
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
                                        setFieldValue("doc_of_land_earmarking", null)
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </BootstrapForm.Group>
                            {/* <BootstrapForm.Group as={Col} md={6}>
                          <Form.Label>
                            Select Resolution Regarding Earmarking of Land, Building,
                            and other Resources Exclusively Dedicated to the ITI (if
                            any), as per the Format Provided in Annexure-5.
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <BootstrapForm.Control
                            type="file"
                            onChange={(e) =>
                              setFieldValue(`doc_of_land_earmarking`, e.target.files[0])
                            }
                            isInvalid={!!errors.doc_of_land_earmarking}

                          />
                          <ErrorMessage
                            name={`doc_of_land_earmarking`}
                            component="div"
                            style={{ color: "red" }}
                          />
                        </BootstrapForm.Group> */}
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label>View Format for Annexure-5</Form.Label>
                                <Link to="/new_registration/annexure-3" target="_blank">
                                  Download Annexure-5 Format
                                </Link>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: "5px" }}>
                            <Col md={12} lg={12} sm={12}>
                              <span style={{ color: 'red' }} >(Upload PDF Files (Maximum size: 5 MB each))</span>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </>)}
                  <Card className="custom-card border border-primary">
                    <Card.Body>

                      <BootstrapForm.Group controlId="acceptTerms">
                        <BootstrapForm.Check type="checkbox">
                          <BootstrapForm.Check.Input
                            type="checkbox"
                            name="acceptTerms"
                            checked={values.acceptTerms}
                            onChange={handleChange}
                          />
                          <BootstrapForm.Check.Label>
                            Self Declaration<span style={{ color: "red" }}>*</span>
                          </BootstrapForm.Check.Label>
                        </BootstrapForm.Check>

                        {errors.acceptTerms && touched.acceptTerms && (
                          <div style={{ color: "red" }}>{errors.acceptTerms}</div>
                        )}
                      </BootstrapForm.Group>

                      {/* <div className="form-check">
                    <input
                      name="iaccept"
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
                  </div> */}
                      <Row style={{ marginTop: "1rem" }}>
                        <Col md={12}>
                          {`Institute's self-declaration of compliance with Affiliation Norms and acknowledgment of responsibilities, as per Annexure-6`}
                        </Col>
                      </Row>
                    </Card.Body>
                    {false && (<Card.Footer className="d-flex justify-content-end">
                      <Button
                        type="submit"
                        size="lg"
                        variant="success"
                        className="btn-wave"
                      >
                        Submit Application
                      </Button>
                      {/* <ConfirmBox submitNow={submitNow} /> */}
                    </Card.Footer>)}
                  </Card>
                </Form >
              </ContextMap.Stage1Form.Provider>
            </FormContext.Provider>
          </>)
        }}
      </Formik>
      <Navigations nav={nav} onLast={() => { onLast(); }} lastLabel="Submit Application" lastSize="lg" showLast={true} />
    </Fragment >
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