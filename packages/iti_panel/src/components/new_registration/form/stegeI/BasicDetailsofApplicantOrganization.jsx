import { Fragment, useRef, useEffect, useState, createContext } from "react";

import { Row, Col, Card, Form, Button, ListGroup, Alert, InputGroup, } from "react-bootstrap";
import { Form as BootstrapForm } from "react-bootstrap";
import { Table, Modal } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import * as formik from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { yupObject } from "../../../../reducers/newAppReducer";
import { st1form } from "affserver";
import PropTypes from "prop-types";
import { UPDATE_ENTITY_DETAILS, AffiliationCategory, STAGE_I__FEE_PAID, STAGE_I__FEE_EXEMPTED, } from "affserver";
import { getStates, getDistricts, getSubdistricts, getVillages, getPincodes, } from "../../../../services/LGD/index";
import { Assessment_Basic_Detail as ABD } from "../../../../components/new_registration/form/stegeI/BasicDetailsofApplicantOrganization";
import { FormikHelpersContext } from "./FormikContext";
import { ContextMap } from "../../../../components/formik/contexts/index";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppStatusContext } from "../../../../services/context";
import { Navigations } from "../../../Assessment/components";

import * as C from "affserver";
import * as ap from "../../../../services/applicant/index";
import * as gen from "../../../../services/general/index";
import * as st from "../../../../services/state/index";
import { OtpEmail, OtpMobile } from "../../../formik/email/otp_val";

import { TextField, RadioField, SelectField } from "../../../../components/formik/Inputs/index";
import { useTranslation } from 'react-i18next';

import { useNavigate } from "react-router-dom";
import { EmailWithVerifyButton } from "@/components/formik/Inputs/EmailWithVerifyButton";
import { MobileWithVerifyButton } from "@/components/formik/Inputs/MobileWithVerifyButton";
import { SelectField2 } from "@/components/formik/Inputs/SelectField2";
import { FileField } from "@/components/formik/Inputs/FileField";
import IDProofOfAuthorizedSignatory from "./formComponent/IDProofOfAuthorizedSignatory";



