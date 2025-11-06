import { useContext, useEffect, useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import * as C from "affserver";

// Utility: debounce function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const EmailWithVerifyButtonTwo = ({
  type = "text",
  label,
  filedName, // Keeping your key naming as in form context
  verifyFieldName,
  mandatory = false,
  placeholder = "",
  size = "md",
  showVerifyButton = false,
  onVerify,
  disabled = false,
  FormContext,
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setFieldError,
    setFieldTouched,
  } = useContext(FormContext);

  const [toVerifyButton, setToVerifyButton] = useState(false);

  const vfieldValue = values[verifyFieldName] || "";
  const fieldValue = values[filedName] || "";
  const fieldError = errors[filedName];
  const fieldTouched = touched[filedName];

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Debounced validation
  const debouncedValidate = useCallback(
    debounce((name, value) => {
      if (emailRegex.test(value)) {
        setFieldError(name, null);
        if (!vfieldValue) {
          setToVerifyButton(true);
        }
      } else {
        setFieldError(name, "Invalid email format");
        setToVerifyButton(true);
        setFieldValue(verifyFieldName, false);
      }
    }, 400),
    [verifyFieldName, vfieldValue]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update Formik’s value
    setFieldValue(name, value);
    handleChange(e);
    setFieldTouched(name, true, true);

    // Debounce validation
    debouncedValidate(name, value);
  };

  const handleVerifyClick = (e) => {
    e.preventDefault();
    verifyMobileOtp(fieldValue)
  };

  useEffect(() => {
    if (vfieldValue === true) setToVerifyButton(false);
  }, [vfieldValue]);


  const verifyMobileOtp = async (mobile) => {
    const { value: otp } = await Swal.fire({
      title: "Verify OTP",
      input: "text",          // input type
      // inputLabel: "OTP Code",
      inputPlaceholder: "Verify OTP",
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
      setFieldValue(verifyFieldName, true);

    } else {
      console.log("User cancelled OTP input");
      // setOtpSent(false);
    }
  }
  return (
    <Form.Group>
      <Form.Label>
        {label} {mandatory && <span style={{ color: "red" }}>*</span>}
      </Form.Label>

      <InputGroup>
        <Form.Control
          disabled={vfieldValue == true}
          size={size}
          required={mandatory}
          type={type}
          name={filedName}
          placeholder={placeholder || label}
          value={fieldValue}
          onChange={handleInputChange}
          isInvalid={!!fieldError}
          isValid={!fieldError && fieldValue}
        />

        {/* Button logic */}
        {console.log(vfieldValue, showVerifyButton, toVerifyButton )}
        {vfieldValue === true ? (
          <>
            <Button variant="success" disabled>
              Verified
            </Button>
            <Button variant="danger" disabled={false} onClick={() => {
              setFieldValue(verifyFieldName, false);
            }}>
              Change
            </Button>
          </>
        ) : (
          showVerifyButton &&
          toVerifyButton && (
            <Button variant="danger" onClick={handleVerifyClick}>
              Verify
            </Button>
          )
        )}

        {/* Validation feedback */}
        {fieldError && (
          <Form.Control.Feedback type="invalid">
            {fieldError}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};

// PropTypes
EmailWithVerifyButtonTwo.propTypes = {
  label: PropTypes.string.isRequired,
  filedName: PropTypes.string.isRequired,
  verifyFieldName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  showVerifyButton: PropTypes.bool,
  onVerify: PropTypes.func,
  disabled: PropTypes.bool,
  FormContext: PropTypes.object.isRequired,
};

// Defaults
EmailWithVerifyButtonTwo.defaultProps = {
  mandatory: false,
  type: "text",
  placeholder: "",
  size: "md",
  showVerifyButton: true,
  disabled: false,
};
