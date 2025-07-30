import { Fragment, useEffect } from "react";
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
  DOCUMENT_UPLOADS, CIVIL_INFRASTRUCTURE_DETAIL
} from "../../constants";

import BuildingPlan from "../../components/new_registration/form/stateII/BuildingPlan";
import CivilInfrastructureDetails from "../../components/new_registration/form/stateII/CivilInfrastructureDetails";
import ElectricityConnectionDetails from "../../components/new_registration/form/stateII/ElectricityConnectionDetails";
import TradewiseMachineryToolsEquipmentDetails from "../../components/new_registration/form/stateII/TradewiseMachineryToolsEquipmentDetails";
import DocumentUploads from "../../components/new_registration/form/stateII/DocumentUploads";
import FeePayment from "../../components/new_registration/form/stateII/FeePayment";
import { Amenities } from "../../components/new_registration/form/stateII/Amenities";
import { SignageBoards } from "../../components/new_registration/form/stateII/SignageBoards";



export const FormStageII = () => {
  const stage = useSelector((state) => state.reg.stepsII);
  const [activeStep, setActiveStep] = useState(0);
  const data = STAGE_II_APP_FORM_FLOW.map((step) => ({ ...step, completed: step.status === FILLED }));
  const [steps, setSteps] = useState(data);


  const handleStepClick = (step, index) => { setActiveStep(index) };

  const initialStepsArr = [
    {
      stepLabel: "IT Lab",
      // stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
      step: "IT Lab"
    },
    ...[{
      stepLabel: "Fitter",
      // stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
      step: "trade"
    },
    {
      stepLabel: "Electrician",
      // stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
      step: "trade"
    },]
  ];


  useEffect(() => {
    // const data = STAGE_II_APP_FORM_FLOW.map((step) => ({ ...step, completed: step.status === FILLED }));
    const firstFilledIndex = STAGE_II_APP_FORM_FLOW.findIndex(step => step.status === FILLED);
    const currentStep = firstFilledIndex !== -1 ? firstFilledIndex : 0;
    console.log(data);
    setSteps(data);
    setActiveStep(currentStep);
  }, []);

  const goToSection = (step, index) => {
    setActiveStep(step);
  };

  const setStepContent = (step, stepIndex) => {
    console.log(step, stepIndex);
    switch (step.step) {
      case BUILDING_DETAIL:
        return <BuildingPlan setActive={goToSection} />
      case CIVIL_INFRASTRUCTURE_DETAIL:
        return <CivilInfrastructureDetails setActive={goToSection} stepInfo={activeStep} />
      case AMENITIES_AREA:
        return <Amenities setActive={goToSection} stepInfo={activeStep} />
      case SIGNAGE_BOARDS:
        return <SignageBoards setActive={goToSection} stepInfo={activeStep} />
      case ELECTRICITY_CONNECTION_DETAILS:
        return <ElectricityConnectionDetails stepInfo={activeStep} setActive={goToSection} />
      case FEE_PAYMENT_FOR_STAGEII:
        return <FeePayment stepInfo={activeStep} setActive={goToSection} />
      case TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS:
        return <TradewiseMachineryToolsEquipmentDetails stepInfo={activeStep} />
      case DOCUMENT_UPLOADS:
        return <DocumentUploads stepInfo={activeStep} />
      default:
        return ''
    }
  }

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
