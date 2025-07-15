import { Fragment, useEffect } from "react";
import React, { useState, useRef } from "react";

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
import { Form as FormikForm, ErrorMessage } from "formik";

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

import { validationSchema } from "../../../../reducers/stageII_document_upload";

import {
  geo_tagged_photo_of_machinery_tools_equipments as docs1,
  gst_invoices_for_major_machinery_purchase_and_payment_proof as docs2,
  UPDATE_STAGE_II_DOCUMENT_UPLOAD,
} from "../../../../constants";

const DocumentUploads = () => {
  const dispatch = useDispatch();

  const formikRef = useRef();

  const submit = (values) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the form data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed – now show loading or save directly
        Swal.fire({
          title: "Saving...",
          didOpen: () => {
            Swal.showLoading();
            dispatch({
              type: UPDATE_STAGE_II_DOCUMENT_UPLOAD,
              payload: values,
            });
            dispatch({ type: "set_filled_stepII", payload: { step: 5 } });
            dispatch({ type: "reg_set_active_stepII", payload: { step: 5 } });
            setActive(reg.steps[5]);
          },
        });
      } else {
        console.log("User cancelled save");
      }
    });
  };

  const initial_values = useSelector(
    (state) => state.stageII_document_Uploads_Reducer
  );


  return (
    <Fragment>
       <Formik
          innerRef={formikRef}
          initialValues={initial_values}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Values", values);
            submit(values);
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
                            Geo tagged photo <ReqSign />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {docs1.map((item, index) => {
                          const fileField = `${item.tradeId}_mte_geo_tagged_photo_${index}`;
                          return (
                            <tr key={index}>
                              <th scope="row">{item.tradeName}</th>
                              <td>1</td>
                              <td>
                                {/* {fileField} */}

                                <input
                                  type="file"
                                  name={fileField}
                                  className="form-control"
                                  onChange={(event) => {
                                    setFieldValue(
                                      fileField,
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                                <div className="text-danger">
                                  <ErrorMessage
                                    name={fileField}
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
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
                            for each Trade) <ReqSign />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {docs2.map((item, index) => {
                          const fileField = `${item.tradeId}_mte_gst_invoices_${index}`;

                          return (
                            <tr key={index}>
                              <th scope="row">{item.tradeName}</th>
                              <td>
                                <input
                                  type="file"
                                  name={fileField}
                                  className="form-control"
                                  onChange={(event) => {
                                    setFieldValue(
                                      fileField,
                                      event.currentTarget.files[0]
                                    );
                                  }}
                                />
                                <div className="text-danger">
                                  <ErrorMessage
                                    name={fileField}
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>

              <Card className="custom-card border border-primary">
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
                      <strike>{`Institute's self-declaration of compliance with Affiliation Norms and acknowledgment of responsibilities, as per Annexure-6`}</strike>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <Button
                    onClick={() => formikRef.current?.submitForm()}
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

export default DocumentUploads;
