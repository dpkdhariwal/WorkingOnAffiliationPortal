import { Fragment, useRef, useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, ListGroup, Alert, InputGroup, } from "react-bootstrap";
import { Form as BootstrapForm } from "react-bootstrap";
import { Table, Modal } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import * as formik from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
// import { entityCategories } from "affserver";
// import Exclamation from "../comp/PrimeReact/PrimeReact";
import { yupObject } from "@/reducers/newAppReducer";

import { st1form } from "affserver";
import PropTypes from "prop-types";
// import Select from "react-select";
// import { IndianStates, getDistrictsByState } from "affserver";
// import { ChatMessage } from "../../../Assessment/ReviewTrail";
import { UPDATE_ENTITY_DETAILS, AffiliationCategory, STAGE_I__FEE_PAID, STAGE_I__FEE_EXEMPTED, } from "affserver";

import { getStates, getDistricts, getSubdistricts, getVillages, getPincodes, } from "@/services/LGD/index";

import { Assessment_Basic_Detail as ABD } from "@/components/new_registration/form/stegeI/BasicDetailsofApplicantOrganization";

// import { ApplicantEntityEmailId } from "./formComponent/ApplicantEntityEmailId";
// import { FormikHelpersContext } from "./FormikContext";
import { ContextMap } from "@/components/formik/contexts/index";

// import { setEntityDetails } from "../../../../db/appList";
// import { getDbEntityDetails } from "../../../../db/users";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppStatusContext } from "@/services/context";
// import { ApplicantEntityMobile } from "./formComponent/ApplicantEntityMobileNumber";
// import { ApplicantAddressPincode } from "./formComponent/ApplicantEntityAddressPincode";
import { Navigations } from "@/components/Assessment/components";
// import {
//   markAsCompleteStageAssessmentFlow,
//   setStageIAssessmentFlow,
// } from "../../../../db/forms/stageI/set/set";
// import * as set from "../../../../db/forms/stageI/set/set";

import * as C from "affserver";
import * as ap from "@/services/applicant/index";
import * as gen from "@/services/general/index";
import * as st from "@/services/state/index";
// import { OtpEmail, OtpMobile } from "../../../formik/email/otp_val";

import { TextField, RadioField, SelectField } from "@/components/formik/Inputs/index";
import { useTranslation } from 'react-i18next';

// const BasicDetailsofApplicantOrganization = ({ setActive, refreshSteps, nav }) => {
//   const { t } = useTranslation();

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const appId = queryParams.get("appId");
//   const aff_category = queryParams.get("aff_category");
//   const aff_sub_category = queryParams.get("aff_sub_category");
//   // const { appStatus } = useContext(AppStatusContext);

//   // useEffect(() => { console.log(appStatus); }, []);

//   const dispatch = useDispatch();
//   const reg = useSelector((state) => state.reg);
//   const stepInfo = reg.steps[0];

//   const [states, setStates] = useState([]);
//   const [statesCode, setStatesCode] = useState(null);
//   const [district, setDistrict] = useState([]);
//   const [districtCodeValue, setDistrictCodeValue] = useState(null);
//   const [subDistrict, setSubDistrict] = useState([]);
//   const [villages, setVillages] = useState([]);
//   const [pincodeValue, setPincodeValue] = useState(null);

//   const EntityDetails = useSelector((state) => state.EntityDetails);
//   const AppliInfo = useSelector((state) => state.AppliInfo);
//   const authUser = useSelector((state) => state.loginUserReducer);
//   const [basicDetail, setBasicDetail] = useState([]);

//   // const [districtsList, setDistrictsList] = useState({});
//   // const [subDistrictsList, setSubDistrictsList] = useState({});
//   // const [villageList, setVillageList] = useState({});
//   // const [pincodeList, setPincodeList] = useState({});



//   const loadData = async () => {
//     let data, resp;
//     try {
//       // data = await getDbEntityDetails(appId);
//       resp = await ap.ap_getDbEntityDetails(appId);
//       data = resp.data;
//       formikRef.current.setValues(data); // update entire form
//     } catch (error) {
//       formikRef.current.setValues(st1form.initialValues); // update entire form
//     }
//   };

//   useEffect(() => {
//     //Get Set Entity Info From database
//     // dispatch({ type: UPDATE_ENTITY_DETAILS, payload: values });
//     loadData();
//   }, []);

//   // Fetch States
//   useEffect(() => {
//     const fetchStatesData = async () => {
//       try {
//         const res = await getStates();
//         // console.log("API Response:", res);
//         // console.log("States data:", res?.data || res);
//         setStates(res?.data || res || []);
//       } catch (err) {
//         console.error("Error fetching states:", err);
//         setStates([]);
//       }
//     };
//     fetchStatesData();
//   }, []);


//   const { Formik } = formik;
//   const formRef2 = useRef();




//   //Custom Validation
//   const stageI1_info = useSelector((state) => state.theme.new_registration);
//   // useEffect(() => { console.log("stageI1_info", stageI1_info); }, []);

//   const submit = async (values) => {
//     let result;

//     const confirmResult = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to save the form data?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, save it!",
//       cancelButtonText: "Cancel",
//     });

//     if (!confirmResult.isConfirmed) {
//       console.log("User cancelled save");
//       return;
//     }

//     try {
//       let result, resp;
//       await ap.setEntityDetails(values, authUser, appId);

//       Swal.fire("Saved!", "Your form data has been saved.", "success");
//       result === true ? refreshSteps() : "";
//       // const result = await setEntityDetails(values, authUser, appId);
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Something went wrong while saving.", "error");
//     }
//   };

//   const formikRef = useRef();

//   // const onStateSelected = (e) => {
//   //   let List = getDistrictsByState(e.target.value);
//   //   setDistrict(List);
//   // };

//   const onStateSelected = async (e) => {
//     try {
//       const stateCode = parseInt(e.target.value);
//       setStatesCode(stateCode);
//       const districtsData = await getDistricts(stateCode);
//       setDistrict(districtsData || []);
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//     }
//   };

//   const onDistrictSelected = async (e) => {
//     try {
//       const districtCode = parseInt(e.target.value);
//       setDistrictCodeValue(districtCode);
//       const stateCode = statesCode;
//       // console.log("check data :", stateCode, districtCode);

//       const subdistrictsData = await getSubdistricts(stateCode, districtCode);

//       // console.log("Subdistricts data:", subdistrictsData);
//       // return;

//       setSubDistrict(subdistrictsData || []);
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//       // Fallback to local function - need to get state name from index
//     }
//   };

//   const onSubDistrictSelected = async (e) => {
//     try {
//       const subDistrictCode = parseInt(e.target.value);

//       const stateCode = statesCode;
//       const districtCode = districtCodeValue;
//       // console.log("check data :", stateCode, districtCode,subDistrictCode,);

//       const villagesData = await getVillages(
//         stateCode,
//         districtCode,
//         subDistrictCode
//       );
//       setVillages(villagesData || []);

//       // console.log("Pincodes data:", villagesData);
//       // return;
//     } catch (error) {
//       console.error("Error fetching Villages:", error);
//       // Fallback to local function - need to get state name from index
//     }
//   };

//   const onVillageSelected = async (e) => {
//     try {
//       const villageCode = parseInt(e.target.value);
//       console.log("check data :", villageCode);
//       const pincodesData = await getPincodes(villageCode);

//       setPincodeValue(pincodesData?.pincode || null);
//       console.log("Pincodes data:", pincodesData);
//       // return;
//     } catch (error) {
//       console.error("Error fetching Villages:", error);
//       // Fallback to local function - need to get state name from index
//     }
//   };

//   // Sync pincodeValue with Formik when it changes
//   useEffect(() => {
//     if (formikRef.current && pincodeValue !== null) {
//       formikRef.current.setFieldValue('ApplicantEntityPincode', pincodeValue || '');
//     }
//   }, [pincodeValue]);


//   useEffect(() => {
//     console.log(formikRef.current.errors);
//   }, [formikRef])



//   // Debounce helper
//   function debounce(fn, delay) {
//     let timer;
//     return (...args) =>
//       new Promise((resolve) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => resolve(fn(...args)), delay);
//       });
//   }

//   // Fake API call
//   const checkEmailExists = async (email) => {
//     console.log("API hit for:", email);
//     await new Promise((r) => setTimeout(r, 500)); // simulate delay
//     return email === "test@example.com"; // this one is taken
//   };

//   // Debounced version
//   const debouncedCheckEmail = debounce(checkEmailExists, 600);

//   const serverValidation = async (values) => {
//     // const errors = {};
//     // if (values.ApplicantEntityEmailId) {
//     //   const exists = await debouncedCheckEmail(values.ApplicantEntityEmailId);
//     //   if (exists) {
//     //     errors.ApplicantEntityEmailId = "Email already exists";
//     //   }
//     // }
//     // return errors;
//   }
//   const onNext = async () => {
//     try {
//       console.log(formikRef.current.validateForm());
//       console.log(formikRef.current.errors);
//       formikRef.current.setTouched(
//         Object.keys(formikRef.current.values).reduce(
//           (acc, key) => ({ ...acc, [key]: true }),
//           {}
//         )
//       );

