import { Fragment, useEffect, useState, useRef, createContext } from "react";
import { Row, Col, Card, Form, Button, Table, Modal, Form as BForm, } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";
import * as formik from "formik";
import ReqSign from "../comp/requiredSign";
import { ChatMessage } from "../../../Assessment/ReviewTrail";
import Geotagged from "../../../geotagged";
import ReactDOM from "react-dom/client";

import { building_detail_yup_object } from "../../../../reducers/newAppReducer";
import { UPDATE_BUILDING_DETAILS, STAGE_II__FEE_PAID, STAGE_II__FEE_EXEMPTED } from "affserver";

import { Form as BootstrapForm } from "react-bootstrap";

import { useLocation } from "react-router-dom";


// export const SignageBoards = ({ setActive }) => {
//   const stage = useSelector((state) => state.reg.stepsII);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const formikRef = useRef();
//   const reg = useSelector((state) => state.reg);
//   const stepInfo = reg.stepsII[0];

//   useEffect(() => {
//     console.log(stage);
//   }, []);

//   // const initialLandDocs = stage.stage_I.land_documents || [];
//   // const lease_deed_document = stage.stage_I.lease_docs || [];

//   const languages = [
//     "",
//     "Hindi",
//     "English",
//     "Bengali",
//     "Telugu",
//     "Marathi",
//     "Tamil",
//     "Urdu",
//     "Gujarati",
//     "Kannada",
//     "Odia",
//     "Malayalam",
//     "Punjabi",
//   ];

//   const ID_Proof_Doc_list = [
//     "Aadhaar Card",
//     "PAN Card",
//     "Passport",
//     "Voter ID Card",
//     "Driving License",
//   ];

//   const designation = ["Secretary", "Chairperson", "President"];


//   const submit = (values) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to save the form data?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, save it!",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // User confirmed – now show loading or save directly
//         Swal.fire({
//           title: "Saving...",
//           didOpen: () => {
//             Swal.showLoading();
//             dispatch({ type: UPDATE_BUILDING_DETAILS, payload: values });
//             dispatch({ type: "set_filled_step_II", payload: { step: 1 }, });
//             dispatch({ type: "reg_set_active_stepII", payload: { step: 2 } });
//             setActive(reg.stepsII[1]);
//             Swal.close();
//           },
//         });
//       } else {
//         console.log("User cancelled save");
//       }
//     });
//   };

//   const Building_Detail_initialValues = useSelector((state) => state.building_detail_reducer);

//   const AppliInfo = useSelector((state) => state.AppliInfo);

//   return (
//     <Fragment>
//       {AppliInfo.stage_II_fee_status === STAGE_II__FEE_PAID || AppliInfo.stage_II_fee_status === STAGE_II__FEE_EXEMPTED ? (<h2>Hello</h2>) :
//         <>
//           <Formik
//             innerRef={formikRef}
//             initialValues={Building_Detail_initialValues}
//             validationSchema={yup.object().shape(building_detail_yup_object)}
//             onSubmit={(values) => {
//               submit(values);
//               console.log("Form Values", values);
//             }}
//           >
//             {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
//               <Form onSubmit={handleSubmit}>
//                 <Card className="custom-card border border-primary">
//                   <Card.Header>
//                     <div className="card-title" style={{ textTransform: "none" }}>
//                       <h5> Signage Boards</h5>
//                     </div>
//                   </Card.Header>
//                   <Card.Body>

//                     {/*  className="text-nowrap" */}
//                     <Table width={100} cellPadding="5px"
//                       border={1}
//                       style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
//                     >
//                       <thead>
//                         <tr>
//                           <th style={{ width: '20%' }}>Particulars</th>
//                           <th style={{ width: '60%' }}>Required</th>
//                           <th style={{ width: '20%' }}>Upload Geo Tagged Photo <ReqSign /></th>
//                         </tr>
//                       </thead>
//                       <tbody>


//                         {[

//                           { key: "Signage Board on plot entrance", note: "The institute must display a signage board at the plot entrance as well as on the institute building, in accordance with the specifications provided in the guidelines below: \n Signage board to be made in English/Hindi/Regional language. The signage should be bilingual. The size of the font should be minimum 75 mm. The size of the board may vary from 2m x 1.5 m or 3m x 1.5 m or 4m x 2.0 m. \n Details needed: ITI's name, MIS code and full address and ITI logo, Skill India Logo & DGT logo." },
//                           { key: "Signage Board on Institute building", note: "Details needed: ITI's name, MIS code*, ITI logo, Skill India Logo & DGT logo." },
//                           { key: "Signage Boards", note: "i.	Directional boards must be displayed to indicate different sections of the building, such as the workshop, administrative building, hostel, scrap yard, etc. \n ii.	Signage boards for important safety information, including three-phase power supply, danger zones, and prohibited areas, must also be prominently displayed." },
//                           { key: "Trade details board", note: "Trade details board shall display the list of DGT affiliated trades, seating capacity and number of trainees enrolled" },
//                           { key: "Staff details board", note: "Staff details board shall display name, qualification/ designation and contact numbers of Principal and Group Instructor/Trade Instructor" },
//                           { key: "Exit Board", note: "Emergency exit routes must be clearly marked with visible signage." },
//                           { key: "Board indicating Danger Signs", note: "Boards indicating Danger Signs must be prominently displayed near: Transformer, Generator Set, heavy Electrical Installation/ Panels" },
//                           { key: "Prohibited Area Indicators", note: "Near running machinery etc." },
//                           { key: "Sexual Harassment Redressal Committee Notice", note: "Each ITI must prominently display information about the Sexual Harassment Redressal Committee on notice boards, ensuring awareness and fostering a safe, respectful environment for all students and staff." },
//                         ].map((item, index) => {
//                           return (<tr key={index}>
//                             <td>{item.key}</td>
//                             <td>{item.note}</td>
//                             <td>
//                               <input
//                                 type="file"
//                                 name="file"
//                                 className="form-control"
//                               // onChange={(event) => {
//                               //     setFieldValue(
//                               //         fileField,
//                               //         event.currentTarget.files[0]
//                               //     );
//                               // }}
//                               />
//                               {/* <div className="text-danger">
//                                                             <ErrorMessage
//                                                                 name={fileField}
//                                                                 component="div"
//                                                                 className="text-danger"
//                                                             />

//                                                         </div> */}


//                             </td>
//                           </tr>);
//                         })}


//                       </tbody>
//                     </Table>
//                   </Card.Body>
//                   <Card.Footer>
//                     <div className="d-flex justify-content-between mb-3">
//                       <Button
//                         className="p-2"
//                         variant="success"
//                         onClick={() => formikRef.current?.submitForm()}
//                       >
//                         Save & Continue
//                       </Button>

//                       {stepInfo.filled === true && (
//                         <Button
//                           className="p-2"
//                           variant="warning"
//                           onClick={() => {
//                             setActive(reg.stepsII[1]);
//                           }}
//                         >
//                           Next
//                         </Button>
//                       )}
//                     </div>
//                   </Card.Footer>
//                 </Card>
//               </Form>
//             )}
//           </Formik>
//         </>
//       }
//     </Fragment>
//   );
// };
import * as C from "affserver";
import * as ap from "@/services/applicant/index";
import { Navigations } from "@/components/Assessment/components";
import { viewFile } from "@/helpers";

import { FileField2 } from "@/components/formik/Inputs/FileField2";
export const FormContext = createContext();

