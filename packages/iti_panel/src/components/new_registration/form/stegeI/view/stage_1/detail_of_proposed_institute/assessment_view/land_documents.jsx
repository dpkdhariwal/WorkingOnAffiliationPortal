import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray } from "formik";

import { useLocation } from "react-router-dom";

import * as get from "../../../../../../../../db/forms/stageI/get/get";
import * as set from "../../../../../../../../db/forms/stageI/set/set";

import { get_da_status_possasion_of_land, set_da_status_possasion_of_land } from "../../../../../../../../db/forms/stageI/set/set";
import { Navigations } from "../../../../../../../Assessment/components";
import * as C from "../../../../../../../../constants";

export const LandDocuments = ({ step, view: viewProp = false, isView = false, nav }) => {
  console.log(step);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const [view, setView] = useState(viewProp);
  const MaxData = [
    { value: "Document is not legible", label: "Document is not legible" },
    { value: "Document is irrelevant", label: "Document is irrelevant" },
    {
      value: "Document lacks required information",
      label: "Document lacks required information",
    },
    {
      value:
        "Document is not approved by the competent authority in the State/ UT",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value:
        "Address on the document does not match with the proposed land/ building address",
      label:
        "Address on the document does not match with the proposed land/ building address",
    },
    {
      value:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
      label:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
    },
    {
      value: "Any other reason, please specify",
      label: "Any other reason, please specify",
    },
  ];

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");



  const handleShowModal = (size) => {
    switch (size) {
      case "xl":
        setShowXlModal(true);
        break;
      default:
        break;
    }
    setSelectedSize(size);
  };


  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);

