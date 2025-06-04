import { Fragment, useEffect } from "react";
import React, { useState } from "react";

import List from "./component/list";

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Table,
} from "react-bootstrap";
import Select from "react-select";

import { Formik, Field, FieldArray } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Stepper from "@keyvaluesystems/react-stepper";

import MTE from "./component/machinery_form";
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

export const Preference = [
  { value: "yes", label: "Yes" },
  { value: "No", label: "no" },
];

const DocumentUploads = () => {
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
             

              <Card
                className="custom-card border border-primary"
                style={{ marginTop: "10px" }}
              >
                <Card.Header>
                  <div className="card-title" style={{ textTransform: "none" }}>
                    Geo tagged photo of Machinery/Tools/Equipments (Single PDF
                    for each Unit)
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <Table className="text-nowrap ">
                      <thead>
                        <tr>
                          <th scope="col" style={{ textTransform: "none" }}>
                            Trade Name
                          </th>
                          <th scope="col" style={{ textTransform: "none" }}>
                            Unit
                          </th>
                          <th scope="col" style={{ textTransform: "none" }}>
                            Geo tagged photo <ReqSign/>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3].map((item, index) => (
                          <tr key={index}>
                            <th scope="row">Fitter</th>
                            <td>1</td>
                            <td>
                              <Form.Group>
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
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
              <Card
                className="custom-card border border-primary"
                style={{ marginTop: "10px" }}
              >
                <Card.Header>
                  <div className="card-title" style={{ textTransform: "none" }}>
                    GST Invoices for Major Machinery Purchase and Payment proof
                    (Bill amount > Rs. 10,000)(single PDF for each Trade)
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <Table className="text-nowrap ">
                      <thead>
                        <tr>
                          <th scope="col" style={{ textTransform: "none" }}>
                            Trade Name
                          </th>
                          <th scope="col" style={{ textTransform: "none" }}>
                            Select GST Invoices for Major Machinery Purchase and
                            Payment proof (Bill amount > Rs. 10,000)(single PDF
                            for each Trade) <ReqSign/>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {["Electrician", "Fitter"].map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{item}</th>
                            <td>
                              <Form.Group>
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
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Form>
          )}
        </Formik>
      )}
    </Fragment>
  );
};

export default DocumentUploads;


