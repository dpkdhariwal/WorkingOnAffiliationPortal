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
import * as ap from "@/services/applicant/index";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { st1_da_landdocuments } from "affserver";
import { ContextMap } from "@/components/formik/contexts";
import { Navigations } from "@/components/Assessment/components";
import { BuildingPlan_asmt } from "../Building Detail/BuildingPlan";

import FIRST_AID_ROOM from "@/screens/state/assessor/AssessmentII/Amenities Area/views/FIRST_AID_ROOM_asmt"
import LIBRARY_AND_READING_ROOM from "@/screens/state/assessor/AssessmentII/Amenities Area/views/LIBRARY_AND_READING_ROOM_asmt"

import PLAYGROUND from "@/screens/state/assessor/AssessmentII/Amenities Area/views/PLAYGROUND_asmt"
import DRINKING_WATER_FACILITY from "@/screens/state/assessor/AssessmentII/Amenities Area/views/DRINKING_WATER_FACILITY_asmt"
import AVAILABILITY_OF_STAIRCASES from "@/screens/state/assessor/AssessmentII/Amenities Area/views/AVAILABILITY_OF_STAIRCASES_asmt"
import TOILETS_WATER_CLOSETS from "@/screens/state/assessor/AssessmentII/Amenities Area/views/TOILETS_WATER_CLOSETS_asmt"
import GENERAL_PARKING_DETAILS from "@/screens/state/assessor/AssessmentII/Amenities Area/views/GENERAL_PARKING_DETAILS_asmt"


export const FormContext = createContext();
// export const AmenitiesAssessment = ({ step, nav }) => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const appId = queryParams.get("appId");


//   const Context = ContextMap['stageIAsmtDetails'] || ContextMap.default;
//   const { assessmentInfo } = useContext(Context);

//   const formRefs = useRef([]);


//   const [vCompList, setVCompList] = useState([]);
//   const addItem = (newItem) => {
//     setVCompList((prev) => [...prev, newItem]);
//   };


//   const { Formik } = formik;
//   const formRef2 = useRef();
//   const dispatch = useDispatch();


//   // Experiment Starts @dpkdhariwal
//   const registry = useRef([]); // store all child functions
//   const register2 = (index, obj) => {
//     registry.current[index] = obj;
//   };


//   const setLandContent = (item, title) => {
//     console.log(step?.actor);
//     switch (step?.actor) {
//       // case C.SL.APPLICANT:
//       //   return <LandAreaApplicantForm data={item} />
//       // break;
//       case C.SL.ASSESSOR:
//         return <LandArea data={item} />
//       // break;
//       default:
//         return "NA";
//     }
//   }

//   const formsRef = useRef({});
//   const registerForm = (id, formikRef) => {
//     formsRef.current[id] = formikRef;
//   };
//   const unregisterForm = (id) => {
//     delete formsRef.current[id];
//   };
//   const onNext = async () => {
//     const allValues = [];
//     const changeArray = [];
//     const isFormValid = [];

//     try {
//       for (const id in formsRef.current) {
//         const formInfo = await formsRef?.current[id];
//         const { changeInForm, getData, editMode, refNo } = formInfo;
//         console.log(id, changeInForm, editMode);
//         changeArray.push(changeInForm);

//         if (changeInForm == true) {
//           let formInstance = getData();
//           console.log(formInstance);
//           formInstance = formInstance.current;
//           await formInstance.validateForm();
//           console.log(formInstance.values);
//           console.log(formInstance.isValid);
//           isFormValid.push(formInstance.isValid);
//           allValues.push({ toSave: changeInForm, id: id, refNo: refNo, values: formInstance.values });
//         }
//         else {
//           allValues.push({ toSave: changeInForm, id: id });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }

//     if (changeArray.every(v => !v)) {
//       console.log("All values are false!");
//       nav.next();
//     } else {

