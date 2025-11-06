import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
import { FormContext } from "@/screens/state/assessor/AssessmentII/Amenities Area/Amenities";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";
import * as C from "affserver";
import { ViewArea } from "@/components/Assessment/ViewArea";
import { RevisedInputArea } from "@/components/Assessment/RevisedInputArea";
import { RevisedInputPhoto } from "@/components/Assessment/RevisedInputPhoto";

export const Comp = ({ title, info, FormContext }) => {

    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    const { handleSubmit, handleChange, values, errors, touched, } = useContext(FormContext);

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
                        <Col xl={6} lg={6} md={6} sm={6}>
                            {values.usertype === C.SL.ASSESSOR && (<Card ref={divRef} className="border border-2  card custom-card  card">
                                <Card.Body>
                                    {console.log(info)}
                                    {values.DRINKING_WATER_FACILITY.replied === false && (<ViewArea required_area={info?.initial_detail?.required_area} totalAvailableArea={info?.initial_detail?.totalAvailableArea} />)}

                                    {values.DRINKING_WATER_FACILITY.replied === true && ('Show Latest')}

                                    {console.log(info)}
                                </Card.Body>
                            </Card>)}

                            {values.DRINKING_WATER_FACILITY.as_per_norms == C.SL.NO && values.usertype === C.SL.APPLICANT && (<Card ref={divRef} className="border border-2  card custom-card  card">
                                <Card.Body>
                                    <RevisedInputPhoto
                                        particular="DRINKING_WATER_FACILITY"
                                        document_field={`REVISED_DRINKING_WATER_FACILITY.document`}
                                        FormContext={FormContext} />
                                </Card.Body>
                            </Card>)}
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6}>
                            {/* style={{ height: `${height}px` }} */}
                            {values.usertype === C.SL.APPLICANT
                                && values.DRINKING_WATER_FACILITY?.as_per_norms === "no" &&
                                (<ViewStateRemark title={`DRINKING_WATER_FACILITY`}
                                    as_per_norms={values.DRINKING_WATER_FACILITY?.as_per_norms}
                                    reason={values.DRINKING_WATER_FACILITY?.reason}
                                    assessor_remark={values.DRINKING_WATER_FACILITY?.assessor_remark} />)}
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
                                                        name="DRINKING_WATER_FACILITY.as_per_norms"
                                                        value="yes"
                                                        className="form-check-input me-2"
                                                    />
                                                    Yes
                                                </label>

                                                <label>
                                                    <Field
                                                        type="radio"
                                                        name="DRINKING_WATER_FACILITY.as_per_norms"
                                                        value="no"
                                                        className="form-check-input me-2"
                                                    />
                                                    No
                                                </label>
                                            </div>

                                            <ErrorMessage
                                                name="DRINKING_WATER_FACILITY.as_per_norms"
                                                component="div"
                                                className="invalid-feedback d-block"
                                            />
                                        </Form.Group>
                                    </Row>
                                    {values.DRINKING_WATER_FACILITY.as_per_norms === "no" && (
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12">
                                                <Form.Label>
                                                    Select the Reason(s) and Raise Non-Conformities (NC)
                                                    <span style={{ color: "red" }}>*</span>
                                                </Form.Label>
                                                <Field
                                                    name="DRINKING_WATER_FACILITY.reason"
                                                    as="select"
                                                    className="form-control"
                                                >
                                                     <option value="">Select</option>
                                                                                                            {C.reasons.map((lang, i) => (
                                                                                                                <option key={i} value={lang.value}>{lang.label}</option>
                                                                                                            ))}
                                                </Field>
                                            </Form.Group>

                                            {values.DRINKING_WATER_FACILITY.reason === "other" && (
                                                <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                    <Form.Label>
                                                        Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name="DRINKING_WATER_FACILITY.assessor_comments"
                                                        value={values.DRINKING_WATER_FACILITY.assessor_comments}
                                                        onChange={handleChange}
                                                        className={`form-control ${touched.DRINKING_WATER_FACILITY?.assessor_comments &&
                                                            errors.DRINKING_WATER_FACILITY?.assessor_comments
                                                            ? "is-invalid"
                                                            : ""
                                                            }`}
                                                    />
                                                    {touched.DRINKING_WATER_FACILITY?.assessor_comments &&
                                                        errors.DRINKING_WATER_FACILITY?.assessor_comments && (
                                                            <div className="invalid-feedback">
                                                                {errors.DRINKING_WATER_FACILITY.assessor_comments}
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
            </Card>
        </>
    );
};
export default Comp;