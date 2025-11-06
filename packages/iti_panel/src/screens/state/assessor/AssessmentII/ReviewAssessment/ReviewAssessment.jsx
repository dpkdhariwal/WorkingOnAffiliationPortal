import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";

import { useLocation } from "react-router-dom";

import * as C from "affserver";

import * as st from "@/services/state/index";

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { st1_da_landdocuments } from "affserver";
import { ContextMap } from "@/components/formik/contexts";
import { Navigations } from "@/components/Assessment/components";
import { BuildingPlan_asmt } from "../Building Detail/BuildingPlan";


export const FormContext = createContext();
export const ReviewAssessment = ({ step, nav }) => {
  console.log(step);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");


  const Context = ContextMap['stageIAsmtDetails'] || ContextMap.default;
  const { assessmentInfo } = useContext(Context);

  const formRefs = useRef([]);




  const [lastLabel, setLastLabel] = useState("Wait...");
  const [lastVeriant, setLastVeriant] = useState("Wait...");
  const [showLast, setShowLast] = useState(false);
  const [resp, setResp] = useState({});




  const [vCompList, setVCompList] = useState([]);
  const addItem = (newItem) => {
    setVCompList((prev) => [...prev, newItem]);
  };


  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();


  // Experiment Starts @dpkdhariwal
  const registry = useRef([]); // store all child functions
  const register2 = (index, obj) => {
    registry.current[index] = obj;
  };


  const setLandContent = (item, title) => {
    // console.log(step?.actor);
    // switch (step?.actor) {
    //   // case C.SL.APPLICANT:
    //   //   return <LandAreaApplicantForm data={item} />
    //   // break;
    //   case C.SL.ASSESSOR:
    //     return <LandArea data={item} />
    //   // break;
    //   default:
    //     return "NA";
    // }
  }

  const formsRef = useRef({});
  const registerForm = (id, formikRef) => {
    formsRef.current[id] = formikRef;
  };
  const unregisterForm = (id) => {
    delete formsRef.current[id];
  };
  const navigate = useNavigate();

  const markAsComplete = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Send Application to Applicant for Remove Deficiencies",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Okay, Proceed",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      console.log("User cancelled save");
      return;
    }

    try {
      // await st.setSendApplicationToApplicant(appId, info.assessmentStatus.assessment_id);

      Swal.fire("Saved!", "Your form data has been saved.", "success").then((result) => {
        if (result.isConfirmed) {
          navigate(`/dashboard/AppList/`);
        }
      }).catch(() => {
        console.log('dfadfasf');
      });

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while saving.", "error");
    }
  }

  const onNext = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Send Application to Applicant for Remove Deficiencies",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Okay, Proceed",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      console.log("User cancelled save");
      return;
    }

    try {
      await st.SendStageIIApplicationToApplicant(appId, step.assessment_id);

      Swal.fire("Saved!", "Your form data has been saved.", "success").then((result) => {
        if (result.isConfirmed) {
          navigate(`/dashboard/AppList/`);
        }
      }).catch(() => {
        console.log('dfadfasf');
      });

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while saving.", "error");
    }
  }

  const loadData = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      });

      const resp = await st.getReviewStatusforStageII(appId, step.assessment_id);
      console.log(resp.data);
      const { action } = resp.data;
      setResp(resp.data);
      switch (action) {
        case C.SL.MARK_AS_COMPLETE:
          setLastLabel("Mark as Complete Assessment");
          setLastVeriant("success");
          setShowLast(true);
          break;
        case C.SL.SEND_TO_APPLICANT:
          setLastLabel("Send Application to Applicant");
          setLastVeriant("danger");
          setShowLast(true);
          break;
        case C.SL.COMPLETE_ASSESSMENT_FIRST:
          setLastLabel("...");
          setLastVeriant("...");
          setShowLast(false);
          break;
        default:
          setShowLast(false);
          break;
      }
      Swal.close();
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Data Fatch Failed",
        text: "Something went wrong while saving. Please try again.",
      });
      console.error(error);
    }
  };

  useEffect(() => { loadData(); }, []);
  const formRef = useRef({});
  return (
    <FormContext.Provider value={{ registerForm, unregisterForm }}>
      <Formik innerRef={formRef}
        enableReinitialize
        onSubmit={(values) => { console.log(values); }}>
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }) => {
          return (
            <Card className="custom-card border border-success">
              <Card.Header>
                <div className="card-title" style={{ textTransform: "none" }}>
                  <h5>Information</h5>
                </div>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} validated>
                  <Card className="custom-card border border-success" style={{ padding: "0px" }}>
                    {resp.action === C.SL.SEND_TO_APPLICANT && (<Card.Body style={{ padding: "5px" }} >
                      <p>{`The Stage-II assessment of the application has been successfully completed. Please forward the application to the applicant for entering the required staff details.`}</p>
                    </Card.Body>)}

                    {resp.action === C.SL.COMPLETE_ASSESSMENT_FIRST && (<Card.Body style={{ padding: "5px" }} >
                      Please Verify Documents First
                    </Card.Body>)}
                  </Card>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Navigations nav={nav}
                  onLast={() => {
                    if (resp.action === C.SL.SEND_TO_APPLICANT) {
                      onNext?.();
                    } else if (resp.action === C.SL.MARK_AS_COMPLETE) {
                      markAsComplete?.();
                    }
                  }} lastLabel={lastLabel} lastVeriant={lastVeriant} showLast={showLast} />
              </Card.Footer>
            </Card>
          )
        }}
      </Formik>

    </FormContext.Provider>
  );
};
