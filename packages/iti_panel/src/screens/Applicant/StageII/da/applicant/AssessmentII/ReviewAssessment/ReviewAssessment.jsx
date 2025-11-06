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


export const FormContext = createContext();
export const ReviewAssessment = ({ step, nav }) => {
  console.log(step);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");


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




  const formsRef = useRef({});
  const registerForm = (id, formikRef) => {
    formsRef.current[id] = formikRef;
  };
  const unregisterForm = (id) => {
    delete formsRef.current[id];
  };
  const navigate = useNavigate();


  const onNext = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Send Application for Assessment",
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
      await st.setSendStageIIApplicationToState(appId, step.assessment_id);

    
      Swal.fire("Success!", "Your Application has been sent for Assessment", "success").then((result) => {
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

      const resp = await st.getStageIIStatus(appId, step.assessment_id);
      console.log(resp.data);
      const { action } = resp.data;
      setResp(resp.data);
      switch (action) {
        case C.SL.SEND_TO_ASSESSOR:
          setLastLabel("Send Application to Assessor");
          setLastVeriant("success");
          setShowLast(true);
          break;
        case C.SL.REMOVE_DEFICIENCIES_FIRST:
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
                    {resp.action === C.SL.SEND_TO_ASSESSOR && (<Card.Body style={{ padding: "5px" }} >
                      <p><h4>Dear Applicant,</h4></p>
                      <p>You have successfully uploaded your documents to address the non-conformity (NC). To proceed, please click the "Forward for Assessment" button to resubmit your application for further evaluation.</p>
                    </Card.Body>)}

                    {resp.action === C.SL.REMOVE_DEFICIENCIES_FIRST && (<Card.Body style={{ padding: "5px" }} >
                      <p><h4>Dear Applicant,</h4></p>
                      <p>You have to remove Deficiency First</p>
                    </Card.Body>)}
                  </Card>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Navigations nav={nav}
                  onLast={() => {
                    if (resp.action === C.SL.SEND_TO_ASSESSOR) {
                      onNext?.();
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
