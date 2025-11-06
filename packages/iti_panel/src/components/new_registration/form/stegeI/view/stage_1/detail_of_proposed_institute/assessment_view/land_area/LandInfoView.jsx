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

// import * as get from "../../../../../../../../db/forms/stageI/get/get";
// import * as set from "../../../../../../../../db/forms/stageI/set/set";

// import { get_da_status_possasion_of_land, set_da_status_possasion_of_land } from "../../../../../../../../db/forms/stageI/set/set";
import * as C from "affserver";
// import SwalManager from "../../../../../../../../common/SwalManager";

// import * as st from "../../../../../../../../services/state/index";
import { st1documentuploads } from 'affserver';
// import { SelectField } from "../../../../../../../formik/Inputs";

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { ContextMap } from "../../../../../../../../formik/contexts/index";
import { SelectField, TextField } from "../../../../../../../../formik/Inputs";

import * as ap from "@/services/applicant/index"

export const LandInfoView = ({ step }) => {

  console.log(step);

  // Location
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const [landInfo, setLandInfo] = useState({}); // object



  const loadInfo = async () => {
    try {
      let result = await ap.landInfo(appId);
      setLandInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadInfo();
  }, [appId]);

  useEffect(()=>{
    console.log(landInfo);
  },[landInfo])


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
            <td style={{ border: "1px solid black" }}>{landInfo?.landDetail?.possession_of_land}</td>
            <td style={{ border: "1px solid black" }}>{landInfo?.landDetail?.land_owner_info?.land_owner_name}</td>
            <td style={{ border: "1px solid black" }}>{landInfo?.landDetail?.land_owner_info?.land_registration_number}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};








