import { Modal, Row, Col, Card, Form, InputGroup, Button, Table, Form as BForm } from "react-bootstrap";

import React, { createContext, useRef, useContext, Fragment, useState, useEffect, startTransition } from "react";


import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"

import Pageheader from "../../layouts/Pageheader";
import { Stepper, Step } from "react-form-stepper";

import { Assessment_Basic_Detail } from "../new_registration/form/stegeI/BasicDetailsofApplicantOrganization";

import { Name_of_the_institute } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/name_of_the_institute";

import { AddressOfInstitute } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/view/Address_of_Institute";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import ReqSign from "../new_registration/form/comp/requiredSign"; // Make sure this component exists and is exported correctly
// import {, OverlayTrigger, Popover, Row, Tooltip } from 'react-bootstrap';

import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { setAppFlow } from "../../db/users";
import { NOC_ISSUANCE } from "affserver";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import * as C from "affserver";
import SwalManager from "../../common/SwalManager";

import * as gen from "../../services/general/index";

import * as st from "../../services/state/index";


import { useTranslation } from 'react-i18next';

export const NocGenerateForm = () => {
  const reg = useSelector((state) => state.reg);
  const [activeStep, setActiveStep] = useState(reg.steps[0]);

  const AppliInfo = useSelector((state) => state.AppliInfo);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    console.log(activeStep);
  }, [reg]);

  const goToSection = (step, index = null) => {
    setActiveStep(step);
  };


  const confirm = () => {
    console.log("COnfirm");
  }

  const registry = useRef([]); // store all child functions
  const register2 = (index, obj) => {
    registry.current[index] = obj;
  };


  const handleAllSubmit = async () => {
    // const confirmed = await SwalManager.confirmSave();
    // if (!confirmed) return;

    const data = registry.current['SubmitNocForm'];
    // now SubmitNocForm is your item

    let info = data();
    let resp = await info.submitNow();
    console.log(resp);
    // try {
    //   SwalManager.showLoading("Saving...");
    //   await new Promise(res => setTimeout(res, 1)); // Simulated API call
    //   SwalManager.hide();

    //   let keyName, data;

    //   console.log(registry);

    //   for (const [key, val] of Object.entries(registry.current)) {
    //     keyName = key;
    //     data = val();
    //     switch (keyName) {
    //       case 'SubmitNocForm':
    //         {
    //           let result = await data.submitNow();
    //           console.log(result);
    //         }
    //         break;
    //       default:
    //         throw new Error("Function Key not Matched");
    //         break;
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    //   SwalManager.hide();
    //   await SwalManager.error("Please Fill the Forms");
    // }
  };



  return (
    <Fragment>
      <Pageheader
        mainheading={`Generate NOC`}
        parentfolder="Dashboard"
        activepage="Generate NOC"
      />
      <FunctionRegistryContext.Provider value={register2}>
        <Card className="custom-card shadow">
          <Card.Header>
            <div className="card-title" style={{ textTransform: "none" }}>
              Generate NOC
            </div>
          </Card.Header>
          <Card.Body>
            <NocForm />
            <br />
            <ShiftUnitIssuingForm />
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between mb-3">
              {/* <Button
              className="p-2"
              variant="warning">
              Go Back
            </Button> */}

              <Button
                className="p-2"
                variant="danger">
                Reject NOC
              </Button>

              <Button
                className="p-2"
                variant="success"
                onClick={handleAllSubmit}
              >
                Generate NOC Now
              </Button>
              {/* <ConfirmBox
                show={modalShow}
                onHide={() => setModalShow(false)}
              /> */}
            </div>
          </Card.Footer>
        </Card>
      </FunctionRegistryContext.Provider>


    </Fragment>
  );
};


