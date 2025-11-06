import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";

import { useLocation } from "react-router-dom";

import * as C from "affserver";

import * as st from "@/services/state/index";

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { st1_da_landdocuments } from "affserver";
import { ContextMap } from "@/components/formik/contexts";
import { Navigations } from "@/components/Assessment/components";
import { BuildingPlan_asmt } from "../Building Detail/BuildingPlan";
// import { Workshops_asmt } from "./views/Workshops";
// import { Classrooms_asmt } from "./views/Classrooms";

import MULTIPURPOSE_HALL_asmt from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/MULTIPURPOSE_HALL_asmt";
import LIBRARY_asmt from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/LIBRARY_asmt";
import IT_LAB_asmt from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/IT_LAB_asmt";
import PLACEMENT_AND_COUNSELLING_ROOM_asmt from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/PLACEMENT_AND_COUNSELLING_ROOM_asmt";
import PRINCIPAL_ROOM_asmtfrom from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/PRINCIPAL_ROOM_asmt";
import RECEPTION_CUM_WAITING_LOBBY_asmt from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/RECEPTION_CUM_WAITING_LOBBY_asmt";
import STAFF_ROOM_asmt from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/STAFF_ROOM_asmt";
import ADMINISTRATIVE_HALL_SECTION_asmt from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/ADMINISTRATIVE_HALL_SECTION_asmt";


import { Classrooms_asmt } from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/Classrooms";
import { Workshops_asmt } from "@/screens/state/assessor/AssessmentII/Civil Infrastructure Detail/views/Workshops";

import * as ap from "@/services/applicant/index";



