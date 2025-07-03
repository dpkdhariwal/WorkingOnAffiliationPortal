import { Fragment, useEffect, useRef, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { InputGroup, Modal } from "react-bootstrap";
import { ChatMessage } from "../../../Assessment/ReviewTrail";

import { Formik, Field, FieldArray } from "formik";
import * as formik from "formik";

import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  tradeList: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Title is required"),
      language: yup.string().required("Language is required"),
      file: yup.mixed().required("File is required"),
    })
  ),
  lease_deed_document: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Title is required"),
      language: yup.string().required("Language is required"),
      file: yup.mixed().required("File is required"),
    })
  ),
});

const DetailsOfDocumentsToBeUploaded = () => {
  const stage = useSelector((state) => state.theme.new_registration);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialTradeList = stage.stage_I.tradeList || [];

  const ctsTrades = [
    "Select Trade",
    "Electrician",
    "Fitter",
    "Turner",
    "Machinist",
    "Welder (Gas and Electric)",
    "Mechanic (Motor Vehicle)",
    "Mechanic Diesel",
    "Electronics Mechanic",
    "Refrigeration and Air Conditioning Technician",
    "Instrument Mechanic",
    "Information & Communication Technology System Maintenance",
    "Computer Operator and Programming Assistant (COPA)",
    "Draughtsman (Mechanical)",
    "Draughtsman (Civil)",
    "Wireman",
    "Surveyor",
    "Tool and Die Maker (Press Tools, Jigs & Fixtures)",
    "Plumber",
    "Carpenter",
    "Foundryman",
    "Painter (General)",
    "Sheet Metal Worker",
    "Mechanic (Tractor)",
    "Mechanic (Auto Electrical and Electronics)",
    "Fashion Design & Technology",
    "Dress Making",
    "Stenographer & Secretarial Assistant (English)",
    "Stenographer & Secretarial Assistant (Hindi)",
    "Baker and Confectioner",
    "Food Production (General)",
    "Health Sanitary Inspector",
    "Hair & Skin Care",
    "Sewing Technology",
  ];

  const ID_Proof_Doc_list = [
    "Aadhaar Card",
    "PAN Card",
    "Passport",
    "Voter ID Card",
    "Driving License",
  ];

  const designation = ["Secretary", "Chairperson", "President"];

  return (
    <Fragment>
      <Formik
        initialValues={{
          tradeList: initialTradeList,
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log("Form Values", values);
          // Swal.fire({
          //   title: "Saving on Local Storage",
          //   html: "Please wait...",
          //   timer: 2000,
          //   timerProgressBar: true,
          //   didOpen: () => {
          //     Swal.showLoading();
          //     dispatch({ type: "set_comp_stateI_III", payload: values });
          //   },
          // }).then(() => {
          //   navigate(
          //     "?stage=1&form_id=Basic Details of Applicant  Organization"
          //   );
          // });
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Card className="custom-card border border-primary">
              <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                  Details of Trade(s)/Unit(s) for Affiliation
                </div>
              </Card.Header>
              <Card.Body>
                <FieldArray name="tradeList">
                  {({ push }) => (
                    <Fragment>
                      {values.tradeList.map((doc, index) => (
                        <div key={index}>
                          <Row style={{ marginTop: "1rem" }}>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Select Trade<span style={{ color: 'red' }}>*</span><i
                                  className="fe fe-help-circle"
                                  style={{ cursor: "pointer", color: "#6c757d" }}
                                  title="Trade: A trade is a specialized skill or occupation imparted through training at an ITI in accordance with a defined curriculum of DGT. Examples of trades include Electrician, Fitter, Welder, and Computer Operator and Programming Assistant (COPA) etc. as listed on the DGT website."
                                ></i></Form.Label>
                                <Field
                                  required
                                  name={`tradeList[${index}].language`}
                                  as="select"
                                  className="form-control"
                                // isInvalid={
                                //   touched.tradeList?.[index]?.language &&
                                //   !!errors.tradeList?.[index]?.language
                                // }
                                >
                                  {ctsTrades.map((trade, i) => (
                                    <option key={i} value={trade}>
                                      {trade}
                                    </option>
                                  ))}
                                </Field>
                                <Form.Control.Feedback type="invalid">
                                  {errors.tradeList?.[index]?.language}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Unit in Shift 1<span style={{ color: 'red' }}>*</span><i
                                  className="fe fe-help-circle"
                                  style={{ cursor: "pointer", color: "#6c757d" }}
                                  title="Unit: It is the smallest functional division of a trade in an ITI, consisting of a fixed number of trainees. The strength of each unit, typically ranging from 16 to 24 students, is defined in the course curriculum of the respective trade."
                                ></i></Form.Label>
                                <Field
                                  type="number"
                                  name={`unit_in_shift1[${index}]`}
                                  as={Form.Control}
                                  placeholder="Enter in Shift 1"
                                // isInvalid={
                                //   touched.tradeList?.[index]?.title &&
                                //   !!errors.tradeList?.[index]?.title
                                // }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.tradeList?.[index]?.title}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Label>Unit in Shift 2<span style={{ color: 'red' }}>*</span> <i
                                  className="fe fe-help-circle"
                                  style={{ cursor: "pointer", color: "#6c757d" }}
                                  title="Unit: It is the smallest functional division of a trade in an ITI, consisting of a fixed number of trainees. The strength of each unit, typically ranging from 16 to 24 students, is defined in the course curriculum of the respective trade."
                                ></i></Form.Label>
                                <Field
                                  type="number"
                                  name={`unit_in_shift2[${index}]`}
                                  as={Form.Control}
                                  placeholder="Enter in Shift 2"
                                // isInvalid={
                                //   touched.tradeList?.[index]?.title &&
                                //   !!errors.tradeList?.[index]?.title
                                // }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.tradeList?.[index]?.title}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      ))}
                      <div className="d-flex flex-row-reverse">
                        <div className="p-2">
                          {" "}
                          <Button
                            className="mb-3"
                            onClick={() =>
                              push({ title: "", language: "", file: null })
                            }
                          >
                            Add More
                          </Button>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </FieldArray>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default DetailsOfDocumentsToBeUploaded;


export const Assessment_DetailsOfDocumentsToBeUploaded = () => {
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

  const handleCloseModal = () => {
    setShowXlModal(false);
    setSelectedSize("");
  };

  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);

  const messages = [
    {
      userType: "Assessor",
      username: "Alice",
      text: "Hello!",
      datetime: "10:30 AM",
      isUser: true,
      comp: () => <AssessorRemarkHistory title="Building Plan" />,
    },
    {
      userType: "Applicant",
      username: "You",
      text: "Hi Alice!",
      datetime: "10:31 AM",
      isUser: false,
      comp: ItiRemarkHistory,
    },
    {
      userType: "Assessor",
      username: "Alice",
      text: "Hello!",
      datetime: "10:30 AM",
      isUser: true,
      comp: () => <AssessorRemarkHistory title="Building Plan" />,
    },
  ];
  const stageI1_info = useSelector((state) => state.theme.new_registration);
  const index = 1;
  return (
    <>

      {["Electrician", "Fitter", "Welder", "COPA"].map((trade, idx) => (
        <Row
          style={{
            backgroundColor: "rgb(245, 245, 245)",
            margin: "10px 0px 0px",
            borderRadius: 6,
            borderStyle: "dashed",
            borderWidth: "thin",
            padding: "10px",
          }}
        >
          <Col xl={6} lg={6} md={6} sm={6}>
            <Row style={{ marginTop: '1rem' }}>
              <Col md={4}>
                <Form.Group controlId={`tradeList.${index}.language`}>
                  <Form.Label>
                    Select Trade <span style={{ color: 'red' }}>*</span>
                    <i
                      className="fe fe-help-circle"
                      style={{ cursor: 'pointer', color: '#6c757d', marginLeft: '5px' }}
                      title="Trade: A trade is a specialized skill or occupation imparted through training at an ITI in accordance with a defined curriculum of DGT. Examples of trades include Electrician, Fitter, Welder, and Computer Operator and Programming Assistant (COPA) etc. as listed on the DGT website."
                    />
                  </Form.Label>
                  <Form.Control
                    disabled
                    as="select"
                    name={`tradeList[${index}].language`}
                    value={trade}
                  >
                    <option value="">Select Trade</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Fitter">Fitter</option>
                    <option value="Welder">Welder</option>
                    <option value="COPA">COPA</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId={`unit_in_shift1.${index}`}>
                  <Form.Label>
                    Unit in Shift 1 <span style={{ color: 'red' }}>*</span>
                    <i
                      className="fe fe-help-circle"
                      style={{ cursor: 'pointer', color: '#6c757d', marginLeft: '5px' }}
                      title="Unit: It is the smallest functional division of a trade in an ITI, consisting of a fixed number of trainees. The strength of each unit, typically ranging from 16 to 24 students, is defined in the course curriculum of the respective trade."
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name={`unit_in_shift1[${index}]`}
                    value=""
                    placeholder="Enter in Shift 1"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId={`unit_in_shift2.${index}`}>
                  <Form.Label>
                    Unit in Shift 2 <span style={{ color: 'red' }}>*</span>
                    <i
                      className="fe fe-help-circle"
                      style={{ cursor: 'pointer', color: '#6c757d', marginLeft: '5px' }}
                      title="Unit: It is the smallest functional division of a trade in an ITI, consisting of a fixed number of trainees. The strength of each unit, typically ranging from 16 to 24 students, is defined in the course curriculum of the respective trade."
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name={`unit_in_shift2[${index}]`}
                    value=""
                    placeholder="Enter in Shift 2"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          {true && (<Col xl={6} lg={6} md={6} sm={6}>
            <div style={{ padding: 2, background: "#E0ECF5", borderRadius: 6 }}>
              {false && (<div className="bg-body-secondary p-3">
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={index}
                    message={msg}
                    isUser={msg.isUser}
                    Msg={msg.comp}
                    data={msg}
                  />
                ))}
              </div>)}

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
                                  Whether Building plan is as per norms?
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
            </div>
          </Col>)}
        </Row>
      ))}


      <Modal show={showXlModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title as="h6">Review Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This section is to guide Desktop Assessor in Desktop Assessment. This
          will act as guide to him. DGT admin can provide sample documents also.
        </Modal.Body>
      </Modal>
    </>
  );
};

export const AssessorRemarkHistory = ({ title }) => {
  return (
    <Card className="custom-card">
      {/* <Card.Header>
        <label
          className="main-content-label my-auto"
          style={{ textTransform: "none" }}
        >
          Assessor Comments
        </label>
        <div className="ms-auto  d-flex">20th April 2025:10:20PM</div>
      </Card.Header> */}
      <Card.Body>
        <Row className="mb-3">
          <Form.Label>
            <b>Whether {title ? title : "Document"} is as per norms?:</b>{" "}
            <u>
              <span>No</span>
            </u>
          </Form.Label>
          <Form.Label>
            <b>Reason:</b>{" "}
            <u>
              <span>Document is Irrelavent</span>
            </u>
          </Form.Label>
          <Form.Label>
            <b>Remark:</b>{" "}
            <u>
              <span>Not Ok</span>
            </u>
          </Form.Label>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <div className="text-gray-7">20th April 2025 10:00AM</div>
      </Card.Footer>
    </Card>
  );
};
export const ItiRemarkHistory = () => {
  const childWindowRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(
    "https://nimionlineadmission.in/iti/downloads/Format-%202%20Resolution%20for%20Establishment%20of%20New%20Industrial%20Training%20Institute.pdf"
  );

  const viewSampleDocument = () => {
    if (childWindowRef.current && !childWindowRef.current.closed) {
      childWindowRef.current.focus();
      return;
    }

    const newWindow = window.open("", "", "width=400,height=400");
    if (!newWindow) {
      alert("Popup blocked.");
      return;
    }

    newWindow.document.title = "Sample Document";

    const container = newWindow.document.createElement("div");
    newWindow.document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);

    root.render(
      <embed src={photoURL} type="application/pdf" width="100%" height="100%" />
      // <img
      //   src={photoURL}
      //   alt="Captured"
      //   style={{ width: "100%", maxWidth: "100%" }}
      // />
    );

    // Optional: Cleanup when the window is closed
    newWindow.addEventListener("beforeunload", () => {
      root.unmount();
    });

    childWindowRef.current = newWindow;
  };

  return (
    <Card className="custom-card shadow border-info">
      <Card.Body>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>
              <b>Remark:</b> <span>Document Uploaded</span>
            </Form.Label>
          </Col>
          <Col md={12}>
            {" "}
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewSampleDocument}
            >
              View Document
            </button>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <div className="text-gray-7">20th April 2025 10:00AM</div>
      </Card.Footer>
    </Card>
  );
};

