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
// export const BccAsmt = () => {

//     return (
//         <>
//             <Card className="custom-card border border-primary">
//                 <Card.Header>
//                     <div className="card-title" style={{ textTransform: "none" }}>
//                         <h5> Building Plan</h5>
//                     </div>
//                 </Card.Header>
//                 <Card.Body>
//                     <Row style={{
//                         // backgroundColor: "rgb(245, 245, 245)", 
//                         borderRadius: 6,
//                     }} >
//                         <Col xl={6} lg={6} md={6} sm={6}>
//                             <Card className="custom-card border border-primary">
//                                 <Card.Header>
//                                     <div className="card-title" style={{ textTransform: "none" }}>
//                                         Building Plan <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
//                                     </div>
//                                 </Card.Header>
//                                 <Card.Body>
//                                     <Table bordered hover>
//                                         <thead>
//                                             <tr>
//                                                 <th>#</th>
//                                                 <th>Document Language <span style={{ color: "red" }}>*</span></th>
//                                                 <th>Original Document <span style={{ color: "red" }}>*</span></th>
//                                                 <th>Notarised Copy</th>
//                                                 {false && (<th>Action</th>)}
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr
//                                                 style={{
//                                                     marginBottom: "1rem",
//                                                     border: "1px solid #ccc",
//                                                     padding: "10px",
//                                                 }}
//                                             >
//                                                 <td>1</td>
//                                                 <td>
//                                                     fsf
//                                                 </td>
//                                                 <td>
//                                                     <Button
//                                                         variant="danger"
//                                                         size="sm"
//                                                         className="ms-2"
//                                                     // onClick={() => setFieldValue(`bld_plan_documents[${index}].document`, null)}
//                                                     >
//                                                         View Document
//                                                     </Button>
//                                                 </td>
//                                                 <td>
//                                                     <Button
//                                                         variant="danger"
//                                                         size="sm"
//                                                         className="ms-2"
//                                                     // onClick={() => setFieldValue(`bld_plan_documents[${index}].document`, null)}
//                                                     >
//                                                         View Document
//                                                     </Button>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </Table>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col xl={6} lg={6} md={6} sm={6}>
//                             <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
//                                 <Card.Header>
//                                     <label
//                                         className="main-content-label my-auto"
//                                         style={{ textTransform: "none" }}
//                                     >
//                                         Review Form
//                                     </label>
//                                     <div className="ms-auto d-flex">
//                                         <Button
//                                             size="sm"
//                                             type="button"
//                                             className="rounded-pill btn-wave btn-outline-dark"
//                                             variant="btn-outline-dark"
//                                         >
//                                             Review Instructions
//                                         </Button>
//                                     </div>
//                                 </Card.Header>
//                                 <Card.Body>

//                                     <Row className="mb-3">
//                                         <Form.Group>
//                                             <Form.Label>
//                                                 Whether the land documents of the applicant are as per norms?
//                                                 <span style={{ color: "red" }}>*</span>
//                                             </Form.Label>
//                                             <div>
//                                                 <Form.Check
//                                                     inline
//                                                     type="radio"
//                                                     label="Yes"
//                                                     name="as_per_norms"
//                                                     value="yes"
//                                                 // onChange={handleChange}
//                                                 // checked={values.as_per_norms === "yes"}
//                                                 // isInvalid={
//                                                 //     touched.as_per_norms &&
//                                                 //     !!errors.as_per_norms
//                                                 // }
//                                                 />
//                                                 <Form.Check
//                                                     inline
//                                                     type="radio"
//                                                     label="No"
//                                                     name="as_per_norms"
//                                                     value="no"
//                                                 // onChange={handleChange}
//                                                 // checked={values.as_per_norms === "no"}
//                                                 // isInvalid={
//                                                 //     touched.as_per_norms &&
//                                                 //     !!errors.as_per_norms
//                                                 // }
//                                                 />
//                                             </div>