//       if (formikRef.current.isValid != true) {
//         throw new Error("Please Submit Form");
//       }
//       console.log(formikRef.current.isValid, formikRef.current.errors);
//       const confirmResult = await Swal.fire({
//         title: "Are you sure?",
//         text: "Do you want to Proceed",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonText: "Okay, Proceed",
//         cancelButtonText: "Cancel",
//       });
//       if (confirmResult.isConfirmed) {
//         try {

//           let result, resp;
//           resp = await ap.setEntityDetails(formikRef.current.values, appId);
//           console.log(resp);

//           Swal.fire("Saved!", "Your form data has been saved.", "success");
//           // result === true ? refreshSteps() : "";
//           // const result = await setEntityDetails(values, authUser, appId);

//           result = await Swal.fire("Saved!", "Your form data has been saved.", "success");
//           if (result.isConfirmed) {
//             nav.next();
//           }
//         } catch (err) {
//           console.error("Error while saving:", err);
//         }
//         return;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   // const [districtsByRow, setDistrictsByRow] = useState({});
//   // const handleStateChange = async (e, index, setFieldValue) => {
//   //   const selectedState = e.target.value;

//   //   // update Formik state
//   //   setFieldValue(`runningITIs[${index}].run_State`, selectedState);

//   //   if (selectedState) {
//   //     try {
//   //       // Fetch districts from your backend API
//   //       const res = await fetch(`/api/lgd/districts?state=${selectedState}`);
//   //       const data = await res.json();

//   //       // Store districts only for this row
//   //       setDistrictsByRow((prev) => ({
//   //         ...prev,
//   //         [index]: data.districts,
//   //       }));

//   //       // reset district field when state changes
//   //       setFieldValue(`runningITIs[${index}].run_District`, "");
//   //     } catch (err) {
//   //       console.error("Error fetching districts:", err);
//   //     }
//   //   } else {
//   //     // if state cleared, also clear district
//   //     setDistrictsByRow((prev) => ({
//   //       ...prev,
//   //       [index]: [],
//   //     }));
//   //     setFieldValue(`runningITIs[${index}].run_District`, "");
//   //   }
//   // };

//   const [isValidEmailTyped, setIsValidEmailTyped] = useState(false);
//   const emailSchema = yup.string().email("Invalid email address").required("Email is required");



//   const validationLayer = async (email) => {
//     try {
//       await emailSchema.validate(email);
//       setIsValidEmailTyped(true); // valid
//     } catch (err) {
//       setIsValidEmailTyped(false); // invalid
//     }
//   }
//   const verifyEmailOtp = async (email) => {
//     const { value: otp } = await Swal.fire({
//       title: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
//       input: "text",          // input type
//       // inputLabel: "OTP Code",
//       inputPlaceholder: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
//       showCancelButton: true, // user can cancel
//       confirmButtonText: "Verify",
//       cancelButtonText: "Cancel",
//       allowOutsideClick: false, // cannot close by clicking outside
//       allowEscapeKey: false,    // cannot close by pressing Escape
//       inputValidator: (value) => {
//         if (!value) {
//           return "You need to enter OTP!";
//         }
//         if (!/^\d{4,6}$/.test(value)) {
//           return "OTP must be 4-6 digits";
//         }
//       },
//     });

//     if (otp) {
//       console.log("User entered OTP:", otp);
//       // Here you can call your API to verify OTP
//       formikRef.current.setFieldValue('isApplicantEntityEmailIdVerified', true);

//     } else {
//       console.log("User cancelled OTP input");
//       // setOtpSent(false);
//     }
//   }

//   const mobileSchema = yup.string().required("Please enter contact number").matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number");
//   const [isValidMobileTyped, setIsValidMobileTyped] = useState(false);
//   const validationLayer2 = async (mobile) => {
//     try {
//       await mobileSchema.validate(mobile);
//       setIsValidMobileTyped(true); // valid
//     } catch (err) {
//       setIsValidMobileTyped(false); // invalid
//     }
//   }

//   const verifyMobileOtp = async (mobile) => {
//     const { value: otp } = await Swal.fire({
//       title: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
//       input: "text",          // input type
//       // inputLabel: "OTP Code",
//       inputPlaceholder: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
//       showCancelButton: true, // user can cancel
//       confirmButtonText: "Verify",
//       cancelButtonText: "Cancel",
//       allowOutsideClick: false, // cannot close by clicking outside
//       allowEscapeKey: false,    // cannot close by pressing Escape
//       inputValidator: (value) => {
//         if (!value) {
//           return "You need to enter OTP!";
//         }
//         if (!/^\d{4,6}$/.test(value)) {
//           return "OTP must be 4-6 digits";
//         }
//       },
//     });

//     if (otp) {
//       console.log("User entered OTP:", otp);
//       // Here you can call your API to verify OTP
//       formikRef.current.setFieldValue('isApplicantEntityMobileNumberVerified', true);

//     } else {
//       console.log("User cancelled OTP input");
//       // setOtpSent(false);
//     }
//   }

//   const [districtsList, setDistrictsList] = useState({});
//   const [subDistrictsList, setSubDistrictsList] = useState({});
//   const [villageList, setVillageList] = useState({});
//   const [pincodeList, setPincodeList] = useState({});

//   const OnApplicantEntityStateChange = async (val, index) => {
//     console.log("Selected State:", val);
//     //  onStateSelected(e);
//     // Clear dependent fields when state changes
//     try {
//       const districtsData = await getDistricts(val);
//       setDistrict(districtsData || []);
//       // Update row-specific districts
//       setDistrictsList(prev => ({
//         ...prev,
//         [index]: districtsData
//       }));
//       formikRef.current.setFieldValue('ApplicantEntityDistrict', '');
//       formikRef.current.setFieldValue('ApplicantEntitySubDistrict', '');
//       formikRef.current.setFieldValue('ApplicantEntityVillage', '');
//       formikRef.current.setFieldValue('ApplicantEntityPincode', '');
//       formikRef.current.setPincodeValue(null);
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//     }
//   }
//   const OnApplicantEntityDistrictChange = async (val, index) => {
//     console.log("Selected State:", val);
//     //  onStateSelected(e);
//     // Clear dependent fields when state changes
//     try {
//       const subdistrictsData = await getSubdistricts(formikRef.current.values.ApplicantEntityState, val);
//       setSubDistrictsList(prev => ({ ...prev, ['ApplicantEntitySubDistrict']: subdistrictsData }));
//       console.log("Selected State:", val);
//       formikRef.current.setFieldValue('ApplicantEntityVillage', '');
//       formikRef.current.setFieldValue('ApplicantEntityPincode', '');
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//       formikRef.current.setFieldValue('ApplicantEntitySubDistrict', '');
//       formikRef.current.setFieldValue('ApplicantEntityVillage', '');
//       formikRef.current.setFieldValue('ApplicantEntityPincode', '');
//       formikRef.current.setPincodeValue(null);
//     }

//   }
//   const ApplicantEntitySubDistrict = async (val, index) => {
//     console.log("Selected State:", val);
//     //  onStateSelected(e);
//     // Clear dependent fields when state changes
//     try {

//       let stateCode = formikRef.current.values.ApplicantEntityState;
//       let districtCode = formikRef.current.values.ApplicantEntityDistrict;
//       let subDistrictCode = formikRef.current.values.ApplicantEntitySubDistrict;

//       const villagesData = await getVillages(stateCode, districtCode, subDistrictCode);
//       setVillageList(prev => ({ ...prev, [index]: villagesData }));
//       formikRef.current.setFieldValue('ApplicantEntityPincode', '');
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//       formikRef.current.setFieldValue('ApplicantEntityVillage', '');
//       formikRef.current.setFieldValue('ApplicantEntityPincode', '');
//       // formikRef.current.setPincodeValue(null);
//     }
//   }
//   const onApplicantEntityVillageChange = async (val, index) => {
//     console.log("Selected State:", val);
//     //  onStateSelected(e);
//     // Clear dependent fields when state changes
//     try {
//       const pincodesData = await getPincodes(val);
//       formikRef.current.setFieldValue("ApplicantEntityPincode", pincodesData?.pincode || null);
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//       // formikRef.current.setPincodeValue(null);
//     }
//   }




//   // Running ITI APIs
//   const [runItiDistrictsList, setRunItiDistrictsList] = useState({});
//   const [runItiSubDistrictsList, setRunItiSubDistrictsList] = useState({});
//   const [runItiVillageList, setRunItiVillageList] = useState({});
//   const [runItiPincodeList, setRunItiPincodeList] = useState({});
//   const OnRunItiStateChange = async (val, index) => {
//     try {

