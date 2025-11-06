import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
import { FormContext } from "../LandDocuments";
import * as C from "affserver";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";

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
                        <Col xl={8} lg={8} md={8} sm={8}>
                            {values.usertype === C.SL.ASSESSOR && (<Card ref={divRef} className="border border-2  card custom-card  card">
                                <Card.Body>
                                    {console.log(info?.latest?.land_area)}
                                    {info.replied === false && (<Table bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Possasstion of Land</th>
                                                <th>Area</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* <td>1</td> */}
                                                <td>{info?.init?.possession_of_land}</td>
                                                <td>{info?.init?.land_area_in_square_metres} sqm</td>
                                            </tr>
                                        </tbody>
                                    </Table>)}

                                    {info.replied === true && (<Table bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Possasstion of Land</th>
                                                <th>Area</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* <td>1</td> */}
                                                <td>{info?.init?.possession_of_land}</td>
                                                <td>{info?.latest?.land_area} sqm</td>
                                            </tr>
                                        </tbody>
                                    </Table>)}

                                </Card.Body>
                            </Card>)}


                            {values?.LAND_AREA?.as_per_norms == C.SL.NO && values?.usertype === C.SL.APPLICANT && (
                                <Card ref={divRef} className="border border-2  card custom-card  card">
                                    <Card.Body>
                                        <Form.Label htmlFor="land_area_in_square_metres">Land Area (in square metres)</Form.Label>
                                        <Field
                                            type="number"
                                            name="land_area_in_square_metres"
                                            as={Form.Control}
                                        />
                                        <div className="text-danger">
                                            <ErrorMessage name="land_area_in_square_metres" />
                                        </div>
                                    </Card.Body>
                                </Card>)}
                        </Col>
                        <Col xl={4} lg={4} md={4} sm={4}>

                            {values?.usertype === C.SL.APPLICANT
                                && values.LAND_AREA?.as_per_norms === "no" &&
                                (<ViewStateRemark title={C.DA1_KEYS.LAND_AREA}
                                    as_per_norms={values?.LAND_AREA?.as_per_norms}
                                    reason={values?.LAND_AREA?.reason}
                                    assessor_remark={values?.LAND_AREA?.assessor_remark} />)}

                            {values?.usertype === C.SL.ASSESSOR && (
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
                                                            name="LAND_AREA.as_per_norms"
                                                            value="yes"
                                                            className="form-check-input me-2"
                                                        />
                                                        Yes
                                                    </label>

                                                    <label>
                                                        <Field
                                                            type="radio"
                                                            name="LAND_AREA.as_per_norms"
                                                            value="no"
                                                            className="form-check-input me-2"
                                                        />
                                                        No
                                                    </label>
                                                </div>

                                                <ErrorMessage
                                                    name="LAND_AREA.as_per_norms"
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                />
                                            </Form.Group>
                                        </Row>
                                        {values?.LAND_AREA.as_per_norms === "no" && (
                                            <Row className="mb-3">
                                                <Form.Group as={Col} md="12">
                                                    <Form.Label>
                                                        Select the Reason(s) and Raise Non-Conformities (NC)
                                                        <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Field
                                                        name="LAND_AREA.reason"
                                                        as="select"
                                                        className="form-control"
                                                    >
                                                        <option value="">Select</option>
                                                        {C.reasons.map((lang, i) => (
                                                            <option key={i} value={lang.value}>{lang.label}</option>
                                                        ))}
                                                    </Field>
                                                </Form.Group>

                                                {values.LAND_AREA.reason === "other" && (
                                                    <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                        <Form.Label>
                                                            Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={3}
                                                            name="LAND_AREA.assessor_comments"
                                                            value={values.LAND_AREA.assessor_comments}
                                                            onChange={handleChange}
                                                            className={`form-control ${touched.LAND_AREA?.assessor_comments &&
                                                                errors.LAND_AREA?.assessor_comments
                                                                ? "is-invalid"
                                                                : ""
                                                                }`}
                                                        />
                                                        {touched.LAND_AREA?.assessor_comments &&
                                                            errors.LAND_AREA?.assessor_comments && (
                                                                <div className="invalid-feedback">
                                                                    {errors.LAND_AREA.assessor_comments}
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