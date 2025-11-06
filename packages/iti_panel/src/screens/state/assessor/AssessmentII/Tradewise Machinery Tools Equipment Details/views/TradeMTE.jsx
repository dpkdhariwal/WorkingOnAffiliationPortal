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

import { FormContext } from "@/screens/state/assessor/AssessmentII/Tradewise Machinery Tools Equipment Details/TradewiseMachineryToolsEquipment";
import { formatedDate, formatLabel, viewFile } from "@/helpers";

import TOOLS from "./views/TOOLSVARIFICATION"


export const Comp = ({ step, title, info, FormContext }) => {
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
        return <TOOLS step={step}  info={obj} obj={obj} index={index} FormContext={FormContext} />
        // return <Accordion.Item eventKey={String(index)} key={index} className={`collapse show custom-accordion-primary`}>
        //     <Accordion.Header>{obj?.tradeInfo?.trade_name}</Accordion.Header>
        //     <Accordion.Body>
        //         <TOOLS info={obj} obj={obj} index={index} />
        //         {/* {info.map((obj, i) => setStepContent(obj, i))} */}
        //     </Accordion.Body>
        // </Accordion.Item>
    }
    return (
        <>
            {/* {console.log(info)} */}
            <Accordion className="accordions-items-seperate" alwaysOpen defaultActiveKey={[1, 2]}>
                {info.map((obj, i) => setStepContent(obj, i))}
            </Accordion>
        </>
    );
};
export default Comp;