//       // Clear Before Initialize
//       formikRef.current.setFieldValue(`runningITIs[${index}].run_District`, []);
//       formikRef.current.setFieldValue(`runningITIs[${index}].run_SubDistrict`, []);
//       formikRef.current.setFieldValue(`runningITIs[${index}].run_Village`, []);
//       formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, '');
//       const districtsData = await getDistricts(val);

//       console.log(val, index, districtsData);
//       setRunItiDistrictsList(prev => ({ ...prev, [index]: districtsData }));
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//     }
//   }
//   const OnRunItiDistrictChange = async (val, index) => {
//     formikRef.current.setFieldValue(`runningITIs[${index}].run_SubDistrict`, []);
//     formikRef.current.setFieldValue(`runningITIs[${index}].run_Village`, []);
//     formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, '');

//     try {
//       // Clear Before Initialize
//       let run_State = formikRef.current.values.runningITIs[index].run_State;
//       const subdistrictsData = await getSubdistricts(run_State, val);
//       setRunItiSubDistrictsList(prev => ({ ...prev, [index]: subdistrictsData }));
//       console.log("Selected State:", val);
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//     }
//   }
//   const OnRunItiSubDistrictChange = async (val, index) => {
//     console.log("Selected State:", val);

//     // Clear Before Initialize 
//     formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, '');
//     try {

//       let run_State = formikRef.current.values.runningITIs[index].run_State;
//       let run_District = formikRef.current.values.runningITIs[index].run_District;
//       let run_SubDistrict = formikRef.current.values.runningITIs[index].run_SubDistrict;

//       const villagesData = await getVillages(run_State, run_District, run_SubDistrict);
//       setRunItiVillageList(prev => ({ ...prev, [index]: villagesData }));
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//     }
//   }
//   const OnRunItiVillageChange = async (val, index) => {
//     console.log("Selected State:", val);
//     //Clear Before Initialize
//     formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, '');
//     try {
//       const pincodesData = await getPincodes(val);
//       formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, pincodesData?.pincode || null);
//     } catch (error) {
//       console.error("Error fetching districts:", error);
//       // formikRef.current.setPincodeValue(null);
//     }
//   }


//   return (
//     <Fragment>
//       {appStatus?.stage_I_fee_status === STAGE_I__FEE_PAID ||
//         appStatus?.stage_I_fee_status === STAGE_I__FEE_EXEMPTED ? (
//         <ABD />
//       ) : (
//         <Formik
//           innerRef={formikRef}
//           validationSchema={yup.object().shape(yupObject)}
//           // onSubmit={(values) => {
//           //   console.log("Form submitted with values:", values);
//           //   submit(values);
//           // }}
//           validate={serverValidation}
//           initialValues={basicDetail}
//           validateOnBlur={true}
//           validateOnChange={true} // Enable validation on every field change
//         >
//           {({ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur }) => (
//             <>
//               <ContextMap.Stage1Form.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur }} >
//                 <Card className="custom-card shadow">
//                   <Card.Header>
//                     <div
//                       className="card-title"
//                       style={{ textTransform: "none" }}
//                     >
//                       Select Affiliation Category
//                     </div>
//                   </Card.Header>
//                   <Card.Body style={{ padding: 0 }}>
//                     <Row className="mb-3">
//                       <div>
//                         <ListGroup as="ul">
//                           {st1form.AffiliationCategory.map((category) => {
//                             console.log(category);
//                             return (<ListGroup.Item
//                               as="li"
//                               key={category.master}
//                               style={{ padding: "5px" }}
//                             >

//                               <RadioField
//                                 label={`${category.name}`}
//                                 name="aff_category"
//                                 value={category.master}
//                                 contextName="Stage1Form"
//                                 mandatory
//                                 size="lg"
//                               />

//                               {/* <Form.Group>
//                                 <Form.Check
//                                   inline
//                                   type="radio"
//                                   label={`${category.name}`}
//                                   name="aff_category"
//                                   value={category.master}
//                                   onChange={handleChange}
//                                   checked={
//                                     values.aff_category === category.master
//                                   }
//                                   isInvalid={
//                                     touched.aff_category &&
//                                     !!errors.aff_category
//                                   }
//                                 />
//                               </Form.Group> */}
//                               {values.aff_category === "06" &&
//                                 category.subCate && (
//                                   <ListGroup
//                                     as="ul"
//                                     className="ms-4 mt-2"
//                                     style={{
//                                       listStyleType: "none",
//                                       paddingLeft: "1rem",
//                                     }}
//                                   >
//                                     {category.subCate.map((sub, subIndex) => (
//                                       <ListGroup.Item
//                                         as="li"
//                                         key={subIndex}
//                                         style={{ padding: "5px" }}
//                                       >
//                                         <RadioField
//                                           label={sub.name}
//                                           name="aff_sub_category"
//                                           value={sub.master}
//                                           contextName="Stage1Form"
//                                           mandatory
//                                           size="lg"
//                                         />

//                                         {/* <Form.Group>
//                                           <Form.Check
//                                             inline
//                                             type="radio"
//                                             label={sub.name}
//                                             name="aff_sub_category"
//                                             value={sub.master}
//                                             onChange={handleChange}
//                                             checked={
//                                               values.aff_sub_category ===
//                                               sub.master
//                                             }
//                                             isInvalid={
//                                               touched.aff_sub_category &&
//                                               !!errors.aff_sub_category
//                                             }
//                                           />
//                                         </Form.Group> */}
//                                       </ListGroup.Item>
//                                     ))}
//                                   </ListGroup>
//                                 )}
//                             </ListGroup.Item>


//                             )
//                           })}
//                         </ListGroup>
//                       </div>

//                       <div style={{ marginTop: "5px" }}>
//                         {touched.aff_category && errors.aff_category && (
//                           <Alert variant="danger">{errors.aff_category}</Alert>
//                         )}
//                       </div>
//                       <div style={{ marginTop: "5px" }}>
//                         {touched.aff_sub_category &&
//                           errors.aff_sub_category && (
//                             <Alert variant="danger">
//                               {errors.aff_sub_category}
//                             </Alert>
//                           )}
//                       </div>
//                     </Row>
//                   </Card.Body>
//                 </Card>

//                 <Card className="custom-card shadow">
//                   <Card.Header>
//                     <div
//                       className="card-title"
//                       style={{ textTransform: "none" }}
//                     >
//                       Basic Details of Applicant Entity
//                     </div>
//                   </Card.Header>
//                   <Card.Body>
//                     <Form ref={formRef2} onSubmit={handleSubmit}>
//                       <Form.Label>
//                         Category of Applicant Entity
//                         <span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Row className="mb-3">
//                         {st1form.app_cat_list.map(
//                           (item, index) => (
//                             console.log(item),
//                             (
//                               <Form.Group key={index} as={Col} md="3">
//                                 <div className="d-flex align-items-center gap-2">
//                                   <RadioField
//                                     label={item.cat.label}
//                                     name="category"
//                                     value={item.cat.label}
//                                     contextName="Stage1Form"
//                                     mandatory
//                                     size="lg"
//                                   />
//                                   {/* <Form.Check
//                                     key={index}
//                                     type="radio"
//                                     label={item.cat.label}
//                                     name="category"
//                                     value={item.cat.label}
//                                     onChange={handleChange}
//                                     isInvalid={
//                                       touched.category && !!errors.category
//                                     }
//                                     checked={values.category === item.cat.label}
//                                   /> */}

//                                   {/* {item.metaInfo.i != "" && (
//                                     <i
//                                       className="fe fe-help-circle"
//                                       style={{
//                                         cursor: "pointer",
//                                         color: "#6c757d",
//                                       }}
//                                       title={item.metaInfo.i}
//                                       onClick={() =>
//                                         alert(`Info about ${label.metaInfo.i}`)
//                                       } // Replace with your actual logic
//                                     ></i>
//                                   )} */}
//                                 </div>
//                                 {touched.category && errors.category && (
//                                   <Form.Control.Feedback
//                                     type="invalid"
//                                     className="d-block"
//                                   >
//                                     {errors.category}
//                                   </Form.Control.Feedback>
//                                 )}
//                               </Form.Group>
//                             )
//                           )
//                         )}
//                       </Row>
//                       <Row className="mb-3">
//                         <Col as={Col} md={4}>
//                           <TextField label="Name of Applicant Entity" name="name_of_applicant_entity" type="text" mandatory contextName="Stage1Form" size="lg" />
//                         </Col>
//                         {/* <Form.Group as={Col} md="4">
//                           <Form.Label>
//                             Name of Applicant Entity{" "}
//                             <span style={{ color: "red" }}>*</span>
//                             <i
//                               className="fe fe-help-circle"
//                               style={{ cursor: "pointer", color: "#6c757d" }}
//                               title="An individual or entity that submits an application to the DGT for affiliation related purposes, including the establishment of a new Industrial Training Institute (ITI), addition of trades or units in an existing ITI, shifting or relocation of an existing institute, renewal of affiliation, surrender of trades or units in an existing ITI, or any other process as specified under these Norms"
//                               onClick={() => alert(`Info about About`)} // Replace with your actual logic
//                             ></i>
//                           </Form.Label>
//                           <Form.Control
//                             size="lg"
//                             error="Enter Name of Applicant"
//                             required
//                             type="text"
//                             name="name_of_applicant_entity"
//                             value={values.name_of_applicant_entity}
//                             onChange={handleChange}
//                             isInvalid={
//                               touched.name_of_applicant_entity &&
//                               !!errors.name_of_applicant_entity
//                             }
//                             placeholder={`Enter Here`}
//                           />

