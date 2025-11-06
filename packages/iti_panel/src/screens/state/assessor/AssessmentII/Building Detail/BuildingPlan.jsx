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

import { FormContext } from "@/screens/state/assessor/AssessmentII/Building Detail/asmt_BuildingDetail";
import { formatedDate, formatLabel, viewFile } from "@/helpers";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";
import { SelectField } from "@/components/formik/Inputs";
import { SelectField2 } from "@/components/formik/Inputs/SelectField2";
import { FileField2 } from "@/components/formik/Inputs/FileField2";

export const BuildingPlan_asmt = ({ FormContext }) => {
    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = useContext(FormContext);

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
                        <h5> Building Plan</h5>
                    </div>
                </Card.Header>
                <Card.Body style={{ padding: "5px" }} >
                    <Row style={{
                        // backgroundColor: "rgb(245, 245, 245)", 
                        borderRadius: 6,
                    }} >
                        {console.log(values.building_plan.replied)}
                        <Col xl={6} lg={6} md={6} sm={6}>
                            {values.usertype === C.SL.ASSESSOR && (
                                <Card ref={divRef} className="border border-2  card custom-card  card">
                                    <Card.Body>
                                        {values.building_plan.replied === false && (<Table bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Language</th>
                                                    <th>Document</th>
                                                    <th>Notarized Document</th>
                                                    <th>Upload Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {values?.building_plan.building_plan_docs?.map((doc, i) => (
                                                    <tr key={i}>
                                                        <td>
                                                            {doc.language_for_building_plan}
                                                        </td>
                                                        <td>
                                                            <Button variant="primary" size="sm" className="me-2" onClick={() => { viewFile(doc.document_of_building_plan) }} > View Photo </Button>
                                                        </td>
                                                        <td>
                                                            {doc.notarised_document_of_building_plan != "" && (<Button variant="primary" size="sm" className="me-2" onClick={() => { viewFile(doc.notarised_document_of_building_plan) }} > View Photo </Button>)}
                                                        </td>
                                                        <td>
                                                            {formatedDate(doc.uploadDate)}
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </Table>
                                        )}
                                        {values.building_plan.replied === true && (
                                            'Show Latest'
                                        )}
                                    </Card.Body>
                                </Card>)}


                            {/* INPUT FOR APPLICANT */}
                            {values.building_plan.as_per_norms == C.SL.NO && values.usertype === C.SL.APPLICANT && (
                                <Card ref={divRef} className="border border-2  card custom-card  card">
                                    <Card.Body>
                                        <FieldArray name="bld_plan_documents">
                                            {({ push, remove }) => (
                                                <Card className="custom-card border border-primary">
                                                    <Card.Header>
                                                        <div className="card-title" style={{ textTransform: "none" }}>
                                                            Building Plan <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
                                                        </div>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Table bordered hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Document Language <span style={{ color: "red" }}>*</span></th>
                                                                    <th>Original Document <span style={{ color: "red" }}>*</span></th>
                                                                    <th>Notarised Copy</th>
                                                                    {false && (<th>Action</th>)}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {values?.bld_plan_documents?.map((doc, index) => (
                                                                    <tr
                                                                        key={doc.id} // ✅ stable unique key
                                                                        style={{
                                                                            marginBottom: "1rem",
                                                                            border: "1px solid #ccc",
                                                                            padding: "10px",
                                                                        }}
                                                                    >
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            <SelectField2
                                                                                label="Language"
                                                                                name={`bld_plan_documents[${index}].language`}
                                                                                mandatory
                                                                                options={C.languages2}
                                                                                size="lg"
                                                                                valueProp="value"     // ✅ correct
                                                                                labelProp="label"     // ✅ correct
                                                                                FormContext={FormContext}
                                                                            />

                                                                        </td>
                                                                        <td>
                                                                            <FileField2
                                                                                label="Document Upload"
                                                                                name={`bld_plan_documents[${index}].document`}
                                                                                mandatory
                                                                                accept=".pdf,.jpg,.png"
                                                                                context={FormContext}
                                                                                onClickViewFileButton={() => viewFile(values.bld_plan_documents[index].document)}
                                                                            />
                                                                        </td>

                                                                        <td>
                                                                            <FileField2
                                                                                label="Notarised Document"
                                                                                name={`bld_plan_documents[${index}].notarised_document`}
                                                                                mandatory
                                                                                accept=".pdf,.jpg,.png"
                                                                                context={FormContext}
                                                                                onClickViewFileButton={() => viewFile(values.bld_plan_documents[index].notarised_document)}
                                                                            />
                                                                        </td>
                                                                        {false && (<td>
                                                                            {/* Remove Button */}
                                                                            {values.bld_plan_documents.length > 1 && (
                                                                                <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                                                            )}
                                                                        </td>)}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </Card.Body>
                                                    {false && (<Card.Footer className="text-start">
                                                        <Button className="mb-3" onClick={() =>
                                                            push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                                                        }>
                                                            Add More
                                                        </Button>
                                                    </Card.Footer>)}
                                                </Card>
                                            )}
                                        </FieldArray>
                                    </Card.Body>
                                </Card>)}
                        </Col>


                        <Col xl={6} lg={6} md={6} sm={6}>
                            {values.usertype === C.SL.APPLICANT
                                && values.building_plan?.as_per_norms === "no" &&
                                (<ViewStateRemark title="Building Plan"
                                    as_per_norms={values.building_plan?.as_per_norms}
                                    reason={values.building_plan?.reason}
                                    assessor_remark={values.building_plan?.assessor_remark} />)}

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
                                                    Whether the Building Plan of the applicant are as per norms?
                                                    <span style={{ color: "red" }}>*</span>
                                                </Form.Label>

                                                <div role="group" aria-labelledby="as_per_norms-group">
                                                    <label className="me-3">
                                                        <Field
                                                            type="radio"
                                                            name="building_plan.as_per_norms"
                                                            value="yes"
                                                            className="form-check-input me-2"
                                                        />
                                                        Yes
                                                    </label>

                                                    <label>
                                                        <Field
                                                            type="radio"
                                                            name="building_plan.as_per_norms"
                                                            value="no"
                                                            className="form-check-input me-2"
                                                        />
                                                        No
                                                    </label>
                                                </div>

                                                <ErrorMessage
                                                    name="building_plan.as_per_norms"
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                />
                                            </Form.Group>
                                        </Row>
                                        {values.building_plan.as_per_norms === "no" && (
                                            <Row className="mb-3">
                                                <Form.Group as={Col} md="12">
                                                    <Form.Label>
                                                        Select the Reason(s) and Raise Non-Conformities (NC)
                                                        <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Field
                                                        name="building_plan.reason"
                                                        as="select"
                                                        className="form-control"
                                                    >
                                                        <option value="">Select</option>
                                                        {C.reasons.map((lang, i) => (
                                                            <option key={i} value={lang.value}>{lang.label}</option>
                                                        ))}
                                                    </Field>
                                                </Form.Group>

                                                {values.building_plan.reason === "other" && (
                                                    <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                        <Form.Label>
                                                            Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={3}
                                                            name="building_plan.assessor_comments"
                                                            value={values.building_plan.assessor_comments}
                                                            onChange={handleChange}
                                                            className={`form-control ${touched.building_plan?.assessor_comments &&
                                                                errors.building_plan?.assessor_comments
                                                                ? "is-invalid"
                                                                : ""
                                                                }`}
                                                        />
                                                        {touched.building_plan?.assessor_comments &&
                                                            errors.building_plan?.assessor_comments && (
                                                                <div className="invalid-feedback">
                                                                    {errors.building_plan.assessor_comments}
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
