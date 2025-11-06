import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";

import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pageheader from "../../layouts/Pageheader";
import { Stepper, Step } from "react-form-stepper";

import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { label } from "yet-another-react-lightbox";

import BuildingPlan from "./form/stateII/BuildingPlan";
import CivilInfrastructureDetails from "./form/stateII/CivilInfrastructureDetails";
import ElectricityConnectionDetails from "./form/stateII/ElectricityConnectionDetails";
import TradewiseMachineryToolsEquipmentDetails from "./form/stateII/TradewiseMachineryToolsEquipmentDetails";
import DocumentUploads from "./form/stateII/DocumentUploads";
import FeePayment from "./form/stateII/FeePayment";
import {Amenities} from "./form/stateII/Amenities";
import {SignageBoards} from "./form/stateII/SignageBoards";
import {FormStageII} from "../../screens/application forms/stage_II_with_stepper";
const New_registration = () => {
  const reg = useSelector((state) => state.reg);
  const [activeStep, setActiveStep] = useState(reg.stepsII[0]);

  const goToSection = (step, index) => {
    setActiveStep(step);
  };

  return (
    <Fragment>
      <Pageheader
        mainheading={`Stage-II Application Form`}
        parentfolder="Dashboard"
        activepage="Stage-II Application Form"
      />
      <FormStageII/>
    </Fragment>
  );
};

export default New_registration;