//                           {touched.name_of_applicant_entity &&
//                             errors.name_of_applicant_entity && (
//                               <Form.Control.Feedback
//                                 type="invalid"
//                                 className="d-block"
//                               >
//                                 {errors.name_of_applicant_entity}
//                               </Form.Control.Feedback>
//                             )}
//                         </Form.Group> */}
//                       </Row>



//                       <Row className="mb-3">
//                         <Col md={12}>
//                           <h6> Address of Applicant Entity{""} <span style={{ color: "red" }}>*</span> </h6>
//                           <hr />
//                         </Col>
//                         <Col md={12}>
//                           <Row className="mb-3">
//                             {/* states */}
//                             <Col md="4">
//                               <SelectField
//                                 label="Applicant Entity State"
//                                 name="ApplicantEntityState"
//                                 mandatory
//                                 options={states}
//                                 contextName="Stage1Form"
//                                 onValueChange={(val) => OnApplicantEntityStateChange(val, 'ApplicantEntityDistrict')}
//                                 valueProp="stateCode"
//                                 labelProp="stateNameEnglish"
//                                 size="lg"
//                               />
//                             </Col>



//                             {/* <BootstrapForm.Group
//                               as={Col}
//                               md="3"
//                               controlId="ApplicantEntityState"
//                             >
//                               <BootstrapForm.Label>
//                                 Applicant Entity State{" "}
//                                 <span style={{ color: "red" }}>*</span>
//                               </BootstrapForm.Label>
//                               <BootstrapForm.Select
//                                 size="lg"
//                                 name="ApplicantEntityState"
//                                 value={values.ApplicantEntityState}
//                                 onChange={(e) => {
//                                   handleChange(e);
//                                   onStateSelected(e);
//                                   // Clear dependent fields when state changes
//                                   setFieldValue('ApplicantEntityDistrict', '');
//                                   setFieldValue('ApplicantEntitySubDistrict', '');
//                                   setFieldValue('ApplicantEntityVillage', '');
//                                   setFieldValue('ApplicantEntityPincode', '');
//                                   setPincodeValue(null);
//                                 }}
//                                 isInvalid={
//                                   touched.ApplicantEntityState &&
//                                   !!errors.ApplicantEntityState
//                                 }
//                               >
//                                 <option value="">Select State</option>
//                                 {states.map((state, index) => (
//                                   <option key={index} value={state.stateCode}>
//                                     {state.stateNameEnglish}
//                                   </option>
//                                 ))}
//                               </BootstrapForm.Select>

//                               {touched.ApplicantEntityState &&
//                                 errors.ApplicantEntityState && (
//                                   <BootstrapForm.Control.Feedback type="invalid">
//                                     {errors.ApplicantEntityState}
//                                   </BootstrapForm.Control.Feedback>
//                                 )}
//                             </BootstrapForm.Group> */}



//                             {/* districts */}
//                             <Col md="4">
//                               <SelectField
//                                 label="Applicant Entity District"
//                                 name="ApplicantEntityDistrict"
//                                 mandatory
//                                 // options={district}
//                                 options={districtsList['ApplicantEntityDistrict'] || []} // row-specific districts
//                                 contextName="Stage1Form"
//                                 onValueChange={(val) => OnApplicantEntityDistrictChange(val, 'ApplicantEntitySubDistrict')}
//                                 valueProp="districtCode"
//                                 labelProp="districtNameEnglish"
//                                 size="lg"
//                               />
//                             </Col>




//                             {/* <BootstrapForm.Group
//                               as={Col}
//                               md="3"
//                               controlId="ApplicantEntityDistrict"
//                             >
//                               <BootstrapForm.Label>
//                                 Applicant Entity District{" "}
//                                 <span style={{ color: "red" }}>*</span>
//                               </BootstrapForm.Label>

//                               <BootstrapForm.Select
//                                 size="lg"
//                                 name="ApplicantEntityDistrict"
//                                 value={values.ApplicantEntityDistrict}
//                                 onChange={(e) => {
//                                   handleChange(e);
//                                   onDistrictSelected(e);
//                                   // Clear dependent fields when district changes
//                                   setFieldValue('ApplicantEntitySubDistrict', '');
//                                   setFieldValue('ApplicantEntityVillage', '');
//                                   setFieldValue('ApplicantEntityPincode', '');
//                                   setPincodeValue(null);
//                                 }}
//                                 isInvalid={
//                                   touched.ApplicantEntityDistrict &&
//                                   !!errors.ApplicantEntityDistrict
//                                 }
//                               >
//                                 {values.ApplicantEntityState && (
//                                   <>
//                                     <option value="">Select District</option>
//                                     {district.map((district, index) => (
//                                       <option
//                                         key={index}
//                                         value={district.districtCode}
//                                       >
//                                         {district.districtNameEnglish}
//                                       </option>
//                                     ))}
//                                   </>
//                                 )}
//                               </BootstrapForm.Select>

//                               {touched.ApplicantEntityDistrict &&
//                                 errors.ApplicantEntityDistrict && (
//                                   <BootstrapForm.Control.Feedback type="invalid">
//                                     {errors.ApplicantEntityDistrict}
//                                   </BootstrapForm.Control.Feedback>
//                                 )}
//                             </BootstrapForm.Group> */}

//                             {/* subdistrict */}
//                             <Col md={4}>
//                               <SelectField
//                                 label="Applicant Entity Sub-District"
//                                 name="ApplicantEntitySubDistrict"
//                                 mandatory
//                                 options={subDistrictsList['ApplicantEntitySubDistrict'] || []} // row-specific districts
//                                 contextName="Stage1Form"
//                                 onValueChange={(val) => ApplicantEntitySubDistrict(val, 'ApplicantEntityVillage')}
//                                 valueProp="subdistrictCode"
//                                 labelProp="subdistrictNameEnglish"
//                                 size="lg"
//                               />
//                             </Col>


//                             {/* <BootstrapForm.Group
//                               as={Col}
//                               md="3"
//                               controlId="ApplicantEntitySubDistrict"
//                             >
//                               <BootstrapForm.Label>
//                                 Applicant Entity Sub-District{" "}
//                                 <span style={{ color: "red" }}>*</span>
//                               </BootstrapForm.Label>

//                               <BootstrapForm.Select
//                                 size="lg"
//                                 name="ApplicantEntitySubDistrict"
//                                 value={values.ApplicantEntitySubDistrict}
//                                 onChange={(e) => {
//                                   handleChange(e);
//                                   onSubDistrictSelected(e);
//                                   // Clear dependent fields when sub-district changes
//                                   setFieldValue('ApplicantEntityVillage', '');
//                                   setFieldValue('ApplicantEntityPincode', '');
//                                   setPincodeValue(null);
//                                 }}
//                                 isInvalid={
//                                   touched.ApplicantEntitySubDistrict &&
//                                   !!errors.ApplicantEntitySubDistrict
//                                 }
//                               >
//                                 {values.ApplicantEntityDistrict && (
//                                   <>
//                                     <option value="">Select Sub-District</option>
//                                     {subDistrict.map((subdistrict, index) => (
//                                       <option
//                                         key={index}
//                                         value={subdistrict.subdistrictCode}
//                                       >
//                                         {subdistrict.subdistrictNameEnglish}
//                                       </option>
//                                     ))}
//                                   </>
//                                 )}
//                               </BootstrapForm.Select>

//                               {touched.ApplicantEntitySubDistrict &&
//                                 errors.ApplicantEntitySubDistrict && (
//                                   <BootstrapForm.Control.Feedback type="invalid">
//                                     {errors.ApplicantEntitySubDistrict}
//                                   </BootstrapForm.Control.Feedback>
//                                 )}
//                             </BootstrapForm.Group> */}

//                             {/* city/town */}
//                             <Col md={4}>
//                               <TextField label="Applicant Entity Town/City" name="ApplicantEntityTown_City" type="text" mandatory contextName="Stage1Form" size="lg" />
//                             </Col>

