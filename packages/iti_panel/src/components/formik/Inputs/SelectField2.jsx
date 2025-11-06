import { useContext } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { getIn } from "formik";

export const SelectField2 = ({
  label,
  name,
  options,
  mandatory = false,
  placeholder = "Select an option",
  contextName = "default",
  size = "md",
  onValueChange,
  valueProp = "value",
  labelProp = "label",
  disabled = false,
  FormContext,
  children, // 👈 allow manual <option> tags
}) => {
  const { values, errors, touched, handleChange } = useContext(FormContext);

  const fieldValue = getIn(values, name) || "";
  const fieldError = getIn(errors, name);

  const handleSelectChange = (e) => {
    handleChange(e);
    if (onValueChange) onValueChange(e.target.value, e);
  };

  const mappedSize = size === "md" ? undefined : size;

  const hasOptions = Array.isArray(options) && options.length > 0;

  return (
    <Form.Group>
      <Form.Label>
        {label} {mandatory && <span style={{ color: "red" }}>*</span>}
      </Form.Label>
      <Form.Select
        disabled={disabled}
        size={mappedSize}
        name={name}
        required={mandatory}
        value={fieldValue}
        onChange={handleSelectChange}
        isInvalid={!!fieldError}
        isValid={!fieldError}
      >
        {/* ✅ Case 1: Render from options prop */}
        {hasOptions ? (
          <>
            <option value="">{placeholder}</option>
            {options.map((opt, idx) => (
              <option key={opt[valueProp] ?? idx} value={String(opt[valueProp])}>
                {opt[labelProp]}
              </option>
            ))}
          </>
        ) : (
          /* ✅ Case 2: Render children if provided */
          children
        )}
      </Form.Select>

      {fieldError && (
        <Form.Control.Feedback type="invalid">
          {fieldError}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

SelectField2.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  mandatory: PropTypes.bool,
  placeholder: PropTypes.string,
  contextName: PropTypes.oneOf(["default", "applicant", "institute"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  onValueChange: PropTypes.func,
  valueProp: PropTypes.string,
  labelProp: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node, // 👈 added this
};
