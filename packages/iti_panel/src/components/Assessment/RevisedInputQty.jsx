import { formatLabel, viewFile } from "@/helpers";
import { Fragment, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";

import React, { createContext, useRef, useContext, useEffect } from "react";
import { Row, Col, Form, Form as BootstrapForm, InputGroup, Modal, Accordion } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";

import RequiredSign from "../new_registration/form/comp/requiredSign";

export const RevisedInputQty = ({ fieldName, required_qty = 0, particular = 'no_name' }) => {
    // field value to get here 
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <div className="table-responsive">
                        <Table >
                            <thead>
                                <tr>
                                    <th style={{ textTransform: "none" }}>Particulars</th>
                                    <th style={{ textTransform: "none" }}>Required Quantity</th>
                                    <th style={{ textTransform: "none" }}>Enter Qty <RequiredSign /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{formatLabel(particular)}</td>
                                    <td>{required_qty}</td>
                                    <td>
                                        <Field
                                            type="number"
                                            name={`${fieldName}`}
                                            as={Form.Control}
                                        />
                                        <div className="text-danger">
                                            <ErrorMessage name={`${fieldName}`} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

