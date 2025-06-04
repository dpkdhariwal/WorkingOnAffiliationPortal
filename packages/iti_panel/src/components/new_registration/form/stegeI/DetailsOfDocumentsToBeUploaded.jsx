import { Fragment, useEffect } from "react";
import { Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

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

const DetailsOfDocumentsToBeUploaded = () => {
  const stage = useSelector((state) => state.theme.new_registration);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialLandDocs = stage.stage_I.land_documents || [];
  const lease_deed_document = stage.stage_I.lease_docs || [];

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

  const saveApplciation = () => {
    console.log("sdfafsdf");
    dispatch({ type: "setAsSubmitApplicationStageI", payload: {} });
  };
  return (
    <Fragment>
      <Formik
        initialValues={{
          land_documents: initialLandDocs,
          lease_deed_document: lease_deed_document,
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
                  Land Documents
                </div>
              </Card.Header>
              <Card.Body>
                <FieldArray name="land_documents">
                  {({ push }) => (
                    <Card className="mb-3">
                      <Card.Body>
                        {values.land_documents.map((doc, index) => (
                          <Row key={index} style={{ marginTop: "1rem" }}>
                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Document Title
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  name={`land_documents[${index}].title`}
                                  as={Form.Control}
                                  // isInvalid={
                                  //   touched.land_documents?.[index]?.title &&
                                  //   !!errors.land_documents?.[index]?.title
                                  // }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.land_documents?.[index]?.title}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Document Language
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  required
                                  name={`land_documents[${index}].language`}
                                  as="select"
                                  className="form-control"
                                  // isInvalid={
                                  //   touched.land_documents?.[index]?.language &&
                                  //   !!errors.land_documents?.[index]?.language
                                  // }
                                >
                                  {languages.map((lang, i) => (
                                    <option key={i} value={lang}>
                                      {lang}
                                    </option>
                                  ))}
                                </Field>
                                <Form.Control.Feedback type="invalid">
                                  {errors.land_documents?.[index]?.language}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Upload Original Document of Land
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={(event) => {
                                    setFieldValue(
                                      `land_documents[${index}].file`,
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                  isInvalid={
                                    touched.land_documents?.[index]?.file &&
                                    !!errors.land_documents?.[index]?.file
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.land_documents?.[index]?.file}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>

                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Upload Hindi/English Notarised Copy of
                                  Document{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={(event) => {
                                    setFieldValue(
                                      `land_documents[${index}].file`,
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  dfsff
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                        ))}
                      </Card.Body>
                      <Card.Footer className="text-end">
                        <Button
                          className="mb-3"
                          onClick={() =>
                            push({ title: "", language: "", file: null })
                          }
                        >
                          Add More
                        </Button>
                      </Card.Footer>
                    </Card>
                  )}
                </FieldArray>
              </Card.Body>
            </Card>

            <Card className="custom-card border border-primary">
              <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                  Upload Registered Lease Deed Documents
                </div>
              </Card.Header>
              <Card.Body>
                <FieldArray name="lease_deed_document">
                  {({ push }) => (
                    <Card className="mb-3">
                      <Card.Body>
                        {values.lease_deed_document.map((doc, index) => (
                          <Row key={index} style={{ marginTop: "1rem" }}>
                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Document Title
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  name={`lease_deed_document[${index}].title`}
                                  as={Form.Control}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.land_documents?.[index]?.title}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Document Language
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Field
                                  required
                                  name={`lease_deed_document[${index}].language`}
                                  as="select"
                                  className="form-control"
                                >
                                  {languages.map((lang, i) => (
                                    <option key={i} value={lang}>
                                      {lang}
                                    </option>
                                  ))}
                                </Field>
                                <Form.Control.Feedback type="invalid">
                                  {errors.land_documents?.[index]?.language}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Upload Original Document of Lease Deed{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={(event) => {
                                    setFieldValue(
                                      `land_documents[${index}].file`,
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  dddd
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>

                            <Col md={3}>
                              <Form.Group>
                                <Form.Label>
                                  Upload Hindi/English Notarised Copy of
                                  Document{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={(event) => {
                                    setFieldValue(
                                      `land_documents[${index}].file`,
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  ddd
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                        ))}
                      </Card.Body>
                      <Card.Footer className="text-end">
                        <Button
                          className="mb-3"
                          onClick={() =>
                            push({ title: "", language: "", file: null })
                          }
                        >
                          Add More
                        </Button>
                      </Card.Footer>
                    </Card>
                  )}
                </FieldArray>
              </Card.Body>
            </Card>

            <Card className="custom-card border border-primary">
              <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                  Land Use, Land Conversion Certificate (If Applicable)
                </div>
              </Card.Header>
              <Card.Body>
                <Card className="mb-3">
                  <Card.Body>
                    <Row style={{ marginTop: "1rem" }}>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>
                            Document Title
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Field name="land_use_documents" as={Form.Control} />
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>
                            Document Language
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Field
                            required
                            name={`land_documents_language`}
                            as="select"
                            className="form-control"
                            // isInvalid={
                            //   touched.land_documents?.[index]?.language &&
                            //   !!errors.land_documents?.[index]?.language
                            // }
                          >
                            {languages.map((lang, i) => (
                              <option key={i} value={lang}>
                                {lang}
                              </option>
                            ))}
                          </Field>
                          <Form.Control.Feedback type="invalid">
                            Select Document
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>
                            Upload Original Document of{" "}
                            {"Land Use, Land Conversion Certificate"}{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="file"
                            // onChange={(event) => {
                            //   setFieldValue(
                            //     `land_documents[${index}].file`,
                            //     event.currentTarget.files[0]
                            //   );
                            // }}
                            // isInvalid={
                            //   touched.land_documents?.[index]?.file &&
                            //   !!errors.land_documents?.[index]?.file
                            // }
                          />
                          <Form.Control.Feedback type="invalid">
                            Select Document
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group>
                          <Form.Label>
                            Upload Hindi/English Notarised Copy of Document
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="file"
                            onChange={(event) => {
                              setFieldValue(
                                `land_documents[${index}].file`,
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            ddd
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>

            <Card className="custom-card border border-primary">
              <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                  ID Proof of Authorized Signatory{" "}
                  <span>
                    (As per Annexure-5)
                    <Button variant="link" className="rounded-pill btn-wave">
                      Download Format
                    </Button>
                  </span>
                  <i
                    className="fe fe-help-circle"
                    style={{ cursor: "pointer", color: "#6c757d" }}
                    title="An individual formally designated by the applicant to act on itsbehalf in official matters related to affiliation, accreditation, and administrativecommunication."
                    onClick={() => alert(`Info about About`)} // Replace with your actual logic
                  ></i>
                </div>
              </Card.Header>
              <Card.Body>
                <Card className="mb-3">
                  <Card.Body>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom02"
                      >
                        <Form.Label>
                          Name<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Name"
                          name="name_of_authorized_signatory"
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
                          Designation<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Designation"
                          name="designation_of_authorized_signatory"
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
                          Email Id<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div className="d-flex align-items-center gap-2">
                          <Form.Control
                            required
                            type="email"
                            placeholder="Email Id"
                            name="email_id_of_authorized_signatory"
                          />
                          <Button variant="primary">Verify</Button>
                        </div>
                        {/* <InputGroup>
                          <Form.Control
                            required
                            type="email"
                            placeholder="Email Id"
                            name="email_id_of_authorized_signatory"
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-verify-email"
                          >
                            Verify
                          </Button>
                        </InputGroup> */}
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
                          Mobile Number
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div className="d-flex align-items-center gap-2">
                          <Form.Control
                            required
                            type="tel"
                            placeholder="Mobile Number"
                            name="mobile_number_of_authorized_signatory"
                          />
                          <Button variant="primary">Verify</Button>
                        </div>

                        {/* <InputGroup>
                          <Form.Control
                            required
                            type="tel"
                            placeholder="Mobile Number"
                            name="mobile_number_of_authorized_signatory"
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-verify-mobile"
                          >
                            Verify
                          </Button>
                        </InputGroup> */}
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row style={{ marginTop: "1rem" }}>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>
                            Select ID Proof Type
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Field
                            required
                            name="id_proof"
                            as="select"
                            className="form-control"
                          >
                            {ID_Proof_Doc_list.map((docType, i) => (
                              <option key={i} value={docType}>
                                {docType}
                              </option>
                            ))}
                          </Field>
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>
                            Enter ID Proof Number
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Field
                            name="enter _id_proof_number"
                            as={Form.Control}
                          />
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Form.Group as={Col} md={4}>
                        <Form.Label>
                          Document Upload<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(event) => {
                            setFieldValue(
                              `registration_cert_of_applicant_org`,
                              event.currentTarget.files[0]
                            );
                          }}
                          // isInvalid={
                          //   touched.land_documents?.[index]?.file &&
                          //   !!errors.land_documents?.[index]?.file
                          // }
                        />
                        <Form.Control.Feedback type="invalid">
                          Error
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
            {/* 
            <Row className="mb-3">
              <Col md="12">
                <Card className="border border-info custom-card">
                  <Card.Header>
                    <div
                      className="card-title"
                      style={{ textTransform: "none" }}
                    >
                      Authorized Signatory:{" "}
                      <i
                        className="fe fe-help-circle"
                        style={{ cursor: "pointer", color: "#6c757d" }}
                        title="An individual formally designated by the applicant to act on itsbehalf in official matters related to affiliation, accreditation, and administrativecommunication."
                        onClick={() => alert(`Info about About`)} // Replace with your actual logic
                      ></i>
                      <span>
                        (As per Annexure-5)
                        <Button
                          variant="link"
                          className="rounded-pill btn-wave"
                        >
                          Download Format
                        </Button>
                      </span>
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
                          Name<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Name"
                          name="name_of_authorized_signatory"
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
                          Designation<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Designation"
                          name="designation_of_authorized_signatory"
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
                          Email Id<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            required
                            type="email"
                            placeholder="Email Id"
                            name="email_id_of_authorized_signatory"
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-verify-email"
                          >
                            Verify
                          </Button>
                        </InputGroup>
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
                          Mobile Number
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            required
                            type="tel"
                            placeholder="Mobile Number"
                            name="mobile_number_of_authorized_signatory"
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-verify-mobile"
                          >
                            Verify
                          </Button>
                        </InputGroup>
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row> */}

            <Card className="custom-card border border-primary">
              {/* <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                ID Proof of Authorized Signatory
                </div>
              </Card.Header> */}
              <Card.Body>
                <Form.Group>
                  <Form.Label>
                    Select Registration Certificate of Applicant Organization
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(event) => {
                      setFieldValue(
                        `registration_cert_of_applicant_org`,
                        event.currentTarget.files[0]
                      );
                    }}
                    // isInvalid={
                    //   touched.land_documents?.[index]?.file &&
                    //   !!errors.land_documents?.[index]?.file
                    // }
                  />
                  <Form.Control.Feedback type="invalid">
                    Error
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="custom-card border border-primary">
              <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                  ID Proof of Secretary/Chairperson/President
                </div>
              </Card.Header>
              <Card.Body>
                <Card className="mb-3">
                  <Card.Body>
                    <Row style={{ marginTop: "1rem" }}>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>
                            Person Designation
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Field
                            required
                            name="id_proof_of_scp"
                            as="select"
                            className="form-control"
                          >
                            {designation.map((desig, i) => (
                              <option key={i} value={desig}>
                                {desig}
                              </option>
                            ))}
                          </Field>
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>
                            Select ID Proof Type
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Field
                            required
                            name="id_proof_of_scp_type"
                            as="select"
                            className="form-control"
                          >
                            {ID_Proof_Doc_list.map((docType, i) => (
                              <option key={i} value={docType}>
                                {docType}
                              </option>
                            ))}
                          </Field>
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label>
                            Enter ID Proof Number
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Field
                            name="id_proof_of_scp_number"
                            as={Form.Control}
                          />
                          <Form.Control.Feedback type="invalid">
                            Error
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>

            <Card className="custom-card border border-primary">
              {/* <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                Resolution for starting ITI
                </div>
              </Card.Header> */}
              <Card.Body>
                <Row style={{ marginTop: "1rem" }}>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>
                      Select Resolution for Starting ITI
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(event) => {
                        setFieldValue(
                          `registration_cert_of_applicant_org`,
                          event.currentTarget.files[0]
                        );
                      }}
                      // isInvalid={
                      //   touched.land_documents?.[index]?.file &&
                      //   !!errors.land_documents?.[index]?.file
                      // }
                    />
                    <Form.Control.Feedback type="invalid">
                      Error
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        View Format for `Resolution for starting ITI` Annexure-3
                      </Form.Label>
                      <Link to="/new_registration/annexure-3" target="_blank">
                        <Button
                          variant="primary"
                          className="rounded-pill btn-wave"
                        >
                          View Annexure-3 Format
                        </Button>
                      </Link>
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Row style={{ marginTop: "1rem" }}>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>
                      Select Resolution from Applicant for Authorized signatory
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(event) => {
                        setFieldValue(
                          `registration_cert_of_applicant_org`,
                          event.currentTarget.files[0]
                        );
                      }}
                      // isInvalid={
                      //   touched.land_documents?.[index]?.file &&
                      //   !!errors.land_documents?.[index]?.file
                      // }
                    />
                    <Form.Control.Feedback type="invalid">
                      Error
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        View Format for `Resolution from Applicant for
                        Authorized Signatory` Annexure-4
                      </Form.Label>
                      <Link to="/new_registration/annexure-3" target="_blank">
                        <Button
                          variant="primary"
                          className="rounded-pill btn-wave"
                        >
                          View Annexure-4 Format
                        </Button>
                      </Link>
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Row style={{ marginTop: "1rem" }}>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>
                      Select Resolution Regarding Earmarking of Land, Building,
                      and other Resources Exclusively Dedicated to the ITI (if
                      any), as per the Format Provided in Annexure-5.
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(event) => {
                        setFieldValue(
                          `registration_cert_of_applicant_org`,
                          event.currentTarget.files[0]
                        );
                      }}
                      // isInvalid={
                      //   touched.land_documents?.[index]?.file &&
                      //   !!errors.land_documents?.[index]?.file
                      // }
                    />
                    <Form.Control.Feedback type="invalid">
                      Error
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>View Format for Annexure-5</Form.Label>
                      <Link to="/new_registration/annexure-3" target="_blank">
                        <Button
                          variant="primary"
                          className="rounded-pill btn-wave"
                        >
                          View Annexure-5 Format
                        </Button>
                      </Link>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="custom-card border border-primary">
              {/* <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                  Self Declaration
                </div>
              </Card.Header> */}
              <Card.Body>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Self Declaration<span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <Row style={{ marginTop: "1rem" }}>
                  <Col md={12}>
                    {`Institute's self-declaration of compliance with Affiliation Norms and acknowledgment of responsibilities, as per Annexure-6`}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end">
                <Button
                  onClick={saveApplciation}
                  size="lg"
                  variant="success"
                  className="btn-wave"
                >
                  Submit Application
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default DetailsOfDocumentsToBeUploaded;
