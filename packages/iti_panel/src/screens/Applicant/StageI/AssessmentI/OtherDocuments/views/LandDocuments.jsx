import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
import { FormContext } from "../OtherDocuments";
import { formatedDate, viewFile } from "@/helpers";

export const Comp = ({ title, info }) => {

    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    const { handleSubmit, handleChange, values, errors, touched, } = useContext(FormContext);

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
                <Col xl={7} lg={7} md={7} sm={7}>
                    {true && (<Card ref={divRef} className="border border-2  card custom-card  card">
                        <Card.Body>
                            {console.log(info)}
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Upload Date</th>
                                        <th>Language</th>
                                        <th>Document</th>
                                        <th>Notarized Docs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        info?.init?.map((obj, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{formatedDate(obj?.uploaded_datetime)}</td>
                                                    <td>{obj?.language}</td>
                                                    <td><Button size="sm" onClick={() => { viewFile(obj?.document) }}>View Doc</Button></td>
                                                    <td>{obj?.notarised_document ? (<Button size="sm" onClick={() => { viewFile(obj?.notarised_document) }}>View Doc</Button>) : "Not Required"} </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                            {console.log(info)}
                        </Card.Body>
                    </Card>)}
                </Col>
                <Col xl={5} lg={5} md={5} sm={5}>

                    <Card className={`border border-2 card custom-card ${values.usertype === 'APPLICANT' ? 'disabled-container' : ''}`}>
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
                                                name="LAND_DOCUMENTS.as_per_norms"
                                                value="yes"
                                                className="form-check-input me-2"
                                            />
                                            Yes
                                        </label>

                                        <label>
                                            <Field
                                                type="radio"
                                                name="LAND_DOCUMENTS.as_per_norms"
                                                value="no"
                                                className="form-check-input me-2"
                                            />
                                            No
                                        </label>
                                    </div>

                                    <ErrorMessage
                                        name="LAND_DOCUMENTS.as_per_norms"
                                        component="div"
                                        className="invalid-feedback d-block"
                                    />
                                </Form.Group>
                            </Row>
                            {values.LAND_DOCUMENTS.as_per_norms === "no" && (
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>
                                            Select the Reason(s) and Raise Non-Conformities (NC)
                                            <span style={{ color: "red" }}>*</span>
                                        </Form.Label>
                                        <Field
                                            name="LAND_DOCUMENTS.reason"
                                            as="select"
                                            className="form-control"
                                        >
                                            <option value="">Select</option>
                                            {/* {MaxData.map((lang, i) => (
            <option key={i} value={lang.value}>{lang.label}</option>
          ))} */}
                                        </Field>
                                    </Form.Group>

                                    {values.LAND_DOCUMENTS.reason === "other" && (
                                        <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                            <Form.Label>
                                                Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="LAND_DOCUMENTS.assessor_comments"
                                                value={values.LAND_DOCUMENTS.assessor_comments}
                                                onChange={handleChange}
                                                className={`form-control ${touched.LAND_DOCUMENTS?.assessor_comments &&
                                                    errors.LAND_DOCUMENTS?.assessor_comments
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                            />
                                            {touched.LAND_DOCUMENTS?.assessor_comments &&
                                                errors.LAND_DOCUMENTS?.assessor_comments && (
                                                    <div className="invalid-feedback">
                                                        {errors.LAND_DOCUMENTS.assessor_comments}
                                                    </div>
                                                )}
                                        </Form.Group>
                                    )}
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Card.Body>
    </Card>);
};
export default Comp;