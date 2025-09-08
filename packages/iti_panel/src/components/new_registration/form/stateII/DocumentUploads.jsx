import { Fragment, useEffect } from "react";
import React, { useState, useRef } from "react";

import List from "./component/list";

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Table,
  Modal
} from "react-bootstrap";
import Select from "react-select";

import { Formik, Field, FieldArray } from "formik";
import { Form as FormikForm, ErrorMessage } from "formik";

import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Stepper from "@keyvaluesystems/react-stepper";

import MTE from "./component/machinery_form";
import ReqSign from "../comp/requiredSign";

import { STAGE_II__FEE_PAID, STAGE_II__FEE_EXEMPTED } from "affserver";
import { useLocation } from "react-router-dom";

import { STAGE_II_DOCUMENT_UPLAOD } from "affserver";

import { setAppFlow } from "../../../../db/users";

const schema = yup.object().shape({
  land_documents: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Title is required"),
      language: yup.string().required("Language is required"),
      file: yup.mixed().required("File is required"),
    })
  ),
  lease_deed_document: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Title is required"),
      language: yup.string().required("Language is required"),
      file: yup.mixed().required("File is required"),
    })
  ),
});

export const Preference = [
  { value: "yes", label: "Yes" },
  { value: "No", label: "no" },
];

import { validationSchema } from "../../../../reducers/stageII_document_upload";

import {
  geo_tagged_photo_of_machinery_tools_equipments as docs1,
  gst_invoices_for_major_machinery_purchase_and_payment_proof as docs2,
  UPDATE_STAGE_II_DOCUMENT_UPLOAD,
} from "affserver";

const DocumentUploads = () => {
  const dispatch = useDispatch();

  const formikRef = useRef();

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
            dispatch({
              type: UPDATE_STAGE_II_DOCUMENT_UPLOAD,
              payload: values,
            });
            dispatch({ type: "set_filled_stepII", payload: { step: 5 } });
            dispatch({ type: "reg_set_active_stepII", payload: { step: 5 } });
            setActive(reg.steps[5]);
          },
        });
      } else {
        console.log("User cancelled save");
      }
    });
  };

  const initial_values = useSelector(
    (state) => state.stageII_document_Uploads_Reducer
  );

  const AppliInfo = useSelector((state) => state.AppliInfo);

  const submitNow = () => {
    formikRef.current?.submitForm()
  }
  return (
    <Fragment>
      {AppliInfo.stage_II_fee_status === STAGE_II__FEE_PAID || AppliInfo.stage_II_fee_status === STAGE_II__FEE_EXEMPTED ? (<DocumentUploadsView />) :

        <>
          <Formik
            innerRef={formikRef}
            initialValues={initial_values}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form Values", values);
              submit(values);
            }}
          >
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Card
                  className="custom-card border border-primary"
                  style={{ marginTop: "10px" }}
                >
                  <Card.Header>
                    <div className="card-title" style={{ textTransform: "none" }}>
                      Geo tagged photo of Machinery/Tools/Equipments (Single PDF
                      for each Unit)
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="table-responsive">
                      <Table className="text-nowrap ">
                        <thead>
                          <tr>
                            <th scope="col" style={{ textTransform: "none" }}>
                              Trade Name
                            </th>
                            <th scope="col" style={{ textTransform: "none" }}>
                              Unit
                            </th>
                            <th scope="col" style={{ textTransform: "none" }}>
                              Geo tagged photo <ReqSign />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {docs1.map((item, index) => {
                            const fileField = `${item.tradeId}_mte_geo_tagged_photo_${index}`;
                            return (
                              <tr key={index}>
                                <th scope="row">{item.tradeName}</th>
                                <td>1</td>
                                <td>
                                  {/* {fileField} */}

                                  <input
                                    type="file"
                                    name={fileField}
                                    className="form-control"
                                    onChange={(event) => {
                                      setFieldValue(
                                        fileField,
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                  <div className="text-danger">
                                    <ErrorMessage
                                      name={fileField}
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
                <Card
                  className="custom-card border border-primary"
                  style={{ marginTop: "10px" }}
                >
                  <Card.Header>
                    <div className="card-title" style={{ textTransform: "none" }}>
                      GST Invoices for Major Machinery Purchase and Payment proof
                    (Bill amount > Rs. 10,000)(single PDF for each Trade)
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="table-responsive">
                      <Table className="text-nowrap ">
                        <thead>
                          <tr>
                            <th scope="col" style={{ textTransform: "none" }}>
                              Trade Name
                            </th>
                            <th scope="col" style={{ textTransform: "none" }}>
                              Select GST Invoices for Major Machinery Purchase and
                            Payment proof (Bill amount > Rs. 10,000)(single PDF
                              for each Trade) <ReqSign />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {docs2.map((item, index) => {
                            const fileField = `${item.tradeId}_mte_gst_invoices_${index}`;

                            return (
                              <tr key={index}>
                                <th scope="row">{item.tradeName}</th>
                                <td>
                                  <input
                                    type="file"
                                    name={fileField}
                                    className="form-control"
                                    onChange={(event) => {
                                      setFieldValue(
                                        fileField,
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                  <div className="text-danger">
                                    <ErrorMessage
                                      name={fileField}
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>

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
                        <strike>{`Institute's self-declaration of compliance with Affiliation Norms and acknowledgment of responsibilities, as per Annexure-6`}</strike>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-end">
                    {/* <Button
                      onClick={() => formikRef.current?.submitForm()}
                      size="lg"
                      variant="success"
                      className="btn-wave"
                    >
                      Submit Application
                    </Button> */}

                  <ConfirmBox submitNow={submitNow} />
                    
                  </Card.Footer>
                </Card>
              </Form>
            )}
          </Formik>
        </>
      }


    </Fragment>
  );
};


export const DocumentUploadsView = (props) => {
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
            <th colSpan={7} style={{ border: "1px solid black" }}>Geo tagged photo of Machinery/Tools/Equipments (Single PDF for each Unit)</th>
          </tr>
          <tr>
            <th>#</th>
            <th style={{ border: "1px solid black" }}>Trade Name</th>
            <th style={{ border: "1px solid black" }}>Unit</th>
            <th style={{ border: "1px solid black" }}>Geo tagged photo</th>
          </tr>

          <tr>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>2</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>3</td>
            <td style={{ border: "1px solid black" }}>Fitter</td>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>4</td>
            <td style={{ border: "1px solid black" }}>Fitter</td>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
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
            <th colSpan={7} style={{ border: "1px solid black" }}>{`GST Invoices for Major Machinery Purchase and Payment proof (Bill amount > Rs. 10,000)(single PDF for each Trade)`}</th>
          </tr>
          <tr>
            <th>#</th>
            <th style={{ border: "1px solid black" }}>Trade Name</th>
            <th style={{ border: "1px solid black" }}>Document</th>
          </tr>

          <tr>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>2</td>
            <td style={{ border: "1px solid black" }}>Fitter</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>

        </tbody>
      </table>

    </>

  );
};


export default DocumentUploads;




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
const markascomplete = () => {
    setAppFlow(appId, STAGE_II_DOCUMENT_UPLAOD);

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
          Submit Stage-II Application
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* className="mt-5" */}
        <div >
          <h3 className="mb-3">
            Dear, <span className="text-primary">Applicant</span>
          </h3>
          <p>
            Your stage II application has been successfully completed. The Application will now be forwarded to the Concerned State Directorage for Assessment. One's submitted, You can not modify your application. You will be notified onces the evaluation is completed.
          </p>

        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={markascomplete}>Submit Now</Button>
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