export const NocForm = () => {

  return (
    <>
      <table
        width="98%"
        border={1}
        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
        align="center"
        cellPadding="5px"
      >
        <tbody>
          <tr>
            <td colSpan={7} style={{ border: "1px solid black" }}><b>Affiliation Category</b></td>
          </tr>
          <tr>
            <td style={{ colSpan: 2 }}><b>Category:</b> <span>Application from Existing ITIs</span> </td>
            <td><b>Sub Category:</b> <span>Addition of New Trades/Units</span> </td>
          </tr>
        </tbody>
      </table>
      <table
        width="98%"
        border={1}
        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
        align="center"
        cellPadding="5px"
      >
        <tbody>
          <tr>
            <td colSpan={7} style={{ border: "1px solid black" }}><b>Applicant Entity Details</b></td>
          </tr>
          <tr>
            <td style={{ colSpan: 2 }}><b>Category of Applicant Entity:</b> <span>Cat 1</span> </td>
            <td><b>Name of Applicant Entity:</b> <span>Deepak Dhariwal</span> </td>
          </tr>
        </tbody>
      </table>
      <table
        width="98%"
        border={1}
        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
        align="center"
        cellPadding="5px"
      >
        <tbody>
          <tr>
            <td colSpan={7} style={{ border: "1px solid black" }}><b>Address of Applicant Entity</b></td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th style={{ border: "1px solid black" }}>Applicant Entity State</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity District</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Town/City</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Block/Tehsil</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
          </tr>

          <tr style={{ border: "1px solid black" }}>
            <th style={{ border: "1px solid black" }}>Applicant Entity Sector/Village</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Pincode</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Plot Number/Khasara Number/Gata Number</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Landmark</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
          </tr>

          <tr style={{ border: "1px solid black" }}>
            <th style={{ border: "1px solid black" }} colSpan={2}>Applicant Entity Email Id</th>
            <th style={{ border: "1px solid black" }} colSpan={2}>Applicant Contact Number</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }} colSpan={2}>value 1</td>
            <td style={{ border: "1px solid black" }} colSpan={2}>value 1</td>
          </tr>
        </tbody>
      </table>
    </>
  )

}

