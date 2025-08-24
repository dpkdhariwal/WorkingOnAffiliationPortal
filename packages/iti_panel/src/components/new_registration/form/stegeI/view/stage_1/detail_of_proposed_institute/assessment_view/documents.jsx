import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form as BS, InputGroup, Button, Modal } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray, Form, ErrorMessage, useFormikContext } from "formik";
import { useLocation } from "react-router-dom";
import * as get from "../../../../../../../../db/forms/stageI/get/get";
import * as set from "../../../../../../../../db/forms/stageI/set/set";
import * as C from "../../../../../../../../constants";
import { Navigations } from "../../../../../../../Assessment/components"

// import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import SwalManager from "../../../../../../../../common/SwalManager";

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);


export const Documents = ({ step, view: viewProp = false, isView = false, nav }) => {

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

  useEffect(() => {
    console.log(step);
  })

  const submitHandlersRef = useRef({});



  const handleAllSubmit = async () => {

    const confirmed = await SwalManager.confirmSave();
    if (!confirmed) return;


    console.log(registry);

    try {
      SwalManager.showLoading("Saving...");
      await new Promise(res => setTimeout(res, 1)); // Simulated API call
      SwalManager.hide();

      let keyName, data, list = [];

      for (const [key, val] of Object.entries(registry.current)) {
        keyName = key;
        data = val();
        console.log(data);
        switch (keyName) {
          case C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY:
            list.push(await data.submitNow());
            break;
          case C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION:
            console.log(data);
            list.push(await data.submitNow());
            break;
          case C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT:
            console.log(data);
            list.push(await data.submitNow());
            break;
          case C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE:
            console.log(data);
            list.push(await data.submitNow());
            break;
          default:
            list.push(false);
            break;
        }
      }

      console.log(list);
      const allTrue = list.every(Boolean);
      if (allTrue) {
        let reuslt = await SwalManager.success("Saved Successfully");
        if (reuslt.isConfirmed) {
          await set.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DOCUMENTS_UPLOAD.step);
          nav.next();
        }
      }
      else {
        throw new Error("Please Review the documents");

      }
    } catch (error) {
      console.log(error);
      SwalManager.hide();
      await SwalManager.error("Please Fill the Forms");
    }
  };
  // nav.next();


  const testFn = () => {
    console.log('dfadfdf');
  }


  // Experiment Starts @dpkdhariwal
  const registry = useRef([]); // store all child functions
  const register2 = (index, obj) => {
    registry.current[index] = obj;
  };

  // const callAction = (name, ...args) => {
  //   console.log(registry);
  //   if (registry.current[name]) {
  //     return registry.current[name](...args);
  //   } else {
  //     console.warn(`No function registered for ${name}`);
  //   }
  // };



  // Experiment Ends here @dpkdhariwal
  return (
    <FunctionRegistryContext.Provider value={register2}>
      <div style={{ backgroundColor: "rgb(245, 245, 245)", margin: "10px 0px 0px", borderRadius: 6, borderStyle: "dashed", borderWidth: "thin", padding: "10px", }}>

        {step?.VerificationList?.map((item, index) => {

          const register = (submit, validate, formVisibility, formSubmited, getLatestValue) => {
            submitHandlersRef.current[index] = { submit, validate, formVisibility, formSubmited, getLatestValue }
          };

          switch (item.check) {
            case C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY:
              return <IdProofOfAuthorizedSignatory isView={isView} key={index} registerSubmit={register} test={testFn} />
            case C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION:
              return <RegistrationCertificateOfApplicantOrganization isView={isView} key={index} registerSubmit={register} />
            case C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT:
              return <IdProofOfSecretaryChairpersonPresident isView={isView} key={index} registerSubmit={register} />
            case C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE:
              return <ResolutionCertificate isView={isView} key={index} registerSubmit={register} />
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
              // borderStyle: "dashed",
              // borderWidth: "thin",
              padding: "10px",
            }}
          >
            <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
              <table
                width="98%"
                border={1}
                style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                align="center"
                cellPadding="5px"
              >
                <tbody>
                  <tr>              <th colSpan={5}>ID Proof of Authorized Signatory</th>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Name</th>
                    <th style={{ border: "1px solid black" }}>Designation</th>
                    <th style={{ border: "1px solid black" }}>Email Id</th>
                    <th style={{ border: "1px solid black" }}>Mobile Number</th>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>Deepak</td>
                    <td style={{ border: "1px solid black" }}>Full Stack Developer</td>
                    <td style={{ border: "1px solid black" }}>testemail</td>
                    <td style={{ border: "1px solid black" }}>123456789</td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Select ID Proof Type</th>
                    <th style={{ border: "1px solid black" }}>Enter ID Proof Number</th>
                    <th colSpan={2} style={{ border: "1px solid black" }}>Document Upload</th>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>xyz</td>
                    <td style={{ border: "1px solid black" }}>xyz</td>
                    <td colSpan={2} style={{ border: "1px solid black" }}>xyz</td>
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
                          <BS ref={formRef2} onSubmit={handleSubmit} validated>
                            <Row className="mb-3">
                              <BS.Group>
                                <BS.Label>

                                  Whether the ID Proof of Authorized Signatory is as per norms?
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <div>
                                  <BS.Check
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
                                  <BS.Check
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

                                <BS.Control.Feedback type="invalid">
                                  {errors.category}
                                </BS.Control.Feedback>
                              </BS.Group>
                            </Row>
                            {values.as_per_norms === "no" && (
                              <Row className="mb-3">
                                <BS.Group
                                  as={Col}
                                  md="12"
                                  controlId="validationCustom02"
                                >
                                  <BS.Label>
                                    Select the Reason(s) and Raise
                                    Non-Conformities (NC)
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
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
                                  <BS.Control.Feedback>
                                    Looks good!
                                  </BS.Control.Feedback>
                                </BS.Group>

                                <BS.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <BS.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
                                  <BS.Control
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
                                </BS.Group>
                              </Row>
                            )}
                            <Button variant="primary" onClick={submitForm}>
                              Submit
                            </Button>
                          </BS>
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
                width="98%"
                border={1}
                style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                align="center"
                cellPadding="5px"
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Registration Certificate of Applicant Organization</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
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
                          <BS ref={formRef2} onSubmit={handleSubmit} validated>
                            <Row className="mb-3">
                              <BS.Group>
                                <BS.Label>
                                  Whether the Registration Certificate of the Applicant Organization is as the norms?
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <div>
                                  <BS.Check
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
                                  <BS.Check
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

                                <BS.Control.Feedback type="invalid">
                                  {errors.category}
                                </BS.Control.Feedback>
                              </BS.Group>
                            </Row>
                            {values.as_per_norms === "no" && (
                              <Row className="mb-3">
                                <BS.Group
                                  as={Col}
                                  md="12"
                                  controlId="validationCustom02"
                                >
                                  <BS.Label>
                                    Select the Reason(s) and Raise
                                    Non-Conformities (NC)
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
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
                                  <BS.Control.Feedback>
                                    Looks good!
                                  </BS.Control.Feedback>
                                </BS.Group>

                                <BS.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <BS.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
                                  <BS.Control
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
                                </BS.Group>
                              </Row>
                            )}
                            <Button variant="primary" onClick={submitForm}>
                              Submit
                            </Button>
                          </BS>
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
                            <th style={{ border: "1px solid black" }}>Person Designation</th>
                            <th style={{ border: "1px solid black" }}>Select ID Proof Type</th>
                            <th style={{ border: "1px solid black" }}>Enter ID Proof Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: "1px solid black" }}>ABCD</td>
                            <td style={{ border: "1px solid black" }}>ABCD</td>
                            <td style={{ border: "1px solid black" }}>ABCD</td>
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
                          <BS ref={formRef2} onSubmit={handleSubmit} validated>
                            <Row className="mb-3">
                              <BS.Group>
                                <BS.Label>
                                  Whether the ID Proof of Secretary/Chairperson/President is as per norms?
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <div>
                                  <BS.Check
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
                                  <BS.Check
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

                                <BS.Control.Feedback type="invalid">
                                  {errors.category}
                                </BS.Control.Feedback>
                              </BS.Group>
                            </Row>
                            {values.as_per_norms === "no" && (
                              <Row className="mb-3">
                                <BS.Group
                                  as={Col}
                                  md="12"
                                  controlId="validationCustom02"
                                >
                                  <BS.Label>
                                    Select the Reason(s) and Raise
                                    Non-Conformities (NC)
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
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
                                  <BS.Control.Feedback>
                                    Looks good!
                                  </BS.Control.Feedback>
                                </BS.Group>

                                <BS.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <BS.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
                                  <BS.Control
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
                                </BS.Group>
                              </Row>
                            )}
                            <Button variant="primary" onClick={submitForm}>
                              Submit
                            </Button>
                          </BS>
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
                width="98%"
                border={1}
                style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                align="center"
                cellPadding="5px"
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Resolution Certificate</th>
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
                            <th style={{ border: "1px solid black" }}>Resolution for Starting ITI</th>
                            <th style={{ border: "1px solid black" }}>Resolution from Applicant for Authorized signatory</th>
                            <th style={{ border: "1px solid black" }}>Resolution Regarding Earmarking of Land, Building, and other Resources Exclusively Dedicated to the ITI (if any), as per the Format Provided in Annexure-5</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: "1px solid black" }}><Button>View</Button></td>
                            <td style={{ border: "1px solid black" }}><Button>View</Button></td>
                            <td style={{ border: "1px solid black" }}><Button>View</Button></td>
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
                          <BS ref={formRef2} onSubmit={handleSubmit} validated>
                            <Row className="mb-3">
                              <BS.Group>
                                <BS.Label>
                                  Whether the Resolution of the institute is as per norms?
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <div>
                                  <BS.Check
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
                                  <BS.Check
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

                                <BS.Control.Feedback type="invalid">
                                  {errors.category}
                                </BS.Control.Feedback>
                              </BS.Group>
                            </Row>
                            {values.as_per_norms === "no" && (
                              <Row className="mb-3">
                                <BS.Group
                                  as={Col}
                                  md="12"
                                  controlId="validationCustom02"
                                >
                                  <BS.Label>
                                    Select the Reason(s) and Raise
                                    Non-Conformities (NC)
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
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
                                  <BS.Control.Feedback>
                                    Looks good!
                                  </BS.Control.Feedback>
                                </BS.Group>

                                <BS.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <BS.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
                                  <BS.Control
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
                                </BS.Group>
                              </Row>
                            )}
                            <Button variant="primary" onClick={submitForm}>
                              Submit
                            </Button>
                          </BS>
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
      {isView == false && <Navigations nav={nav} onNext={() => { handleAllSubmit() }} />}

    </FunctionRegistryContext.Provider>
  );
};




