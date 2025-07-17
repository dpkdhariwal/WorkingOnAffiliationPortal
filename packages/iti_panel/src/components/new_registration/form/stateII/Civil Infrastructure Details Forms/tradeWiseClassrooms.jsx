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

import { classrooms_info_to_be_filled, UPDATE_TRADEWISE_CLASSROOMS_DETAILS } from "../../../../../constants";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { validationSchema } from "../../../../../reducers/tradeWiseClassroomsReducer";


export const TradeWiseClassrooms = ({ goPrevious, goNext }) => {

    const initialValues = useSelector((state) => state.TradeWiseClassroomReducer);
    const dispatch = useDispatch();

    const submit = (values) => {
        dispatch({ type: UPDATE_TRADEWISE_CLASSROOMS_DETAILS, payload: values });
        dispatch({ type: "set_filled_step_II", payload: { step: 2 }, });
        dispatch({ type: "reg_set_active_stepII", payload: { step: 3 } });
        finish();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                submit(values);
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
                                        {classrooms_info_to_be_filled.map((item, index) => {
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
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={goPrevious}>
                                Previous
                            </Button>
                            <Button onClick={goNext} type="submit">Save & Next</Button>
                        </Card.Footer>
                    </Card>
                </FormikForm>
            )}
        </Formik>
    );
}
