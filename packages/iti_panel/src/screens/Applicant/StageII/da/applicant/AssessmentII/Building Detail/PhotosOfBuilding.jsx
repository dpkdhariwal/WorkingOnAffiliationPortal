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

// export const PhotosOfBuilding = () => {

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
export const PhotosOfBuilding = () => {
    const { handleSubmit, handleChange, values, errors, touched, } = useContext(FormContext);

    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

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
                        <h5> Building Photos</h5>
                    </div>
                </Card.Header>
                <Card.Body style={{ padding: "5px" }} >
                    <Row style={{
                        // backgroundColor: "rgb(245, 245, 245)", 
                        borderRadius: 6,
                    }} >
                        <Col xl={8} lg={8} md={8} sm={8}>
                            <Card ref={divRef} className="border border-2  card custom-card  card">
                                <Card.Body>
                                    <Table bordered hover>
                                        <thead>
                                            <tr>
                                                {/* <th>as per norms?</th> */}
                                                <th>Building Photo View</th>
                                                <th>Photo</th>
                                                <th>Upload Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {values.building_photos.photos.map((photo, i) => (
                                                <tr key={i}>
                                                    {false && (<td>
                                                        <Form.Group>
                                                            <div role="group" aria-labelledby="as_per_norms-group">
                                                                <label className="me-3">
                                                                    <Field
                                                                        type="radio"
                                                                        name={`building_photos.photos.${i}.as_per_norms`}
                                                                        value="yes"
                                                                        className="form-check-input me-2"
                                                                    />
                                                                    Yes
                                                                </label>

                                                                <label>
                                                                    <Field
                                                                        type="radio"
                                                                        name={`building_photos.photos.${i}.as_per_norms`}
                                                                        value="no"
                                                                        className="form-check-input me-2"
                                                                    />
                                                                    No
                                                                </label>
                                                            </div>
                                                            <ErrorMessage
                                                                name={`building_photos.photos.${i}.as_per_norms`}
                                                                component="div"
                                                                className="invalid-feedback d-block"
                                                            />
                                                        </Form.Group>
                                                    </td>)}
                                                    <td>{formatLabel(photo.photoView)}</td>
                                                    <td>
                                                        <Button
                                                            variant="primary"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => {
                                                                viewFile(photo.photo_pth)
                                                            }}
                                                        >
                                                            View Photo
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        {formatedDate(photo.uploadDate)}
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4} lg={4} md={4} sm={4}>
                            {/* style={{ height: `${height}px` }} */}
                            <Card className="border border-2  card custom-card  card" >
                                <Card.Header>
                                    <label
                                        className="main-content-label my-auto"
                                        style={{ textTransform: "none" }}
                                    >
                                        Assessor Remark
                                    </label>
                                </Card.Header>
                                <Card.Body>
                                    <Row className="mb-3">
                                        <Form.Group>
                                            <Form.Label>
                                                Whether the Building Photos of the applicant are as per norms?
                                                <span style={{ color: "red" }}>*</span>
                                            </Form.Label>

                                            <div role="group" aria-labelledby="as_per_norms-group">
                                                <label className="me-3">
                                                    <Field
                                                        disabled={true}
                                                        type="radio"
                                                        name="building_photos.as_per_norms"
                                                        value="yes"
                                                        className="form-check-input me-2"
                                                    />
                                                    Yes
                                                </label>

                                                <label>
                                                    <Field
                                                        disabled={true}
                                                        type="radio"
                                                        name="building_photos.as_per_norms"
                                                        value="no"
                                                        className="form-check-input me-2"
                                                    />
                                                    No
                                                </label>
                                            </div>

                                            <ErrorMessage
                                                name="building_photos.as_per_norms"
                                                component="div"
                                                className="invalid-feedback d-block"
                                            />
                                        </Form.Group>
                                    </Row>

                                    {values.building_photos.as_per_norms === "no" && (
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12">
                                                <Form.Label>
                                                    Select the Reason(s) and Raise Non-Conformities (NC)
                                                    <span style={{ color: "red" }}>*</span>
                                                </Form.Label>
                                                <Field
                                                        disabled={true}
                                                    name="building_photos.reason"
                                                    as="select"
                                                    className="form-control"
                                                >
                                                    <option value="">Select</option>
                                                    {/* {MaxData.map((lang, i) => (
                                                                   <option key={i} value={lang.value}>{lang.label}</option>
                                                                 ))} */}
                                                </Field>
                                            </Form.Group>

                                            {values.building_photos.reason === "other" && (
                                                <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                    <Form.Label>
                                                        Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        disabled={true}
                                                        as="textarea"
                                                        rows={3}
                                                        name="building_photos.assessor_comments"
                                                        value={values.building_photos.assessor_comments}
                                                        onChange={handleChange}
                                                        className={`form-control ${touched.building_photos?.assessor_comments &&
                                                            errors.building_photos?.assessor_comments
                                                            ? "is-invalid"
                                                            : ""
                                                            }`}
                                                    />
                                                    {touched.building_photos?.assessor_comments &&
                                                        errors.building_photos?.assessor_comments && (
                                                            <div className="invalid-feedback">
                                                                {errors.building_photos.assessor_comments}
                                                            </div>
                                                        )}
                                                </Form.Group>
                                            )}
                                        </Row>
                                    )}
                                </Card.Body>
                                {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-end">
                              <Button variant="info" onClick={() => { subForm() }}>
                                Submit
                              </Button>
                            </Card.Footer> */}
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};
