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



export const DocumentPhoto = ({ FormContext,  particular = 'no_name',  documentUrl = null }) => {
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
                                    <th style={{textTransform:"none"}}>Document/Photo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{particular}</td>
                                    <td><Button onClick={()=>{viewFile(documentUrl)}} size="sm">View Document/Photo</Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

