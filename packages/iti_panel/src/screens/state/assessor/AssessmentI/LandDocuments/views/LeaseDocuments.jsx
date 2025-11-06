import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
import { FormContext } from "../LandDocuments";
import { formatedDate, viewFile } from "@/helpers";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";

import * as C from "affserver";
export const Comp = ({ title, info, FormContext }) => {

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
                                        <Row>
                                            <Col xs={12} sm={6} md={6} lg={6}>Name of Lessor: {info?.init?.lease_deed_info?.name_of_lessor} </Col>
                                            <Col xs={12} sm={6} md={6} lg={6}>Name of lessee: {info?.init?.lease_deed_info?.name_of_lessee} </Col>
                                            <Col xs={12} sm={6} md={6} lg={6}>Deed Number: {info?.init?.lease_deed_info?.lease_deed_number} </Col>
                                            <Col xs={12} sm={6} md={6} lg={6}>Commencement Date: {info?.init?.lease_deed_info?.date_of_commencement} </Col>
                                            <Col xs={12} sm={6} md={6} lg={6}>Date of Expirty: {info?.init?.lease_deed_info?.date_of_expiry} </Col>
                                        </Row>
                                        <hr />
                                        {console.log(info)}
                                        {info?.replied === false && (
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
                                                        info?.init?.docs?.map((obj, index) => {
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
                                            </Table>)
                                        }
                                        {info?.replied === true && (
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
                                            </Table>)
                                        }
                                    </Card.Body>
                                </Card>)}

                            {values?.LEASE_DOCUMENTS?.as_per_norms == C.SL.NO && values?.usertype === C.SL.APPLICANT && (
                                <Card ref={divRef} className="border border-2  card custom-card  card">
                                    <Card.Body>
                                        {console.log(info)}
                                        {true && (<FieldArray name="lease_deed_documents">
                                            {({ push, remove }) => (
                                                <Card className="custom-card border border-primary">
                                                    <Card.Header>
                                                        <div className="card-title" style={{ textTransform: "none" }}>
                                                            Upload Registered Lease Deed Documents <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
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

                                                                {values?.lease_deed_documents && values?.lease_deed_documents.length > 0 &&
                                                                    values.lease_deed_documents.map((doc, index) => (
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
                                                                                <BootstrapForm.Group>
                                                                                    <BootstrapForm.Select
                                                                                        size="lg"
                                                                                        name={`lease_deed_documents[${index}].language`}
                                                                                        value={values?.lease_deed_documents[index]?.language}
                                                                                        onChange={handleChange}
                                                                                        isInvalid={!!errors.lease_deed_documents?.[index]?.language}
                                                                                        isValid={
                                                                                            touched.lease_deed_documents?.[index]?.language &&
                                                                                            !errors.lease_deed_documents?.[index]?.language
                                                                                        }
                                                                                    >
                                                                                        <option value="">Select Language</option>
                                                                                        {C.languages.map((lang, i) => (
                                                                                            <option key={i} value={lang}>
                                                                                                {lang}
                                                                                            </option>
                                                                                        ))}
                                                                                    </BootstrapForm.Select>
                                                                                    <ErrorMessage
                                                                                        name={`lease_deed_documents[${index}].language`}
                                                                                        component="div"
                                                                                        style={{ color: "red" }}
                                                                                    />
                                                                                </BootstrapForm.Group>

                                                                            </td>

                                                                            <td>
                                                                                <BootstrapForm.Group>
                                                                                    {values.lease_deed_documents[index].document ? (
                                                                                        <div>
                                                                                            {/* Show selected file name */}
                                                                                            <strong>{values.lease_deed_documents[index].document.name}</strong>
                                                                                            <hr />
                                                                                            {/* View Button */}
                                                                                            <Button
                                                                                                variant="info"
                                                                                                size="sm"
                                                                                                className="ms-2"
                                                                                                onClick={() => {
                                                                                                    const document = values.lease_deed_documents[index].document;
                                                                                                    if (typeof document === 'string') {
                                                                                                        // If it's a string (likely a URL or path), view it directly
                                                                                                        viewFile(document);
                                                                                                    } else {
                                                                                                        // If it's a file object, create a URL and open it
                                                                                                        const fileURL = URL.createObjectURL(document);
                                                                                                        window.open(fileURL, "_blank");
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                View
                                                                                            </Button>

                                                                                            {/* Remove Button */}
                                                                                            <Button
                                                                                                variant="danger"
                                                                                                size="sm"
                                                                                                className="ms-2"
                                                                                                onClick={() => {
                                                                                                    const document = values.lease_deed_documents[index].document;
                                                                                                    if (typeof document === 'string') {
                                                                                                        console.log("Remove From Server", values.lease_deed_documents[index])
                                                                                                    } else {
                                                                                                        setFieldValue(`lease_deed_documents[${index}].document`, null)
                                                                                                    }
                                                                                                }
                                                                                                }
                                                                                            >
                                                                                                Remove
                                                                                            </Button>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <>
                                                                                            <BootstrapForm.Control
                                                                                                type="file"
                                                                                                onChange={(e) =>
                                                                                                    setFieldValue(`lease_deed_documents[${index}].document`, e.target.files[0])
                                                                                                }
                                                                                                isInvalid={!!errors.onwed_land_documents?.[index]?.documents}

                                                                                            />
                                                                                            <ErrorMessage
                                                                                                name={`lease_deed_documents[${index}].document`}
                                                                                                component="div"
                                                                                                style={{ color: "red" }}
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                </BootstrapForm.Group>
                                                                            </td>

                                                                            <td>
                                                                                <BootstrapForm.Group>
                                                                                    {values?.lease_deed_documents[index].notarised_document && values.lease_deed_documents[index].language != "Hindi" && values.lease_deed_documents[index].language != "English" ? (
                                                                                        <div>
                                                                                            {/* Show selected file name */}
                                                                                            <strong>{values.lease_deed_documents[index].notarised_document.name}</strong>
                                                                                            <hr />
                                                                                            {/* View Button */}
                                                                                            <Button
                                                                                                variant="info"
                                                                                                size="sm"
                                                                                                className="ms-2"
                                                                                                onClick={() => {
                                                                                                    const notarisedDocument = values.lease_deed_documents[index].notarised_document;
                                                                                                    if (typeof notarisedDocument === 'string') {
                                                                                                        // If it's a string (likely a URL or path), view it directly
                                                                                                        viewFile(notarisedDocument);
                                                                                                    } else {
                                                                                                        // If it's a file object, create a URL and open it
                                                                                                        const fileURL = URL.createObjectURL(notarisedDocument);
                                                                                                        window.open(fileURL, "_blank");
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                View
                                                                                            </Button>

                                                                                            {/* Remove Button */}
                                                                                            <Button
                                                                                                variant="danger"
                                                                                                size="sm"
                                                                                                className="ms-2"
                                                                                                onClick={() => {
                                                                                                    const notarisedDocument = values.lease_deed_documents[index].notarised_document;
                                                                                                    if (typeof notarisedDocument === 'string') {
                                                                                                        console.log("Remove From Server", values.lease_deed_documents[index])
                                                                                                    } else {
                                                                                                        setFieldValue(`lease_deed_documents[${index}].notarised_document`, null)
                                                                                                    }
                                                                                                }
                                                                                                }
                                                                                            >
                                                                                                Remove
                                                                                            </Button>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <>
                                                                                            <BootstrapForm.Control
                                                                                                disabled={
                                                                                                    values.lease_deed_documents[index].language === "Hindi" ||
                                                                                                    values.lease_deed_documents[index].language === "English"
                                                                                                } // ✅ Disable if Hindi/English
                                                                                                type="file"
                                                                                                onChange={(e) =>
                                                                                                    setFieldValue(`lease_deed_documents[${index}].notarised_document`, e.target.files[0])
                                                                                                }
                                                                                                isInvalid={!!errors.lease_deed_documents?.[index]?.notarised_document}

                                                                                            />
                                                                                            <ErrorMessage
                                                                                                name={`lease_deed_documents[${index}].notarised_document`}
                                                                                                component="div"
                                                                                                style={{ color: "red" }}
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                </BootstrapForm.Group>
                                                                            </td>
                                                                            <td>
                                                                                {/* Remove Button */}
                                                                                {values.lease_deed_documents.length > 1 && (
                                                                                    <>
                                                                                        {(() => {
                                                                                            const record = values.lease_deed_documents[index];
                                                                                            const document = values.lease_deed_documents[index].document;
                                                                                            const ndocument = values.lease_deed_documents[index].notarised_document;
                                                                                            console.log(document, ndocument);

                                                                                            if (typeof document === 'string' || typeof ndocument === 'string') {
                                                                                                console.log("Remove From Server");
                                                                                                return (<Button variant="danger" size="sm" onClick={console.log("Remove From Server", record)}>
                                                                                                    Re-upload
                                                                                                </Button>)
                                                                                            } else {
                                                                                                return (
                                                                                                    <Button variant="danger" size="sm" onClick={() => remove(index)}>
                                                                                                        Remove
                                                                                                    </Button>
                                                                                                );
                                                                                            }
                                                                                        })()}
                                                                                    </>
                                                                                )}
                                                                            </td>

                                                                        </tr>
                                                                    ))
                                                                }
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
                                        </FieldArray>)}
                                    </Card.Body>
                                </Card>)}

                        </Col>
                        <Col xl={4} lg={4} md={4} sm={4}>
                            {values.usertype === C.SL.APPLICANT
                                && values.LEASE_DOCUMENTS?.as_per_norms === "no" &&
                                (<ViewStateRemark title={C.DA1_KEYS.LEASE_DOCUMENTS}
                                    as_per_norms={values.LEASE_DOCUMENTS?.as_per_norms}
                                    reason={values.LEASE_DOCUMENTS?.reason}
                                    assessor_remark={values.LEASE_DOCUMENTS?.assessor_remark} />)}
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
                                                        name="LEASE_DOCUMENTS.as_per_norms"
                                                        value="yes"
                                                        className="form-check-input me-2"
                                                    />
                                                    Yes
                                                </label>

                                                <label>
                                                    <Field
                                                        type="radio"
                                                        name="LEASE_DOCUMENTS.as_per_norms"
                                                        value="no"
                                                        className="form-check-input me-2"
                                                    />
                                                    No
                                                </label>
                                            </div>

                                            <ErrorMessage
                                                name="LEASE_DOCUMENTS.as_per_norms"
                                                component="div"
                                                className="invalid-feedback d-block"
                                            />
                                        </Form.Group>
                                    </Row>
                                    {values.LEASE_DOCUMENTS.as_per_norms === "no" && (
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12">
                                                <Form.Label>
                                                    Select the Reason(s) and Raise Non-Conformities (NC)
                                                    <span style={{ color: "red" }}>*</span>
                                                </Form.Label>
                                                <Field
                                                    name="LEASE_DOCUMENTS.reason"
                                                    as="select"
                                                    className="form-control"
                                                >
                                                    <option value="">Select</option>
                                                    {C.reasons.map((lang, i) => (
                                                        <option key={i} value={lang.value}>{lang.label}</option>
                                                    ))}
                                                </Field>
                                            </Form.Group>

                                            {values.LEASE_DOCUMENTS.reason === "other" && (
                                                <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                    <Form.Label>
                                                        Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name="LEASE_DOCUMENTS.assessor_comments"
                                                        value={values.LEASE_DOCUMENTS.assessor_comments}
                                                        onChange={handleChange}
                                                        className={`form-control ${touched.LEASE_DOCUMENTS?.assessor_comments &&
                                                            errors.LEASE_DOCUMENTS?.assessor_comments
                                                            ? "is-invalid"
                                                            : ""
                                                            }`}
                                                    />
                                                    {touched.LEASE_DOCUMENTS?.assessor_comments &&
                                                        errors.LEASE_DOCUMENTS?.assessor_comments && (
                                                            <div className="invalid-feedback">
                                                                {errors.LEASE_DOCUMENTS.assessor_comments}
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