import { Fragment, useEffect } from "react";
import React, { useState, useRef, createContext } from "react";

import List from "./component/list";

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Table,
  Modal
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

import { STAGE_II__FEE_PAID, STAGE_II__FEE_EXEMPTED } from "affserver";
import { useLocation } from "react-router-dom";

import { STAGE_II_DOCUMENT_UPLAOD } from "affserver";

import { setAppFlow } from "../../../../db/users";

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
} from "affserver";
import * as C from "affserver";
import * as ap from "@/services/applicant/index";
import { Navigations } from "@/components/Assessment/components";

import { FileField2 } from "@/components/formik/Inputs/FileField2";
import { viewFile } from "@/helpers";
export const FormContext = createContext();
const DocumentUploads = ({ nav, step = {}, setActive, refreshSteps }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const [modalShow, setModalShow] = useState(false);
  const [initialValues, setInitialValues] = useState(C.st2.DocumentsUpload.initialValue);
  const formikRef = useRef();


  const submitNow = async () => {
    console.log("called");
    setModalShow(false);
    try {
      Swal.fire({
        title: "Saving...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      });

      const { values, errors } = formikRef.current;
      await ap.saveDocumentNcompleteStageII(values, appId);
      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Saved Successfully!",
        text: "Your data has been saved successfully.",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then(() => {
        navigate('/dashboard/AppList/'); // reloads current route
      });
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "Something went wrong while saving. Please try again.",
      });
      console.error(error);
    }
    // Swal.fire({
    //   title: "Saving...",
    //   didOpen: () => {
    //     Swal.showLoading();
    //     const { values, errors } = formikRef.current;
    //     ap.saveDocumentNcompleteStageII(values, appId);
    //     Swal.close();
    //   },
    // });
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await ap.getDocuments(appId);
        const data = resp.data;
        setInitialValues(data);  // update initial values
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [appId]);


  const onNext = async () => {
    try {
      const { values, errors } = formikRef.current;
      await formikRef.current.submitForm();
      await formikRef.current.validateForm();

      const { isValid } = formikRef.current;
      console.log(formikRef.current);

      if (isValid === false) {
        Swal.fire({
          icon: "error",
          title: "Fill the Form",
          text: "Please Complete the form filling stage",
        });
        throw new Error("Form validation failed: form is not valid.");
      }
      setModalShow(true);
    } catch (error) {
      console.error(error);
      setModalShow(false);
      Swal.fire({
        icon: "warning",
        title: "Fill the form",
        showConfirmButton: true,
        confirmButtonText: "OK",
        allowOutsideClick: false
      });
    }
  }

  return (
    <Fragment>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={C.st2.DocumentsUpload.ValSchema}
        onSubmit={(values) => {
          console.log("Formik submitted:", values);
        }}>
        {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
          <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue }}>
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
                    <FieldArray name="mte_photos_per_unit">
                      <Table className="text-nowrap ">
                        <thead>
                          <tr>
                            <th scope="col" style={{ textTransform: "none" }}>
                              Slno
                            </th>
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
                          {values.mte_photos_per_unit.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <th scope="row">{item?.tradeInfo?.trade_name}</th>
                                <td>1</td>
                                <td>
                                  <FileField2
                                    // label="If Yes, Upload Supporting Government Notification/Order/Circular"
                                    name={`mte_photos_per_unit[${index}].photo`}
                                    mandatory
                                    accept=".pdf,.jpg,.png"
                                    context={FormContext}
                                    onClickViewFileButton={() => viewFile(values.mte_photos_per_unit[index].photo)}
                                  />

                                  {/* <input
                                    type="file"
                                    name={`mte_photos_per_unit[${index}].photo`}
                                    className="form-control"
                                    onChange={(event) => {
                                      setFieldValue(
                                        `mte_photos_per_unit[${index}].photo`,
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                  <ErrorMessage
                                    name={`mte_photos_per_unit[${index}].photo`}
                                    component="div"
                                    className="text-danger"
                                  /> */}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </FieldArray>

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
                    <FieldArray name="gst_invoices">
                      <Table className="text-nowrap ">
                        <thead>
                          <tr>
                            <th scope="col" style={{ textTransform: "none" }}>
                              Slno
                            </th>
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
                          {values.gst_invoices.map((item, index) => {
                            const fileField = `${item.tradeId}_mte_gst_invoices_${index}`;

                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>

                                <th scope="row">{item?.tradeInfo?.trade_name}</th>
                                <td>
                                  <FileField2
                                    // label="If Yes, Upload Supporting Government Notification/Order/Circular"
                                    name={`gst_invoices[${index}].document`}
                                    mandatory
                                    accept=".pdf,.jpg,.png"
                                    context={FormContext}
                                    onClickViewFileButton={() => viewFile(values.gst_invoices[index].document)}
                                  />

                                  {/* <input
                                    type="file"
                                    name={`gst_invoices[${index}].document`}
                                    className="form-control"
                                    onChange={(event) => {
                                      setFieldValue(
                                        `gst_invoices[${index}].document`,
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                  <ErrorMessage
                                    name={`gst_invoices[${index}].document`}
                                    component="div"
                                    className="text-danger"
                                  /> */}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </FieldArray>
                  </div>
                </Card.Body>
              </Card>

              <Card className="custom-card border border-primary">
                <Card.Body>
                  <div className="form-check">
                    <Field
                      type="checkbox"
                      name="iaccept"
                      id="iaccept"
                      className="form-check-input"
                    />
                    <label htmlFor="iaccept" className="form-check-label ms-2">
                      Self Declaration <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>

                  <ErrorMessage
                    name="iaccept"
                    component="div"
                    className="text-danger mt-1" // ✅ Bootstrap red text
                  />
                </Card.Body>

                <Card.Footer>
                  <Navigations nav={nav} lastLabel="Submit Application" onLast={() => { onNext(); }} showLast={true} />
                </Card.Footer>
              </Card>
              <SuccessMsgStageII
                show={modalShow}
                onHide={() => setModalShow(false)}
                submitNow={submitNow}
              />
            </Form>
          </FormContext.Provider>


        )}
      </Formik>

    </Fragment>
  );
};


export const DocumentUploadsView = (props) => {
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
            <th colSpan={7} style={{ border: "1px solid black" }}>Geo tagged photo of Machinery/Tools/Equipments (Single PDF for each Unit)</th>
          </tr>
          <tr>
            <th>#</th>
            <th style={{ border: "1px solid black" }}>Trade Name</th>
            <th style={{ border: "1px solid black" }}>Unit</th>
            <th style={{ border: "1px solid black" }}>Geo tagged photo</th>
          </tr>

          <tr>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>2</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>3</td>
            <td style={{ border: "1px solid black" }}>Fitter</td>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>4</td>
            <td style={{ border: "1px solid black" }}>Fitter</td>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
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
            <th colSpan={7} style={{ border: "1px solid black" }}>{`GST Invoices for Major Machinery Purchase and Payment proof (Bill amount > Rs. 10,000)(single PDF for each Trade)`}</th>
          </tr>
          <tr>
            <th>#</th>
            <th style={{ border: "1px solid black" }}>Trade Name</th>
            <th style={{ border: "1px solid black" }}>Document</th>
          </tr>

          <tr>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>2</td>
            <td style={{ border: "1px solid black" }}>Fitter</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>

        </tbody>
      </table>

    </>

  );
};


