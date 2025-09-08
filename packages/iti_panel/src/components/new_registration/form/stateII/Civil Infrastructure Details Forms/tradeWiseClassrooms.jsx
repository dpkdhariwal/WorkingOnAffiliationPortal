import React, { useState } from "react";
import {
    Tab,
    Nav,
    Row,
    Col,
    Button,
    Card,
    Form as BForm,
    Table,
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
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

export const TradeWiseClassrooms = ({ goPrevious, goNext, steps }) => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");
    const authUser = useSelector((state) => state.loginUserReducer);

    const initialValues = useSelector((state) => state.TradeWiseClassroomReducer);
    const dispatch = useDispatch();

    const submit = (values) => {
        console.log(values);
        // dispatch({ type: UPDATE_TRADEWISE_CLASSROOMS_DETAILS, payload: values });
        // dispatch({ type: "set_filled_step_II", payload: { step: 2 }, });
        // dispatch({ type: "reg_set_active_stepII", payload: { step: 3 } });
        // finish();
    };

    const [currentStep, setCurrentStep] = useState({});

    const prepareToSave = (values) => {
        const input = values;
        setTradewiseClassRooms(values, authUser, appId);
        console.log(input);
        goNext(currentStep);
    };

    const [classroomList, setClassroomList] = useState([]);

    const loadData = async () => {
        console.log("dfadfadf");
        await setCheckListTradewiseClassrooms(authUser, appId);

        await getTradewiseClassRooms(appId).then((data) => {
            setClassroomList(data);
            prepare_initialValues(data);
        })

    }

    useEffect(() => {
        loadData();
    }, [])

    const [iniValue, setIniValue] = useState([]);

    const prepare_initialValues = (classRoomList) => {
        console.log(classRoomList);
        const obj = {
            ...Object.fromEntries(
                classRoomList.map((item, index) => {
                    const { area } = getSetFieldsName(item);
                    return [`${area}`, ''];
                })
            ),
            ...Object.fromEntries(
                classRoomList.map((item, index) => {
                    const { photo } = getSetFieldsName(item);
                    return [`${photo}`, '']
                })
            ),
        };
        console.log(classRoomList, obj);
        setIniValue(obj);
        return obj;
    }

    const getSetFieldsName = (item) => {
        const area = `area>${item.tradeId}>${item.classroom}`;
        const photo = `photo>${item.tradeId}>${item.classroom}`;
        return { area, photo };
    }

    const validationSchema = (classroomList) => {
        let obj = {
            ...Object.fromEntries(
                classroomList.map((item, index) => {
                    const { area } = getSetFieldsName(item);
                    return [`${area}`, Yup.number().required("Enter Available Area").min(0, "Area must be positive"),];
                })
            ),
            ...Object.fromEntries(
                classroomList.map((item, index) => {
                    const { photo } = getSetFieldsName(item);
                    return [`${photo}`, Yup.mixed().required("Select Geo Taged File")]
                })
            ),
        };
        console.log(obj);
        return Yup.object(obj);
    }

     useEffect(() => {
            const currentStep = steps.subSteps.find(step => step.step === CIC.TRADEWISE_CLASSROOMS);
            setCurrentStep(currentStep)
        }, [])

    return (
        <Formik
            enableReinitialize
            initialValues={iniValue}
            validationSchema={validationSchema(classroomList)}
            onSubmit={(values) => {
                prepareToSave(values);
            }}
        >
            {({ handleSubmit, setFieldValue }) => (
                <FormikForm onSubmit={handleSubmit}>
                    <Card>
                        <Card.Body>
                            <div className="table-responsive">
                                <Table className="text-nowrap">
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
                                        {classroomList.map((item, index) => {
                                            let fields = getSetFieldsName(item);
                                            return (
                                                <tr key={index}>
                                                    <td>{item.tradeInfo.tradeName}</td>
                                                    <td>{item.classroom}</td>
                                                    <td>{item.tradeInfo.WorkshopAreaRequirment} {item.tradeInfo.WorkshopAreaUnit}</td>
                                                    <td>
                                                        <Field type="number" name={fields.area} as={BForm.Control} />
                                                        <div className="text-danger"><ErrorMessage name={fields.area} /></div>
                                                    </td>
                                                    <td>
                                                        <input type="file" name={fields.photo} className="form-control" onChange={(event) => { setFieldValue(fields.photo, event.currentTarget.files[0]); }} />
                                                        <div className="text-danger"><ErrorMessage name={fields.photo} component="div" className="text-danger" /> </div>
                                                    </td>
                                                </tr>
                                            );

                                        })}
                                        {/* {classrooms_info_to_be_filled.map((item, index) => {
                                            const workshopAreaField = `${item.tradeId}_classroomArea_${index}`
                                            const fileField = `${item.tradeId}_classroom_${index}`;

                                            return (
                                                <tr key={index}>
                                                    <td>{item.tradeName}</td>
                                                    <td>{item.Particulars}</td>
                                                    <td>{item.Required_Area_As_per_norms}</td>
                                                    <td>
                                                        <Field
                                                            type="number"
                                                            name={workshopAreaField}
                                                            as={BForm.Control}

                                                        />
                                                        <div className="text-danger">
                                                            <ErrorMessage name={workshopAreaField} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="file"
                                                            name={fileField}
                                                            className="form-control"
                                                            onChange={(event) => {
                                                                setFieldValue(
                                                                    fileField,
                                                                    event.currentTarget.files[0]
                                                                );
                                                            }}
                                                        />
                                                        <div className="text-danger">
                                                            <ErrorMessage
                                                                name={fileField}
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
                        <Card.Footer className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={goPrevious}>
                                Previous
                            </Button>
                            <Button type="submit">Save & Next</Button>
                        </Card.Footer>
                    </Card>
                </FormikForm>
            )}
        </Formik>
    );
}
