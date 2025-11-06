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

import FIRST_AID_ROOM from "./views/FIRST_AID_ROOM_asmt"
import LIBRARY_AND_READING_ROOM from "./views/LIBRARY_AND_READING_ROOM_asmt"
import PLAYGROUND from "./views/PLAYGROUND_asmt"
import DRINKING_WATER_FACILITY from "./views/DRINKING_WATER_FACILITY_asmt"
import AVAILABILITY_OF_STAIRCASES from "./views/AVAILABILITY_OF_STAIRCASES_asmt"
import TOILETS_WATER_CLOSETS from "./views/TOILETS_WATER_CLOSETS_asmt"
import GENERAL_PARKING_DETAILS from "./views/GENERAL_PARKING_DETAILS_asmt"


export const FormContext = createContext();

export const AmenitiesAssessment = ({ step, nav }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const [vCompList, setVCompList] = useState([]);
  const addItem = (newItem) => {
    setVCompList((prev) => [...prev, newItem]);
  };


  const [intiValues, setIntiValues] = useState(C.st2Asmt.Amenities.intiValues);
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

      const resp = await st.getAmenitiesArea_asmt(appId);
      console.log(resp.data);
      setIntiValues(resp.data);
      Object.entries(resp.data).forEach(([key, value]) => {
        console.log(key, value);
        switch (key) {
          case C.A_FIRST_AID_ROOM.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <FIRST_AID_ROOM title={key} info={value} FormContext={FormContext}  /> });
            break;
          case C.A_LIBRARY_AND_READING_ROOM.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <LIBRARY_AND_READING_ROOM title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.A_PLAYGROUND.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <PLAYGROUND title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.A_DRINKING_WATER_FACILITY.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <DRINKING_WATER_FACILITY title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.A_AVAILABILITY_OF_STAIRCASES.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <AVAILABILITY_OF_STAIRCASES title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.A_TOILETS_WATER_CLOSETS.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <TOILETS_WATER_CLOSETS title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.A_GENERAL_PARKING_DETAILS.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <GENERAL_PARKING_DETAILS title={key} info={value} FormContext={FormContext} /> });
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
          const resp = await st.saveRemarkONCivilInfraDetails_asmt(appId, formsRef.current.values, C.ST2FC.AMENITIES_AREA.step);
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
          validationSchema={C.st2Asmt.Amenities.ValSchema}
          onSubmit={(values) => {
            console.log(values);
          }} >
          {({ handleSubmit, handleChange, values, errors, touched, }) => {
            console.log(errors);
            return (
              <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, }}>
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