// ID Proof of Authorized Signatory
export const IdProofOfAuthorizedSignatory = ({ step, view: viewProp = false, registerSubmit, isView = false, actionInfo }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");


  const formikMethodsRef = useRef(null);

  // Function to capture Formik methods
  const handleRegister = (methods) => { formikMethodsRef.current = methods; };

  // Validation Schema
  const validationSchema = yup.object().shape({ as_per_norms: yup.string().required("Select Whether the ID Proof is as per norms?"), reason: yup.string().when("as_per_norms", { is: "no", then: () => yup.string().required("Please select a category"), otherwise: () => yup.string().notRequired(), }), assessor_comments: yup.string().when(["as_per_norms", "reason"], { is: (as_per_norms, reason) => as_per_norms === "no" && reason === "Any other reason, please specify", then: () => yup.string().required("Please provide your comments"), otherwise: () => yup.string().notRequired(), }), });


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


  // useState
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formData, setFormData] = useState({});
  const [formVisibility, setFormVisibility] = useState(false);
  const [formSubmited, setFormSubmited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [aStatus, setAStatus] = useState({});
  // End


  // useRef
  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);
  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);
  // End



  const formRef = useRef(); // create ref

  // Loading Review Details
  const loadInfo = async () => {
    let result = await set.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY);
    let assessment_status = await set.getAssessmentProgressStatus(appId);
    setAStatus(assessment_status);
    const lastObj = result[result.length - 1];
    if (lastObj) {
      setInitValue(lastObj);
      setFormData(lastObj);
      setFormSubmited(true);
      setIsLoaded(true);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
    }
    return lastObj;
  }
  useEffect(() => { loadInfo(); }, [appId]);

  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
  const register = useFunctionRegistry();
  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);
  const form = async () => {
    if (formRef.current.isValid) {
      await set.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY);
      setAnyChangesMade(false);
      setEditMode(false);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
      return true;
    }
    else {
      return false;
    }
  }
  const submitNow = async () => {
    console.log(reviewStatus)
    switch (reviewStatusRef.current) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editModeRef.current) {
          case true:
            return await form();
          case false:
            return true;
        }
        break;
      default:
        break;
    }
  }


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
            width="98%"
            border={1}
            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <tbody>
              <tr><th colSpan={5}>ID Proof of Authorized Signatory</th>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }}>Name</th>
                <th style={{ border: "1px solid black" }}>Designation</th>
                <th style={{ border: "1px solid black" }}>Email Id</th>
                <th style={{ border: "1px solid black" }}>Mobile Number</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Deepak</td>
                <td style={{ border: "1px solid black" }}>Full Stack Developer</td>
                <td style={{ border: "1px solid black" }}>testemail</td>
                <td style={{ border: "1px solid black" }}>123456789</td>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }}>Select ID Proof Type</th>
                <th style={{ border: "1px solid black" }}>Enter ID Proof Number</th>
                <th colSpan={2} style={{ border: "1px solid black" }}>Document Upload</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>xyz</td>
                <td style={{ border: "1px solid black" }}>xyz</td>
                <td colSpan={2} style={{ border: "1px solid black" }}>xyz</td>
              </tr>
            </tbody>
          </table>
        </Col>
        {view != true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div className="form-container">
            {reviewStatus == C.SL.PENDING || editMode === true && viewType == C.SL.FORM ? (
              <Formik
                innerRef={formRef}
                enableReinitialize
                validationSchema={validationSchema}
                validateOnChange={() => console.log("validateOnChange")}
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}   // ✅ this makes validation run when form loads
              >
                {({
                  handleSubmit,
                  handleChange,
                  submitForm,
                  values,
                  errors,
                  touched,
                  validateForm,
                  dirty
                }) => {
                  useEffect(() => { setAnyChangesMade(dirty); }, [dirty, values]);
                  // if (registerSubmit) {
                  //   // registerSubmit(submitForm, validateForm, formVisibility, getLatestValue);
                  // }
                  return (

                    <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
                      <Card.Header>
                        <label
                          className="main-content-label my-auto"
                          style={{ textTransform: "none" }}
                        >
                          Review Form
                          <p>Any changes made? {anyChangesMade ? "Yes" : "No"}</p>

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
                        <BS ref={formRef2} onSubmit={handleSubmit} validated>
                          <Row className="mb-3">
                            <BS.Group>
                              <BS.Label>
                                Whether the ID Proof of Authorized Signatory is as per norms?
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
                              <div>
                                <BS.Check
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
                                <BS.Check
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

                              <BS.Control.Feedback type="invalid">
                                {errors.category}
                              </BS.Control.Feedback>
                            </BS.Group>
                          </Row>
                          {values.as_per_norms === "no" && (
                            <Row className="mb-3">
                              <BS.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                              >
                                <BS.Label>
                                  Select the Reason(s) and Raise
                                  Non-Conformities (NC)
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <Field
                                  required
                                  name="reason"
                                  as="select"
                                  className="form-control"
                                  onChange={handleChange}
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
                                <BS.Control.Feedback>
                                  Looks good!
                                </BS.Control.Feedback>
                              </BS.Group>
                              {values.reason == "Any other reason, please specify" && (
                                <BS.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <BS.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
                                  <BS.Control
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
                                </BS.Group>)}

                            </Row>
                          )}
                          {/* 🔹 Registers methods */}
                          <FormikRegister registerSubmit={handleRegister} />
                        </BS>
                      </Card.Body>
                      {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                    </Card>)
                }
                }
              </Formik>
            ) : reviewStatus == C.SL.REVIEWED && editMode === false ? (
              <Card
                className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
                style={formData.as_per_norms == "yes" ? { backgroundColor: "#d6f3e0" } : { backgroundColor: "#f3d6d6" }} >
                <Card.Header>
                  <label className="main-content-label my-auto" style={{ textTransform: "none" }} >
                    Assessor Comments
                  </label>
                  {/* <div className="ms-auto  d-flex">
                    25th April 2025:10:20PM
                  </div> */}
                </Card.Header>
                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                  <Row className="mb-3">
                    <Col md={12}> <b>Whether the ID Proof of Authorized Signatory is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "Any other reason, please specify" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {/* && aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR */}
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setReviewStatus(C.SL.PENDING); }}>
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


// Registration Certificate of Applicant Organization
export const RegistrationCertificateOfApplicantOrganization = ({ step, view: viewProp = false, registerSubmit, isView = false }) => {
  const formRef = useRef(); // create ref

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
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

  // useState
  const [view, setView] = useState(viewProp);
  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formVisibility, setFormVisibility] = useState(false);
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW

  const [aStatus, setAStatus] = useState({});
  // End

  // useRef
  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);
  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);
  //End


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




  const submitAction = async (values) => {
    console.log(values);
    await set.set_da_status(appId, values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION);
  }



  const loadInfo = async () => {
    let result = await set.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION);
    let assessment_status = await set.getAssessmentProgressStatus(appId);
    setAStatus(assessment_status);

    console.log(result);
    if (result) {
      const lastObj = result[result.length - 1];
      console.log(lastObj);
      if (lastObj) {
        setInitValue(lastObj);
        setFormData(lastObj);
        setFormSubmited(true);

        setReviewStatus(C.SL.REVIEWED);
        setViewType(C.SL.VIEW);
      }
    }
  }

  useEffect(() => {
    loadInfo();
  }, [appId]);



  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
  const register = useFunctionRegistry();
  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);
  const form = async () => {
    if (formRef.current.isValid) {
      await set.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION);
      setAnyChangesMade(false);
      setEditMode(false);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
      return true;
    }
    else {
      return false;
    }
  }
  const submitNow = async () => {
    switch (reviewStatusRef.current) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editModeRef.current) {
          case true:
            return await form();
          case false:
            return true;
        }
        break;
      default:
        break;
    }
  }
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
            width="98%"
            border={1}
            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Registration Certificate of Applicant Organization</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black" }}><Button>View File</Button></td>
              </tr>

            </tbody>
          </table>
        </Col>
        {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div className="form-container">
            {reviewStatus == C.SL.PENDING || editMode === true && viewType == C.SL.FORM ? (

              <Formik
                innerRef={formRef}
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup
                    .string()
                    .required("Select Whether the Registration Certificate of the Applicant Organization is as the norms?"),

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
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}   // ✅ this makes validation run when form loads
              >
                {({
                  handleSubmit,
                  handleChange,
                  submitForm,
                  values,
                  errors,
                  touched,
                  validateForm
                }) => {
                  if (registerSubmit) {
                    registerSubmit(submitForm, validateForm, formVisibility);
                  }
                  return (
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
                        <BS ref={formRef2} onSubmit={handleSubmit} validated>
                          <Row className="mb-3">
                            <BS.Group>
                              <BS.Label>
                                Whether the Registration Certificate of the Applicant Organization is as the norms?
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
                              <div>
                                <BS.Check
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
                                <BS.Check
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

                              <BS.Control.Feedback type="invalid">
                                {errors.category}
                              </BS.Control.Feedback>
                            </BS.Group>
                          </Row>
                          {values.as_per_norms === "no" && (
                            <Row className="mb-3">
                              <BS.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                              >
                                <BS.Label>
                                  Select the Reason(s) and Raise
                                  Non-Conformities (NC)
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
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
                                <BS.Control.Feedback>
                                  Looks good!
                                </BS.Control.Feedback>
                              </BS.Group>
                              {values.reason == "Any other reason, please specify" && (<BS.Group
                                required
                                as={Col}
                                md="12"
                                controlId="text-area"
                                style={{ marginTop: "1rem" }}
                              >
                                <BS.Label>
                                  Any other reason, please specify{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <BS.Control
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
                              </BS.Group>)}

                            </Row>
                          )}

                        </BS>
                      </Card.Body>
                      {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                    </Card>
                  )
                }}
              </Formik>
            ) : reviewStatus == C.SL.REVIEWED && editMode === false ? (

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
                    <Col md={12}> <b>Whether the Registration Certificate of the Applicant Organization is as the norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "Any other reason, please specify" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {/* aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR */}
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setReviewStatus(C.SL.PENDING); }}>
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


// ID Proof of Secretary/Chairperson/President
export const IdProofOfSecretaryChairpersonPresident = ({ step, view: viewProp = false, registerSubmit, isView = false }) => {
  const formRef = useRef(); // create ref

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
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

  // useState
  const [view, setView] = useState(viewProp);
  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formVisibility, setFormVisibility] = useState(false);
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW

  const [aStatus, setAStatus] = useState({});
  //

  // useRef
  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);
  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);
  //End



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







  const loadInfo = async () => {
    let result = await set.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT);
    let assessment_status = await set.getAssessmentProgressStatus(appId);
    setAStatus(assessment_status);
    console.log(result);
    if (result) {
      const lastObj = result[result.length - 1];
      console.log(lastObj);
      if (lastObj) {
        setInitValue(lastObj);
        setFormData(lastObj);
        setFormSubmited(true);

        setReviewStatus(C.SL.REVIEWED);
        setViewType(C.SL.VIEW);
      }
    }
  }

  useEffect(() => { loadInfo(); }, [appId]);

  // Experiment Started Here @dpkdhariwal
  // const register = useFunctionRegistry();
  // useEffect(() => {
  //   register(`${C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT}`, () => {
  //     if (formRef.current) {
  //       return { formRef: formRef, formData: formData, formVisibility: formVisibility, formSubmited: formSubmited }
  //     }
  //     console.log("Child A function executed!");
  //   });
  // }, [formSubmited]);
  //End

  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
  const register = useFunctionRegistry();
  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);
  const form = async () => {
    if (formRef?.current?.isValid) {
      await set.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT);
      setAnyChangesMade(false);
      setEditMode(false);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
      return true;
    }
    else {
      return false;
    }
  }
  const submitNow = async () => {
    switch (reviewStatusRef.current) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editModeRef.current) {
          case true:
            return await form();
          case false:
            return true;
        }
        break;
      default:
        break;
    }
  }

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
                        <th style={{ border: "1px solid black" }}>Person Designation</th>
                        <th style={{ border: "1px solid black" }}>Select ID Proof Type</th>
                        <th style={{ border: "1px solid black" }}>Enter ID Proof Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: "1px solid black" }}>ABCD</td>
                        <td style={{ border: "1px solid black" }}>ABCD</td>
                        <td style={{ border: "1px solid black" }}>ABCD</td>
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
            {reviewStatus == C.SL.PENDING || editMode === true && viewType == C.SL.FORM ? (
              <Formik
                innerRef={formRef}
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup
                    .string()
                    .required("Select Whether the ID Proof of Secretary/Chairperson/President is as per norms?"),

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
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}   // ✅ this makes validation run when form loads
              >
                {({
                  handleSubmit,
                  handleChange,
                  submitForm,
                  values,
                  errors,
                  touched,
                  validateForm
                }) => {
                  if (registerSubmit) {
                    registerSubmit(submitForm, validateForm, formVisibility);
                  }

                  return (<Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
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
                      <BS ref={formRef2} onSubmit={handleSubmit} validated>
                        <Row className="mb-3">
                          <BS.Group>
                            <BS.Label>
                              Whether the ID Proof of Secretary/Chairperson/President is as per norms?
                              <span style={{ color: "red" }}>*</span>
                            </BS.Label>
                            <div>
                              <BS.Check
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
                              <BS.Check
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

                            <BS.Control.Feedback type="invalid">
                              {errors.category}
                            </BS.Control.Feedback>
                          </BS.Group>
                        </Row>
                        {values.as_per_norms === "no" && (
                          <Row className="mb-3">
                            <BS.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom02"
                            >
                              <BS.Label>
                                Select the Reason(s) and Raise
                                Non-Conformities (NC)
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
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
                              <BS.Control.Feedback>
                                Looks good!
                              </BS.Control.Feedback>
                            </BS.Group>
                            {values.reason == "Any other reason, please specify" && (<BS.Group
                              required
                              as={Col}
                              md="12"
                              controlId="text-area"
                              style={{ marginTop: "1rem" }}
                            >
                              <BS.Label>
                                Any other reason, please specify{" "}
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
                              <BS.Control
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
                            </BS.Group>)}

                          </Row>
                        )}

                      </BS>
                    </Card.Body>
                    {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                  </Card>);
                }}
              </Formik>
            ) : reviewStatus == C.SL.REVIEWED && editMode === false ? (
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
                    <Col md={12}> <b>Whether the ID Proof of Secretary/Chairperson/President is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "Any other reason, please specify" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {/* aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR */}
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setReviewStatus(C.SL.PENDING); }}>
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