export default DocumentUploads;




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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const markascomplete = () => {
    setAppFlow(appId, STAGE_II_DOCUMENT_UPLAOD);

  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h6">
          Submit Stage-II Application
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* className="mt-5" */}
        <div >
          <h3 className="mb-3">
            Dear, <span className="text-primary">Applicant</span>
          </h3>
          <p>
            Your stage II application has been successfully completed. The Application will now be forwarded to the Concerned State Directorage for Assessment. One's submitted, You can not modify your application. You will be notified onces the evaluation is completed.
          </p>

        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={markascomplete}>Submit Now</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const ConfirmBox = ({ submitNow }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Button variant="success" onClick={() => setModalShow(true)}>
        Save & Next
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        submitNow={submitNow}
      />
    </div>
  )
}

export const SuccessMsgStageII = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const handleSubmit = () => {
    if (props.submitNow) {
      props.submitNow(appId); // ✅ pass data if needed
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h6">
          Submit Stage-II Application
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* className="mt-5" */}
        <div >
          <h3 className="mb-3">
            Dear, <span className="text-primary">Applicant</span>
          </h3>
          <p>
            Your stage II application has been successfully completed. The Application will now be forwarded to the Concerned State Directorage for Assessment. One's submitted, You can not modify your application. You will be notified onces the evaluation is completed.
          </p>

        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={handleSubmit}>Submit Now</Button>
      </Modal.Footer>
    </Modal>
  );
}