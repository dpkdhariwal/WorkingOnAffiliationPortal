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

import * as ap from "@/services/applicant/index";

import ELECTRICITY_CONNECTION from "@/screens/state/assessor/AssessmentII/Electricity Connection Details/views/ELECTRICITY_CONNECTION"
import FIRE_AND_SAFETY_CERTIFICATE from "@/screens/state/assessor/AssessmentII/Electricity Connection Details/views/FIRE_AND_SAFETY_CERTIFICATE"
import PHOTO_OF_BACKUP_POWER from "@/screens/state/assessor/AssessmentII/Electricity Connection Details/views/PHOTO_OF_BACKUP_POWER"
import PURCHASE_RELATED_DOCUMENTS from "@/screens/state/assessor/AssessmentII/Electricity Connection Details/views/PURCHASE_RELATED_DOCUMENTS"

export const FormContext = createContext();

export const ElectricityConnectionAssessment = ({ step, nav }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const [vCompList, setVCompList] = useState([]);
  const addItem = (newItem) => {
    setVCompList((prev) => [...prev, newItem]);
  };


  const [intiValues, setIntiValues] = useState(C.st2Asmt.ElectricityDetails.intiValues);
  const { Formik } = formik;

  const formsRef = useRef({});
  const loadData = async () => {

    try {
      Swal.fire({ title: "Saving...", didOpen: () => Swal.showLoading(), allowOutsideClick: false, allowEscapeKey: false, showConfirmButton: false, });

      const resp = await st.getElectricityDetails_asmt(appId);
      console.log(resp.data);
      setIntiValues(resp.data);
      Object.entries(resp.data).forEach(([key, value]) => {
        console.log(key, value);
        switch (key) {
          case C.electricity_particulars_keys.ELECTRICITY_CONNECTION.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <ELECTRICITY_CONNECTION title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.electricity_particulars_keys.FIRE_AND_SAFETY_CERTIFICATE.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <FIRE_AND_SAFETY_CERTIFICATE title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.electricity_particulars_keys.PHOTO_OF_BACKUP_POWER.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <PHOTO_OF_BACKUP_POWER title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.electricity_particulars_keys.PURCHASE_RELATED_DOCUMENTS.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <PURCHASE_RELATED_DOCUMENTS title={key} info={value} FormContext={FormContext} /> });
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
  //         const resp = await st.saveRemarkONCivilInfraDetails_asmt(appId, formsRef.current.values, C.ST2FC.ELECTRICITY_CONNECTION_DETAILS.step);
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
          <h5>Amenities</h5>
        </div>
      </Card.Header>
      <Card.Body style={{ padding: "10px" }}>
        <Formik innerRef={formsRef}
          enableReinitialize
          initialValues={intiValues}
          validationSchema={C.st2Asmt.ElectricityDetails.ValSchema}
          onSubmit={(values) => {
            console.log(values);
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