const onNext = async () => {
    // Set Flow if Not exit 
    let result = await set.setStageIAssessmentFlow(appId);
    let data = await set.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step);
    nav.next();
  }
  return (
    <>
      <div style={{ backgroundColor: "rgb(245, 245, 245)", margin: "10px 0px 0px", borderRadius: 6, borderStyle: "dashed", borderWidth: "thin", padding: "10px", }}>
        {/* <hr className="custom-hr"/> */}

        {/* Land Info */}
        <LandInfo />

        {step?.VerificationList?.map((item, index) => {
          switch (item.check) {
            case C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND:
              return <PossessionOfLand />
            case C.ASSESSMENT_STAGE_I_KEYS.LAND_AREA:
              return <LandArea />
            default:
              return <h2>{item.check}</h2>
          }
        })}

       

        {false && (<>
          <Row
            style={{
              backgroundColor: "rgb(245, 245, 245)",
              margin: "10px 0px 0px",
              borderRadius: 6,
            }}
          >
            <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
              <table
                width="100%"
                border={1}
                style={{ borderCollapse: "collapse", color: 'black' }}
                align="center"
                cellPadding="5px"
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Land Documents</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      <table
                        width="100%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                      >
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid black" }}>Document Title</th>
                            <th style={{ border: "1px solid black" }}>Document Language</th>
                            <th style={{ border: "1px solid black" }}>Upload Original Document of Land</th>
                            <th style={{ border: "1px solid black" }}>Upload Hindi/English Notarised Copy of Document</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: "1px solid black" }}>ABCD</td>
                            <td style={{ border: "1px solid black" }}>Hindi</td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid black" }}>ABCD</td>
                            <td style={{ border: "1px solid black" }}>Hindi</td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
              <div className="form-container">
                {formSubmited == false ? (
                  <Formik
                    validationSchema={yup.object().shape({
                      as_per_norms: yup
                        .string()
                        .required("Select whether Building plan is as per norms"),

                      category: yup.string().when("as_per_norms", {
                        is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                        then: () =>
                          yup.string().required("Please select a category"),
                        otherwise: () => yup.string().notRequired(),
                      }),

                      assessor_comments: yup.string().when("as_per_norms", {
                        is: "no",
                        then: () =>
                          yup.string().required("Please provide your comments"),
                        otherwise: () => yup.string().notRequired(),
                      }),
                    })}
                    validateOnChange={() => console.log("validateOnChange")}
                    onSubmit={(values) => {
                      console.log("Form submitted with values:", values);
                      setFormData(values);
                      setFormSubmited(true);
                      console.log(formData);
                    }}
                    initialValues={{
                      category: "",
                      as_per_norms: "no",
                      assessor_comments: "",
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      submitForm,
                      values,
                      errors,
                      touched,
                    }) => (
                      <Card style={{ backgroundColor: "#eff3d6" }}>
                        <Card.Header>
                          <label
                            className="main-content-label my-auto"
                            style={{ textTransform: "none" }}
                          >
                            Review Form
                          </label>
                          <div className="ms-auto  d-flex">
                            <Button
                              size="sm"
                              onClick={() => handleShowModal("xl")}
                              type="button"
                              className="rounded-pill btn-wave btn-outline-dark"
                              variant="btn-outline-dark"
                            >
                              Review Instructions
                            </Button>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Form ref={formRef2} onSubmit={handleSubmit} validated>
                            <Row className="mb-3">
                              <Form.Group>
                                <Form.Label>
                                  Whether the land documents of the applicant are as per norms?
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <div>
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="Yes"
                                    name="as_per_norms"
                                    value="yes"
                                    onChange={handleChange}
                                    checked={values.as_per_norms === "yes"}
                                    isInvalid={
                                      touched.as_per_norms &&
                                      !!errors.as_per_norms
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="No"
                                    name="as_per_norms"
                                    value="no"
                                    onChange={handleChange}
                                    checked={values.as_per_norms === "no"}
                                    isInvalid={
                                      touched.as_per_norms &&
                                      !!errors.as_per_norms
                                    }
                                  />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.category}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            {values.as_per_norms === "no" && (
                              <Row className="mb-3">
                                <Form.Group
                                  as={Col}
                                  md="12"
                                  controlId="validationCustom02"
                                >
                                  <Form.Label>
                                    Select the Reason(s) and Raise
                                    Non-Conformities (NC)
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Field
                                    required
                                    name="category"
                                    as="select"
                                    className="form-control"
                                  >
                                    <option value="">Select</option>
                                    {MaxData.map((lang, i) => {
                                      return (
                                        <option key={i} value={lang.value}>
                                          {lang.label}
                                        </option>
                                      );
                                    })}
                                  </Field>
                                  <Form.Control.Feedback>
                                    Looks good!
                                  </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <Form.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    name="assessor_comments"
                                    required
                                    as="textarea"
                                    rows={3}
                                    className={`form-control ${touched.assessor_comments &&
                                      errors.assessor_comments
                                      ? "is-invalid"
                                      : ""
                                      }`}
                                    value={values.assessor_comments}
                                    onChange={handleChange}
                                    isInvalid={
                                      touched.assessor_comments &&
                                      !!errors.assessor_comments
                                    }
                                  />
                                  {touched.assessor_comments &&
                                    errors.assessor_comments && (
                                      <div className="invalid-feedback">
                                        {errors.assessor_comments}
                                      </div>
                                    )}
                                </Form.Group>
                              </Row>
                            )}
                            <Button variant="primary" onClick={submitForm}>
                              Submit
                            </Button>
                          </Form>
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                      </Card>
                    )}
                  </Formik>
                ) : formSubmited == true ? (
                  <Card
                    className="border-info"
                    style={
                      formData.as_per_norms == "yes"
                        ? { backgroundColor: "#d6f3e0" }
                        : { backgroundColor: "#f3d6d6" }
                    }
                  >
                    <Card.Header>
                      <label
                        className="main-content-label my-auto"
                        style={{ textTransform: "none" }}
                      >
                        Assessor Comments
                      </label>
                      <div className="ms-auto  d-flex">
                        25th April 2025:10:20PM
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col md={12}>
                          <b>Whether Building plan is as per norms?:</b>{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {formData.as_per_norms}
                          </span>
                        </Col>
                        {formData.as_per_norms == "no" && (
                          <Col md={12}>
                            <b>Reason Category:</b>{" "}
                            <span style={{ textTransform: "capitalize" }}>
                              {formData.category}
                            </span>
                          </Col>
                        )}

                        {formData.category ==
                          "Any other reason, please specify" && (
                            <Col md={12}>
                              <b>Reason:</b> <p>{formData.assessor_comments}</p>
                            </Col>
                          )}
                      </Row>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setFormSubmited(false);
                          setFormData({});
                        }}
                      >
                        Edit
                      </Button>
                      {/* <Button variant="primary">Submit</Button> */}
                    </Card.Footer>
                  </Card>
                ) : (
                  <h1>No Data</h1>
                )}
              </div>
            </Col>)}
          </Row>
          <Row
            style={{
              backgroundColor: "rgb(245, 245, 245)",
              margin: "10px 0px 0px",
              borderRadius: 6,
              // borderStyle: "dashed",
              // borderWidth: "thin",
              // padding: "10px",
            }}
          >
            <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
              <table
                width="100%"
                border={1}
                style={{ borderCollapse: "collapse", color: 'black' }}
                align="center"
                cellPadding="5px"
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Land Use, Land Conversion Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      <table
                        width="100%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                      >
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid black" }}>Document Title</th>
                            <th style={{ border: "1px solid black" }}>Document Language</th>
                            <th style={{ border: "1px solid black" }}>Upload Original Document of Land</th>
                            <th style={{ border: "1px solid black" }}>Upload Hindi/English Notarised Copy of Document</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: "1px solid black" }}>ABCD</td>
                            <td style={{ border: "1px solid black" }}>Hindi</td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid black" }}>ABCD</td>
                            <td style={{ border: "1px solid black" }}>Hindi</td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
              <div className="form-container">
                {formSubmited == false ? (
                  <Formik
                    validationSchema={yup.object().shape({
                      as_per_norms: yup
                        .string()
                        .required("Select whether Building plan is as per norms"),

                      category: yup.string().when("as_per_norms", {
                        is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                        then: () =>
                          yup.string().required("Please select a category"),
                        otherwise: () => yup.string().notRequired(),
                      }),

                      assessor_comments: yup.string().when("as_per_norms", {
                        is: "no",
                        then: () =>
                          yup.string().required("Please provide your comments"),
                        otherwise: () => yup.string().notRequired(),
                      }),
                    })}
                    validateOnChange={() => console.log("validateOnChange")}
                    onSubmit={(values) => {
                      console.log("Form submitted with values:", values);
                      setFormData(values);
                      setFormSubmited(true);
                      console.log(formData);
                    }}
                    initialValues={{
                      category: "",
                      as_per_norms: "no",
                      assessor_comments: "",
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      submitForm,
                      values,
                      errors,
                      touched,
                    }) => (
                      <Card style={{ backgroundColor: "#eff3d6" }}>
                        <Card.Header>
                          <label
                            className="main-content-label my-auto"
                            style={{ textTransform: "none" }}
                          >
                            Review Form
                          </label>
                          <div className="ms-auto  d-flex">
                            <Button
                              size="sm"
                              onClick={() => handleShowModal("xl")}
                              type="button"
                              className="rounded-pill btn-wave btn-outline-dark"
                              variant="btn-outline-dark"
                            >
                              Review Instructions
                            </Button>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Form ref={formRef2} onSubmit={handleSubmit} validated>
                            <Row className="mb-3">
                              <Form.Group>
                                <Form.Label>
                                  Whether the land conversion certificate of the applicant is as per the norms?
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <div>
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="Yes"
                                    name="as_per_norms"
                                    value="yes"
                                    onChange={handleChange}
                                    checked={values.as_per_norms === "yes"}
                                    isInvalid={
                                      touched.as_per_norms &&
                                      !!errors.as_per_norms
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="No"
                                    name="as_per_norms"
                                    value="no"
                                    onChange={handleChange}
                                    checked={values.as_per_norms === "no"}
                                    isInvalid={
                                      touched.as_per_norms &&
                                      !!errors.as_per_norms
                                    }
                                  />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.category}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            {values.as_per_norms === "no" && (
                              <Row className="mb-3">
                                <Form.Group
                                  as={Col}
                                  md="12"
                                  controlId="validationCustom02"
                                >
                                  <Form.Label>
                                    Select the Reason(s) and Raise
                                    Non-Conformities (NC)
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Field
                                    required
                                    name="category"
                                    as="select"
                                    className="form-control"
                                  >
                                    <option value="">Select</option>
                                    {MaxData.map((lang, i) => {
                                      return (
                                        <option key={i} value={lang.value}>
                                          {lang.label}
                                        </option>
                                      );
                                    })}
                                  </Field>
                                  <Form.Control.Feedback>
                                    Looks good!
                                  </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <Form.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    name="assessor_comments"
                                    required
                                    as="textarea"
                                    rows={3}
                                    className={`form-control ${touched.assessor_comments &&
                                      errors.assessor_comments
                                      ? "is-invalid"
                                      : ""
                                      }`}
                                    value={values.assessor_comments}
                                    onChange={handleChange}
                                    isInvalid={
                                      touched.assessor_comments &&
                                      !!errors.assessor_comments
                                    }
                                  />
                                  {touched.assessor_comments &&
                                    errors.assessor_comments && (
                                      <div className="invalid-feedback">
                                        {errors.assessor_comments}
                                      </div>
                                    )}
                                </Form.Group>
                              </Row>
                            )}
                            <Button variant="primary" onClick={submitForm}>
                              Submit
                            </Button>
                          </Form>
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                      </Card>
                    )}
                  </Formik>
                ) : formSubmited == true ? (
                  <Card
                    className="border-info"
                    style={
                      formData.as_per_norms == "yes"
                        ? { backgroundColor: "#d6f3e0" }
                        : { backgroundColor: "#f3d6d6" }
                    }
                  >
                    <Card.Header>
                      <label
                        className="main-content-label my-auto"
                        style={{ textTransform: "none" }}
                      >
                        Assessor Comments
                      </label>
                      <div className="ms-auto  d-flex">
                        25th April 2025:10:20PM
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col md={12}>
                          <b>Whether Building plan is as per norms?:</b>{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {formData.as_per_norms}
                          </span>
                        </Col>
                        {formData.as_per_norms == "no" && (
                          <Col md={12}>
                            <b>Reason Category:</b>{" "}
                            <span style={{ textTransform: "capitalize" }}>
                              {formData.category}
                            </span>
                          </Col>
                        )}

                        {formData.category ==
                          "Any other reason, please specify" && (
                            <Col md={12}>
                              <b>Reason:</b> <p>{formData.assessor_comments}</p>
                            </Col>
                          )}
                      </Row>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setFormSubmited(false);
                          setFormData({});
                        }}
                      >
                        Edit
                      </Button>
                      {/* <Button variant="primary">Submit</Button> */}
                    </Card.Footer>
                  </Card>
                ) : (
                  <h1>No Data</h1>
                )}
              </div>
            </Col>)}
          </Row>
          <Row
            style={{
              backgroundColor: "rgb(245, 245, 245)",
              margin: "10px 0px 0px",
              borderRadius: 6,
              // borderStyle: "dashed",
              // borderWidth: "thin",
              // padding: "10px",
            }}
          >
            <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
              <table
                width="100%"
                border={1}
                style={{ borderCollapse: "collapse", color: 'black' }}
                align="center"
                cellPadding="5px"
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Lease Deed Documents</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      <table
                        width="100%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                      >
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid black" }}>Document Title</th>
                            <th style={{ border: "1px solid black" }}>Document Language</th>
                            <th style={{ border: "1px solid black" }}>Upload Original Document of Land</th>
                            <th style={{ border: "1px solid black" }}>Upload Hindi/English Notarised Copy of Document</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: "1px solid black" }}>ABCD</td>
                            <td style={{ border: "1px solid black" }}>Hindi</td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid black" }}>ABCD</td>
                            <td style={{ border: "1px solid black" }}>Hindi</td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                            <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
              <div className="form-container">
                {formSubmited == false ? (
                  <Formik
                    validationSchema={yup.object().shape({
                      as_per_norms: yup
                        .string()
                        .required("Select whether Building plan is as per norms"),

                      category: yup.string().when("as_per_norms", {
                        is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                        then: () =>
                          yup.string().required("Please select a category"),
                        otherwise: () => yup.string().notRequired(),
                      }),

                      assessor_comments: yup.string().when("as_per_norms", {
                        is: "no",
                        then: () =>
                          yup.string().required("Please provide your comments"),
                        otherwise: () => yup.string().notRequired(),
                      }),
                    })}
                    validateOnChange={() => console.log("validateOnChange")}
                    onSubmit={(values) => {
                      console.log("Form submitted with values:", values);
                      setFormData(values);
                      setFormSubmited(true);
                      console.log(formData);
                    }}
                    initialValues={{
                      category: "",
                      as_per_norms: "no",
                      assessor_comments: "",
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      submitForm,
                      values,
                      errors,
                      touched,
                    }) => (
                      <Card style={{ backgroundColor: "#eff3d6" }}>
                        <Card.Header>
                          <label
                            className="main-content-label my-auto"
                            style={{ textTransform: "none" }}
                          >
                            Review Form
                          </label>
                          <div className="ms-auto  d-flex">
                            <Button
                              size="sm"
                              onClick={() => handleShowModal("xl")}
                              type="button"
                              className="rounded-pill btn-wave btn-outline-dark"
                              variant="btn-outline-dark"
                            >
                              Review Instructions
                            </Button>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Form ref={formRef2} onSubmit={handleSubmit} validated>
                            <Row className="mb-3">
                              <Form.Group>
                                <Form.Label>
                                  Whether the Lease Deed Documents of the applicant are as per norms?
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <div>
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="Yes"
                                    name="as_per_norms"
                                    value="yes"
                                    onChange={handleChange}
                                    checked={values.as_per_norms === "yes"}
                                    isInvalid={
                                      touched.as_per_norms &&
                                      !!errors.as_per_norms
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="No"
                                    name="as_per_norms"
                                    value="no"
                                    onChange={handleChange}
                                    checked={values.as_per_norms === "no"}
                                    isInvalid={
                                      touched.as_per_norms &&
                                      !!errors.as_per_norms
                                    }
                                  />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.category}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            {values.as_per_norms === "no" && (
                              <Row className="mb-3">
                                <Form.Group
                                  as={Col}
                                  md="12"
                                  controlId="validationCustom02"
                                >
                                  <Form.Label>
                                    Select the Reason(s) and Raise
                                    Non-Conformities (NC)
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Field
                                    required
                                    name="category"
                                    as="select"
                                    className="form-control"
                                  >
                                    <option value="">Select</option>
                                    {MaxData.map((lang, i) => {
                                      return (
                                        <option key={i} value={lang.value}>
                                          {lang.label}
                                        </option>
                                      );
                                    })}
                                  </Field>
                                  <Form.Control.Feedback>
                                    Looks good!
                                  </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <Form.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    name="assessor_comments"
                                    required
                                    as="textarea"
                                    rows={3}
                                    className={`form-control ${touched.assessor_comments &&
                                      errors.assessor_comments
                                      ? "is-invalid"
                                      : ""
                                      }`}
                                    value={values.assessor_comments}
                                    onChange={handleChange}
                                    isInvalid={
                                      touched.assessor_comments &&
                                      !!errors.assessor_comments
                                    }
                                  />
                                  {touched.assessor_comments &&
                                    errors.assessor_comments && (
                                      <div className="invalid-feedback">
                                        {errors.assessor_comments}
                                      </div>
                                    )}
                                </Form.Group>
                              </Row>
                            )}
                            <Button variant="primary" onClick={submitForm}>
                              Submit
                            </Button>
                          </Form>
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                      </Card>
                    )}
                  </Formik>
                ) : formSubmited == true ? (
                  <Card
                    className="border-info"
                    style={
                      formData.as_per_norms == "yes"
                        ? { backgroundColor: "#d6f3e0" }
                        : { backgroundColor: "#f3d6d6" }
                    }
                  >
                    <Card.Header>
                      <label
                        className="main-content-label my-auto"
                        style={{ textTransform: "none" }}
                      >
                        Assessor Comments
                      </label>
                      <div className="ms-auto  d-flex">
                        25th April 2025:10:20PM
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col md={12}>
                          <b>Whether Building plan is as per norms?:</b>{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {formData.as_per_norms}
                          </span>
                        </Col>
                        {formData.as_per_norms == "no" && (
                          <Col md={12}>
                            <b>Reason Category:</b>{" "}
                            <span style={{ textTransform: "capitalize" }}>
                              {formData.category}
                            </span>
                          </Col>
                        )}

                        {formData.category ==
                          "Any other reason, please specify" && (
                            <Col md={12}>
                              <b>Reason:</b> <p>{formData.assessor_comments}</p>
                            </Col>
                          )}
                      </Row>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setFormSubmited(false);
                          setFormData({});
                        }}
                      >
                        Edit
                      </Button>
                      {/* <Button variant="primary">Submit</Button> */}
                    </Card.Footer>
                  </Card>
                ) : (
                  <h1>No Data</h1>
                )}
              </div>
            </Col>)}
          </Row>
          <Row
            style={{
              backgroundColor: "rgb(245, 245, 245)",
              margin: "10px 0px 0px",
              borderRadius: 6,
              // borderStyle: "dashed",
              // borderWidth: "thin",
              padding: "10px",
            }}
          >
            <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
              <table
                width="100%"
                border={1}
                style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                align="center"
                cellPadding="5px"
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Land Area</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black" }}>12345</td>
                  </tr>
                </tbody>
              </table>
            </Col>
            {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
              <div className="form-container">
                {formSubmited == false ? (
                  <Formik
                    validationSchema={yup.object().shape({
                      as_per_norms: yup
                        .string()
                        .required("Select whether Building plan is as per norms"),

                      category: yup.string().when("as_per_norms", {
                        is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                        then: () =>
                          yup.string().required("Please select a category"),
                        otherwise: () => yup.string().notRequired(),
                      }),

                      assessor_comments: yup.string().when("as_per_norms", {
                        is: "no",
                        then: () =>
                          yup.string().required("Please provide your comments"),
                        otherwise: () => yup.string().notRequired(),
                      }),
                    })}
                    validateOnChange={() => console.log("validateOnChange")}
                    onSubmit={(values) => {
                      console.log("Form submitted with values:", values);
                      setFormData(values);
                      setFormSubmited(true);
                      console.log(formData);
                    }}
                    initialValues={{
                      category: "",
                      as_per_norms: "no",
                      assessor_comments: "",
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      submitForm,
                      values,
                      errors,
                      touched,
                    }) => (
                      <Card style={{ backgroundColor: "#eff3d6" }}>
                        <Card.Header>
                          <label
                            className="main-content-label my-auto"
                            style={{ textTransform: "none" }}
                          >
                            Review Form
                          </label>
                          <div className="ms-auto  d-flex">
                            <Button
                              size="sm"
                              onClick={() => handleShowModal("xl")}
                              type="button"
                              className="rounded-pill btn-wave btn-outline-dark"
                              variant="btn-outline-dark"
                            >
                              Review Instructions
                            </Button>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Form ref={formRef2} onSubmit={handleSubmit} validated>
                            <Row className="mb-3">
                              <Form.Group>
                                <Form.Label>
                                  Whether the Land Area of the applicant institute is as per norms?
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <div>
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="Yes"
                                    name="as_per_norms"
                                    value="yes"
                                    onChange={handleChange}
                                    checked={values.as_per_norms === "yes"}
                                    isInvalid={
                                      touched.as_per_norms &&
                                      !!errors.as_per_norms
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="No"
                                    name="as_per_norms"
                                    value="no"
                                    onChange={handleChange}
                                    checked={values.as_per_norms === "no"}
                                    isInvalid={
                                      touched.as_per_norms &&
                                      !!errors.as_per_norms
                                    }
                                  />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.category}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            {values.as_per_norms === "no" && (
                              <Row className="mb-3">
                                <Form.Group
                                  as={Col}
                                  md="12"
                                  controlId="validationCustom02"
                                >
                                  <Form.Label>
                                    Select the Reason(s) and Raise
                                    Non-Conformities (NC)
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Field
                                    required
                                    name="category"
                                    as="select"
                                    className="form-control"
                                  >
                                    <option value="">Select</option>
                                    {MaxData.map((lang, i) => {
                                      return (
                                        <option key={i} value={lang.value}>
                                          {lang.label}
                                        </option>
                                      );
                                    })}
                                  </Field>
                                  <Form.Control.Feedback>
                                    Looks good!
                                  </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <Form.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Form.Control
                                    name="assessor_comments"
                                    required
                                    as="textarea"
                                    rows={3}
                                    className={`form-control ${touched.assessor_comments &&
                                      errors.assessor_comments
                                      ? "is-invalid"
                                      : ""
                                      }`}
                                    value={values.assessor_comments}
                                    onChange={handleChange}
                                    isInvalid={
                                      touched.assessor_comments &&
                                      !!errors.assessor_comments
                                    }
                                  />
                                  {touched.assessor_comments &&
                                    errors.assessor_comments && (
                                      <div className="invalid-feedback">
                                        {errors.assessor_comments}
                                      </div>
                                    )}
                                </Form.Group>
                              </Row>
                            )}
                            <Button variant="primary" onClick={submitForm}>
                              Submit
                            </Button>
                          </Form>
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                      </Card>
                    )}
                  </Formik>
                ) : formSubmited == true ? (
                  <Card
                    className="border-info"
                    style={
                      formData.as_per_norms == "yes"
                        ? { backgroundColor: "#d6f3e0" }
                        : { backgroundColor: "#f3d6d6" }
                    }
                  >
                    <Card.Header>
                      <label
                        className="main-content-label my-auto"
                        style={{ textTransform: "none" }}
                      >
                        Assessor Comments
                      </label>
                      <div className="ms-auto  d-flex">
                        25th April 2025:10:20PM
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col md={12}>
                          <b>Whether Building plan is as per norms?:</b>{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {formData.as_per_norms}
                          </span>
                        </Col>
                        {formData.as_per_norms == "no" && (
                          <Col md={12}>
                            <b>Reason Category:</b>{" "}
                            <span style={{ textTransform: "capitalize" }}>
                              {formData.category}
                            </span>
                          </Col>
                        )}

                        {formData.category ==
                          "Any other reason, please specify" && (
                            <Col md={12}>
                              <b>Reason:</b> <p>{formData.assessor_comments}</p>
                            </Col>
                          )}
                      </Row>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setFormSubmited(false);
                          setFormData({});
                        }}
                      >
                        Edit
                      </Button>
                      {/* <Button variant="primary">Submit</Button> */}
                    </Card.Footer>
                  </Card>
                ) : (
                  <h1>No Data</h1>
                )}
              </div>
            </Col>)}
          </Row>
        </>)}
      </div>
      
       
      {/* {isView == false && (<div style={{
        backgroundColor: "rgb(245, 245, 245)",
        margin: "10px 0px 0px",
        borderRadius: 6,
        borderStyle: "dashed",
        borderWidth: "thin",
        padding: "10px",
      }} className="d-flex justify-content-between mb-3">
        <div className="p-2">
          <Button variant="warning">
            Previous
          </Button>
        </div>
        <div className="p-2">
          <Button variant="success" >
            Save & Next
          </Button>
        </div>
      </div>)} */}

            <Navigations nav={nav} onNext={onNext}  />
      

    </>
  );
};