//                                             <Form.Control.Feedback type="invalid">
//                                                 {/* {errors.category} */}
//                                             </Form.Control.Feedback>
//                                         </Form.Group>
//                                     </Row>
//                                     {/* {values.as_per_norms === "no" && (
//                                 <Row className="mb-3">
//                                     <Form.Group
//                                         as={Col}
//                                         md="12"
//                                         controlId="validationCustom02"
//                                     >
//                                         <Form.Label>
//                                             Select the Reason(s) and Raise
//                                             Non-Conformities (NC)
//                                             <span style={{ color: "red" }}>*</span>
//                                         </Form.Label>
//                                         <Field
//                                             required
//                                             name="reason"
//                                             as="select"
//                                             className="form-control"
//                                         >
//                                             <option value="">Select</option>
//                                             {MaxData.map((lang, i) => {
//                                                 return (
//                                                     <option key={i} value={lang.value}>
//                                                         {lang.label}
//                                                     </option>
//                                                 );
//                                             })}
//                                         </Field>
//                                         <Form.Control.Feedback>
//                                             Looks good!
//                                         </Form.Control.Feedback>
//                                     </Form.Group>
//                                     {values.reason == "other" && (<Form.Group
//                                         required
//                                         as={Col}
//                                         md="12"
//                                         controlId="text-area"
//                                         style={{ marginTop: "1rem" }}
//                                     >
//                                         <Form.Label>
//                                             Any other reason, please specify{" "}
//                                             <span style={{ color: "red" }}>*</span>
//                                         </Form.Label>
//                                         <Form.Control
//                                             name="assessor_comments"
//                                             required
//                                             as="textarea"
//                                             rows={3}
//                                             className={`form-control ${touched.assessor_comments &&
//                                                 errors.assessor_comments
//                                                 ? "is-invalid"
//                                                 : ""
//                                                 }`}
//                                             value={values.assessor_comments}
//                                             onChange={handleChange}
//                                             isInvalid={
//                                                 touched.assessor_comments &&
//                                                 !!errors.assessor_comments
//                                             }
//                                         />
//                                         {touched.assessor_comments &&
//                                             errors.assessor_comments && (
//                                                 <div className="invalid-feedback">
//                                                     {errors.assessor_comments}
//                                                 </div>
//                                             )}
//                                     </Form.Group>)}

//                                 </Row>
//                             )} */}
//                                 </Card.Body>
//                                 {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-end">
//                               <Button variant="info" onClick={() => { subForm() }}>
//                                 Submit
//                               </Button>
//                             </Card.Footer> */}
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Card.Body>
//             </Card>


//         </>
//     );
// };

import { FormContext } from "@/screens/state/assessor/AssessmentII/Building Detail/asmt_BuildingDetail";
import { ViewStateRemark } from "@/components/Assessment/viewRemark";
import { formatedDate, viewFile } from "@/helpers";
import RequiredSign from "@/components/new_registration/form/comp/requiredSign";
import { SelectField2 } from "@/components/formik/Inputs/SelectField2";
import { FileField2 } from "@/components/formik/Inputs/FileField2";