//                             {/* <BootstrapForm.Group
//                               as={Col}
//                               md="3"
//                               controlId="validationCustom02"
//                             >
//                               <BootstrapForm.Label>
//                                 Applicant Entity Town/City
//                                 <span style={{ color: "red" }}>*</span>
//                               </BootstrapForm.Label>
//                               <BootstrapForm.Control
//                                 required
//                                 type="text"
//                                 placeholder="Town/City"
//                                 name="ApplicantEntityTown_City"
//                                 value={values.ApplicantEntityTown_City}
//                                 onChange={handleChange}
//                                 isInvalid={
//                                   touched.ApplicantEntityTown_City &&
//                                   !!errors.ApplicantEntityTown_City
//                                 }
//                               />
//                               {touched.ApplicantEntityTown_City &&
//                                 errors.ApplicantEntityTown_City && (
//                                   <BootstrapForm.Control.Feedback type="invalid">
//                                     {errors.ApplicantEntityTown_City}
//                                   </BootstrapForm.Control.Feedback>
//                                 )}
//                             </BootstrapForm.Group> */}

//                             {/* block/tehsil , sector/village , pincode , plot number/khasara number/gata number , landmark */}
//                             {/* <Form.Group
//                               as={Col}
//                               md="3"
//                               controlId="validationCustom02"
//                             >
//                               <Form.Label>
//                                 Applicant Entity Block/Tehsil
//                                 <span style={{ color: "red" }}>*</span>
//                               </Form.Label>
//                               <Form.Control
//                                 required
//                                 type="text"
//                                 placeholder="Block/Tehsil"
//                                 name="ApplicantEntityBlock_Tehsil"
//                                 value={values.ApplicantEntityBlock_Tehsil}
//                                 onChange={handleChange}
//                                 isInvalid={
//                                   touched.ApplicantEntityBlock_Tehsil &&
//                                   !!errors.ApplicantEntityBlock_Tehsil
//                                 }
//                               />
//                               {touched.ApplicantEntityBlock_Tehsil &&
//                                 errors.ApplicantEntityBlock_Tehsil && (
//                                   <Form.Control.Feedback type="invalid">
//                                     {errors.ApplicantEntityBlock_Tehsil}
//                                   </Form.Control.Feedback>
//                                 )}
//                             </Form.Group> */}


//                             {/* <Form.Group
//                               as={Col}
//                               md="3"
//                               controlId="validationCustom02"
//                             >
//                               <Form.Label>
//                                 Applicant Entity Sector/Village
//                                 <span style={{ color: "red" }}>*</span>
//                               </Form.Label>
//                               <Form.Control
//                                 required
//                                 type="text"
//                                 placeholder="Sector/Village"
//                                 name="ApplicantEntitySector_Village"
//                                 value={values.ApplicantEntitySector_Village}
//                                 onChange={handleChange}
//                                 isInvalid={
//                                   touched.ApplicantEntitySector_Village &&
//                                   !!errors.ApplicantEntitySector_Village
//                                 }
//                               />
//                               {touched.ApplicantEntitySector_Village &&
//                                 errors.ApplicantEntitySector_Village && (
//                                   <Form.Control.Feedback type="invalid">
//                                     {errors.ApplicantEntitySector_Village}
//                                   </Form.Control.Feedback>
//                                 )}
//                             </Form.Group> */}





//                             {/* village */}
//                             <Col md={4}>
//                               <SelectField
//                                 label="Applicant Entity Village"
//                                 name="ApplicantEntityVillage"
//                                 mandatory
//                                 options={villageList['ApplicantEntityVillage'] || []} // row-specific districts
//                                 contextName="Stage1Form"
//                                 onValueChange={(val) => {
//                                   console.log("Selected State:", val);
//                                   onApplicantEntityVillageChange(val, 'ApplicantEntityPincode');
//                                 }}
//                                 valueProp="villageCode"
//                                 labelProp="villageNameEnglish"
//                                 size="lg"
//                               />
//                             </Col>

//                             {/* <BootstrapForm.Group
//                               as={Col}
//                               md="3"
//                               controlId="ApplicantEntityVillage"
//                             >
//                               <BootstrapForm.Label>
//                                 Applicant Entity Village{" "}
//                                 <span style={{ color: "red" }}>*</span>
//                               </BootstrapForm.Label>

//                               <BootstrapForm.Select
//                                 size="lg"
//                                 name="ApplicantEntityVillage"
//                                 value={values.ApplicantEntityVillage}
//                                 onChange={(e) => {
//                                   handleChange(e);
//                                   onVillageSelected(e);
//                                 }}
//                                 isInvalid={
//                                   touched.ApplicantEntityVillage &&
//                                   !!errors.ApplicantEntityVillage
//                                 }
//                               >
//                                 {values.ApplicantEntitySubDistrict && (
//                                   <>
//                                     <option value="">Select Village</option>
//                                     {villages.map((village, index) => (
//                                       <option
//                                         key={index}
//                                         value={village.villageCode}
//                                       >
//                                         {village.villageNameEnglish}
//                                       </option>
//                                     ))}
//                                   </>
//                                 )}
//                               </BootstrapForm.Select>

//                               {touched.ApplicantEntityVillage &&
//                                 errors.ApplicantEntityVillage && (
//                                   <BootstrapForm.Control.Feedback type="invalid">
//                                     {errors.ApplicantEntityVillage}
//                                   </BootstrapForm.Control.Feedback>
//                                 )}
//                             </BootstrapForm.Group> */}

//                             {/* pincode */}
//                             <Col md={4}>
//                               <TextField disabled label="Applicant Pincode Number" name="ApplicantEntityPincode" type="text" mandatory contextName="Stage1Form" size="lg" />
//                             </Col>

//                             {/* <Form.Group
//                               as={Col}
//                               md="3"
//                               controlId="validationCustom02"
//                             >
//                               <Form.Label>
//                                 Applicant Pincode Number
//                                 <span style={{ color: "red" }}>*</span>
//                               </Form.Label>
//                               <Form.Control
//                                 required
//                                 type="text"
//                                 placeholder="Pincode"
//                                 name="ApplicantEntityPincode"
//                                 value={pincodeValue || ''}
//                                 onChange={handleChange}
//                                 isInvalid={
//                                   touched.ApplicantEntityPincode &&
//                                   !!errors.ApplicantEntityPincode
//                                 }
//                               />
//                               {touched.ApplicantEntityPincode &&
//                                 errors.ApplicantEntityPincode && (
//                                   <Form.Control.Feedback type="invalid">
//                                     {errors.ApplicantEntityPincode}
//                                   </Form.Control.Feedback>
//                                 )}
//                             </Form.Group> */}


//                             {/* <ApplicantAddressPincode
//                                 values={values}
//                                 touched={touched}
//                                 errors={errors}
//                                 handleChange={handleChange}
//                               /> */}
//                             {/* <Form.Group
//                                 controlId="validationCustom02"
//                               >
//                                 <Form.Label>
//                                   Applicant Entity Pincode
//                                   <span style={{ color: "red" }}>*</span>
//                                 </Form.Label>
//                                 <Form.Control
//                                   required
//                                   type="text"
//                                   placeholder="Pincode"
//                                   name="ApplicantEntityPincode"
//                                   value={values.ApplicantEntityPincode}

//                                   onChange={handleChange}
//                                   isInvalid={
//                                     touched.ApplicantEntityPincode &&
//                                     !!errors.ApplicantEntityPincode
//                                   }
//                                 />
//                                 {touched.ApplicantEntityPincode &&
//                                   errors.ApplicantEntityPincode && (
//                                     <Form.Control.Feedback type="invalid">
//                                       {errors.ApplicantEntityPincode}
//                                     </Form.Control.Feedback>
//                                   )}
//                               </Form.Group> */}
//                             <Col md={4}>
//                               <TextField label="Applicant Entity Plot Number/Khasara Number/Gata Number" name="ApplicantEntityPlotNumber_KhasaraNumber_GataNumber" type="text" mandatory contextName="Stage1Form" size="lg" />
//                             </Col>
//                             {/* <Form.Group
//                               as={Col}
//                               md="6"
//                               controlId="validationCustom02"
//                             >
//                               <Form.Label>
//                                 Applicant Entity Plot Number/Khasara Number/Gata
//                                 Number
//                                 <span style={{ color: "red" }}>*</span>
//                               </Form.Label>
//                               <Form.Control
//                                 required
//                                 type="text"
//                                 placeholder="Plot Number/Khasara Number/Gata Number"
//                                 name="ApplicantEntityPlotNumber_KhasaraNumber_GataNumber"
//                                 value={
//                                   values.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber
//                                 }
//                                 onChange={handleChange}
//                                 isInvalid={
//                                   touched.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber &&
//                                   !!errors.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber
//                                 }
//                               />
//                               {touched.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber &&
//                                 errors.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber && (
//                                   <Form.Control.Feedback type="invalid">
//                                     {
//                                       errors.ApplicantEntityPlotNumber_KhasaraNumber_GataNumber
//                                     }
//                                   </Form.Control.Feedback>
//                                 )}
//                             </Form.Group> */}
//                             <Col md={6}>
//                               <TextField label="Applicant Entity Landmark" name="ApplicantEntityLandmark" type="text" mandatory contextName="Stage1Form" size="lg" />
//                             </Col>
//                             {/* <Form.Group
//                               as={Col}
//                               md="3"
//                               controlId="validationCustom02"
//                             >
//                               <Form.Label>
//                                 Applicant Entity Landmark
//                                 <span style={{ color: "red" }}>*</span>
//                               </Form.Label>
//                               <Form.Control
//                                 required
//                                 type="text"
//                                 placeholder="Landmark"
//                                 name="ApplicantEntityLandmark"
//                                 value={values.ApplicantEntityLandmark}
//                                 onChange={handleChange}
//                                 isInvalid={
//                                   touched.ApplicantEntityLandmark &&
//                                   !!errors.ApplicantEntityLandmark
//                                 }
//                               />
//                               {touched.ApplicantEntityLandmark &&
//                                 errors.ApplicantEntityLandmark && (
//                                   <Form.Control.Feedback type="invalid">
//                                     {errors.ApplicantEntityLandmark}
//                                   </Form.Control.Feedback>
//                                 )}
//                             </Form.Group> */}
//                           </Row>
//                         </Col>
//                       </Row>

