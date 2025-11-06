import { useContext } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { ContextMap } from "../contexts/index"; // adjust path

export const RadioField = ({
  label,
  name,
  value,
  contextName = "default",
  inline = true,
  mandatory = false,
  size = "md", // ✅ new
}) => {
  // ✅ Use context
  const Context = ContextMap[contextName] || ContextMap.default;
  const { values, errors, touched, handleChange } = useContext(Context);

  // map size to bootstrap classes
  const sizeClass =
    size === "sm" ? "form-check-input-sm" : size === "lg" ? "form-check-input-lg" : "";

  return (
    <Form.Group>
      <Form.Check
        inline={inline}
        type="radio"
        label={
          <>
            {label}
            {mandatory && <span style={{ color: "red" }}> *</span>}
          </>
        }
        name={name}
        value={value}
        onChange={handleChange}
        checked={values[name] === value}
        isInvalid={touched[name] && !!errors[name]}
        required={mandatory}
        className={sizeClass} // ✅ apply size
      />
      {touched[name] && errors[name] && (
        <Form.Control.Feedback type="invalid" tooltip>
          {errors[name]}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

RadioField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  contextName: PropTypes.oneOf(["default", "applicant", "institute"]),
  inline: PropTypes.bool,
  mandatory: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"]), // ✅
};
