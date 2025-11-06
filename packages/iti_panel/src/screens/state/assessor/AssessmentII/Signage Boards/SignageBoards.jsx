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


import SIGNAGE_BOARD_ON_PLOT_ENTRANCE from "./views/SIGNAGE_BOARD_ON_PLOT_ENTRANCE"
import SIGNAGE_BOARD_ON_INSTITUTE_BUILDING from "./views/SIGNAGE_BOARD_ON_INSTITUTE_BUILDING"
import SIGNAGE_BOARDS from "./views/SIGNAGE_BOARDS"
import TRADE_DETAILS_BOARD from "./views/TRADE_DETAILS_BOARD"
import STAFF_DETAILS_BOARD from "./views/STAFF_DETAILS_BOARD"
import EXIT_BOARD from "./views/EXIT_BOARD"
import BOARD_INDICATING_DANGER_SIGNS from "./views/BOARD_INDICATING_DANGER_SIGNS"
import PROHIBITED_AREA_INDICATORS from "./views/PROHIBITED_AREA_INDICATORS"
import SEXUAL_HARASSMENT_REDRESSAL_COMMITTEE_NOTICE from "./views/SEXUAL_HARASSMENT_REDRESSAL_COMMITTEE_NOTICE"


export const FormContext = createContext();

export const SignageBoards = ({ step, nav }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const [vCompList, setVCompList] = useState([]);
  const addItem = (newItem) => {
    setVCompList((prev) => [...prev, newItem]);
  };


  const [intiValues, setIntiValues] = useState(C.st2Asmt.SignageBoards.intiValues);
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

      const resp = await st.getSignageBoards_asmt(appId);
      console.log(resp.data);
      setIntiValues(resp.data);
      Object.entries(resp.data).forEach(([key, value]) => {
        console.log(key, value);
        switch (key) {
          case C.Signage_Boards_Keys.SIGNAGE_BOARD_ON_PLOT_ENTRANCE.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <SIGNAGE_BOARD_ON_PLOT_ENTRANCE title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.Signage_Boards_Keys.SIGNAGE_BOARD_ON_INSTITUTE_BUILDING.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <SIGNAGE_BOARD_ON_INSTITUTE_BUILDING title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.Signage_Boards_Keys.SIGNAGE_BOARDS.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <SIGNAGE_BOARDS title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.Signage_Boards_Keys.TRADE_DETAILS_BOARD.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <TRADE_DETAILS_BOARD title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.Signage_Boards_Keys.STAFF_DETAILS_BOARD.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <STAFF_DETAILS_BOARD title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.Signage_Boards_Keys.EXIT_BOARD.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <EXIT_BOARD title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.Signage_Boards_Keys.BOARD_INDICATING_DANGER_SIGNS.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <BOARD_INDICATING_DANGER_SIGNS title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.Signage_Boards_Keys.PROHIBITED_AREA_INDICATORS.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <PROHIBITED_AREA_INDICATORS title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.Signage_Boards_Keys.SEXUAL_HARASSMENT_REDRESSAL_COMMITTEE_NOTICE.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <SEXUAL_HARASSMENT_REDRESSAL_COMMITTEE_NOTICE title={key} info={value} FormContext={FormContext} /> });
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
            const resp = await st.saveRemarkONCivilInfraDetails_asmt(appId, formsRef.current.values, C.ST2FC.SIGNAGE_BOARDS.step);
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
          validationSchema={C.st2Asmt.SignageBoards.ValSchema}
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