// Resolution Certificate
export const ResolutionCertificate = ({ step, view: viewProp = false, registerSubmit, isView = false }) => {
  const formRef = useRef(); // create ref

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
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

  // use State
  const [view, setView] = useState(viewProp);
  const [showXlModal, setShowXlModal] = useState(false);
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formVisibility, setFormVisibility] = useState(false);
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  const [aStatus, setAStatus] = useState({});
  // useRef
  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);
  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);
  //End


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




  const submitAction = async (values) => {
    console.log(values);
    await set.set_da_status(appId, values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE);
  }



  const loadInfo = async () => {
    let result = await set.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE);
    let assessment_status = await set.getAssessmentProgressStatus(appId);
    setAStatus(assessment_status);

    console.log(result);
    if (result) {
      const lastObj = result[result.length - 1];
      console.log(lastObj);
      if (lastObj) {
        setInitValue(lastObj);
        setFormData(lastObj);
        setFormSubmited(true);
        setReviewStatus(C.SL.REVIEWED);
        setViewType(C.SL.VIEW);
      }
    }
  }

  useEffect(() => {
    loadInfo();
  }, [appId]);


  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
  const register = useFunctionRegistry();
  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);
  const form = async () => {
    if (formRef?.current?.isValid) {
      await set.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE);
      setAnyChangesMade(false);
      setEditMode(false);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
      return true;
    }
    else {
      return false;
    }
  }
  const submitNow = async () => {
    switch (reviewStatusRef.current) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editModeRef.current) {
          case true:
            return await form();
          case false:
            return true;
        }
        break;
      default:
        break;
    }
  }

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
            width="98%"
            border={1}
            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Resolution Certificate</th>
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
                        <th style={{ border: "1px solid black" }}>Resolution for Starting ITI</th>
                        <th style={{ border: "1px solid black" }}>Resolution from Applicant for Authorized signatory</th>
                        <th style={{ border: "1px solid black" }}>Resolution Regarding Earmarking of Land, Building, and other Resources Exclusively Dedicated to the ITI (if any), as per the Format Provided in Annexure-5</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: "1px solid black" }}><Button>View</Button></td>
                        <td style={{ border: "1px solid black" }}><Button>View</Button></td>
                        <td style={{ border: "1px solid black" }}><Button>View</Button></td>
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
            {reviewStatus == C.SL.PENDING || editMode === true && viewType == C.SL.FORM ? (
              <Formik
                innerRef={formRef}
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup
                    .string()
                    .required("Select Whether the Resolution of the institute is as per norms?"),

                  reason: yup.string().when("as_per_norms", {
                    is: "no",
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
                validateOnChange={true}
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}   // ✅ this makes validation run when form loads
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
                  touched,
                }) => {

                  // if (registerSubmit) {
                  //   registerSubmit(submitForm, validateForm, formVisibility);
                  // }
                  return (
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
                        <BS ref={formRef2} onSubmit={handleSubmit} validated>
                          <Row className="mb-3">
                            <BS.Group>
                              <BS.Label>
                                Whether the Resolution of the institute is as per norms?
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
                              <div>
                                <BS.Check
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
                                <BS.Check
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

                              <BS.Control.Feedback type="invalid">
                                {errors.category}
                              </BS.Control.Feedback>
                            </BS.Group>
                          </Row>
                          {values.as_per_norms === "no" && (
                            <Row className="mb-3">
                              <BS.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                              >
                                <BS.Label>
                                  Select the Reason(s) and Raise
                                  Non-Conformities (NC)
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
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
                                <BS.Control.Feedback>
                                  Looks good!
                                </BS.Control.Feedback>
                              </BS.Group>
                              {values.reason == "Any other reason, please specify" && (
                                <BS.Group required as={Col} md="12" controlId="text-area" style={{ marginTop: "1rem" }} >
                                  <BS.Label> Any other reason, please specify{" "} <span style={{ color: "red" }}>*</span> </BS.Label>
                                  <BS.Control
                                    name="assessor_comments"
                                    required
                                    as="textarea"
                                    rows={3}
                                    className={`form-control ${touched.assessor_comments && errors.assessor_comments ? "is-invalid" : "" }`}
                                    value={values.assessor_comments}
                                    onChange={handleChange}
                                    isInvalid={ touched.assessor_comments && !!errors.assessor_comments }
                                  />
                                  {touched.assessor_comments &&
                                    errors.assessor_comments && (
                                      <div className="invalid-feedback">
                                        {errors.assessor_comments}
                                      </div>
                                    )}
                                </BS.Group>)}

                            </Row>
                          )}

                        </BS>
                      </Card.Body>
                      {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                    </Card>)
                }}
              </Formik>
            ) : reviewStatus == C.SL.REVIEWED && editMode === false ? (
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
                    <Col md={12}> <b>Whether the Resolution of the institute is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "Any other reason, please specify" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {/* aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR */}
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setReviewStatus(C.SL.PENDING); }}>
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


// 🔹 Helper Component to register Formik methods outside
function FormikRegister({ registerSubmit }) {
  const { submitForm, validateForm, values } = useFormikContext();

  React.useEffect(() => {
    if (registerSubmit) {
      registerSubmit({
        submitForm,
        validateForm,
        getValues: () => values,
      });
    }
  }, [submitForm, validateForm, values, registerSubmit]);

  return null;
}