export const FormContext = createContext();
export const CivilInfrastructureAssessment = ({ step, nav }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const [vCompList, setVCompList] = useState([]);
  const addItem = (newItem) => {
    setVCompList((prev) => [...prev, newItem]);
  };


  const [intiValues, setIntiValues] = useState(C.st2Asmt.CivilInfra.intiValues);
  const { Formik } = formik;

  const formsRef = useRef({});
  const loadData = async () => {

    try {
      Swal.fire({
        title: "Saving...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      });

      const resp = await st.getCivilInfrastructure_asmt(appId);
      console.log(resp.data);
      setIntiValues(resp.data);
      Object.entries(resp.data).forEach(([key, value]) => {
        console.log(key, value);
        switch (key) {
          case C.DA2_KEYS.MULTIPURPOSE_HALL:
            addItem({ row: value, title: "Workshop Assessment", comp: <MULTIPURPOSE_HALL_asmt title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.DA2_KEYS.IT_LAB:
            addItem({ row: value, title: "Workshop Assessment", comp: <IT_LAB_asmt title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.DA2_KEYS.LIBRARY:
            addItem({ row: value, title: "Workshop Assessment", comp: <LIBRARY_asmt title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.DA2_KEYS.PLACEMENT_AND_COUNSELLING_ROOM:
            addItem({ row: value, title: "Workshop Assessment", comp: <PLACEMENT_AND_COUNSELLING_ROOM_asmt title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.DA2_KEYS.PRINCIPAL_ROOM:
            addItem({ row: value, title: "Workshop Assessment", comp: <PRINCIPAL_ROOM_asmtfrom title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.DA2_KEYS.RECEPTION_CUM_WAITING_LOBBY:
            addItem({ row: value, title: "Workshop Assessment", comp: <RECEPTION_CUM_WAITING_LOBBY_asmt title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.DA2_KEYS.STAFF_ROOM:
            addItem({ row: value, title: "Workshop Assessment", comp: <STAFF_ROOM_asmt title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.DA2_KEYS.ADMINISTRATIVE_HALL_SECTION:
            addItem({ row: value, title: "Workshop Assessment", comp: <ADMINISTRATIVE_HALL_SECTION_asmt title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.DA2_KEYS.WORKSHOPS:
            addItem({ row: value, title: "Workshop Assessment", comp: <Workshops_asmt title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.DA2_KEYS.CLASSROOMS:
            addItem({ row: value, title: "Workshop Assessment", comp: <Classrooms_asmt title="Classrooms" info={value} FormContext={FormContext} /> });
            break;
        }
      });



      Swal.close();

      // ✅ Show success alert after saving
      // Swal.fire({
      //   icon: "success",
      //   title: "Saved Successfully!",
      //   text: "Your data has been saved successfully.",
      //   confirmButtonText: "OK",
      //   allowOutsideClick: false,
      // }).then(() => {
      //   // ✅ Navigate when user clicks OK
      //   navigate("/next-page"); // ← change this to your route
      // });
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Data Fatch Failed",
        text: "Something went wrong while saving. Please try again.",
      });
      console.error(error);
    }

  };
  useEffect(() => {
    loadData();
  }, [appId]);

  useEffect(() => {
    console.log(intiValues);
  }, [intiValues]);


  // const onNext = async () => {
  //   try {
  //     await formsRef.current.submitForm();
  //     if (formsRef.current.isValid === true) {
  //       try {
  //         Swal.fire({
  //           title: "Saving...",
  //           didOpen: () => Swal.showLoading(),
  //           allowOutsideClick: false,
  //           allowEscapeKey: false,
  //           showConfirmButton: false,
  //         });

  //         // ✅ Wait for API to finish
  //         const resp = await st.saveRemarkONCivilInfraDetails_asmt(appId, formsRef.current.values, C.ST2FC.CIVIL_INFRASTRUCTURE_DETAIL.step);
  //         console.log(resp.data);

  //         Swal.close();

  //         Swal.fire({
  //           icon: "success",
  //           title: "Saved Successfully!",
  //           text: "Your data has been saved successfully.",
  //           confirmButtonText: "OK",
  //           allowOutsideClick: false,
  //         }).then(() => {
  //           nav.next();
  //         });
  //       } catch (error) {
  //         Swal.close();
  //         Swal.fire({
  //           icon: "error",
  //           title: "Data Fatch Failed",
  //           text: "Something went wrong while saving. Please try again.",
  //         });
  //         console.error(error);
  //       }
  //     }
  //     else {
  //       throw "Invalide";
  //     }
  //     console.log();
  //   } catch (error) {
  //     Swal.close();
  //     Swal.fire({
  //       icon: "error",
  //       title: "Validation Error",
  //       text: "Please Give Remarks on Particulars",
  //     });
  //   }

  // }

  const onNext = async () => {
    try {
      await formsRef.current.submitForm();

      console.log(formsRef.current);


      if (formsRef.current.isValid === true) {
        try {
          Swal.fire({
            title: "Saving...",
            didOpen: () => Swal.showLoading(),
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
          });

          // ✅ Wait for API to finish
          const resp = await ap.save_reply_stage_II_verifications(appId, formsRef.current.values, step);
          console.log(resp.data);

          Swal.close();

          Swal.fire({
            icon: "success",
            title: "Saved Successfully!",
            text: "Your data has been saved successfully.",
            confirmButtonText: "OK",
            allowOutsideClick: false,
          }).then(() => {
            nav.next();
          });
        } catch (error) {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Data Fatch Failed",
            text: "Something went wrong while saving. Please try again.",
          });
          console.error(error);
        }
      }
      else {
        throw "Invalide";
      }
      console.log();
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please Enter Values and FIles",
      });
    }

  }

  return (
    <Card className="custom-card border border-success" style={{ padding: "0px" }}>
      <Card.Header>
        <div className="card-title" style={{ textTransform: "none" }}>
          <h5>Civil Infrastructure Detail</h5>
        </div>
      </Card.Header>
      <Card.Body style={{ padding: "10px" }}>
        <Formik innerRef={formsRef}
          enableReinitialize
          initialValues={intiValues}
          validationSchema={C.st2Asmt.CivilInfra.ValSchema}
          onSubmit={(values) => {
            // console.log(values);
          }} >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => {
            console.log(errors);
            return (
              <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue }}>
                <Form onSubmit={handleSubmit} validated>
                  {vCompList.map((c, idx) => {
                    return (<>{c.comp}</>)
                  })}

                </Form>
              </FormContext.Provider>
            )
          }}
        </Formik>
      </Card.Body>
      <Card.Footer>
        <Navigations nav={nav} onNext={() => { onNext(); }} />
      </Card.Footer>
    </Card>
  );
};
