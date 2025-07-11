import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";

import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pageheader from "../../layouts/Pageheader";
import { Assessment_Basic_Detail } from "../new_registration/form/stegeI/BasicDetailsofApplicantOrganization";
import { Assessment_Proposed_Institute } from "../new_registration/form/stegeI/DetailsOfTheProposedInstitute";
import { Assessment_DetailsOfDocumentsToBeUploaded } from "../new_registration/form/stegeI/DetailsOfTradeUnitForAffiliation";
import { Assessment_Details_of_Land } from "../Assessment/stage-I/DetailsOfTheLandToBeUsedForTheITI";

import { Assessment_stage_I_DetailsOfDocumentsToBeUploaded } from "../Assessment/stage-I/DocumentsUpload";
import { Name_of_the_institute } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/name_of_the_institute";
import { AddressOfInstitute } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/view/Address_of_Institute";
import { InstituteLocation } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/instituteLocation";

import { LandDocuments } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/land_documents"
import { Documents } from "../new_registration/form/stegeI/view/stage_1/detail_of_proposed_institute/assessment_view/documents"



const ViewApplicationStageOne = () => {
  const reg = useSelector((state) => state.reg);
  const [activeStep, setActiveStep] = useState(reg.steps[0]);

  useEffect(() => {
    console.log(activeStep);
  }, [reg]);

  const goToSection = (step, index = null) => {
    setActiveStep(step);
  };
  return (
    <Fragment>
      <Pageheader
        mainheading={`View Application Stage-I`}
        parentfolder="Dashboard"
        activepage="View Application Stage-I"
      />

      <Assessment_Basic_Detail />

      <Name_of_the_institute />

      <AddressOfInstitute />

      <InstituteLocation />

      <Assessment_DetailsOfDocumentsToBeUploaded />

      <LandDocuments view={true} />
      <Documents view={true} />

    </Fragment>
  );
};

export default ViewApplicationStageOne;
