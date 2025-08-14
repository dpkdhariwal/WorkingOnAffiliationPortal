import { Fragment, useRef, useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, ListGroup, Alert, InputGroup, Modal } from "react-bootstrap";

import PropTypes from "prop-types";

import { useContext } from "react";
import { FormikHelpersContext } from "../FormikContext"; // adjust path

export const ApplicantAddressPincode = ({ values, touched, errors, handleChange }) => {
  return (
    <>
      <Form.Label>
        Applicant Entity Pincode{" "}
        <span style={{ color: "red" }}>*</span>
      </Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          required
          type="text"
          inputMode="numeric"
          pattern="\d*"
          name="ApplicantEntityPincode"
          placeholder="Enter Pincode"
          value={values.ApplicantEntityPincode}
          onChange={(e) => {
            // Keep only digits and limit to 10 characters
            const cleanedValue = e.target.value.replace(/\D/g, "").slice(0, 6);
            handleChange({
              target: {
                name: e.target.name,
                value: cleanedValue,
              },
            });
          }}
          isInvalid={
            touched.ApplicantEntityPincode && !!errors.ApplicantEntityPincode
          }
        />
        {/* <Button onClick={verifyEmail} variant="primary" id="button-addon2"> Verify </Button> */}
        {touched.ApplicantEntityPincode &&
          errors.ApplicantEntityPincode && (
            <Form.Control.Feedback type="invalid">
              {errors.ApplicantEntityPincode}
            </Form.Control.Feedback>
          )}
      </InputGroup>
    </>
  );
};
ApplicantAddressPincode.propTypes = {
  setActive: PropTypes.func.isRequired,
};


