import { useContext, useEffect, useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { getIn } from "formik";
import * as C from "affserver";

// Utility: debounce function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const MobileWithVerifyButton = ({
  type = "text",
  label,
  filedName,
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
  const [mobileValid, setMobileValid] = useState(false);

  // ✅ Safe nested access
  const fieldValue = getIn(values, filedName) || "";
  const vfieldValue = getIn(values, verifyFieldName) || "";
  const fieldError = getIn(errors, filedName);
  const fieldTouched = getIn(touched, filedName);

  const mobileRegex = /^\d{10}$/; // Indian 10-digit mobile regex

  // ✅ Debounced validation
  const debouncedValidate = useCallback(
    debounce((name, value) => {
      if (mobileRegex.test(value)) {
        setFieldError(name, null);
        setMobileValid(true);
      } else {
        setFieldError(name, "Invalid mobile number");
        setMobileValid(false);
        setFieldValue(verifyFieldName, C.SL.NOT_VERIFIED);
      }
    }, 400),
    [verifyFieldName]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    handleChange(e);
    setFieldTouched(name, true, true);
    debouncedValidate(name, value);
  };

  const handleVerifyClick = (e) => {
    e.preventDefault();
    verifyMobileOtp(fieldValue);
  };

  const verifyMobileOtp = async (mobile) => {
    const { value: otp } = await Swal.fire({
      title: "Verify OTP",
      input: "text",
      inputPlaceholder: "Enter OTP",
      showCancelButton: true,
      confirmButtonText: "Verify",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!value) return "You need to enter OTP!";
        if (!/^\d{4,6}$/.test(value)) return "OTP must be 4–6 digits";
      },
    });

    if (otp) {
      console.log("User entered OTP:", otp);
      setFieldValue(verifyFieldName, C.SL.VERIFIED);
    } else {
      console.log("User cancelled OTP input");
    }
  };

  useEffect(() => {
    if (vfieldValue === C.SL.VERIFIED) {
      setToVerifyButton(false);
    } else {
      setToVerifyButton(mobileValid);
    }
  }, [vfieldValue, mobileValid]);

  return (
    <Form.Group>
      <Form.Label>
        {label} {mandatory && <span style={{ color: "red" }}>*</span>}
      </Form.Label>

      <InputGroup>
        <Form.Control
          disabled={vfieldValue === C.SL.VERIFIED}
          size={size}
          required={mandatory}
          type={type}
          name={filedName}
          placeholder={placeholder || label}
          value={fieldValue}
          onChange={handleInputChange}
          isInvalid={!!fieldError}
          isValid={!fieldError && fieldTouched && fieldValue}
        />

        {/* ✅ Button logic */}
        {vfieldValue === C.SL.VERIFIED ? (
          <>
            <Button variant="success" disabled>
              Verified
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setFieldValue(verifyFieldName, C.SL.NOT_VERIFIED);
                setMobileValid(false);
              }}
            >
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

        {/* ✅ Validation feedback */}
        {fieldError && (
          <Form.Control.Feedback type="invalid">
            {fieldError}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};

// ✅ Prop types
MobileWithVerifyButton.propTypes = {
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

// ✅ Default props
MobileWithVerifyButton.defaultProps = {
  mandatory: false,
  type: "text",
  placeholder: "",
  size: "md",
  showVerifyButton: true,
  disabled: false,
};

// import { useContext, useEffect, useState, useCallback } from "react";
// import { Form, InputGroup, Button } from "react-bootstrap";
// import PropTypes from "prop-types";
// import Swal from "sweetalert2";
// import * as C from "affserver";

// // Utility: debounce function
// const debounce = (func, delay) => {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// };

// export const MobileWithVerifyButton = ({
//   type = "text",
//   label,
//   filedName, // Keeping your key naming as in form context
//   verifyFieldName,
//   mandatory = false,
//   placeholder = "",
//   size = "md",
//   showVerifyButton = false,
//   onVerify,
//   disabled = false,
//   FormContext,
// }) => {
//   const {
//     values,
//     errors,
//     touched,
//     handleChange,
//     setFieldValue,
//     setFieldError,
//     setFieldTouched,
//   } = useContext(FormContext);

//   const [toVerifyButton, setToVerifyButton] = useState(false);
//   const [mobileValid, setMobileValid] = useState(false);

//   const vfieldValue = values[verifyFieldName] || "";
//   const fieldValue = values[filedName] || "";
//   const fieldError = errors[filedName];
//   const fieldTouched = touched[filedName];

//   const mobileRegex = /^\d{10}$/; // 10-digit mobile number regex

//   // Debounced validation
//   const debouncedValidate = useCallback(
//     debounce((name, value) => {
//       if (mobileRegex.test(value)) {
//         setFieldError(name, null);
//         setMobileValid(true);  // Valid mobile number
//       } else {
//         setFieldError(name, "Invalid mobile number");
//         setMobileValid(false);  // Invalid mobile number
//       }
//     }, 400),
//     []
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Update Formik’s value
//     setFieldValue(name, value);
//     handleChange(e);
//     setFieldTouched(name, true, true);

//     // Debounce validation
//     debouncedValidate(name, value);
//   };

//   const handleVerifyClick = (e) => {
//     e.preventDefault();
//     verifyMobileOtp(fieldValue);
//   };

//   const verifyMobileOtp = async (mobile) => {
//     const { value: otp } = await Swal.fire({
//       title: "Verify OTP",
//       input: "text",          // input type
//       inputPlaceholder: "Enter OTP",
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
//       setFieldValue(verifyFieldName, C.SL.VERIFIED);
//     } else {
//       console.log("User cancelled OTP input");
//     }
//   };

//   useEffect(() => {
//     if (vfieldValue === C.SL.VERIFIED) {
//       setToVerifyButton(false);
//     } else {
//       setToVerifyButton(mobileValid);
//     }
//   }, [vfieldValue, mobileValid]);

//   return (
//     <Form.Group>
//       <Form.Label>
//         {label} {mandatory && <span style={{ color: "red" }}>*</span>}
//       </Form.Label>

//       <InputGroup>
//         <Form.Control
//           disabled={vfieldValue === C.SL.VERIFIED}
//           size={size}
//           required={mandatory}
//           type={type}
//           name={filedName}
//           placeholder={placeholder || label}
//           value={fieldValue}
//           onChange={handleInputChange}
//           isInvalid={!!fieldError}
//           isValid={!fieldError && fieldValue}
//         />

//         {/* Button logic */}
//         {vfieldValue === C.SL.VERIFIED ? (
//           <>
//             <Button variant="success" disabled>
//               Verified
//             </Button>
//             <Button variant="danger" onClick={() => {
//               setFieldValue(verifyFieldName, C.SL.NOT_VERIFIED);
//               setMobileValid(false);  // Reset validation when user clicks "Change"
//             }}>
//               Change
//             </Button>
//           </>
//         ) : (
//           showVerifyButton && toVerifyButton && (
//             <Button variant="danger" onClick={handleVerifyClick}>
//               Verify
//             </Button>
//           )
//         )}

//         {/* Validation feedback */}
//         {fieldError && (
//           <Form.Control.Feedback type="invalid">
//             {fieldError}
//           </Form.Control.Feedback>
//         )}
//       </InputGroup>
//     </Form.Group>
//   );
// };

// // PropTypes
// MobileWithVerifyButton.propTypes = {
//   label: PropTypes.string.isRequired,
//   filedName: PropTypes.string.isRequired,
//   verifyFieldName: PropTypes.string.isRequired,
//   mandatory: PropTypes.bool,
//   type: PropTypes.string,
//   placeholder: PropTypes.string,
//   size: PropTypes.string,
//   showVerifyButton: PropTypes.bool,
//   onVerify: PropTypes.func,
//   disabled: PropTypes.bool,
//   FormContext: PropTypes.object.isRequired,
// };

// // Defaults
// MobileWithVerifyButton.defaultProps = {
//   mandatory: false,
//   type: "text",
//   placeholder: "",
//   size: "md",
//   showVerifyButton: true,
//   disabled: false,
// };
