import { Fragment, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Tab,
  Nav,
  Dropdown,
  DropdownDivider,
} from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Formik, Field, FieldArray } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";
import ReqSign from "../comp/requiredSign";
import { label } from "yet-another-react-lightbox";

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

import TextWizard from "./wizard/text";

const CivilInfrastructureDetails = (props) => {
  const stage = useSelector((state) => state.reg.stepsII);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(props.stepInfo.fields);
  }, []);

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
  const percentage = 66;
  return (
    <Fragment>
      <TextWizard/>
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
            <Card className="custom-card  border-primary">
              <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                  Civil Infrastructure Detail
                </div>
              </Card.Header>
              <Card.Body>
                <Tab.Container id="left-tabs-example"  defaultActiveKey="first">
                  <Row>
                    <Col xl={3}>
                      <Nav
                        className="nav-tabs flex-column nav-style-5"
                        role="tablist"
                        defaultActiveKey="first"
                      >
                        <Nav.Item style={{ width: "100%" }}>
                          {" "}
                          <Nav.Link href="#home-vertical-link" eventKey="first">
                            <div className="d-flex justify-content-between align-items-center">
                              <span>
                                <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
                                TradeWise Workshops
                              </span>
                              <div style={{ width: 30, height: 30 }}>
                                <CircularProgressbar
                                  value={percentage}
                                  text={`${percentage}%`}
                                />
                              </div>
                            </div>
                          </Nav.Link>{" "}
                        </Nav.Item>
                        <Nav.Item style={{ width: "100%" }}>
                          {" "}
                          <Nav.Link
                            eventKey="second"
                            href="#about-vertical-link"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <span>
                                <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
                                TradeWise Classrooms
                              </span>
                              <div style={{ width: 30, height: 30 }}>
                                <CircularProgressbar
                                  value={percentage}
                                  text={`${percentage}%`}
                                />
                              </div>
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item style={{ width: "100%" }}>
                          {" "}
                          <Nav.Link
                            eventKey="third"
                            href="#services-vertical-link"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <span>
                                <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
                                Amenities
                              </span>
                              <div style={{ width: 30, height: 30 }}>
                                <CircularProgressbar
                                  value={percentage}
                                  text={`${percentage}%`}
                                />
                              </div>
                            </div>
                          </Nav.Link>{" "}
                        </Nav.Item> */}
                        {/* <Nav.Item style={{ width: "100%" }}>
                          {" "}
                          <Nav.Link
                            eventKey="fourth"
                            href="#contacts-vertical-link"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <span>
                                <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
                                Signage Boards
                              </span>
                              <div style={{ width: 30, height: 30 }}>
                                <CircularProgressbar
                                  value={percentage}
                                  text={`${percentage}%`}
                                />
                              </div>
                            </div>
                          </Nav.Link>{" "}
                        </Nav.Item> */}
                        {/* 
                        <Nav.Item style={{ width: "100%" }}>
                          {" "}
                          <Nav.Link
                            eventKey="fifth"
                            href="#contacts-vertical-link"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <span>
                                <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
                                IT lab
                              </span>
                              <div style={{ width: 30, height: 30 }}>
                                <CircularProgressbar
                                  value={percentage}
                                  text={`${percentage}%`}
                                />
                              </div>
                            </div>
                          </Nav.Link>{" "}
                        </Nav.Item> */}
                      </Nav>
                    </Col>
                    <Col xl={9}>
                      <Tab.Content>
                        <Tab.Pane
                          className="text-muted"
                          id="home-vertical-link"
                          eventKey="first"
                          role="tabpanel"
                        >
                          <div className="table-responsive">
                            <Table className="text-nowrap ">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Trade Name
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Particulars
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Required Area (As per norms)
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Available Area
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Upload Captured the geo tagged Photo
                                    <ReqSign />
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">Fitter</th>
                                  <th scope="row">Workshop 1</th>
                                  <td>...</td>
                                  <td>
                                    <Field
                                      type="number"
                                      name={`infra_structure`}
                                      as={Form.Control}
                                    />
                                  </td>
                                  <td>
                                    <Form.Group>
                                      {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                      <div className="d-flex align-items-center gap-2">
                                        <Form.Control type="file" />
                                        <Button variant="primary">
                                          Upload
                                        </Button>
                                      </div>
                                      <Form.Control.Feedback type="invalid">
                                        Select Document
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Fitter</th>
                                  <th scope="row">Workshop 1</th>
                                  <td>...</td>
                                  <td>
                                    <Field
                                      type="number"
                                      name={`infra_structure`}
                                      as={Form.Control}
                                    />
                                  </td>
                                  <td>
                                    <Form.Group>
                                      {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                      <div className="d-flex align-items-center gap-2">
                                        <Form.Control type="file" />
                                        <Button variant="primary">
                                          Upload
                                        </Button>
                                      </div>
                                      <Form.Control.Feedback type="invalid">
                                        Select Document
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane
                          className="text-muted"
                          id="about-vertical-link"
                          eventKey="second"
                          role="tabpanel"
                        >
                          <div className="table-responsive">
                            <Table className="text-nowrap ">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Trade Name
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Particulars
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Required Area (As per norms)
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Available Area
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Upload Captured the geo tagged Photo{" "}
                                    <ReqSign />
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">Fitter</th>
                                  <th scope="row">Classroom 1</th>
                                  <td>...</td>
                                  <td>
                                    <Field
                                      type="number"
                                      name={`infra_structure`}
                                      as={Form.Control}
                                    />
                                  </td>
                                  <td>
                                    <Form.Group>
                                      {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                      <div className="d-flex align-items-center gap-2">
                                        <Form.Control type="file" />
                                        <Button variant="primary">
                                          Upload
                                        </Button>
                                      </div>
                                      <Form.Control.Feedback type="invalid">
                                        Select Document
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Fitter</th>
                                  <th scope="row">Classroom 2</th>
                                  <td>...</td>
                                  <td>
                                    <Field
                                      type="number"
                                      name={`infra_structure`}
                                      as={Form.Control}
                                    />
                                  </td>
                                  <td>
                                    <Form.Group>
                                      {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                      <div className="d-flex align-items-center gap-2">
                                        <Form.Control type="file" />
                                        <Button variant="primary">
                                          Upload
                                        </Button>
                                      </div>
                                      <Form.Control.Feedback type="invalid">
                                        Select Document
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Tab.Pane>
                        {false && (
                          <Tab.Pane
                            className="show  text-muted"
                            id="services-vertical-link"
                            eventKey="third"
                            role="tabpanel"
                          >
                            <div className="table-responsive">
                              <Card className="custom-card border border-primary">
                                {/* <Card.Header>
                              <div className="d-flex justify-content-between mb-3">
                                <div className="p-2">
                                  <div
                                    className="card-title"
                                    style={{
                                      textTransform: "none",
                                    }}
                                  >
                                    Library & reading room
                                  </div>
                                </div>
                                <div className="p-2"></div>
                              </div>
                            </Card.Header> */}
                                <Card.Body>
                                  {[
                                    {
                                      label: "Library & reading room",
                                      otherInfo: { requiredArea: "..." },
                                    },
                                    {
                                      label: "First-Aid Room",
                                      otherInfo: { requiredArea: "..." },
                                    },
                                    {
                                      label: "Playground",
                                      otherInfo: { requiredArea: "..." },
                                    },
                                    {
                                      label: "Drinking Water Facility",
                                      otherInfo: { requiredArea: "..." },
                                    },
                                    {
                                      label: "Availability of staircases",
                                      otherInfo: { requiredArea: "..." },
                                    },
                                    {
                                      label: "Toilets/Water Closets",
                                      otherInfo: { requiredArea: "..." },
                                    },
                                    {
                                      label: "General Parking Details",
                                      otherInfo: { requiredArea: "..." },
                                    },
                                  ].map((item, index) => (
                                    <div key={index}>
                                      <div className="mb-4">
                                        <h5>{item.label}</h5>
                                        <Row className="align-items-end">
                                          <Col md={6}>
                                            <Form.Group
                                              controlId={`requiredQuantity-${index}`}
                                            >
                                              <Form.Label>Required</Form.Label>
                                              {item.otherInfo.requiredArea}
                                            </Form.Group>
                                          </Col>
                                          <Col md={4}>
                                            <Form.Group>
                                              <Form.Label>
                                                Enter Area
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
                                          <Col md={6}>
                                            <Form.Group>
                                              <Form.Label>
                                                Upload Geo Tagged Photo
                                                <ReqSign />
                                              </Form.Label>
                                              <div className="d-flex align-items-center gap-2">
                                                <Form.Control type="file" />
                                                <Button variant="primary">
                                                  Upload
                                                </Button>
                                              </div>
                                              <Form.Control.Feedback type="invalid">
                                                Select Document
                                              </Form.Control.Feedback>
                                            </Form.Group>
                                          </Col>
                                        </Row>
                                      </div>
                                      <hr />
                                    </div>
                                  ))}
                                </Card.Body>
                              </Card>

                              {false && (
                                <Table className="text-nowrap table-striped">
                                  <thead>
                                    <tr>
                                      <th
                                        scope="col"
                                        style={{ textTransform: "none" }}
                                      >
                                        Particulars
                                      </th>
                                      <th
                                        scope="col"
                                        style={{ textTransform: "none" }}
                                      >
                                        Required Area (As per norms)
                                      </th>
                                      <th
                                        scope="col"
                                        style={{ textTransform: "none" }}
                                      >
                                        Available Area
                                      </th>
                                      <th
                                        scope="col"
                                        style={{ textTransform: "none" }}
                                      >
                                        Upload Captured the geo tagged Photo
                                        <ReqSign />
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {props.stepInfo.fields.map(
                                      (item, index) => {
                                        console.log(item); // Log item to the console
                                        return (
                                          <tr key={index}>
                                            <th scope="row">{item.entity}</th>
                                            <td>{item.area}</td>
                                            <td>
                                              <Field
                                                type="number"
                                                name={`infra_structure[${index}]`}
                                                as={Form.Control}
                                              />
                                            </td>
                                            <td>
                                              <Form.Group>
                                                {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                                <div className="d-flex align-items-center gap-2">
                                                  <Form.Control type="file" />
                                                  <Button variant="primary">
                                                    Upload
                                                  </Button>
                                                </div>
                                                <Form.Control.Feedback type="invalid">
                                                  Select Document
                                                </Form.Control.Feedback>
                                              </Form.Group>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </Table>
                              )}
                            </div>
                          </Tab.Pane>
                        )}
                        {false && (
                          <Tab.Pane
                            className="text-muted"
                            id="contacts-vertical-link"
                            eventKey="fourth"
                            role="tabpanel"
                          >
                            <Card className="custom-card border border-primary">
                              <Card.Header>
                                <div className="d-flex justify-content-between mb-3">
                                  <div className="p-2">
                                    <div
                                      className="card-title"
                                      style={{
                                        textTransform: "none",
                                      }}
                                    >
                                      Signage Board on plot entrance
                                    </div>
                                  </div>
                                  <div className="p-2"></div>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                <div className="mb-4">
                                  <Row className="align-items-end">
                                    <Col md={6}>
                                      <Form.Group controlId="requiredQuantity">
                                        <Form.Label>
                                          Size of the Font
                                        </Form.Label>
                                        <Field
                                          type="number"
                                          name="infra_structure_required"
                                          as={Form.Control}
                                          placeholder="Font should be minimum 75 mm."
                                        />
                                      </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                      <Form.Group controlId="availability">
                                        <Form.Label>
                                          Size of the Board
                                        </Form.Label>
                                        <Form.Select>
                                          <option value="">Select</option>
                                          <option value="2x1.5">
                                            2m x 1.5 m
                                          </option>
                                          <option value="3x1.5">
                                            3m x 1.5 m
                                          </option>
                                          <option value="4x2">
                                            4m x 2.0 m
                                          </option>
                                        </Form.Select>
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                </div>
                              </Card.Body>
                            </Card>
                          </Tab.Pane>
                        )}
                        {false && (
                          <Tab.Pane
                            className="text-muted"
                            id="contacts-vertical-link"
                            eventKey="fifth"
                            role="tabpanel"
                          >
                            <Card className="custom-card border border-primary">
                              <Card.Header>
                                <div className="d-flex justify-content-between mb-3">
                                  <div className="p-2">
                                    <div
                                      className="card-title"
                                      style={{
                                        textTransform: "none",
                                        fontSize: "20px",
                                      }}
                                    >
                                      Specifications of IT lab
                                    </div>
                                  </div>
                                  <div className="p-2"></div>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                {[
                                  "Desktop computers",
                                  "Internet connection",
                                  "Computer with multimedia, anti-virus software",
                                  "LAN Cabling,LAN Switch",
                                  "Printer (Laser)",
                                  "Scanner",
                                  "Server",
                                  "External Hard Disk – 1TB",
                                  "Instructor/ Office Chair",
                                  "Instructor/ Office Table",
                                  "Trainees/Computer Chairs",
                                  "Trainees/ Computer Tables",
                                  "Black/ White Board 4X6 Feet",
                                ].map((item, index) => (
                                  <div key={index}>
                                    <div className="mb-4">
                                      <h5>{item}</h5>
                                      <Row className="align-items-end">
                                        <Col md={6}>
                                          <Form.Group
                                            controlId={`requiredQuantity-${index}`}
                                          >
                                            <Form.Label>Input</Form.Label>
                                            <Field
                                              type="number"
                                              name={`infra_structure_required_${index}`}
                                              as={Form.Control}
                                              placeholder="Font should be minimum 75 mm."
                                            />
                                          </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                          <Form.Group
                                            controlId={`availability-${index}`}
                                          >
                                            <Form.Label>Input 2</Form.Label>
                                            <Form.Select>
                                              <option value="">Select</option>
                                              <option value="2x1.5">
                                                2m x 1.5 m
                                              </option>
                                              <option value="3x1.5">
                                                3m x 1.5 m
                                              </option>
                                              <option value="4x2">
                                                4m x 2.0 m
                                              </option>
                                            </Form.Select>
                                          </Form.Group>
                                        </Col>
                                      </Row>
                                    </div>
                                    <hr />
                                  </div>
                                ))}
                              </Card.Body>
                            </Card>
                          </Tab.Pane>
                        )}
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>

                {false && (
                  <Card className="custom-card border border-primary">
                    <Card.Header>
                      <div
                        className="card-title"
                        style={{ textTransform: "none" }}
                      >
                        Electician - TradeWise Workshop/Classroom
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="table-responsive">
                        <Table className="text-nowrap ">
                          <thead>
                            <tr>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Particulars
                              </th>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Required Area (As per norms)
                              </th>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Available Area
                              </th>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Upload Captured the geo tagged Photo
                                <ReqSign />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Workshop 1</th>
                              <td>...</td>
                              <td>
                                <Field
                                  type="number"
                                  name={`infra_structure`}
                                  as={Form.Control}
                                />
                              </td>
                              <td>
                                <Form.Group>
                                  {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                  <div className="d-flex align-items-center gap-2">
                                    <Form.Control type="file" />
                                    <Button variant="primary">Upload</Button>
                                  </div>
                                  <Form.Control.Feedback type="invalid">
                                    Select Document
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Workshop 1</th>
                              <td>...</td>
                              <td>
                                <Field
                                  type="number"
                                  name={`infra_structure`}
                                  as={Form.Control}
                                />
                              </td>
                              <td>
                                <Form.Group>
                                  {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                  <div className="d-flex align-items-center gap-2">
                                    <Form.Control type="file" />
                                    <Button variant="primary">Upload</Button>
                                  </div>
                                  <Form.Control.Feedback type="invalid">
                                    Select Document
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Classroom 1</th>
                              <td>...</td>
                              <td>
                                <Field
                                  type="number"
                                  name={`infra_structure`}
                                  as={Form.Control}
                                />
                              </td>
                              <td>
                                <Form.Group>
                                  {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                  <div className="d-flex align-items-center gap-2">
                                    <Form.Control type="file" />
                                    <Button variant="primary">Upload</Button>
                                  </div>
                                  <Form.Control.Feedback type="invalid">
                                    Select Document
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Classroom 2</th>
                              <td>...</td>
                              <td>
                                <Field
                                  type="number"
                                  name={`infra_structure`}
                                  as={Form.Control}
                                />
                              </td>
                              <td>
                                <Form.Group>
                                  {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                  <div className="d-flex align-items-center gap-2">
                                    <Form.Control type="file" />
                                    <Button variant="primary">Upload</Button>
                                  </div>
                                  <Form.Control.Feedback type="invalid">
                                    Select Document
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                )}

                {false && (
                  <Card className="custom-card border border-primary">
                    <Card.Header>
                      <div
                        className="card-title"
                        style={{ textTransform: "none" }}
                      >
                        Fitter - TradeWise Workshop/Classroom
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="table-responsive">
                        <Table className="text-nowrap ">
                          <thead>
                            <tr>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Particulars
                              </th>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Required Area (As per norms)
                              </th>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Available Area
                              </th>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Upload Captured the geo tagged Photo
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Workshop 1</th>
                              <td>...</td>
                              <td>
                                <Field
                                  type="number"
                                  name={`infra_structure`}
                                  as={Form.Control}
                                />
                              </td>
                              <td>
                                <Form.Group>
                                  {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                  <div className="d-flex align-items-center gap-2">
                                    <Form.Control type="file" />
                                    <Button variant="primary">Upload</Button>
                                  </div>
                                  <Form.Control.Feedback type="invalid">
                                    Select Document
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Workshop 1</th>
                              <td>...</td>
                              <td>
                                <Field
                                  type="number"
                                  name={`infra_structure`}
                                  as={Form.Control}
                                />
                              </td>
                              <td>
                                <Form.Group>
                                  {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                  <div className="d-flex align-items-center gap-2">
                                    <Form.Control type="file" />
                                    <Button variant="primary">Upload</Button>
                                  </div>
                                  <Form.Control.Feedback type="invalid">
                                    Select Document
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Classroom 1</th>
                              <td>...</td>
                              <td>
                                <Field
                                  type="number"
                                  name={`infra_structure`}
                                  as={Form.Control}
                                />
                              </td>
                              <td>
                                <Form.Group>
                                  {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                  <div className="d-flex align-items-center gap-2">
                                    <Form.Control type="file" />
                                    <Button variant="primary">Upload</Button>
                                  </div>
                                  <Form.Control.Feedback type="invalid">
                                    Select Document
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Classroom 2</th>
                              <td>...</td>
                              <td>
                                <Field
                                  type="number"
                                  name={`infra_structure`}
                                  as={Form.Control}
                                />
                              </td>
                              <td>
                                <Form.Group>
                                  {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                  <div className="d-flex align-items-center gap-2">
                                    <Form.Control type="file" />
                                    <Button variant="primary">Upload</Button>
                                  </div>
                                  <Form.Control.Feedback type="invalid">
                                    Select Document
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                )}

                {false && (
                  <Card className="custom-card border border-primary">
                    <Card.Header>
                      <div
                        className="card-title"
                        style={{ textTransform: "none" }}
                      >
                        Common Particulars
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="table-responsive">
                        <Table className="text-nowrap table-striped">
                          <thead>
                            <tr>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Particulars
                              </th>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Required Area (As per norms)
                              </th>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Available Area
                              </th>
                              <th scope="col" style={{ textTransform: "none" }}>
                                Upload Captured the geo tagged Photo
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {props.stepInfo.fields.map((item, index) => {
                              console.log(item); // Log item to the console
                              return (
                                <tr key={index}>
                                  <th scope="row">{item.entity}</th>
                                  <td>{item.area}</td>
                                  <td>
                                    <Field
                                      type="number"
                                      name={`infra_structure[${index}]`}
                                      as={Form.Control}
                                    />
                                  </td>
                                  <td>
                                    <Form.Group>
                                      {/* <Form.Label>
                                  Upload Front View Photo of Building
                                </Form.Label> */}
                                      <div className="d-flex align-items-center gap-2">
                                        <Form.Control type="file" />
                                        <Button variant="primary">
                                          Upload
                                        </Button>
                                      </div>
                                      <Form.Control.Feedback type="invalid">
                                        Select Document
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                )}

                {false && (
                  <div className="invoice-notes text-danger">
                    <label className="main-content-label tx-13">Notes</label>
                    <p>
                      <ol>
                        <li>Upload Geo tagged Photo</li>
                        <li>
                          Geotagged photo may be taken from any apps having such
                          functionality, These geotagged photos must mention{" "}
                          <b>date, time, latitude and longitude.</b>
                        </li>
                      </ol>
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};
export default CivilInfrastructureDetails;


// export const Workshops = () => {
//   return (
//     <Card className="custom-card shadow border-info">
//       <Card.Header>
//         <div className="card-title" style={{ textTransform: "none" }}>
//           <h5> Workshop</h5>
//         </div>
//       </Card.Header>
//       <Card.Body>
        
//       </Card.Body>
//       {/* <Card.Footer>
//                       <Button>dsfdf</Button>
//                     </Card.Footer> */}
//     </Card>

    
//   );
// };