//                       <Row className="mb-3">
//                         <Col md={6}>
//                           {/* <ApplicantEntityEmailId values={values} touched={touched} errors={errors} handleChange={handleChange} /> */}

//                           <TextField label="Applicant Email Id"
//                             name="ApplicantEntityEmailId"
//                             type="text"
//                             mandatory
//                             contextName="Stage1Form"
//                             size="lg"
//                             onValueChange={(value, event) => {
//                               console.log("New username:", value);
//                               // setUsername(value); // optional: store in local state
//                               validationLayer(value)
//                             }}
//                             showVerifyButton={isValidEmailTyped}
//                             onVerify={(val) => verifyEmailOtp(val)}
//                           />



//                           {/* <OtpEmail
//                             emailFieldName={'ApplicantEntityEmailId'}
//                             is_verifiedFieldName={'isApplicantEntityEmailIdVerified'}
//                             frmk={{ handleSubmit, handleChange, setFieldValue, values, errors, touched }}
//                             formikRef={formikRef} /> */}

//                         </Col>

//                         <Form.Group
//                           as={Col}
//                           md="6"
//                           controlId="validationCustom02"
//                         >


//                           <TextField label="Applicant Contact Number"
//                             name="ApplicantContactNumber"
//                             type="text"
//                             mandatory
//                             contextName="Stage1Form"
//                             size="lg"
//                             onValueChange={(value, event) => {
//                               console.log("New username:", value);
//                               // setUsername(value); // optional: store in local state
//                               validationLayer2(value)
//                             }}
//                             showVerifyButton={isValidMobileTyped}
//                             onVerify={(val) => verifyMobileOtp(val)}
//                           />


//                           {/* <OtpMobile
//                             mobileFieldName={'ApplicantContactNumber'}
//                             is_verifiedFieldName={'isApplicantEntityMobileNumberVerified'}
//                             frmk={{ handleSubmit, handleChange, setFieldValue, values, errors, touched }}
//                             formikRef={formikRef} /> */}
//                           {/* <ApplicantEntityMobile
//                             values={values}
//                             touched={touched}
//                             errors={errors}
//                             handleChange={handleChange}
//                           /> */}



//                           {/* 
//                           <Form.Label>
//                             Applicant Contact Number
//                             <span style={{ color: "red" }}>*</span>
//                           </Form.Label>
//                           <div className="d-flex align-items-center gap-2">
//                             <Form.Control
//                               required
//                               type="text"
//                               inputMode="numeric"
//                               pattern="\d*"
//                               name="ApplicantContactNumber"
//                               placeholder="Applicant Contact Number"
//                               value={values.ApplicantContactNumber}
//                               onChange={(e) => {
//                                 // Keep only digits and limit to 10 characters
//                                 const cleanedValue = e.target.value.replace(/\D/g, "").slice(0, 10);
//                                 handleChange({
//                                   target: {
//                                     name: e.target.name,
//                                     value: cleanedValue,
//                                   },
//                                 });
//                               }}
//                               isInvalid={
//                                 touched.ApplicantContactNumber && !!errors.ApplicantContactNumber
//                               }
//                             />
//                             <Button variant="primary">Verify</Button>

//                             {touched.ApplicantContactNumber &&
//                               errors.ApplicantContactNumber && (
//                                 <Form.Control.Feedback type="invalid">
//                                   {errors.ApplicantContactNumber}
//                                 </Form.Control.Feedback>
//                               )}
//                           </div> */}
//                         </Form.Group>
//                       </Row>

//                       {/* {[
//                         "Society / Trust",
//                         "Private Limited Company",
//                         "Public Limited Company",
//                         "Union Territory Administration / Society / Trust registered by them",
//                       ].includes(
//                         stageI1_info?.stage_I
//                           ?.section_category_of_applicant_organization
//                           ?.category_of_applicant_organization
//                       ) && (
//                           <Row className="mb-3">
//                             <Col md="12">
//                               <Card className="border border-info custom-card">
//                                 <Card.Header>
//                                   <div className="card-title">
//                                     Details of Secretary/Chairperson/President
//                                     <span style={{ color: "red" }}>*</span>
//                                   </div>
//                                 </Card.Header>
//                                 <Card.Body>
//                                   <Row className="mb-3">
//                                     <Form.Group
//                                       as={Col}
//                                       md="3"
//                                       controlId="validationCustom02"
//                                     >
//                                       <Form.Label>Name</Form.Label>
//                                       <Form.Control
//                                         required
//                                         type="text"
//                                         name="name_of_secretary_chairperson_president"
//                                         placeholder="Name"
//                                         defaultValue=""
//                                       />
//                                       <Form.Control.Feedback>
//                                         Looks good!
//                                       </Form.Control.Feedback>
//                                     </Form.Group>
//                                     <Form.Group
//                                       as={Col}
//                                       md="3"
//                                       controlId="validationCustom02"
//                                     >
//                                       <Form.Label>
//                                         Designation
//                                         <span style={{ color: "red" }}>*</span>
//                                       </Form.Label>
//                                       <Form.Control
//                                         required
//                                         type="text"
//                                         name="designation_of_secretary_chairperson_president"
//                                         placeholder="Designation"
//                                         defaultValue=""
//                                       />
//                                       <Form.Control.Feedback>
//                                         Looks good!
//                                       </Form.Control.Feedback>
//                                     </Form.Group>
//                                     <Form.Group
//                                       as={Col}
//                                       md="3"
//                                       controlId="validationCustom02"
//                                     >
//                                       <Form.Label>
//                                         Email Id{" "}
//                                         <span style={{ color: "red" }}>*</span>
//                                       </Form.Label>
//                                       <Form.Control
//                                         required
//                                         type="text"
//                                         name="email_id_of_secretary_chairperson_president"
//                                         placeholder="Email Id"
//                                         defaultValue=""
//                                       />
//                                       <Form.Control.Feedback>
//                                         Looks good!
//                                       </Form.Control.Feedback>
//                                     </Form.Group>
//                                     <Form.Group
//                                       as={Col}
//                                       md="3"
//                                       controlId="validationCustom02"
//                                     >
//                                       <Form.Label>
//                                         Mobile Number
//                                         <span style={{ color: "red" }}>*</span>
//                                       </Form.Label>
//                                       <Form.Control
//                                         required
//                                         type="text"
//                                         name="mobile_number_of_secretary_chairperson_president"
//                                         placeholder="Mobile Number"
//                                         defaultValue=""
//                                       />
//                                       <Form.Control.Feedback>
//                                         Looks good!
//                                       </Form.Control.Feedback>
//                                     </Form.Group>
//                                     <Form.Group
//                                       as={Col}
//                                       md="3"
//                                       controlId="validationCustom02"
//                                     >
//                                       <Form.Label>
//                                         ID proof{" "}
//                                         <span style={{ color: "red" }}>*</span>
//                                       </Form.Label>
//                                       <Form.Control
//                                         required
//                                         type="text"
//                                         name="id_proof_of_secretary_chairperson_president"
//                                         placeholder="ID proof"
//                                         defaultValue=""
//                                       />
//                                       <Form.Control.Feedback>
//                                         Looks good!
//                                       </Form.Control.Feedback>
//                                     </Form.Group>
//                                   </Row>
//                                 </Card.Body>
//                               </Card>
//                             </Col>
//                           </Row>
//                         )} */}


