import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getIn } from "formik";

import { ContextMap } from "../contexts/index"; // adjust path
import { viewFile } from "@/helpers";

export const FileField = ({
    label,
    name,
    mandatory = false,
    contextName = "default",
    size = "md",
    disabled = false,
    accept = "*",
    onFileChange,
}) => {
    const Context = ContextMap[contextName] || ContextMap.default;
    const { values, errors, touched, setFieldValue } = useContext(Context);

    // ✅ safely get nested values and errors
    const fieldValue = getIn(values, name) || null;
    const fieldError = getIn(errors, name);
    const fieldTouched = getIn(touched, name);

    const handleFileChange = (e) => {
        const file = e.target.files[0] || null;
        setFieldValue(name, file);
        if (onFileChange) onFileChange(file, e);
    };

    // ✅ check if it's a File object (not just a string from API/default values)
    const isActualFile = fieldValue instanceof File;

    return (
        <Form.Group>
            <Form.Label>
                {label} {mandatory && <span style={{ color: "red" }}>*</span>}
            </Form.Label>

            {!isActualFile ? (
                <>

                    {
                        typeof fieldValue === 'string' ? (
                            <>
                                <div className="d-flex gap-2">
                                    <Button onClick={() => { viewFile(values.Falls_Under_Hill_Area_Hill__Supporting_Doc) }}>
                                        View file
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => setFieldValue(name, null)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </>
                        ) : <>
                            <Form.Control
                                type="file"
                                size={size}
                                disabled={disabled}
                                accept={accept}
                                onChange={handleFileChange}
                                isInvalid={!!fieldError && fieldTouched}
                            />
                            {fieldError && fieldTouched && (
                                <Form.Control.Feedback type="invalid">
                                    {fieldError}
                                </Form.Control.Feedback>
                            )}
                        </>
                    }
                </>
            ) : (
                <div>
                    {/* Show selected file name */}
                    <strong>{fieldValue.name}</strong>
                    <hr />

                    <div className="d-flex gap-2">
                        {/* View Button */}
                        <Button
                            variant="info"
                            size="sm"
                            onClick={() => {
                                const fileURL = URL.createObjectURL(fieldValue);
                                window.open(fileURL, "_blank");
                                URL.revokeObjectURL(fileURL); // cleanup
                            }}
                        >
                            View
                        </Button>

                        {/* Remove Button */}
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setFieldValue(name, null)}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            )}
        </Form.Group>
    );
};

FileField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    mandatory: PropTypes.bool,
    contextName: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    onFileChange: PropTypes.func,
};
