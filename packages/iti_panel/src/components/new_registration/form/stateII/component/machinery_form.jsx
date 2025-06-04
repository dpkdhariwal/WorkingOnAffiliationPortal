import { Fragment, useEffect } from "react";
import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReqSign from "../../comp/requiredSign";

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Table,
  Tab,
  Nav,
  Badge,
  Container,
  Offcanvas,
  Collapse,
  Dropdown,
  Navbar,
} from "react-bootstrap";

import Select from "react-select";
// import { Card, Col, Dropdown, DropdownDivider, Nav, Row, Tab } from 'react-bootstrap'

import { Formik, Field, FieldArray } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Stepper from "@keyvaluesystems/react-stepper";

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

export const Preference = [
  { value: "yes", label: "Yes" },
  { value: "No", label: "no" },
];
const percentage = 66;

const mteInfo = () => {
  const stage = useSelector((state) => state.reg.stepsII);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (step, index) => setCurrentStep(index);

  const initialStepsArr = [
    {
      stepLabel: "Fitter",
      stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
    },
    {
      stepLabel: "Electrician",
      stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
    },
  ];

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

  //   const onCategorySelected = (eventKey, e) => {
  //     console.log(eventKey, e);
  //   };

  const [activeKey, setActiveKey] = useState("first");
  const [extraData, setExtraData] = useState({
    title: "Machinery Shop",
    code: "MSM-003",
  });

  const tabInfoMap = {
    first: { title: "Trainees Tool Kit", code: "TTK-001", tool_name: "Plier" },
    second: {
      title: "Shop Tools & Equipment",
      code: "STE-002",
      tool_name: "Plier",
    },
    third: { title: "Machinery Shop", code: "MSM-003", tool_name: "Plier" },
  };

  const onCategorySelected = (selectedKey) => {
    setActiveKey(selectedKey);
    const data = tabInfoMap[selectedKey] || {};
    setExtraData(data);
    console.log("Selected Tab:", selectedKey);
    console.log("Extra Data:", data);
  };
const fitterTraineeTools = [
  "Ball Peen Hammer",
  "Cross Peen Hammer",
  "Scriber",
  "Try Square",
  "Centre Punch",
  "Chisels (Flat and Cross Cut)",
  "Hacksaw Frame and Blades",
  "File - Flat, Half Round, Round, Triangular",
  "Bench Vice",
  "Surface Plate",
  "Angle Plate",
  "V-Block with Clamp",
  "Calipers (Inside, Outside, Odd Leg)",
  "Steel Rule",
  "Vernier Caliper",
  "Micrometer (Outside)",
  "Combination Set",
  "Feeler Gauge",
  "Radius Gauge",
  "Taps and Tap Wrenches",
  "Dies and Die Holders",
  "Drill Bits",
  "Hand Drill Machine",
  "Bench Drill Machine",
  "Countersink and Counterbore Tools",
  "Allen Keys",
  "Spanners (Double Ended, Ring, Adjustable)",
  "Screw Drivers (Flat and Phillips)",
  "Pipe Wrench",
  "Torque Wrench",
  "Surface Gauge",
  "Dial Indicator with Magnetic Stand",
  "Reamer (Hand and Machine)",
  "Lathe Tool Holders",
  "Angle Protractor",
  "Bevel Gauge",
  "Marking Table",
  "Thread Plug and Ring Gauges",
  "Tap Extractor",
  "Oil Can",
  "Cold Set",
  "Pipe Cutter",
  "Measuring Tape",
  "Spirit Level",
  "Wire Gauge",
  "Steel Tape",
  "Plumb Bob",
  "Hammer (Soft Face, Mallet)"
];

const fitterShopTools = [
  "Bench Vice (Jaw Size 100 mm)",
  "Vee Blocks pair with clamps",
  "Surface Plate (Cast Iron 400 x 400 mm)",
  "Surface Gauge with dial indicator",
  "Angle Plate (100 x 100 x 115 mm)",
  "Universal Bevel Protractor with Blade",
  "Sine Bar 125 mm",
  "Combination Set",
  "Try Square (Engineer’s 150 mm blade)",
  "Vernier Height Gauge (0-300 mm)",
  "Micrometer (Outside 0-25 mm)",
  "Micrometer (Inside 5-30 mm)",
  "Depth Micrometer (0-150 mm)",
  "Vernier Caliper (0-300 mm)",
  "Dial Caliper (0-150 mm)",
  "Dial Indicator with Magnetic Stand",
  "Steel Rule (300 mm)",
  "Scriber (150 mm)",
  "Divider and Caliper (Inside & Outside)",
  "Files of different shapes and grades (Set)",
  "Hacksaw Frame Adjustable",
  "Ball Peen Hammer (0.5 kg)",
  "Cross Peen Hammer (0.25 kg)",
  "Chisels (Flat, Cross-cut, Round nose)",
  "Centre Punch (4 mm dia x 100 mm)",
  "Dot Punch (4 mm dia x 100 mm)",
  "Drill Machine Bench Type (12 mm capacity)",
  "Drill Bits (Assorted sizes)",
  "Taps and Dies (Metric set M4 to M12)",
  "Tap Wrenches and Die Handles",
  "Reamers (Hand and Machine - 6 mm to 20 mm)",
  "Vices (Leg vice, Hand vice, Pipe vice)",
  "Adjustable Spanner (200 mm)",
  "Ring and Double End Spanner set",
  "Allen Key Set (2 mm to 12 mm)",
  "Torque Wrench",
  "Grinding Machine (Pedestal and Bench)",
  "Hand Grinder (Portable)",
  "Power Saw / Jigsaw",
  "Welding Machine (Arc & Gas)",
  "Measuring Tape (3 m)",
  "Spirit Level (6 inches)",
  "Feeler Gauge (Set of 20 blades)",
  "Wire Gauge (Metric and SWG)",
  "Marking Table",
  "Tapping Stand",
  "Clamps (C-clamp, Toolmakers clamp, G-clamp)",
  "Parallel Blocks",
  "Thread Pitch Gauge (Metric & Inch)",
  "Angle Gauge Set",
  "Slip Gauge Set"
];


const fitterMachineryList = [
  "Lathe Machine (Centre Lathe 150 mm swing, 1 m bed length)",
  "Drilling Machine (Pillar type, up to 25 mm capacity)",
  "Drilling Machine (Bench type, up to 12 mm capacity)",
  "Power Hacksaw Machine",
  "Grinding Machine (Pedestal type double ended)",
  "Surface Grinder",
  "Shaping Machine (250 mm stroke)",
  "Slotting Machine",
  "Milling Machine (Horizontal / Vertical / Universal)",
  "Welding Transformer (Arc welding set 300 Amps)",
  "Gas Welding Set with accessories (Oxy-Acetylene)",
  "Compressor with accessories (2 HP)",
  "Hydraulic Press (Hand operated, 10 Tons)",
  "Tapping cum Drilling Machine",
  "Tool and Cutter Grinder",
  "Flexible Shaft Grinder",
  "Bench Shearing Machine (Hand operated)",
  "Power Press (5 Tons)",
  "Universal Testing Machine (Optional for testing)",
  "CNC Lathe Trainer (if applicable)",
  "CNC Milling Trainer (if applicable)",
  "Pipe Bending Machine",
  "Portable Hand Drill Machine (6 mm to 10 mm)",
  "Bench Grinder",
  "Arc Welding Rectifier (with accessories)",
  "Gas Cutting Torch with Regulators and Safety valves"
];


  return (
    <Fragment>
      {true && (
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
                    Tradewise Machinery/Tools/Equipment Details
                  </div>
                </Card.Header>
                <Card.Body>
                  <Stepper
                    steps={initialStepsArr}
                    currentStepIndex={currentStep}
                    // orientation="vertical"
                    orientation="horizontal"
                    labelPosition="top"
                    onStepClick={handleStepClick}
                    stepContent={(step) => (
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          // margin: "10px",
                          border: "1px solid black",
                          // display: "flex",
                          // justifyContent: "center",
                          // alignItems: "center",
                          padding: "5px",
                        }}
                      >
                        <Tab.Container
                          id="left-tabs-example"
                          activeKey={activeKey}
                          onSelect={onCategorySelected}
                        >
                          <Row>
                            <Col xl={4}>
                              <Nav
                                className="nav-tabs flex-column nav-style-5"
                                role="tablist"
                                defaultActiveKey="first"
                              >
                                <Nav.Item style={{ width: "100%" }}>
                                  <Nav.Link eventKey="first">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span>
                                        <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
                                        Trainees Tool Kit
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
                                <Nav.Item style={{ width: "100%" }}>
                                  <Nav.Link eventKey="second">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span>
                                        <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
                                        Shop Tools & Equipment
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
                                <Nav.Item style={{ width: "100%" }}>
                                  <Nav.Link eventKey="third">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <span>
                                        <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
                                        Machinery Shop Machinery
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
                              </Nav>
                            </Col>
                            <Col xl={8}>
                              <Tab.Content>
                                <Tab.Pane eventKey="first" role="tabpanel">
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
                                    {({
                                      handleSubmit,
                                      setFieldValue,
                                      values,
                                      errors,
                                      touched,
                                    }) => (
                                      <Form noValidate onSubmit={handleSubmit}>
                                        
                                        {fitterTraineeTools.map((item, index) => {return (
                                          <Card key={index} className="custom-card border border-primary">
                                          <Badge
                                            bg="dark"
                                            pill
                                            style={{
                                              position: "absolute",
                                              right: 5,
                                              top: 5,
                                            }}
                                          >
                                            {extraData.title}
                                          </Badge>

                                          <Card.Header>
                                            <div className="d-flex justify-content-between mb-3">
                                              <div className="p-2">
                                                <div
                                                  className="card-title"
                                                  style={{
                                                    textTransform: "none",
                                                  }}
                                                >
                                                  {item}
                                                </div>
                                              </div>
                                              <div className="p-2"></div>
                                            </div>
                                          </Card.Header>
                                          <Card.Body>
                                            <div className="mb-4">
                                              <Row className="align-items-end">
                                                <Col md={4}>
                                                  <Form.Group controlId="requiredQuantity">
                                                    <Form.Label>
                                                      Required as per norms{" "}
                                                      <ReqSign />
                                                    </Form.Label>
                                                    <Field
                                                      type="number"
                                                      name="infra_structure_required"
                                                      as={Form.Control}
                                                      value={10}
                                                      disabled
                                                    />
                                                  </Form.Group>
                                                </Col>

                                                <Col md={4}>
                                                  <Form.Group controlId="availability">
                                                    <Form.Label>
                                                      Availability
                                                      <ReqSign />
                                                    </Form.Label>
                                                    <Select
                                                      options={Preference}
                                                      placeholder="Select Availability"
                                                      classNamePrefix="Select2"
                                                      className="search-panel"
                                                    />
                                                  </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                  <Form.Group controlId="availableQuantity">
                                                    <Form.Label>
                                                      Enter the Available
                                                      Quantity
                                                      <ReqSign />
                                                    </Form.Label>
                                                    <Field
                                                      type="number"
                                                      name="infra_structure_available"
                                                      as={Form.Control}
                                                    />
                                                  </Form.Group>
                                                </Col>
                                              </Row>
                                            </div>
                                          </Card.Body>
                                        </Card>)})}
                                        
                                       
                                      </Form>
                                    )}
                                  </Formik>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second" role="tabpanel">
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
                                    {({
                                      handleSubmit,
                                      setFieldValue,
                                      values,
                                      errors,
                                      touched,
                                    }) => (
                                      <Form noValidate onSubmit={handleSubmit}>

                                        {fitterShopTools.map((item, index)=>{return(<Card key={index} className="custom-card border border-primary">
                                          <Badge
                                            bg="dark"
                                            pill
                                            style={{
                                              position: "absolute",
                                              right: 5,
                                              top: 5,
                                            }}
                                          >
                                            {extraData.title}
                                          </Badge>

                                          <Card.Header>
                                            <div className="d-flex justify-content-between mb-3">
                                              <div className="p-2">
                                                <div
                                                  className="card-title"
                                                  style={{
                                                    textTransform: "none",
                                                  }}
                                                >
                                                  {item}
                                                </div>
                                              </div>
                                              <div className="p-2"></div>
                                            </div>
                                          </Card.Header>
                                          <Card.Body>
                                            <div className="mb-4">
                                              <Row className="align-items-end">
                                                <Col md={4}>
                                                  <Form.Group controlId="requiredQuantity">
                                                    <Form.Label>
                                                      Required as per norms
                                                      <ReqSign />
                                                    </Form.Label>
                                                    <Field
                                                      type="number"
                                                      name="infra_structure_required"
                                                      as={Form.Control}
                                                      value={10}
                                                      disabled
                                                    />
                                                  </Form.Group>
                                                </Col>

                                                <Col md={4}>
                                                  <Form.Group controlId="availability">
                                                    <Form.Label>
                                                      Availability
                                                      <ReqSign />
                                                    </Form.Label>
                                                    <Select
                                                      options={Preference}
                                                      placeholder="Select Availability"
                                                      classNamePrefix="Select2"
                                                      className="search-panel"
                                                    />
                                                  </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                  <Form.Group controlId="availableQuantity">
                                                    <Form.Label>
                                                      Enter the Available
                                                      Quantity
                                                      <ReqSign />
                                                    </Form.Label>
                                                    <Field
                                                      type="number"
                                                      name="infra_structure_available"
                                                      as={Form.Control}
                                                    />
                                                  </Form.Group>
                                                </Col>
                                              </Row>
                                            </div>
                                          </Card.Body>
                                        </Card>)})}
                                        
                                      </Form>
                                    )}
                                  </Formik>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third" role="tabpanel">
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
                                    {({
                                      handleSubmit,
                                      setFieldValue,
                                      values,
                                      errors,
                                      touched,
                                    }) => (


                                      <Form  noValidate onSubmit={handleSubmit}>

                                      {fitterMachineryList.map((item, index)=>{return (<Card key={index} className="custom-card border border-primary">
                                          <Badge
                                            bg="dark"
                                            pill
                                            style={{
                                              position: "absolute",
                                              right: 5,
                                              top: 5,
                                            }}
                                          >
                                            {extraData.title}
                                          </Badge>

                                          <Card.Header>
                                            <div className="d-flex justify-content-between mb-3">
                                              <div className="p-2">
                                                <div
                                                  className="card-title"
                                                  style={{
                                                    textTransform: "none",
                                                  }}
                                                >
                                                  {item}
                                                </div>
                                              </div>
                                              <div className="p-2"></div>
                                            </div>
                                          </Card.Header>
                                          <Card.Body>
                                            <div className="mb-4">
                                              <Row className="align-items-end">
                                                <Col md={4}>
                                                  <Form.Group controlId="requiredQuantity">
                                                    <Form.Label>
                                                      Required as per norms
                                                      <ReqSign />
                                                    </Form.Label>
                                                    <Field
                                                      type="number"
                                                      name="infra_structure_required"
                                                      as={Form.Control}
                                                      value={10}
                                                      disabled
                                                    />
                                                  </Form.Group>
                                                </Col>

                                                <Col md={4}>
                                                  <Form.Group controlId="availability">
                                                    <Form.Label>
                                                      Availability
                                                      <ReqSign />
                                                    </Form.Label>
                                                    <Select
                                                      options={Preference}
                                                      placeholder="Select Availability"
                                                      classNamePrefix="Select2"
                                                      className="search-panel"
                                                    />
                                                  </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                  <Form.Group controlId="availableQuantity">
                                                    <Form.Label>
                                                      Enter the Available
                                                      Quantity
                                                      <ReqSign />
                                                    </Form.Label>
                                                    <Field
                                                      type="number"
                                                      name="infra_structure_available"
                                                      as={Form.Control}
                                                    />
                                                  </Form.Group>
                                                </Col>
                                              </Row>
                                            </div>
                                          </Card.Body>
                                        </Card>)})}


                                        
                                      </Form>
                                    )}
                                  </Formik>
                                </Tab.Pane>
                              </Tab.Content>
                            </Col>
                          </Row>
                        </Tab.Container>
                      </div>
                    )}
                  />
                </Card.Body>
              </Card>
            </Form>
          )}
        </Formik>
      )}
    </Fragment>
  );
};

export default mteInfo;
