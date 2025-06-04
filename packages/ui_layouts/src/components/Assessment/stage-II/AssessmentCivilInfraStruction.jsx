import PropTypes from "prop-types";
import { Field } from "formik";
import StickyBox from "react-sticky-box";

import { Fragment, useEffect } from "react";
import {
  Card,
  Accordion,
  Tab,
  Nav,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
  Badge,
} from "react-bootstrap";

import { useState, useRef } from "react";
import {} from "react-bootstrap";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as formik from "formik";
import ReqSign from "../../new_registration/form/comp/requiredSign";

const AssessmentCivilInfraStruction = () => {
  const CivilInfraList = [
    {
      tradeName: "Fitter",
      infraList: [
        {
          infraName: "Workshops Unit-1",
          baseUnit: 3,
          required: 2,
        },
        {
          infraName: "Workshops Unit-2",
          baseUnit: 3,
          required: 2,
        },
        {
          infraName: "Classrooms Unit-1",
          baseUnit: 3,
          required: 2,
        },
        {
          infraName: "Classrooms Unit-2",
          baseUnit: 3,
          required: 2,
        },
      ],
    },
    {
      tradeName: "Electrician",
      infraList: [
        {
          infraName: "Workshops",
          baseUnit: 2,
          required: 1,
        },
        {
          infraName: "Classrooms",
          baseUnit: 2,
          required: 1,
        },
      ],
    },
  ];
  return (
    <Fragment>
      <Accordion
        className="accordion-customicon1 accordions-items-seperate"
        defaultActiveKey="0"
      >
        {CivilInfraList.map((trade, index) => {
          

          return (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>{trade.tradeName}</Accordion.Header>
              <Accordion.Body>
                {trade.infraList.map((item, index) => {
                  console.log('DD',item.baseUnit);
                  

                  // for (let i = 0; i < item.baseUnit; i++) {
                  //     console.log('DD',i);
                  //   }                


                  return (
                    <div key={index} style={{ marginBottom: "10px" }}> 
                        <h6 className="text-black">{item.infraName}</h6>
                        <CivilInfraAction info={item} trade={trade} />
                      </div>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Fragment>
  );
};

export default AssessmentCivilInfraStruction;

export const Apparatus = ({ apparatus = [] }) => {
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

  useEffect(() => {
    console.log(apparatus);
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(apparatus.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };
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
        className="row"
      >
        <Col xl={6} lg={6} md={6} sm={6}>
          <Table style={{ "font-size": "x-small" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{ textTransform: "none" }}>
                  Particular
                  <ReqSign />
                </th>
                <th scope="col" style={{ textTransform: "none" }}>
                  Required Quantity
                  <ReqSign />
                </th>
                <th scope="col" style={{ textTransform: "none" }}>
                  Availability
                  <ReqSign />
                </th>
                <th scope="col" style={{ textTransform: "none" }}>
                  Available Quantity
                  <ReqSign />
                </th>
              </tr>
            </thead>
            <tbody>
              {apparatus.map((item, index) => {
                console.log(item);
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.required_quantity}</td>
                    <td>{item.availability}</td>
                    <td>{item.available_quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6}>
          {/* THis Should Sticky While above colon height is scrolling window */}
          {true && (
            <div style={{ padding: 2, background: "#E0ECF5", borderRadius: 6 }}>
              <div className="form-container">
                {formSubmited == false ? (
                  <Formik
                    validationSchema={yup.object().shape({
                      as_per_norms: yup
                        .string()
                        .required("Select whether is as per norms"),

                      assessor_comments: yup.string().when("as_per_norms", {
                        is: "no",
                        then: () =>
                          yup
                            .array()
                            .min(1, "Select at least one comment")
                            .of(yup.string().required()),
                        otherwise: () => yup.array().notRequired(),
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
                          <Form
                            ref={formRef2}
                            onSubmit={handleSubmit}
                            validated
                          >
                            <Row className="mb-3">
                              <Form.Group>
                                <Form.Label>
                                  Whether is as per norms?
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
                                <Col md={12}>
                                  <Form.Label>
                                    Select Apparatus not as per norms:
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Table style={{ "font-size": "x-small" }}>
                                    <thead>
                                      <tr>
                                        <th>
                                          {" "}
                                          <Form.Check
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                          />
                                        </th>
                                        <th scope="col">#</th>
                                        <th
                                          scope="col"
                                          style={{ textTransform: "none" }}
                                        >
                                          Particular
                                          <ReqSign />
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ textTransform: "none" }}
                                        >
                                          Required Quantity
                                          <ReqSign />
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ textTransform: "none" }}
                                        >
                                          Availability
                                          <ReqSign />
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ textTransform: "none" }}
                                        >
                                          Available Quantity
                                          <ReqSign />
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {apparatus.map((item, index) => {
                                        console.log(item);
                                        const isChecked =
                                          selectedItems.includes(index);

                                        return (
                                          <tr key={index}>
                                            <td>
                                              {" "}
                                              <Form.Check
                                                name="assessor_comments"
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() =>
                                                  handleCheckboxChange(index)
                                                }
                                              />
                                            </td>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.required_quantity}</td>

                                            <td>{item.availability}</td>
                                            <td>{item.available_quantity}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </Table>
                                </Col>
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
                          <b>Whether is as per norms?:</b>{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {formData.as_per_norms}
                          </span>
                        </Col>
                        {formData.as_per_norms == "no" && (
                          <Col md={12}>
                            <p>not as per the norms:</p>{" "}
                            <table style={{ "font-size": "x-small" }}>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th scope="col">#</th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Name
                                    <ReqSign />
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Required Quantity
                                    <ReqSign />
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Availability
                                    <ReqSign />
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Available Quantity
                                    <ReqSign />
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {apparatus.map((item, index) => {
                                  console.log(item);
                                  const isChecked =
                                    selectedItems.includes(index);
                                  return (
                                    isChecked && (
                                      <tr key={index}>
                                        <td>
                                          <Form.Check
                                            name="assessor_comments"
                                            type="checkbox"
                                            checked={isChecked}
                                            disabled={true}
                                          />
                                        </td>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.required_quantity}</td>
                                        <td>{item.availability}</td>
                                        <td>{item.available_quantity}</td>
                                      </tr>
                                    )
                                  );
                                })}
                              </tbody>
                            </table>
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
          )}
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
  );
};
// Apparatus.propTypes = {
//   apparatus: PropTypes.array.isRequired, // or use PropTypes.arrayOf(...)
// };

export const CivilInfraAction = ({info, trade}) => {
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


  useEffect(() => {
    console.log(info);
  }, []);
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
          <Card className="mb-3">
            <Card.Body>
              <Row className="mb-2">
                <Col md={4} className="fw-bold">
                  Trade Name
                </Col>
                <Col md={8}>{trade.tradeName}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={4} className="fw-bold">
                  Particulars
                </Col>
                <Col md={8}>{info.infraName}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={4} className="fw-bold">
                  Required Area (As per norms)
                </Col>
                <Col md={8}>1000 (m<sup>2</sup>)</Col>
              </Row>
              <Row className="mb-2">
                <Col md={4} className="fw-bold">
                  Available Area
                </Col>
                <Col md={8}>1000 (m<sup>2</sup>)</Col>
              </Row>
              <Row>
                <Col md={4} className="fw-bold">
                  Uploaded Geo tagged Photo <ReqSign />
                </Col>
                <Col md={8}>           <Button size="sm" variant='primary' className="shadow-sm btn-wave">View Geo Tagged Photo</Button>
</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6}>
          <div style={{ padding: 2, background: "#E0ECF5", borderRadius: 6 }}>
            <div className="form-container">
              {formSubmited == false ? (
                <Formik
                  validationSchema={yup.object().shape({
                    as_per_norms: yup
                      .string()
                      .required("Select whether is as per norms"),

                    // category: yup.string().when("as_per_norms", {
                    //   is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                    //   then: () =>
                    //     yup.string().required("Please select a category"),
                    //   otherwise: () => yup.string().notRequired(),
                    // }),

                    // assessor_comments: yup.string().when("as_per_norms", {
                    //   is: "no",
                    //   then: () =>
                    //     yup.string().required("Please provide your comments"),
                    //   otherwise: () => yup.string().notRequired(),
                    // }),
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
                                Whether is as per norms?
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
                          {/* {values.as_per_norms === "no" && (
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
                          )} */}
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
  );
};
