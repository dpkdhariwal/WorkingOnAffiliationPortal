import { Modal, Row, Col, Card, Form, InputGroup, Button, Table, Form as BForm } from "react-bootstrap";

import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"

import Pageheader from "../../layouts/Pageheader";
import { Stepper, Step } from "react-form-stepper";

import { Assessment_Basic_Detail } from "./form/stegeI/BasicDetailsofApplicantOrganization";

import { Name_of_the_institute } from "./form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/name_of_the_institute";

import { AddressOfInstitute } from "./form/stegeI/view/stage_1/detail_of_proposed_institute/view/Address_of_Institute";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import ReqSign from "./form/comp/requiredSign"; // Make sure this component exists and is exported correctly
// import {, OverlayTrigger, Popover, Row, Tooltip } from 'react-bootstrap';
import { v4 as uuidv4 } from "uuid";

import {STAFF_DETAILS} from "../../constants";

import { useContext } from "react";
import * as formik from "formik";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {setAppFlow} from "../../db/users";

export const AddStaffDetail = () => {
  const reg = useSelector((state) => state.reg);
  const [activeStep, setActiveStep] = useState(reg.steps[0]);

  const AppliInfo = useSelector((state) => state.AppliInfo);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    console.log(activeStep);
  }, [reg]);

  const goToSection = (step, index = null) => {
    setActiveStep(step);
  };


  const confirm = () => {
    console.log("COnfirm");
  }


  return (
    <Fragment>
      <Pageheader
        mainheading={`Add Staff Information`}
        parentfolder="Dashboard"
        activepage="Add Staff Information"
      />
      <Card className="custom-card shadow">
        <Card.Header>
          <div className="card-title" style={{ textTransform: "none" }}>
            Staff Detail
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md="12">
              <Card className="border border-info custom-card" style={{backgroundColor:"antiquewhite"}}>
                <Card.Header>
                  <div
                    className="card-title"
                    style={{ textTransform: "none" }}
                  >
                    Add Principal Detail
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      md={4}
                      controlId="validationCustom02"
                    >
                      <Form.Label>
                        Designation<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        required
                        name="cmp_post_state"
                        isInvalid={true}

                      >
                        <option value="" selected>
                          Principal
                        </option>
                      </Form.Control>

                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md={4}
                      controlId="validationCustom02"
                    >
                      <Form.Label>
                        Principal Name
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Block/Tehsil"
                        name="cmp_post_block_or_tehsil"
                        isInvalid={true}
                      />

                    </Form.Group>


                    <Form.Group
                      as={Col}
                      md={4}
                      controlId="validationCustom02"
                    >
                      <Form.Label>
                        Qualification<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        required
                        name="cmp_post_state"
                        isInvalid={true}

                      >
                        <option value="" selected>
                          Principal
                        </option>
                      </Form.Control>


                    </Form.Group>

                    <Form.Group as={Col} md={4}
                      controlId="validationCustom02">
                      <Form.Label>
                        Qualification Year<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        required
                        name="qualification_year"
                        min="1950"
                        max={new Date().getFullYear()}
                        placeholder="Select year"
                        isInvalid={true}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom03">
                      <Form.Label>
                        Qualification Month<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        required
                        name="qualification_month"
                        isInvalid={true}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select month
                        </option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </Form.Control>
                    </Form.Group>

                    <Col md={12} style={{ marginTop: "10px" }}>
                      <PrincipalDocuments style={{ marginTop: "10px" }} />
                    </Col>

                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <AddOtherStaffDetail />
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between mb-3">
            <Button
              className="p-2"
              variant="warning"
            >
              Go Back
            </Button>

            {/* <Button
              className="p-2"
              variant="success"
              onClick={confirm}
            >
              Generate NOC Now
            </Button> */}
            <ConfirmBox
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export const AddOtherStaffDetail = () => {
  const reg = useSelector((state) => state.reg);
  const [activeStep, setActiveStep] = useState(reg.steps[0]);

  // Manage staff list dynamically
  const [staffList, setStaffList] = useState([
    {
      id: uuidv4(),
      designation: "",
      name: "",
      qualification: "",
      qualificationYear: "",
      qualificationMonth: "",
    },
  ]);

  useEffect(() => {
    console.log(activeStep);
  }, [reg]);

  const handleAddStaff = () => {
    setStaffList([
      ...staffList,
      {
        id: uuidv4(),
        designation: "",
        name: "",
        qualification: "",
        qualificationYear: "",
        qualificationMonth: "",
      },
    ]);
  };

  const handleRemoveStaff = (id) => {
    setStaffList(staffList.filter((staff) => staff.id !== id));
  };

  return (
    <Fragment>
      <Card className="border border-info custom-card card" style={{backgroundColor:"aliceblue"}}>
        <Card.Header>
          <div className="card-title" style={{ textTransform: "none" }}>
            Instructor / Other Staff Detail
          </div>
        </Card.Header>

        <Card.Body>
          {staffList.map((staff, index) => (
            <Row key={staff.id} className="mb-3">
              <Col md="12">
                <Card className="border border-info custom-card">
                  <Card.Body>
                    <Row>
                      <Form.Group as={Col} md={4} controlId={`designation-${staff.id}`}>
                        <Form.Label>
                          Designation<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select" required defaultValue="">
                          <option value="">Select Designation</option>
                          <option value="Principal">Principal</option>
                          <option value="Instructor">Instructor</option>
                          <option value="Clerk">Clerk</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col} md={4} controlId={`name-${staff.id}`}>
                        <Form.Label>
                          Name<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          required
                        />
                      </Form.Group>

                      <Form.Group as={Col} md={4} controlId={`qualification-${staff.id}`}>
                        <Form.Label>
                          Qualification<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select" required defaultValue="">
                          <option value="">Select Qualification</option>
                          <option value="ITI">ITI</option>
                          <option value="Diploma">Diploma</option>
                          <option value="B.Tech">B.Tech</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col} md={4} controlId={`year-${staff.id}`}>
                        <Form.Label>
                          Qualification Year<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          min="1950"
                          max={new Date().getFullYear()}
                          placeholder="Select Year"
                          required
                        />
                      </Form.Group>

                      <Form.Group as={Col} md={3} controlId={`month-${staff.id}`}>
                        <Form.Label>
                          Qualification Month<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control as="select" required defaultValue="">
                          <option value="" disabled>Select Month</option>
                          <option value="01">January</option>
                          <option value="02">February</option>
                          <option value="03">March</option>
                          <option value="04">April</option>
                          <option value="05">May</option>
                          <option value="06">June</option>
                          <option value="07">July</option>
                          <option value="08">August</option>
                          <option value="09">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </Form.Control>
                      </Form.Group>

                      <Col md={12}>
                        <PrincipalDocuments />
                      </Col>

                      <Col md={12} className="text-end mt-2">
                        {staffList.length > 1 && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveStaff(staff.id)}
                          >
                            Remove Staff
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
        </Card.Body>

        <Card.Footer>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="success" size="sm" onClick={handleAddStaff}>
              Add More Staff
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};


export const NocForm = () => {

  return (
    <>
      <table
        width="98%"
        border={1}
        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
        align="center"
        cellPadding="5px"
      >
        <tbody>
          <tr>
            <td colSpan={7} style={{ border: "1px solid black" }}><b>Affiliation Category</b></td>
          </tr>
          <tr>
            <td style={{ colSpan: 2 }}><b>Category:</b> <span>Application from Existing ITIs</span> </td>
            <td><b>Sub Category:</b> <span>Addition of New Trades/Units</span> </td>
          </tr>
        </tbody>
      </table>
      <table
        width="98%"
        border={1}
        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
        align="center"
        cellPadding="5px"
      >
        <tbody>
          <tr>
            <td colSpan={7} style={{ border: "1px solid black" }}><b>Applicant Entity Details</b></td>
          </tr>
          <tr>
            <td style={{ colSpan: 2 }}><b>Category of Applicant Entity:</b> <span>Cat 1</span> </td>
            <td><b>Name of Applicant Entity:</b> <span>Deepak Dhariwal</span> </td>
          </tr>
        </tbody>
      </table>
      <table
        width="98%"
        border={1}
        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
        align="center"
        cellPadding="5px"
      >
        <tbody>
          <tr>
            <td colSpan={7} style={{ border: "1px solid black" }}><b>Address of Applicant Entity</b></td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <th style={{ border: "1px solid black" }}>Applicant Entity State</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity District</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Town/City</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Block/Tehsil</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
          </tr>

          <tr style={{ border: "1px solid black" }}>
            <th style={{ border: "1px solid black" }}>Applicant Entity Sector/Village</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Pincode</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Plot Number/Khasara Number/Gata Number</th>
            <th style={{ border: "1px solid black" }}>Applicant Entity Landmark</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
            <td style={{ border: "1px solid black" }}>value 1</td>
          </tr>

          <tr style={{ border: "1px solid black" }}>
            <th style={{ border: "1px solid black" }} colSpan={2}>Applicant Entity Email Id</th>
            <th style={{ border: "1px solid black" }} colSpan={2}>Applicant Contact Number</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }} colSpan={2}>value 1</td>
            <td style={{ border: "1px solid black" }} colSpan={2}>value 1</td>
          </tr>
        </tbody>
      </table>
    </>
  )

}

export const ShiftUnitIssuingForm = () => {

  // Workshop Information to be filled Start
  const work_shop_info_to_be_filled = [
    {
      tradeId: "tradeId01",
      tradeName: "Fitter",
      Particulars: "Workshop 1",
      Required_Area_As_per_norms: "100sqm",
    },
    {
      tradeId: "tradeId02",
      tradeName: "Fitter",
      Particulars: "Workshop 2",
      Required_Area_As_per_norms: "200sqm",
    },
  ];
  const initialValues = useSelector((state) => state.TradeWiseWorkshopReducer);
  const dispatch = useDispatch();


  const submit = (values) => {
    // dispatch({ type: UPDATE_TRADEWISE_WORKSHOP_DETAILS, payload: values });
  };

  return (
    <Formik
      // initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={(values) => {
        submit(values)
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <FormikForm onSubmit={handleSubmit}>
          <table style={{ width: "98%" }} className="custom-table text-center">
            <thead>
              <tr>
                <th>Trade Name</th>
                <th>Applied in Shift 1</th>
                <th>Issued NOC<ReqSign /></th>
                <th>Applied in Shift 2</th>
                <th>Issued NOC<ReqSign /></th>
                <th>Applied in Shift 3</th>
                <th>Issued NOC<ReqSign /></th>
              </tr>
            </thead>
            <tbody>
              {work_shop_info_to_be_filled.map((item, index) => {
                const fileField = `${item.tradeId}_workshop_${index}`;
                const workshopAreaField = `${item.tradeId}_workshopArea_${index}`;

                return (
                  <tr key={index}>
                    <td>{item.tradeName}</td>
                    <td>1</td>
                    <td>
                      <Field
                        type="number"
                        name={workshopAreaField}
                        as={BForm.Control}
                        isInvalid={true}
                      />
                      <div className="text-danger">
                        <ErrorMessage name={workshopAreaField} />
                      </div>
                    </td>
                    <td>2</td>
                    <td>
                      <Field
                        type="number"
                        name={workshopAreaField}
                        as={BForm.Control}
                        isInvalid={true}


                      />
                      <div className="text-danger">
                        <ErrorMessage name={workshopAreaField} />
                      </div>
                    </td>
                    <td>2</td>
                    <td>
                      <Field
                        type="number"
                        name={workshopAreaField}
                        as={BForm.Control}
                        isInvalid={true}


                      />
                      <div className="text-danger">
                        <ErrorMessage name={workshopAreaField} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </FormikForm>
      )}
    </Formik>
  );
};

const renderOtpInputs = (otpArray, setOtpArray, refs, onComplete) => (
  <div className="d-flex justify-content-start flex-wrap gap-1 mt-2">
    {otpArray.map((val, idx) => (
      <Form.Control
        key={idx}
        type="text"
        maxLength="1"
        value={val}
        className="text-center p-0"
        style={{
          width: "2rem",
          height: "2rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
        }}
        ref={(el) => (refs.current[idx] = el)}
        onChange={(e) => {
          if (!isNaN(e.target.value)) {
            const updatedOtp = [...otpArray];
            updatedOtp[idx] = e.target.value;
            setOtpArray(updatedOtp);
            if (e.target.value && idx < 5) refs.current[idx + 1].focus();
            if (updatedOtp.every((digit) => digit !== "")) onComplete(true);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && otpArray[idx] === "") {
            if (idx > 0) refs.current[idx - 1].focus();
          }
        }}
      />
    ))}
    {otpArray.every((v) => v !== "") && (
      <span style={{ fontSize: "1.25rem", color: "green", marginLeft: "10px" }}>&#10004;</span>
    )}
  </div>
);
const MyVerticallyCenteredModal = (props) => {


  const [emailTimer, setEmailTimer] = useState(0);
  const [mobileTimer, setMobileTimer] = useState(0);

  const [signupEmailTimer, setSignupEmailTimer] = useState(0);
  const [signupMobileTimer, setSignupMobileTimer] = useState(0);

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [emailOtpVisible, setEmailOtpVisible] = useState(false);
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
  const [emailOtpComplete, setEmailOtpComplete] = useState(false);
  const emailOtpRefs = useRef([]);

  const [mobileOtpVisible, setMobileOtpVisible] = useState(false);
  const [mobileOtp, setMobileOtp] = useState(new Array(6).fill(""));
  const [mobileOtpComplete, setMobileOtpComplete] = useState(false);
  const mobileOtpRefs = useRef([]);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupMobile, setSignupMobile] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState("");

  const [signupEmailOtpVisible, setSignupEmailOtpVisible] = useState(false);
  const [signupEmailOtp, setSignupEmailOtp] = useState(new Array(6).fill(""));
  const [signupEmailOtpComplete, setSignupEmailOtpComplete] = useState(false);
  const signupEmailOtpRefs = useRef([]);

  const [signupMobileOtpVisible, setSignupMobileOtpVisible] = useState(false);
  const [signupMobileOtp, setSignupMobileOtp] = useState(new Array(6).fill(""));
  const [signupMobileOtpComplete, setSignupMobileOtpComplete] = useState(false);
  const signupMobileOtpRefs = useRef([]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [view, setView] = useState("signin");


  const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h6">
          Confirm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        {false && (<>{/* className="mt-5" */}
        <div >
          <h3 className="mb-3">
            Creative <span className="text-primary">Design</span> for a
            Bright Future.
          </h3>
          <p>
            There are many variations of passages of Lorem Ipsum
            available, but the majority have suffered by injected humour,
            or randomised words which don't look even slightly believable.
          </p>
          <p>
            All the Lorem Ipsum generators on the Internet tend to repeat
            Various versions have evolved over the years, sometimes by
            accident, sometimes on purpose (injected humour and the like).
          </p>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classNameical Latin
            literature from 45 BC, making it over 2000 years old.
          </p>
          {/* <Link to="#" className="btn ripple btn-primary btn-sm" role="button">Contact Us</Link> */}
        </div>

        <Form.Label className="mt-3">Enter OTP Received on Email</Form.Label>
        {renderOtpInputs(emailOtp, setEmailOtp, emailOtpRefs, setEmailOtpComplete)}
        <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
          {emailTimer > 0 ? `New OTP will be generated after ${emailTimer}s` : ""}
        </div>
        <Form.Label className="mt-3">Enter OTP Received on Mobile</Form.Label>
        {renderOtpInputs(emailOtp, setEmailOtp, emailOtpRefs, setEmailOtpComplete)}
        <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
          {emailTimer > 0 ? `New OTP will be generated after ${emailTimer}s` : ""}
        </div></>)}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={()=>{setAppFlow(appId, STAFF_DETAILS)}}>Save & Next</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const ConfirmBox = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Button variant="success" onClick={() => setModalShow(true)}>
        Save & Next
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}


export const PrincipalDocuments = () => {
  const dispatch = useDispatch();
  const initialValuesFromStore = useSelector((state) => state.TradeWiseWorkshopReducer);

  const [documentRows, setDocumentRows] = useState([
    {
      id: Date.now(),
      documentTitle: "",
      file: null,
    },
  ]);

  const initialValues = {
    documents: documentRows,
  };

  const validationSchema = Yup.object().shape({
    documents: Yup.array().of(
      Yup.object().shape({
        documentTitle: Yup.string().required("Title is required"),
        file: Yup.mixed().required("File is required"),
      })
    ),
  });

  const handleAddDocument = (setValues, values) => {
    const newDoc = { id: Date.now(), documentTitle: "", file: null };
    const updatedDocs = [...values.documents, newDoc];
    setValues({ ...values, documents: updatedDocs });
  };

  const handleRemoveDocument = (index, setValues, values) => {
    const updatedDocs = values.documents.filter((_, idx) => idx !== index);
    setValues({ ...values, documents: updatedDocs });
  };

  const submit = (values) => {
    console.log("Submitted Values:", values);
    // dispatch({ type: UPDATE_TRADEWISE_WORKSHOP_DETAILS, payload: values });
    // goNext();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={submit}
    >
      {({ handleSubmit, setFieldValue, values, setValues }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Card className="border border-info custom-card card">
            <Card.Body>
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th style={{ width: "60%" }}>Document Title</th>
                      <th>Select Document <ReqSign /></th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.documents.map((doc, index) => (
                      <tr key={doc.id}>
                        <td>{index + 1}</td>
                        <td>
                          <Form.Group>
                            <Field
                              name={`documents[${index}].documentTitle`}
                              className="form-control"
                              placeholder="Document Title"
                              required
                              isInvalid={true}
                            />
                            <ErrorMessage
                              name={`documents[${index}].documentTitle`}
                              component="div"
                              className="text-danger"
                            />
                          </Form.Group>
                        </td>

                        <td>
                          <input
                            type="file"
                            name={`documents[${index}].file`}
                            className="form-control"
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              setFieldValue(`documents[${index}].file`, file);
                            }}
                          />
                          <ErrorMessage
                            name={`documents[${index}].file`}
                            component="div"
                            className="text-danger"
                          />
                        </td>

                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveDocument(index, setValues, values)}
                            disabled={values.documents.length === 1}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-end">
              <Button
                size="sm"
                variant="success"
                onClick={() => handleAddDocument(setValues, values)}
              >
                Add More Document
              </Button>
            </Card.Footer>
          </Card>
        </FormikForm>
      )}
    </Formik>
  );
};