export const SignageBoards = ({ isView = false, nav }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const stage = useSelector((state) => state.reg.stepsII);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikRef = useRef();
  const reg = useSelector((state) => state.reg);
  const stepInfo = reg.stepsII[0];

  const [initialValues, setInitialValues] = useState(C.st2.SignageBoards.initialValue);


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
            dispatch({ type: UPDATE_BUILDING_DETAILS, payload: values });
            dispatch({ type: "set_filled_step_II", payload: { step: 1 }, });
            dispatch({ type: "reg_set_active_stepII", payload: { step: 2 } });
            setActive(reg.stepsII[1]);
            Swal.close();
          },
        });
      } else {
        console.log("User cancelled save");
      }
    });
  };

  const Building_Detail_initialValues = useSelector((state) => state.building_detail_reducer);

  const AppliInfo = useSelector((state) => state.AppliInfo);

  const onNext = async () => {
    console.log("Called Next");
    const allValues = [];
    const changeArray = [];
    const isFormValid = [];
    try {

      const { values, errors } = formikRef.current;
      console.log(formikRef.current);
      await formikRef.current.submitForm();
      await formikRef.current.validateForm();

      const { isValid } = formikRef.current;
      console.log(errors, isValid);

      if (isValid === false) {
        throw new Error("Form validation failed: form is not valid.");
      }

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
              ap.saveSignageBoards(values, appId);
              nav.next();
              Swal.close();
            },
          });
        } else {
          console.log("User cancelled save");
        }
      });

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "Fill the form",
        showConfirmButton: true,
        confirmButtonText: "OK",
        allowOutsideClick: false
      });
    }
  }


  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await ap.getSignageBoards(appId);
        const data = resp.data;
        setInitialValues(data);  // update initial values
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [appId]);


  return (
    <Fragment>
      {AppliInfo.stage_II_fee_status === STAGE_II__FEE_PAID || AppliInfo.stage_II_fee_status === STAGE_II__FEE_EXEMPTED ? (<h2>Hello</h2>) :
        <>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            enableReinitialize
            validationSchema={C.st2.SignageBoards.ValSchema}
            onSubmit={(values) => { console.log(values) }}
          >
            {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (

              <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue }}>
                <Form onSubmit={handleSubmit}>
                  <Card className="custom-card border border-primary">
                    <Card.Header>
                      <div className="card-title" style={{ textTransform: "none" }}>
                        <h5>Specifications of IT lab</h5>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <FieldArray name="signage_boards">
                        <Table >
                          <thead>
                            <tr>
                              <th>Particulars</th>
                              <th>Required</th>
                              <th>Document</th>
                            </tr>
                          </thead>
                          <tbody>
                            {values.signage_boards.map((obj, index) => {
                              return (
                                <tr key={index}>
                                  <td>{obj?.particular}</td>
                                  <td>{obj?.instruction}</td>
                                  <td>
                                    <FileField2
                                      // label="If Yes, Upload Supporting Government Notification/Order/Circular"
                                      name={`signage_boards[${index}].document`}
                                      mandatory
                                      accept=".pdf,.jpg,.png"
                                      context={FormContext}
                                      onClickViewFileButton={() => viewFile(values.signage_boards[index].document)}
                                    />

                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </Table>
                      </FieldArray>

                    </Card.Body>
                    <Card.Footer>
                      <Navigations nav={nav} onNext={() => { onNext(); }} />
                    </Card.Footer>
                  </Card>
                </Form>
              </FormContext.Provider>

            )}
          </Formik>
        </>
      }
    </Fragment>
  );
};




export const Assessment_SignageBoards = () => {

  return (
    <>
      <Row
        style={{
          backgroundColor: "rgb(245, 245, 245)",
          margin: "10px 0px 0px",
          borderRadius: 6,
          borderStyle: "dashed",
          borderWidth: "thin",
          padding: "2px",
        }}
      >
        <Col xl={12} lg={12} md={12} sm={12}>
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Particulars</th>
                <th style={{ width: '60%' }}>Required</th>
                <th style={{ width: '20%' }}>Upload Geo Tagged Photo <ReqSign /></th>
              </tr>
            </thead>
            <tbody>


              {[

                { key: "Signage Board on plot entrance", note: "The institute must display a signage board at the plot entrance as well as on the institute building, in accordance with the specifications provided in the guidelines below: \n Signage board to be made in English/Hindi/Regional language. The signage should be bilingual. The size of the font should be minimum 75 mm. The size of the board may vary from 2m x 1.5 m or 3m x 1.5 m or 4m x 2.0 m. \n Details needed: ITI's name, MIS code and full address and ITI logo, Skill India Logo & DGT logo." },
                { key: "Signage Board on Institute building", note: "Details needed: ITI's name, MIS code*, ITI logo, Skill India Logo & DGT logo." },
                { key: "Signage Boards", note: "i.	Directional boards must be displayed to indicate different sections of the building, such as the workshop, administrative building, hostel, scrap yard, etc. \n ii.	Signage boards for important safety information, including three-phase power supply, danger zones, and prohibited areas, must also be prominently displayed." },
                { key: "Trade details board", note: "Trade details board shall display the list of DGT affiliated trades, seating capacity and number of trainees enrolled" },
                { key: "Staff details board", note: "Staff details board shall display name, qualification/ designation and contact numbers of Principal and Group Instructor/Trade Instructor" },
                { key: "Exit Board", note: "Emergency exit routes must be clearly marked with visible signage." },
                { key: "Board indicating Danger Signs", note: "Boards indicating Danger Signs must be prominently displayed near: Transformer, Generator Set, heavy Electrical Installation/ Panels" },
                { key: "Prohibited Area Indicators", note: "Near running machinery etc." },
                { key: "Sexual Harassment Redressal Committee Notice", note: "Each ITI must prominently display information about the Sexual Harassment Redressal Committee on notice boards, ensuring awareness and fostering a safe, respectful environment for all students and staff." },
              ].map((item, index) => {
                return (<tr key={index}>
                  <td>{item.key}</td>
                  <td>{item.note}</td>
                  <td><Button size="sm">View Document</Button></td>
                </tr>);
              })}

            </tbody>
          </table>
        </Col>

      </Row>


    </>
  );
};

// // Form to upload Building Plan
// export const BuildingPlan = ({ handleChange, touched, errors, values }) => {
//   const languages = [
//     "",
//     "Hindi",
//     "English",
//     "Bengali",
//     "Telugu",
//     "Marathi",
//     "Tamil",
//     "Urdu",
//     "Gujarati",
//     "Kannada",
//     "Odia",
//     "Malayalam",
//     "Punjabi",
//   ];

//   return (
//     <Row style={{ marginTop: "1rem" }}>
//       <Col md={4}>
//         <BootstrapForm.Group
//         >
//           <BootstrapForm.Label>
//             Document Language for Building Plan <ReqSign />
//           </BootstrapForm.Label>
//           <BootstrapForm.Select
//             size="lg"
//             name="language_for_building_plan"
//             value={values.language_for_building_plan}
//             onChange={handleChange}
//             isInvalid={
//               touched.language_for_building_plan &&
//               !!errors.language_for_building_plan
//             }
//           >
//             {languages.map((lang, i) => (
//               <option key={i} value={lang} selected={i == 0}>
//                 {lang}
//               </option>
//             ))}
//           </BootstrapForm.Select>

//           {touched.language_for_building_plan &&
//             errors.language_for_building_plan && (
//               <BootstrapForm.Control.Feedback type="invalid">
//                 {errors.language_for_building_plan}
//               </BootstrapForm.Control.Feedback>
//             )}
//         </BootstrapForm.Group>

//       </Col>
//       <Col md={4}>
//         <Form.Group>
//           <Form.Label>
//             Upload Original Document of Building Plan
//             <ReqSign />
//             <br />
//             (As per Annexure-9):{" "}
//             <Button variant="link" className="rounded-pill btn-wave">
//               Download Format
//             </Button>
//           </Form.Label>
//           <Form.Control required type="file" name="document_of_building_plan"
//             // value={values.document_of_building_plan}
//             onChange={handleChange}
//             isInvalid={
//               touched.document_of_building_plan &&
//               !!errors.document_of_building_plan
//             } />
//           {/* <Button variant="primary">Upload</Button> */}
//           {touched.document_of_building_plan &&
//             errors.document_of_building_plan && (
//               <BootstrapForm.Control.Feedback type="invalid">
//                 {errors.document_of_building_plan}
//               </BootstrapForm.Control.Feedback>
//             )}
//         </Form.Group>
//       </Col>

//       <Col md={4}>
//         <Form.Group>
//           <Form.Label>
//             Upload Hindi/English Notarised Copy of document
//             <ReqSign />
//           </Form.Label>
//           <Form.Control required type="file" name="notarised_document_of_building_plan"
//             // value={values.notarised_document_of_building_plan}
//             onChange={handleChange}
//             isInvalid={
//               touched.notarised_document_of_building_plan &&
//               !!errors.notarised_document_of_building_plan
//             } />
//           {/* <Button variant="primary">Upload</Button> */}
//           {touched.notarised_document_of_building_plan &&
//             errors.notarised_document_of_building_plan && (
//               <BootstrapForm.Control.Feedback type="invalid">
//                 {errors.notarised_document_of_building_plan}
//               </BootstrapForm.Control.Feedback>
//             )}
//         </Form.Group>
//       </Col>
//     </Row>
//   );
// };
// // View for Building Plan
// export const BuildingPlanView = () => {
//   return (

//     <>
//       <table
//         width="98%"
//         border={1}
//         style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
//         align="center"
//         cellPadding="5px"
//       >
//         <tbody>
//           <tr>
//             <td colSpan={7} style={{ border: "1px solid black" }}><b>Building Plan</b></td>
//           </tr>
//           <tr>
//             <th style={{ border: "1px solid black" }}>Document Language</th>
//             <th style={{ border: "1px solid black" }}>Building Plan Document</th>
//             <th style={{ border: "1px solid black" }}>Hindi/English Notarised document</th>
//           </tr>
//           <tr>
//             <td style={{ border: "1px solid black" }}>Hindi</td>
//             <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
//             <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
//           </tr>
//         </tbody>
//       </table>

//       <table
//         width="98%"
//         border={1}
//         style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
//         align="center"
//         cellPadding="5px"
//       >
//         <tbody>
//           <tr>
//             <td colSpan={7} style={{ border: "1px solid black" }}><b>Building Completion Certificate (BCC)</b></td>
//           </tr>
//           <tr>
//             <th style={{ border: "1px solid black" }}>Document Language</th>
//             <th style={{ border: "1px solid black" }}>Building Completion Certificate (BCC) Document</th>
//             <th style={{ border: "1px solid black" }}>Hindi/English Notarised document</th>
//             <th style={{ border: "1px solid black" }}>Name of issued Authority</th>
//             <th style={{ border: "1px solid black" }}>Date of Issued</th>


//           </tr>
//           <tr>
//             <td style={{ border: "1px solid black" }}>Hindi</td>
//             <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
//             <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
//             <td style={{ border: "1px solid black" }}>ABCD</td>
//             <td style={{ border: "1px solid black" }}>2025-01-01</td>

//           </tr>
//         </tbody>
//       </table>

//       <table
//         width="98%"
//         border={1}
//         style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
//         align="center"
//         cellPadding="5px"
//       >
//         <tbody>
//           <tr>
//             <td colSpan={7} style={{ border: "1px solid black" }}><b>Photos of Building</b></td>
//           </tr>
//           <tr>
//             <th style={{ border: "1px solid black" }}>Front View Photo of Building</th>
//             <th style={{ border: "1px solid black" }}>Side View Photo of Building</th>
//             <th style={{ border: "1px solid black" }}>Entrance Gate Photo of Plot (with Signage Board)</th>
//           </tr>
//           <tr>
//             <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
//             <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
//             <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
//           </tr>
//         </tbody>
//       </table>
//     </>

//   );
// };

// // Action for Assessment

// export const AssessorRemarkHistory = ({ title }) => {
//   return (
//     <Card className="custom-card">
//       {/* <Card.Header>
//         <label
//           className="main-content-label my-auto"
//           style={{ textTransform: "none" }}
//         >
//           Assessor Comments
//         </label>
//         <div className="ms-auto  d-flex">20th April 2025:10:20PM</div>
//       </Card.Header> */}
//       <Card.Body>
//         <Row className="mb-3">
//           <Form.Label>
//             <b>Whether {title ? title : "Document"} is as per norms?:</b>{" "}
//             <u>
//               <span>No</span>
//             </u>
//           </Form.Label>
//           <Form.Label>
//             <b>Reason:</b>{" "}
//             <u>
//               <span>Document is Irrelavent</span>
//             </u>
//           </Form.Label>
//           <Form.Label>
//             <b>Remark:</b>{" "}
//             <u>
//               <span>Not Ok</span>
//             </u>
//           </Form.Label>
//         </Row>
//       </Card.Body>
//       <Card.Footer className="d-flex justify-content-end">
//         <div className="text-gray-7">20th April 2025 10:00AM</div>
//       </Card.Footer>
//     </Card>
//   );
// };
// export const ItiRemarkHistory = () => {
//   const childWindowRef = useRef(null);
//   const [photoURL, setPhotoURL] = useState(
//     "https://nimionlineadmission.in/iti/downloads/Format-%202%20Resolution%20for%20Establishment%20of%20New%20Industrial%20Training%20Institute.pdf"
//   );

//   const viewSampleDocument = () => {
//     if (childWindowRef.current && !childWindowRef.current.closed) {
//       childWindowRef.current.focus();
//       return;
//     }

//     const newWindow = window.open("", "", "width=400,height=400");
//     if (!newWindow) {
//       alert("Popup blocked.");
//       return;
//     }

//     newWindow.document.title = "Sample Document";

//     const container = newWindow.document.createElement("div");
//     newWindow.document.body.appendChild(container);

//     const root = ReactDOM.createRoot(container);

//     root.render(
//       <embed src={photoURL} type="application/pdf" width="100%" height="100%" />
//       // <img
//       //   src={photoURL}
//       //   alt="Captured"
//       //   style={{ width: "100%", maxWidth: "100%" }}
//       // />
//     );

//     // Optional: Cleanup when the window is closed
//     newWindow.addEventListener("beforeunload", () => {
//       root.unmount();
//     });

//     childWindowRef.current = newWindow;
//   };

//   return (
//     <Card className="custom-card shadow border-info">
//       <Card.Body>
//         <Row className="mb-3">
//           <Col md={12}>
//             <Form.Label>
//               <b>Remark:</b> <span>Document Uploaded</span>
//             </Form.Label>
//           </Col>
//           <Col md={12}>
//             {" "}
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={viewSampleDocument}
//             >
//               View Document
//             </button>
//           </Col>
//         </Row>
//       </Card.Body>
//       <Card.Footer className="d-flex justify-content-end">
//         <div className="text-gray-7">20th April 2025 10:00AM</div>
//       </Card.Footer>
//     </Card>
//   );
// };
// export const BuildingPlanAction = () => {
//   const MaxData = [
//     { value: "Document is not legible", label: "Document is not legible" },
//     { value: "Document is irrelevant", label: "Document is irrelevant" },
//     {
//       value: "Document lacks required information",
//       label: "Document lacks required information",
//     },
//     {
//       value:
//         "Document is not approved by the competent authority in the State/ UT",
//       label:
//         "Document is not approved by the competent authority in the State/ UT",
//     },
//     {
//       value:
//         "Address on the document does not match with the proposed land/ building address",
//       label:
//         "Address on the document does not match with the proposed land/ building address",
//     },
//     {
//       value:
//         "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
//       label:
//         "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
//     },
//     {
//       value: "other",
//       label: "other",
//     },
//   ];

//   const { Formik } = formik;
//   const formRef2 = useRef();
//   const dispatch = useDispatch();

//   const [showXlModal, setShowXlModal] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("");

//   const handleShowModal = (size) => {
//     switch (size) {
//       case "xl":
//         setShowXlModal(true);
//         break;
//       default:
//         break;
//     }
//     setSelectedSize(size);
//   };

//   const handleCloseModal = () => {
//     setShowXlModal(false);
//     setSelectedSize("");
//   };

//   const [formData, setFormData] = useState({});
//   const [formSubmited, setFormSubmited] = useState(false);

//   const messages = [
//     {
//       userType: "Assessor",
//       username: "Alice",
//       text: "Hello!",
//       datetime: "10:30 AM",
//       isUser: true,
//       comp: () => <AssessorRemarkHistory title="Building Plan" />,
//     },
//     {
//       userType: "Applicant",
//       username: "You",
//       text: "Hi Alice!",
//       datetime: "10:31 AM",
//       isUser: false,
//       comp: ItiRemarkHistory,
//     },
//     {
//       userType: "Assessor",
//       username: "Alice",
//       text: "Hello!",
//       datetime: "10:30 AM",
//       isUser: true,
//       comp: () => <AssessorRemarkHistory title="Building Plan" />,
//     },
//   ];

//   return (
//     <>
//       <Row
//         style={{
//           backgroundColor: "rgb(245, 245, 245)",
//           margin: "10px 0px 0px",
//           borderRadius: 6,
//           borderStyle: "dashed",
//           borderWidth: "thin",
//           padding: "10px",
//         }}
//       >
//         <Col xl={6} lg={6} md={6} sm={6}>
//           <div>
//             <BuildingPlanView />
//           </div>
//         </Col>
//         <Col xl={6} lg={6} md={6} sm={6}>
//           <div style={{ padding: 2, background: "#E0ECF5", borderRadius: 6 }}>
//             <div className="bg-body-secondary p-3">
//               {messages.map((msg, index) => (
//                 <ChatMessage
//                   key={index}
//                   message={msg}
//                   isUser={msg.isUser}
//                   Msg={msg.comp}
//                   data={msg}
//                 />
//               ))}
//             </div>

//             <div className="form-container">
//               {formSubmited == false ? (
//                 <Formik
//                   validationSchema={yup.object().shape({
//                     as_per_norms: yup
//                       .string()
//                       .required("Select whether Building plan is as per norms"),

//                     category: yup.string().when("as_per_norms", {
//                       is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
//                       then: () =>
//                         yup.string().required("Please select a category"),
//                       otherwise: () => yup.string().notRequired(),
//                     }),

//                     assessor_comments: yup.string().when("as_per_norms", {
//                       is: "no",
//                       then: () =>
//                         yup.string().required("Please provide your comments"),
//                       otherwise: () => yup.string().notRequired(),
//                     }),
//                   })}
//                   validateOnChange={() => console.log("validateOnChange")}
//                   onSubmit={(values) => {
//                     console.log("Form submitted with values:", values);
//                     setFormData(values);
//                     setFormSubmited(true);
//                     console.log(formData);
//                   }}
//                   initialValues={{
//                     category: "",
//                     as_per_norms: "no",
//                     assessor_comments: "",
//                   }}
//                 >
//                   {({
//                     handleSubmit,
//                     handleChange,
//                     submitForm,
//                     values,
//                     errors,
//                     touched,
//                   }) => (
//                     <Card style={{ backgroundColor: "#eff3d6" }}>
//                       <Card.Header>
//                         <label
//                           className="main-content-label my-auto"
//                           style={{ textTransform: "none" }}
//                         >
//                           Review Form
//                         </label>
//                         <div className="ms-auto  d-flex">
//                           <Button
//                             size="sm"
//                             onClick={() => handleShowModal("xl")}
//                             type="button"
//                             className="rounded-pill btn-wave btn-outline-dark"
//                             variant="btn-outline-dark"
//                           >
//                             Review Instructions
//                           </Button>
//                         </div>
//                       </Card.Header>
//                       <Card.Body>
//                         <Form ref={formRef2} onSubmit={handleSubmit} validated>
//                           <Row className="mb-3">
//                             <Form.Group>
//                               <Form.Label>
//                                 Whether Building plan is as per norms?
//                                 <span style={{ color: "red" }}>*</span>
//                               </Form.Label>
//                               <div>
//                                 <Form.Check
//                                   inline
//                                   type="radio"
//                                   label="Yes"
//                                   name="as_per_norms"
//                                   value="yes"
//                                   onChange={handleChange}
//                                   checked={values.as_per_norms === "yes"}
//                                   isInvalid={
//                                     touched.as_per_norms &&
//                                     !!errors.as_per_norms
//                                   }
//                                 />
//                                 <Form.Check
//                                   inline
//                                   type="radio"
//                                   label="No"
//                                   name="as_per_norms"
//                                   value="no"
//                                   onChange={handleChange}
//                                   checked={values.as_per_norms === "no"}
//                                   isInvalid={
//                                     touched.as_per_norms &&
//                                     !!errors.as_per_norms
//                                   }
//                                 />
//                               </div>

//                               <Form.Control.Feedback type="invalid">
//                                 {errors.category}
//                               </Form.Control.Feedback>
//                             </Form.Group>
//                           </Row>
//                           {values.as_per_norms === "no" && (
//                             <Row className="mb-3">
//                               <Form.Group
//                                 as={Col}
//                                 md="12"
//                                 controlId="validationCustom02"
//                               >
//                                 <Form.Label>
//                                   Select the Reason(s) and Raise
//                                   Non-Conformities (NC)
//                                   <span style={{ color: "red" }}>*</span>
//                                 </Form.Label>
//                                 <Field
//                                   required
//                                   name="category"
//                                   as="select"
//                                   className="form-control"
//                                 >
//                                   <option value="">Select</option>
//                                   {MaxData.map((lang, i) => {
//                                     return (
//                                       <option key={i} value={lang.value}>
//                                         {lang.label}
//                                       </option>
//                                     );
//                                   })}
//                                 </Field>
//                                 <Form.Control.Feedback>
//                                   Looks good!
//                                 </Form.Control.Feedback>
//                               </Form.Group>

//                               <Form.Group
//                                 required
//                                 as={Col}
//                                 md="12"
//                                 controlId="text-area"
//                                 style={{ marginTop: "1rem" }}
//                               >
//                                 <Form.Label>
//                                   Any other reason, please specify{" "}
//                                   <span style={{ color: "red" }}>*</span>
//                                 </Form.Label>
//                                 <Form.Control
//                                   name="assessor_comments"
//                                   required
//                                   as="textarea"
//                                   rows={3}
//                                   className={`form-control ${touched.assessor_comments &&
//                                     errors.assessor_comments
//                                     ? "is-invalid"
//                                     : ""
//                                     }`}
//                                   value={values.assessor_comments}
//                                   onChange={handleChange}
//                                   isInvalid={
//                                     touched.assessor_comments &&
//                                     !!errors.assessor_comments
//                                   }
//                                 />
//                                 {touched.assessor_comments &&
//                                   errors.assessor_comments && (
//                                     <div className="invalid-feedback">
//                                       {errors.assessor_comments}
//                                     </div>
//                                   )}
//                               </Form.Group>
//                             </Row>
//                           )}
//                           <Button variant="primary" onClick={submitForm}>
//                             Submit
//                           </Button>
//                         </Form>
//                       </Card.Body>
//                       <Card.Footer></Card.Footer>
//                     </Card>
//                   )}
//                 </Formik>
//               ) : formSubmited == true ? (
//                 <Card
//                   className="border-info"
//                   style={
//                     formData.as_per_norms == "yes"
//                       ? { backgroundColor: "#d6f3e0" }
//                       : { backgroundColor: "#f3d6d6" }
//                   }
//                 >
//                   <Card.Header>
//                     <label
//                       className="main-content-label my-auto"
//                       style={{ textTransform: "none" }}
//                     >
//                       Assessor Comments
//                     </label>
//                     <div className="ms-auto  d-flex">
//                       25th April 2025:10:20PM
//                     </div>
//                   </Card.Header>
//                   <Card.Body>
//                     <Row className="mb-3">
//                       <Col md={12}>
//                         <b>Whether Building plan is as per norms?:</b>{" "}
//                         <span style={{ textTransform: "capitalize" }}>
//                           {formData.as_per_norms}
//                         </span>
//                       </Col>
//                       {formData.as_per_norms == "no" && (
//                         <Col md={12}>
//                           <b>Reason Category:</b>{" "}
//                           <span style={{ textTransform: "capitalize" }}>
//                             {formData.category}
//                           </span>
//                         </Col>
//                       )}

//                       {formData.category ==
//                         "other" && (
//                           <Col md={12}>
//                             <b>Reason:</b> <p>{formData.assessor_comments}</p>
//                           </Col>
//                         )}
//                     </Row>
//                   </Card.Body>
//                   <Card.Footer className="d-flex justify-content-between">
//                     <Button
//                       variant="primary"
//                       onClick={() => {
//                         setFormSubmited(false);
//                         setFormData({});
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     {/* <Button variant="primary">Submit</Button> */}
//                   </Card.Footer>
//                 </Card>
//               ) : (
//                 <h1>No Data</h1>
//               )}
//             </div>
//           </div>
//         </Col>
//       </Row>

//       <Modal show={showXlModal} onHide={handleCloseModal} size="xl">
//         <Modal.Header closeButton>
//           <Modal.Title as="h6">Review Instructions</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           This section is to guide Desktop Assessor in Desktop Assessment. This
//           will act as guide to him. DGT admin can provide sample documents also.
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export const BccView = () => {
//   return (
//     <Card className="custom-card shadow border-info">
//       <Card.Header>
//         <div className="card-title" style={{ textTransform: "none" }}>
//           <h5> Building Completion Certificate (BCC)</h5>
//         </div>
//       </Card.Header>
//       <Card.Body>
//         <Table
//           className="table-striped table-hover"
//           style={{ textAlign: "start" }}
//         >
//           <thead>
//             <tr>
//               <th scope="col">Particular</th>
//               <th>:</th>
//               <th scope="col">Filled By Applicant</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">
//                 Document Language for Building Completion Certificate (BCC)
//               </th>
//               <th>:</th>
//               <td>
//                 <span>English</span>
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">
//                 Upload Original Building Completion Certificate (BCC)
//               </th>
//               <th>:</th>
//               <td>
//                 <Button variant="primary">View Document</Button>
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">
//                 Upload Hindi/English Notarised Copy of document
//               </th>
//               <th>:</th>
//               <td>
//                 <Button variant="primary">View Document</Button>
//               </td>
//             </tr>

//             <tr>
//               <th scope="row">Name of Issuing Authority for BCC</th>
//               <th>:</th>
//               <td>XYZ</td>
//             </tr>

//             <tr>
//               <th scope="row">Date of Issued</th>
//               <th>:</th>
//               <td>20th April 2025</td>
//             </tr>
//           </tbody>
//         </Table>
//       </Card.Body>
//       {/* <Card.Footer>
//                       <Button>dsfdf</Button>
//                     </Card.Footer> */}
//     </Card>
//   );
// };
// export const BccViewAction = () => {
//   const [entityTitle, setEntityTitle] = useState(
//     "Building Completion Certificate (BCC)"
//   );

//   const [reviewState, setReviewState] = useState("Reviewed"); // Given || Awaiting for Review || Reviewed
//   const MaxData = [
//     {
//       value:
//         "Document lacks required information (name of institute/ date/ issuance authority)",
//       label:
//         "Document lacks required information (name of institute/ date/ issuance authority)",
//     },
//     {
//       value: "Document is not in the prescribed format (Annexure-10 or 11)",
//       label: "Document is not in the prescribed format (Annexure-10 or 11)",
//     },
//     {
//       value: "Address on document does not match institute’s address",
//       label: "Address on document does not match institute’s address",
//     },
//     {
//       value:
//         "Document is not approved/signed by the competent authority in the State/ UT",
//       label:
//         "Document is not approved/signed by the competent authority in the State/ UT",
//     },
//     {
//       value: "Construction of the building is incomplete",
//       label: "Construction of the building is incomplete",
//     },
//     {
//       value: "other",
//       label: "other",
//     },
//   ];

//   const [isHidden, setisHidden] = useState([true]);

//   const { Formik } = formik;
//   const formRef2 = useRef();
//   const dispatch = useDispatch();

//   //Custom Validation
//   const stageI1_info = useSelector((state) => state.theme.new_registration);
//   // useEffect(() => { console.log("stageI1_info", stageI1_info); }, []);

//   const handleExternalSubmit = () => {
//     if (formRef2.current) {
//       console.log(formRef2.current);
//       formRef2.current.requestSubmit(); // Better than .submit() — triggers onSubmit properly
//     }
//   };

//   const navigate = useNavigate();
//   // const updateQuery = () => { navigate("?stage=1&form_id=Basic Details of Applicant  Organization"); };

//   const gotoNext = () => {
//     console.log("gotoNext called");
//     navigate("?stage=1&form_id=Details of the Proposed Institute");
//   };

//   const [showXlModal, setShowXlModal] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("");

//   const handleShowModal = (size) => {
//     switch (size) {
//       case "xl":
//         setShowXlModal(true);
//         break;
//       default:
//         break;
//     }
//     setSelectedSize(size);
//   };

//   const handleCloseModal = () => {
//     setShowXlModal(false);
//     setSelectedSize("");
//   };

//   const [formData, setFormData] = useState({});
//   const [formSubmited, setFormSubmited] = useState(false);

//   const messages = [
//     {
//       userType: "Assessor",
//       username: "Alice",
//       text: "Hello!",
//       datetime: "10:30 AM",
//       isUser: true,
//       comp: () => (
//         <AssessorRemarkHistory title="Building Completion Certificate (BCC)" />
//       ),
//       entityTitle: entityTitle,
//     },
//     {
//       userType: "Applicant",
//       username: "You",
//       text: "Hi Alice!",
//       datetime: "10:31 AM",
//       isUser: false,
//       comp: ItiRemarkHistory,
//       entityTitle: entityTitle,
//     },
//     {
//       userType: "Assessor",
//       username: "Alice",
//       text: "Hello!",
//       datetime: "10:30 AM",
//       isUser: true,
//       comp: () => (
//         <AssessorRemarkHistory title="Building Completion Certificate (BCC)" />
//       ),
//     },
//   ];
//   return (
//     <>
//       <Row
//         style={{
//           backgroundColor: "rgb(245, 245, 245)",
//           margin: "10px 0px 0px",
//           borderRadius: 6,
//           borderStyle: "dashed",
//           borderWidth: "thin",
//           padding: "10px",
//         }}
//       >
//         <Col xl={6} lg={6} md={6} sm={6}>
//           <div>
//             <BccView />
//           </div>
//         </Col>
//         <Col xl={6} lg={6} md={6} sm={6}>
//           <div style={{ padding: 2, background: "#E0ECF5", borderRadius: 6 }}>
//             <div className="bg-body-secondary p-3">
//               {messages.map((msg, index) => (
//                 <ChatMessage
//                   key={index}
//                   message={msg}
//                   isUser={msg.isUser}
//                   Msg={msg.comp}
//                   data={msg}
//                 />
//               ))}
//             </div>

//             <div className="form-container">
//               {formSubmited == false ? (
//                 <Formik
//                   validationSchema={yup.object().shape({
//                     as_per_norms: yup
//                       .string()
//                       .required("Select whether Building plan is as per norms"),

//                     category: yup.string().when("as_per_norms", {
//                       is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
//                       then: () =>
//                         yup.string().required("Please select a category"),
//                       otherwise: () => yup.string().notRequired(),
//                     }),

//                     assessor_comments: yup.string().when("as_per_norms", {
//                       is: "no",
//                       then: () =>
//                         yup.string().required("Please provide your comments"),
//                       otherwise: () => yup.string().notRequired(),
//                     }),
//                   })}
//                   validateOnChange={() => console.log("validateOnChange")}
//                   onSubmit={(values) => {
//                     console.log("Form submitted with values:", values);
//                     setFormData(values);
//                     setFormSubmited(true);
//                     console.log(formData);
//                   }}
//                   initialValues={{
//                     category: "",
//                     as_per_norms: "no",
//                     assessor_comments: "",
//                   }}
//                 >
//                   {({
//                     handleSubmit,
//                     handleChange,
//                     submitForm,
//                     values,
//                     errors,
//                     touched,
//                   }) => (
//                     <Card style={{ backgroundColor: "#eff3d6" }}>
//                       <Card.Header>
//                         <label
//                           className="main-content-label my-auto"
//                           style={{ textTransform: "none" }}
//                         >
//                           Review Form
//                         </label>
//                         <div className="ms-auto  d-flex">
//                           <Button
//                             size="sm"
//                             onClick={() => handleShowModal("xl")}
//                             type="button"
//                             className="rounded-pill btn-wave btn-outline-dark"
//                             variant="btn-outline-dark"
//                           >
//                             Review Instructions
//                           </Button>
//                         </div>
//                       </Card.Header>
//                       <Card.Body>
//                         <Form ref={formRef2} onSubmit={handleSubmit} validated>
//                           <Row className="mb-3">
//                             <Form.Group>
//                               <Form.Label>
//                                 Whether Building Completion Certificate (BCC) is
//                                 as per norms?
//                                 <span style={{ color: "red" }}>*</span>
//                               </Form.Label>
//                               <div>
//                                 <Form.Check
//                                   inline
//                                   type="radio"
//                                   label="Yes"
//                                   name="as_per_norms"
//                                   value="yes"
//                                   onChange={handleChange}
//                                   checked={values.as_per_norms === "yes"}
//                                   isInvalid={
//                                     touched.as_per_norms &&
//                                     !!errors.as_per_norms
//                                   }
//                                 />
//                                 <Form.Check
//                                   inline
//                                   type="radio"
//                                   label="No"
//                                   name="as_per_norms"
//                                   value="no"
//                                   onChange={handleChange}
//                                   checked={values.as_per_norms === "no"}
//                                   isInvalid={
//                                     touched.as_per_norms &&
//                                     !!errors.as_per_norms
//                                   }
//                                 />
//                               </div>

//                               <Form.Control.Feedback type="invalid">
//                                 {errors.category}
//                               </Form.Control.Feedback>
//                             </Form.Group>
//                           </Row>
//                           {values.as_per_norms === "no" && (
//                             <Row className="mb-3">
//                               <Form.Group
//                                 as={Col}
//                                 md="12"
//                                 controlId="validationCustom02"
//                               >
//                                 <Form.Label>
//                                   Select the Reason(s) and Raise
//                                   Non-Conformities (NC)
//                                   <span style={{ color: "red" }}>*</span>
//                                 </Form.Label>
//                                 <Field
//                                   required
//                                   name="category"
//                                   as="select"
//                                   className="form-control"
//                                 >
//                                   <option value="">Select</option>
//                                   {MaxData.map((lang, i) => {
//                                     return (
//                                       <option key={i} value={lang.value}>
//                                         {lang.label}
//                                       </option>
//                                     );
//                                   })}
//                                 </Field>
//                                 <Form.Control.Feedback>
//                                   Looks good!
//                                 </Form.Control.Feedback>
//                               </Form.Group>

//                               <Form.Group
//                                 required
//                                 as={Col}
//                                 md="12"
//                                 controlId="text-area"
//                                 style={{ marginTop: "1rem" }}
//                               >
//                                 <Form.Label>
//                                   Any other reason, please specify{" "}
//                                   <span style={{ color: "red" }}>*</span>
//                                 </Form.Label>
//                                 <Form.Control
//                                   name="assessor_comments"
//                                   required
//                                   as="textarea"
//                                   rows={3}
//                                   className={`form-control ${touched.assessor_comments &&
//                                     errors.assessor_comments
//                                     ? "is-invalid"
//                                     : ""
//                                     }`}
//                                   value={values.assessor_comments}
//                                   onChange={handleChange}
//                                   isInvalid={
//                                     touched.assessor_comments &&
//                                     !!errors.assessor_comments
//                                   }
//                                 />
//                                 {touched.assessor_comments &&
//                                   errors.assessor_comments && (
//                                     <div className="invalid-feedback">
//                                       {errors.assessor_comments}
//                                     </div>
//                                   )}
//                               </Form.Group>
//                             </Row>
//                           )}
//                           <Button variant="primary" onClick={submitForm}>
//                             Submit
//                           </Button>
//                         </Form>
//                       </Card.Body>
//                       <Card.Footer></Card.Footer>
//                     </Card>
//                   )}
//                 </Formik>
//               ) : formSubmited == true ? (
//                 <Card
//                   className="border-info"
//                   style={
//                     formData.as_per_norms == "yes"
//                       ? { backgroundColor: "#d6f3e0" }
//                       : { backgroundColor: "#f3d6d6" }
//                   }
//                 >
//                   <Card.Header>
//                     <label
//                       className="main-content-label my-auto"
//                       style={{ textTransform: "none" }}
//                     >
//                       Assessor Comments
//                     </label>
//                     <div className="ms-auto  d-flex">
//                       25th April 2025:10:20PM
//                     </div>
//                   </Card.Header>
//                   <Card.Body>
//                     <Row className="mb-3">
//                       <Col md={12}>
//                         <b>
//                           Whether Building Completion Certificate (BCC) is as
//                           per norms?:
//                         </b>{" "}
//                         <span style={{ textTransform: "capitalize" }}>
//                           {formData.as_per_norms}
//                         </span>
//                       </Col>
//                       {formData.as_per_norms == "no" && (
//                         <Col md={12}>
//                           <b>Reason Category:</b>{" "}
//                           <span style={{ textTransform: "capitalize" }}>
//                             {formData.category}
//                           </span>
//                         </Col>
//                       )}

//                       {formData.category ==
//                         "other" && (
//                           <Col md={12}>
//                             <b>Reason:</b> <p>{formData.assessor_comments}</p>
//                           </Col>
//                         )}
//                     </Row>
//                   </Card.Body>
//                   <Card.Footer className="d-flex justify-content-between">
//                     <Button
//                       variant="primary"
//                       onClick={() => {
//                         setFormSubmited(false);
//                         setFormData({});
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     {/* <Button variant="primary">Submit</Button> */}
//                   </Card.Footer>
//                 </Card>
//               ) : (
//                 <h1>No Data</h1>
//               )}
//             </div>
//           </div>

//           {false && (
//             <>
//               <div className="trails">
//                 <Card className="custom-card shadow border-info">
//                   <Card.Header>
//                     <label
//                       className="main-content-label my-auto"
//                       style={{ textTransform: "none" }}
//                     >
//                       Assessor Comments
//                     </label>
//                     <div className="ms-auto  d-flex">
//                       20th April 2025:10:20PM
//                     </div>
//                   </Card.Header>
//                   <Card.Body>
//                     <Row className="mb-3">
//                       <Form.Label>
//                         <b>Whether BCC is as per norms?:</b>{" "}
//                         <u>
//                           <span>No</span>
//                         </u>
//                       </Form.Label>
//                       <Form.Label>
//                         <b>Reason:</b>{" "}
//                         <u>
//                           <span>
//                             Document lacks required information (name of
//                             institute/ date/ issuance authority)
//                           </span>
//                         </u>
//                       </Form.Label>
//                       <Form.Label>
//                         <b>Remark:</b>{" "}
//                         <u>
//                           <span>Not Ok</span>
//                         </u>
//                       </Form.Label>
//                     </Row>
//                   </Card.Body>
//                 </Card>
//                 <Card className="custom-card shadow border-info">
//                   <Card.Header>
//                     <label
//                       className="main-content-label my-auto"
//                       style={{ textTransform: "none" }}
//                     >
//                       ITI Applicant Comments
//                     </label>
//                     <div className="ms-auto  d-flex">
//                       25th April 2025:10:20PM
//                     </div>
//                   </Card.Header>
//                   <Card.Body>
//                     <Row className="mb-3">
//                       <Form.Label>
//                         <b>Remark:</b> <span>Document Uploaded</span>
//                       </Form.Label>
//                     </Row>
//                   </Card.Body>
//                 </Card>
//               </div>
//               <div className="form-container">
//                 {formSubmited == false ? (
//                   <Formik
//                     validationSchema={yup.object().shape({
//                       as_per_norms: yup
//                         .string()
//                         .required(
//                           "Select whether Building plan is as per norms"
//                         ),

//                       category: yup.string().when("as_per_norms", {
//                         is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
//                         then: () =>
//                           yup.string().required("Please select a category"),
//                         otherwise: () => yup.string().notRequired(),
//                       }),

//                       assessor_comments: yup.string().when("as_per_norms", {
//                         is: "no",
//                         then: () =>
//                           yup.string().required("Please provide your comments"),
//                         otherwise: () => yup.string().notRequired(),
//                       }),
//                     })}
//                     validateOnChange={() => console.log("validateOnChange")}
//                     onSubmit={(values) => {
//                       console.log("Form submitted with values:", values);
//                       setFormData(values);
//                       setFormSubmited(true);
//                       console.log(formData);
//                     }}
//                     initialValues={{
//                       category: "",
//                       as_per_norms: "no",
//                       assessor_comments: "",
//                     }}
//                   >
//                     {({
//                       handleSubmit,
//                       handleChange,
//                       submitForm,
//                       values,
//                       errors,
//                       touched,
//                     }) => (
//                       <Card className="custom-card shadow border-info bg-body-secondary">
//                         <Card.Header>
//                           <label
//                             className="main-content-label my-auto"
//                             style={{ textTransform: "none" }}
//                           >
//                             Review Form
//                           </label>
//                           <div className="ms-auto  d-flex">
//                             <Button
//                               size="sm"
//                               onClick={() => handleShowModal("xl")}
//                               type="button"
//                               className="rounded-pill btn-wave btn-success-gradient"
//                               variant="success"
//                             >
//                               Review Instructions
//                             </Button>
//                           </div>
//                         </Card.Header>
//                         <Card.Body>
//                           <Form
//                             ref={formRef2}
//                             onSubmit={handleSubmit}
//                             validated
//                           >
//                             <Row className="mb-3">
//                               <Form.Group>
//                                 <Form.Label>
//                                   Whether BCC is as per norms?
//                                   <span style={{ color: "red" }}>*</span>
//                                 </Form.Label>
//                                 <div>
//                                   <Form.Check
//                                     inline
//                                     type="radio"
//                                     label="Yes"
//                                     name="as_per_norms"
//                                     value="yes"
//                                     onChange={handleChange}
//                                     checked={values.as_per_norms === "yes"}
//                                     isInvalid={
//                                       touched.as_per_norms &&
//                                       !!errors.as_per_norms
//                                     }
//                                   />
//                                   <Form.Check
//                                     inline
//                                     type="radio"
//                                     label="No"
//                                     name="as_per_norms"
//                                     value="no"
//                                     onChange={handleChange}
//                                     checked={values.as_per_norms === "no"}
//                                     isInvalid={
//                                       touched.as_per_norms &&
//                                       !!errors.as_per_norms
//                                     }
//                                   />
//                                 </div>

//                                 <Form.Control.Feedback type="invalid">
//                                   {errors.category}
//                                 </Form.Control.Feedback>
//                               </Form.Group>
//                             </Row>
//                             {values.as_per_norms === "no" && (
//                               <Row className="mb-3">
//                                 <Form.Group
//                                   as={Col}
//                                   md="12"
//                                   controlId="validationCustom02"
//                                 >
//                                   <Form.Label>
//                                     Select the Reason(s) and Raise
//                                     Non-Conformities (NC)
//                                     <span style={{ color: "red" }}>*</span>
//                                   </Form.Label>
//                                   <Field
//                                     required
//                                     name="category"
//                                     as="select"
//                                     className="form-control"
//                                   >
//                                     <option value="">Select</option>
//                                     {MaxData.map((lang, i) => {
//                                       return (
//                                         <option key={i} value={lang.value}>
//                                           {lang.label}
//                                         </option>
//                                       );
//                                     })}
//                                   </Field>
//                                   <Form.Control.Feedback>
//                                     Looks good!
//                                   </Form.Control.Feedback>
//                                 </Form.Group>

//                                 <Form.Group
//                                   required
//                                   as={Col}
//                                   md="12"
//                                   controlId="text-area"
//                                   style={{ marginTop: "1rem" }}
//                                 >
//                                   <Form.Label>
//                                     Any other reason, please specify{" "}
//                                     <span style={{ color: "red" }}>*</span>
//                                   </Form.Label>
//                                   <Form.Control
//                                     name="assessor_comments"
//                                     required
//                                     as="textarea"
//                                     rows={3}
//                                     className={`form-control ${touched.assessor_comments &&
//                                       errors.assessor_comments
//                                       ? "is-invalid"
//                                       : ""
//                                       }`}
//                                     value={values.assessor_comments}
//                                     onChange={handleChange}
//                                     isInvalid={
//                                       touched.assessor_comments &&
//                                       !!errors.assessor_comments
//                                     }
//                                   />
//                                   {touched.assessor_comments &&
//                                     errors.assessor_comments && (
//                                       <div className="invalid-feedback">
//                                         {errors.assessor_comments}
//                                       </div>
//                                     )}
//                                 </Form.Group>
//                               </Row>
//                             )}
//                             <Button variant="primary" onClick={submitForm}>
//                               Submit
//                             </Button>
//                           </Form>
//                         </Card.Body>
//                         <Card.Footer></Card.Footer>
//                       </Card>
//                     )}
//                   </Formik>
//                 ) : formSubmited == true ? (
//                   <Card className="custom-card shadow border-info bg-success-gradient">
//                     <Card.Header>
//                       <label
//                         className="main-content-label my-auto"
//                         style={{ textTransform: "none" }}
//                       >
//                         Assessor Comments
//                       </label>
//                       <div className="ms-auto  d-flex">
//                         25th April 2025:10:20PM
//                       </div>
//                     </Card.Header>
//                     <Card.Body>
//                       <Row className="mb-3">
//                         <Form.Label>
//                           <b>Remark:</b> <span>Document Uploaded</span>
//                         </Form.Label>
//                       </Row>
//                     </Card.Body>
//                     <Card.Footer className="d-flex justify-content-between">
//                       <Button
//                         variant="primary"
//                         onClick={() => {
//                           setFormSubmited(false);
//                           setFormData({});
//                         }}
//                       >
//                         Edit
//                       </Button>

//                       <Button variant="primary">Submit</Button>
//                     </Card.Footer>
//                   </Card>
//                 ) : (
//                   <h1>No Data</h1>
//                 )}
//               </div>
//             </>
//           )}
//         </Col>
//       </Row>

//       <Modal show={showXlModal} onHide={handleCloseModal} size="xl">
//         <Modal.Header closeButton>
//           <Modal.Title as="h6">Review Instructions</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           This section is to guide Desktop Assessor in Desktop Assessment. This
//           will act as guide to him. DGT admin can provide sample documents also.
//         </Modal.Body>
//       </Modal>
//     </>

//     // <Formik
//     //   validationSchema={yup.object().shape({
//     //     category: yup.string().required("Please select a category"),
//     //     Is_the_applicant_running_any_other_iti: yup
//     //       .string()
//     //       .required("Please select if applicant is running any other ITI"),
//     //   })}
//     //   validateOnChange={() => console.log("validateOnChange")}
//     //   onSubmit={(values) => {
//     //     console.log("Form submitted with values:", values);
//     //     setisHidden(false); // Show "Next" button after submission
//     //     let timerInterval;
//     //     Swal.fire({
//     //       title: "Saving on Local Storage",
//     //       html: "Please wait...",
//     //       timer: 2000,
//     //       timerProgressBar: true,
//     //       didOpen: () => {
//     //         Swal.showLoading();
//     //         const b = Swal.getHtmlContainer()?.querySelector("b");
//     //         if (b) {
//     //           timerInterval = setInterval(() => {
//     //             const remainingTime = Swal.getTimerLeft();
//     //             if (remainingTime) {
//     //               b.textContent = remainingTime.toString();
//     //             }
//     //           }, 100);
//     //         }
//     //         dispatch({ type: "set_comp_stateI_III", payload: values });
//     //       },
//     //       willClose: () => {
//     //         clearInterval(timerInterval);
//     //       },
//     //     })
//     //       .then((result) => {})
//     //       .catch((error) => {
//     //         console.error("Error saving to local storage:", error);
//     //       });
//     //   }}
//     //   initialValues={{
//     //     category: "",
//     //     Is_the_applicant_running_any_other_iti: "no",
//     //   }}
//     // >
//     //   {({ handleSubmit, handleChange, values, errors, touched }) => (
//     //     <Card className="custom-card shadow border-info">
//     //       {/* <Card.Header>
//     //         <div className="card-title" style={{ textTransform: "none" }}>
//     //           Basic Details of Applicant Entity
//     //         </div>
//     //       </Card.Header> */}
//     //       <Card.Body>
//     //         <Form ref={formRef2} onSubmit={handleSubmit} validated>
//     //           <Row className="mb-3">
//     //             <Form.Group>
//     //               <Form.Label>
//     //                 Whether BCC is as per norms?
//     //                 <span style={{ color: "red" }}>*</span>
//     //               </Form.Label>
//     //               <div>
//     //                 <Form.Check
//     //                   inline
//     //                   type="radio"
//     //                   label="Yes"
//     //                   name="Is_the_applicant_running_any_other_iti"
//     //                   value="yes"
//     //                   onChange={handleChange}
//     //                   checked={
//     //                     values.Is_the_applicant_running_any_other_iti === "yes"
//     //                   }
//     //                   isInvalid={
//     //                     touched.Is_the_applicant_running_any_other_iti &&
//     //                     !!errors.Is_the_applicant_running_any_other_iti
//     //                   }
//     //                 />
//     //                 <Form.Check
//     //                   inline
//     //                   type="radio"
//     //                   label="No"
//     //                   name="Is_the_applicant_running_any_other_iti"
//     //                   value="no"
//     //                   onChange={handleChange}
//     //                   checked={
//     //                     values.Is_the_applicant_running_any_other_iti === "no"
//     //                   }
//     //                   isInvalid={
//     //                     touched.Is_the_applicant_running_any_other_iti &&
//     //                     !!errors.Is_the_applicant_running_any_other_iti
//     //                   }
//     //                 />
//     //               </div>

//     //               <Form.Control.Feedback type="invalid">
//     //                 {errors.category}
//     //               </Form.Control.Feedback>
//     //             </Form.Group>
//     //           </Row>
//     //           {values.Is_the_applicant_running_any_other_iti === "no" && (
//     //             <Row className="mb-3">
//     //               <Form.Group as={Col} md="12" controlId="validationCustom02">
//     //                 <Form.Label>
//     //                   Select the Reason(s) and Raise Non-Conformities (NC)
//     //                   <span style={{ color: "red" }}>*</span>
//     //                 </Form.Label>
//     //                 <Select
//     //                   defaultValue=""
//     //                   isMulti
//     //                   options={MaxData}
//     //                   classNamePrefix="Select2"
//     //                 />
//     //                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//     //               </Form.Group>

//     //               <Form.Group
//     //                 as={Col}
//     //                 md="12"
//     //                 controlId="text-area"
//     //                 style={{ marginTop: "1rem" }}
//     //               >
//     //                 <Form.Label>
//     //                   Any other reason, please specify{" "}
//     //                   <span style={{ color: "red" }}>*</span>
//     //                 </Form.Label>
//     //                 <Form.Control required as="textarea" rows={3} />
//     //               </Form.Group>
//     //             </Row>
//     //           )}
//     //         </Form>
//     //       </Card.Body>
//     //       {/* <Card.Footer>
//     //               <Button>dsfdf</Button>
//     //             </Card.Footer> */}
//     //     </Card>
//     //   )}
//     // </Formik>
//   );
// };

// export const PhotosOfBuilding = () => {
//   return (
//     <Card className="custom-card shadow border-info">
//       <Card.Header>
//         <div className="card-title" style={{ textTransform: "none" }}>
//           <h5> Photos of Building</h5>
//         </div>
//       </Card.Header>
//       <Card.Body>
//         <Table
//           className="table-striped table-hover"
//           style={{ textAlign: "start" }}
//         >
//           <thead>
//             <tr>
//               <th scope="col">Particular</th>
//               <th>:</th>
//               <th scope="col">Filled By Applicant</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">Upload Front View Photo of Building</th>
//               <th>:</th>
//               <td>
//                 <Button variant="primary">View Photo</Button>
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">Upload Side View Photo of Building</th>
//               <th>:</th>
//               <td>
//                 <Button variant="primary">View Photo</Button>
//               </td>
//             </tr>

//             <tr>
//               <th scope="row">
//                 Upload Entrance Gate Photo of Plot (with Signage Board)
//               </th>
//               <th>:</th>
//               <td>
//                 <Button variant="primary">View Photo</Button>
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//       </Card.Body>
//       {/* <Card.Footer>
//                       <Button>dsfdf</Button>
//                     </Card.Footer> */}
//     </Card>
//   );
// };

// export const PhotosOfBuildingAction = () => {
//   return <h3>Verifiation Instruction Not Given in Manual</h3>;
// };

