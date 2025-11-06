import { useContext } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getIn } from "formik";  // ✅ import getIn


export const TextField2 = ({
  label,
  name,
  mandatory = false,
  type = "text",
  placeholder = "",
  contextName = "default",
  size = "md",
  onValueChange,
  showVerifyButton = false,
  onVerify,
  disabled = false,
  FormContext,
}) => {
  const { values, errors, touched, handleChange } = useContext(FormContext);

  // usage
  // const normalizedName = normalizePath(name);
  // ✅ safely get nested values and errors
  const fieldValue = getIn(values, name) || "";
  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);

  // console.log(values, getIn(values, "runningITIs[0].run_AffiliationNo"));
  // console.log(getIn(errors, "runningITIs[0].run_AffiliationNo"));
  // console.log(getIn(touched, "runningITIs[0].run_AffiliationNo"));

  const handleInputChange = (e) => {
    handleChange(e);
    if (onValueChange) {
      onValueChange(e.target.value, e);
    }
  };

  const handleVerifyClick = (e) => {
    e.preventDefault();
    if (onVerify) {
      onVerify(fieldValue);
    }
  };

  return (
    <Form.Group>
      <Form.Label>
        {label} {mandatory && <span style={{ color: "red" }}>*</span>}
      </Form.Label>

      <InputGroup>
        <Form.Control
          disabled={disabled}
          size={size}
          required={mandatory}
          type={type}
          name={name}
          placeholder={placeholder || label}
          value={fieldValue} // ✅ correct value
          onChange={handleInputChange}
          isInvalid={!!fieldError}
          isValid={!fieldError && fieldValue}
        />
        {console.log(showVerifyButton, fieldTouched, fieldError)}
        {showVerifyButton ? (
          fieldTouched && !fieldError ? (
            <Button variant="success" disabled>
              Verified
            </Button>
          ) : fieldTouched && !!fieldError ? (
            <Button variant="danger" onClick={handleVerifyClick}>
              Verify
            </Button>
          ) : null
        ) : null}

        {fieldError && (
          <Form.Control.Feedback type="invalid">
            {fieldError}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};
