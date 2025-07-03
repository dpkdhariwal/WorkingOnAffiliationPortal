import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { Table, Modal } from "react-bootstrap";

import { ChatMessage } from "../../Assessment/ReviewTrail";

export const Assessment_view_Details_of_Land = () => {
  const [isHidden, setisHidden] = useState([true]);

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  //Custom Validation
  const stageI1_info = useSelector((state) => state.theme.new_registration);
  // useEffect(() => { console.log("stageI1_info", stageI1_info); }, []);

  const handleExternalSubmit = () => {
    if (formRef2.current) {
      console.log(formRef2.current);
      formRef2.current.requestSubmit(); // Better than .submit() — triggers onSubmit properly
    }
  };

  const navigate = useNavigate();
  // const updateQuery = () => { navigate("?stage=1&form_id=Basic Details of Applicant  Organization"); };

  const gotoNext = () => {
    console.log("gotoNext called");
    navigate("?stage=1&form_id=Details of the Proposed Institute");
  };

  return (
    <Fragment>
      <Formik
        validationSchema={yup.object().shape({
          category: yup.string().required("Please select a category"),
          Is_the_applicant_running_any_other_iti: yup
            .string()
            .required("Please select if applicant is running any other ITI"),
        })}
        validateOnChange={() => console.log("validateOnChange")}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          setisHidden(false); // Show "Next" button after submission
          let timerInterval;
          Swal.fire({
            title: "Saving on Local Storage",
            html: "Please wait...",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer()?.querySelector("b");
              if (b) {
                timerInterval = setInterval(() => {
                  const remainingTime = Swal.getTimerLeft();
                  if (remainingTime) {
                    b.textContent = remainingTime.toString();
                  }
                }, 100);
              }
              dispatch({ type: "set_comp_stateI_III", payload: values });
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          })
            .then((result) => {
              // throw new Error("Error saving to local storage");
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                // Do something when the timer expires
              }
              navigate(
                "?stage=1&form_id=Basic Details of Applicant  Organization"
              );
            })
            .catch((error) => {
              console.error("Error saving to local storage:", error);
            });
        }}
        initialValues={{
          category: "",
          Is_the_applicant_running_any_other_iti: "yes",
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Card className="custom-card shadow">
            <Card.Header>
              <div className="card-title" style={{ textTransform: "none" }}>
                <h4>Details of Land</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Form ref={formRef2} onSubmit={handleSubmit} validated>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>
                      Possession of Land<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label="Owned "
                        name="possession_of_land"
                        value="owned "
                        onChange={handleChange}
                        // checked={
                        //   values.Is_the_applicant_running_any_other_iti ===
                        //   "yes"
                        // }
                        // isInvalid={
                        //   touched.Is_the_applicant_running_any_other_iti &&
                        //   !!errors.Is_the_applicant_running_any_other_iti
                        // }
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="Leased"
                        name="possession_of_land"
                        value="leased"
                        onChange={handleChange}
                        // checked={
                        //   values.Is_the_applicant_running_any_other_iti === "no"
                        // }
                        // isInvalid={
                        //   touched.Is_the_applicant_running_any_other_iti &&
                        //   !!errors.Is_the_applicant_running_any_other_iti
                        // }
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.Is_the_applicant_running_any_other_iti}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Col md="12">
                    <Card className="border border-info custom-card">
                      <Card.Header>
                        <div
                          className="card-title"
                          style={{ textTransform: "none" }}
                        >
                          Owned Land
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Land Owner’s Name
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Land Owner’s Name"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Land Registration Number
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Land Registration Number"
                              name="block_or_tehsil_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md="12">
                    <Card className="border border-info custom-card">
                      <Card.Header>
                        <div
                          className="card-title"
                          style={{ textTransform: "none" }}
                        >
                          Leased Land
                          <div>
                            <p style={{ "font-weight": "400" }}>
                              (For leased land, the lease deed should be
                              registered between the lessor and lessee for a
                              minimum period of six years from the date of the
                              application.)
                            </p>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Name of Lessor
                              <span style={{ color: "red" }}>
                                *{" "}
                                <i
                                  className="fe fe-help-circle"
                                  style={{
                                    cursor: "pointer",
                                    color: "#6c757d",
                                  }}
                                  title="The lessor is the person or party who owns an asset or property and grants the right to use it to another party under a lease agreement."
                                  onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                ></i>
                              </span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter Name of Lessor"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Name of Lessee
                              <span style={{ color: "red" }}>
                                *
                                <i
                                  className="fe fe-help-circle"
                                  style={{
                                    cursor: "pointer",
                                    color: "#6c757d",
                                  }}
                                  title="The lessee is the person or party who receives the right to use an asset or property from the lessor in exchange for payment, usually called rent, as per the term and condition defined in a lease agreement."
                                  onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                ></i>
                              </span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter Name of Lessee"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Lease Deed Numbe
                              <span style={{ color: "red" }}>
                                *
                                <i
                                  className="fe fe-help-circle"
                                  style={{
                                    cursor: "pointer",
                                    color: "#6c757d",
                                  }}
                                  title=" It refers to the official registration or reference number assigned by
the registering authority to a lease deed, serving as proof of the legal validity and record
of the lease agreement between the property owner and the lessee."
                                  onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                ></i>
                              </span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Lease Deed Number"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Date of Commencement
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="date"
                              placeholder="Date of Commencement"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom03"
                          >
                            <Form.Label>
                              Date of Expiry
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="date"
                              placeholder="Date of Commencement"
                              name="town_or_city_of_other_iti"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>
                      Land Area (In Square Metres)
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Land Area (in Square Metres)"
                        name="land_area_in_square_metres"
                      />
                      <Button variant="outline-secondary">
                        In Square Metres
                      </Button>
                    </InputGroup>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};



export const Assessment_Details_of_Land = () => {
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

  return (
    <>
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
          <Assessment_view_Details_of_Land/>
        </Col>
        {true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div style={{ padding: 2, background: "#E0ECF5", borderRadius: 6 }}>
            <div className="bg-body-secondary p-3">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg}
                  isUser={msg.isUser}
                  Msg={msg.comp}
                  data={msg}
                />
              ))}
            </div>

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

export default Assessment_view_Details_of_Land;
