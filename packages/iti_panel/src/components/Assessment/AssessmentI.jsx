import React, { Fragment, useRef, useState, useEffect } from "react";
import Pageheader from "../../layouts/Pageheader";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Card, Badge, Row, Col, Form, Tab, Nav, Button } from "react-bootstrap";
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
import { Form as BootstrapForm } from "react-bootstrap";

import { useContext } from "react";
import * as formik from "formik";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { useSelector, useDispatch } from "react-redux";

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

import { StageIAssessment } from "../../screens/state/assessor/stage_I_assessment";


import { setAppFlow } from "../../db/users";
import { STAGE_I__ASSESSMENT } from "affserver";

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
      <Pageheader
        mainheading="Document Verification"
        parentfolder="Dashboard"
        activepage="Stage I"
      />
      <StageIAssessment />
    </Fragment>
  );
};

export default Assessment;


export const MarkAsCompleteStageIAssessment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const dispatch = useDispatch();
  const reg = useSelector((state) => state.reg);
  const stepInfo = reg.steps[0];
  const [district, setDistrict] = useState([]);

  const EntityDetails = useSelector((state) => state.EntityDetails);
  const AppliInfo = useSelector((state) => state.AppliInfo);
  const authUser = useSelector((state) => state.loginUserReducer);


  const { Formik } = formik;
  const formRef2 = useRef();

  const submit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Mark Comlete Stage I Document Verification",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Mark it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed – now show loading or save directly
        Swal.fire({
          title: "Saving...",
          didOpen: () => {

            setAppFlow(appId, STAGE_I__ASSESSMENT);

            // Swal.showLoading();
            // dispatch({ type: UPDATE_ENTITY_DETAILS, payload: values });
            // dispatch({ type: "set_filled_step", payload: { step: 0 }, });
            // dispatch({ type: "reg_set_active_step", payload: { step: 1 } });
            // setActive(reg.steps[1]);
            // console.log(authUser);
            // setEntityDetails(values, authUser, appId);
            // Swal.close();
          },
        });
      } else {
        console.log("User cancelled save");
      }
    });
  };

  return (
    <Fragment>

      <div className="d-flex justify-content-end mb-3 " style={{ marginTop: '15px' }}>
        <Button onClick={submit} className="btn-success" size="lg">Mark as Complete Stage I Document Verfication</Button>
      </div>
    </Fragment>
  );
};