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

import { FormContext } from "@/screens/Applicant/StageII/da/applicant/AssessmentII/Building Detail/asmt_BuildingDetail";
import { formatedDate, formatLabel, viewFile } from "@/helpers";
import { BuildingPlanDocuments } from "@/components/new_registration/form/stateII/BuildingPlan";



export const BuildingPlan_asmt = () => {
    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = useContext(FormContext);

    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.clientHeight); // or offsetHeight / scrollHeight
        }
    }, []); // runs once on mount

    const languages = [
        "",
        "Hindi",
        "English",
        "Bengali",
        "Telugu",
        "Marathi",
        "Tamil",
        "Urdu",
        "Gujarati",
        "Kannada",
        "Odia",
        "Malayalam",
        "Punjabi",
    ];


    return (<Card className="custom-card border border-primary" style={{ padding: "0px" }}>
        <Card.Header>
            <div className="card-title" style={{ textTransform: "none" }}>
                <h5> Building Plan</h5>
            </div>
        </Card.Header>
        <Card.Body style={{ padding: "5px" }} >
            <Row style={{ borderRadius: 6, }}>
                <Col xl={8} lg={8} md={8} sm={8}>
                    {values.building_plan.as_per_norms == "yes" && (
                        <Card ref={divRef} className="border border-2  card custom-card  card">
                            <Card.Body>
                                <Table bordered hover>
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
                            </Card.Body>
                        </Card>
                    )}
                    {values.building_plan.as_per_norms == "no" && (
                        <Card ref={divRef} className="border border-2  card custom-card  card">
                            <Card.Body>
                              {false && (  <FieldArray name="bld_plan_documents">
                                    {({ push, remove }) => (
                                        <Card className="custom-card border border-primary">
                                            <Card.Header>
                                                <div className="card-title" style={{ textTransform: "none" }}>
                                                    Building Plan <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                {true && (<Table bordered hover>
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
                                                        {values?.bld_plan_documents.map((doc, index) => (
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
                                                                    <SelectField
                                                                        label="State"
                                                                        name={`bld_plan_documents[${index}].language`}
                                                                        mandatory
                                                                        options={language}
                                                                        contextName="Stage2Form"
                                                                        valueProp="language"
                                                                        labelProp="language"
                                                                        size="lg"
                                                                    />
                                                                </td>

                                                                <td>
                                                                    <BootstrapForm.Group>
                                                                        {values.bld_plan_documents[index].document ? (
                                                                            <div>
                                                                                <strong>{values.bld_plan_documents[index].document.name}</strong>
                                                                                <hr />
                                                                                <Button
                                                                                    variant="info"
                                                                                    size="sm"
                                                                                    className="ms-2"
                                                                                    onClick={() =>
                                                                                        window.open(
                                                                                            URL.createObjectURL(values.bld_plan_documents[index].document),
                                                                                            "_blank"
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    View
                                                                                </Button>

                                                                                <Button
                                                                                    variant="danger"
                                                                                    size="sm"
                                                                                    className="ms-2"
                                                                                    onClick={() => setFieldValue(`bld_plan_documents[${index}].document`, null)}
                                                                                >
                                                                                    Remove
                                                                                </Button>
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <BootstrapForm.Control
                                                                                    type="file"
                                                                                    onChange={(e) =>
                                                                                        setFieldValue(`bld_plan_documents[${index}].document`, e.target.files[0])
                                                                                    }
                                                                                    isInvalid={!!errors.bld_plan_documents?.[index]?.document}
                                                                                />
                                                                                <ErrorMessage
                                                                                    name={`bld_plan_documents[${index}].document`}
                                                                                    component="div"
                                                                                    style={{ color: "red" }}
                                                                                />
                                                                            </>
                                                                        )}
                                                                    </BootstrapForm.Group>
                                                                </td>

                                                                <td>
                                                                    <BootstrapForm.Group>
                                                                        {values.bld_plan_documents[index].notarised_document && values.bld_plan_documents[index].language != "Hindi" && values.bld_plan_documents[index].language != "English" ? (
                                                                            <div>
                                                                                {/* Show selected file name */}
                                                                                <strong>{values.bld_plan_documents[index].notarised_document.name}</strong>
                                                                                <hr />
                                                                                {/* View Button */}
                                                                                <Button
                                                                                    variant="info"
                                                                                    size="sm"
                                                                                    className="ms-2"
                                                                                    onClick={() =>
                                                                                        window.open(
                                                                                            URL.createObjectURL(values.bld_plan_documents[index].notarised_document),
                                                                                            "_blank"
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    View
                                                                                </Button>
                                                                                {/* Remove Button */}
                                                                                <Button
                                                                                    variant="danger"
                                                                                    size="sm"
                                                                                    className="ms-2"
                                                                                    onClick={() => setFieldValue(`bld_plan_documents[${index}].notarised_document`, null)}
                                                                                >
                                                                                    Remove
                                                                                </Button>
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <BootstrapForm.Control
                                                                                    disabled={
                                                                                        values.bld_plan_documents[index].language === "Hindi" ||
                                                                                        values.bld_plan_documents[index].language === "English"
                                                                                    } // ✅ Disable if Hindi/English
                                                                                    type="file"
                                                                                    onChange={(e) =>
                                                                                        setFieldValue(`bld_plan_documents[${index}].notarised_document`, e.target.files[0])
                                                                                    }
                                                                                    isInvalid={!!errors.bld_plan_documents?.[index]?.notarised_document}

                                                                                />
                                                                                <ErrorMessage
                                                                                    name={`bld_plan_documents[${index}].notarised_document`}
                                                                                    component="div"
                                                                                    style={{ color: "red" }}
                                                                                />
                                                                            </>
                                                                        )}
                                                                    </BootstrapForm.Group>

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
                                                </Table>)}
                                            </Card.Body>
                                            {false && (
                                                <Card.Footer className="text-start">
                                                    <Button className="mb-3" onClick={() =>
                                                        push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                                                    }>
                                                        Add More
                                                    </Button>
                                                </Card.Footer>)}
                                        </Card>
                                    )}
                                </FieldArray>)}
                            </Card.Body>
                        </Card>
                    )}
                </Col>
                <Col xl={4} lg={4} md={4} sm={4}>
                    {/* style={{ height: `${height}px` }} */}
                    <Card className="border border-2  card custom-card  card" >
                        <Card.Header>
                            <label className="main-content-label my-auto" style={{ textTransform: "none" }} > Remark </label>
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
                                                disabled
                                                type="radio"
                                                name="building_plan.as_per_norms"
                                                value="yes"
                                                className="form-check-input me-2"
                                            />
                                            Yes
                                        </label>

                                        <label>
                                            <Field
                                                disabled
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
                                            disabled
                                            name="building_plan.reason"
                                            as="select"
                                            className="form-control"
                                        >
                                            <option value="">Select</option>
                                            {/* {MaxData.map((lang, i) => (
            <option key={i} value={lang.value}>{lang.label}</option>
          ))} */}
                                        </Field>
                                    </Form.Group>

                                    {values.building_plan.reason === "other" && (
                                        <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                            <Form.Label>
                                                Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                            </Form.Label>
                                            <Form.Control
                                                disabled
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
                </Col>
            </Row>
        </Card.Body>
    </Card>);
};
