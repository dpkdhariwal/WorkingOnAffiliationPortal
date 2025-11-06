import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
import { FormContext } from "../OtherDocuments";
import { formatedDate, viewFile } from "@/helpers";
import * as C from "affserver";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";
import { FileField2 } from "@/components/formik/Inputs/FileField2";


export const Comp = ({ title, info, FormContext }) => {

    const divRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [designation_master, setDesignation_master] = useState(C.designation);

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
                                        <table
                                            width="98%"
                                            border={1}
                                            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                                            align="center"
                                            cellPadding="5px"
                                        >
                                            <thead>
                                                <tr>
                                                    <th style={{ border: "1px solid black" }}>ID Proof of Secretary/Chairperson/President</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ border: "1px solid black" }}>
                                                        <table
                                                            width="98%"
                                                            border={1}
                                                            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                                                            align="center"
                                                            cellPadding="5px"
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ border: "1px solid black" }}>Designation</th>
                                                                    <th style={{ border: "1px solid black" }}>ID Proof Type</th>
                                                                    <th style={{ border: "1px solid black" }}>ID Proof Number</th>
                                                                    <th style={{ border: "1px solid black" }}>ID Proof Document</th>
                                                                    <th style={{ border: "1px solid black" }}>Uploaded Date</th>
                                                                </tr>
                                                            </thead>
                                                            {info.replied === false && (<tbody>
                                                                {values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.init?.map((obj, index) => {
                                                                    return (<tr key={index}>
                                                                        <td style={{ border: "1px solid black" }}>{obj?.designation}</td>
                                                                        <td style={{ border: "1px solid black" }}>{obj?.id_proof_type}</td>
                                                                        <td style={{ border: "1px solid black" }}>{obj?.id_proof_number}</td>
                                                                        <td style={{ border: "1px solid black" }}><Button variant="info" size="sm" onClick={() => { viewFile(obj?.document) }}>View ID Proof Document</Button></td>
                                                                        <td style={{ border: "1px solid black" }}>{formatedDate(obj?.uploaded_datetime)}</td>
                                                                    </tr>)
                                                                })}
                                                            </tbody>)}
                                                            {info.replied === true && (<tbody>
                                                                {values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.latest?.map((obj, index) => {
                                                                    return (<tr key={index}>
                                                                        <td style={{ border: "1px solid black" }}>{obj?.designation}</td>
                                                                        <td style={{ border: "1px solid black" }}>{obj?.id_proof_type}</td>
                                                                        <td style={{ border: "1px solid black" }}>{obj?.id_proof_number}</td>
                                                                        <td style={{ border: "1px solid black" }}><Button variant="info" size="sm" onClick={() => { viewFile(obj?.document) }}>View ID Proof Document</Button></td>
                                                                        <td style={{ border: "1px solid black" }}>{formatedDate(obj?.uploaded_datetime)}</td>
                                                                    </tr>)
                                                                })}
                                                            </tbody>)}
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr />


                                    </Card.Body>
                                </Card>)}
                            {values.usertype === C.SL.APPLICANT && values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.as_per_norms === "no" && (
                                <FieldArray name="id_proof_scp">
                                    {({ push, remove }) => (
                                        <Card className="custom-card border border-primary">
                                            <Card.Header>
                                                <div className="card-title" style={{ textTransform: "none" }}>
                                                    ID Proof of Secretary/Chairperson/President
                                                </div> <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
                                            </Card.Header>
                                            <Card.Body>
                                                <Table bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Person Designation <span style={{ color: "red" }}>*</span></th>
                                                            <th>Select ID Proof Type <span style={{ color: "red" }}>*</span></th>
                                                            <th>Enter ID Proof Numbe<span style={{ color: "red" }}>*</span></th>
                                                            <th>Select Document<span style={{ color: "red" }}>*</span></th>
                                                            {/* <th>Action</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {values.id_proof_scp.map((doc, index) => {
                                                            // get already selected designations
                                                            const selectedDesignations = values.id_proof_scp.map(p => p.designation);

                                                            const availableOptions = designation_master.filter(
                                                                opt => !selectedDesignations.includes(opt.designation) || opt.designation === doc.designation
                                                            );
                                                            console.log(availableOptions);


                                                            return (<tr
                                                                key={doc.id}
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
                                                                            name={`id_proof_scp[${index}].designation`}
                                                                            value={values.id_proof_scp[index].designation}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!errors.id_proof_scp?.[index]?.designation}
                                                                            isValid={
                                                                                touched.id_proof_scp?.[index]?.designation &&
                                                                                !errors.id_proof_scp?.[index]?.designation
                                                                            }
                                                                        >
                                                                            <option value="">Select Language</option>
                                                                            {availableOptions.map((item, i) => (
                                                                                <option key={i} value={item}>
                                                                                    {item}
                                                                                </option>
                                                                            ))}
                                                                        </BootstrapForm.Select>
                                                                        <ErrorMessage
                                                                            name={`id_proof_scp[${index}].designation`}
                                                                            component="div"
                                                                            style={{ color: "red" }}
                                                                        />
                                                                    </BootstrapForm.Group>
                                                                </td>

                                                                <td>
                                                                    <BootstrapForm.Group>
                                                                        <BootstrapForm.Select
                                                                            size="lg"
                                                                            name={`id_proof_scp[${index}].id_proof_type`}
                                                                            value={values.id_proof_scp[index].id_proof_type}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!errors.id_proof_scp?.[index]?.id_proof_type}
                                                                            isValid={
                                                                                touched.id_proof_scp?.[index]?.id_proof_type &&
                                                                                !errors.id_proof_scp?.[index]?.id_proof_type
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
                                                                            name={`id_proof_scp[${index}].id_proof_type`}
                                                                            component="div"
                                                                            style={{ color: "red" }}
                                                                        />
                                                                    </BootstrapForm.Group>
                                                                </td>

                                                                <td>
                                                                    <BootstrapForm.Group>
                                                                        {/* <Form.Label>
                                          Name<span style={{ color: "red" }}>*</span>
                                        </Form.Label> */}
                                                                        <BootstrapForm.Control
                                                                            type="text"
                                                                            size="lg"
                                                                            name={`id_proof_scp[${index}].id_proof_number`}
                                                                            value={values.id_proof_scp[index].id_proof_number}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!errors.id_proof_scp?.[index]?.id_proof_number}
                                                                            isValid={
                                                                                touched.id_proof_scp?.[index]?.id_proof_number &&
                                                                                !errors.id_proof_scp?.[index]?.id_proof_number
                                                                            }
                                                                            placeholder="Id Proof"
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`id_proof_scp[${index}].id_proof_number`}
                                                                            component="div"
                                                                            style={{ color: "red" }}
                                                                        />
                                                                    </BootstrapForm.Group>
                                                                </td>
                                                                <td>
                                                                    <FileField2
                                                                        name={`id_proof_scp[${index}].id_proof_doc`}
                                                                        mandatory
                                                                        accept=".pdf,.jpg,.png"
                                                                        context={FormContext}  // passing the context here
                                                                        onClickViewFileButton={() => { viewFile(values.id_proof_scp[index].id_proof_doc) }}
                                                                    />

                                                                  {false && (  <BootstrapForm.Group>
                                                                        {values.id_proof_scp[index].id_proof_doc ? (
                                                                            <div>
                                                                                {/* Show selected file name */}
                                                                                <strong>{values.id_proof_scp[index].id_proof_doc.name}</strong>
                                                                                <hr />
                                                                                {/* View Button */}
                                                                                <Button
                                                                                    variant="info"
                                                                                    size="sm"
                                                                                    className="ms-2"
                                                                                    onClick={() =>
                                                                                        window.open(
                                                                                            URL.createObjectURL(values.id_proof_scp[index].id_proof_doc),
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
                                                                                    onClick={() => setFieldValue(`id_proof_scp[${index}].id_proof_doc`, null)}
                                                                                >
                                                                                    Remove
                                                                                </Button>
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <BootstrapForm.Control
                                                                                    type="file"
                                                                                    onChange={(e) =>
                                                                                        setFieldValue(`id_proof_scp[${index}].id_proof_doc`, e.target.files[0])
                                                                                    }
                                                                                    isInvalid={!!errors.id_proof_scp?.[index]?.id_proof_doc}

                                                                                />
                                                                                <ErrorMessage
                                                                                    name={`id_proof_scp[${index}].id_proof_doc`}
                                                                                    component="div"
                                                                                    style={{ color: "red" }}
                                                                                />
                                                                            </>
                                                                        )}
                                                                    </BootstrapForm.Group>)}
                                                                </td>
                                                                {false && (<td>
                                                                    {/* Remove Button */}
                                                                    {values.id_proof_scp.length > 1 && (
                                                                        <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                                                    )}
                                                                </td>)}
                                                            </tr>)
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                            {/* <Card.Footer className="text-start">
                            {values.id_proof_scp.length < 3 && (
                              <Button className="mb-3" onClick={() =>
                                push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                              }>
                                Add More
                              </Button>
                            )}

                          </Card.Footer> */}
                                        </Card>

                                    )}
                                </FieldArray>
                            )}
                        </Col>
                        <Col xl={4} lg={4} md={4} sm={4}>
                            {values.usertype === C.SL.APPLICANT
                                && values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.as_per_norms === "no" &&
                                (<ViewStateRemark title="ID Proof of Secretary/Chairperson/President"
                                    as_per_norms={values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.as_per_norms}
                                    reason={values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.reason}
                                    assessor_remark={values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.assessor_remark} />)}

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
                                                    Whether the {title} of the applicant are as per norms?
                                                    <span style={{ color: "red" }}>*</span>
                                                </Form.Label>

                                                <div role="group" aria-labelledby="as_per_norms-group">
                                                    <label className="me-3">
                                                        <Field
                                                            type="radio"
                                                            name="ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT.as_per_norms"
                                                            value="yes"
                                                            className="form-check-input me-2"
                                                        />
                                                        Yes
                                                    </label>

                                                    <label>
                                                        <Field
                                                            type="radio"
                                                            name="ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT.as_per_norms"
                                                            value="no"
                                                            className="form-check-input me-2"
                                                        />
                                                        No
                                                    </label>
                                                </div>

                                                <ErrorMessage
                                                    name="ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT.as_per_norms"
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                />
                                            </Form.Group>
                                        </Row>
                                        {values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.as_per_norms === "no" && (
                                            <Row className="mb-3">
                                                <Form.Group as={Col} md="12">
                                                    <Form.Label>
                                                        Select the Reason(s) and Raise Non-Conformities (NC)
                                                        <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Field
                                                        name="ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT.reason"
                                                        as="select"
                                                        className="form-control"
                                                    >
                                                        <option value="">Select</option>
                                                        {C.reasons.map((lang, i) => (
                                                            <option key={i} value={lang.value}>{lang.label}</option>
                                                        ))}
                                                    </Field>
                                                </Form.Group>

                                                {values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT.reason === "other" && (
                                                    <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                        <Form.Label>
                                                            Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={3}
                                                            name="ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT.assessor_comments"
                                                            value={values.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT.assessor_comments}
                                                            onChange={handleChange}
                                                            className={`form-control ${touched.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.assessor_comments &&
                                                                errors.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.assessor_comments
                                                                ? "is-invalid"
                                                                : ""
                                                                }`}
                                                        />
                                                        {touched.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.assessor_comments &&
                                                            errors.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT?.assessor_comments && (
                                                                <div className="invalid-feedback">
                                                                    {errors.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT.assessor_comments}
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
export default Comp;