export const ShiftUnitIssuingForm = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const [tradeList, setTradeList] = useState([]);

  const [iniValue, setIniValue] = useState({});
  const [iniValObj, setIniValObj] = useState(Yup.object().shape({}));
  const [confirm, setConfirm] = useState(false);



  const formRef = useRef();
  const register = useFunctionRegistry();
  const formFunction = () => { register(`SubmitNocForm`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);

  const submitNow = async () => {
    return await form();
  }
  const form = async () => {
    // const errors = await formRef.current.validateForm();
    // console.log(errors);
    if (formRef.current.isValid) {

      const confirmed = await SwalManager.confirmSave();
      if (!confirmed) return;
      try {
        setConfirm(true);
        // SwalManager.showLoading("Saving...");
        // await new Promise(res => setTimeout(res, 1)); // Simulated API call
        // SwalManager.hide();

      } catch (error) {
        console.log(error);
        SwalManager.hide();
        await SwalManager.error("Something Went Wrong");
      }

      return true;
    }
    else {
      return false;
    }
  }

  const loadData = async () => {
    try {
      let resp;
      resp = await gen.getTradeUnitsInfo(appId);
      setTradeList(resp.data);
      let r1 = await prepare_initialValues(resp.data);
      let r2 = await validationSchema(resp.data);
      setIniValue(r1);
      setIniValObj(r2);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    loadData();
  }, []);



  const prepare_initialValues = async (tradeList) => {
    const obj = {
      ...Object.fromEntries(
        tradeList.map((item, index) => {
          const { shift1Noc } = getSetFieldsName(item, index);
          return [`${shift1Noc}`, '10'];
        })
      ),
      ...Object.fromEntries(
        tradeList.map((item, index) => {
          const { shift2Noc } = getSetFieldsName(item, index);
          return [`${shift2Noc}`, '10']
        })
      )
    };
    return obj;
  }

  const validationSchema = (tradeList) => {
    console.log(tradeList);
    let obj = {
      ...Object.fromEntries(
        tradeList.map((item, index) => {
          const { shift1Noc } = getSetFieldsName(item, index);
          return [
            `${shift1Noc}`,
            Yup.number().required("Enter Number").min(0, "Number Must be positive"),
          ];
        })
      ),
      ...Object.fromEntries(
        tradeList.map((item, index) => {
          const { shift2Noc } = getSetFieldsName(item, index);
          return [
            `${shift2Noc}`,
            Yup.number().required("Enter Number").min(0, "Number Must be positive"),
          ];
        })
      ),
    };
    return Yup.object().shape(obj);
  }

  const getSetFieldsName = (item, index) => {
    const shift1Noc = `trade>${item.tradeId}>>shift1>${index}`;
    const shift2Noc = `trade>${item.tradeId}>>shift2>${index}`;
    const shift3Noc = `trade>${item.tradeId}>>shift3>${index}`;
    return { shift1Noc, shift2Noc, shift3Noc };
  }


  useEffect(() => {
    console.log(iniValue);
    console.log(iniValObj);
  }, [iniValue, iniValObj])


  const generateNocNow = async () => {
    setConfirm(false);

    const confirmResult = await Swal.fire({ title: "Are you sure?", text: "Do you want to Proceed", icon: "question", showCancelButton: true, confirmButtonText: "Okay, Proceed", cancelButtonText: "Cancel", });
    if (confirmResult.isConfirmed) {
      try {
        await st.generateNoc(appId);
        const result = await Swal.fire("Saved!", "NOC Has Been Generated, Go to View", "success");
        if (result.isConfirmed) {
          window.location.href = "https://affiliation.dgt.gov.in/affliation_portal_all_documents/sample/noc/No-Objection-Certificate.pdf";
        }
        // window.location.reload();
      } catch (err) {
        console.error("Error while saving:", err);
      }
      return;
    }


    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "Do you want to Generate NOC",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes, Generate Now!",
    //   cancelButtonText: "Cancel",
    //   // 👇 force Swal above other modals
    //   zIndex: 99999,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     // User confirmed – now show loading or save directly
    //     Swal.fire({
    //       title: "Saving...",
    //       didOpen: () => {
    //         Swal.showLoading();
    //         setAppFlow(appId, NOC_ISSUANCE);
    //         Swal.close();
    //       },
    //     });
    //   } else {
    //     console.log("User cancelled save");
    //   }
    // });
  }


  return (
    <>
      <Formik
        initialValues={iniValue}
        validationSchema={validationSchema(tradeList)}
        innerRef={formRef}
        enableReinitialize
        validateOnBlur={true}
        validateOnChange={true} // Enable validation on every field change
        validateOnMount={true}

      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
          <FormikForm onSubmit={handleSubmit}>
            <table style={{ width: "98%" }} className="custom-table">
              <thead>
                <tr>
                  <th className="text-center">Trade Name</th>
                  <th className="text-center">Applied in Shift 1</th>
                  <th className="text-center">Issued NOC<ReqSign /></th>
                  <th className="text-center">Applied in Shift 2</th>
                  {/* <th>Issued NOC<ReqSign /></th>
                <th>Applied in Shift 3</th> */}
                  <th className="text-center">Issued NOC<ReqSign /></th>
                </tr>
              </thead>
              <tbody>
                {tradeList.map((item, index) => {
                  const { shift1Noc, shift2Noc } = getSetFieldsName(item, index);
                  return (
                    <tr key={index}>
                      <td className="text-left">{item.trade}</td>
                      <td className="text-center">{item.unit_in_shift1}</td>
                      <td>
                        <Form.Group >
                          <Field
                            as={Form.Control}
                            type="number"
                            name={shift1Noc}
                            required
                            isInvalid={touched[shift1Noc] && !!errors[shift1Noc]}
                            isValid={touched[shift1Noc] && !errors[shift1Noc]} // ✅ add this

                            placeholder="Enter Number"
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid" className="d-block">
                            {errors[shift1Noc]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                      <td className="text-center">{item.unit_in_shift2}</td>
                      <td>
                        <Form.Group >
                          <Field
                            as={Form.Control}
                            type="number"
                            name={shift2Noc}
                            required
                            isInvalid={touched[shift2Noc] && !!errors[shift2Noc]}
                            isValid={touched[shift2Noc] && !errors[shift2Noc]} // ✅ add this
                            placeholder="Enter Number"
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid" className="d-block">
                            {errors[shift2Noc]}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </FormikForm>
        )}
      </Formik>
      <NocConfirmation
        show={confirm}
        onHide={() => setConfirm(false)}
        generateNocNow={generateNocNow}
      />
    </>

  );
};

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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const generateNocNow = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Generate NOC",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Generate Now!",
      cancelButtonText: "Cancel",
      // 👇 force Swal above other modals
      zIndex: 99999,
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed – now show loading or save directly
        Swal.fire({
          title: "Saving...",
          didOpen: () => {
            Swal.showLoading();
            setAppFlow(appId, NOC_ISSUANCE);
            Swal.close();
          },
        });
      } else {
        console.log("User cancelled save");
      }
    });
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h6">
          Generate NOC Now
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* className="mt-5" */}
        <div >
          <h3 className="mb-3">
            Creative <span className="text-primary">Design</span> for a
            Bright Future.
          </h3>
          <p>
            There are many variations of passages of Lorem Ipsum
            available, but the majority have suffered by injected humour,
            or randomised words which don't look even slightly believable.
          </p>
          <p>
            All the Lorem Ipsum generators on the Internet tend to repeat
            Various versions have evolved over the years, sometimes by
            accident, sometimes on purpose (injected humour and the like).
          </p>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classNameical Latin
            literature from 45 BC, making it over 2000 years old.
          </p>
          {/* <Link to="#" className="btn ripple btn-primary btn-sm" role="button">Contact Us</Link> */}
        </div>

        <Form.Label className="mt-3">Enter OTP Received on Email</Form.Label>
        {renderOtpInputs(emailOtp, setEmailOtp, emailOtpRefs, setEmailOtpComplete)}
        <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
          {emailTimer > 0 ? `New OTP will be generated after ${emailTimer}s` : ""}
        </div>
        <Form.Label className="mt-3">Enter OTP Received on Mobile</Form.Label>
        {renderOtpInputs(emailOtp, setEmailOtp, emailOtpRefs, setEmailOtpComplete)}
        <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
          {emailTimer > 0 ? `New OTP will be generated after ${emailTimer}s` : ""}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={generateNocNow}>Generate NOC Now</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const ConfirmBox = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Button variant="success" onClick={() => setModalShow(true)}>
        Save & Next
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}


const NocConfirmation = (props) => {

  const { t } = useTranslation();

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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h6">
          {t(`NOC_FORM.titleBar`)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* className="mt-5" */}
        <div >
          <h3 className="mb-3">
            {t(`NOC_FORM.title`)}
          </h3>
          <p>
            {t(`NOC_FORM.msg`)}
          </p>
        </div>

        <Form.Label className="mt-3">Enter OTP Received on Email</Form.Label>
        {renderOtpInputs(emailOtp, setEmailOtp, emailOtpRefs, setEmailOtpComplete)}
        <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
          {emailTimer > 0 ? `New OTP will be generated after ${emailTimer}s` : ""}
        </div>
        <Form.Label className="mt-3">Enter OTP Received on Mobile</Form.Label>
        {renderOtpInputs(emailOtp, setEmailOtp, emailOtpRefs, setEmailOtpComplete)}
        <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
          {emailTimer > 0 ? `New OTP will be generated after ${emailTimer}s` : ""}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={() => { props.generateNocNow() }}>Generate NOC Now</Button>
      </Modal.Footer>
    </Modal>
  );
}

