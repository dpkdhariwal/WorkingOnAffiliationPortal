import React, { createContext, useRef, useContext, Fragment, useState, useEffect, useTransition } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";

import { useLocation } from "react-router-dom";

import * as C from "affserver";

import { st1documentuploads } from 'affserver';

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);


// import * as gen from "../../../../../../../../../services/state/index";

import { useTranslation } from 'react-i18next';
import { viewFile } from "@/helpers";

export const ItiResolutionCertificate = ({ data }) => {
    const { t } = useTranslation();
    // Location
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");
    const [formData, setFormData] = useState({});

    const [language, setLanguage] = useState([]);
    const [id_proof_master, setId_proof_master] = useState([]);

    const loadInfo = async () => {
        try {
            // let r4 = await gen.getMasters(C.MastersKey.ID_PROOF);
            // setId_proof_master(r4.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadInfo();
    }, [appId]);

    const cleareForresubmit = () => {
        console.log("dssfadfas");
    }

    return (
        <>

            <Card className="bg-body-tertiary border border-2 border-danger card custom-card shadow-danger shadow-size-small">
                <Card.Header className="d-flex justify-content-between">
                    <Modal.Title as="h6">New Resolution for Starting ITI</Modal.Title>
                    <Button onClick={() => { cleareForresubmit() }} variant="outline-warning" size="sm">Re-Submit</Button>
                </Card.Header>
                <Card.Body>
                    <Button variant="success" onClick={() => {viewFile(data?.latest_certificate?.document);}} className="btn-block" size="lg" >View New Uploaded Resolution for Starting ITI </Button>
                </Card.Body>
            </Card>
        </>
    );
};








