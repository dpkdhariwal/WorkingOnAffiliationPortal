import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, FormControl, FormLabel, FormGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
// import { FormContext } from "../OtherDocuments";
import * as C from "affserver";
import { FileField2 } from "@/components/formik/Inputs/FileField2";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";
import { viewFile } from "@/helpers";

export const Comp = ({ title, info, FormContext }) => {

    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    const { handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur } = useContext(FormContext);

    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.clientHeight); // or offsetHeight / scrollHeight
        }
    }, []); // runs once on mount
    return (
        <>
            <Card className="custom-card border border-primary" style={{ padding: "0px" }}>
                <Card.Header>
                    <div className="card-title" style={{ textTransform: "none" }}>
                        <h5> {title}</h5>
                    </div>
                </Card.Header>
                <Card.Body style={{ padding: "5px" }} >
                    <Row style={{
                        // backgroundColor: "rgb(245, 245, 245)", 
                        borderRadius: 6,
                    }} >
                        <Col xl={8} lg={8} md={8} sm={8}>
                            {values.usertype === C.SL.ASSESSOR && (<Card ref={divRef} className="border border-2  card custom-card  card">
                                <Card.Body>
                                    {info.replied === false && (<table
                                        width="98%"
                                        border={1}
                                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                                        align="center"
                                        cellPadding="5px"
                                    >
                                        <tbody>
                                            <tr><th colSpan={5}>ID Proof of Authorized Signatory</th>
                                            </tr>
                                            <tr>
                                                <th style={{ border: "1px solid black" }}>Name</th>
                                                {/* <th style={{ border: "1px solid black" }}>Designation</th> */}
                                                <th style={{ border: "1px solid black" }}>Email Id</th>
                                                <th style={{ border: "1px solid black" }}>Mobile Number</th>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.init?.name}</td>
                                                {/* <td style={{ border: "1px solid black" }}>{data?.init_auth_signatory_detail?.name}</td> */}
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.init?.email_id}</td>
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.init?.mobile_number}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: "1px solid black" }}>Select ID Proof Type</th>
                                                <th style={{ border: "1px solid black" }}>Enter ID Proof Number</th>
                                                <th colSpan={2} style={{ border: "1px solid black" }}>Document Upload</th>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.init?.id_proof_type}</td>
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.init?.id_proof_number}</td>
                                                <td colSpan={2} style={{ border: "1px solid black" }}>
                                                    <Button size="sm" onClick={() => { viewFile(values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.init?.document) }}>View ID Proof Document</Button>
                                                    </td>
                                            </tr>
                                        </tbody>
                                    </table>)}
                                    {info.replied === true && (<table
                                        width="98%"
                                        border={1}
                                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                                        align="center"
                                        cellPadding="5px"
                                    >
                                        <tbody>
                                            <tr><th colSpan={5}>ID Proof of Authorized Signatory</th>
                                            </tr>
                                            <tr>
                                                <th style={{ border: "1px solid black" }}>Name</th>
                                                {/* <th style={{ border: "1px solid black" }}>Designation</th> */}
                                                <th style={{ border: "1px solid black" }}>Email Id</th>
                                                <th style={{ border: "1px solid black" }}>Mobile Number</th>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.latest?.name}</td>
                                                {/* <td style={{ border: "1px solid black" }}>{data?.init_auth_signatory_detail?.name}</td> */}
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.latest?.email_id}</td>
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.latest?.mobile_number}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ border: "1px solid black" }}>Select ID Proof Type</th>
                                                <th style={{ border: "1px solid black" }}>Enter ID Proof Number</th>
                                                <th colSpan={2} style={{ border: "1px solid black" }}>Document Upload</th>
                                            </tr>
                                            <tr>
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.latest?.id_proof_type}</td>
                                                <td style={{ border: "1px solid black" }}>{values?.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.latest?.id_proof_number}</td>
                                                <td colSpan={2} style={{ border: "1px solid black" }}><Button onClick={() => { alert('doc_of_authorized_signatory') }}>View ID Proof Document</Button></td>
                                            </tr>
                                        </tbody>
                                    </table>)}
                                </Card.Body>
                            </Card>)}
                            <hr />
                            {values.usertype === C.SL.APPLICANT && values.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.as_per_norms === "no" && (
                                <Card className="custom-card border border-primary">
                                    <Card.Header>
                                        <div className="card-title" style={{ textTransform: "none" }}>
                                            ID Proof of Authorized Signatory{" "}
                                            <span>
                                                (As per Annexure-5)
                                                <Button variant="link" className="rounded-pill btn-wave">
                                                    Download Format
                                                </Button>
                                            </span>
                                            <i
                                                className="fe fe-help-circle"
                                                style={{ cursor: "pointer", color: "#6c757d" }}
                                                title="An individual formally designated by the applicant to act on itsbehalf in official matters related to affiliation, accreditation, and administrativecommunication."
                                                onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                            ></i>
                                            <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB)</span>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card className="mb-3">
                                            <Card.Body>
                                                <Row className="mb-3">
                                                    <BootstrapForm.Group as={Col} md="4">
                                                        <Form.Label>
                                                            Name<span style={{ color: "red" }}>*</span>
                                                        </Form.Label>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            size="lg"
                                                            name="name_of_authorized_signatory" // 👈 same path
                                                            value={values.name_of_authorized_signatory}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.name_of_authorized_signatory}
                                                            isValid={
                                                                touched.name_of_authorized_signatory &&
                                                                !errors.name_of_authorized_signatory
                                                            }
                                                            placeholder="Name"
                                                        />
                                                        <ErrorMessage
                                                            name="name_of_authorized_signatory"
                                                            component="div"
                                                            style={{ color: "red" }}
                                                        />
                                                    </BootstrapForm.Group>

                                                    {/* Email has to Verify with OTP */}
                                                    <Col md={4}>
                                                        <FormGroup>
                                                            <FormLabel>Email Id</FormLabel>
                                                            <Field
                                                                type="text"
                                                                name={`email_id_of_authorized_signatory`}
                                                                as={FormControl}
                                                                value={values?.email_id_of_authorized_signatory}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            <ErrorMessage
                                                                name={`email_id_of_authorized_signatory`}
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </FormGroup>
                                                    </Col>


                                                    <Col md={4}>
                                                        <FormGroup>
                                                            <FormLabel>Mobile Number</FormLabel>
                                                            <Field
                                                                type="text"
                                                                name={`mobile_number_of_authorized_signatory`}
                                                                as={FormControl}
                                                                value={values?.mobile_number_of_authorized_signatory}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            <ErrorMessage
                                                                name={`mobile_number_of_authorized_signatory`}
                                                                component="div"
                                                                className="text-danger"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: "1rem" }}>
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
                                                            {C.ID_Proof_Doc_list.map((item, i) => (
                                                                <option key={i} value={item}>
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </BootstrapForm.Select>
                                                        <ErrorMessage
                                                            name="id_proof_of_authorized_signatory"
                                                            component="div"
                                                            style={{ color: "red" }}
                                                        />
                                                    </BootstrapForm.Group>

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

                                                    <Col md={4}>
                                                        <FileField2
                                                            label="Document Upload"
                                                            name="id_proof_docs_of_authorized_signatory"
                                                            mandatory
                                                            accept=".pdf,.jpg,.png"
                                                            context={FormContext}  // passing the context here
                                                            onClickViewFileButton={()=>{viewFile(values.id_proof_docs_of_authorized_signatory)}}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Card.Body>
                                </Card>
                            )}

                        </Col>
                        <Col xl={4} lg={4} md={4} sm={4}>

                            {values.usertype === C.SL.APPLICANT
                                && values.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.as_per_norms === "no" &&
                                (<ViewStateRemark title={C.DA1_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY}
                                    as_per_norms={values.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.as_per_norms}
                                    reason={values.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.reason}
                                    assessor_remark={values.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.assessor_remark} />)}

                            {values.usertype === C.SL.ASSESSOR && (
                                <Card className="border border-2  card custom-card  card" >
                                    <Card.Header>
                                        <label
                                            className="main-content-label my-auto"
                                            style={{ textTransform: "none" }}
                                        >
                                            Review Form
                                        </label>
                                        <div className="ms-auto d-flex">
                                            <Button
                                                size="sm"
                                                type="button"
                                                className="rounded-pill btn-wave btn-outline-dark"
                                                variant="btn-outline-dark"
                                            >
                                                Review Instructions
                                            </Button>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="mb-3">
                                            <Form.Group>
                                                <Form.Label>
                                                    Whether the {title} of the applicant are as per norms?
                                                    <span style={{ color: "red" }}>*</span>
                                                </Form.Label>

                                                <div role="group" aria-labelledby="as_per_norms-group">
                                                    <label className="me-3">
                                                        <Field
                                                            type="radio"
                                                            name="ID_PROOF_OF_AUTHORIZED_SIGNATORY.as_per_norms"
                                                            value="yes"
                                                            className="form-check-input me-2"
                                                        />
                                                        Yes
                                                    </label>

                                                    <label>
                                                        <Field
                                                            type="radio"
                                                            name="ID_PROOF_OF_AUTHORIZED_SIGNATORY.as_per_norms"
                                                            value="no"
                                                            className="form-check-input me-2"
                                                        />
                                                        No
                                                    </label>
                                                </div>

                                                <ErrorMessage
                                                    name="ID_PROOF_OF_AUTHORIZED_SIGNATORY.as_per_norms"
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                />
                                            </Form.Group>
                                        </Row>
                                        {values.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.as_per_norms === "no" && (
                                            <Row className="mb-3">
                                                <Form.Group as={Col} md="12">
                                                    <Form.Label>
                                                        Select the Reason(s) and Raise Non-Conformities (NC)
                                                        <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Field
                                                        name="ID_PROOF_OF_AUTHORIZED_SIGNATORY.reason"
                                                        as="select"
                                                        className="form-control"
                                                    >
                                                        <option value="">Select</option>
                                                        {C.reasons.map((lang, i) => (
                                                            <option key={i} value={lang.value}>{lang.label}</option>
                                                        ))}
                                                    </Field>
                                                </Form.Group>

                                                {values.ID_PROOF_OF_AUTHORIZED_SIGNATORY.reason === "other" && (
                                                    <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                        <Form.Label>
                                                            Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={3}
                                                            name="ID_PROOF_OF_AUTHORIZED_SIGNATORY.assessor_comments"
                                                            value={values.ID_PROOF_OF_AUTHORIZED_SIGNATORY.assessor_comments}
                                                            onChange={handleChange}
                                                            className={`form-control ${touched.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.assessor_comments &&
                                                                errors.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.assessor_comments
                                                                ? "is-invalid"
                                                                : ""
                                                                }`}
                                                        />
                                                        {touched.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.assessor_comments &&
                                                            errors.ID_PROOF_OF_AUTHORIZED_SIGNATORY?.assessor_comments && (
                                                                <div className="invalid-feedback">
                                                                    {errors.ID_PROOF_OF_AUTHORIZED_SIGNATORY.assessor_comments}
                                                                </div>
                                                            )}
                                                    </Form.Group>
                                                )}
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            )}

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};
export default Comp;