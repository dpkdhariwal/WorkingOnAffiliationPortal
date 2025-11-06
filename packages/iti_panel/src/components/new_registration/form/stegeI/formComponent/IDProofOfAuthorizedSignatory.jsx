import { Fragment, useRef, useEffect, useState, createContext } from "react";
import { Row, Col, Card, Form, Button, ListGroup, Alert, InputGroup, } from "react-bootstrap";
import { Form as BootstrapForm } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { st1form } from "affserver";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
// import { AppStatusContext } from "../../../../services/context";

import * as C from "affserver";
import * as gen from "@/services/general/index";

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';



import { FileField } from "@/components/formik/Inputs/FileField";
import { RadioField, SelectField, TextField2 } from "@/components/formik/Inputs";
import { EmailWithVerifyButton } from "@/components/formik/Inputs/EmailWithVerifyButton";
import { MobileWithVerifyButton } from "@/components/formik/Inputs/MobileWithVerifyButton";
import { SelectField2 } from "@/components/formik/Inputs/SelectField2";
import { HelpCircle } from "@/assets/custom-icons/help-circle";

const IDProofOfAuthorizedSignatory = ({ FormContext }) => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");
    const { handleSubmit, handleChange, values, errors, touched, setFieldValue, setFieldError, setFieldTouched } = useContext(FormContext);




    const [catInfo, setCatInfo] = useState({});
    const [language, setLanguage] = useState([]);
    const [id_proof_master, setId_proof_master] = useState([]);
    const [designation_master, setDesignation_master] = useState([]);

    const loadData = async () => {
        let data, resp;
        try {

            let r3 = await gen.geLanguages(appId);
            setLanguage(r3.data);


            // Setting Up Id Proof Master
            let r4 = await gen.getMasters(C.MastersKey.ID_PROOF);
            setId_proof_master(r4.data);


            // Setting Up Designation Master
            let r5 = await gen.getMasters(C.MastersKey.DESIGNATION);
            setDesignation_master(r5.data);


        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        loadData();
    }, []);




    return (
        <Fragment>
            <Card className="custom-card border border-primary">
                <Card.Header className="align-items-center card-header d-flex gap-2 justify-content-between">
                    <div className="card-title" style={{ textTransform: "none" }}> ID Proof of Authorized Signatory{" "}


                        <HtmlTooltip sx={{ "& .MuiTooltip-tooltip": { maxWidth: 1000, }, }}
                            title={
                                <Fragment>
                                    <Typography color="inherit" sx={{ fontWeight: 600 }}>
                                        Detailed Help Information
                                    </Typography>
                                    <div style={{ maxWidth: 350 }}>
                                        <p style={{ marginBottom: 4 }}>
                                            <b>Purpose:</b> This icon provides quick access to context-specific help and
                                            documentation. Hovering or clicking displays detailed guidance about the
                                            current section.
                                        </p>
                                        <p style={{ marginBottom: 4 }}>
                                            <b>Usage Tips:</b> You can navigate through related topics, FAQs, and step-by-step
                                            tutorials. This tooltip is intentionally long to test layout and wrapping.
                                        </p>
                                        <p>
                                            <b>Note:</b> Adjust tooltip width via <code>maxWidth</code> or a custom style to prevent
                                            excessive horizontal stretching.
                                        </p>
                                    </div>
                                </Fragment>
                            }
                        >
                            <a style={{ cursor: "pointer" }} ><HelpCircle width={30} height={30} stroke="white" fill="black" /></a>
                        </HtmlTooltip>
                    </div>

                    <div>
                        (As per Annexure-5)
                        <Button variant="link" className="rounded-pill btn-wave">
                            Download Format
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Row className="mb-3">
                        <Col md={4}>
                            <TextField2
                                label="Name"
                                name="auth_sign.name_of_authorized_signatory"
                                type="text"
                                size="lg"
                                FormContext={FormContext}
                                mandatory
                            />
                        </Col>


                        {false && (
                            <BootstrapForm.Group as={Col} md="4">
                                <Form.Label>
                                    Name<span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <BootstrapForm.Control
                                    type="text"
                                    size="lg"
                                    name="name_of_authorized_signatory" // 👈 same path
                                    value={values?.name_of_authorized_signatory}
                                    onChange={(event) => {
                                        // Allow only alphabets and spaces
                                        const sanitized = event.target.value.replace(/[^a-zA-Z\s]/g, "");
                                        // Update Formik value manually
                                        setFieldValue("name_of_authorized_signatory", sanitized);
                                    }}
                                    isInvalid={!!errors?.name_of_authorized_signatory}
                                    isValid={
                                        touched?.name_of_authorized_signatory &&
                                        !errors?.name_of_authorized_signatory
                                    }
                                    placeholder="Name"
                                />
                                <ErrorMessage
                                    name="name_of_authorized_signatory"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </BootstrapForm.Group>
                        )}
                        {/* Email has to Verify with OTP */}
                        <Col md={4}>
                            <EmailWithVerifyButton
                                label="Email ID"
                                filedName={`auth_sign.email_id_of_authorized_signatory`}
                                verifyFieldName={`auth_sign.is_verified_email_id_of_authorized_signatory`}
                                mandatory={true}
                                size="lg"
                                showVerifyButton={true}
                                onVerify={(email) => console.log("Verifying email:", email)}
                                FormContext={FormContext} // Make sure to pass Formik's context here
                            />
                        </Col>

                        <Col md={4}>

                            <MobileWithVerifyButton
                                label="Mobile Number"
                                filedName="auth_sign.mobile_number_of_authorized_signatory"
                                verifyFieldName="auth_sign.is_verified_mobile_number_of_authorized_signatory"
                                mandatory={true}
                                size="lg"
                                showVerifyButton={true}
                                FormContext={FormContext}
                            />
                        </Col>

                    </Row>
                    <Row style={{ marginTop: "1rem" }}>
                        <Col md={4}>
                            <SelectField2
                                label="Select ID Proof Type"
                                name={`auth_sign.id_proof_of_authorized_signatory`}
                                mandatory
                                size="lg"
                                FormContext={FormContext}
                            >
                                <option value="">Select Id Proof</option>
                                {id_proof_master.map((item, i) => (
                                    <option key={i} value={item.id_proof_name}>
                                        {item.id_proof_name}
                                    </option>
                                ))}
                            </SelectField2>

                        </Col>
                        {false && (
                            <BootstrapForm.Group as={Col} md={4}>
                                <Form.Label>
                                    Select ID Proof Type<span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <BootstrapForm.Select
                                    size="lg"
                                    name="id_proof_of_authorized_signatory"
                                    value={values.id_proof_of_authorized_signatory}
                                    onChange={handleChange}
                                    isInvalid={!!errors.id_proof_of_authorized_signatory}
                                    isValid={
                                        touched.id_proof_of_authorized_signatory &&
                                        !errors.id_proof_of_authorized_signatory
                                    }
                                >
                                    <option value="">Select Id Proof</option>
                                    {id_proof_master.map((item, i) => (
                                        <option key={i} value={item.id_proof_name}>
                                            {item.id_proof_name}
                                        </option>
                                    ))}
                                </BootstrapForm.Select>
                                <ErrorMessage
                                    name="id_proof_of_authorized_signatory"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </BootstrapForm.Group>
                        )}

                        <Col md={4}>
                            <TextField2
                                label="Enter ID Proof Number"
                                name="auth_sign.id_proof_number_of_authorized_signatory"
                                type="text"
                                size="lg"
                                FormContext={FormContext}
                                mandatory
                            />
                        </Col>

                        {false && (
                            <BootstrapForm.Group as={Col} md="4">
                                <Form.Label>
                                    Enter ID Proof Number<span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <BootstrapForm.Control
                                    type="text"
                                    size="lg"
                                    name="id_proof_number_of_authorized_signatory" // 👈 same path
                                    value={values.id_proof_number_of_authorized_signatory}
                                    onChange={handleChange}
                                    isInvalid={!!errors.id_proof_number_of_authorized_signatory}
                                    isValid={
                                        touched.id_proof_number_of_authorized_signatory &&
                                        !errors.id_proof_number_of_authorized_signatory
                                    }
                                    placeholder="ID Proof Number"
                                />
                                <ErrorMessage
                                    name="id_proof_number_of_authorized_signatory"
                                    component="div"
                                    style={{ color: "red" }}
                                />
                            </BootstrapForm.Group>
                        )}

                        {false && (
                            <Col md={4}>
                                <FileField
                                    label="Document Upload"
                                    name="id_proof_docs_of_authorized_signatory"
                                    mandatory
                                    accept=".pdf,.jpg,.png"
                                    contextName="Stage1Form"
                                />
                            </Col>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </Fragment>
    );
};
IDProofOfAuthorizedSignatory.propTypes = {
    setActive: PropTypes.func.isRequired,
};
export default IDProofOfAuthorizedSignatory;

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));