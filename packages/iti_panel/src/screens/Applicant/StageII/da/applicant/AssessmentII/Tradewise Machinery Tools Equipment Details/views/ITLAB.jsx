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
import * as st from "@/services/state/index";

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { st1_da_landdocuments } from "affserver";
import { ContextMap } from "@/components/formik/contexts";
import { Navigations } from "@/components/Assessment/components";

import { FormContext } from "../TradewiseMachineryToolsEquipment";
import { formatedDate, formatLabel, viewFile } from "@/helpers";

import DESKTOP_COMPUTER_WITH_LATEST_CONFIGURATION from "./views/DESKTOP_COMPUTER_WITH_LATEST_CONFIGURATION"
import OTHER_IT_LAB_PARTICULAR from "./views/OTHER_IT_LAB_PARTICULAR"


export const Comp = ({ title, info }) => {
    console.log(info);
    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    const { handleSubmit, handleChange, values, errors, touched, } = useContext(FormContext);

    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.clientHeight); // or offsetHeight / scrollHeight
        }
    }, []); // runs once on mount


    const setStepContent = (obj, index) => {
        // console.log(step, stepIndex);
        // return "dfasdfdsf";
        switch (obj.keyName) {
            case C.iti_lab_particulars_keys.DESKTOP_COMPUTER_WITH_LATEST_CONFIGURATION.key:
                return <DESKTOP_COMPUTER_WITH_LATEST_CONFIGURATION title={obj.keyName} index={index} info={info} data={obj} />;
            case C.iti_lab_particulars_keys.INTERNET_CONNECTION.key:
            case C.iti_lab_particulars_keys.COMPUTER_WITH_MULTIMEDIA_ANTI_VIRUS_ETC.key:
            case C.iti_lab_particulars_keys.LAN_CABLING_ETC.key:
            case C.iti_lab_particulars_keys.PRINTER_LASER.key:
            case C.iti_lab_particulars_keys.SCANNER.key:
            case C.iti_lab_particulars_keys.SERVER.key:
            case C.iti_lab_particulars_keys.EXTERNAL_HARD_DISK_1TB.key:
            case C.iti_lab_particulars_keys.INSTRUCTOR_OFFICE_CHAIR.key:
            case C.iti_lab_particulars_keys.INSTRUCTOR_OFFICE_TABLE.key:
            case C.iti_lab_particulars_keys.TRAINEES_COMPUTER_CHAIRS.key:
            case C.iti_lab_particulars_keys.TRAINEES_COMPUTER_TABLES.key:
            case C.iti_lab_particulars_keys.BLACK_WHITE_BOARD_4X6_FEET.key:
                return <OTHER_IT_LAB_PARTICULAR title={obj.keyName} index={index} info={info} data={obj} />;
                break;
            default:
                return 'dfadfas'
        }
    }
    return (
        <>
            <Accordion.Item eventKey={String(1)} key={1} className={`collapse show custom-accordion-primary`}>
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body>
                    {info.map((obj, i) => setStepContent(obj, i))}
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
};
export default Comp;