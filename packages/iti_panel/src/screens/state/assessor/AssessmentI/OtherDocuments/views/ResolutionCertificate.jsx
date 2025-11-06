import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
// import { FormContext } from "../OtherDocuments";
import { formatedDate, viewFile } from "@/helpers";
import { Link } from "react-router-dom";
import * as C from "affserver";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";
import { FileField2 } from "@/components/formik/Inputs/FileField2";

export const Comp = ({ title, info, FormContext }) => {

    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = useContext(FormContext);

    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.clientHeight); // or offsetHeight / scrollHeight
        }
    }, []); // runs once on mount
    return (<Card className="custom-card border border-primary" style={{ padding: "0px" }}>
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
                    {values.usertype === C.SL.ASSESSOR && (
                        <Card ref={divRef} className="border border-2  card custom-card  card">
                            <Card.Body>
                                <table
                                    width="98%"
                                    border={1}
                                    style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                                    align="center"
                                    cellPadding="5px"
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ border: "1px solid black" }}>Resolution Certificate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ border: "1px solid black" }}>
                                                <table
                                                    width="98%"
                                                    border={1}
                                                    style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                                                    align="center"
                                                    cellPadding="5px"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th style={{ border: "1px solid black" }}>Resolution for Starting ITI</th>
                                                            <th style={{ border: "1px solid black" }}>Uploaded Date</th>
                                                        </tr>
                                                    </thead>
                                                    {info.replied === false && (<tbody>
                                                        <tr>
                                                            <td style={{ border: "1px solid black" }}>
                                                                <Button size="sm" onClick={() => { viewFile(values.RESOLUTION_CERTIFICATE?.init?.document) }}>View Resolution Cert.</Button>
                                                            </td>
                                                            <td style={{ border: "1px solid black" }}> {formatedDate(values.RESOLUTION_CERTIFICATE?.init?.document?.upload_datetime)}</td>
                                                        </tr>
                                                    </tbody>)}
                                                    {info.replied === true && (<tbody>
                                                        <tr>
                                                            <td style={{ border: "1px solid black" }}>
                                                                <Button size="sm" onClick={() => { viewFile(values.RESOLUTION_CERTIFICATE?.latest?.document) }} >View Resolution Cert.</Button></td>
                                                            <td style={{ border: "1px solid black" }}> {formatedDate(values.RESOLUTION_CERTIFICATE?.latest?.upload_datetime)}</td>
                                                        </tr>
                                                    </tbody>)}
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />

                            </Card.Body>
                        </Card>)}
                    {values.usertype === C.SL.APPLICANT && values.RESOLUTION_CERTIFICATE?.as_per_norms === "no" && (
                        <Card className="custom-card border border-primary">
                            <Card.Body>
                                <FileField2
                                    label=" Select Resolution for Starting ITI"
                                    name="doc_iti_resolution"
                                    mandatory
                                    accept=".pdf,.jpg,.png"
                                    context={FormContext}  // passing the context here
                                    onClickViewFileButton={() => { viewFile(values.doc_iti_resolution) }}
                                />
                                <Row style={{ marginTop: "5px" }}>
                                    <Col md={12} lg={12} sm={12}>
                                        <span style={{ color: 'red' }} >(Upload PDF Files (Maximum size: 5 MB each))</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
                <Col xl={4} lg={4} md={4} sm={4}>
                    {values.usertype === C.SL.APPLICANT
                        && values.RESOLUTION_CERTIFICATE?.as_per_norms === "no" &&
                        (<ViewStateRemark title={C.DA1_KEYS.RESOLUTION_CERTIFICATE}
                            as_per_norms={values.RESOLUTION_CERTIFICATE?.as_per_norms}
                            reason={values.RESOLUTION_CERTIFICATE?.reason}
                            assessor_remark={values.RESOLUTION_CERTIFICATE?.assessor_remark} />)}

                    {values.usertype === C.SL.ASSESSOR && (<Card className="border border-2  card custom-card  card" >
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
                                                name="RESOLUTION_CERTIFICATE.as_per_norms"
                                                value="yes"
                                                className="form-check-input me-2"
                                            />
                                            Yes
                                        </label>

                                        <label>
                                            <Field
                                                type="radio"
                                                name="RESOLUTION_CERTIFICATE.as_per_norms"
                                                value="no"
                                                className="form-check-input me-2"
                                            />
                                            No
                                        </label>
                                    </div>

                                    <ErrorMessage
                                        name="RESOLUTION_CERTIFICATE.as_per_norms"
                                        component="div"
                                        className="invalid-feedback d-block"
                                    />
                                </Form.Group>
                            </Row>
                            {values.RESOLUTION_CERTIFICATE?.as_per_norms === "no" && (
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>
                                            Select the Reason(s) and Raise Non-Conformities (NC)
                                            <span style={{ color: "red" }}>*</span>
                                        </Form.Label>
                                        <Field
                                            name="RESOLUTION_CERTIFICATE.reason"
                                            as="select"
                                            className="form-control"
                                        >
                                            <option value="">Select</option>
                                            {C.reasons.map((lang, i) => (
                                                <option key={i} value={lang.value}>{lang.label}</option>
                                            ))}
                                        </Field>
                                    </Form.Group>

                                    {values.RESOLUTION_CERTIFICATE.reason === "other" && (
                                        <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                            <Form.Label>
                                                Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="RESOLUTION_CERTIFICATE.assessor_comments"
                                                value={values.RESOLUTION_CERTIFICATE.assessor_comments}
                                                onChange={handleChange}
                                                className={`form-control ${touched.RESOLUTION_CERTIFICATE?.assessor_comments &&
                                                    errors.RESOLUTION_CERTIFICATE?.assessor_comments
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                            />
                                            {touched.RESOLUTION_CERTIFICATE?.assessor_comments &&
                                                errors.RESOLUTION_CERTIFICATE?.assessor_comments && (
                                                    <div className="invalid-feedback">
                                                        {errors.RESOLUTION_CERTIFICATE.assessor_comments}
                                                    </div>
                                                )}
                                        </Form.Group>
                                    )}
                                </Row>
                            )}
                        </Card.Body>
                    </Card>)}
                </Col>
            </Row>
        </Card.Body>
    </Card>);
};
export default Comp;