import { Fragment, useEffect, createContext } from "react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stepper from "@keyvaluesystems/react-stepper";

import {
  STEPPER_STYLE, STAGE_II_APP_FORM_FLOW, FILLED, BUILDING_DETAIL,
  NOT_FILLED,
  AMENITIES_AREA,
  SIGNAGE_BOARDS,
  ELECTRICITY_CONNECTION_DETAILS,
  FEE_PAYMENT_FOR_STAGEII,
  TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS,
  DOCUMENT_UPLOADS, CIVIL_INFRASTRUCTURE_DETAIL,
  IN_ACTIVE,
  ACTIVE
} from "affserver";

import BuildingPlan from "../../components/new_registration/form/stateII/BuildingPlan";
import CivilInfrastructureDetails from "../../components/new_registration/form/stateII/CivilInfrastructureDetails";
import ElectricityConnectionDetails from "../../components/new_registration/form/stateII/ElectricityConnectionDetails";
import TradewiseMachineryToolsEquipmentDetails from "../../components/new_registration/form/stateII/TradewiseMachineryToolsEquipmentDetails";
import DocumentUploads from "../../components/new_registration/form/stateII/DocumentUploads";
import FeePayment from "../../components/new_registration/form/stateII/FeePayment";
import { Amenities } from "../../components/new_registration/form/stateII/Amenities";
import { SignageBoards } from "../../components/new_registration/form/stateII/SignageBoards";
import { useLocation } from "react-router-dom";

import { getStage2FormFlow } from "../../db/users";
import * as C from "affserver";
import * as ap from "@/services/applicant/index";


export const FormStageII = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");


  const data = STAGE_II_APP_FORM_FLOW.map((step) => ({ ...step, completed: step.status === FILLED }));

  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(data);

  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);


  const loadData = async () => {
    try {
      let List;
      var resp = await ap.getStage2FormFlow(appId);
      List = resp.data;
      if (List.length > 0) {
        const UpdatedLit = List.map((step) => ({ ...step, completed: step.status === FILLED }));
        console.log(UpdatedLit);
        setSteps(UpdatedLit);

        // Assuming you want to find the index of the first step where the 'completed' field is true
        const lastFilledIndex = [...resp.data].reverse().findIndex((step) => step.status === "FILLED");
        console.log('Index of completed step:', lastFilledIndex);

        setActiveStep(lastFilledIndex);
      }
      else {
        List = data.map((step) => { return { ...step, completed: step?.status === FILLED } });
        console.log(data);
        setSteps(data);
      }


      console.log(List);

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

  // const next = (step, index) => {
  //   setActiveStep(++index);
  //   console.log(step, index)
  // }

  const next = async (step, index) => {
    const updated = steps.map((obj) => {
      if (obj.step === step.step) {
        obj = { ...obj, completed: obj.step === step.step, status: step.step === FILLED }
      }
      else if (step.step == obj.nextStep) {
        obj = { ...obj, stepStatus: ACTIVE }
      }
      return obj;
    });

    await setSteps(updated);
    await setActiveStep(++index);
  }

  const finish = (step, index) => {
    console.log(step, index)
  }


  const setStepContent = (step, stepIndex) => {
    console.log(steps, step, stepIndex);
    switch (step.step) {
      case BUILDING_DETAIL:
        return <BuildingPlan nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} FormContext />
      case CIVIL_INFRASTRUCTURE_DETAIL:
        return <CivilInfrastructureDetails nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} />
      case AMENITIES_AREA:
        return <Amenities nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} />
      case SIGNAGE_BOARDS:
        return <SignageBoards nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} />
      case ELECTRICITY_CONNECTION_DETAILS:
        return <ElectricityConnectionDetails nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} />
      case FEE_PAYMENT_FOR_STAGEII:
        return <FeePayment nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} />
      case TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS:
        return <TradewiseMachineryToolsEquipmentDetails nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} />
      case DOCUMENT_UPLOADS:
        return <DocumentUploads nav={object(step, stepIndex)} step={step} setActive={goToSection} refreshSteps={loadData} />
      default:
        return ''
    }
  }

  const handleStepClick = (step, index) => {

    console.log(step, index);
    // setActiveStep(index);
    if (step.stepStatus === ACTIVE || step.status === FILLED) { setActiveStep(index) }
  };

  return (
    <Fragment>
      <Stepper
        styles={STEPPER_STYLE}
        steps={steps}
        currentStepIndex={activeStep}
        orientation="horizontal"
        labelPosition="bottom"
        onStepClick={handleStepClick}
        stepContent={setStepContent}
      />
    </Fragment>
  );
};
