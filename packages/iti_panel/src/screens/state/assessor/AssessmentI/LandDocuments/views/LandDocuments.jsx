import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
import { FormContext } from "../LandDocuments";
import { formatedDate, viewFile } from "@/helpers";
import * as C from "affserver";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";
import { SelectField2 } from "@/components/formik/Inputs/SelectField2";
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
                                {console.log(info)}
                                {info.replied === false && (<Table bordered hover>
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
                                </Table>)}
                                {info.replied === true && (<Table bordered hover>
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
                                            info?.latest?.map((obj, index) => {
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
                                </Table>)}
                            </Card.Body>
                        </Card>)}

                    {values?.LAND_DOCUMENTS?.as_per_norms == C.SL.NO && values?.usertype === C.SL.APPLICANT && (

                        <FieldArray name="onwed_land_documents">
                            {({ push, remove }) => (
                                <Card className="custom-card border border-primary">
                                    <Card.Header>
                                        <div className="card-title" style={{ textTransform: "none" }}>
                                            Onwed Land Documents <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
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
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {values?.onwed_land_documents?.map((doc, index) => (
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
                                                                label="State"
                                                                name={`onwed_land_documents[${index}].land_documents_language`}
                                                                mandatory
                                                                options={C.languages2}
                                                                size="lg"
                                                                FormContext={FormContext}
                                                            />

                                                        </td>

                                                        <td>
                                                            <FileField2
                                                                label="Select Document"
                                                                name={`onwed_land_documents[${index}].land_documents`}
                                                                mandatory
                                                                accept=".pdf,.jpg,.png"
                                                                context={FormContext}  // passing the context here
                                                                onClickViewFileButton={() => viewFile(values.onwed_land_documents[index].land_documents)}

                                                            />
                                                        </td>

                                                        <td>
                                                            <FileField2
                                                                label="Select Document"
                                                                name={`onwed_land_documents[${index}].land_notarised_documents`}
                                                                mandatory
                                                                accept=".pdf,.jpg,.png"
                                                                context={FormContext}  // passing the context here
                                                                onClickViewFileButton={() => viewFile(values.onwed_land_documents[index].land_notarised_documents)}

                                                            />
                                                        </td>
                                                        <td>
                                                            {/* Remove Button */}
                                                            {values.onwed_land_documents.length > 1 && (
                                                                <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer className="text-start">
                                        <Button className="mb-3" onClick={() =>
                                            push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                                        }>
                                            Add More
                                        </Button>
                                    </Card.Footer>
                                </Card>

                            )}
                        </FieldArray>
                    )}


                </Col>
                <Col xl={4} lg={4} md={4} sm={4}>
                    {values.usertype === C.SL.APPLICANT
                        && values.LAND_DOCUMENTS?.as_per_norms === "no" &&
                        (<ViewStateRemark title={C.DA1_KEYS.LAND_DOCUMENT}
                            as_per_norms={values.LAND_DOCUMENTS?.as_per_norms}
                            reason={values.LAND_DOCUMENTS?.reason}
                            assessor_remark={values.LAND_DOCUMENTS?.assessor_remark} />)}

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
                                            {C.reasons.map((lang, i) => (
                                                <option key={i} value={lang.value}>{lang.label}</option>
                                            ))}
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
                    </Card>)}
                </Col>
            </Row>
        </Card.Body>
    </Card>);
};
export default Comp;