//                     </Form>
//                   </Card.Body>
//                 </Card>
//                 {[
//                   "Society / Trust",
//                   "Private Limited Company",
//                   "Public Limited Company",
//                   "Public Sector Undertaking",
//                 ].includes(values.category) && (
//                     <Row className="mb-3">
//                       <Col md="12">
//                         <Card className="border border-info custom-card">
//                           <Card.Body>
//                             <Row className="mb-3">
//                               <Form.Group>
//                                 <Form.Label>
//                                   Is the Applicant Running Any Other ITI?
//                                   <span style={{ color: "red" }}>*</span>
//                                 </Form.Label>
//                                 <div>
//                                   <Form.Check
//                                     inline
//                                     type="radio"
//                                     label="Yes"
//                                     name="Is_the_applicant_running_any_other_iti"
//                                     value="yes"
//                                     onChange={handleChange}
//                                     checked={
//                                       values.Is_the_applicant_running_any_other_iti ===
//                                       "yes"
//                                     }
//                                     isInvalid={
//                                       touched.Is_the_applicant_running_any_other_iti &&
//                                       !!errors.Is_the_applicant_running_any_other_iti
//                                     }
//                                   />
//                                   <Form.Check
//                                     inline
//                                     type="radio"
//                                     label="No"
//                                     name="Is_the_applicant_running_any_other_iti"
//                                     value="no"
//                                     onChange={handleChange}
//                                     checked={
//                                       values.Is_the_applicant_running_any_other_iti ===
//                                       "no"
//                                     }
//                                     isInvalid={
//                                       touched.Is_the_applicant_running_any_other_iti &&
//                                       !!errors.Is_the_applicant_running_any_other_iti
//                                     }
//                                   />
//                                 </div>

//                                 {touched.Is_the_applicant_running_any_other_iti &&
//                                   errors.Is_the_applicant_running_any_other_iti && (
//                                     <Form.Control.Feedback
//                                       type="invalid"
//                                       style={{ display: "block" }}
//                                     >
//                                       {
//                                         errors.Is_the_applicant_running_any_other_iti
//                                       }
//                                     </Form.Control.Feedback>
//                                   )}
//                               </Form.Group>
//                             </Row>
//                             {/* RUNNING ITI LIST */}
//                             {values.Is_the_applicant_running_any_other_iti ===
//                               "yes" && (

//                                 <>
//                                   <Form.Group as={Col} md={12}>
//                                     <label className="form-label">
//                                       If Yes, Please Provide Details of the
//                                       ITI
//                                     </label>
//                                   </Form.Group>
//                                   {true && (
//                                     <FieldArray name="runningITIs">
//                                       {({ push, remove }) => (
//                                         <div>
//                                           <Table bordered hover>
//                                             <thead>
//                                               <tr>
//                                                 <th>#</th>
//                                                 <th>Provide details of applicant running any other ITI<span style={{ color: "red" }}>*</span></th>
//                                                 <th>Action</th>
//                                               </tr>
//                                             </thead>
//                                             <tbody>
//                                               {values.runningITIs.map((doc, index) => {
//                                                 // get already selected designations
//                                                 return (
//                                                   <tr key={doc.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "10px", }} >
//                                                     <td>{index + 1}</td>
//                                                     <td>
//                                                       <Row style={{ marginTop: '5px' }}>
//                                                         <Col md={3}>
//                                                           <TextField mandatory label="Affiliation Number" name={`runningITIs[${index}].run_AffiliationNo`} type="text" contextName="Stage1Form" size="lg" />
//                                                         </Col>
//                                                         <Col md={3}>
//                                                           <TextField mandatory label="ITI Name" name={`runningITIs[${index}].run_ITIName`} type="text" contextName="Stage1Form" size="lg" />
//                                                         </Col>
//                                                         <Col md={3}>
//                                                           <TextField mandatory label="MIS Code" name={`runningITIs[${index}].run_MISCode`} type="text" contextName="Stage1Form" size="lg" />
//                                                         </Col>
//                                                         <Col md="3">
//                                                           <SelectField
//                                                             mandatory
//                                                             size="lg"
//                                                             label="State"
//                                                             name={`runningITIs[${index}].run_State`}
//                                                             options={states}
//                                                             contextName="Stage1Form"
//                                                             onValueChange={(val) => OnRunItiStateChange(val, index)}
//                                                             valueProp="stateCode"
//                                                             labelProp="stateNameEnglish"
//                                                           />
//                                                         </Col>
//                                                       </Row>
//                                                       <Row style={{ marginTop: '5px' }}>
//                                                         <Col md="3">
//                                                           <SelectField
//                                                             mandatory
//                                                             size="lg"
//                                                             label="District"
//                                                             name={`runningITIs[${index}].run_District`}
//                                                             options={runItiDistrictsList[index] || []}
//                                                             contextName="Stage1Form"
//                                                             onValueChange={(val) => OnRunItiDistrictChange(val, index)} v
//                                                             valueProp="districtCode"
//                                                             labelProp="districtNameEnglish" />
//                                                         </Col>
//                                                         <Col md={3}>
//                                                           <SelectField
//                                                             mandatory
//                                                             size="lg"
//                                                             label="Sub-District"
//                                                             name={`runningITIs[${index}].run_SubDistrict`}
//                                                             options={runItiSubDistrictsList[index] || []}
//                                                             contextName="Stage1Form"
//                                                             onValueChange={(val) => OnRunItiSubDistrictChange(val, index)}
//                                                             valueProp="subdistrictCode"
//                                                             labelProp="subdistrictNameEnglish"
//                                                           />
//                                                         </Col>
//                                                         <Col md={3}>
//                                                           <SelectField
//                                                             mandatory
//                                                             size="lg"
//                                                             label="Village"
//                                                             name={`runningITIs[${index}].run_Village`}
//                                                             options={runItiVillageList[index] || []}
//                                                             contextName="Stage1Form"
//                                                             onValueChange={(val) => OnRunItiVillageChange(val, index)}
//                                                             valueProp="villageCode"
//                                                             labelProp="villageNameEnglish"
//                                                           />
//                                                         </Col>
//                                                         <Col md={3}>
//                                                           <TextField label="Town/City" name={`runningITIs[${index}].run_TownCity`} type="text" mandatory contextName="Stage1Form" size="lg" />
//                                                         </Col>
//                                                       </Row>

//                                                       <Row style={{ marginTop: '5px' }}>
//                                                         <Col md={4}>
//                                                           <TextField disabled label="Pincode" name={`runningITIs[${index}].run_Pincode`} type="text" mandatory contextName="Stage1Form" size="lg" />
//                                                         </Col>
//                                                         <Col md={4}>
//                                                           <TextField label="Plot Number/Khasara Number" name={`runningITIs[${index}].run_PlotNumber_KhasaraNumber`} type="text" mandatory contextName="Stage1Form" size="lg" />
//                                                         </Col>
//                                                         <Col md={4}>
//                                                           <TextField label="Landmark" name={`runningITIs[${index}].run_Landmark`} type="text" mandatory contextName="Stage1Form" size="lg" />
//                                                         </Col>
//                                                       </Row>
//                                                     </td>
//                                                     <td>
//                                                       {/* Remove Button */}
//                                                       {values.runningITIs.length > 1 && (
//                                                         <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
//                                                       )}
//                                                     </td>
//                                                   </tr>)
//                                               })}

//                                               <tr>
//                                                 <td colSpan={3}>
//                                                   {values.runningITIs.length >= 1 && (
//                                                     <div className="d-flex justify-content-end">
//                                                       <Button onClick={() =>
//                                                         push({
//                                                           run_AffiliationNo: "",
//                                                           run_ITIName: "",
//                                                           run_MISCode: "",
//                                                           run_State: "",
//                                                           run_District: "",
//                                                           run_SubDistrict: "",
//                                                           run_Village: "",
//                                                           run_TownCity: "",
//                                                           run_Pincode: "",
//                                                           run_PlotNumber_KhasaraNumber: "",
//                                                           run_Landmark: "",
//                                                         })
//                                                       }>
//                                                         Add More
//                                                       </Button>
//                                                     </div>
//                                                   )}
//                                                 </td>
//                                               </tr>
//                                             </tbody>
//                                           </Table>


//                                         </div>

//                                       )}
//                                     </FieldArray>)}
//                                 </>


//                               )}
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     </Row>
//                   )}
//               </ContextMap.Stage1Form.Provider>
//             </>
//           )}
//         </Formik>
//       )}
//       <Navigations nav={nav} onNext={() => { onNext(); }} />
//     </Fragment>
//   );
// };

// BasicDetailsofApplicantOrganization.propTypes = {
//   setActive: PropTypes.func.isRequired,
// };
// export default BasicDetailsofApplicantOrganization;