export const BccAsmt = ({ info, FormContext }) => {
    const { handleSubmit, handleChange, values, errors, touched, setFieldValue } = useContext(FormContext);

    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    const [as_per_norms, setAs_per_norms] = useState(values?.building_completion_certificate?.as_per_norms);


    useEffect(() => {
        setAs_per_norms(values?.building_completion_certificate?.as_per_norms);
    }, [values?.building_completion_certificate?.as_per_norms]); // runs once on mount

    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.clientHeight); // or offsetHeight / scrollHeight
        }
    }, []); // runs once on mount
    return (
        <>
            <Card className={`custom-card border ${as_per_norms == C.SL.YES ? `border-success border-3` : `border-primary`} `} style={{ padding: "0px" }}>
                <Card.Header>
                    <div className="card-title" style={{ textTransform: "none" }}>
                        <h5> Building Completion Certificate</h5>
                    </div>
                </Card.Header>
                <Card.Body style={{ padding: "5px" }} >
                    <Row style={{
                        // backgroundColor: "rgb(245, 245, 245)", 
                        borderRadius: 6,
                    }} >
                        <Col xl={as_per_norms == C.SL.YES ? 12 : 6} lg={as_per_norms == C.SL.YES ? 12 : 6} md={as_per_norms == C.SL.YES ? 12 : 6} sm={as_per_norms == C.SL.YES ? 12 : 6}>
                            {values.usertype === C.SL.ASSESSOR && (
                                <Card ref={divRef} className="border border-2  card custom-card  card">
                                    <Card.Body>
                                        {values.building_completion_certificate.replied === false && (<Table bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Language</th>
                                                    <th>Document</th>
                                                    <th>Notarized Document</th>
                                                    <th>Upload Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {values?.building_completion_certificate.documents?.map((doc, i) => (
                                                    <tr key={i}>
                                                        <td>
                                                            {doc.language_for_building_completion_certificate}
                                                        </td>
                                                        <td>
                                                            <Button variant="primary" size="sm" className="me-2" onClick={() => { viewFile(doc.building_completion_certificate) }} > View Photo </Button>
                                                        </td>
                                                        <td>
                                                            {doc.notarised_document_of_building_plan != "" && (<Button variant="primary" size="sm" className="me-2" onClick={() => { viewFile(doc.notarised_document_of_bcc) }} > View Photo </Button>)}
                                                        </td>
                                                        <td>
                                                            {formatedDate(doc.uploadDate)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        )}

                                        {values.building_completion_certificate.replied === true && (
                                            'Show Latest'
                                        )}
                                    </Card.Body>
                                </Card>
                            )}
                            {/* INPUT FOR APPLICANT */}
                            {values.building_completion_certificate.as_per_norms == C.SL.NO && values.usertype === C.SL.APPLICANT && (
                                <Card ref={divRef} className="border border-2  card custom-card  card">
                                    <Card.Body>
                                        <h6>Name of Issuing Authority for BCC</h6>
                                        <Row style={{ marginTop: "1rem" }}>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Name of issued Authority
                                                        <RequiredSign />
                                                    </Form.Label>
                                                    <Field placeholder="Enter BCC Issued Authority Name" required name="name_of_bcc_issued_authority" as={Form.Control} value={values.name_of_bcc_issued_authority} onChange={handleChange}
                                                        isInvalid={
                                                            touched.name_of_bcc_issued_authority &&
                                                            !!errors.name_of_bcc_issued_authority
                                                        } />
                                                    {touched.name_of_bcc_issued_authority &&
                                                        errors.name_of_bcc_issued_authority && (
                                                            <BootstrapForm.Control.Feedback type="invalid">
                                                                {errors.name_of_bcc_issued_authority}
                                                            </BootstrapForm.Control.Feedback>
                                                        )}
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Date of Issued
                                                        <RequiredSign />
                                                    </Form.Label>
                                                    <Form.Control required type="date" name="date_of_bcc_issued" as={Form.Control} value={values.date_of_bcc_issued} onChange={handleChange}
                                                        isInvalid={
                                                            touched.date_of_bcc_issued &&
                                                            !!errors.date_of_bcc_issued
                                                        } />
                                                    {touched.date_of_bcc_issued &&
                                                        errors.date_of_bcc_issued && (
                                                            <BootstrapForm.Control.Feedback type="invalid">
                                                                {errors.date_of_bcc_issued}
                                                            </BootstrapForm.Control.Feedback>
                                                        )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <FieldArray name="bld_completion_cert">
                                            {({ push, remove }) => (
                                                <Card className="custom-card border border-primary">
                                                    <Card.Header>
                                                        <div className="card-title" style={{ textTransform: "none" }}>
                                                            Building Completion Certificate (BCC) <span style={{ color: 'red' }} >(Upload PDF (Maximum file size: 5 MB))</span>
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
                                                                {values?.bld_completion_cert?.map((doc, index) => (
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
                                                                                name={`bld_completion_cert[${index}].language`}
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
                                                                                label=" Document"
                                                                                name={`bld_completion_cert[${index}].document`}
                                                                                mandatory
                                                                                accept=".pdf,.jpg,.png"
                                                                                context={FormContext}
                                                                                onClickViewFileButton={() => viewFile(values.bld_completion_cert[index].document)}
                                                                            />
                                                                        </td>

                                                                        <td>
                                                                            <FileField2
                                                                                label="Notarised Document"
                                                                                name={`bld_completion_cert[${index}].notarised_document`}
                                                                                mandatory
                                                                                accept=".pdf,.jpg,.png"
                                                                                context={FormContext}
                                                                                onClickViewFileButton={() => viewFile(values.bld_completion_cert[index].notarised_document)}
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
                        {console.log(448, as_per_norms)}

                        {values.building_completion_certificate.as_per_norms !== C.SL.YES && (
                            <Col xl={6} lg={6} md={6} sm={6}>
                                {values.usertype === C.SL.APPLICANT
                                    && values.building_completion_certificate?.as_per_norms === "no" &&
                                    (<ViewStateRemark title="Building Completion Certificate"
                                        as_per_norms={values.building_completion_certificate?.as_per_norms}
                                        reason={values.building_completion_certificate?.reason}
                                        assessor_remark={values.building_completion_certificate?.assessor_remark} />)}

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
                                                    Whether the Building Completion Certificate of the applicant are as per norms?
                                                    <span style={{ color: "red" }}>*</span>
                                                </Form.Label>

                                                <div role="group" aria-labelledby="as_per_norms-group">
                                                    <label className="me-3">
                                                        <Field
                                                            type="radio"
                                                            name="building_completion_certificate.as_per_norms"
                                                            value="yes"
                                                            className="form-check-input me-2"
                                                        />
                                                        Yes
                                                    </label>

                                                    <label>
                                                        <Field
                                                            type="radio"
                                                            name="building_completion_certificate.as_per_norms"
                                                            value="no"
                                                            className="form-check-input me-2"
                                                        />
                                                        No
                                                    </label>
                                                </div>

                                                <ErrorMessage
                                                    name="building_completion_certificate.as_per_norms"
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                />
                                            </Form.Group>
                                        </Row>

                                        {values.building_completion_certificate.as_per_norms === "no" && (
                                            <Row className="mb-3">
                                                <Form.Group as={Col} md="12">
                                                    <Form.Label>
                                                        Select the Reason(s) and Raise Non-Conformities (NC)
                                                        <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Field
                                                        name="building_completion_certificate.reason"
                                                        as="select"
                                                        className="form-control"
                                                    >
                                                        <option value="">Select</option>
                                                        {C.reasons.map((lang, i) => (
                                                            <option key={i} value={lang.value}>{lang.label}</option>
                                                        ))}
                                                    </Field>
                                                </Form.Group>

                                                {values.building_completion_certificate.reason === "other" && (
                                                    <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                        <Form.Label>
                                                            Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={3}
                                                            name="building_completion_certificate.assessor_comments"
                                                            value={values.building_completion_certificate.assessor_comments}
                                                            onChange={handleChange}
                                                            className={`form-control ${touched.building_completion_certificate?.assessor_comments &&
                                                                errors.building_completion_certificate?.assessor_comments
                                                                ? "is-invalid"
                                                                : ""
                                                                }`}
                                                        />
                                                        {touched.building_completion_certificate?.assessor_comments &&
                                                            errors.building_completion_certificate?.assessor_comments && (
                                                                <div className="invalid-feedback">
                                                                    {errors.building_completion_certificate.assessor_comments}
                                                                </div>
                                                            )}
                                                    </Form.Group>
                                                )}
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>)}
                            </Col>
                        )}
                    </Row>
                </Card.Body>
            </Card>


        </>
    );
};
