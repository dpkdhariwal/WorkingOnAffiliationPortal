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
import Swal from "sweetalert2";

import { validationSchema } from "../../../../../reducers/tradeWiseWorkshopReducer";

import { useSelector, useDispatch } from "react-redux";
import { work_shop_info_to_be_filled, UPDATE_TRADEWISE_WORKSHOP_DETAILS } from "../../../../../constants";
export const TradeWiseWorkshops = ({ goNext }) => {

    const initialValues = useSelector((state) => state.TradeWiseWorkshopReducer);
    const dispatch = useDispatch();


    const submit = (values) => {
        dispatch({ type: UPDATE_TRADEWISE_WORKSHOP_DETAILS, payload: values });
        goNext();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                submit(values)
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
                                        {work_shop_info_to_be_filled.map((item, index) => {
                                            const fileField = `${item.tradeId}_workshop_${index}`;
                                            const workshopAreaField = `${item.tradeId}_workshopArea_${index}`;

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
                        <Card.Footer className="d-flex justify-content-end gap-2">
                            <Button type="submit">Save & Next</Button>
                        </Card.Footer>
                    </Card>
                </FormikForm>
            )}
        </Formik>
    );
};
