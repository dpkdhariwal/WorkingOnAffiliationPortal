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
import ITLAB from "./views/ITLAB"
import TRADEMTE from "./views/TradeMTE";

export const FormContext = createContext();
export const TradewiseMachineryToolsEquipmentAssesment = ({ step, nav }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const [intiValues, setIntiValues] = useState(C.st2Asmt.ItlabTradewiseToolEquipments.intiValues);
  const [activeIds, setActiveIds] = useState(['0', '1', '2', '3', '4', '5']);
  const [vCompList, setVCompList] = useState([]);
  const { Formik } = formik;


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
          const resp = await st.saveRemarkONCivilInfraDetails_asmt(appId, formsRef.current.values, C.ST2FC.TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS.step);
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
      console.log(error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please Give Remarks on Particulars",
      });
    }
  }

  // const [vCompList, setVCompList] = useState([]);
  const addItem = (newItem) => {
    setVCompList((prev) => [...prev, newItem]);
  };



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

      const resp = await st.getItLabDetails(appId);
      console.log(resp.data);
      setIntiValues(resp.data);

      console.log(formsRef.current.setValues(resp.data));

      console.log(resp.data);

      Object.entries(resp.data).forEach(([key, value]) => {
        console.log(key, value);
        switch (key) {
          case 'itLab':
            addItem({ row: value, title: "IT LAB", comp: <ITLAB title={key} info={value} /> });
            break;
          // case C.Signage_Boards_Keys.SIGNAGE_BOARD_ON_INSTITUTE_BUILDING.key:
          //   addItem({ row: value, title: "Workshop Assessment", comp: <SIGNAGE_BOARD_ON_INSTITUTE_BUILDING title={key} info={value} /> });
          //   break;
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
  return (
    <Card className="custom-card border border-success">
      <Card.Header>
        <div className="card-title" style={{ textTransform: "none" }}>
          <h5>Tradewise Machinery Tools Equipment Details</h5>
        </div>
      </Card.Header>
      <Card.Body>
        <Formik
          innerRef={formsRef}
          initialValues={intiValues}
          enableReinitialize
          validationSchema={C.st2Asmt.ItlabTradewiseToolEquipments.ValSchema}
          onSubmit={(values) => {
            console.log(values);
          }} >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => {
            console.log(errors);
            { console.log(values) }
            return (
              <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue }}>
                {console.log(values)}
                <Form onSubmit={handleSubmit} validated>

                  {Object.entries(intiValues).map(([key, value]) => {
                    switch (key) {
                      case "mte":
                        return <TRADEMTE step={step} key={key} title="Tradewise Machinery Tool Equipments" info={value} FormContext={FormContext} />;
                      default:
                    }
                  })}
                  <hr />
                  <Accordion className="accordions-items-seperate" alwaysOpen defaultActiveKey={activeIds}>
                    {Object.entries(intiValues).map(([key, value]) => {
                      console.log(key, value);
                      switch (key) {
                        case "itLab":
                          return <ITLAB key={key} title="IT Lab Equipments" info={value} FormContext={FormContext} />;
                      }
                    })}
                  </Accordion>

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