export const FormContext = createContext();
const BasicDetailsofApplicantOrganization = ({ setActive, refreshSteps, nav }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const aff_category = queryParams.get("aff_category");
  const aff_sub_category = queryParams.get("aff_sub_category");
  const { appStatus } = useContext(AppStatusContext);

  useEffect(() => { console.log(appStatus); }, []);

  const dispatch = useDispatch();
  const reg = useSelector((state) => state.reg);
  const stepInfo = reg.steps[0];

  const [statesCode, setStatesCode] = useState(null);
  const [districtCodeValue, setDistrictCodeValue] = useState(null);
  const [subDistrict, setSubDistrict] = useState([]);
  const [villages, setVillages] = useState([]);
  const [pincodeValue, setPincodeValue] = useState(null);

  const EntityDetails = useSelector((state) => state.EntityDetails);
  const AppliInfo = useSelector((state) => state.AppliInfo);
  const authUser = useSelector((state) => state.loginUserReducer);
  const [basicDetail, setBasicDetail] = useState(st1form.initialValues);

  // const [districtsList, setDistrictsList] = useState({});
  // const [subDistrictsList, setSubDistrictsList] = useState({});
  // const [villageList, setVillageList] = useState({});
  // const [pincodeList, setPincodeList] = useState({});
  const [catInfo, setCatInfo] = useState({});
  const [language, setLanguage] = useState([]);
  const [id_proof_master, setId_proof_master] = useState([]);
  const [designation_master, setDesignation_master] = useState([]);


  const loadData = async () => {
    let data, resp;
    try {
      // data = await getDbEntityDetails(appId); 
      resp = await ap.ap_getDbEntityDetails(appId);
      const { catInfo, initValues } = resp.data
      setBasicDetail(initValues);
      setCatInfo(catInfo);
      formikRef.current.setValues(initValues); // update entire form

      if (data?.runningITIs) {
        for (const [index, obj] of data.runningITIs.entries()) {
          // Setting Up District List
          if (obj.district_list.length > 0) {
            setRunItiDistrictsList(prev => ({ ...prev, [index]: obj.district_list }));
          }
          // Setting Up Sub District List
          if (obj.sub_district_list.length > 0) {
            setRunItiSubDistrictsList(prev => ({ ...prev, [index]: obj.sub_district_list }));
          }
          // Setting Up Village List
          if (obj.village_list.length > 0) {
            setRunItiVillageList(prev => ({ ...prev, [index]: obj.village_list }));
          }
        }
      }


      let r3 = await gen.geLanguages(appId);
      setLanguage(r3.data);


      // Setting Up Id Proof Master
      let r4 = await gen.getMasters(C.MastersKey.ID_PROOF);
      setId_proof_master(r4.data);


      // Setting Up Designation Master
      let r5 = await gen.getMasters(C.MastersKey.DESIGNATION);
      setDesignation_master(r5.data);


    } catch (error) {
      console.log(error);
      formikRef.current.setValues(st1form.initialValues); // update entire form
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Fetch States
  useEffect(() => {
    const fetchStatesData = async () => {
      try {
        const res = await getStates();
        // console.log("API Response:", res);
        // console.log("States data:", res?.data || res);
        setStates(res?.data || res || []);
      } catch (err) {
        console.error("Error fetching states:", err);
        setStates([]);
      }
    };
    fetchStatesData();
  }, []);


  const { Formik } = formik;
  const formRef2 = useRef();


  //Custom Validation
  const stageI1_info = useSelector((state) => state.theme.new_registration);


  const formikRef = useRef();

  // Sync pincodeValue with Formik when it changes
  useEffect(() => {
    if (formikRef.current && pincodeValue !== null) {
      formikRef.current.setFieldValue('ApplicantEntityPincode', pincodeValue || '');
    }
  }, [pincodeValue]);


  useEffect(() => {
    console.log(formikRef.current.errors);
  }, [formikRef])



  // Debounce helper
  function debounce(fn, delay) {
    let timer;
    return (...args) =>
      new Promise((resolve) => {
        clearTimeout(timer);
        timer = setTimeout(() => resolve(fn(...args)), delay);
      });
  }

  // Fake API call
  const checkEmailExists = async (email) => {
    console.log("API hit for:", email);
    await new Promise((r) => setTimeout(r, 500)); // simulate delay
    return email === "test@example.com"; // this one is taken
  };

  // Debounced version
  // const debouncedCheckEmail = debounce(checkEmailExists, 600);

  const serverValidation = async (values) => {
    // const errors = {};
    // if (values.ApplicantEntityEmailId) {
    //   const exists = await debouncedCheckEmail(values.ApplicantEntityEmailId);
    //   if (exists) {
    //     errors.ApplicantEntityEmailId = "Email already exists";
    //   }
    // }
    // return errors;
  }
  const onNext = async () => {
    try {
      await formikRef.current.validateForm();
      // formikRef.current.setTouched(
      //   Object.keys(formikRef.current.values).reduce(
      //     (acc, key) => ({ ...acc, [key]: true }),
      //     {}
      //   )
      // );

      console.log(formikRef.current);

      if (formikRef.current.isValid != true) {
        throw new Error("Please Submit Form");
      }
      console.log(formikRef.current.isValid, formikRef.current.errors);
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to Proceed",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Okay, Proceed",
        cancelButtonText: "Cancel",
      });
      if (confirmResult.isConfirmed) {
        try {

          Swal.fire({ title: "Saving...", text: "Please wait while we save your data.", allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

          let result, resp;
          resp = await ap.setEntityDetails(formikRef.current.values, appId);
          console.log(resp);
          Swal.close(); // close loading in case it’s still open

          const result2 = await Swal.fire({ icon: "success", title: "Saved!", text: "Your form data has been saved successfully", confirmButtonText: "OK", });
          if (result2.isConfirmed) {
            nav.next();
            // navigate(0);
          }
        } catch (error) {
          console.error("Error while saving:", error);
          Swal.close(); // close loading in case it’s still open
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "Failed to save verification remarks."
          });
        }
        return;
      }
    } catch (error) {
      console.error(error);
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
      formikRef.current.setFieldValue('isApplicantEntityEmailIdVerified', true);

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
      formikRef.current.setFieldValue('isApplicantEntityMobileNumberVerified', true);

    } else {
      console.log("User cancelled OTP input");
      // setOtpSent(false);
    }
  }
  const [states, setStates] = useState([]);
  const [district, setDistrict] = useState([]);
  const [districtsList, setDistrictsList] = useState({});
  const [subDistrictsList, setSubDistrictsList] = useState({});
  const [villageList, setVillageList] = useState({});
  const [pincodeList, setPincodeList] = useState({});

  const addressFieldsName = { state_key: "ApplicantEntityState", district_Key: 'ApplicantEntityDistrict', sub_district_key: 'ApplicantEntitySubDistrict', village_key: "ApplicantEntityVillage", pincode_key: "ApplicantEntityPincode" };
  useEffect(() => {
    console.log(districtsList);
  }, [districtsList])

  useEffect(() => {
    console.log(subDistrictsList);
  }, [subDistrictsList])

  const OnApplicantEntityStateChange = async (val, index) => {
    try {
      const districtsData = await getDistricts(val);
      setDistrictsList(prev => ({ ...prev, [index]: districtsData }));
      // reseltAddressFields('state', val, index, addressFieldsName);

      //  Setting up Districts 
      if (formikRef.current.values.ApplicantEntityDistrict) {
        await formikRef.current.setFieldValue("ApplicantEntityDistrict", formikRef.current?.values?.ApplicantEntityDistrict);
      }

    } catch (error) {
      // reseltAddressFields('state', val, index, addressFieldsName);
    }
  }
  const OnApplicantEntityDistrictChange = async (val, index) => {
    try {

      console.log("Called OnApplicantEntityDistrictChange");

      const subdistrictsData = await getSubdistricts(formikRef.current.values.ApplicantEntityState, val);
      console.log(subdistrictsData);
      setSubDistrictsList(prev => ({ ...prev, ['ApplicantEntitySubDistrict']: subdistrictsData }));
      // reseltAddressFields('district', val, index, addressFieldsName);

      //  Setting up Districts 
      if (formikRef.current.values.ApplicantEntitySubDistrict) {
        await formikRef.current.setFieldValue("ApplicantEntitySubDistrict", formikRef.current.values.ApplicantEntitySubDistrict);
      }


    } catch (error) {
      console.error("Error fetching districts:", error);
      // reseltAddressFields('district', val, index, addressFieldsName);
    }

  }
  const ApplicantEntitySubDistrict = async (val, index) => {
    try {
      let stateCode = formikRef.current.values.ApplicantEntityState;
      let districtCode = formikRef.current.values.ApplicantEntityDistrict;
      let subDistrictCode = formikRef.current.values.ApplicantEntitySubDistrict;
      const villagesData = await getVillages(stateCode, districtCode, subDistrictCode);
      setVillageList(prev => ({ ...prev, [index]: villagesData }));
      // reseltAddressFields('sub_district', val, index, addressFieldsName);

      //  Setting up Districts 
      if (formikRef.current.values.ApplicantEntityVillage) {
        await formikRef.current.setFieldValue("ApplicantEntityVillage", formikRef.current.values.ApplicantEntityVillage);
      }

    } catch (error) {
      console.error("Error fetching districts:", error);
      // reseltAddressFields('sub_district', val, index, addressFieldsName);
    }
  }
  const onApplicantEntityVillageChange = async (val, index) => {
    try {
      const pincodesData = await getPincodes(val);
      reseltAddressFields('village', val, index, addressFieldsName);
      formikRef.current.setFieldValue(addressFieldsName.pincode_key, pincodesData?.pincode || null);

    } catch (error) {
      console.error("Error fetching districts:", error);
      // reseltAddressFields('village', val, index, addressFieldsName);
    }
  }


  // Running ITI APIs
  const [runItiDistrictsList, setRunItiDistrictsList] = useState({});
  const [runItiSubDistrictsList, setRunItiSubDistrictsList] = useState({});
  const [runItiVillageList, setRunItiVillageList] = useState({});
  const [runItiPincodeList, setRunItiPincodeList] = useState({});
  const OnRunItiStateChange = async (val, index) => {
    try {
      console.log("Running ITI State Changes");
      // Clear Before Initialize
      formikRef.current.setFieldValue(`runningITIs[${index}].run_District`, []);
      formikRef.current.setFieldValue(`runningITIs[${index}].run_SubDistrict`, []);
      formikRef.current.setFieldValue(`runningITIs[${index}].run_Village`, []);
      formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, '');
      const districtsData = await getDistricts(val);

      console.log(val, index, districtsData);
      setRunItiDistrictsList(prev => ({ ...prev, [index]: districtsData }));
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }
  const OnRunItiDistrictChange = async (val, index) => {
    formikRef.current.setFieldValue(`runningITIs[${index}].run_SubDistrict`, []);
    formikRef.current.setFieldValue(`runningITIs[${index}].run_Village`, []);
    formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, '');

    try {
      // Clear Before Initialize
      let run_State = formikRef.current.values.runningITIs[index].run_State;
      const subdistrictsData = await getSubdistricts(run_State, val);
      setRunItiSubDistrictsList(prev => ({ ...prev, [index]: subdistrictsData }));
      console.log("Selected State:", val);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }
  const OnRunItiSubDistrictChange = async (val, index) => {
    console.log("Selected State:", val);

    // Clear Before Initialize 
    formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, '');
    try {

      let run_State = formikRef.current.values.runningITIs[index].run_State;
      let run_District = formikRef.current.values.runningITIs[index].run_District;
      let run_SubDistrict = formikRef.current.values.runningITIs[index].run_SubDistrict;

      const villagesData = await getVillages(run_State, run_District, run_SubDistrict);
      setRunItiVillageList(prev => ({ ...prev, [index]: villagesData }));
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }
  const OnRunItiVillageChange = async (val, index) => {
    console.log("Selected State:", val);
    //Clear Before Initialize
    formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, '');
    try {
      const pincodesData = await getPincodes(val);
      formikRef.current.setFieldValue(`runningITIs[${index}].run_Pincode`, pincodesData?.pincode || null);
    } catch (error) {
      console.error("Error fetching districts:", error);
      // formikRef.current.setPincodeValue(null);
    }
  }

  const reseltAddressFields = async (changeIn, value, index, addressFields) => {
    switch (changeIn) {
      case "state":
        if (value == "") {
          setDistrictsList(prev => ({ ...prev, ['ApplicantEntityDistrict']: [] }));
          setSubDistrictsList(prev => ({ ...prev, ['ApplicantEntitySubDistrict']: [] }));
          setVillageList(prev => ({ ...prev, ['ApplicantEntityVillage']: [] }));
          await formikRef.current.setFieldValue(addressFields.state_key, "");
        }



        setSubDistrictsList(prev => ({ ...prev, ['ApplicantEntitySubDistrict']: [] }));
        setVillageList(prev => ({ ...prev, ['ApplicantEntityVillage']: [] }));

        await formikRef.current.setFieldValue(addressFields.district_Key, "");
        await formikRef.current.setFieldValue(addressFields.sub_district_key, "");
        await formikRef.current.setFieldValue(addressFields.village_key, "");
        await formikRef.current.setFieldValue(addressFields.pincode_key, "");
        break;
      case "district":
        if (value == "") {
          setSubDistrictsList(prev => ({ ...prev, ['ApplicantEntitySubDistrict']: [] }));
          setVillageList(prev => ({ ...prev, ['ApplicantEntityVillage']: [] }));
          await formikRef.current.setFieldValue(addressFields.district_Key, "");
        }

        setVillageList(prev => ({ ...prev, ['ApplicantEntityVillage']: [] }));
        await formikRef.current.setFieldValue(addressFields.sub_district_key, "");
        await formikRef.current.setFieldValue(addressFields.village_key, "");
        await formikRef.current.setFieldValue(addressFields.pincode_key, "");
        break;
      case "sub_district":
        if (value == "") {
          setVillageList(prev => ({ ...prev, ['ApplicantEntityVillage']: [] }));
          await formikRef.current.setFieldValue(addressFields.sub_district_key, "");
        }
        await formikRef.current.setFieldValue(addressFields.village_key, "");
        await formikRef.current.setFieldValue(addressFields.pincode_key, "");
        break;
      case "village":
        if (value == "") await formikRef.current.setFieldValue(addressFields.pincode_key, "");
        break;
      default:
        break;
    }
  }


  useEffect(() => {
    console.log(subDistrictsList);
  }, [subDistrictsList]);

  return (
    <Fragment>
      {appStatus?.stage_I_fee_status === STAGE_I__FEE_PAID ||
        appStatus?.stage_I_fee_status === STAGE_I__FEE_EXEMPTED ? (
        <ABD />
      ) : (
        <Formik
          enableReinitialize
          innerRef={formikRef}
          validationSchema={yup.object().shape(yupObject)}
          validate={serverValidation}
          initialValues={basicDetail}
          validateOnBlur={true}
          validateOnChange={true} // Enable validation on every field change
        >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur, setFieldError, setFieldTouched }) => {

            // Setting Up Addressed Fields 
            useEffect(() => {
              if (values?.ApplicantEntityState) {
                console.log("ApplicantEntityState Changed");
                OnApplicantEntityStateChange(values?.ApplicantEntityState, 'ApplicantEntityDistrict');
              }
            }, [values?.ApplicantEntityState]);

            useEffect(() => {
              if (values?.ApplicantEntityDistrict) {
                console.log("ApplicantEntityDistrict Changed");
                OnApplicantEntityDistrictChange(values?.ApplicantEntityDistrict, 'ApplicantEntitySubDistrict');
              }
            }, [values?.ApplicantEntityDistrict]);

            useEffect(() => {
              console.log("ApplicantEntitySubDistrict Changed");
              if (values?.ApplicantEntitySubDistrict) {
                ApplicantEntitySubDistrict(values?.ApplicantEntitySubDistrict, 'ApplicantEntityVillage')
              }
            }, [values?.ApplicantEntitySubDistrict]);

            useEffect(() => {
              console.log("ApplicantEntityVillage Changed");
              if (values?.ApplicantEntityVillage) {
                onApplicantEntityVillageChange(values?.ApplicantEntityVillage, 'ApplicantEntityPincode')
              }
            }, [values?.ApplicantEntityVillage]);
            // Setting Up Running ITI 

            return (
              <>
                <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, setFieldError, setFieldTouched }}>
                  <ContextMap.Stage1Form.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur, setFieldError, setFieldTouched }} >

                    <Card className="custom-card shadow">
                      <Card.Header>
                        <div className="card-title" style={{ textTransform: "none" }}>
                          Select Affiliation Category
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col as={Col} md={6}>
                            <strong>Affiliation Category:</strong>
                            <ul className="bullet-list">
                              <li>{catInfo?.catInfo?.cat_name}</li>
                            </ul>
                          </Col>
                          {catInfo?.SubCatInfo?.length > 0 && (<Col as={Col} md={6}>
                            <strong>Affiliation Sub Category:</strong>
                            {
                              catInfo?.SubCatInfo?.length > 0 ? (
                                <ul>
                                  {catInfo?.SubCatInfo?.map((obj, index) => {
                                    const catName = obj?.sub_cat_info?.cat_name;
                                    const isEmphasized = catName && (catName.includes("Special") || catName.includes("Premium")); // Condition for emphasis
                                    return (
                                      <li key={index} className={isEmphasized ? "emphasized" : ""}>
                                        {catName}
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <div>No subcategories available</div>
                              )
                            }
                          </Col>)}

                        </Row>
                      </Card.Body>
                    </Card>


                    <Card className="custom-card shadow">
                      <Card.Header>
                        <div
                          className="card-title"
                          style={{ textTransform: "none" }}
                        >
                          Basic Details of Applicant Entity
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Form ref={formRef2} onSubmit={handleSubmit}>

                          <Row className="mb-3">
                            <Col as={Col} md={4}>
                              <TextField label="Name of Applicant Entity" name="name_of_applicant_entity" type="text" mandatory contextName="Stage1Form" size="lg" />
                            </Col>
                          </Row>
                            <hr/>
                            
                           {/* Address Part Starts Here */}
                          <Row className="mb-3">
                            <Col md={12}>
                              <h6> Address of Applicant Entity{""} <span style={{ color: "red" }}>* {`(This Information is as per LGD)`}</span>  </h6>
                              <hr />
                            </Col>
                            <Col md={12}>
                              <Row className="mb-3">
                                {/* states */}
                                <Col md="4">
                                  <SelectField
                                    label="Applicant Entity State"
                                    name="ApplicantEntityState"
                                    mandatory
                                    options={states}
                                    contextName="Stage1Form"
                                    onValueChange={(val) => OnApplicantEntityStateChange(val, 'ApplicantEntityDistrict')}
                                    valueProp="stateCode"
                                    labelProp="stateNameEnglish"
                                    size="lg"
                                  />
                                </Col>

                                {/* districts */}
                                <Col md="4">
                                  <SelectField
                                    label="Applicant Entity District"
                                    name="ApplicantEntityDistrict"
                                    mandatory
                                    // options={district}
                                    options={districtsList['ApplicantEntityDistrict'] || []} // row-specific districts
                                    contextName="Stage1Form"
                                    onValueChange={(val) => OnApplicantEntityDistrictChange(val, 'ApplicantEntitySubDistrict')}
                                    valueProp="districtCode"
                                    labelProp="districtNameEnglish"
                                    size="lg"
                                  />
                                </Col>

                                {/* subdistrict */}
                                <Col md={4}>
                                  <SelectField
                                    label="Applicant Entity Sub-District"
                                    name="ApplicantEntitySubDistrict"
                                    mandatory
                                    options={subDistrictsList['ApplicantEntitySubDistrict'] || []} // row-specific districts
                                    contextName="Stage1Form"
                                    onValueChange={(val) => ApplicantEntitySubDistrict(val, 'ApplicantEntityVillage')}
                                    valueProp="subdistrictCode"
                                    labelProp="subdistrictNameEnglish"
                                    size="lg"
                                  />
                                </Col>

                                {/* city/town */}
                                <Col md={4}>
                                  <TextField label="Applicant Entity Town/City" name="ApplicantEntityTown_City" type="text" mandatory contextName="Stage1Form" size="lg" />
                                </Col>

                                <Col md={4}>
                                  <TextField label="Applicant Entity Block" name="ApplicantEntityAddressBlock" type="text" contextName="Stage1Form" size="lg" />
                                </Col>

                                {/* village */}
                                <Col md={4}>
                                  <SelectField
                                    label="Applicant Entity Village"
                                    name="ApplicantEntityVillage"
                                    mandatory
                                    options={villageList['ApplicantEntityVillage'] || []} // row-specific districts
                                    contextName="Stage1Form"
                                    onValueChange={(val) => {
                                      console.log("Selected State:", val);
                                      onApplicantEntityVillageChange(val, 'ApplicantEntityPincode');
                                    }}
                                    valueProp="villageCode"
                                    labelProp="villageNameEnglish"
                                    size="lg"
                                  />
                                </Col>

                                {/* pincode */}
                                <Col md={4}>
                                  <TextField disabled label="Applicant Pincode Number" name="ApplicantEntityPincode" type="text" mandatory contextName="Stage1Form" size="lg" />
                                </Col>

                                <Col md={4}>
                                  <TextField label="Applicant Entity Plot Number/Khasara Number" name="ApplicantEntityPlotNumber_KhasaraNumber_GataNumber" type="text" mandatory contextName="Stage1Form" size="lg" />
                                </Col>

                                <Col md={4}>
                                  <TextField label="Applicant Entity Landmark" name="ApplicantEntityLandmark" type="text" mandatory contextName="Stage1Form" size="lg" />
                                </Col>

                              </Row>
                            </Col>
                          </Row>


                          {/* ///////// */}


                          {true && (
                            <Row className="mb-3">
                              <Col md="4">
                                <SelectField2
                                  label="Category of Applicant Entity"
                                  name={`category`}
                                  mandatory
                                  options={st1form?.new_app_cat_list}
                                  size="lg"
                                  FormContext={FormContext}
                                  valueProp="value"
                                  labelProp="label"
                                />
                              </Col>
                              <Col md={12} style={{ marginTop: "10px" }}>
                                <IDProofOfAuthorizedSignatory FormContext={FormContext} />
                              </Col>
                            </Row>)}


                          

                         

                          <Row className="mb-3">
                            <Col md={6}>
                              <EmailWithVerifyButton
                                label="Email ID"
                                filedName="ApplicantEntityEmailId"
                                verifyFieldName="isApplicantEntityEmailIdVerified"
                                mandatory={true}
                                size="lg"
                                showVerifyButton={true}
                                onVerify={(email) => console.log("Verifying email:", email)}
                                FormContext={FormContext} // Make sure to pass Formik's context here
                              />
                            </Col>

                            <Col md={6}>
                              <MobileWithVerifyButton
                                label="Contact Number"
                                filedName="ApplicantContactNumber"
                                verifyFieldName="isApplicantEntityMobileNumberVerified"
                                mandatory={true}
                                size="lg"
                                showVerifyButton={true}
                                FormContext={FormContext}
                              />


                            </Col>
                            {/* <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom02"
                            >
                              <TextField label="Applicant Contact Number"
                                name="ApplicantContactNumber"
                                type="text"
                                mandatory
                                contextName="Stage1Form"
                                size="lg"
                                onValueChange={(value, event) => {
                                  //Remove all non-digits and limit to 10 characters
                                  const sanitized = value.replace(/\D/g, "").slice(0, 10);
                                  // Update the input value (prevents typing beyond 10 digits)
                                  event.target.value = sanitized;
                                  setFieldValue("ApplicantContactNumber", sanitized);
                                  console.log(sanitized);

                                  // Run validation only on sanitized value
                                  validationLayer2(sanitized);
                                }}
                                showVerifyButton={true}
                                onVerify={(val) => verifyMobileOtp(val)}
                              />
                            </Form.Group> */}
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                    {[
                      "Society / Trust",
                      "Private Limited Company",
                      "Public Limited Company",
                      "Public Sector Undertaking",
                    ].includes(values?.category) && (
                        <Row className="mb-3">
                          <Col md="12">
                            <Card className="border border-info custom-card">
                              <Card.Body>
                                <Row className="mb-3">
                                  <Form.Group>
                                    <Form.Label>
                                      Is the Applicant Running Any Other ITI?
                                      <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <div>
                                      <Form.Check
                                        inline
                                        type="radio"
                                        label="Yes"
                                        name="Is_the_applicant_running_any_other_iti"
                                        value="yes"
                                        onChange={handleChange}
                                        checked={
                                          values.Is_the_applicant_running_any_other_iti ===
                                          "yes"
                                        }
                                        isInvalid={
                                          touched.Is_the_applicant_running_any_other_iti &&
                                          !!errors.Is_the_applicant_running_any_other_iti
                                        }
                                      />
                                      <Form.Check
                                        inline
                                        type="radio"
                                        label="No"
                                        name="Is_the_applicant_running_any_other_iti"
                                        value="no"
                                        onChange={handleChange}
                                        checked={
                                          values.Is_the_applicant_running_any_other_iti ===
                                          "no"
                                        }
                                        isInvalid={
                                          touched.Is_the_applicant_running_any_other_iti &&
                                          !!errors.Is_the_applicant_running_any_other_iti
                                        }
                                      />
                                    </div>

                                    {touched.Is_the_applicant_running_any_other_iti &&
                                      errors.Is_the_applicant_running_any_other_iti && (
                                        <Form.Control.Feedback
                                          type="invalid"
                                          style={{ display: "block" }}
                                        >
                                          {
                                            errors.Is_the_applicant_running_any_other_iti
                                          }
                                        </Form.Control.Feedback>
                                      )}
                                  </Form.Group>
                                </Row>
                                {/* RUNNING ITI LIST */}
                                {values.Is_the_applicant_running_any_other_iti ===
                                  "yes" && (

                                    <>
                                      <Form.Group as={Col} md={12}>
                                        <label className="form-label">
                                          If Yes, Please Provide Details of the
                                          ITI
                                        </label>
                                      </Form.Group>
                                      <FieldArray name="runningITIs">
                                        {({ push, remove }) => (
                                          <div>
                                            <Table bordered hover>
                                              <thead>
                                                <tr>
                                                  <th>#</th>
                                                  <th>Provide details of applicant running any other ITI<span style={{ color: "red" }}>*</span></th>
                                                  <th>Action</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {values.runningITIs.map((doc, index) => {
                                                  // get already selected designations
                                                  return (
                                                    <tr key={index} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "10px", }} >
                                                      <td>{index + 1}</td>
                                                      <td>
                                                        <Row style={{ marginTop: '5px' }}>
                                                          {false && (
                                                            <Col md={3}>
                                                              <TextField mandatory label="Affiliation Number" name={`runningITIs[${index}].run_AffiliationNo`} type="text" contextName="Stage1Form" size="lg" />
                                                            </Col>
                                                          )}
                                                          <Col md={6}>
                                                            <TextField mandatory label="ITI Name" name={`runningITIs[${index}].run_ITIName`} type="text" contextName="Stage1Form" size="lg" />
                                                          </Col>
                                                          <Col md={6}>
                                                            <TextField mandatory label="MIS Code" name={`runningITIs[${index}].run_MISCode`} type="text" contextName="Stage1Form" size="lg" />
                                                          </Col>
                                                          {
                                                            false && (<Col md="3">
                                                              <SelectField
                                                                mandatory
                                                                size="lg"
                                                                label="State"
                                                                name={`runningITIs[${index}].run_State`}
                                                                options={states}
                                                                contextName="Stage1Form"
                                                                onValueChange={(val) => OnRunItiStateChange(val, index)}
                                                                valueProp="stateCode"
                                                                labelProp="stateNameEnglish"
                                                              />
                                                            </Col>)
                                                          }
                                                        </Row>
                                                        {false && (
                                                          <Row style={{ marginTop: '5px' }}>
                                                            <Col md="3">
                                                              <SelectField
                                                                mandatory
                                                                size="lg"
                                                                label="District"
                                                                name={`runningITIs[${index}].run_District`}
                                                                options={runItiDistrictsList[index] || []}
                                                                contextName="Stage1Form"
                                                                onValueChange={(val) => OnRunItiDistrictChange(val, index)} v
                                                                valueProp="districtCode"
                                                                labelProp="districtNameEnglish" />
                                                            </Col>
                                                            <Col md={3}>
                                                              <SelectField
                                                                mandatory
                                                                size="lg"
                                                                label="Sub-District"
                                                                name={`runningITIs[${index}].run_SubDistrict`}
                                                                options={runItiSubDistrictsList[index] || []}
                                                                contextName="Stage1Form"
                                                                onValueChange={(val) => OnRunItiSubDistrictChange(val, index)}
                                                                valueProp="subdistrictCode"
                                                                labelProp="subdistrictNameEnglish"
                                                              />
                                                            </Col>
                                                            <Col md={3}>
                                                              <SelectField
                                                                mandatory
                                                                size="lg"
                                                                label="Village"
                                                                name={`runningITIs[${index}].run_Village`}
                                                                options={runItiVillageList[index] || []}
                                                                contextName="Stage1Form"
                                                                onValueChange={(val) => OnRunItiVillageChange(val, index)}
                                                                valueProp="villageCode"
                                                                labelProp="villageNameEnglish"
                                                              />
                                                            </Col>
                                                            <Col md={3}>
                                                              <TextField label="Town/City" name={`runningITIs[${index}].run_TownCity`} type="text" mandatory contextName="Stage1Form" size="lg" />
                                                            </Col>
                                                          </Row>
                                                        )}

                                                        {false && (
                                                          <Row style={{ marginTop: '5px' }}>
                                                            <Col md={4}>
                                                              <TextField disabled label="Pincode" name={`runningITIs[${index}].run_Pincode`} type="text" mandatory contextName="Stage1Form" size="lg" />
                                                            </Col>
                                                            <Col md={4}>
                                                              <TextField label="Plot Number/Khasara Number" name={`runningITIs[${index}].run_PlotNumber_KhasaraNumber`} type="text" mandatory contextName="Stage1Form" size="lg" />
                                                            </Col>
                                                            <Col md={4}>
                                                              <TextField label="Landmark" name={`runningITIs[${index}].run_Landmark`} type="text" mandatory contextName="Stage1Form" size="lg" />
                                                            </Col>
                                                          </Row>
                                                        )}
                                                      </td>
                                                      <td>
                                                        {/* Remove Button */}
                                                        {values.runningITIs.length > 1 && (
                                                          <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                                        )}
                                                      </td>
                                                    </tr>)
                                                })}

                                                <tr>
                                                  <td colSpan={3}>
                                                    {values.runningITIs.length >= 1 && (
                                                      <div className="d-flex justify-content-end">
                                                        <Button onClick={() =>
                                                          push({
                                                            run_AffiliationNo: "",
                                                            run_ITIName: "",
                                                            run_MISCode: "",
                                                            run_State: "",
                                                            run_District: "",
                                                            run_SubDistrict: "",
                                                            run_Village: "",
                                                            run_TownCity: "",
                                                            run_Pincode: "",
                                                            run_PlotNumber_KhasaraNumber: "",
                                                            run_Landmark: "",
                                                          })
                                                        }>
                                                          Add More
                                                        </Button>
                                                      </div>
                                                    )}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </div>
                                        )}
                                      </FieldArray>
                                    </>
                                  )}
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      )}
                  </ContextMap.Stage1Form.Provider>
                </FormContext.Provider>
              </>
            )
          }}
        </Formik>
      )}
      <Navigations nav={nav} onNext={() => { onNext(); }} />
    </Fragment>
  );
};
BasicDetailsofApplicantOrganization.propTypes = {
  setActive: PropTypes.func.isRequired,
};
export default BasicDetailsofApplicantOrganization;

export const Assessment_Basic_Detail = ({ isView = false, nav }) => {
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
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Proceed",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Okay, Proceed",
      cancelButtonText: "Cancel",
    });
    if (confirmResult.isConfirmed) {
      try {
        // Set Flow if not exist
        // await setStageIAssessmentFlow(appId);
        // Mark as Complete this Step
        // await markAsCompleteStageAssessmentFlow(appId, C.ST1FC.APPLICANT_ENTITY_DETAILS.step);
        ////////////////////////////// API WRITTTEN BELOW

        // console.log(nav);
        // return;
        await st.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.APPLICANT_ENTITY_DETAILS.step, assessmentInfo.assessment_id, nav.step.slno);
        const result = await Swal.fire(
          "Saved!",
          "Your form data has been saved.",
          "success"
        );
        if (result.isConfirmed) {
          nav.next();
        }
        // window.location.reload();
      } catch (err) {
        console.error("Error while saving:", err);
      }
      return;
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
      <Row style={{ backgroundColor: "rgb(245, 245, 245)", margin: "10px 0px 0px", borderRadius: 6, borderStyle: "dashed", borderWidth: "thin", padding: "2px", }}
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
        <Navigations nav={nav} onNext={() => { onNext(); }} />
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
