import { Fragment, useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Table, Modal
} from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";
import * as yup from "yup";
import * as formik from "formik";
import Select from "react-select";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import ReqSign from "../comp/requiredSign";


const schema = yup.object().shape({
  land_documents: yup.array().of(
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

const ElectricityConnectionDetails = () => {
  const stage = useSelector((state) => state.reg.stepsII);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(stage);
  }, []);

  // const initialLandDocs = stage.stage_I.land_documents || [];
  // const lease_deed_document = stage.stage_I.lease_docs || [];

  const languages = [
    "",
    "Hindi",
    "English",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Kannada",
    "Odia",
    "Malayalam",
    "Punjabi",
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
        initialValues={
          {
            // land_documents: initialLandDocs,
            // lease_deed_document: lease_deed_document,
          }
        }
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
                  Electricity Connection Details
                </div>
              </Card.Header>
              <Card.Body>
                <Row style={{ marginTop: "1rem" }}>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>
                        Consumer Name
                        <ReqSign />
                      </Form.Label>
                      <Field
                        name="land_use_documents"
                        as={Form.Control}
                        placeholder="Electricity Consumer Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Error
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>
                        Consumer Number
                        <ReqSign />
                      </Form.Label>
                      <Field
                        name="land_use_documents"
                        as={Form.Control}
                        placeholder="Electricity Consumer Number"
                      />
                      <Form.Control.Feedback type="invalid">
                        Error
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>
                        Electricity Authority Name
                        <ReqSign />
                      </Form.Label>
                      <Field
                        name="land_use_documents"
                        as={Form.Control}
                        placeholder="Ex. Jaipur Vidyut Vitran Nigam Limited"
                      />
                      <Form.Control.Feedback type="invalid">
                        Error
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>
                        Electricity Authority Website
                        <ReqSign />
                      </Form.Label>
                      <Field
                        name="land_use_documents"
                        as={Form.Control}
                        placeholder="Ex. https://www.bijlimitra.com/"
                      />
                      <Form.Control.Feedback type="invalid">
                        Error
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="validationCustom02">
                      <Form.Label>
                        Total Available/Sanction Load (in KW)
                        <ReqSign />
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Total Available/Sanction load (in KW)"
                          name="land_area_in_square_metres"
                        />
                        <Button variant="outline-secondary">In KW</Button>
                      </InputGroup>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        Latest Electricity Bill / Meter Sealing Report (for new
                        institute if bill is not available )<ReqSign />
                      </Form.Label>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Control type="file" />
                        <Button variant="primary">Upload</Button>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Select Document
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="invoice-notes text-danger">
                      <p>
                        <ul>
                          <li>Upload Geo tagged photo of electricity meter</li>
                        </ul>
                      </p>
                    </div>
                  </Col>
                </Row>
                <Card className="custom-card border border-primary">
                  <Card.Header>
                    <div
                      className="card-title"
                      style={{ textTransform: "none" }}
                    >
                      Backup Power Supply
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            Photo of Backup Power
                            <ReqSign />
                          </Form.Label>
                          <div className="d-flex align-items-center gap-2">
                            <Form.Control type="file" />
                            <Button variant="primary">Upload</Button>
                          </div>
                          <Form.Control.Feedback type="invalid">
                            Select Document
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className="invoice-notes text-danger">
                          <p>
                            <ul>
                              <li>Upload Geo tagged photo</li>
                            </ul>
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            Purchase Related Documents
                            <ReqSign />
                          </Form.Label>
                          <div className="d-flex align-items-center gap-2">
                            <Form.Control type="file" />
                            <Button variant="primary">Upload</Button>
                          </div>
                          <Form.Control.Feedback type="invalid">
                            Select Document
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        Fire and Safety Certificate
                        <ReqSign />
                      </Form.Label>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Control type="file" />
                        <Button variant="primary">Upload</Button>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Select Document
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};
export default ElectricityConnectionDetails;




export const ElectricityConnectionDetailsView = (props) => {
  return (

    <Card className="custom-card shadow border-info">
      <Card.Header>
        <div className="card-title" style={{ textTransform: "none" }}>
          <h5> {props.label}</h5>
        </div>
      </Card.Header>
      <Card.Body>
        <Table className="table-striped table-hover" style={{ textAlign: "start" }}>
      <thead>
        <tr>
          <th scope="col">Particular</th>
          <th>:</th>
          <th scope="col">Filled By Applicant</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Consumer Name</th>
          <th>:</th>
          <td>XYZ</td>
        </tr>
        <tr>
          <th scope="row">Consumer Number</th>
          <th>:</th>
          <td>12VSADDDAA01</td>
        </tr>

        <tr>
          <th scope="row">Electricity Authority Name</th>
          <th>:</th>
          <td>XYZ</td>
        </tr>

        <tr>
          <th scope="row">Total Available/Sanction Load (in KW)</th>
          <th>:</th>
          <td>XYZ</td>
        </tr>
        <tr>
          <th scope="row">Latest Electricity Bill / Meter Sealing Report</th>
          <th>:</th>
          <td>
            <Button variant="primary">View Document</Button>
          </td>
        </tr>
      </tbody>
    </Table>
 </Card.Body>
      {/* <Card.Footer>
                      <Button>dsfdf</Button>
                    </Card.Footer> */}
    </Card>
    
  );
};
export const ElectricityConnectionDetailsAction = () => {
  const [reviewState, setReviewState] = useState("Reviewed"); // Given || Awaiting for Review || Reviewed
  const MaxData = [
    { value: "1", label: "Electricity Connection is not in the name of applicant institute" },
    { value: "2", label: "Supply does not have 3-phase commercial connection" },
    { value: "3", label: "Total sanction load is less than the total required load" },
    {
      value: "4",
      label:
        "Electricity Bill/Meter Sealing report is not legible",
    },
    {
      value: "5",
      label:
        "Document uploaded is irrelevant",
    },
    {
      value: "6",
      label: "Document lacks required information",
    },
    { value: "7", label: "Any other reason, please specify" },
  ];

  const [isHidden, setisHidden] = useState([true]);

  const [lable, setLabel] = useState("Electricity Connection Details");


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
          <div>
            <ElectricityConnectionDetailsView label={lable} />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6}>
          {/* <div className="p-3">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} isUser={msg.isUser} />
            ))}
          </div> */}

          <div className="trails">
            <Card className="custom-card shadow border-info">
              <Card.Header>
                <label
                  className="main-content-label my-auto"
                  style={{ textTransform: "none" }}
                >
                  Assessor Comments
                </label>
                <div className="ms-auto  d-flex">20th April 2025:10:20PM</div>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Label>
                    <b>Whether {lable} is as per norms?:</b>{" "}
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
            </Card>
            <Card className="custom-card shadow border-info">
              <Card.Header>
                <label
                  className="main-content-label my-auto"
                  style={{ textTransform: "none" }}
                >
                  ITI Applicant Comments
                </label>
                <div className="ms-auto  d-flex">25th April 2025:10:20PM</div>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Label>
                    <b>Remark:</b> <span>Document Uploaded</span>
                  </Form.Label>
                </Row>
              </Card.Body>
            </Card>
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
                  <Card className="custom-card shadow border-info bg-body-secondary">
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
                          className="rounded-pill btn-wave btn-success-gradient"
                          variant="success"
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
                              Whether {lable} is as per norms?
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
                                  touched.as_per_norms && !!errors.as_per_norms
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
                                  touched.as_per_norms && !!errors.as_per_norms
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
                                Select the Reason(s) and Raise Non-Conformities
                                (NC)
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
                                className={`form-control ${
                                  touched.assessor_comments &&
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
              <Card className="custom-card shadow border-info bg-success-gradient">
                <Card.Header>
                  <label
                    className="main-content-label my-auto"
                    style={{ textTransform: "none" }}
                  >
                    Assessor Comments
                  </label>
                  <div className="ms-auto  d-flex">25th April 2025:10:20PM</div>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Form.Label>
                      <b>Remark:</b> <span>Document Uploaded</span>
                    </Form.Label>
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

                  <Button variant="primary">Submit</Button>
                </Card.Footer>
              </Card>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </Col>
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



    // <Formik
    //   validationSchema={yup.object().shape({
    //     category: yup.string().required("Please select a category"),
    //     Is_the_applicant_running_any_other_iti: yup
    //       .string()
    //       .required("Please select if applicant is running any other ITI"),
    //   })}
    //   validateOnChange={() => console.log("validateOnChange")}
    //   onSubmit={(values) => {
    //     console.log("Form submitted with values:", values);
    //     setisHidden(false); // Show "Next" button after submission
    //     let timerInterval;
    //     Swal.fire({
    //       title: "Saving on Local Storage",
    //       html: "Please wait...",
    //       timer: 2000,
    //       timerProgressBar: true,
    //       didOpen: () => {
    //         Swal.showLoading();
    //         const b = Swal.getHtmlContainer()?.querySelector("b");
    //         if (b) {
    //           timerInterval = setInterval(() => {
    //             const remainingTime = Swal.getTimerLeft();
    //             if (remainingTime) {
    //               b.textContent = remainingTime.toString();
    //             }
    //           }, 100);
    //         }
    //         dispatch({ type: "set_comp_stateI_III", payload: values });
    //       },
    //       willClose: () => {
    //         clearInterval(timerInterval);
    //       },
    //     })
    //       .then((result) => {})
    //       .catch((error) => {
    //         console.error("Error saving to local storage:", error);
    //       });
    //   }}
    //   initialValues={{
    //     category: "",
    //     Is_the_applicant_running_any_other_iti: "no",
    //   }}
    // >
    //   {({ handleSubmit, handleChange, values, errors, touched }) => (
    //     <Card className="custom-card shadow border-info">
    //       {/* <Card.Header>
    //         <div className="card-title" style={{ textTransform: "none" }}>
    //           Basic Details of Applicant Entity
    //         </div>
    //       </Card.Header> */}
    //       <Card.Body>
    //         <Form ref={formRef2} onSubmit={handleSubmit} validated>
    //           <Row className="mb-3">
    //             <Form.Group>
    //               <Form.Label>
    //                 Whether Electricity Connection is as per norms?
    //                 <span style={{ color: "red" }}>*</span>
    //               </Form.Label>
    //               <div>
    //                 <Form.Check
    //                   inline
    //                   type="radio"
    //                   label="Yes"
    //                   name="Is_the_applicant_running_any_other_iti"
    //                   value="yes"
    //                   onChange={handleChange}
    //                   checked={
    //                     values.Is_the_applicant_running_any_other_iti === "yes"
    //                   }
    //                   isInvalid={
    //                     touched.Is_the_applicant_running_any_other_iti &&
    //                     !!errors.Is_the_applicant_running_any_other_iti
    //                   }
    //                 />
    //                 <Form.Check
    //                   inline
    //                   type="radio"
    //                   label="No"
    //                   name="Is_the_applicant_running_any_other_iti"
    //                   value="no"
    //                   onChange={handleChange}
    //                   checked={
    //                     values.Is_the_applicant_running_any_other_iti === "no"
    //                   }
    //                   isInvalid={
    //                     touched.Is_the_applicant_running_any_other_iti &&
    //                     !!errors.Is_the_applicant_running_any_other_iti
    //                   }
    //                 />
    //               </div>

    //               <Form.Control.Feedback type="invalid">
    //                 {errors.category}
    //               </Form.Control.Feedback>
    //             </Form.Group>
    //           </Row>
    //           {values.Is_the_applicant_running_any_other_iti === "no" && (
    //             <Row className="mb-3">
    //               <Form.Group as={Col} md="12" controlId="validationCustom02">
    //                 <Form.Label>
    //                   Select the Reason(s) and Raise Non-Conformities (NC)
    //                   <span style={{ color: "red" }}>*</span>
    //                 </Form.Label>
    //                 <Select
    //                   defaultValue=""
    //                   isMulti
    //                   options={MaxData}
    //                   classNamePrefix="Select2"
    //                 />
    //                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    //               </Form.Group>

    //               <Form.Group
    //                 as={Col}
    //                 md="12"
    //                 controlId="text-area"
    //                 style={{ marginTop: "1rem" }}
    //               >
    //                 <Form.Label>
    //                   Any other reason, please specify{" "}
    //                   <span style={{ color: "red" }}>*</span>
    //                 </Form.Label>
    //                 <Form.Control required as="textarea" rows={3} />
    //               </Form.Group>
    //             </Row>
    //           )}
    //         </Form>
    //       </Card.Body>
    //       {/* <Card.Footer>
    //               <Button>dsfdf</Button>
    //             </Card.Footer> */}
    //     </Card>
    //   )}
    // </Formik>
  );
};


export const BackupPowerSupplyView = (props) => {
  return (

    <Card className="custom-card shadow border-info">
      <Card.Header>
        <div className="card-title" style={{ textTransform: "none" }}>
          <h5> {props.label}</h5>
        </div>
      </Card.Header>
      <Card.Body>
        <Table className="table-striped table-hover" style={{ textAlign: "start" }}>
      <thead>
        <tr>
          <th scope="col">Particular</th>
          <th>:</th>
          <th scope="col">Filled By Applicant</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Photo of Backup Power</th>
          <th>:</th>
          <td>
            <Button variant="primary">View Document</Button>
          </td>
        </tr>
        <tr>
          <th scope="row">Purchase Related Documents</th>
          <th>:</th>
          <td>
            <Button variant="primary">View Document</Button>
          </td>
        </tr>
      </tbody>
    </Table>
 </Card.Body>
      {/* <Card.Footer>
                      <Button>dsfdf</Button>
                    </Card.Footer> */}
    </Card>
    
  );
};
export const BackupPowerSupplyAction = () => {
  const [reviewState, setReviewState] = useState("Reviewed"); // Given || Awaiting for Review || Reviewed
  const MaxData = [
    { value: "1", label: "Electricity Connection is not in the name of applicant institute" },
    { value: "2", label: "Supply does not have 3-phase commercial connection" },
    { value: "3", label: "Total sanction load is less than the total required load" },
    {
      value: "4",
      label:
        "Electricity Bill/Meter Sealing report is not legible",
    },
    {
      value: "5",
      label:
        "Document uploaded is irrelevant",
    },
    {
      value: "6",
      label: "Document lacks required information",
    },
    { value: "7", label: "Any other reason, please specify" },
  ];

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




  const [lable, setLabel] = useState("Backup Power Supply");


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
          <div>
            <BackupPowerSupplyView label={lable} />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6}>
          {/* <div className="p-3">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} isUser={msg.isUser} />
            ))}
          </div> */}

          <div className="trails">
            <Card className="custom-card shadow border-info">
              <Card.Header>
                <label
                  className="main-content-label my-auto"
                  style={{ textTransform: "none" }}
                >
                  Assessor Comments
                </label>
                <div className="ms-auto  d-flex">20th April 2025:10:20PM</div>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Label>
                    <b>Whether {lable} is as per norms?:</b>{" "}
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
            </Card>
            <Card className="custom-card shadow border-info">
              <Card.Header>
                <label
                  className="main-content-label my-auto"
                  style={{ textTransform: "none" }}
                >
                  ITI Applicant Comments
                </label>
                <div className="ms-auto  d-flex">25th April 2025:10:20PM</div>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Label>
                    <b>Remark:</b> <span>Document Uploaded</span>
                  </Form.Label>
                </Row>
              </Card.Body>
            </Card>
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
                  <Card className="custom-card shadow border-info bg-body-secondary">
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
                          className="rounded-pill btn-wave btn-success-gradient"
                          variant="success"
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
                              Whether {lable} is as per norms?
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
                                  touched.as_per_norms && !!errors.as_per_norms
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
                                  touched.as_per_norms && !!errors.as_per_norms
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
                                Select the Reason(s) and Raise Non-Conformities
                                (NC)
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
                                className={`form-control ${
                                  touched.assessor_comments &&
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
              <Card className="custom-card shadow border-info bg-success-gradient">
                <Card.Header>
                  <label
                    className="main-content-label my-auto"
                    style={{ textTransform: "none" }}
                  >
                    Assessor Comments
                  </label>
                  <div className="ms-auto  d-flex">25th April 2025:10:20PM</div>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Form.Label>
                      <b>Remark:</b> <span>Document Uploaded</span>
                    </Form.Label>
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

                  <Button variant="primary">Submit</Button>
                </Card.Footer>
              </Card>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </Col>
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

    // <Formik
    //   validationSchema={yup.object().shape({
    //     category: yup.string().required("Please select a category"),
    //     Is_the_applicant_running_any_other_iti: yup
    //       .string()
    //       .required("Please select if applicant is running any other ITI"),
    //   })}
    //   validateOnChange={() => console.log("validateOnChange")}
    //   onSubmit={(values) => {
    //     console.log("Form submitted with values:", values);
    //     setisHidden(false); // Show "Next" button after submission
    //     let timerInterval;
    //     Swal.fire({
    //       title: "Saving on Local Storage",
    //       html: "Please wait...",
    //       timer: 2000,
    //       timerProgressBar: true,
    //       didOpen: () => {
    //         Swal.showLoading();
    //         const b = Swal.getHtmlContainer()?.querySelector("b");
    //         if (b) {
    //           timerInterval = setInterval(() => {
    //             const remainingTime = Swal.getTimerLeft();
    //             if (remainingTime) {
    //               b.textContent = remainingTime.toString();
    //             }
    //           }, 100);
    //         }
    //         dispatch({ type: "set_comp_stateI_III", payload: values });
    //       },
    //       willClose: () => {
    //         clearInterval(timerInterval);
    //       },
    //     })
    //       .then((result) => {})
    //       .catch((error) => {
    //         console.error("Error saving to local storage:", error);
    //       });
    //   }}
    //   initialValues={{
    //     category: "",
    //     Is_the_applicant_running_any_other_iti: "no",
    //   }}
    // >
    //   {({ handleSubmit, handleChange, values, errors, touched }) => (
    //     <Card className="custom-card shadow border-info">
    //       {/* <Card.Header>
    //         <div className="card-title" style={{ textTransform: "none" }}>
    //           Basic Details of Applicant Entity
    //         </div>
    //       </Card.Header> */}
    //       <Card.Body>
    //         <Form ref={formRef2} onSubmit={handleSubmit} validated>
    //           <Row className="mb-3">
    //             <Form.Group>
    //               <Form.Label>
    //                 Whether Backup Supply available as per norms?
    //                 <span style={{ color: "red" }}>*</span>
    //               </Form.Label>
    //               <div>
    //                 <Form.Check
    //                   inline
    //                   type="radio"
    //                   label="Yes"
    //                   name="Is_the_applicant_running_any_other_iti"
    //                   value="yes"
    //                   onChange={handleChange}
    //                   checked={
    //                     values.Is_the_applicant_running_any_other_iti === "yes"
    //                   }
    //                   isInvalid={
    //                     touched.Is_the_applicant_running_any_other_iti &&
    //                     !!errors.Is_the_applicant_running_any_other_iti
    //                   }
    //                 />
    //                 <Form.Check
    //                   inline
    //                   type="radio"
    //                   label="No"
    //                   name="Is_the_applicant_running_any_other_iti"
    //                   value="no"
    //                   onChange={handleChange}
    //                   checked={
    //                     values.Is_the_applicant_running_any_other_iti === "no"
    //                   }
    //                   isInvalid={
    //                     touched.Is_the_applicant_running_any_other_iti &&
    //                     !!errors.Is_the_applicant_running_any_other_iti
    //                   }
    //                 />
    //               </div>

    //               <Form.Control.Feedback type="invalid">
    //                 {errors.category}
    //               </Form.Control.Feedback>
    //             </Form.Group>
    //           </Row>
    //           {/* {values.Is_the_applicant_running_any_other_iti === "yes" && (
    //             <Row className="mb-3">
    //               <Form.Group as={Col} md="12" controlId="validationCustom02">
    //                 <Form.Label>
    //                   Select the Reason(s) and Raise Non-Conformities (NC)
    //                   <span style={{ color: "red" }}>*</span>
    //                 </Form.Label>
    //                 <Select
    //                   defaultValue=""
    //                   isMulti
    //                   options={MaxData}
    //                   classNamePrefix="Select2"
    //                 />
    //                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    //               </Form.Group>

    //               <Form.Group
    //                 as={Col}
    //                 md="12"
    //                 controlId="text-area"
    //                 style={{ marginTop: "1rem" }}
    //               >
    //                 <Form.Label>
    //                   Any other reason, please specify{" "}
    //                   <span style={{ color: "red" }}>*</span>
    //                 </Form.Label>
    //                 <Form.Control required as="textarea" rows={3} />
    //               </Form.Group>
    //             </Row>
    //           )} */}
    //         </Form>
    //       </Card.Body>
    //       {/* <Card.Footer>
    //               <Button>dsfdf</Button>
    //             </Card.Footer> */}
    //     </Card>
    //   )}
    // </Formik>
  );
};



export const FireAndSafetyCertificateView = (props) => {
  return (

     <Card className="custom-card shadow border-info">
      <Card.Header>
        <div className="card-title" style={{ textTransform: "none" }}>
          <h5> {props.label}</h5>
        </div>
      </Card.Header>
      <Card.Body>
        <Table className="table-striped table-hover" style={{ textAlign: "start" }}>
      <thead>
        <tr>
          <th scope="col">Particular</th>
          <th>:</th>
          <th scope="col">Filled By Applicant</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Fire and Safety Certificate</th>
          <th>:</th>
          <td>
            <Button variant="primary">View Document</Button>
          </td>
        </tr>
      </tbody>
    </Table>
</Card.Body>
      {/* <Card.Footer>
                      <Button>dsfdf</Button>
                    </Card.Footer> */}
    </Card>
    
  );
};
export const FireAndSafetyCertificateAction  = () => {
  const [reviewState, setReviewState] = useState("Reviewed"); // Given || Awaiting for Review || Reviewed
  const MaxData = [
    { value: "1", label: "Document is not legible" },
    { value: "2", label: "Document is irrelevant" },
    { value: "3", label: "Address on the document does not match with the proposed land/ building address" },
    {
      value: "4",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value: "5",
      label:
        "Validity of fire safety certificate is expired",
    },
    {
      value: "6",
      label: "Any other reason, please specify",
    },
  ];






 


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


  const [lable, setLabel] = useState("Fire and Safety Certificate");


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
          <div>
            <FireAndSafetyCertificateView label={lable} />
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6}>
          {/* <div className="p-3">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} isUser={msg.isUser} />
            ))}
          </div> */}

          <div className="trails">
            <Card className="custom-card shadow border-info">
              <Card.Header>
                <label
                  className="main-content-label my-auto"
                  style={{ textTransform: "none" }}
                >
                  Assessor Comments
                </label>
                <div className="ms-auto  d-flex">20th April 2025:10:20PM</div>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Label>
                    <b>Whether {lable} is as per norms?:</b>{" "}
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
            </Card>
            <Card className="custom-card shadow border-info">
              <Card.Header>
                <label
                  className="main-content-label my-auto"
                  style={{ textTransform: "none" }}
                >
                  ITI Applicant Comments
                </label>
                <div className="ms-auto  d-flex">25th April 2025:10:20PM</div>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Form.Label>
                    <b>Remark:</b> <span>Document Uploaded</span>
                  </Form.Label>
                </Row>
              </Card.Body>
            </Card>
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
                  <Card className="custom-card shadow border-info bg-body-secondary">
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
                          className="rounded-pill btn-wave btn-success-gradient"
                          variant="success"
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
                              Whether {lable} is as per norms?
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
                                  touched.as_per_norms && !!errors.as_per_norms
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
                                  touched.as_per_norms && !!errors.as_per_norms
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
                                Select the Reason(s) and Raise Non-Conformities
                                (NC)
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
                                className={`form-control ${
                                  touched.assessor_comments &&
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
              <Card className="custom-card shadow border-info bg-success-gradient">
                <Card.Header>
                  <label
                    className="main-content-label my-auto"
                    style={{ textTransform: "none" }}
                  >
                    Assessor Comments
                  </label>
                  <div className="ms-auto  d-flex">25th April 2025:10:20PM</div>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Form.Label>
                      <b>Remark:</b> <span>Document Uploaded</span>
                    </Form.Label>
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

                  <Button variant="primary">Submit</Button>
                </Card.Footer>
              </Card>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </Col>
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


    // <Formik
    //   validationSchema={yup.object().shape({
    //     category: yup.string().required("Please select a category"),
    //     Is_the_applicant_running_any_other_iti: yup
    //       .string()
    //       .required("Please select if applicant is running any other ITI"),
    //   })}
    //   validateOnChange={() => console.log("validateOnChange")}
    //   onSubmit={(values) => {
    //     console.log("Form submitted with values:", values);
    //     setisHidden(false); // Show "Next" button after submission
    //     let timerInterval;
    //     Swal.fire({
    //       title: "Saving on Local Storage",
    //       html: "Please wait...",
    //       timer: 2000,
    //       timerProgressBar: true,
    //       didOpen: () => {
    //         Swal.showLoading();
    //         const b = Swal.getHtmlContainer()?.querySelector("b");
    //         if (b) {
    //           timerInterval = setInterval(() => {
    //             const remainingTime = Swal.getTimerLeft();
    //             if (remainingTime) {
    //               b.textContent = remainingTime.toString();
    //             }
    //           }, 100);
    //         }
    //         dispatch({ type: "set_comp_stateI_III", payload: values });
    //       },
    //       willClose: () => {
    //         clearInterval(timerInterval);
    //       },
    //     })
    //       .then((result) => {})
    //       .catch((error) => {
    //         console.error("Error saving to local storage:", error);
    //       });
    //   }}
    //   initialValues={{
    //     category: "",
    //     Is_the_applicant_running_any_other_iti: "no",
    //   }}
    // >
    //   {({ handleSubmit, handleChange, values, errors, touched }) => (
    //     <Card className="custom-card shadow border-info">
    //       {/* <Card.Header>
    //         <div className="card-title" style={{ textTransform: "none" }}>
    //           Basic Details of Applicant Entity
    //         </div>
    //       </Card.Header> */}
    //       <Card.Body>
    //         <Form ref={formRef2} onSubmit={handleSubmit} validated>
    //           <Row className="mb-3">
    //             <Form.Group>
    //               <Form.Label>
    //                 Whether Fire Safety Certificate is as per norms?
    //                 <span style={{ color: "red" }}>*</span>
    //               </Form.Label>
    //               <div>
    //                 <Form.Check
    //                   inline
    //                   type="radio"
    //                   label="Yes"
    //                   name="Is_the_applicant_running_any_other_iti"
    //                   value="yes"
    //                   onChange={handleChange}
    //                   checked={
    //                     values.Is_the_applicant_running_any_other_iti === "yes"
    //                   }
    //                   isInvalid={
    //                     touched.Is_the_applicant_running_any_other_iti &&
    //                     !!errors.Is_the_applicant_running_any_other_iti
    //                   }
    //                 />
    //                 <Form.Check
    //                   inline
    //                   type="radio"
    //                   label="No"
    //                   name="Is_the_applicant_running_any_other_iti"
    //                   value="no"
    //                   onChange={handleChange}
    //                   checked={
    //                     values.Is_the_applicant_running_any_other_iti === "no"
    //                   }
    //                   isInvalid={
    //                     touched.Is_the_applicant_running_any_other_iti &&
    //                     !!errors.Is_the_applicant_running_any_other_iti
    //                   }
    //                 />
    //               </div>

    //               <Form.Control.Feedback type="invalid">
    //                 {errors.category}
    //               </Form.Control.Feedback>
    //             </Form.Group>
    //           </Row>
    //           {values.Is_the_applicant_running_any_other_iti === "no" && (
    //             <Row className="mb-3">
    //               <Form.Group as={Col} md="12" controlId="validationCustom02">
    //                 <Form.Label>
    //                   Select the Reason(s) and Raise Non-Conformities (NC)
    //                   <span style={{ color: "red" }}>*</span>
    //                 </Form.Label>
    //                 <Select
    //                   defaultValue=""
    //                   isMulti
    //                   options={MaxData}
    //                   classNamePrefix="Select2"
    //                 />
    //                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    //               </Form.Group>

    //               <Form.Group
    //                 as={Col}
    //                 md="12"
    //                 controlId="text-area"
    //                 style={{ marginTop: "1rem" }}
    //               >
    //                 <Form.Label>
    //                   Any other reason, please specify{" "}
    //                   <span style={{ color: "red" }}>*</span>
    //                 </Form.Label>
    //                 <Form.Control required as="textarea" rows={3} />
    //               </Form.Group>
    //             </Row>
    //           )}
    //         </Form>
    //       </Card.Body>
    //       {/* <Card.Footer>
    //               <Button>dsfdf</Button>
    //             </Card.Footer> */}
    //     </Card>
    //   )}
    // </Formik>
  );
};