import { Fragment, useEffect, useRef, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { InputGroup, Modal } from "react-bootstrap";
import { ChatMessage } from "../../../Assessment/ReviewTrail";
import { Form as BootstrapForm, Table } from "react-bootstrap";


import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import * as formik from "formik";

import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { ADD_MORE_TRADE } from "affserver";

import { trade_unit_reducer_yupObject } from "../../../../reducers/newAppReducer";
import { ctsTrades, UPDATE_TRADE_UNIT } from "affserver";
import * as C from "affserver";

import { setInstTradeDetails } from "../../../../db/appList";
import { useLocation } from "react-router-dom";
import { Navigations } from "../../../Assessment/components";
import { markAsCompleteStageAssessmentFlow, setStageIAssessmentFlow } from "../../../../db/forms/stageI/set/set";

import * as set from "../../../../db/forms/stageI/set/set";
import * as ap from "../../../../services/applicant/index";


import * as gen from "../../../../services/general/index";
import * as st from "../../../../services/state/index";

import { trades } from "affserver";
import { ContextMap } from "../../../formik/contexts";
import { SelectField, TextField } from "../../../formik/Inputs";

import { useContext } from "react";


const DetailsOfDocumentsToBeUploaded = ({ step, setActive, refreshSteps, nav }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const authUser = useSelector((state) => state.loginUserReducer);

  console.log(step);

  const reg = useSelector((state) => state.reg);

  const dispatch = useDispatch();

  const formikRef = useRef();
  const trade_unit_values = useSelector((state) => state.trade_unit_reducer);

  const [masterTradeList, setMasterTradeList] = useState([]);

  const loadData = async () => {
    try {
      const result = await ap.getInstTradeDetails(appId);
      setMasterTradeList(result.data);

      const result2 = await ap.getFilledTrades(appId);
      console.log(result2.data);

      formikRef.current.setValues(result2.data);

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const onNext = async () => {
    try {
      await formikRef.current.validateForm();
      console.log(formikRef.current.errors);
      formikRef.current.setTouched(
        Object.keys(formikRef.current.values).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      );

      if (formikRef.current.isValid != true) {
        throw new Error("Please Submit Form");
      }
      console.log(formikRef.current.isValid, formikRef.current.errors);
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to Proceed",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Okay, Proceed",
        cancelButtonText: "Cancel",
      });
      if (confirmResult.isConfirmed) {
        try {
          let result, resp;
          Swal.fire({ title: "Saving...", text: "Please wait while we save your data.", allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
          await ap.setInstTradeDetails(formikRef.current.values, appId, step);
          Swal.close(); // close loading in case it’s still open

          result = await Swal.fire("Saved!", "Your form data has been saved.", "success");
          if (result.isConfirmed) {
            nav.next();
            // navigate(0); // reloads current route
          }
        } catch (error) {
          console.error("Error while saving:", error);
          Swal.close(); // close loading in case it’s still open
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "Failed to save verification remarks."
          });
        }
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Formik
        enableReinitialize={true} // 👈 key line to re-sync with Redux
        innerRef={formikRef}
        initialValues={trades.intiValues}
        validationSchema={trades.valSchema}
        validateOnChange={true}
      >
        {({ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur }) => (
          <ContextMap.Stage1Form.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur }} >
            <Form noValidate onSubmit={handleSubmit}>
              <Card className="custom-card border border-primary">
                <Card.Header>
                  <div className="card-title" style={{ textTransform: "none" }}>
                    Details of Trade(s)/Unit(s) for Affiliation
                  </div>
                </Card.Header>
                <Card.Body>
                  <FieldArray name="trades">
                    {({ push, remove }) => (
                      <Card className="custom-card border border-primary">
                        {errors.trades && typeof errors.trades === "string" && (
                          <div className="alert alert-danger mt-2 mb-0" role="alert">
                            {errors.trades}
                          </div>
                        )}
                        <Card.Header>
                          <div className="card-title" style={{ textTransform: "none" }}>
                            Select Trades
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Table bordered hover>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Select Trade <span style={{ color: "red" }}>*</span></th>
                                <th>Unit in Shift 1 <span style={{ color: "red" }}>*</span></th>
                                <th>Unit in Shift 2<span style={{ color: "red" }}>*</span></th>
                                {/* <th>Unit in Shift 3<span style={{ color: "red" }}>*</span></th> */}
                                {values.trades.length > 4 && (<th>Action</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {values.trades.map((doc, index) => {
                                // get already selected trade_ids
                                const selectedTrades = values.trades.map(p => p.trade);
                                console.log(selectedTrades);
                                // // allow all options except already selected ones (but keep current one selectable)
                                const availableOptions = masterTradeList.filter(
                                  opt => !selectedTrades.includes(opt.trade_id) || opt.trade_id === doc.trade
                                );

                                return (
                                  <tr
                                    key={index}
                                    style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "10px", }}
                                  >
                                    <td>{index + 1}</td>
                                    <td>
                                      <SelectField
                                        // label="State"
                                        name={`trades[${index}].trade`}
                                        // mandatory
                                        options={availableOptions}
                                        contextName="Stage1Form"
                                        // onValueChange={(val) => OnApplicantEntityStateChange(val, 'cmp_post_district')}
                                        valueProp="trade_id"
                                        labelProp="trade_name"
                                        size="lg"
                                      />
                                    </td>
                                    <td>
                                      <TextField name={`trades[${index}].units_in_shift_1`} type="number" contextName="Stage1Form" size="lg" />
                                    </td>
                                    <td>
                                      <TextField name={`trades[${index}].units_in_shift_2`} type="number" contextName="Stage1Form" size="lg" />
                                    </td>
                                    {/* <td>
                                      <TextField name={`trades[${index}].units_in_shift_3`} type="number" contextName="Stage1Form" size="lg" />
                                    </td> */}

                                    {/* Remove Button */}
                                    {values.trades.length > 4 && (
                                      <td><Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button></td>
                                    )}

                                  </tr>)
                              })}
                            </tbody>
                          </Table>
                        </Card.Body>
                        <Card.Footer className="text-start">
                          {values.trades.length < 25 && (
                            <Button className="mb-3" onClick={() =>
                              push({ trade: "", units_in_shift_1: "", units_in_shift_2: "", units_in_shift_3: "" })
                            }>
                              Add More
                            </Button>
                          )}

                        </Card.Footer>
                      </Card>
                    )}
                  </FieldArray>
                </Card.Body>
                {/* <Card.Footer>
                <div className="d-flex justify-content-between mb-3">
                  <Button onClick={() => {
                    // setActive(reg.steps[0]);
                  }}
                    className="p-2" variant="warning">
                    Previous
                  </Button>
                  <Button className="p-2"
                    variant="success"
                    onClick={() => formikRef.current?.submitForm()}
                  >
                    Save & Continue
                  </Button>
                </div>
              </Card.Footer> */}
              </Card>
            </Form>
          </ContextMap.Stage1Form.Provider>
        )}
      </Formik>
      <Navigations nav={nav} onNext={() => { onNext(); }} />
    </Fragment>
  );
};

export default DetailsOfDocumentsToBeUploaded;


export const Assessment_DetailsOfDocumentsToBeUploaded = ({ step, view: viewProp = false, isView = false, nav }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  // const MaxData = [
  //   { value: "Document is not legible", label: "Document is not legible" },
  //   { value: "Document is irrelevant", label: "Document is irrelevant" },
  //   {
  //     value: "Document lacks required information",
  //     label: "Document lacks required information",
  //   },
  //   {
  //     value:
  //       "Document is not approved by the competent authority in the State/ UT",
  //     label:
  //       "Document is not approved by the competent authority in the State/ UT",
  //   },
  //   {
  //     value:
  //       "Address on the document does not match with the proposed land/ building address",
  //     label:
  //       "Address on the document does not match with the proposed land/ building address",
  //   },
  //   {
  //     value:
  //       "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
  //     label:
  //       "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
  //   },
  //   {
  //     value: "other",
  //     label: "other",
  //   },
  // ];

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  const Context = ContextMap['stageIAsmtDetails'] || ContextMap.default;
  const { assessmentInfo } = useContext(Context);

  console.log(assessmentInfo);


  // const [showXlModal, setShowXlModal] = useState(false);
  // const [selectedSize, setSelectedSize] = useState("");

  // const handleShowModal = (size) => {
  //   switch (size) {
  //     case "xl":
  //       setShowXlModal(true);
  //       break;
  //     default:
  //       break;
  //   }
  //   setSelectedSize(size);
  // };

  // const handleCloseModal = () => {
  //   setShowXlModal(false);
  //   setSelectedSize("");
  // };

  // const [formData, setFormData] = useState({});
  // const [formSubmited, setFormSubmited] = useState(false);

  // const messages = [
  //   {
  //     userType: "Assessor",
  //     username: "Alice",
  //     text: "Hello!",
  //     datetime: "10:30 AM",
  //     isUser: true,
  //     comp: () => <AssessorRemarkHistory title="Building Plan" />,
  //   },
  //   {
  //     userType: "Applicant",
  //     username: "You",
  //     text: "Hi Alice!",
  //     datetime: "10:31 AM",
  //     isUser: false,
  //     comp: ItiRemarkHistory,
  //   },
  //   {
  //     userType: "Assessor",
  //     username: "Alice",
  //     text: "Hello!",
  //     datetime: "10:30 AM",
  //     isUser: true,
  //     comp: () => <AssessorRemarkHistory title="Building Plan" />,
  //   },
  // ];
  // const stageI1_info = useSelector((state) => state.theme.new_registration);
  const index = 1;


  useEffect(() => {
    console.log(step);
  }, [step])


  const onNext = async () => {
    // Set Flow if Not exit 


    const confirmResult = await Swal.fire({ title: "Are you sure?", text: "Do you want to Proceed", icon: "question", showCancelButton: true, confirmButtonText: "Okay, Proceed", cancelButtonText: "Cancel", });
    if (!confirmResult.isConfirmed) { console.log("User cancelled save"); return; }

    const result = await Swal.fire("Saved!", "Your form data has been saved.", "success");
    if (result.isConfirmed) {
      try {
        // Set Flow if not exist
        // await setStageIAssessmentFlow(appId);
        // await markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step);

        await st.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step, assessmentInfo.assessment_id, nav.step.slno);

        nav.next();
        // window.location.reload();
      } catch (err) {
        console.error("Error while saving:", err);
      }
    }

  }

  const [info, setInfo] = useState({});
  const [tradeList, setTradeList] = useState([]);

  const getInfo = async () => {
    try {

      Swal.fire({
        title: "Loading...",
        text: "Please wait while we fetch the data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let resp = await gen.getDetails(appId);
      // console.log(resp.data?.new_insti_trade_list);
      setTradeList(resp.data?.new_insti_trade_list || []); // fallback to []
      Swal.close();

    } catch (error) {
      console.error(error);
      Swal.close();
      console.error("Error fetching entity details:", error);
      Swal.fire("Error", "Failed to fetch data.", "error");
    }
  };
  useEffect(() => { getInfo() }, [appId]);

  useEffect(() => {
    console.log("Fetched info:", info);
  }, [info]);
  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(245, 245, 245)",
          margin: "10px 0px 0px",
          borderRadius: 6,
          borderStyle: "dashed",
          borderWidth: "thin",
          padding: "10px",
        }}
      >
        <table
          width="98%"
          border={1}
          style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
          align="center"
          cellPadding="5px"
        >
          <tbody>
            <tr>
              <th colSpan={4} style={{ border: "1px solid black" }}>Details of Trade(s)/Unit(s) for Affiliation</th>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Trade </th>
              <th style={{ border: "1px solid black" }}>Unit in Shift 1</th>
              <th style={{ border: "1px solid black" }}>Unit in Shift 2</th>
              {/* <th style={{ border: "1px solid black" }}>Unit in Shift 3</th> */}
            </tr>
            {tradeList.map((trade, idx) => {

              return (
                <tr key={idx}>
                  <td style={{ border: "1px solid black" }}>{trade.trade_name}</td>
                  <td style={{ border: "1px solid black" }}>{trade.unit_in_shift1}</td>
                  <td style={{ border: "1px solid black" }}>{trade.unit_in_shift2}</td>
                  {/* <td style={{ border: "1px solid black" }}>{trade.unit_in_shift3}</td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {isView == false && <Navigations nav={nav} onNext={onNext} />}
    </>
  );
};

export const AssessorRemarkHistory = ({ title }) => {
  return (
    <Card className="custom-card">
      {/* <Card.Header>
        <label
          className="main-content-label my-auto"
          style={{ textTransform: "none" }}
        >
          Assessor Comments
        </label>
        <div className="ms-auto  d-flex">20th April 2025:10:20PM</div>
      </Card.Header> */}
      <Card.Body>
        <Row className="mb-3">
          <Form.Label>
            <b>Whether {title ? title : "Document"} is as per norms?:</b>{" "}
            <u>
              <span>No</span>
            </u>
          </Form.Label>
          <Form.Label>
            <b>Reason:</b>{" "}
            <u>
              <span>Document is Irrelavent</span>
            </u>
          </Form.Label>
          <Form.Label>
            <b>Remark:</b>{" "}
            <u>
              <span>Not Ok</span>
            </u>
          </Form.Label>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <div className="text-gray-7">20th April 2025 10:00AM</div>
      </Card.Footer>
    </Card>
  );
};
export const ItiRemarkHistory = () => {
  const childWindowRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(
    "https://nimionlineadmission.in/iti/downloads/Format-%202%20Resolution%20for%20Establishment%20of%20New%20Industrial%20Training%20Institute.pdf"
  );

  const viewSampleDocument = () => {
    if (childWindowRef.current && !childWindowRef.current.closed) {
      childWindowRef.current.focus();
      return;
    }

    const newWindow = window.open("", "", "width=400,height=400");
    if (!newWindow) {
      alert("Popup blocked.");
      return;
    }

    newWindow.document.title = "Sample Document";

    const container = newWindow.document.createElement("div");
    newWindow.document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);

    root.render(
      <embed src={photoURL} type="application/pdf" width="100%" height="100%" />
      // <img
      //   src={photoURL}
      //   alt="Captured"
      //   style={{ width: "100%", maxWidth: "100%" }}
      // />
    );

    // Optional: Cleanup when the window is closed
    newWindow.addEventListener("beforeunload", () => {
      root.unmount();
    });

    childWindowRef.current = newWindow;
  };

  return (
    <Card className="custom-card shadow border-info">
      <Card.Body>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>
              <b>Remark:</b> <span>Document Uploaded</span>
            </Form.Label>
          </Col>
          <Col md={12}>
            {" "}
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewSampleDocument}
            >
              View Document
            </button>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <div className="text-gray-7">20th April 2025 10:00AM</div>
      </Card.Footer>
    </Card>
  );
};

