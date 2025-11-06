import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
// import { FormContext } from "@/screens/state/assessor/AssessmentII/Amenities Area/Amenities";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";
import * as C from "affserver";
import { ViewArea } from "@/components/Assessment/ViewArea";
import { RevisedInputArea } from "@/components/Assessment/RevisedInputArea";

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
                                    {values.FIRST_AID_ROOM.replied === false && (<ViewArea required_area={info?.initial_detail?.required_area} totalAvailableArea={info?.initial_detail?.totalAvailableArea} />)}

                                    {values.FIRST_AID_ROOM.replied === true && ('Show Latest')}

                                    {console.log(info)}
                                </Card.Body>
                            </Card>)}

                            {values.FIRST_AID_ROOM.as_per_norms == C.SL.NO && values.usertype === C.SL.APPLICANT && (<Card ref={divRef} className="border border-2  card custom-card  card">
                                <Card.Body>
                                    <RevisedInputArea
                                        particular="FIRST_AID_ROOM"
                                        required_area={values?.FIRST_AID_ROOM?.initial_detail?.required_area}
                                        required_area_fieldname={`REVISED_FIRST_AID_ROOM.avaialble_area`}
                                        document_field={`REVISED_FIRST_AID_ROOM.document`}
                                        FormContext={FormContext} />
                                </Card.Body>
                            </Card>)}
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6}>
                            {/* style={{ height: `${height}px` }} */}
                            {values.usertype === C.SL.APPLICANT
                                && values.FIRST_AID_ROOM?.as_per_norms === "no" &&
                                (<ViewStateRemark title={`FIRST_AID_ROOM`}
                                    as_per_norms={values.FIRST_AID_ROOM?.as_per_norms}
                                    reason={values.FIRST_AID_ROOM?.reason}
                                    assessor_remark={values.FIRST_AID_ROOM?.assessor_remark} />)}
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
                                                        name="FIRST_AID_ROOM.as_per_norms"
                                                        value="yes"
                                                        className="form-check-input me-2"
                                                    />
                                                    Yes
                                                </label>

                                                <label>
                                                    <Field
                                                        type="radio"
                                                        name="FIRST_AID_ROOM.as_per_norms"
                                                        value="no"
                                                        className="form-check-input me-2"
                                                    />
                                                    No
                                                </label>
                                            </div>

                                            <ErrorMessage
                                                name="FIRST_AID_ROOM.as_per_norms"
                                                component="div"
                                                className="invalid-feedback d-block"
                                            />
                                        </Form.Group>
                                    </Row>
                                    {values.FIRST_AID_ROOM.as_per_norms === "no" && (
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12">
                                                <Form.Label>
                                                    Select the Reason(s) and Raise Non-Conformities (NC)
                                                    <span style={{ color: "red" }}>*</span>
                                                </Form.Label>
                                                <Field
                                                    name="FIRST_AID_ROOM.reason"
                                                    as="select"
                                                    className="form-control"
                                                >
                                                     <option value="">Select</option>
                                                                                                            {C.reasons.map((lang, i) => (
                                                                                                                <option key={i} value={lang.value}>{lang.label}</option>
                                                                                                            ))}
                                                </Field>
                                            </Form.Group>

                                            {values.FIRST_AID_ROOM.reason === "other" && (
                                                <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                    <Form.Label>
                                                        Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name="FIRST_AID_ROOM.assessor_comments"
                                                        value={values.FIRST_AID_ROOM.assessor_comments}
                                                        onChange={handleChange}
                                                        className={`form-control ${touched.FIRST_AID_ROOM?.assessor_comments &&
                                                            errors.FIRST_AID_ROOM?.assessor_comments
                                                            ? "is-invalid"
                                                            : ""
                                                            }`}
                                                    />
                                                    {touched.FIRST_AID_ROOM?.assessor_comments &&
                                                        errors.FIRST_AID_ROOM?.assessor_comments && (
                                                            <div className="invalid-feedback">
                                                                {errors.FIRST_AID_ROOM.assessor_comments}
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