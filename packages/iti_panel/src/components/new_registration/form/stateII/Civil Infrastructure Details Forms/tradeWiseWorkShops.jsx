import React, { Fragment, useState, useRef, useEffect, createContext } from "react";

import {
    Tab,
    Nav,
    Row,
    Col,
    Button,
    Card,
    Form,
    Table,
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "react-circular-progressbar/dist/styles.css";
import ReqSign from "../../comp/requiredSign"; // Make sure this component exists and is exported correctly
import Swal from "sweetalert2";

import { validationSchema } from "../../../../../reducers/tradeWiseWorkshopReducer";

import { useSelector, useDispatch } from "react-redux";
import { work_shop_info_to_be_filled, UPDATE_TRADEWISE_WORKSHOP_DETAILS, work_shop_list, tradeList, TRADEWISE_WORKSHOP, CIC } from "affserver";
import { setTradewiseWorkShop, setCheckListTradewiseWorkShop, getTradewiseWorkShop } from "../../../../../db/users";
import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
import { WorkshopName } from "affserver";
import * as C from "affserver";
import * as ap from "@/services/applicant/index";
import { viewFile } from "@/helpers";
import { FileField2 } from "@/components/formik/Inputs/FileField2";

export const FormContext = createContext();
export const TradeWiseWorkshops = ({ steps, goNext }) => {

    const formikRef = useRef();
    const [currentStep, setCurrentStep] = useState({});

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");
    const authUser = useSelector((state) => state.loginUserReducer);
    const [initialValues, setInitialValues] = useState(C.st2.CivilInfra.tradewise_workshop.initialValue);


    const prepareToSave = async (values) => {
        try {
            Swal.fire({
                title: "Saving TradeWise Workshop Details ...",
                text: "Please wait..",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            await ap.saveTradewiseWorkShop(values, appId);
            // Close loader
            Swal.close();
            const result = await Swal.fire("Saved!", "NOC Has Been Generated, Go to View", "success");
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
                const resp = await ap.getTradewiseWorkShop(appId);
                const data = resp.data;
                const newValues = { tradewise_workshop: data };
                console.log(newValues);
                setInitialValues({ tradewise_workshop: data });  // update initial values
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, [appId]);

    useEffect(() => {
        const currentStep = steps.subSteps.find(step => step.step === CIC.TRADEWISE_WORKSHOP);
        setCurrentStep(currentStep)
    }, [])

    useEffect(() => {
        console.log(initialValues);
    }, [initialValues])



    return (
        <Formik
            innerRef={formikRef}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={C.st2.CivilInfra.tradewise_workshop.ValSchema}
            onSubmit={(values) => {
                prepareToSave(values);
                // submit(values)
            }}
        >
            {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (

                <FormikForm onSubmit={handleSubmit}>
                    <FormContext.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue }}>
                        <FieldArray name="tradewise_workshop">
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
                                                    {values.tradewise_workshop.map((doc, index) => {
                                                        { console.log(doc) }
                                                        return (
                                                            <tr key={index}>
                                                                <td>{doc?.tradeInfo?.trade_name}</td>
                                                                <td>{doc?.workshop}</td>
                                                                <td>{doc?.required_area} {doc?.tradeInfo?.workshop_area_unit}</td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        name={`tradewise_workshop[${index}].available_area`}
                                                                        as={Form.Control}

                                                                    />
                                                                    <div className="text-danger">
                                                                        <ErrorMessage name={`tradewise_workshop[${index}].available_area`} />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <FileField2
                                                                        // label="If Yes, Upload Supporting Government Notification/Order/Circular"
                                                                        name={`tradewise_workshop[${index}].document`}
                                                                        mandatory
                                                                        accept=".pdf,.jpg,.png"
                                                                        context={FormContext}
                                                                        onClickViewFileButton={() => viewFile(values?.tradewise_workshop[index].document)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    {/* {workShopList.map((item, index) => {

                                                    console.log(item);

                                                    let fields = getSetFieldsName(item);
                                                    console.log(fields);


                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.tradeInfo.tradeName}</td>
                                                            <td>{item.workshop}</td>
                                                            <td>{item.tradeInfo.WorkshopAreaRequirment} {item.tradeInfo.WorkshopAreaUnit}</td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    name={fields.area}
                                                                    as={BForm.Control}

                                                                />
                                                                <div className="text-danger">
                                                                    <ErrorMessage name={fields.area} />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="file"
                                                                    name={fields.photo}
                                                                    className="form-control"
                                                                    onChange={(event) => {
                                                                        setFieldValue(
                                                                            fields.photo,
                                                                            event.currentTarget.files[0]
                                                                        );
                                                                    }}
                                                                />
                                                                <div className="text-danger">
                                                                    <ErrorMessage
                                                                        name={fields.photo}
                                                                        component="div"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );

                                                })} */}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-end gap-2">
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
};
