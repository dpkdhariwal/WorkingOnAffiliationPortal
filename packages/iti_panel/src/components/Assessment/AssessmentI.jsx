import React, { Fragment, useRef, useState, useEffect } from "react";
import Pageheader from "../../layouts/Pageheader";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Card, Badge, Row, Col, Form, Tab, Nav } from "react-bootstrap";
import "./Resizer.css"; // Import your CSS file for custom styles

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


import {
  BuildingPlanView,
  BuildingPlanAction,
  BccView,
  BccViewAction,
  PhotosOfBuilding,
  PhotosOfBuildingAction,
} from "../new_registration/form/stateII/BuildingPlan";


import {
  ElectricityConnectionDetailsView,
  ElectricityConnectionDetailsAction,
  BackupPowerSupplyView,
  BackupPowerSupplyAction,
  FireAndSafetyCertificateView,
  FireAndSafetyCertificateAction,
} from "../new_registration/form/stateII/ElectricityConnectionDetails";


import AssessmentMte from "./stage-II/AssessmentMte";

import AssessmentCivilInfraStruction from "./stage-II/AssessmentCivilInfraStruction";

const LINE_HEIGHT = 400;


const Assessment = () => {
  const BuildingDetail = [
    {
      category: "Building Details",
      subCategory: "Building Plan",
      view: BuildingPlanView,
      action: BuildingPlanAction,
    },
    {
      category: "Building Details",
      subCategory: "Building Completion Certificate (BCC)",
      view: BccView,
      action: BccViewAction,
    },
    {
      category: "Building Details",
      subCategory: "Photos of Building",
      view: PhotosOfBuilding,
      action: PhotosOfBuildingAction,
    },
  ];

  const ElectricityConnectionDettail = [
    {
      category: "Electricity Connection Details",
      subCategory: "Connection Details",
      view: ElectricityConnectionDetailsView,
      action: ElectricityConnectionDetailsAction,
    },

    {
      category: "Electricity Connection Details",
      subCategory: "Backup Power Supply",
      view: BackupPowerSupplyView,
      action: BackupPowerSupplyAction,
    },

    {
      category: "Electricity Connection Details",
      subCategory: "Fire and Safety Certificate",
      view: FireAndSafetyCertificateView,
      action: FireAndSafetyCertificateAction,
    },
  ];

  const [sizes, setSizes] = useState(["50%", "auto"]);
  const itemRefs = useRef([]); // Create a ref to store multiple DOM refs
  const itemRefsRight = useRef([]); // Create a ref to store multiple DOM refs

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isSyncingRef = useRef(false);

  // Get scroll index based on top visible child
  const getVisibleIndex = (container) => {
    const children = Array.from(container.children);
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      if (rect.top >= parentRect.top) {
        return i;
      }
    }
    return 0;
  };

  // Scroll to a specific child index
  const scrollToIndex = (container, index) => {
    const children = Array.from(container.children);
    if (children[index]) {
      container.scrollTo({
        top: children[index].offsetTop,
        behavior: "auto",
      });
    }
  };

  useEffect(() => {
    console.log(itemRefs, itemRefsRight);
    itemRefs.current.forEach((ref, index) => {
      const refRight = itemRefsRight.current[index];
      if (ref && refRight) {
        console.log(
          ref.offsetHeight,
          itemRefsRight.current[index].offsetHeight
        );
      }
    });
  }, []);

  // Sync scroll based on index
  const handleScroll = (sourceRef, targetRef) => {
    console.log(sourceRef, targetRef);
    return () => {
      if (isSyncingRef.current) return;

      const source = sourceRef.current;
      const target = targetRef.current;

      const index = getVisibleIndex(source);
      isSyncingRef.current = true;
      scrollToIndex(target, index);
      setTimeout(() => {
        isSyncingRef.current = false;
      }, 0);
    };
  };

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    console.log(left, right);

    if (left && right) {
      const leftScroll = handleScroll(leftRef, rightRef);
      const rightScroll = handleScroll(rightRef, leftRef);

      left.addEventListener("scroll", leftScroll);
      right.addEventListener("scroll", rightScroll);

      return () => {
        left.removeEventListener("scroll", leftScroll);
        right.removeEventListener("scroll", rightScroll);
      };
    }
  }, []);

  const paneStyle = {
    height: "100%", // fixed pane height
    overflowY: "auto",
    scrollSnapType: "y mandatory",
    // background: "red",
    "margin-top": "5px",
    padding: "5px",
    "border-radius": "5px",
    "margin-right": "5px",
  };

  const paragraphStyleLeft = (i) => {
    return {
      scrollSnapAlign: "start",
      // height: `${itemRefsRight.current[i].offsetHeight}px`, // simulate different height
      height: `${LINE_HEIGHT}px`,
      border: "1px dashed #aaa",
      padding: "10px",
      boxSizing: "border-box",
      background: "#FDDEDF",
      overflowY: "auto",
      // marginTop: "5px",
    };
  };

  const paragraphStyleRight = (i) => {
    return {
      scrollSnapAlign: "start",
      height: `${LINE_HEIGHT}px`, // simulate different height
      border: "1px dashed #aaa",
      padding: "10px",
      boxSizing: "border-box",
      background: "#fefefe",
      overflowY: "scroll",
      // marginTop: "5px",
    };
  };

  const handleScroll2 = (e) => {
    console.log(e, leftRef, rightRef);
    // console.log('Scroll position:', e.target.scrollTop, data);
    // leftRef.current.scrollTo({
    //   top: e.target.scrollTop, // vertical position in px
    //   behavior: "smooth", // smooth scrolling
    // });
    // rightRef.current.scrollTo({
    //   top: e.target.scrollTop, // vertical position in px
    //   behavior: "smooth", // smooth scrolling
    // });
  };

  return (
    <Fragment>
      {/* <Pageheader
        mainheading="Assessment"
        parentfolder="Dashboard"
        activepage="Assessment"
      /> */}

      <Card className="custom-card" style={{ marginTop: "10px" }}>
        <Card.Header>
          <div className="card-title">Assessment-I</div>
        </Card.Header>
        <Card.Body>
          <Tab.Container defaultActiveKey="Applicant_Entity_Details">
            <Nav
              variant="pills"
              className="nav-tabs tab-style-1 nav-justified mb-3 d-sm-flex d-block align-items-md-center"
              id="myTab1"
              role="tablist"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="Applicant_Entity_Details"
                  id="Applicant_Entity_Details-tab"
                  type="button"
                >
                  <i className="ri-file-line me-1 align-middle"></i>Applicant Entity Details
                </Nav.Link>{" "}
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="Details_of_the_Proposed_Institute"
                  id="Details_of_the_Proposed_Institute-tab"
                  type="button"
                >
                  <i className="ri-file-line me-1 align-middle"></i>Details of the Proposed Institute
                </Nav.Link>{" "}
              </Nav.Item>

              <Nav.Item>
                {" "}
                <Nav.Link
                  eventKey="Details_of_Trade__Unit"
                  id="Details_of_Trade__Unit-tab"
                  type="button"
                >
                  <i className="ri-file-line me-1 align-middle"></i>Details of Trade(s)/Unit(s) for Affiliation
                </Nav.Link>{" "}
              </Nav.Item>
              <Nav.Item>
                {" "}
                <Nav.Link eventKey="Details_of_Land" id="Details_of_Land-tab" type="button">
                  <i className="ri-file-line me-1 align-middle"></i>Details of the Land to be used for the ITI
                </Nav.Link>{" "}
              </Nav.Item>
              <Nav.Item>
                {" "}
                <Nav.Link eventKey="DocumentsUpload" id="DocumentsUpload-tab" type="button">
                  <i className="ri-file-line me-1 align-middle"></i>Documents Upload
                </Nav.Link>{" "}
              </Nav.Item>
              <Nav.Item>
                {" "}
                <Nav.Link
                  eventKey="ReviewAssessment"
                  id="ReviewAssessment-tab"
                  type="button"
                >
                  <i className="ri-file-line me-1 align-middle"></i>Review
                  Assessment
                </Nav.Link>{" "}
              </Nav.Item>
              <Nav.Item>
                {" "}
                <Nav.Link
                  eventKey="SendToApplicant"
                  id="ReviewAssessment-tab"
                  type="button"
                >
                  <i className="ri-file-line me-1 align-middle"></i>Send to
                  Applicant
                </Nav.Link>{" "}
              </Nav.Item>
            </Nav>

            <Tab.Content id="myTabContent">
              <Tab.Pane
                className="fade text-muted p-0"
                id="BuidlingDetail-pane"
                role="tabpanel"
                eventKey="Applicant_Entity_Details"
                aria-labelledby="home-tab"
                tabIndex={0}
              >
                <Assessment_Basic_Detail />
              </Tab.Pane>

              <Tab.Pane
                className="fade text-muted p-0"
                id="Details_of_the_Proposed_Institute-pane"
                role="tabpanel"
                eventKey="Details_of_the_Proposed_Institute"
                aria-labelledby="Details_of_the_Proposed_Institute-tab"
                tabIndex={1}
              >
                <Name_of_the_institute />
                <AddressOfInstitute />
                <InstituteLocation />
                {/* <Assessment_Proposed_Institute/> */}
              </Tab.Pane>

              <Tab.Pane
                className="fade text-muted p-0"
                id="Details_of_Trade__Unit-pane"
                role="tabpanel"
                eventKey="Details_of_Trade__Unit"
                aria-labelledby="Details_of_Trade__Unit-tab"
                tabIndex={2}
              >
                <Assessment_DetailsOfDocumentsToBeUploaded />
              </Tab.Pane>

              <Tab.Pane
                className="fade text-muted p-0"
                id="Details_of_Land-pane"
                role="tabpanel"
                eventKey="Details_of_Land"
                aria-labelledby="Details_of_Land-tab"
                tabIndex={3}
              >
                <LandDocuments />
                {/* <Assessment_Details_of_Land /> */}
              </Tab.Pane>

              <Tab.Pane
                className="fade text-muted p-0"
                id="DocumentsUpload-pane"
                role="tabpanel"
                eventKey="DocumentsUpload"
                aria-labelledby="DocumentsUpload-tab"
                tabIndex={4}
              >
                <Documents />
                {/* <Assessment_stage_I_DetailsOfDocumentsToBeUploaded /> */}
              </Tab.Pane>

              <Tab.Pane
                className="fade text-muted p-0"
                id="ReviewAssessment-pane"
                role="tabpanel"
                eventKey="ReviewAssessment"
                aria-labelledby="ReviewAssessment-tab"
                tabIndex={5}
              >
                <Assessment_Basic_Detail />
                <Name_of_the_institute />
                <AddressOfInstitute />
                <InstituteLocation />
                <Assessment_DetailsOfDocumentsToBeUploaded />
                <LandDocuments />
                <Documents />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Assessment;
