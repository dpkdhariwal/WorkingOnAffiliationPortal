import { Fragment, useRef, useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, ListGroup, Alert, InputGroup, Modal } from "react-bootstrap";

import PropTypes from "prop-types";

import { useContext } from "react";
import { FormikHelpersContext } from "../FormikContext"; // adjust path

export const ApplicantEntityMobile = ({ values, touched, errors, handleChange }) => {



  return (
    <>
      <Form.Label>
        Applicant Contact Number{" "}
        <span style={{ color: "red" }}>*</span>
      </Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          required
          type="text"
          inputMode="numeric"
          pattern="\d*"
          name="ApplicantContactNumber"
          placeholder="Applicant Contact Number"
          value={values.ApplicantContactNumber}
          onChange={(e) => {
            // Keep only digits and limit to 10 characters
            const cleanedValue = e.target.value.replace(/\D/g, "").slice(0, 10);
            handleChange({
              target: {
                name: e.target.name,
                value: cleanedValue,
              },
            });
          }}
          isInvalid={
            touched.ApplicantContactNumber && !!errors.ApplicantContactNumber
          }
        />
        {/* <Button onClick={verifyEmail} variant="primary" id="button-addon2"> Verify </Button> */}
        <OTPBox />
        {touched.ApplicantContactNumber &&
          errors.ApplicantContactNumber && (
            <Form.Control.Feedback type="invalid">
              {errors.ApplicantContactNumber}
            </Form.Control.Feedback>
          )}
      </InputGroup>
    </>
  );
};

ApplicantEntityMobile.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export const OTPBox = () => {
  const [modalShow, setModalShow] = useState(false);
  const { values, errors } = useContext(FormikHelpersContext);

  console.log(errors.ApplicantContactNumber);

  const openOtpBox = () => {
    if (!values.ApplicantContactNumber) {
      setModalShow(true);
    }
  }

  return (
    <>
      <Button variant={values.isApplicantEntityMobileNumberVerified ? "success" : "danger"} onClick={openOtpBox}>
        {values.isApplicantEntityMobileNumberVerified ? "Verified" : "Verify"}
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /></>
  )
}
const renderOtpInputs = (otpArray, setOtpArray, refs, onComplete) => (
  <div className="d-flex justify-content-center flex-wrap gap-1 mt-2">
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
    {/* {otpArray.every((v) => v !== "") && (
      <span style={{ fontSize: "1.25rem", color: "green", marginLeft: "10px" }}>&#10004;</span>
    )} */}
  </div>
);
const MyVerticallyCenteredModal = (props) => {

  const [emailTimer, setEmailTimer] = useState(0);
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
  const emailOtpRefs = useRef([]);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [emailOtpComplete, setEmailOtpComplete] = useState(false);

  const { setFieldValue } = useContext(FormikHelpersContext);

  const verifyEmail = () => {
    setFieldValue("isApplicantEntityMobileNumberVerified", true); // ✅ updates Formik state
    props.onHide();
  }

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h6">
          Mobile OTP Verfication
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {renderOtpInputs(emailOtp, setEmailOtp, emailOtpRefs, setEmailOtpComplete)}
        <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
          {emailTimer > 0 ? `New OTP will be generated after ${emailTimer}s` : ""}
        </div>
      </Modal.Body>
      <Modal.Footer style={{ padding: '2px' }}>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={verifyEmail}>Verify</Button>
      </Modal.Footer>
    </Modal>
  );
}

