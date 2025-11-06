import React, { useState, useRef, createContext } from "react";
// import React, { Fragment, useState, useRef, useEffect } from "react";

import {
    Tab,
    Nav,
    Row,
    Col,
    Button,
    Card,
    Form as BForm,
    Table, Form
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "react-circular-progressbar/dist/styles.css";
import ReqSign from "../../comp/requiredSign"; // Make sure this component exists and is exported correctly

import { classrooms_info_to_be_filled, UPDATE_TRADEWISE_CLASSROOMS_DETAILS, CIC } from "affserver";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { validationSchema } from "../../../../../reducers/tradeWiseClassroomsReducer";
import { useLocation } from "react-router-dom";

import { setCheckListTradewiseClassrooms, getTradewiseClassRooms, setTradewiseClassRooms } from "../../../../../db/users";
import { useEffect } from "react";

import * as C from "affserver"
import { viewFile } from "@/helpers";
import * as ap from "@/services/applicant/index";

import { FileField2 } from "@/components/formik/Inputs/FileField2";
export const FormContext = createContext();
export const TradeWiseClassrooms = ({ goPrevious, goNext, steps }) => {
    const formikRef = useRef();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");
    const authUser = useSelector((state) => state.loginUserReducer);
    const [initialValues, setInitialValues] = useState(C.st2.CivilInfra.tradewise_classroom.initialValue);

    const [currentStep, setCurrentStep] = useState({});

    const prepareToSave = async (values) => {
        try {
            Swal.fire({
                title: "Saving TradeWise Classrooms Details ...",
                text: "Please wait..",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            await ap.saveTradewiseClassRoom(values, appId);
            // Close loader
            Swal.close();
            const result = await Swal.fire("Saved!", "Saved", "success");
            if (result.isConfirmed) {
                goNext(currentStep);
            }
            // const input = values;
            // setTradewiseWorkShop(values, authUser, appId);
            // console.log(input);
        } catch (err) {
            Swal.close();
            await Swal.fire("Error", "Something Went Wrong", "error");
            console.error("Error while saving:", err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const resp = await ap.getTradewiseClassRooms(appId);
                const data = resp.data;
                const newValues = { tradewise_classrooms: data };
                console.log(newValues);
                setInitialValues(newValues);  // update initial values
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, [appId]);


    useEffect(() => {
        const currentStep = steps.subSteps.find(step => step.step === CIC.TRADEWISE_CLASSROOMS);
        setCurrentStep(currentStep)
    }, [])

    return (
        <Formik
            innerRef={formikRef}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={C.st2.CivilInfra.tradewise_classroom.ValSchema}
            onSubmit={(values) => {
                prepareToSave(values);
            }}
        >
            {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
                <FormikForm onSubmit={handleSubmit}>
                    <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue }}>

                        <FieldArray name="tradewise_classrooms">
                            {({ push, remove }) => (
                                <Card>
                                    <Card.Body>
                                        <div className="table-responsive">
                                            <Table >
                                                <thead>
                                                    <tr>
                                                        <th>Trade Name</th>
                                                        <th>Particulars</th>
                                                        <th>Required Area</th>
                                                        <th>Available Area</th>
                                                        <th>Upload Photo <ReqSign /></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {values.tradewise_classrooms.map((doc, index) => {
                                                        { console.log(doc) }
                                                        return (
                                                            <tr key={index}>
                                                                <td>{doc?.tradeInfo?.trade_name}</td>
                                                                <td>{doc?.clasroom}</td>
                                                                <td>{doc?.required_area} {doc?.tradeInfo?.workshop_area_unit}</td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        name={`tradewise_classrooms[${index}].available_area`}
                                                                        as={Form.Control}

                                                                    />
                                                                    <div className="text-danger">
                                                                        <ErrorMessage name={`tradewise_classrooms[${index}].available_area`} />
                                                                    </div>
                                                                </td>
                                                                <td>

                                                                    <FileField2
                                                                        // label="If Yes, Upload Supporting Government Notification/Order/Circular"
                                                                        name={`tradewise_classrooms[${index}].document`}
                                                                        mandatory
                                                                        accept=".pdf,.jpg,.png"
                                                                        context={FormContext}
                                                                        onClickViewFileButton={() => viewFile(values?.tradewise_classrooms[index].document)}
                                                                    />

                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-between">
                                        <Button variant="secondary" onClick={goPrevious}>
                                            Previous
                                        </Button>
                                        <Button type="submit">Save & Next</Button>
                                    </Card.Footer>
                                </Card>
                            )}
                        </FieldArray>
                    </FormContext.Provider>

                </FormikForm>
            )}
        </Formik>
    );
}
