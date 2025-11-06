import { viewFile } from "@/helpers";
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

import { FileField2 } from "../formik/Inputs/FileField2";
import RequiredSign from "../new_registration/form/comp/requiredSign";


export const RevisedInputArea = ({ FormContext, required_area_fieldname = 'no_name', document_field = 'no_name', particular = 'no_name', required_area = '--' }) => {
    // field value to get here 
    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <div className="table-responsive">
                        <Table >
                            <thead>
                                <tr>
                                    <th style={{textTransform:"none"}}>Particulars</th>
                                    <th style={{textTransform:"none"}}>Required Area (Sqm.)</th>
                                    <th style={{textTransform:"none"}}>Available Area (Sqm.)</th>
                                    <th style={{textTransform:"none"}}>Upload Photo <RequiredSign /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{particular}</td>
                                    <td>{required_area}</td>
                                    <td>
                                        <Field
                                            type="number"
                                            name={required_area_fieldname}
                                            as={Form.Control}
                                        />
                                        <div className="text-danger">
                                            <ErrorMessage name={required_area_fieldname} />
                                        </div>
                                    </td>
                                    <td>
                                        <FileField2
                                            label={'document_lable'}
                                            name={document_field}
                                            mandatory
                                            accept=".pdf,.jpg,.png"
                                            context={FormContext}
                                        />
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

