import { useContext } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { getIn } from "formik";

import { ContextMap } from "../contexts/index";

export const SelectField = ({
  label,
  name,
  options = [],
  mandatory = false,
  placeholder = "Select an option",
  contextName = "default",
  size = "md", // "sm", "md", "lg"
  onValueChange,
  valueProp = "value",
  labelProp = "label",
  disabled = false,
}) => {
  const Context = ContextMap[contextName] || ContextMap.default;
  const { values, errors, touched, handleChange } = useContext(Context);

  const fieldValue = getIn(values, name) || "";
  const fieldError = getIn(errors, name);

  const handleSelectChange = (e) => {
    handleChange(e);
    if (onValueChange) {
      onValueChange(e.target.value, e);
    }
  };

  console.log(options);

  // map size "md" → undefined (default)
  const mappedSize = size === "md" ? undefined : size;

  return (
    <Form.Group>
      <Form.Label>
        {label} {mandatory && <span style={{ color: "red" }}>*</span>}
      </Form.Label>
      <Form.Select
        disabled={disabled}
        size={mappedSize} // ✅ works now
        name={name}
        required={mandatory}
        value={fieldValue}
        onChange={handleSelectChange}
        isInvalid={!!fieldError}
        isValid={!fieldError} // ✅ always show green if no error
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={opt[valueProp] ?? idx} value={String(opt[valueProp])}>
            {opt[labelProp]}
          </option>
        ))}
      </Form.Select>
      {fieldError && (
        <Form.Control.Feedback type="invalid">
          {fieldError}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  mandatory: PropTypes.bool,
  placeholder: PropTypes.string,
  contextName: PropTypes.oneOf(["default", "applicant", "institute"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  onValueChange: PropTypes.func,
  valueProp: PropTypes.string,
  labelProp: PropTypes.string,
  disabled: PropTypes.bool,
};
