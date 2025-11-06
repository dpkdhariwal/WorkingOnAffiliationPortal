import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";

import { useLocation } from "react-router-dom";


import * as C from "affserver";
import { st1documentuploads } from 'affserver';

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);


export const LandInfoView = ({ step, view: viewProp = false, isView = false }) => {

  console.log(step);

  // Location
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");


  const { Formik } = formik;
  const formRef2 = useRef();
  const formikRef = useRef();

  // useState
  const [view, setView] = useState(viewProp);
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [aStatus, setAStatus] = useState({});
  // End
  const [language, setLanguage] = useState([]);


  // const loadInfo = async () => {
  //   let result = await get_da_status_possasion_of_land(appId);
  //   console.log(result);
  //   let assessment_status = await set.getAssessmentProgressStatus(appId);
  //   setAStatus(assessment_status);
  //   const lastObj = result[result.length - 1];
  //   if (lastObj) {
  //     setInitValue(lastObj);
  //     console.log(lastObj);
  //     setFormData(lastObj);
  //     setFormSubmited(true);
  //     setReviewStatus(C.SL.REVIEWED);
  //     setViewType(C.SL.VIEW);
  //   }
  // }

  // useEffect(() => {
  //   loadInfo();
  // }, [appId]);


  useEffect(() => {
    console.log(aStatus);
  }, [aStatus]);



  const formRef = useRef();
  // const register = useFunctionRegistry();
  // useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);


  // const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND}`, () => { return { submitNow } }); }
  // useEffect(() => { formFunction(); }, [formRef]);


  // const form = async () => {
  //   console.log(formRef.current.isValid);
  //   if (formRef.current.isValid) {
  //     await set_da_status_possasion_of_land(appId, formRef.current.values);
  //     setAnyChangesMade(false);
  //     setEditMode(false);
  //     setReviewStatus(C.SL.REVIEWED);
  //     setViewType(C.SL.VIEW);
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }


  // const submitNow = async () => {
  //   console.log(reviewStatus);
  //   switch (reviewStatus) {
  //     case C.SL.PENDING:
  //       return await form();
  //     case C.SL.REVIEWED:
  //       switch (editMode) {
  //         case true:
  //           return await form();
  //         case false:
  //           return true;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }


  return (
    <>
      <Table
        className="ttext-nowrap table-striped table"
        width="100%"
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>Possession of Land</th>
            <th style={{ border: "1px solid black" }}>Land Owner Name</th>
            <th style={{ border: "1px solid black" }}>Land Registration Number</th>

          </tr>
        </thead>
        <tbody>

          <tr>
            <td style={{ border: "1px solid black" }}>Owned</td>
            <td style={{ border: "1px solid black" }}>ABCD</td>
            <td style={{ border: "1px solid black" }}>123456789</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};








