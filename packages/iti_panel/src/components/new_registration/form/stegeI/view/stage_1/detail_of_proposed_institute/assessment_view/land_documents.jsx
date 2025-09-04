import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
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
import * as C from "affserver";
import SwalManager from "../../../../../../../../common/SwalManager";

import * as st from "../../../../../../../../services/state/index";


export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

export const LandDocuments = ({ steps, step, view: viewProp = false, isView = false, nav }) => {
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

  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);



  const onNext = async () => {
    // Set Flow if Not exit 
    // let result = await set.setStageIAssessmentFlow(appId);
    const confirmed = await SwalManager.confirmSave();
    if (!confirmed) return;
    try {
      SwalManager.showLoading("Saving...");
      await new Promise(res => setTimeout(res, 1)); // Simulated API call
      SwalManager.hide();

      let result, keyName, data, list = [];
      console.log(registry.current);

      for (const [key, val] of Object.entries(registry.current)) {
        keyName = key;
        data = val();
        switch (keyName) {
          case C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND:
            result = await data.submitNow();
            console.log(result);
            list.push(result);
            break;
          case C.ASSESSMENT_STAGE_I_KEYS.LAND_AREA:
            result = await data.submitNow();
            console.log(result);
            list.push(result);
            break;
          default:
            list.push(false);
            break;
        }
      }

      // ✅ Check if all values are true
      if (list.every(Boolean)) {
        await st.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step);
        // await set.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step);
        nav.next();
      }
      else {
        await SwalManager.error("Please Fill the Forms");
      }
    } catch (error) {
      console.log(error);
      SwalManager.hide();
      await SwalManager.error("Please Fill the Forms");
    }
  }


  // Experiment Starts @dpkdhariwal
  const registry = useRef([]); // store all child functions
  const register2 = (index, obj) => {
    registry.current[index] = obj;
  };



  return (
    <FunctionRegistryContext.Provider value={register2}>
      <div key={0} style={{ backgroundColor: "rgb(245, 245, 245)", margin: "10px 0px 0px", borderRadius: 6, borderStyle: "dashed", borderWidth: "thin", padding: "10px", }}>
        {/* <hr className="custom-hr"/> */}

        {/* Land Info */}
        <LandInfo />

        {step?.VerificationList?.map((item, index) => {
          switch (item.checkName) {
            case C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND:
              return <PossessionOfLand step={step} />
            case C.ASSESSMENT_STAGE_I_KEYS.LAND_AREA:
              return <LandArea />
            default:
              return <h2>{item.check}</h2>
          }
        })}
      </div>

      {isView == false && <Navigations nav={nav} onNext={onNext} />}
    </FunctionRegistryContext.Provider>
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

  console.log(step);

  // Location
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

  // useState
  const [view, setView] = useState(viewProp);
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [aStatus, setAStatus] = useState({});
  // End




  const loadInfo = async () => {
    // let result = await get_da_status_possasion_of_land(appId);
    let result = await st.get_da_status_possasion_of_land(appId);
    console.log(result);
    // let assessment_status = await set.getAssessmentProgressStatus(appId);

    let assessment_status, resp;
    resp = await st.getAssessmentProgressStatus(appId);
    assessment_status = resp.data
    setAStatus(assessment_status);
    const lastObj = result[0];
    if (lastObj) {
      setInitValue(lastObj);
      console.log(lastObj);
      setFormData(lastObj);
      setFormSubmited(true);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
    }
  }

  useEffect(() => {
    loadInfo();
  }, [appId]);


  useEffect(() => {
    console.log(aStatus);
  }, [aStatus]);




  const formRef = useRef();
  const register = useFunctionRegistry();
  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);



  const formFunction = () => {
    register(`${C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND}`, () => { return { submitNow } });
  }


  useEffect(() => { formFunction(); }, [formRef]);

  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);

  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);


  const form = async () => {
    console.log(formRef?.current?.isValid);
    if (formRef?.current?.isValid) {
      await set_da_status_possasion_of_land(appId, formRef.current.values);
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
    try {
      console.log("reviewStatus (latest):", reviewStatusRef.current);
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
          return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  console.log(step);

  const setContent = () => {
    // console.log(step?.actor);
    switch (step?.actor) {
      case C.SL.APPLICANT:
        return <PossessionOfLandForApplicant />
      case C.SL.ASSESSOR:
        return <PossessionOfLandForAssessment />
      default:
        return "NA";
    }
  }


  return (
    <>
      {setContent()}
    </>
  );
};
export const PossessionOfLandForApplicant = ({ step, view: viewProp = false, isView = false }) => {

  console.log(step);

  // Location
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

  // useState
  const [view, setView] = useState(viewProp);
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [aStatus, setAStatus] = useState({});
  // End


  const submitAction = async (values) => {
    console.log(values);
    await set_da_status_possasion_of_land(appId, values);

    setAnyChangesMade(false);
    setEditMode(false);
    setReviewStatus(C.SL.REVIEWED);
    setViewType(C.SL.VIEW);
  }



  const loadInfo = async () => {
    let result = await get_da_status_possasion_of_land(appId);
    console.log(result);
    let assessment_status = await set.getAssessmentProgressStatus(appId);
    setAStatus(assessment_status);
    const lastObj = result[result.length - 1];
    if (lastObj) {
      setInitValue(lastObj);
      console.log(lastObj);
      setFormData(lastObj);
      setFormSubmited(true);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
    }
  }

  useEffect(() => {
    loadInfo();
  }, [appId]);


  useEffect(() => {
    console.log(aStatus);
  }, [aStatus]);




  const formRef = useRef();
  const register = useFunctionRegistry();
  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);





  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);


  const form = async () => {
    console.log(formRef.current.isValid);
    if (formRef.current.isValid) {
      await set_da_status_possasion_of_land(appId, formRef.current.values);
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
    console.log(reviewStatus);
    switch (reviewStatus) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editMode) {
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


  const setContent = () => {
    console.log(step);
    switch (step?.for) {
      case C.SL.APPLICANT:
        break;
      case C.SL.ASSESSOR:
        break;
      default:
        return "NA";
    }
  }


  return (
    <>
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.97)", margin: "10px 0px 0px", borderRadius: 6, padding: '5px' }}>
        <Row  >
          <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
            <table width="100%" border={1} style={{ borderCollapse: "collapse", color: 'black' }} align="center" cellPadding="5px" >
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
          {view != true && (<Col xl={6} lg={6} md={6} sm={6}>
            <div className="form-container">
              {reviewStatus == C.SL.PENDING ? (
                <Formik
                  innerRef={formRef}
                  enableReinitialize
                  validationSchema={yup.object().shape({
                    as_per_norms: yup.string().required("Select whether Building plan is as per norms"),
                    reason: yup.string().when("as_per_norms", { is: "no", then: () => yup.string().required("Please select a category"), otherwise: () => yup.string().notRequired(), }),
                    assessor_comments: yup.string().when("as_per_norms", { is: (as_per_norms, reason) => as_per_norms === "no" || reason === "Any other reason, please specify", then: () => yup.string().required("Please provide your comments"), otherwise: () => yup.string().notRequired(), }),
                  })}
                  validateOnChange={true}
                  initialValues={initValue}
                  validateOnBlur={true}
                  validateOnMount={true}
                >
                  {({
                    handleSubmit,
                    handleChange,
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
                      {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                    </Card>
                  )}
                </Formik>
              ) : reviewStatus == C.SL.REVIEWED ? (
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
                  {/* && aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR  */}
                  {/* {isView == false && (
                  <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setReviewStatus(C.SL.PENDING); }}>
                    Edit
                  </Button>
                </Card.Footer>)} */}
                </Card>
              ) : (
                <h1>No Data</h1>
              )}
            </div>
          </Col>)}
        </Row>
        <hr />
        <Formik
          innerRef={formRef}
          enableReinitialize
          validationSchema={yup.object().shape({
            as_per_norms: yup.string().required("Select whether Building plan is as per norms"),
            reason: yup.string().when("as_per_norms", { is: "no", then: () => yup.string().required("Please select a category"), otherwise: () => yup.string().notRequired(), }),
            assessor_comments: yup.string().when("as_per_norms", { is: (as_per_norms, reason) => as_per_norms === "no" || reason === "Any other reason, please specify", then: () => yup.string().required("Please provide your comments"), otherwise: () => yup.string().notRequired(), }),
          })}

          validateOnChange={true}
          // onSubmit={(values) => {
          //   setFormData(values);
          //   setFormSubmited(true);
          //   submitAction(values);
          // }}
          initialValues={initValue}
          validateOnBlur={true}
          validateOnMount={true}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <Card className="border border-2 border-danger  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#ebcea2ff" }}>
              <Card.Header>
                <label
                  className="main-content-label my-auto"
                  style={{ textTransform: "none" }}
                >
                  Upload Document Against NC (Non Conformities)
                </label>
                <div className="ms-auto d-flex">
                  <Button
                    size="sm"
                    type="button"
                    className="rounded-pill btn-wave btn-outline-dark"
                    variant="btn-outline-dark"
                  >
                    Uplaod Instructions
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Form ref={formRef2} onSubmit={handleSubmit} validated>
                  {/* <Row className="mb-3">
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
                  )} */}

                </Form>
              </Card.Body>
              {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
            </Card>
          )}
        </Formik>
      </div>


    </>
  );
};
export const PossessionOfLandForAssessment = ({ step, view: viewProp = false, isView = false }) => {
  const formRef2 = useRef();

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
  const formRef = useRef();

  // @dpkdhariwal
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  // End

  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [aStatus, setAStatus] = useState({});

  const register = useFunctionRegistry();
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);


  const loadInfo = async () => {
    // let result = await set.get_da_status_land_area(appId);
    console.log("dfadfasfdsa");
    try {
      let result, assessment_status, resp;
      resp = await st.get_da_status_possasion_of_land(appId);
      result = resp.data;
      // let assessment_status = await set.getAssessmentProgressStatus(appId);
      resp = await st.getAssessmentProgressStatus(appId);
      assessment_status = resp.data;
      setAStatus(assessment_status);

      const lastObj = result[result.length - 1];
      console.log(lastObj);
      if (lastObj) {
        setInitValue(lastObj);
        setFormData(lastObj);
        setFormSubmited(true);
        setReviewStatus(C.SL.REVIEWED);
        setViewType(C.SL.VIEW);
      }

    } catch (error) {
      console.log(error);
    }


  }

  useEffect(() => { loadInfo(); }, [appId]);


  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND}`, () => { return { submitNow } }); }


  useEffect(() => {
    formFunction();
  }, [formRef]);


  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);


  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);


  const form = async () => {
    if (formRef.current.isValid) {
      // await set_da_status_possasion_of_land(appId, formRef.current.values);
      await st.set_da_status_possasion_of_land(appId, formRef.current.values);

      // throw new Error("Stopped.....");

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
    try {
      console.log("reviewStatus (latest):", reviewStatusRef.current);
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
          return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
  useEffect(() => {
    formFunction();
  }, [formRef]);

  const setContent = () => {
    switch (step?.actor) {
      case C.SL.APPLICANT:
        break;
      case C.SL.ASSESSOR:
        break;
      default:
        return "NA";
    }
  }


  return (
    <>
      <Row style={{ backgroundColor: "rgb(245, 245, 245)", margin: "10px 0px 0px", borderRadius: 6, }} >
        <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
          <table width="100%" border={1} style={{ borderCollapse: "collapse", color: 'black' }} align="center" cellPadding="5px" >
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
        {view != true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div className="form-container">
            {reviewStatus == C.SL.PENDING ? (
              <Formik
                innerRef={formRef}
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup.string().required("Select whether Land Document is as per norms"),
                  reason: yup.string().when("as_per_norms", { is: "no", then: () => yup.string().required("Please select a category"), otherwise: () => yup.string().notRequired(), }),
                  assessor_comments: yup.string().when("as_per_norms", { is: (as_per_norms, reason) => as_per_norms === "no" || reason === "Any other reason, please specify", then: () => yup.string().required("Please provide your comments"), otherwise: () => yup.string().notRequired(), }),
                })}
                validateOnChange={true}
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}
              >
                {({
                  handleSubmit,
                  handleChange,
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
                    {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                  </Card>
                )}
              </Formik>
            ) : reviewStatus == C.SL.REVIEWED ? (
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
                    <Col md={12}> <b>Whether land documents is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "Any other reason, please specify" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {/* && aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR  */}
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

// Land Area
export const LandArea = ({ step, view: viewProp = false, isView = false }) => {
  const formRef = useRef();

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

  // @dpkdhariwal
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  // End

  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [aStatus, setAStatus] = useState({});



  const register = useFunctionRegistry();
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);



  const loadInfo = async () => {
    let result = await set.get_da_status_land_area(appId);
    let assessment_status = await set.getAssessmentProgressStatus(appId);
    setAStatus(assessment_status);

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


  useEffect(() => { loadInfo(); }, [appId]);


  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.LAND_AREA}`, () => { return { submitNow } }); }

  useEffect(() => {
    formFunction();
  }, [formRef]);


  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);

  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);

  const form = async () => {
    if (formRef.current.isValid) {
      await set.set_da_status_land_area(appId, formRef.current.values);
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
    try {
      console.log("reviewStatus (latest):", reviewStatusRef.current);
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
          return false;
      }
    } catch (error) {
      console.log(error);
      return false;
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
                innerRef={formRef}
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup.string().required("Select Whether the Land Area of the applicant institute is as per norms?"),
                  reason: yup.string().when("as_per_norms",
                    {
                      is: (as_per_norms, reason) => as_per_norms === "no" && reason === "Any other reason, please specify",
                      then: () => yup.string().required("Please select a category"), otherwise: () => yup.string().notRequired(),
                    }),
                  assessor_comments: yup.string().when("as_per_norms", { is: (as_per_norms, reason) => as_per_norms === "no" || reason === "Any other reason, please specify", then: () => yup.string().required("Please provide your comments"), otherwise: () => yup.string().notRequired(), }),
                })}
                validateOnChange={true}
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}               >
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
                    {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
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
                {/* aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR && */}
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setFormSubmited(false); setEditMode(true) }}>
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