export const EntityDetails = ({ isView = false, nav }) => {
  // console.log(nav.next());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const [id, setId] = useState(appId);
  const [info, setInfo] = useState({});

  const [entInfo, setEntInfo] = useState({});



  const Context = ContextMap['stageIAsmtDetails'] || ContextMap.default;
  const { assessmentInfo } = useContext(Context);

  console.log(assessmentInfo.assessment_id);


  const onNext = async () => {
    console.log("Next Called", nav.step.slno);
    // const confirmResult = await Swal.fire({
    //   title: "Are you sure?",
    //   text: "Do you want to Proceed",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonText: "Okay, Proceed",
    //   cancelButtonText: "Cancel",
    // });
    // if (confirmResult.isConfirmed) {

    //   return;
    // }
    try {
      await st.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.APPLICANT_ENTITY_DETAILS.step, assessmentInfo.assessment_id, nav.step.slno);
      nav.next();
    } catch (err) {
      console.error("Error while saving:", err);
    }
  };

  useEffect(() => {
    console.log(entInfo);
  }, [entInfo]);

  useEffect(() => {
    getInfo();
    console.log(id);
  }, [id]);

  const getInfo = async () => {
    try {
      // let info = await set.getDetails(appId);
      // let resp = await gen.getDetails(appId);
      // Show loading
      Swal.fire({
        title: "Loading...",
        text: "Please wait while we fetch the data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      let resp2 = await gen.getEntityDetails(appId);
      setEntInfo(resp2.data);
      // setInfo(resp.data);
      Swal.close();
    } catch (error) {
      Swal.close();
      console.error("Error fetching entity details:", error);
      Swal.fire("Error", "Failed to fetch data.", "error");
    }
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <>
      <Row
        style={{
          backgroundColor: "rgb(245, 245, 245)",
          margin: "10px 0px 0px",
          borderRadius: 6,
          borderStyle: "dashed",
          borderWidth: "thin",
          padding: "2px",
        }}
      >
        <Col xl={12} lg={12} md={12} sm={12}>
          <table
            width="98%"
            border={1}
            style={{
              borderCollapse: "collapse",
              marginTop: 15,
              color: "black",
            }}
            align="center"
            cellPadding="5px"
          >
            <tbody>
              <tr>
                <td colSpan={7} style={{ border: "1px solid black" }}>
                  <b>Affiliation Category</b>
                </td>
              </tr>
              <tr>
                <td style={{ colSpan: 2 }}>
                  <b>Category:</b>{" "}

                  <u><span>{entInfo?.entity?.category_info?.cat_name}</span></u>
                </td>
                <td>
                  <b>Sub Category:</b>{" "}
                  <span>{info?.entity_details?.aff_sub_category}</span>{" "}
                </td>
              </tr>
            </tbody>
          </table>

          <table
            width="98%"
            border={1}
            style={{
              borderCollapse: "collapse",
              marginTop: 15,
              color: "black",
            }}
            align="center"
            cellPadding="5px"
          >
            <tbody>
              <tr>
                <td colSpan={7} style={{ border: "1px solid black" }}>
                  <b>Applicant Entity Details</b>
                </td>
              </tr>
              <tr>
                <td style={{ colSpan: 2 }}>
                  <b>Category of Applicant Entity:</b>{" "}
                  <span>{entInfo?.entity?.category}</span>{" "}
                </td>
                <td>
                  <b>Name of Applicant Entity:</b>{" "}
                  <span>{entInfo?.entity?.name_of_applicant_entity}</span>{" "}
                </td>
              </tr>
            </tbody>
          </table>
          <table
            width="98%"
            border={1}
            style={{
              borderCollapse: "collapse",
              marginTop: 15,
              color: "black",
            }}
            align="center"
            cellPadding="5px"
          >
            <tbody>
              <tr>
                <td colSpan={7} style={{ border: "1px solid black" }}>
                  <b>Address of Applicant Entity</b>
                </td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>
                  Applicant Entity State
                </th>
                <th style={{ border: "1px solid black" }}>
                  Applicant Entity District
                </th>
                <th style={{ border: "1px solid black" }}>
                  Applicant Entity Sub District
                </th>
                <th style={{ border: "1px solid black" }}>
                  Applicant Entity Town/City
                </th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  {entInfo?.entity?.ent_address?.state_detail?.stateNameEnglish}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {entInfo?.entity?.ent_address?.district_detail?.districtNameEnglish}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {entInfo?.entity?.ent_address?.sub_district?.subdistrictNameEnglish}
                </td>
                <td style={{ border: "1px solid black" }}>
                  --
                </td>
              </tr>

              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>
                  Applicant Entity Village
                </th>
                <th style={{ border: "1px solid black" }}>
                  Applicant Entity Pincode
                </th>
                <th style={{ border: "1px solid black" }}>
                  Applicant Entity Plot Number/Khasara Number/Gata Number
                </th>
                <th style={{ border: "1px solid black" }}>
                  Applicant Entity Landmark
                </th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  {entInfo?.entity?.ent_address?.village?.villageNameEnglish}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {entInfo?.entity?.ent_address?.pincode}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {
                    entInfo?.entity?.ent_address?.plotNumber_khasaraNumber_gataNumber
                  }
                </td>
                <td style={{ border: "1px solid black" }}>
                  {entInfo?.entity?.ent_address?.landmark}
                </td>
              </tr>

              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }} colSpan={2}>
                  Applicant Entity Email Id
                </th>
                <th style={{ border: "1px solid black" }} colSpan={2}>
                  Applicant Contact Number
                </th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }} colSpan={2}>
                  {entInfo?.entity?.ApplicantEntityEmailId}
                </td>
                <td style={{ border: "1px solid black" }} colSpan={2}>
                  {entInfo?.entity?.ApplicantContactNumber}
                </td>
              </tr>
            </tbody>
          </table>

          {entInfo?.entity?.Is_the_applicant_running_any_other_iti ===
            "yes" && (
              <table
                width="98%"
                border={1}
                style={{
                  borderCollapse: "collapse",
                  marginTop: 15,
                  color: "black",
                }}
                align="center"
                cellPadding="5px"
              >
                <tbody>
                  <tr>
                    <td colSpan={7} style={{ border: "1px solid black" }}>
                      <b>Running Other ITI Information</b>
                    </td>
                  </tr>
                  <tr style={{ border: "1px solid black" }}>
                    <td>
                      <table
                        width="98%"
                        border={1}
                        style={{
                          borderCollapse: "collapse",
                          marginTop: 15,
                          color: "black",
                        }}
                        align="center"
                        cellPadding="5px"
                      >
                        <tbody>
                          {entInfo?.otherITIs.map((item, index) => {
                            console.log(item, index);
                            return (
                              <>
                                <tr>
                                  <td
                                    width={"1%"}
                                    rowSpan={8}
                                    style={{ border: "1px solid black" }}
                                  >
                                    <b>{index + 1}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={7} style={{ border: "1px solid black" }}>
                                    <b>Running ITI Info</b>
                                  </td>
                                </tr>
                                <tr style={{ border: "1px solid black" }}>
                                  <th style={{ border: "1px solid black" }}>
                                    Affiliation Number
                                  </th>
                                  <th style={{ border: "1px solid black" }}>
                                    ITI Name
                                  </th>
                                  <th style={{ border: "1px solid black" }}>
                                    MIS Code
                                  </th>
                                  <th style={{ border: "1px solid black" }}>State</th>
                                  <th style={{ border: "1px solid black" }}>
                                    District
                                  </th>
                                </tr>
                                <tr>
                                  <td style={{ border: "1px solid black" }}>--</td>
                                  <td style={{ border: "1px solid black" }}>{item?.run_ITIName}</td>
                                  <td style={{ border: "1px solid black" }}>{item?.run_MISCode}</td>
                                  <td style={{ border: "1px solid black" }}>{item?.state_detail?.stateNameEnglish}</td>
                                  <td style={{ border: "1px solid black" }}>{item?.district_detail?.districtNameEnglish}</td>
                                </tr>
                                <tr style={{ border: "1px solid black" }}>
                                  <th style={{ border: "1px solid black" }}>
                                    Sub District
                                  </th>
                                  <th style={{ border: "1px solid black" }}>
                                    Village
                                  </th>
                                  <th style={{ border: "1px solid black" }}>Town/City</th>
                                  <th style={{ border: "1px solid black" }}>
                                    Pincode
                                  </th>
                                </tr>
                                <tr>
                                  <td style={{ border: "1px solid black" }}>--</td>
                                  <td style={{ border: "1px solid black" }}>--</td>
                                  <td style={{ border: "1px solid black" }}>--</td>
                                  <td style={{ border: "1px solid black" }}>{item?.run_Pincode}</td>
                                </tr>
                                <tr style={{ border: "1px solid black" }}>
                                  <th style={{ border: "1px solid black" }} colSpan={2}>
                                    Plot Number/Khasara Number
                                  </th>
                                  <th style={{ border: "1px solid black" }} colSpan={2}>
                                    Landmark
                                  </th>
                                </tr>
                                <tr>
                                  <td style={{ border: "1px solid black" }} colSpan={2}>
                                    {item.run_PlotNumber_KhasaraNumber}
                                  </td>
                                  <td style={{ border: "1px solid black" }} colSpan={2}>
                                    {item.run_Landmark}
                                  </td>
                                </tr>
                              </>
                            )
                          })}

                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
        </Col>
      </Row>
      {isView == false && (
        <Navigations nextLabel="Go Next" nav={nav} onNext={() => { onNext(); }} />
      )}
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