// Land Info 
export const LandInfo = () => {
  return (<Row
    style={{
      backgroundColor: "rgb(245, 245, 245)",
      margin: "10px 0px 0px",
      borderRadius: 6,
      // borderStyle: "dashed",
      // borderWidth: "thin",
      // padding: "10px",
    }}
  > <Col xl={12} lg={12} md={12} sm={12}>
      <table
        width="100%"
        border={1}
        style={{ borderCollapse: "collapse", color: 'black' }}
        align="center"
        cellPadding="5px"
      >
        <tbody>
          <tr>
            <th style={{ border: "1px solid black" }}>Possession of Land</th>
            <th style={{ border: "1px solid black" }}>Land Owner Name</th>
            <th style={{ border: "1px solid black" }}>Land Registration Number</th>

          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Owned</td>
            <td style={{ border: "1px solid black" }}>ABCD</td>
            <td style={{ border: "1px solid black" }}>123456789</td>
          </tr>
        </tbody>
      </table>
    </Col>
  </Row>)
}

// Possation of Land
export const PossessionOfLand = ({ step, view: viewProp = false, isView = false }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const [view, setView] = useState(viewProp);
  const MaxData = [
    { value: "Document is not legible", label: "Document is not legible" },
    { value: "Document is irrelevant", label: "Document is irrelevant" },
    {
      value: "Document lacks required information",
      label: "Document lacks required information",
    },
    {
      value:
        "Document is not approved by the competent authority in the State/ UT",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value:
        "Address on the document does not match with the proposed land/ building address",
      label:
        "Address on the document does not match with the proposed land/ building address",
    },
    {
      value:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
      label:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
    },
    {
      value: "Any other reason, please specify",
      label: "Any other reason, please specify",
    },
  ];

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [initValue, setInitValue] = useState({ as_per_norms: "no", reason: "", assessor_comments: "", });


  const handleShowModal = (size) => {
    switch (size) {
      case "xl":
        setShowXlModal(true);
        break;
      default:
        break;
    }
    setSelectedSize(size);
  };


  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);


  const submitAction = async (values) => {
    await set_da_status_possasion_of_land(appId, values);
  }



  const loadInfo = async () => {
    let result = await get_da_status_possasion_of_land(appId);
    const lastObj = result[result.length - 1];
    console.log(lastObj);
    if (lastObj) {
      setInitValue(lastObj);
      setFormData(lastObj);
      setFormSubmited(true);
    }
  }

  useEffect(() => {

    loadInfo();

  }, [appId]);

  return (
    <>
      <Row
        style={{
          backgroundColor: "rgb(245, 245, 245)",
          margin: "10px 0px 0px",
          borderRadius: 6,
        }}
      >
        <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
          <table
            width="100%"
            border={1}
            style={{ borderCollapse: "collapse", color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Land Documents</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  <table
                    width="100%"
                    border={1}
                    style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                    align="center"
                    cellPadding="5px"
                  >
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid black" }}>Document Title</th>
                        <th style={{ border: "1px solid black" }}>Document Language</th>
                        <th style={{ border: "1px solid black" }}>Upload Original Document of Land</th>
                        <th style={{ border: "1px solid black" }}>Upload Hindi/English Notarised Copy of Document</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: "1px solid black" }}>ABCD</td>
                        <td style={{ border: "1px solid black" }}>Hindi</td>
                        <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                        <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid black" }}>ABCD</td>
                        <td style={{ border: "1px solid black" }}>Hindi</td>
                        <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                        <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div className="form-container">
            {formSubmited == false ? (
              <Formik
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup
                    .string()
                    .required("Select whether Building plan is as per norms"),

                  reason: yup.string().when("as_per_norms", {
                    is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                    then: () =>
                      yup.string().required("Please select a category"),
                    otherwise: () => yup.string().notRequired(),
                  }),

                  assessor_comments: yup.string().when("as_per_norms", {
                    is: (as_per_norms, reason) => as_per_norms === "no" && reason === "Any other reason, please specify",
                    then: () =>
                      yup.string().required("Please provide your comments"),
                    otherwise: () => yup.string().notRequired(),
                  }),
                })}

                validateOnChange={() => console.log("validateOnChange")}
                onSubmit={(values) => {
                  console.log("Form submitted with values:", values);
                  setFormData(values);
                  setFormSubmited(true);
                  // console.log(formData);
                  submitAction(values);
                }}
                initialValues={initValue}
              >
                {({
                  handleSubmit,
                  handleChange,
                  submitForm,
                  values,
                  errors,
                  touched,
                }) => (
                  <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
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
                          onClick={() => handleShowModal("xl")}
                          type="button"
                          className="rounded-pill btn-wave btn-outline-dark"
                          variant="btn-outline-dark"
                        >
                          Review Instructions
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Form ref={formRef2} onSubmit={handleSubmit} validated>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>
                              Whether the land documents of the applicant are as per norms?
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <div>
                              <Form.Check
                                inline
                                type="radio"
                                label="Yes"
                                name="as_per_norms"
                                value="yes"
                                onChange={handleChange}
                                checked={values.as_per_norms === "yes"}
                                isInvalid={
                                  touched.as_per_norms &&
                                  !!errors.as_per_norms
                                }
                              />
                              <Form.Check
                                inline
                                type="radio"
                                label="No"
                                name="as_per_norms"
                                value="no"
                                onChange={handleChange}
                                checked={values.as_per_norms === "no"}
                                isInvalid={
                                  touched.as_per_norms &&
                                  !!errors.as_per_norms
                                }
                              />
                            </div>

                            <Form.Control.Feedback type="invalid">
                              {errors.category}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        {values.as_per_norms === "no" && (
                          <Row className="mb-3">
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom02"
                            >
                              <Form.Label>
                                Select the Reason(s) and Raise
                                Non-Conformities (NC)
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Field
                                required
                                name="reason"
                                as="select"
                                className="form-control"
                              >
                                <option value="">Select</option>
                                {MaxData.map((lang, i) => {
                                  return (
                                    <option key={i} value={lang.value}>
                                      {lang.label}
                                    </option>
                                  );
                                })}
                              </Field>
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                            </Form.Group>
                            {values.reason == "Any other reason, please specify" && (<Form.Group
                              required
                              as={Col}
                              md="12"
                              controlId="text-area"
                              style={{ marginTop: "1rem" }}
                            >
                              <Form.Label>
                                Any other reason, please specify{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                name="assessor_comments"
                                required
                                as="textarea"
                                rows={3}
                                className={`form-control ${touched.assessor_comments &&
                                  errors.assessor_comments
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                value={values.assessor_comments}
                                onChange={handleChange}
                                isInvalid={
                                  touched.assessor_comments &&
                                  !!errors.assessor_comments
                                }
                              />
                              {touched.assessor_comments &&
                                errors.assessor_comments && (
                                  <div className="invalid-feedback">
                                    {errors.assessor_comments}
                                  </div>
                                )}
                            </Form.Group>)}

                          </Row>
                        )}

                      </Form>
                    </Card.Body>
                    <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer>
                  </Card>
                )}
              </Formik>
            ) : formSubmited == true ? (
              <Card
                className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
                style={
                  formData.as_per_norms == "yes"
                    ? { backgroundColor: "#d6f3e0" }
                    : { backgroundColor: "#f3d6d6" }
                }
              >
                <Card.Header>
                  <label
                    className="main-content-label my-auto"
                    style={{ textTransform: "none" }}
                  >
                    Assessor Comments
                  </label>
                  <div className="ms-auto  d-flex">
                    25th April 2025:10:20PM
                  </div>
                </Card.Header>
                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                  <Row className="mb-3">
                    <Col md={12}> <b>Whether Building plan is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "Any other reason, please specify" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setFormSubmited(false); }}>
                    Edit
                  </Button>
                </Card.Footer>)}

              </Card>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </Col>)}
      </Row>
    </>
  );
};

// Land Area
export const LandArea = ({ step, view: viewProp = false, isView = false }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const [view, setView] = useState(viewProp);
  const MaxData = [
    { value: "Document is not legible", label: "Document is not legible" },
    { value: "Document is irrelevant", label: "Document is irrelevant" },
    {
      value: "Document lacks required information",
      label: "Document lacks required information",
    },
    {
      value:
        "Document is not approved by the competent authority in the State/ UT",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value:
        "Address on the document does not match with the proposed land/ building address",
      label:
        "Address on the document does not match with the proposed land/ building address",
    },
    {
      value:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
      label:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
    },
    {
      value: "Any other reason, please specify",
      label: "Any other reason, please specify",
    },
  ];

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [initValue, setInitValue] = useState({ as_per_norms: "no", reason: "", assessor_comments: "", });


  const handleShowModal = (size) => {
    switch (size) {
      case "xl":
        setShowXlModal(true);
        break;
      default:
        break;
    }
    setSelectedSize(size);
  };


  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);


  const submitAction = async (values) => {
    console.log(values);
    await set.set_da_status_land_area(appId, values);
  }



  const loadInfo = async () => {
    let result = await set.get_da_status_land_area(appId);
    const lastObj = result[result.length - 1];
    console.log(lastObj);
    if (lastObj) {
      setInitValue(lastObj);
      setFormData(lastObj);
      setFormSubmited(true);
    }
  }

  useEffect(() => {

    loadInfo();

  }, [appId]);

  return (
    <>
      <Row
        style={{
          backgroundColor: "rgb(245, 245, 245)",
          margin: "10px 0px 0px",
          borderRadius: 6,
        }}
      >
        <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
          <table
            width="100%"
            border={1}
            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Land Area</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black" }}>12345</td>
              </tr>
            </tbody>
          </table>
        </Col>
        {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div className="form-container">
            {formSubmited == false ? (
              <Formik
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup
                    .string()
                    .required("Select Whether the Land Area of the applicant institute is as per norms?"),

                  reason: yup.string().when("as_per_norms", {
                    is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                    then: () =>
                      yup.string().required("Please select a category"),
                    otherwise: () => yup.string().notRequired(),
                  }),

                  assessor_comments: yup.string().when("as_per_norms", {
                    is: "no",
                    then: () =>
                      yup.string().required("Please provide your comments"),
                    otherwise: () => yup.string().notRequired(),
                  }),
                })}

                validateOnChange={() => console.log("validateOnChange")}
                onSubmit={(values) => {
                  console.log("Form submitted with values:", values);
                  setFormData(values);
                  setFormSubmited(true);
                  // console.log(formData);
                  submitAction(values);
                }}
                initialValues={initValue}
              >
                {({
                  handleSubmit,
                  handleChange,
                  submitForm,
                  values,
                  errors,
                  touched,
                }) => (
                  <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
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
                          onClick={() => handleShowModal("xl")}
                          type="button"
                          className="rounded-pill btn-wave btn-outline-dark"
                          variant="btn-outline-dark"
                        >
                          Review Instructions
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Form ref={formRef2} onSubmit={handleSubmit} validated>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>
                              Whether the Land Area of the applicant institute is as per norms?
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <div>
                              <Form.Check
                                inline
                                type="radio"
                                label="Yes"
                                name="as_per_norms"
                                value="yes"
                                onChange={handleChange}
                                checked={values.as_per_norms === "yes"}
                                isInvalid={
                                  touched.as_per_norms &&
                                  !!errors.as_per_norms
                                }
                              />
                              <Form.Check
                                inline
                                type="radio"
                                label="No"
                                name="as_per_norms"
                                value="no"
                                onChange={handleChange}
                                checked={values.as_per_norms === "no"}
                                isInvalid={
                                  touched.as_per_norms &&
                                  !!errors.as_per_norms
                                }
                              />
                            </div>

                            <Form.Control.Feedback type="invalid">
                              {errors.category}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        {values.as_per_norms === "no" && (
                          <Row className="mb-3">
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom02"
                            >
                              <Form.Label>
                                Select the Reason(s) and Raise
                                Non-Conformities (NC)
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Field
                                required
                                name="reason"
                                as="select"
                                className="form-control"
                              >
                                <option value="">Select</option>
                                {MaxData.map((lang, i) => {
                                  return (
                                    <option key={i} value={lang.value}>
                                      {lang.label}
                                    </option>
                                  );
                                })}
                              </Field>
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                            </Form.Group>
                            {values.reason == "Any other reason, please specify" && (<Form.Group
                              required
                              as={Col}
                              md="12"
                              controlId="text-area"
                              style={{ marginTop: "1rem" }}
                            >
                              <Form.Label>
                                Any other reason, please specify{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                name="assessor_comments"
                                required
                                as="textarea"
                                rows={3}
                                className={`form-control ${touched.assessor_comments &&
                                  errors.assessor_comments
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                value={values.assessor_comments}
                                onChange={handleChange}
                                isInvalid={
                                  touched.assessor_comments &&
                                  !!errors.assessor_comments
                                }
                              />
                              {touched.assessor_comments &&
                                errors.assessor_comments && (
                                  <div className="invalid-feedback">
                                    {errors.assessor_comments}
                                  </div>
                                )}
                            </Form.Group>)}

                          </Row>
                        )}

                      </Form>
                    </Card.Body>
                    <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer>
                  </Card>
                )}
              </Formik>
            ) : formSubmited == true ? (
              <Card
                className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
                style={
                  formData.as_per_norms == "yes"
                    ? { backgroundColor: "#d6f3e0" }
                    : { backgroundColor: "#f3d6d6" }
                }
              >
                <Card.Header>
                  <label
                    className="main-content-label my-auto"
                    style={{ textTransform: "none" }}
                  >
                    Assessor Comments
                  </label>
                  <div className="ms-auto  d-flex">
                    25th April 2025:10:20PM
                  </div>
                </Card.Header>
                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                  <Row className="mb-3">
                    <Col md={12}> <b>Whether the Land Area of the applicant institute is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "Any other reason, please specify" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setFormSubmited(false); }}>
                    Edit
                  </Button>
                </Card.Footer>)}

              </Card>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </Col>)}
      </Row>
    </>
  );
};







