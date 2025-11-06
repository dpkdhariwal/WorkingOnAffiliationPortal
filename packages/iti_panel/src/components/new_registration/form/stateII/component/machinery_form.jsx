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

import { STEPPER_STYLE } from "affserver";

import { ItLabMte } from "../../stateII/ItLabMte"
import { useLocation } from "react-router-dom";
import { STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS } from "affserver";
import { setAppFlow } from "../../../../../db/users";

import * as ap from "@/services/applicant/index";
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
      stepLabel: "IT Lab",
      stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
      stepFor: "IT Lab"
    },
    ...[{
      stepLabel: "Fitter",
      stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
      stepFor: "trade"
    },
    {
      stepLabel: "Electrician",
      stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
      stepFor: "trade"
    },]
  ];



  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");


  const setStepContent = (step, stepIndex) => {
    switch (step.stepFor) {
      case "IT Lab":
        return (<ItLabMte />)
      // case "trade":
      //   return (<div
      //     style={{
      //       height: "100%",
      //       width: "100%",
      //       // margin: "10px",
      //       border: "1px solid black",
      //       // display: "flex",
      //       // justifyContent: "center",
      //       // alignItems: "center",
      //       padding: "5px",
      //     }}
      //   >
      //     <Tab.Container
      //       id="left-tabs-example"
      //       activeKey={activeKey}
      //       onSelect={onCategorySelected}
      //     >
      //       <Row>
      //         <Col xl={4}>
      //           <Nav
      //             className="nav-tabs flex-column nav-style-5"
      //             role="tablist"
      //             defaultActiveKey="first"
      //           >
      //             <Nav.Item style={{ width: "100%" }}>
      //               <Nav.Link eventKey="first">
      //                 <div className="d-flex justify-content-between align-items-center">
      //                   <span>
      //                     <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
      //                     Trainees Tool Kit
      //                   </span>
      //                   <div style={{ width: 30, height: 30 }}>
      //                     <CircularProgressbar
      //                       value={percentage}
      //                       text={`${percentage}%`}
      //                     />
      //                   </div>
      //                 </div>
      //               </Nav.Link>
      //             </Nav.Item>
      //             <Nav.Item style={{ width: "100%" }}>
      //               <Nav.Link eventKey="second">
      //                 <div className="d-flex justify-content-between align-items-center">
      //                   <span>
      //                     <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
      //                     Shop Tools & Equipment
      //                   </span>
      //                   <div style={{ width: 30, height: 30 }}>
      //                     <CircularProgressbar
      //                       value={percentage}
      //                       text={`${percentage}%`}
      //                     />
      //                   </div>
      //                 </div>
      //               </Nav.Link>
      //             </Nav.Item>
      //             <Nav.Item style={{ width: "100%" }}>
      //               <Nav.Link eventKey="third">
      //                 <div className="d-flex justify-content-between align-items-center">
      //                   <span>
      //                     <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
      //                     Machinery Shop Machinery
      //                   </span>
      //                   <div style={{ width: 30, height: 30 }}>
      //                     <CircularProgressbar
      //                       value={percentage}
      //                       text={`${percentage}%`}
      //                     />
      //                   </div>
      //                 </div>
      //               </Nav.Link>
      //             </Nav.Item>
      //           </Nav>
      //         </Col>
      //         <Col xl={8}>
      //           <Tab.Content>
      //             <Tab.Pane eventKey="first" role="tabpanel">
      //               <Formik
      //                 initialValues={
      //                   {
      //                     // land_documents: initialLandDocs,
      //                     // lease_deed_document: lease_deed_document,
      //                   }
      //                 }
      //                 validationSchema={schema}
      //                 onSubmit={(values) => {
      //                   console.log("Form Values", values);
      //                   // Swal.fire({
      //                   //   title: "Saving on Local Storage",
      //                   //   html: "Please wait...",
      //                   //   timer: 2000,
      //                   //   timerProgressBar: true,
      //                   //   didOpen: () => {
      //                   //     Swal.showLoading();
      //                   //     dispatch({ type: "set_comp_stateI_III", payload: values });
      //                   //   },
      //                   // }).then(() => {
      //                   //   navigate(
      //                   //     "?stage=1&form_id=Basic Details of Applicant  Organization"
      //                   //   );
      //                   // });
      //                 }}
      //               >
      //                 {({
      //                   handleSubmit,
      //                   setFieldValue,
      //                   values,
      //                   errors,
      //                   touched,
      //                 }) => (
      //                   <Form noValidate onSubmit={handleSubmit}>

      //                     {fitterTraineeTools.map((item, index) => {
      //                       return (
      //                         <Card key={index} className="custom-card border border-primary">
      //                           <Badge
      //                             bg="dark"
      //                             pill
      //                             style={{
      //                               position: "absolute",
      //                               right: 5,
      //                               top: 5,
      //                             }}
      //                           >
      //                             {extraData.title}
      //                           </Badge>

      //                           <Card.Header>
      //                             <div className="d-flex justify-content-between mb-3">
      //                               <div className="p-2">
      //                                 <div
      //                                   className="card-title"
      //                                   style={{
      //                                     textTransform: "none",
      //                                   }}
      //                                 >
      //                                   {item}
      //                                 </div>
      //                               </div>
      //                               <div className="p-2"></div>
      //                             </div>
      //                           </Card.Header>
      //                           <Card.Body>
      //                             <div className="mb-4">
      //                               <Row className="align-items-end">
      //                                 <Col md={4}>
      //                                   <Form.Group controlId="requiredQuantity">
      //                                     <Form.Label>
      //                                       Required as per norms{" "}
      //                                       <ReqSign />
      //                                     </Form.Label>
      //                                     <Field
      //                                       type="number"
      //                                       name="infra_structure_required"
      //                                       as={Form.Control}
      //                                       value={10}
      //                                       disabled
      //                                     />
      //                                   </Form.Group>
      //                                 </Col>

      //                                 <Col md={4}>
      //                                   <Form.Group controlId="availability">
      //                                     <Form.Label>
      //                                       Availability
      //                                       <ReqSign />
      //                                     </Form.Label>
      //                                     <Select
      //                                       options={Preference}
      //                                       placeholder="Select Availability"
      //                                       classNamePrefix="Select2"
      //                                       className="search-panel"
      //                                     />
      //                                   </Form.Group>
      //                                 </Col>
      //                                 <Col md={4}>
      //                                   <Form.Group controlId="availableQuantity">
      //                                     <Form.Label>
      //                                       Enter the Available
      //                                       Quantity
      //                                       <ReqSign />
      //                                     </Form.Label>
      //                                     <Field
      //                                       type="number"
      //                                       name="infra_structure_available"
      //                                       as={Form.Control}
      //                                     />
      //                                   </Form.Group>
      //                                 </Col>
      //                               </Row>
      //                             </div>
      //                           </Card.Body>
      //                         </Card>)
      //                     })}


      //                   </Form>
      //                 )}
      //               </Formik>
      //             </Tab.Pane>
      //             <Tab.Pane eventKey="second" role="tabpanel">
      //               <Formik
      //                 initialValues={
      //                   {
      //                     // land_documents: initialLandDocs,
      //                     // lease_deed_document: lease_deed_document,
      //                   }
      //                 }
      //                 validationSchema={schema}
      //                 onSubmit={(values) => {
      //                   console.log("Form Values", values);
      //                   // Swal.fire({
      //                   //   title: "Saving on Local Storage",
      //                   //   html: "Please wait...",
      //                   //   timer: 2000,
      //                   //   timerProgressBar: true,
      //                   //   didOpen: () => {
      //                   //     Swal.showLoading();
      //                   //     dispatch({ type: "set_comp_stateI_III", payload: values });
      //                   //   },
      //                   // }).then(() => {
      //                   //   navigate(
      //                   //     "?stage=1&form_id=Basic Details of Applicant  Organization"
      //                   //   );
      //                   // });
      //                 }}
      //               >
      //                 {({
      //                   handleSubmit,
      //                   setFieldValue,
      //                   values,
      //                   errors,
      //                   touched,
      //                 }) => (
      //                   <Form noValidate onSubmit={handleSubmit}>

      //                     {fitterShopTools.map((item, index) => {
      //                       return (<Card key={index} className="custom-card border border-primary">
      //                         <Badge
      //                           bg="dark"
      //                           pill
      //                           style={{
      //                             position: "absolute",
      //                             right: 5,
      //                             top: 5,
      //                           }}
      //                         >
      //                           {extraData.title}
      //                         </Badge>

      //                         <Card.Header>
      //                           <div className="d-flex justify-content-between mb-3">
      //                             <div className="p-2">
      //                               <div
      //                                 className="card-title"
      //                                 style={{
      //                                   textTransform: "none",
      //                                 }}
      //                               >
      //                                 {item}
      //                               </div>
      //                             </div>
      //                             <div className="p-2"></div>
      //                           </div>
      //                         </Card.Header>
      //                         <Card.Body>
      //                           <div className="mb-4">
      //                             <Row className="align-items-end">
      //                               <Col md={4}>
      //                                 <Form.Group controlId="requiredQuantity">
      //                                   <Form.Label>
      //                                     Required as per norms
      //                                     <ReqSign />
      //                                   </Form.Label>
      //                                   <Field
      //                                     type="number"
      //                                     name="infra_structure_required"
      //                                     as={Form.Control}
      //                                     value={10}
      //                                     disabled
      //                                   />
      //                                 </Form.Group>
      //                               </Col>

      //                               <Col md={4}>
      //                                 <Form.Group controlId="availability">
      //                                   <Form.Label>
      //                                     Availability
      //                                     <ReqSign />
      //                                   </Form.Label>
      //                                   <Select
      //                                     options={Preference}
      //                                     placeholder="Select Availability"
      //                                     classNamePrefix="Select2"
      //                                     className="search-panel"
      //                                   />
      //                                 </Form.Group>
      //                               </Col>
      //                               <Col md={4}>
      //                                 <Form.Group controlId="availableQuantity">
      //                                   <Form.Label>
      //                                     Enter the Available
      //                                     Quantity
      //                                     <ReqSign />
      //                                   </Form.Label>
      //                                   <Field
      //                                     type="number"
      //                                     name="infra_structure_available"
      //                                     as={Form.Control}
      //                                   />
      //                                 </Form.Group>
      //                               </Col>
      //                             </Row>
      //                           </div>
      //                         </Card.Body>
      //                       </Card>)
      //                     })}

      //                   </Form>
      //                 )}
      //               </Formik>
      //             </Tab.Pane>
      //             <Tab.Pane eventKey="third" role="tabpanel">
      //               <Formik
      //                 initialValues={
      //                   {
      //                     // land_documents: initialLandDocs,
      //                     // lease_deed_document: lease_deed_document,
      //                   }
      //                 }
      //                 validationSchema={schema}
      //                 onSubmit={(values) => {
      //                   console.log("Form Values", values);
      //                   // Swal.fire({
      //                   //   title: "Saving on Local Storage",
      //                   //   html: "Please wait...",
      //                   //   timer: 2000,
      //                   //   timerProgressBar: true,
      //                   //   didOpen: () => {
      //                   //     Swal.showLoading();
      //                   //     dispatch({ type: "set_comp_stateI_III", payload: values });
      //                   //   },
      //                   // }).then(() => {
      //                   //   navigate(
      //                   //     "?stage=1&form_id=Basic Details of Applicant  Organization"
      //                   //   );
      //                   // });
      //                 }}
      //               >
      //                 {({
      //                   handleSubmit,
      //                   setFieldValue,
      //                   values,
      //                   errors,
      //                   touched,
      //                 }) => (


      //                   <Form noValidate onSubmit={handleSubmit}>

      //                     {fitterMachineryList.map((item, index) => {
      //                       return (<Card key={index} className="custom-card border border-primary">
      //                         <Badge
      //                           bg="dark"
      //                           pill
      //                           style={{
      //                             position: "absolute",
      //                             right: 5,
      //                             top: 5,
      //                           }}
      //                         >
      //                           {extraData.title}
      //                         </Badge>

      //                         <Card.Header>
      //                           <div className="d-flex justify-content-between mb-3">
      //                             <div className="p-2">
      //                               <div
      //                                 className="card-title"
      //                                 style={{
      //                                   textTransform: "none",
      //                                 }}
      //                               >
      //                                 {item}
      //                               </div>
      //                             </div>
      //                             <div className="p-2"></div>
      //                           </div>
      //                         </Card.Header>
      //                         <Card.Body>
      //                           <div className="mb-4">
      //                             <Row className="align-items-end">
      //                               <Col md={4}>
      //                                 <Form.Group controlId="requiredQuantity">
      //                                   <Form.Label>
      //                                     Required as per norms
      //                                     <ReqSign />
      //                                   </Form.Label>
      //                                   <Field
      //                                     type="number"
      //                                     name="infra_structure_required"
      //                                     as={Form.Control}
      //                                     value={10}
      //                                     disabled
      //                                   />
      //                                 </Form.Group>
      //                               </Col>

      //                               <Col md={4}>
      //                                 <Form.Group controlId="availability">
      //                                   <Form.Label>
      //                                     Availability
      //                                     <ReqSign />
      //                                   </Form.Label>
      //                                   <Select
      //                                     options={Preference}
      //                                     placeholder="Select Availability"
      //                                     classNamePrefix="Select2"
      //                                     className="search-panel"
      //                                   />
      //                                 </Form.Group>
      //                               </Col>
      //                               <Col md={4}>
      //                                 <Form.Group controlId="availableQuantity">
      //                                   <Form.Label>
      //                                     Enter the Available
      //                                     Quantity
      //                                     <ReqSign />
      //                                   </Form.Label>
      //                                   <Field
      //                                     type="number"
      //                                     name="infra_structure_available"
      //                                     as={Form.Control}
      //                                   />
      //                                 </Form.Group>
      //                               </Col>
      //                             </Row>
      //                           </div>
      //                         </Card.Body>
      //                       </Card>)
      //                     })}
      //                   </Form>
      //                 )}
      //               </Formik>
      //             </Tab.Pane>
      //           </Tab.Content>
      //         </Col>
      //       </Row>
      //     </Tab.Container>
      //   </div>)
      default:
        return (<h5>Sowething Went Wrong</h5>)
    }
  }
  return (
    <Fragment>
      {true && (
        <Card className="custom-card border border-primary">
          <Card.Header>
            <div className="card-title" style={{ textTransform: "none" }}>
              Machinery/Tools/Equipment Details
            </div>
          </Card.Header>
          <Card.Body>
            <Stepper
              styles={STEPPER_STYLE}
              steps={initialStepsArr}
              currentStepIndex={currentStep}
              // orientation="vertical"
              orientation="horizontal"
              labelPosition="top"
              onStepClick={handleStepClick}
              stepContent={setStepContent}
            />
          </Card.Body>
          {/* <Card.Footer>
                  <Button onClick={markascomplete}>Mark as Complete</Button>
                </Card.Footer> */}
        </Card>
        // <Formik
        //   initialValues={
        //     {
        //       // land_documents: initialLandDocs,
        //       // lease_deed_document: lease_deed_document,
        //     }
        //   }
        //   validationSchema={schema}
        //   onSubmit={(values) => {
        //     console.log("Form Values", values);
        //   }}
        // >
        //   {({ handleSubmit, setFieldValue, values, errors, touched }) => (
        //     <Form noValidate onSubmit={handleSubmit}>

        //     </Form>
        //   )}
        // </Formik>
      )}
    </Fragment>
  );
};

export default mteInfo;
