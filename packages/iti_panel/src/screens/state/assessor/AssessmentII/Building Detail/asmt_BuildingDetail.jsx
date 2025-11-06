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
import { BuildingPlan_asmt } from "./BuildingPlan";
import { BccAsmt } from "./BCC";
import { PhotosOfBuilding } from "./PhotosOfBuilding";


export const FormContext = createContext();
export const BuildingDetailAssessment = ({ step, nav }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const [intiValues, setIntiValues] = useState(C.st2Asmt.BuildingDetails.intiValues);
  const { Formik } = formik;

  const formsRef = useRef({});
  const navigate = useNavigate();

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
          const resp = await st.saveRemarkONBuildingDetails_asmt(appId, formsRef.current.values);
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
        text: "Please Give Remarks on Particulars",
      });
    }

  }
  const loadData = async () => {

    try {
      Swal.fire({
        title: "Saving...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      });

      // ✅ Wait for API to finish
      const resp = await st.getBasicDetail_asmt(appId);
      console.log(resp.data);
      setIntiValues(resp.data);

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


  return (
    <Card className="custom-card border border-success" style={{ padding: "0px" }}>
      <Card.Header>
        <div className="card-title" style={{ textTransform: "none" }}>
          <h5> Building Details</h5>
        </div>
      </Card.Header>
      <Card.Body style={{ padding: "10px" }}>
        <Formik innerRef={formsRef}
          enableReinitialize
          initialValues={intiValues}
          validationSchema={C.st2Asmt.BuildingDetails.ValSchema}
          onSubmit={(values) => {
            console.log(values);
          }} >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => {
            return (
              <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue }}>
                <Form onSubmit={handleSubmit} validated>
                  <BuildingPlan_asmt key={1} FormContext={FormContext} />
                  <BccAsmt key={2} FormContext={FormContext} />
                  <PhotosOfBuilding key={3} FormContext={FormContext} />
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
