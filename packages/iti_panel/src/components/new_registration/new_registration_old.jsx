import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";

import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Pageheader from "../../layouts/Pageheader";
import { Stepper, Step } from "react-form-stepper";

import CategoryOfApplicantOrganization from "./form/stegeI/CategoryOfApplicantOrganization";
import BasicDetailsofApplicantOrganization from "./form/stegeI/BasicDetailsofApplicantOrganization";
import DetailsOfTheProposedInstitute from "./form/stegeI/DetailsOfTheProposedInstitute";
import DetailsOfTheLandToBeUsedForTheITI from "./form/stegeI/DetailsOfTheLandToBeUsedForTheITI";
import DetailsOfDocumentsToBeUploaded from "./form/stegeI/DetailsOfDocumentsToBeUploaded";
import PreviewOfApplication from "./form/stegeI/PreviewOfApplication";
import DetailsOfTradeUnitForAffiliation from "./form/stegeI/DetailsOfTradeUnitForAffiliation";
import FeePayment from "./form/stegeI/FeePayment";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const New_registration = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  const [stage, setStage] = useState("");
  const [form_id, setSorm_id] = useState("");
  const [active, setActive] = useState(0);
  const st = useSelector((state) => state.theme.new_registration);

  // const lang = useSelector((state) => state.lang);
  // const dir = useSelector((state) => state.dir);
  // const dispatch = useDispatch();

  useEffect(() => {
    console.log("New Registration", st.stageISteps);
  }, []);

  // useEffect(() => {
  //   switch (stage) {
  //     case "1":
  //       console.log("Stage I logic here");
  //       break;
  //     case "2":
  //       console.log("Stage II logic here");
  //       break;
  //     case "3":
  //       console.log("Stage III logic here");
  //       break;
  //     default:
  //       console.warn("Unknown stage:", stage);
  //   }
  // }, [stage]);

  useEffect(() => {
    console.log("parameters are changed");
    const queryParams = new URLSearchParams(location.search);
    const stage = queryParams.get("stage");
    const form_id = queryParams.get("form_id");
    const active_p = queryParams.get("active");
    setActive(active_p || 0);
    setStage(stage || "1");
    setSorm_id(form_id || "Applicant Entity Details");
  }, [location.search]); // rerun whenever query parameters change

  useEffect(() => {
    console.log("active:", active);
  }, [active]); // runs every time `name` changes

  const goToSection = () => {
    setActive(active + 1);
    console.log("active:", active);
    // navigate(`?active=${active}&stage=1&form_id=Fee Payment`)
  };

  const goToNext = () => {
    setActive(active + 1);
    console.log("active:", active);
    // navigate(`?active=${active}&stage=1&form_id=Fee Payment`)
  };
  const goToPrevious = () => {
    setActive(active - 1);
    console.log("active:", active);
    // navigate(`?active=${active}&stage=1&form_id=Fee Payment`)
  };

  // const navigateSection = (step) => {
  //   console.log(step);
  //   // switch (step) {
  //   //   case 0:
  //   //     navigate("?active=0&stage=1&form_id=Applicant Entity Details");
  //   //     break;
  //   //   case 1:
  //   //     navigate("?active=1&stage=1&form_id=Details of the Proposed Institute");
  //   //     break;
  //   //   case 2:
  //   //     navigate(
  //   //       "?active=2&stage=1&form_id=Details of Trade(s)/Unit(s) for Affiliation"
  //   //     );
  //   //     break;
  //   //   case 3:
  //   //     navigate(
  //   //       "?active=3&stage=1&form_id=Details of the Land to be used for the ITI"
  //   //     );
  //   //     break;
  //   //   case 4:
  //   //     navigate("?active=4&stage=1&form_id=Fee Payment");
  //   //     break;
  //   //   case 5:
  //   //     navigate("?active=5&stage=1&form_id=Documents Upload");
  //   //     break;
  //   //   default:
  //   //     break;
  //   // }
  // };

  const navigateSection = (step) => () => {
    switch (step) {
      case 0:
        navigate("?active=0&stage=1&form_id=Applicant Entity Details");
        break;
      case 1:
        navigate("?active=1&stage=1&form_id=Details of the Proposed Institute");
        break;
      case 2:
        navigate(
          "?active=2&stage=1&form_id=Details of Trade(s)/Unit(s) for Affiliation"
        );
        break;
      case 3:
        navigate(
          "?active=3&stage=1&form_id=Details of the Land to be used for the ITI"
        );
        break;
      case 4:
        navigate("?active=4&stage=1&form_id=Fee Payment");
        break;
      case 5:
        navigate("?active=5&stage=1&form_id=Documents Upload");
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Pageheader
        mainheading={`New Application Stage-I Form`}
        parentfolder="Dashboard"
        activepage="New Registration"
      />
      <Stepper
        styleConfig={{
          activeBgColor: "#0d6efd",
          completedBgColor: "#198754",
        }}
      >
        <div onClick={navigateSection(0)} style={{ cursor: "pointer" }}>
          <Step
            label="Applicant Entity Details"
            active={active == 0 || active > 0}
            completed={false}
            index={0}
          />
        </div>
        <div onClick={navigateSection(1)} style={{ cursor: "pointer" }}>
          <Step
            label="Details of the Proposed Institute"
            active={active == 1 || active > 1}
            completed={false}
            index={1}
          />
        </div>
        <div onClick={navigateSection(2)} style={{ cursor: "pointer" }}>
          <Step
            label="Details of Trade(s)/Unit(s) for Affiliation"
            active={active == 2 || active > 2}
            completed={false}
            index={2}
          />
        </div>
        <div onClick={navigateSection(3)} style={{ cursor: "pointer" }}>
          <Step
            label="Details of the Land to be used for the ITI"
            active={active == 3 || active > 3}
            completed={false}
            index={3}
          />
        </div>
        {/* <div
          onClick={() =>
            navigate("?active=4&stage=1&form_id=Preview of Application")
          }
          style={{ cursor: "pointer" }}
        >
          <Step
            label="Preview of Application"
            active={active == 4}
            completed={false}
            index={4}
          />
        </div> */}
        <div onClick={navigateSection(4)} style={{ cursor: "pointer" }}>
          <Step
            label="Fee Payment"
            active={active == 4 || active > 4}
            completed={false}
            index={4}
          />
        </div>
        <div onClick={navigateSection(5)} style={{ cursor: "pointer" }}>
          <Step
            label="Documents Upload"
            active={active == 5 || active > 5}
            completed={false}
            index={5}
          />
        </div>
      </Stepper>

      <Card className="custom-card">
        {/* <Card.Header>
                    <div className="card-title">Application Preview</div>
                  </Card.Header> */}
        <Card.Body>
          {stage == 1 && form_id === "Applicant Entity Details" ? (
            // <CategoryOfApplicantOrganization />
            <BasicDetailsofApplicantOrganization />
          ) : stage == 1 && form_id === "Applicant Entity Details" ? (
            <BasicDetailsofApplicantOrganization />
          ) : stage == 1 && form_id === "Details of the Proposed Institute" ? (
            <DetailsOfTheProposedInstitute />
          ) : stage == 1 &&
            form_id === "Details of Trade(s)/Unit(s) for Affiliation" ? (
            <DetailsOfTradeUnitForAffiliation />
          ) : // To be Work
          stage == 1 &&
            form_id === "Details of the Land to be used for the ITI" ? (
            <DetailsOfTheLandToBeUsedForTheITI />
          ) : // To be Work
          stage == 1 && form_id === "Preview of Application" ? (
            <h1>...</h1>
            // <PreviewOfApplication />
          ) : // To be Work
          stage == 1 && form_id === "Fee Payment" ? (
            <FeePayment />
          ) : // To be Work
          stage == 1 && form_id === "Documents Upload" ? (
            <DetailsOfDocumentsToBeUploaded />
          ) : (
            // To be Work
            <p>Something Went Wrong</p>
          )}
        </Card.Body>
        {false && (
          <div className="card-footer">
            <div className="d-flex justify-content-between mb-3">
              {active != 0 && (
                <div className="p-2">
                  <Button
                    size="lg"
                    variant="primary"
                    className="rounded-pill btn-wave"
                    onClick={goToPrevious}
                  >
                    Back
                  </Button>
                </div>
              )}
              {active != 6 && (
                <div className="p-2">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-pill btn-wave"
                    onClick={goToNext}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </Fragment>
  );
};

export default New_registration;
