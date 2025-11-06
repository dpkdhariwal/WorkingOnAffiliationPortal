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
import * as st from "@/services/state/index"

import { st1documentuploads } from 'affserver';


export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { st1_da_landdocuments } from "affserver";
import { formatedDate, viewFile } from "@/helpers";
import { Navigations } from "@/components/Assessment/components";
import SwalManager from "@/common/SwalManager";
import { SelectField } from "@/components/formik/Inputs";

import OrganizationCertficate from "@/screens/state/assessor/AssessmentI/OtherDocuments/views/Registration CertificateOfApplicantOrganization";
import IDProofSCP from "@/screens/state/assessor/AssessmentI/OtherDocuments/views/IDProofof SecretaryChairpersonPresident";
import AuthorizedSegnatory from "@/screens/state/assessor/AssessmentI/OtherDocuments/views/IDProofofAuthorizedSignatory";
import RegistrationCertificate from "@/screens/state/assessor/AssessmentI/OtherDocuments/views/ResolutionCertificate";
import BasicDetails from "@/screens/state/assessor/AssessmentI/ApplicantEntityDetails/views/BasicDetails"


export const FormContext = createContext();
export const EntityDetails = ({ steps, step, view: viewProp = false, isView = false, nav }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");
    const formRefs = useRef([]);
    const [vCompList, setVCompList] = useState([]);
    const addItem = (newItem) => {
        setVCompList((prev) => [...prev, newItem]);
    };

    const { Formik } = formik;


    const formsRef = useRef({});
    const registerForm = (id, formikRef) => {
        formsRef.current[id] = formikRef;
    };
    const unregisterForm = (id) => {
        delete formsRef.current[id];
    };

    // Starts New 
    const formRef = useRef();
    const onNext = async () => {
        nav.next();
    }



    return (
        <>
            <BasicDetails appId={appId} />
            <Navigations nav={nav} onNext={onNext} />
        </>
    );
};






