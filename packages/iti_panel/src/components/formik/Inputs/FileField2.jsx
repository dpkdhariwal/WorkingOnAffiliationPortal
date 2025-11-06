import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getIn } from "formik";

import { viewFile } from "@/helpers";

export const FileField2 = ({
    label,
    name,
    mandatory = false,
    size = "md",
    disabled = false,
    accept = "*",
    onFileChange,
    context, // Pass context as a prop from the parent
    onClickViewFileButton
}) => {
    const { values, errors, touched, setFieldValue } = useContext(context);


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
            {label && (<Form.Label>
                {label} {mandatory && <span style={{ color: "red" }}>*</span>}
            </Form.Label>)}
            

            {!isActualFile ? (
                <>
                    {
                        typeof fieldValue === 'string' ? (
                            <>
                                <div className="d-flex gap-2">
                                    <Button onClick={() => { onClickViewFileButton() }}>
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

FileField2.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    mandatory: PropTypes.bool,
    contextName: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    onFileChange: PropTypes.func,
    context: PropTypes.object.isRequired, // Required context passed from parent
    onClickViewFileButon: PropTypes.func

};
