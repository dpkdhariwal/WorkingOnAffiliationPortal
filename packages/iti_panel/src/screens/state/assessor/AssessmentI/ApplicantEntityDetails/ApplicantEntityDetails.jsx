import { Fragment, useRef, useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, ListGroup, Alert, InputGroup, } from "react-bootstrap";
import Swal from "sweetalert2";
import { useContext } from "react";

import * as C from "affserver";
import * as gen from "../../../../services/general/index";
import * as st from "../../../../services/state/index";
import { Navigations } from "@/components/Assessment/components";
import {BasicDetailsView} from "./views/BasicDetails"



export const BasicDetails = ({ isView = false, nav, Context }) => {
  // console.log(nav.next());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const [id, setId] = useState(appId);
  const [info, setInfo] = useState({});

  const [entInfo, setEntInfo] = useState({});
  const { assessmentInfo } = useContext(Context);


  const onNext = async () => {
    console.log("Next Called", nav.step.slno);
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Proceed",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Okay, Proceed",
      cancelButtonText: "Cancel",
    });
    if (confirmResult.isConfirmed) {
      try {
        // Set Flow if not exist
        // await setStageIAssessmentFlow(appId);
        // Mark as Complete this Step
        // await markAsCompleteStageAssessmentFlow(appId, C.ST1FC.APPLICANT_ENTITY_DETAILS.step);
        ////////////////////////////// API WRITTTEN BELOW

        // console.log(nav);
        // return;
        await st.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.APPLICANT_ENTITY_DETAILS.step, assessmentInfo.assessment_id, nav.step.slno);
        const result = await Swal.fire(
          "Saved!",
          "Your form data has been saved.",
          "success"
        );
        if (result.isConfirmed) {
          nav.next();
        }
        // window.location.reload();
      } catch (err) {
        console.error("Error while saving:", err);
      }
      return;
    }
  };


  useEffect(() => {
    console.log(entInfo);
  }, [entInfo]);

  useEffect(() => {
    getInfo();
    console.log(id);
  }, [id]);

  const getInfo = async () => {
    try {
      // let info = await set.getDetails(appId);
      // let resp = await gen.getDetails(appId);
      // Show loading
      Swal.fire({
        title: "Loading...",
        text: "Please wait while we fetch the data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      let resp2 = await gen.getEntityDetails(appId);
      setEntInfo(resp2.data);
      // setInfo(resp.data);
      Swal.close();
    } catch (error) {
      Swal.close();
      console.error("Error fetching entity details:", error);
      Swal.fire("Error", "Failed to fetch data.", "error");
    }
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <>
      <BasicDetailsView/>
      {isView == false && (
        <Navigations nav={nav} onNext={() => { onNext(); }} />
      )}
    </>
  );
};


