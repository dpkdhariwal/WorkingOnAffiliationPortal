import { Fragment, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";
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