//       if (isFormValid.every(v => v)) {
//         console.log("All forms submitted:", allValues, changeArray);
//         await st.save_da_doc_verification_remarks(appId, assessmentInfo.assessment_id, allValues, step.step);
//         nav.next();
//       } else {
//         console.log("Please Review Assessment First");
//         Swal.fire({
//           icon: "warning",
//           title: "Review Documents",
//           showConfirmButton: true,
//           confirmButtonText: "OK",
//           allowOutsideClick: false
//         });
//       }
//     }
//   }



//   // Loadin Data
//   const loadData = async () => {
//     try {
//       const result = await st.get_vrf_list_land_to_be_used(appId, step.step);
//       console.log(result.data);
//       addItem({ row: null, title: "Land Deatil", comp: <LandInfoView step={step} /> });
//       result.data?.map((item, index) => {
//         switch (item.checkName) {
//           case C.DA1_KEYS.LAND_DOCUMENT:
//           case C.ASSESSMENT_STAGE_I_KEYS.LAND_DOCUMENTS:
//             addItem({ row: item, title: "Possession of Land", comp: <PossessionOfLand data={item} step={step} /> });
//             break;
//           case C.ASSESSMENT_STAGE_I_KEYS.LAND_AREA:
//             addItem({ row: item, title: "Land Area", comp: setLandContent(item, "Land Area") });
//             break;
//         }
//       })
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => { loadData(); }, []);
//   const formRef = useRef({});

//   return (
//     <FormContext.Provider value={{ registerForm, unregisterForm }}>
//       <Card className="custom-card border border-success">
//         <Card.Header>
//           <div className="card-title" style={{ textTransform: "none" }}>
//             <h5> Building Details</h5>
//           </div>
//         </Card.Header>
//         <Card.Body>
//           <Formik innerRef={formRef} enableReinitialize initialValues={st1_da_landdocuments.intiValues} validationSchema={st1_da_landdocuments.valSchema} validateOnChange={true} validateOnBlur={true} validateOnMount={true} onSubmit={(values) => { console.log(values); }} >
//             {({
//               handleSubmit,
//               handleChange,
//               values,
//               errors,
//               touched,
//             }) => {
//               return (
//                 <Form onSubmit={handleSubmit} validated>
//                   <BuildingPlan_asmt />
//                 </Form>
//               )
//             }}
//           </Formik>
//         </Card.Body>
//         <Card.Footer>
//           <Navigations nav={nav} onNext={() => { onNext(); }} />
//         </Card.Footer>
//       </Card>
//     </FormContext.Provider>
//   );
// };

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
            addItem({ row: value, title: "Workshop Assessment", comp: <FIRST_AID_ROOM title={key} info={value} FormContext={FormContext} /> });
            break;
          case C.A_LIBRARY_AND_READING_ROOM.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <LIBRARY_AND_READING_ROOM title={key} info={value}  FormContext={FormContext} /> });
            break;
          case C.A_PLAYGROUND.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <PLAYGROUND title={key} info={value}  FormContext={FormContext} /> });
            break;
          case C.A_DRINKING_WATER_FACILITY.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <DRINKING_WATER_FACILITY title={key} info={value}  FormContext={FormContext} /> });
            break;
          case C.A_AVAILABILITY_OF_STAIRCASES.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <AVAILABILITY_OF_STAIRCASES title={key} info={value}  FormContext={FormContext} /> });
            break;
          case C.A_TOILETS_WATER_CLOSETS.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <TOILETS_WATER_CLOSETS title={key} info={value}  FormContext={FormContext} /> });
            break;
          case C.A_GENERAL_PARKING_DETAILS.key:
            addItem({ row: value, title: "Workshop Assessment", comp: <GENERAL_PARKING_DETAILS title={key} info={value}  FormContext={FormContext} /> });
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
  // const onNext = async () => {
  //   try {
  //     await formsRef.current.submitForm();
  //     console.log(formsRef.current);
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
  //         const resp = await st.saveRemarkONCivilInfraDetails_asmt(appId, formsRef.current.values, C.ST2FC.AMENITIES_AREA.step);
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
