import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";

import { useLocation } from "react-router-dom";

import * as C from "affserver";
import * as st from "@/services/state/index";

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { st1_da_landdocuments } from "affserver";
import { ContextMap } from "@/components/formik/contexts";
import { Navigations } from "@/components/Assessment/components";

import { FormContext } from "../../TradewiseMachineryToolsEquipment";
import { formatedDate, formatLabel, viewFile } from "@/helpers";

export const Comp = ({ title, info, index }) => {

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
                            <Card ref={divRef} className="border border-2  card custom-card  card">
                                <Card.Body>
                                    {console.log(info)}
                                    <Table bordered hover>
                                        <thead>
                                            <tr>
                                                {/* <th>Available Number</th> */}
                                                <th>Required Area</th>
                                                <th>Available Area</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* <td>1</td> */}
                                                <td>{info?.initial_detail?.required_area} sqm</td>
                                                <td>{info?.initial_detail?.totalAvailableArea} sqm</td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                    {console.log(info)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6}>
                            {/* style={{ height: `${height}px` }} */}
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
                                                        name={`itLab[${index}].as_per_norms`}
                                                        value="yes"
                                                        className="form-check-input me-2"
                                                    />
                                                    Yes
                                                </label>

                                                <label>
                                                    <Field
                                                        type="radio"
                                                        name={`itLab[${index}].as_per_norms`}
                                                        value="no"
                                                        className="form-check-input me-2"
                                                    />
                                                    No
                                                </label>
                                            </div>

                                            <ErrorMessage
                                                name={`itLab[${index}].as_per_norms`}
                                                component="div"
                                                className="invalid-feedback d-block"
                                            />
                                        </Form.Group>
                                    </Row>
                                    {values.itLab[index].as_per_norms === "no" && (
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12">
                                                <Form.Label>
                                                    Select the Reason(s) and Raise Non-Conformities (NC)
                                                    <span style={{ color: "red" }}>*</span>
                                                </Form.Label>
                                                <Field
                                                    name={`itLab[${index}].reason`}
                                                    as="select"
                                                    className="form-control"
                                                >
                                                    <option value="">Select</option>
                                                    {/* {MaxData.map((lang, i) => (
            <option key={i} value={lang.value}>{lang.label}</option>
          ))} */}
                                                </Field>
                                            </Form.Group>

                                            {values.itLab[index].reason === "other" && (
                                                <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                    <Form.Label>
                                                        Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name={`itLab[${index}].assessor_comments`}
                                                        value={values.itLab[index].assessor_comments}
                                                        onChange={handleChange}
                                                        className={`form-control ${touched.itLab[index].assessor_comments &&
                                                            errors.itLab[index].assessor_comments
                                                            ? "is-invalid"
                                                            : ""
                                                            }`}
                                                    />
                                                    {touched.itLab[index].assessor_comments &&
                                                        errors.itLab[index].assessor_comments && (
                                                            <div className="invalid-feedback">
                                                                {errors.itLab[index].assessor_comments}
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
            </Card>
        </>
    );
};
export default Comp;