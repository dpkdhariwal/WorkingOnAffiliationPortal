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
import ReqSign from "../comp/requiredSign";

import MTE from "./component/machinery_form";
import { setAppFlow } from "../../../../db/users";
import { useLocation } from "react-router-dom";
import { STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS } from "affserver";
import { STEPPER_STYLE } from "affserver";
import * as C from "affserver";
import { ItLabMte } from "./ItLabMte";
import { MachineryToolEquipment } from "./MachineryToolEquipment";


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

const TradewiseMachineryToolsEquipmentDetails = ({ nav, step = {}, setActive, refreshSteps }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const [currentStep, setCurrentStep] = useState(0);
  const handleStepClick = (step, index) => setCurrentStep(index);

  const [activeStep, setActiveStep] = useState(0);

  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);

  const prepareSteps = () => step.subSteps.map((step) => ({ ...step, stepLabel: step.stepTitle, completed: step.status === C.SL.FILLED }));
  const [steps, setSteps] = useState(prepareSteps);


  const loadData = async () => {
    try {
      let List;
      List = step.subSteps.map((step) => ({ ...step, stepLabel: step.stepTitle, completed: step.status === C.SL.FILLED }))
      console.log(List.length);
      setSteps(List);
      const firstIndex = 0;                 // Always 0 for the first element
      const lastIndex = List.length - 1;   // Length minus 1 for the last element
      setFirstIndex(firstIndex);
      setLastIndex(lastIndex);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);



  const goToSection = (step, index) => {
    setActiveStep(step);
  };

  const object = (step, stepIndex) => {
    let obj = {
      firstIndex: firstIndex,
      lastIndex: lastIndex,
      currentIndex: stepIndex,
      step: step,
      previous: () => { return previous(step, stepIndex); },
      next: () => { return next(step, stepIndex); },
      finish: () => { return finish(step, stepIndex); }
    };
    return obj;
  }

  const previous = (step, index) => {
    console.log(step, index);
    setActiveStep(--index);
    return step;
  }

  const next = (step, index) => {
    setActiveStep(++index);
    console.log(step, index)
  }

  const finish = (step, index) => {
    console.log(step, index)
  }

  const setStepContent = (step, stepIndex) => {
    console.log(step);
    switch (step.step) {
      case C.CIK.SPECIFICATIONS_OF_IT_LAB:
        return (<ItLabMte nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} />)
      case C.CIK.TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS:
        return (<MachineryToolEquipment nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} />)
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
              steps={steps}
              currentStepIndex={activeStep}
              // orientation="vertical"
              orientation="horizontal"
              labelPosition="center"
              onStepClick={handleStepClick}
              stepContent={setStepContent}
            />
          </Card.Body>
          {/* <Card.Footer>
                  <Button onClick={markascomplete}>Mark as Complete</Button>
                </Card.Footer> */}
        </Card>

      )}
    </Fragment>
  );
};

export default TradewiseMachineryToolsEquipmentDetails;



