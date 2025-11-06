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

// import { FormContext } from "@/screens/state/assessor/AssessmentII/Electricity Connection Details/ElectricityConnection";
import { formatedDate, formatLabel, viewFile } from "@/helpers";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";
import ReqSign from "@/components/new_registration/form/comp/requiredSign";
import { FileField2 } from "@/components/formik/Inputs/FileField2";

export const RevisedElectrityConnectionDetails = ({ title, info, FormContext }) => {

    const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = useContext(FormContext);

    return (
        <>
            <Card className="custom-card border border-primary" style={{ padding: "0px" }}>
                <Card.Header>
                    <div className="card-title" style={{ textTransform: "none" }}>
                        <h5> {title}</h5>
                    </div>
                </Card.Header>
                <Card.Body style={{ padding: "5px" }} >
                    <Row style={{ marginTop: "1rem" }}>
                        <Col md={4}>

                            <Form.Label>
                                Consumer Name
                                <ReqSign />
                            </Form.Label>
                            <Field
                                type="text"
                                name="REVISED_ELECTRICITY_CONNECTION.consumer_name"
                                as={Form.Control}
                                placeholder="Electricity Consumer Name"

                            />
                            <div className="text-danger">
                                <ErrorMessage name="REVISED_ELECTRICITY_CONNECTION.consumer_name" />
                            </div>


                            {/* <Form.Group>
                                <Form.Label>
                                    Consumer Name
                                    <ReqSign />
                                </Form.Label>
                                <Field
                                    name="REVISED_ELECTRICITY_CONNECTION.consumer_name"
                                    as={Form.Control}
                                    placeholder="Electricity Consumer Name"
                                    value={values.consumer_name}
                                    onChange={handleChange}
                                    isInvalid={
                                        touched.consumer_name &&
                                        !!errors.consumer_name
                                    }
                                />
                                {touched.consumer_name && errors.consumer_name && (
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="d-block"
                                    >
                                        {errors.consumer_name}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group> */}
                        </Col>
                        <Col md={4}>
                            <Form.Label>
                                Electricity Consumer Number
                                <ReqSign />
                            </Form.Label>
                            <Field
                                type="text"
                                name="REVISED_ELECTRICITY_CONNECTION.consumer_number"
                                as={Form.Control}
                                placeholder="Electricity Consumer Number"

                            />
                            <div className="text-danger">
                                <ErrorMessage name="REVISED_ELECTRICITY_CONNECTION.consumer_number" />
                            </div>
                            {/* <Form.Group>

                                <Field
                                    as={Form.Control}
                                    placeholder="Electricity Consumer Number"
                                    value={values.consumer_number}
                                    onChange={handleChange}
                                    isInvalid={
                                        touched.consumer_number &&
                                        !!errors.consumer_number
                                    }
                                />
                                {touched.consumer_number && errors.consumer_number && (
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="d-block"
                                    >
                                        {errors.consumer_number}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group> */}
                        </Col>

                        <Col md={4}>
                            <Form.Label>
                                Electricity Authority Name
                                <ReqSign />
                            </Form.Label>
                            <Field
                                type="text"
                                name="REVISED_ELECTRICITY_CONNECTION.electricity_authority_name"
                                as={Form.Control}
                                placeholder="Ex. xyz Vidyut Vitran Nigam Limited"
                            />
                            <ErrorMessage name="REVISED_ELECTRICITY_CONNECTION.electricity_authority_name" />

                            {/* 
                            <Form.Group>
                                <Form.Label>
                                    Electricity Authority Name
                                    <ReqSign />
                                </Form.Label>
                                <Field
                                    name="electricity_authority_name"
                                    as={Form.Control}
                                    placeholder="Ex. Jaipur Vidyut Vitran Nigam Limited"
                                    value={values.electricity_authority_name}
                                    onChange={handleChange}
                                    isInvalid={
                                        touched.electricity_authority_name &&
                                        !!errors.electricity_authority_name
                                    }
                                />
                                {touched.electricity_authority_name && errors.electricity_authority_name && (
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="d-block"
                                    >
                                        {errors.electricity_authority_name}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group> */}
                        </Col>
                        <Col md={4}>
                            <Form.Label>
                                Electricity Authority Website
                                <ReqSign />
                            </Form.Label>
                            <Field
                                type="text"
                                name="REVISED_ELECTRICITY_CONNECTION.electricity_authority_website"
                                as={Form.Control}
                                placeholder="Ex. https://www.bijlimitra.com/"

                            />
                            <ErrorMessage name="REVISED_ELECTRICITY_CONNECTION.electricity_authority_website" />
                            {/* <Form.Group>
                                <Form.Label>
                                    Electricity Authority Website
                                    <ReqSign />
                                </Form.Label>
                                <Field
                                    name="electricity_authority_website"
                                    as={Form.Control}
                                    placeholder="Ex. https://www.bijlimitra.com/"
                                    value={values.electricity_authority_website}
                                    onChange={handleChange}
                                    isInvalid={
                                        touched.electricity_authority_website &&
                                        !!errors.electricity_authority_website
                                    }
                                />
                                {touched.electricity_authority_website && errors.electricity_authority_website && (
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="d-block"
                                    >
                                        {errors.electricity_authority_website}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group> */}
                        </Col>
                        <Col md={4}>
                            <Form.Label>
                                Total Available/Sanction Load (in KW)
                                <ReqSign />
                            </Form.Label>
                            <Field
                                type="number"
                                name="REVISED_ELECTRICITY_CONNECTION.total_available_sanction_load_in_kw"
                                as={Form.Control}
                                placeholder="Total Available/Sanction load (in KW)"

                            />
                            <ErrorMessage name="REVISED_ELECTRICITY_CONNECTION.total_available_sanction_load_in_kw" />

                            {/* <Form.Group controlId="validationCustom02">
                                <Form.Label>
                                    Total Available/Sanction Load (in KW)
                                    <ReqSign />
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Total Available/Sanction load (in KW)"
                                        name="total_available_sanction_load_in_kw"
                                        value={values.total_available_sanction_load_in_kw}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.total_available_sanction_load_in_kw &&
                                            !!errors.total_available_sanction_load_in_kw
                                        }
                                    />
                                    <Button variant="outline-secondary">In KW</Button>
                                </InputGroup>
                                {touched.total_available_sanction_load_in_kw && errors.total_available_sanction_load_in_kw && (
                                    <Form.Control.Feedback
                                        type="invalid"
                                        className="d-block"
                                    >
                                        {errors.total_available_sanction_load_in_kw}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group> */}
                        </Col>
                        <Col md={12}>

                            <FileField2
                                label={`Latest Electricity Bill / Meter Sealing Report (for new institute if bill is not available )`}
                                name="REVISED_ELECTRICITY_CONNECTION.document"
                                mandatory
                                accept=".pdf,.jpg,.png"
                                context={FormContext}
                            />

                            {false && (<Form.Group>
                                <Form.Label>
                                    Latest Electricity Bill / Meter Sealing Report (for new
                                    institute if bill is not available )<ReqSign />
                                </Form.Label>
                                {/* <div className="d-flex align-items-center gap-2"> */}
                                <Form.Control type="file" name="latest_electricity_bill_meter_sealing_report"
                                    onChange={(event) => {
                                        setFieldValue(
                                            `latest_electricity_bill_meter_sealing_report`,
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                    isInvalid={
                                        touched.latest_electricity_bill_meter_sealing_report &&
                                        !!errors.latest_electricity_bill_meter_sealing_report
                                    }
                                />
                                {/* <Button variant="primary">Upload</Button>
                      </div> */}
                                {touched.latest_electricity_bill_meter_sealing_report &&
                                    errors.latest_electricity_bill_meter_sealing_report && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.latest_electricity_bill_meter_sealing_report}
                                        </Form.Control.Feedback>
                                    )}

                            </Form.Group>)}

                            {/* <div>
                                {values.latest_electricity_bill_meter_sealing_report && (
                                    <div className="d-flex justify-content-between align-items-center" style={{ marginTop: 2, backgroundColor: "aliceblue", padding: 3 }}>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            type="button"
                                            onClick={() =>
                                                setFieldValue(`setFieldValue`, null)
                                            }
                                        >
                                            Remove
                                        </Button>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            type="button"
                                            className="btn-block"
                                            onClick={() =>
                                                viewFile(values.latest_electricity_bill_meter_sealing_report)
                                            }
                                        >
                                            View Document
                                        </Button>
                                    </div>
                                )}
                            </div> */}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};
