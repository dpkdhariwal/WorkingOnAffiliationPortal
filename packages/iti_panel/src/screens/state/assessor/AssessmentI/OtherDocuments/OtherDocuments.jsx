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

// import * as get from "../../../../../../../../db/forms/stageI/get/get";
// import * as set from "../../../../../../../../db/forms/stageI/set/set";

// import { get_da_status_possasion_of_land, set_da_status_possasion_of_land } from "../../../../../../../../db/forms/stageI/set/set";
// import { Navigations } from "../../../../../../../Assessment/components";
import * as C from "affserver";
// import SwalManager from "../../../../../../../../common/SwalManager";


import * as st from "@/services/state/index"

import { st1documentuploads } from 'affserver';
// import { SelectField } from "../../../../../../../formik/Inputs";


export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
// import { ContextMap } from "../../../../../../../formik/contexts";
// import { LandAreaApplicantForm } from "./land_area/land_area_applicant_form";
// import { LandInfoView } from "./land_area/LandInfoView";


// import * as gen from "../../../../../../../../services/general/index";

import { st1_da_landdocuments } from "affserver";
import { formatedDate, viewFile } from "@/helpers";
import { Navigations } from "@/components/Assessment/components";
import SwalManager from "@/common/SwalManager";
import { SelectField } from "@/components/formik/Inputs";

import OrganizationCertficate from "./views/Registration CertificateOfApplicantOrganization";
import IDProofSCP from "./views/IDProofof SecretaryChairpersonPresident";
import AuthorizedSegnatory from "./views/IDProofofAuthorizedSignatory";
import RegistrationCertificate from "./views/ResolutionCertificate";





export const FormContext = createContext();
export const OtherDocuments = ({ steps, step, view: viewProp = false, isView = false, nav }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");

    // const Context = ContextMap['stageIAsmtDetails'] || ContextMap.default;
    // const { assessmentInfo } = useContext(Context);

    const formRefs = useRef([]);


    const [vCompList, setVCompList] = useState([]);
    const addItem = (newItem) => {
        setVCompList((prev) => [...prev, newItem]);
    };
    // useEffect(() => {
    //   addItem({ title: "Land Deatil", comp: <LandInfoView /> });
    //   step?.VerificationList?.map((item, index) => {
    //     switch (item.checkName) {
    //       case C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND:
    //         addItem({ title: "Possession of Land", comp: <PossessionOfLand step={step} /> });
    //         break;
    //       case C.ASSESSMENT_STAGE_I_KEYS.LAND_AREA:
    //         addItem({ title: "Land Area", comp: setLandContent() });
    //         break;
    //     }
    //   })
    // }, [step])


    const { Formik } = formik;
    const formRef2 = useRef();
    const dispatch = useDispatch();


    // Experiment Starts @dpkdhariwal
    const registry = useRef([]); // store all child functions
    const register2 = (index, obj) => {
        registry.current[index] = obj;
    };


    const setLandContent = (item, title) => {
        console.log(step?.actor);
        switch (step?.actor) {
            // case C.SL.APPLICANT:
            //   return <LandAreaApplicantForm data={item} />
            // break;
            case C.SL.ASSESSOR:
                return <LandArea data={item} />
            // break;
            default:
                return "NA";
        }
    }

    const formsRef = useRef({});
    const registerForm = (id, formikRef) => {
        formsRef.current[id] = formikRef;
    };
    const unregisterForm = (id) => {
        delete formsRef.current[id];
    };

    // Starts New 
    const formRef = useRef();
    // const onNext = async () => {
    //     await formRef.current.submitForm();
    //     await formRef.current.validateForm();
    //     console.log(formRef.current);
    //     return;
    //     const allValues = [];
    //     const changeArray = [];
    //     const isFormValid = [];

    //     try {
    //         for (const id in formsRef.current) {
    //             const formInfo = await formsRef?.current[id];
    //             const { changeInForm, getData, editMode, refNo } = formInfo;
    //             console.log(id, changeInForm, editMode);
    //             changeArray.push(changeInForm);

    //             if (changeInForm == true) {
    //                 let formInstance = getData();
    //                 console.log(formInstance);
    //                 formInstance = formInstance.current;
    //                 await formInstance.validateForm();
    //                 console.log(formInstance.values);
    //                 console.log(formInstance.isValid);
    //                 isFormValid.push(formInstance.isValid);
    //                 allValues.push({ toSave: changeInForm, id: id, refNo: refNo, values: formInstance.values });
    //             }
    //             else {
    //                 allValues.push({ toSave: changeInForm, id: id });
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     if (changeArray.every(v => !v)) {
    //         console.log("All values are false!");
    //         nav.next();
    //     } else {

    //         if (isFormValid.every(v => v)) {
    //             console.log("All forms submitted:", allValues, changeArray);
    //             await st.save_da_doc_verification_remarks(appId, assessmentInfo.assessment_id, allValues, step.step);
    //             nav.next();
    //         } else {
    //             console.log("Please Review Assessment First");
    //             Swal.fire({
    //                 icon: "warning",
    //                 title: "Review Documents",
    //                 showConfirmButton: true,
    //                 confirmButtonText: "OK",
    //                 allowOutsideClick: false
    //             });
    //         }
    //     }
    // }

    const onNext = async () => {

        try {
            // Wait for form submission and validation to complete
            await formRef.current.submitForm();
            await formRef.current.validateForm();

            // Destructure the form state
            const { isValid, values } = formRef.current;

            // Check if form is valid
            if (!isValid) {
                throw new Error("Validation Error");
            }

            // Log the form values if valid
            console.log(values);
            Swal.fire({ title: "Saving...", text: "Please wait while we save your data.", allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
            await st.save_da_doc_verification_remarks(appId, step.assessment_id, values, step.step);

            Swal.close(); // close loading in case it’s still open

            const result2 = await Swal.fire({ icon: "success", title: "Saved!", text: "Your form data has been saved successfully", confirmButtonText: "OK", });
            if (result2.isConfirmed) {
                nav.next();
            }
            // nav.next();

        } catch (error) {
            // Handle validation errors
            if (error.message === "Validation Error") {
                Swal.fire({
                    icon: "warning",
                    title: "Review Documents",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    allowOutsideClick: false
                });
            } else {
                // Handle server or other types of errors
                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    allowOutsideClick: false
                });
            }
        }

        // try {
        //     await formRef.current.submitForm();
        //     await formRef.current.validateForm();

        //     const { isValid, values } = formRef.current;

        //     if (isValid !== true) {
        //         throw "Validation Error"
        //     }


        //     console.log(values);
        // } catch (error) {
        //     Swal.fire({
        //         icon: "warning",
        //         title: "Review Documents",
        //         showConfirmButton: true,
        //         confirmButtonText: "OK",
        //         allowOutsideClick: false
        //     });
        // }
        // catch (error) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Server Error",
        //         showConfirmButton: true,
        //         confirmButtonText: "OK",
        //         allowOutsideClick: false
        //     });
        // }



        // const allValues = [];
        // const changeArray = [];
        // const isFormValid = [];

        // try {
        //     for (const id in formsRef.current) {
        //         const formInfo = await formsRef?.current[id];
        //         const { changeInForm, getData, editMode, refNo } = formInfo;
        //         console.log(id, changeInForm, editMode);
        //         changeArray.push(changeInForm);

        //         if (changeInForm == true) {
        //             let formInstance = getData();
        //             console.log(formInstance);
        //             formInstance = formInstance.current;
        //             await formInstance.validateForm();
        //             console.log(formInstance.values);
        //             console.log(formInstance.isValid);
        //             isFormValid.push(formInstance.isValid);
        //             allValues.push({ toSave: changeInForm, id: id, refNo: refNo, values: formInstance.values });
        //         }
        //         else {
        //             allValues.push({ toSave: changeInForm, id: id });
        //         }
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

        // if (changeArray.every(v => !v)) {
        //     console.log("All values are false!");
        //     nav.next();
        // } else {

        //     if (isFormValid.every(v => v)) {
        //         console.log("All forms submitted:", allValues, changeArray);
        //         await st.save_da_doc_verification_remarks(appId, assessmentInfo.assessment_id, allValues, step.step);
        //         nav.next();
        //     } else {
        //         console.log("Please Review Assessment First");
        //         Swal.fire({
        //             icon: "warning",
        //             title: "Review Documents",
        //             showConfirmButton: true,
        //             confirmButtonText: "OK",
        //             allowOutsideClick: false
        //         });
        //     }
        // }
    }



    // Loadin Data
    const loadData = async () => {
        try {
            const result = await st.get_vrf_list_land_to_be_used(appId, step.step);
            console.log(result.data);
            // addItem({ row: null, title: "Land Deatil", comp: <LandInfoView step={step} /> });
            // result.data?.map((item, index) => {
            //     switch (item.checkName) {
            //         case C.DA1_KEYS.LAND_DOCUMENT:
            //         case C.ASSESSMENT_STAGE_I_KEYS.LAND_DOCUMENTS:
            //             addItem({ row: item, title: "Possession of Land", comp: <PossessionOfLand data={item} step={step} /> });
            //             break;
            //         case C.ASSESSMENT_STAGE_I_KEYS.LAND_AREA:
            //             addItem({ row: item, title: "Land Area", comp: setLandContent(item, "Land Area") });
            //             break;
            //     }
            // })
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { loadData(); }, []);


    const [initValues, setInitValues] = useState(C.st1Asmt.UploadedDocuments.intiValues);
    const LoadVerificationStatus = async () => {
        try {
            const resp = await st.getVerificationListForStageI(appId, step.step);
            console.log(resp.data);
            setInitValues(resp.data);

            Object.entries(resp.data).forEach(([key, value]) => {
                console.log(key, value);
                switch (key) {
                    case "REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION":
                        addItem({ row: value, title: "Registration Certificate of Applicant Organization", comp: <OrganizationCertficate title={key} info={value} FormContext={FormContext} /> });
                        break;
                    case "ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT":
                        addItem({ row: value, title: "ID Proof of Secretary/Chairperson/President", comp: <IDProofSCP title={key} info={value} FormContext={FormContext} /> });
                        break;
                    case "ID_PROOF_OF_AUTHORIZED_SIGNATORY":
                        addItem({ row: value, title: "ID Proof of Authorized Signatory", comp: <AuthorizedSegnatory title={key} info={value} FormContext={FormContext} /> });
                        break;
                    case "RESOLUTION_CERTIFICATE":
                        addItem({ row: value, title: "Resolution Certificate", comp: <RegistrationCertificate title={key} info={value} FormContext={FormContext} /> });
                        break;
                }
            });

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => { LoadVerificationStatus(); }, []);


    return (
        <Formik innerRef={formRef}
            enableReinitialize
            initialValues={initValues}
            validationSchema={C.st1Asmt.UploadedDocuments.ValSchema}
            onSubmit={(values) => { console.log(values); }} >
            {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => {
                return (
                    <FormContext.Provider value={{ setFieldValue, handleSubmit, handleChange, values, errors, touched, registerForm, unregisterForm }}>
                        <Form onSubmit={handleSubmit} validated>
                            <FunctionRegistryContext.Provider value={register2}>
                                <div key={0} style={{ backgroundColor: "rgb(245, 245, 245)", margin: "10px 0px 0px", borderRadius: 6, borderStyle: "dashed", borderWidth: "thin", padding: "10px", }}>
                                    <div>
                                        <Accordion className="customized-accordion accordions-items-seperate" alwaysOpen defaultActiveKey={['0', '1', '2', '3', '4', '5']}>
                                            {vCompList.map((c, idx) => {
                                                return (
                                                    <Accordion.Item aria-expanded={true} key={idx} className={`collapse show custom-accordion-${{ yes: 'success', no: 'danger' }[c?.row?.Verificiation?.as_per_norms] || 'primary'} `} eventKey={String(idx)}>
                                                        <Accordion.Header>{c.title}</Accordion.Header>
                                                        <Accordion.Body>
                                                            {c.comp}
                                                        </Accordion.Body>
                                                    </Accordion.Item>)
                                            })}
                                        </Accordion>
                                    </div>
                                </div>
                                {isView == false && <Navigations nav={nav} onNext={onNext} />}
                            </FunctionRegistryContext.Provider>
                        </Form>
                    </FormContext.Provider>
                )
            }}
        </Formik>


    );
};

// Land Info 
export const LandInfo = () => {
    return (<Row
        style={{
            backgroundColor: "rgb(245, 245, 245)",
            margin: "10px 0px 0px",
            borderRadius: 6,
            // borderStyle: "dashed",
            // borderWidth: "thin",
            // padding: "10px",
        }}
    > <Col xl={12} lg={12} md={12} sm={12}>
            <table
                width="100%"
                border={1}
                style={{ borderCollapse: "collapse", color: 'black' }}
                align="center"
                cellPadding="5px"
            >
                <tbody>
                    <tr>
                        <th style={{ border: "1px solid black" }}>Possession of Land</th>
                        <th style={{ border: "1px solid black" }}>Land Owner Name</th>
                        <th style={{ border: "1px solid black" }}>Land Registration Number</th>

                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black" }}>Owned</td>
                        <td style={{ border: "1px solid black" }}>ABCD</td>
                        <td style={{ border: "1px solid black" }}>123456789</td>
                    </tr>
                </tbody>
            </table>
        </Col>
    </Row>)
}

// Possation of Land
export const PossessionOfLand = ({ data, step, view: viewProp = false, isView = false }) => {

    console.log(data);

    // Location
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");


    const { Formik } = formik;
    const formRef2 = useRef();

    // useState
    const [view, setView] = useState(viewProp);
    const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
    const [editMode, setEditMode] = useState(false); // true || false
    const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
    const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
    const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
    const [formData, setFormData] = useState({});
    const [formSubmited, setFormSubmited] = useState(false);
    const [aStatus, setAStatus] = useState({});
    // End


    const loadInfo = async () => {
        // let result = await get_da_status_possasion_of_land(appId);
        let result = await st.get_da_status_possasion_of_land(appId);
        console.log(result);
        // let assessment_status = await set.getAssessmentProgressStatus(appId);

        let assessment_status, resp;
        resp = await st.getAssessmentProgressStatus(appId);
        assessment_status = resp.data
        setAStatus(assessment_status);
        const lastObj = result[0];
        if (lastObj) {
            setInitValue(lastObj);
            console.log(lastObj);
            setFormData(lastObj);
            setFormSubmited(true);
            setReviewStatus(C.SL.REVIEWED);
            setViewType(C.SL.VIEW);
        }
    }

    useEffect(() => { loadInfo(); }, [appId]);

    useEffect(() => { console.log(aStatus); }, [aStatus]);

    const formRef = useRef();

    const reviewStatusRef = useRef(reviewStatus);
    useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);

    const editModeRef = useRef(editMode);
    useEffect(() => { editModeRef.current = editMode; }, [editMode]);

    const form = async () => {
        console.log(initValue?.isValid);
        if (initValue?.isValid) {
            await set_da_status_possasion_of_land(appId, formRef.current.values);
            setAnyChangesMade(false);
            setEditMode(false);
            setReviewStatus(C.SL.REVIEWED);
            setViewType(C.SL.VIEW);
            return true;
        }
        else {
            return false;
        }
    }


    console.log(step);

    const setContent = () => {
        console.log(data);
        switch (data?.actor) {
            // case C.SL.APPLICANT:
            // case 'applicant':
            //   return <PossessionOfLandForApplicant data={data} />
            case C.SL.ASSESSOR:
                return <PossessionOfLandForAssessment data={data} />
            default:
                return "NA";
        }
    }


    return (
        <>
            {setContent()}
        </>
    );
};
export const PossessionOfLandForApplicant = ({ data, step, view: viewProp = false, isView = false }) => {


    // Location
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");


    const { Formik } = formik;
    const formRef2 = useRef();
    const formikRef = useRef();

    // useState
    const [view, setView] = useState(viewProp);
    const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
    const [editMode, setEditMode] = useState(false); // true || false
    const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
    const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
    const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
    const [formData, setFormData] = useState({});
    const [formSubmited, setFormSubmited] = useState(false);
    const [aStatus, setAStatus] = useState({});
    // End

    const [language, setLanguage] = useState([]);

    const loadLanguage = async () => {
        try {
            let r3 = await gen.geLanguages(appId);
            setLanguage(r3.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        loadLanguage();
    }, [appId])
    const loadInfo = async () => {
        let result = await get_da_status_possasion_of_land(appId);
        console.log(result);
        let assessment_status = await set.getAssessmentProgressStatus(appId);
        setAStatus(assessment_status);
        const lastObj = result[result.length - 1];
        if (lastObj) {
            setInitValue(lastObj);
            console.log(lastObj);
            setFormData(lastObj);
            setFormSubmited(true);
            setReviewStatus(C.SL.REVIEWED);
            setViewType(C.SL.VIEW);
        }
    }

    useEffect(() => {
        loadInfo();
    }, [appId]);


    useEffect(() => {
        console.log(aStatus);
    }, [aStatus]);




    const formRef = useRef();
    const register = useFunctionRegistry();
    useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);



    const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND}`, () => { return { submitNow } }); }
    useEffect(() => { formFunction(); }, [formRef]);


    const form = async () => {
        console.log(formRef.current.isValid);
        if (formRef.current.isValid) {
            await set_da_status_possasion_of_land(appId, formRef.current.values);
            setAnyChangesMade(false);
            setEditMode(false);
            setReviewStatus(C.SL.REVIEWED);
            setViewType(C.SL.VIEW);
            return true;
        }
        else {
            return false;
        }
    }


    const submitNow = async () => {
        console.log(reviewStatus);
        switch (reviewStatus) {
            case C.SL.PENDING:
                return await form();
            case C.SL.REVIEWED:
                switch (editMode) {
                    case true:
                        return await form();
                    case false:
                        return true;
                }
                break;
            default:
                break;
        }
    }


    // const setContent = () => {
    //   console.log(step);
    //   switch (step?.for) {
    //     case C.SL.APPLICANT:
    //       break;
    //     case C.SL.ASSESSOR:
    //       break;
    //     default:
    //       return "NA";
    //   }
    // }



    //Important Attaching to Context 
    let obj = { changeInForm: true, refNo: data.uniqueId, editMode: true, getData: () => { return formikRef } }
    const [formId, setFormId] = useState('land_documents'); // true || false
    const { registerForm, unregisterForm } = useContext(FormContext);
    registerForm(formId, obj); //TEST

    useEffect(() => {
        if (formikRef.current) {
            registerForm(formId, obj);
        }
        // return () => unregisterForm(formId);
    }, [formikRef, formId, registerForm, unregisterForm]);


    return (
        <>
            {console.log(data)}
            <Card
                className={`border border-2 card custom-card shadow-size-small ${{ yes: "shadow-success border-success", no: "shadow-danger border-danger" }[
                    data?.Verificiation?.as_per_norms
                ] || "shadow-primary border-primary"
                    } card`}
                style={
                    data?.Verificiation?.as_per_norms == "yes"
                        ? { backgroundColor: "#d6f3e0" }
                        : { backgroundColor: "#f3d6d6" }
                }
            >
                <Card.Header>
                    <label
                        className="main-content-label my-auto"
                        style={{ textTransform: "none" }}
                    >
                        State Remark
                    </label>
                    <div className="ms-auto  d-flex">
                        {formatedDate(data?.Verificiation?.insertDate)}
                    </div>
                </Card.Header>
                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                    <Row className="mb-3">
                        <Col md={12}>
                            <b>Whether the Land Area of the applicant institute is as per norms?:</b>
                            <span style={{ textTransform: "capitalize" }}> {data?.Verificiation?.as_per_norms} </span> </Col>
                        {data?.Verificiation?.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {data?.Verificiation?.reason} </span> </Col>)}
                        {data?.Verificiation?.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{data?.Verificiation?.assessor_comments}</p> </Col>)}
                    </Row>
                </Card.Body>
            </Card>
            <hr />
            {data?.da_status == C.SL.REPLIED ? (
                <Table
                    className="ttext-nowrap table-striped table"
                    width="100%"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Language</th>
                            <th>Land Document</th>
                            <th>Notarised Document</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.latest_land_documents.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index++}</td>
                                    <td>{item.language}</td>
                                    <td><Button size="sm">View Land Document</Button></td>
                                    <td><Button size="sm">View Notarised Document</Button></td>
                                    <td><Button size="sm">Remove</Button></td>
                                </tr>)
                        })}

                    </tbody>
                </Table>
            )

                :
                (<Formik
                    enableReinitialize={true}
                    innerRef={formikRef}
                    initialValues={st1documentuploads.intiValuesForLandDocuments}
                    validationSchema={st1documentuploads.valSchemaForLandDocuments}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log("Form submitted with:", values);
                        setSubmitting(false);
                        // resetForm();
                    }}
                >
                    {({ handleSubmit, handleChange, setFieldValue, values, errors, touched, handleBlur }) => {
                        console.log(errors)
                        return (<>
                            <ContextMap.stageIAsmtAppDocUpload.Provider value={{ handleSubmit, handleChange, values, errors, touched, setFieldValue, handleBlur }} >
                                <Form noValidate onSubmit={handleSubmit}>
                                    <FieldArray name="onwed_land_documents">
                                        {({ push, remove }) => (
                                            <Card className="custom-card border border-primary">
                                                <Card.Header>
                                                    <div className="card-title" style={{ textTransform: "none" }}>
                                                        Upload Onwed Land Documents
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Table bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Document Language <span style={{ color: "red" }}>*</span></th>
                                                                <th>Original Document <span style={{ color: "red" }}>*</span></th>
                                                                <th>Notarised Copy</th>
                                                                {/* <th>Action</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {values.onwed_land_documents.map((doc, index) => (
                                                                <tr
                                                                    key={doc.id} // ✅ stable unique key
                                                                    style={{
                                                                        marginBottom: "1rem",
                                                                        border: "1px solid #ccc",
                                                                        padding: "10px",
                                                                    }}
                                                                >
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <SelectField
                                                                            label="State"
                                                                            name={`onwed_land_documents[${index}].land_documents_language`}
                                                                            mandatory
                                                                            options={language}
                                                                            contextName="stageIAsmtAppDocUpload"
                                                                            // onValueChange={(val) => OnApplicantEntityStateChange(val, 'cmp_post_district')}
                                                                            valueProp="language"
                                                                            labelProp="language"
                                                                            size="lg"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <BootstrapForm.Group>
                                                                            {values.onwed_land_documents[index].land_documents ? (
                                                                                <div>
                                                                                    {/* Show selected file name */}
                                                                                    <strong>{values.onwed_land_documents[index].land_documents.name}</strong>
                                                                                    <hr />
                                                                                    {/* View Button */}
                                                                                    <Button
                                                                                        variant="info"
                                                                                        size="sm"
                                                                                        className="ms-2"
                                                                                        onClick={() =>
                                                                                            window.open(
                                                                                                URL.createObjectURL(values.onwed_land_documents[index].land_documents),
                                                                                                "_blank"
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        View
                                                                                    </Button>

                                                                                    {/* Remove Button */}
                                                                                    <Button
                                                                                        variant="danger"
                                                                                        size="sm"
                                                                                        className="ms-2"
                                                                                        onClick={() => setFieldValue(`onwed_land_documents[${index}].land_documents`, null)}
                                                                                    >
                                                                                        Remove
                                                                                    </Button>
                                                                                </div>
                                                                            ) : (
                                                                                <>
                                                                                    <BootstrapForm.Control
                                                                                        type="file"
                                                                                        onChange={(e) =>
                                                                                            setFieldValue(`onwed_land_documents[${index}].land_documents`, e.target.files[0])
                                                                                        }
                                                                                        isInvalid={!!errors.onwed_land_documents?.[index]?.land_documents}

                                                                                    />
                                                                                    <ErrorMessage
                                                                                        name={`onwed_land_documents[${index}].land_documents`}
                                                                                        component="div"
                                                                                        style={{ color: "red" }}
                                                                                    />
                                                                                </>
                                                                            )}
                                                                        </BootstrapForm.Group>
                                                                    </td>
                                                                    <td>
                                                                        <BootstrapForm.Group>
                                                                            {values.onwed_land_documents[index].land_notarised_documents && values.onwed_land_documents[index].land_documents_language != "Hindi" && values.onwed_land_documents[index].land_documents_language != "English" ? (
                                                                                <div>
                                                                                    {/* Show selected file name */}
                                                                                    <strong>{values.onwed_land_documents[index].land_notarised_documents.name}</strong>
                                                                                    <hr />
                                                                                    {/* View Button */}
                                                                                    <Button
                                                                                        variant="info"
                                                                                        size="sm"
                                                                                        className="ms-2"
                                                                                        onClick={() =>
                                                                                            window.open(
                                                                                                URL.createObjectURL(values.onwed_land_documents[index].land_notarised_documents),
                                                                                                "_blank"
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        View
                                                                                    </Button>
                                                                                    {/* Remove Button */}
                                                                                    <Button
                                                                                        variant="danger"
                                                                                        size="sm"
                                                                                        className="ms-2"
                                                                                        onClick={() => setFieldValue(`onwed_land_documents[${index}].land_notarised_documents`, null)}
                                                                                    >
                                                                                        Remove
                                                                                    </Button>
                                                                                </div>
                                                                            ) : (
                                                                                <>
                                                                                    <BootstrapForm.Control
                                                                                        disabled={
                                                                                            values.onwed_land_documents[index].land_documents_language === "Hindi" ||
                                                                                            values.onwed_land_documents[index].land_documents_language === "English"
                                                                                        } // ✅ Disable if Hindi/English
                                                                                        type="file"
                                                                                        onChange={(e) =>
                                                                                            setFieldValue(`onwed_land_documents[${index}].land_notarised_documents`, e.target.files[0])
                                                                                        }
                                                                                        isInvalid={!!errors.onwed_land_documents?.[index]?.land_notarised_documents}

                                                                                    />
                                                                                    <ErrorMessage
                                                                                        name={`onwed_land_documents[${index}].land_notarised_documents`}
                                                                                        component="div"
                                                                                        style={{ color: "red" }}
                                                                                    />
                                                                                </>
                                                                            )}
                                                                        </BootstrapForm.Group>
                                                                    </td>
                                                                    {false && (<td>
                                                                        {/* Remove Button */}
                                                                        {values.onwed_land_documents.length > 1 && (
                                                                            <Button variant="danger" size="sm" onClick={() => remove(index)}>Remove</Button>
                                                                        )}
                                                                    </td>)}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                                {false && (<Card.Footer className="text-start">
                                                    <Button className="mb-3" onClick={() =>
                                                        push({ id: Date.now(), file: null, fileUrl: "", title: "" })
                                                    }>
                                                        Add More
                                                    </Button>
                                                </Card.Footer>)}
                                            </Card>
                                        )}
                                    </FieldArray>
                                </Form >
                            </ContextMap.stageIAsmtAppDocUpload.Provider>
                        </>)
                    }}
                </Formik>)}

        </>
    );
};
export const PossessionOfLandForAssessment = ({ data, step, view: viewProp = false, isView = false }) => {


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");

    const [view, setView] = useState(viewProp);
    const MaxData = [
        { value: "Document is not legible", label: "Document is not legible" },
        { value: "Document is irrelevant", label: "Document is irrelevant" },
        {
            value: "Document lacks required information",
            label: "Document lacks required information",
        },
        {
            value:
                "Document is not approved by the competent authority in the State/ UT",
            label:
                "Document is not approved by the competent authority in the State/ UT",
        },
        {
            value:
                "Address on the document does not match with the proposed land/ building address",
            label:
                "Address on the document does not match with the proposed land/ building address",
        },
        {
            value:
                "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
            label:
                "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
        },
        {
            value: "other",
            label: "other",
        },
    ];

    const { Formik } = formik;
    const formRef = useRef();

    // @dpkdhariwal
    const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
    const [editMode, setEditMode] = useState(false); // true || false
    const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
    const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
    // End

    const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
    const [aStatus, setAStatus] = useState({});

    const register = useFunctionRegistry();
    const [formData, setFormData] = useState({});
    const [formSubmited, setFormSubmited] = useState(false);

    const [remarkInfo, setRemarkInfo] = useState({});



    const [land_documents, setLand_documents] = useState([]);

    useEffect(() => {
        console.log(land_documents);
    }, [land_documents])




    useEffect(() => {
        const verificiation = data.Verificiation || {};
        if (verificiation) {
            const { as_per_norms, reason, assessor_comments } = verificiation;
            setInitValue({ as_per_norms, reason, assessor_comments });
            setRemarkInfo(data.Verificiation);
        }
    }, [data])

    useEffect(() => {
        console.log(remarkInfo);
    }, [remarkInfo])




    const loadInfo = async () => {
        // let result = await set.get_da_status_land_area(appId);
        console.log("dfadfasfdsa");
        try {
            let result, assessment_status, resp;
            resp = await st.get_da_status_possasion_of_land(appId);
            result = resp.data;
            setLand_documents(resp.data.land_documents);

            // let assessment_status = await set.getAssessmentProgressStatus(appId);
            resp = await st.getAssessmentProgressStatus(appId);
            assessment_status = resp.data;
            setAStatus(assessment_status);
            console.log(assessment_status);
            if (result) {
                // setInitValue(result);
                setFormData(result);
                setFormSubmited(true);
                // setReviewStatus(C.SL.REVIEWED);
                setViewType(C.SL.VIEW);
            }

        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => { loadInfo(); }, [appId]);


    const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND}`, () => { return { submitNow } }); }


    useEffect(() => {
        formFunction();
    }, [formRef]);


    const reviewStatusRef = useRef(reviewStatus);
    useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);


    const editModeRef = useRef(editMode);
    useEffect(() => { editModeRef.current = editMode; }, [editMode]);


    const form = async () => {
        if (formRef.current.isValid) {
            // await set_da_status_possasion_of_land(appId, formRef.current.values);
            await st.set_da_status_possasion_of_land(appId, formRef.current.values);

            // throw new Error("Stopped.....");
            setAnyChangesMade(false);
            setEditMode(false);
            // setReviewStatus(C.SL.REVIEWED);
            setViewType(C.SL.VIEW);
            // return true;
        }
        else {
            return false;
        }
    }


    const submitNow = async () => {
        try {
            console.log("reviewStatus (latest):", reviewStatusRef.current);
            switch (reviewStatusRef.current) {
                case C.SL.PENDING:
                    return await form();
                case C.SL.REVIEWED:
                    switch (editModeRef.current) {
                        case true:
                            return await form();
                        case false:
                            return true;
                    }
                    break;
                default:
                    return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
    useEffect(() => {
        formFunction();
    }, [formRef]);



    useEffect(() => {
        console.log(formRef.current?.values);
    }, [formRef.current])


    //Important Attaching to Context 
    let obj = { changeInForm: anyChangesMade, refNo: data.uniqueId, editMode: editMode, getData: () => { return formRef } }
    const [formId, setFormId] = useState('land_documents'); // true || false
    const { registerForm, unregisterForm } = useContext(FormContext);
    registerForm(formId, obj);
    useEffect(() => {
        if (formRef.current) {
            registerForm(formId, obj);
        }
        // return () => unregisterForm(formId);
    }, [formRef, formId, registerForm, unregisterForm, obj]);

    const hChangeInForm = async () => {
        // await formRef.current.submitForm();
        console.log("land document da action registered");
        registerForm(formId, obj);
    }

    useEffect(() => {
        registerForm(formId, obj);
    }, [appId]);

    useEffect(() => {
        registerForm(formId, obj);
    }, [formRef]);
    // End

    useEffect(() => {
        hChangeInForm();
    }, [appId]);

    const onEdit = () => {
        setReviewStatus(C.SL.PENDING);
        setAnyChangesMade(true);
    }



    const { handleSubmit, handleChange, values, errors, touched, } = useContext(FormContext);


    return (
        <>
            <Row style={{
                // backgroundColor: "rgb(245, 245, 245)", 
                borderRadius: 6,
            }} >
                <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
                    <table width="100%" border={1} style={{ borderCollapse: "collapse", color: 'black' }} align="center" cellPadding="5px" >
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    Land Documents (Latest)
                                    {data?.old_land_documents?.length > 0 && (<Button variant="warning" size="sm">View Trail</Button>)}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {console.log(data?.init_land_documents)}
                                <td style={{ border: "1px solid black" }}>
                                    <table
                                        width="100%"
                                        border={1}
                                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                                        align="center"
                                        cellPadding="5px"
                                    >
                                        <thead>
                                            <tr>
                                                <th style={{ border: "1px solid black", width: "30%" }}>Document Language</th>
                                                <th style={{ border: "1px solid black" }}>Upload Original Document of Land</th>
                                                <th style={{ border: "1px solid black" }}>Upload Hindi/English Notarised Copy of Document</th>
                                                <th style={{ border: "1px solid black" }}>uploaded Date</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.init_land_documents?.map((item, index) => {
                                                console.log(item);
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ border: "1px solid black" }}>{item.language}</td>
                                                        <td style={{ border: "1px solid black" }}>
                                                            <Button className="btn-w-lg" variant="info" size="sm" onClick={() => viewFile(item.document)}>View File</Button>
                                                        </td>
                                                        <td style={{ border: "1px solid black" }}>
                                                            {item.notarised_document ? (<Button className="btn-w-lg" variant="info" size="sm" onClick={() => viewFile(item.notarised_document)}>View File</Button>) : 'Not Required'}

                                                        </td>
                                                        <td style={{ border: "1px solid black" }}>{formatedDate(item.uploaded_datetime)}</td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Col>

                <Col xl={6} lg={6} md={6} sm={6}>
                    <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
                        <Card.Header>
                            <label
                                className="main-content-label my-auto"
                                style={{ textTransform: "none" }}
                            >
                                Review Form
                            </label>
                            <div className="ms-auto d-flex">
                                <Button
                                    size="sm"
                                    type="button"
                                    className="rounded-pill btn-wave btn-outline-dark"
                                    variant="btn-outline-dark"
                                >
                                    Review Instructions
                                </Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Form ref={formRef} onSubmit={handleSubmit} validated>
                                <Row className="mb-3">
                                    <Form.Group>
                                        <Form.Label>
                                            Whether the land documents of the applicant are as per norms?
                                            <span style={{ color: "red" }}>*</span>
                                        </Form.Label>
                                        <div>
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Yes"
                                                name="as_per_norms"
                                                value="yes"
                                                onChange={handleChange}
                                                checked={values.as_per_norms === "yes"}
                                                isInvalid={
                                                    touched.as_per_norms &&
                                                    !!errors.as_per_norms
                                                }
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="No"
                                                name="as_per_norms"
                                                value="no"
                                                onChange={handleChange}
                                                checked={values.as_per_norms === "no"}
                                                isInvalid={
                                                    touched.as_per_norms &&
                                                    !!errors.as_per_norms
                                                }
                                            />
                                        </div>

                                        <Form.Control.Feedback type="invalid">
                                            {errors.category}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                {values.as_per_norms === "no" && (
                                    <Row className="mb-3">
                                        <Form.Group
                                            as={Col}
                                            md="12"
                                            controlId="validationCustom02"
                                        >
                                            <Form.Label>
                                                Select the Reason(s) and Raise
                                                Non-Conformities (NC)
                                                <span style={{ color: "red" }}>*</span>
                                            </Form.Label>
                                            <Field
                                                required
                                                name="reason"
                                                as="select"
                                                className="form-control"
                                            >
                                                <option value="">Select</option>
                                                {MaxData.map((lang, i) => {
                                                    return (
                                                        <option key={i} value={lang.value}>
                                                            {lang.label}
                                                        </option>
                                                    );
                                                })}
                                            </Field>
                                            <Form.Control.Feedback>
                                                Looks good!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        {values.reason == "other" && (<Form.Group
                                            required
                                            as={Col}
                                            md="12"
                                            controlId="text-area"
                                            style={{ marginTop: "1rem" }}
                                        >
                                            <Form.Label>
                                                Any other reason, please specify{" "}
                                                <span style={{ color: "red" }}>*</span>
                                            </Form.Label>
                                            <Form.Control
                                                name="assessor_comments"
                                                required
                                                as="textarea"
                                                rows={3}
                                                className={`form-control ${touched.assessor_comments &&
                                                    errors.assessor_comments
                                                    ? "is-invalid"
                                                    : ""
                                                    }`}
                                                value={values.assessor_comments}
                                                onChange={handleChange}
                                                isInvalid={
                                                    touched.assessor_comments &&
                                                    !!errors.assessor_comments
                                                }
                                            />
                                            {touched.assessor_comments &&
                                                errors.assessor_comments && (
                                                    <div className="invalid-feedback">
                                                        {errors.assessor_comments}
                                                    </div>
                                                )}
                                        </Form.Group>)}

                                    </Row>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                {false && (<Col xl={6} lg={6} md={6} sm={6}>
                    <div className="form-container">
                        {console.log(data)}
                        {/* data?.da_status == C.SL.PENDING */}
                        {true === true ? (
                            <Formik
                                innerRef={formRef}
                                enableReinitialize
                                initialValues={st1_da_landdocuments.intiValues}
                                validationSchema={st1_da_landdocuments.valSchema}

                                validateOnChange={true}
                                validateOnBlur={true}
                                validateOnMount={true}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    values,
                                    errors,
                                    touched,
                                }) => {
                                    setAnyChangesMade(true)

                                    { console.log(errors) }

                                    useEffect(() => {
                                        console.log("Registered Again", formId);
                                        hChangeInForm();
                                    }, [values, formId, registerForm]);


                                    useEffect(() => {
                                        setInitValue(values);
                                    }, [values]); // triggers whenever `values` changes

                                    return (
                                        <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
                                            <Card.Header>
                                                <label
                                                    className="main-content-label my-auto"
                                                    style={{ textTransform: "none" }}
                                                >
                                                    Review Form
                                                </label>
                                                <div className="ms-auto d-flex">
                                                    <Button
                                                        size="sm"
                                                        type="button"
                                                        className="rounded-pill btn-wave btn-outline-dark"
                                                        variant="btn-outline-dark"
                                                    >
                                                        Review Instructions
                                                    </Button>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form ref={formRef} onSubmit={handleSubmit} validated>
                                                    <Row className="mb-3">
                                                        <Form.Group>
                                                            <Form.Label>
                                                                Whether the land documents of the applicant are as per norms?
                                                                <span style={{ color: "red" }}>*</span>
                                                            </Form.Label>
                                                            <div>
                                                                <Form.Check
                                                                    inline
                                                                    type="radio"
                                                                    label="Yes"
                                                                    name="as_per_norms"
                                                                    value="yes"
                                                                    onChange={handleChange}
                                                                    checked={values.as_per_norms === "yes"}
                                                                    isInvalid={
                                                                        touched.as_per_norms &&
                                                                        !!errors.as_per_norms
                                                                    }
                                                                />
                                                                <Form.Check
                                                                    inline
                                                                    type="radio"
                                                                    label="No"
                                                                    name="as_per_norms"
                                                                    value="no"
                                                                    onChange={handleChange}
                                                                    checked={values.as_per_norms === "no"}
                                                                    isInvalid={
                                                                        touched.as_per_norms &&
                                                                        !!errors.as_per_norms
                                                                    }
                                                                />
                                                            </div>

                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.category}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    {values.as_per_norms === "no" && (
                                                        <Row className="mb-3">
                                                            <Form.Group
                                                                as={Col}
                                                                md="12"
                                                                controlId="validationCustom02"
                                                            >
                                                                <Form.Label>
                                                                    Select the Reason(s) and Raise
                                                                    Non-Conformities (NC)
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Form.Label>
                                                                <Field
                                                                    required
                                                                    name="reason"
                                                                    as="select"
                                                                    className="form-control"
                                                                >
                                                                    <option value="">Select</option>
                                                                    {MaxData.map((lang, i) => {
                                                                        return (
                                                                            <option key={i} value={lang.value}>
                                                                                {lang.label}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </Field>
                                                                <Form.Control.Feedback>
                                                                    Looks good!
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                            {values.reason == "other" && (<Form.Group
                                                                required
                                                                as={Col}
                                                                md="12"
                                                                controlId="text-area"
                                                                style={{ marginTop: "1rem" }}
                                                            >
                                                                <Form.Label>
                                                                    Any other reason, please specify{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Form.Label>
                                                                <Form.Control
                                                                    name="assessor_comments"
                                                                    required
                                                                    as="textarea"
                                                                    rows={3}
                                                                    className={`form-control ${touched.assessor_comments &&
                                                                        errors.assessor_comments
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                    value={values.assessor_comments}
                                                                    onChange={handleChange}
                                                                    isInvalid={
                                                                        touched.assessor_comments &&
                                                                        !!errors.assessor_comments
                                                                    }
                                                                />
                                                                {touched.assessor_comments &&
                                                                    errors.assessor_comments && (
                                                                        <div className="invalid-feedback">
                                                                            {errors.assessor_comments}
                                                                        </div>
                                                                    )}
                                                            </Form.Group>)}

                                                        </Row>
                                                    )}
                                                </Form>
                                            </Card.Body>
                                            {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-end">
                        <Button variant="info" onClick={() => { subForm() }}>
                          Submit
                        </Button>
                      </Card.Footer> */}
                                        </Card>)
                                }}
                            </Formik>
                        ) : data?.da_status == C.SL.REVIEWED ? (
                            <>
                                <Card
                                    className="border border-2 card custom-card shadow-size-small  card"
                                    style={
                                        data?.Verificiation?.as_per_norms == "yes" || data?.Verificiation?.as_per_norms == "yes"
                                            ? { backgroundColor: "#d6f3e0" }
                                            : { backgroundColor: "#f3d6d6" }
                                    }
                                >
                                    <Card.Header>
                                        <label
                                            className="main-content-label my-auto"
                                            style={{ textTransform: "none" }}
                                        >
                                            Assessor Comments
                                        </label>
                                        <div className="ms-auto  d-flex">
                                            {remarkInfo?.updateDate}
                                        </div>
                                    </Card.Header>
                                    <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                                        <Row className="mb-3">
                                            <Col md={12}>
                                                <b>Whether land documents is as per norms?:</b>{" "}
                                                <span style={{ textTransform: "capitalize" }}> {initValue?.as_per_norms} </span>
                                            </Col>
                                            {initValue?.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {initValue?.reason} </span> </Col>)}
                                            {initValue?.as_per_norms == "no" && initValue?.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{initValue?.assessor_comments}</p> </Col>)}
                                        </Row>
                                    </Card.Body>
                                    {isView == false && (
                                        <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                                            <Button variant="primary" onClick={() => { onEdit() }}>
                                                Edit
                                            </Button>
                                        </Card.Footer>
                                    )}
                                </Card>
                            </>
                        ) : data?.da_status === C.SL.REPLIED ? (
                            <Card
                                className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
                                style={
                                    data?.Verificiation?.as_per_norms == "yes"
                                        ? { backgroundColor: "#d6f3e0" }
                                        : { backgroundColor: "#f3d6d6" }
                                }
                            >
                                <Card.Header>
                                    <label
                                        className="main-content-label my-auto"
                                        style={{ textTransform: "none" }}
                                    >
                                        Assessor Comments
                                    </label>
                                    <div className="ms-auto  d-flex">
                                        25th April 2025:10:20PM
                                    </div>
                                </Card.Header>
                                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                                    <Row className="mb-3">
                                        <Col md={12}> <b>Whether the Land Area of the applicant institute is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {data?.Verificiation?.as_per_norms} </span> </Col>
                                        {data?.Verificiation?.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {data?.Verificiation?.reason} </span> </Col>)}
                                        {data?.Verificiation?.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{data?.Verificiation?.assessor_comments}</p> </Col>)}
                                    </Row>
                                </Card.Body>
                                {/* aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR && */}
                                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                                    <Button variant="primary" onClick={() => { setFormSubmited(false); setEditMode(true), setAnyChangesMade(true) }}>
                                        Edit
                                    </Button>
                                </Card.Footer>)}

                            </Card>
                        ) : (
                            <h1>No Data</h1>
                        )}
                    </div>
                </Col>)}
            </Row>
        </>
    );
};

// // Land Area
export const LandArea = ({ data, step, view: viewProp = false, isView = false }) => {


    const formRef = useRef();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");

    const [view, setView] = useState(viewProp);
    const MaxData = [
        { value: "Document is not legible", label: "Document is not legible" },
        { value: "Document is irrelevant", label: "Document is irrelevant" },
        {
            value: "Document lacks required information",
            label: "Document lacks required information",
        },
        {
            value:
                "Document is not approved by the competent authority in the State/ UT",
            label:
                "Document is not approved by the competent authority in the State/ UT",
        },
        {
            value:
                "Address on the document does not match with the proposed land/ building address",
            label:
                "Address on the document does not match with the proposed land/ building address",
        },
        {
            value:
                "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
            label:
                "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
        },
        {
            value: "other",
            label: "other",
        },
    ];

    const { Formik } = formik;
    const formRef2 = useRef();

    // @dpkdhariwal
    const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
    const [editMode, setEditMode] = useState(false); // true || false
    const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
    const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
    // End

    const [showXlModal, setShowXlModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
    const [aStatus, setAStatus] = useState({});



    const register = useFunctionRegistry();
    const [formData, setFormData] = useState({});
    const [formSubmited, setFormSubmited] = useState(false);



    const loadInfo = async () => {
        let result, assessment_status, resp;
        // let result = await set.get_da_status_land_area(appId);

        resp = await st.get_da_status_land_area(appId);
        result = resp.data;

        // let assessment_status = await set.getAssessmentProgressStatus(appId);
        resp = await st.getAssessmentProgressStatus(appId);
        assessment_status = resp.data;
        setAStatus(assessment_status);

        const lastObj = result[result.length - 1];
        console.log(lastObj);
        if (lastObj) {
            // setInitValue(lastObj);
            setFormData(lastObj);
            setFormSubmited(true);
            setReviewStatus(C.SL.REVIEWED);
            setViewType(C.SL.VIEW);
        }
    }


    useEffect(() => { loadInfo(); }, [appId]);


    // const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.LAND_AREA}`, () => { return { formRefRef } }); }

    // useEffect(() => {
    //   formFunction();
    // }, [formRef]);


    const reviewStatusRef = useRef(reviewStatus);
    useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);

    const editModeRef = useRef(editMode);
    useEffect(() => { editModeRef.current = editMode; }, [editMode]);



    const formRefRef = useRef(formRef);
    useEffect(() => { formRefRef.current = formRef.current; }, [formRefRef]);

    const form = async () => {
        if (formRef.current.isValid) {
            // await set.set_da_status_land_area(appId, formRef.current.values);
            try {
                await st.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.DA1_KEYS.LAND_AREA);

                setAnyChangesMade(false);
                setEditMode(false);
                setReviewStatus(C.SL.REVIEWED);
                setViewType(C.SL.VIEW);
                return true;
            } catch (error) {
                console.error(error);
            }
        }
        else {
            return false;
        }
    }

    // const submitNow = async () => {
    //   try {
    //     console.log("reviewStatus (latest):", reviewStatusRef.current);
    //     switch (reviewStatusRef.current) {
    //       case C.SL.PENDING:
    //         return await form();
    //       case C.SL.REVIEWED:
    //         switch (editModeRef.current) {
    //           case true:
    //             return await form();
    //           case false:
    //             return true;
    //         }
    //         break;
    //       default:
    //         return false;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
    // }

    // const subForm = async () => {
    //   try {
    //     console.log(formRef.current.values);
    //     // Check if form is valid
    //     if (formRef.current.isValid === true) {
    //       // Ask for confirmation
    //       const confirmResult = await Swal.fire({
    //         title: "Are you sure?",
    //         text: "Do you want to proceed?",
    //         icon: "question",
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, proceed",
    //         cancelButtonText: "Cancel",
    //       });

    //       if (!confirmResult.isConfirmed) {
    //         // User canceled
    //         return false;
    //       }

    //       // Show loading
    //       Swal.fire({
    //         title: "Loading...",
    //         text: "Please wait while we fetch the data.",
    //         allowOutsideClick: false,
    //         didOpen: () => {
    //           Swal.showLoading();
    //         },
    //       });

    //       await st.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.DA1_KEYS.LAND_AREA);

    //       setAnyChangesMade(false);
    //       setEditMode(false);
    //       setReviewStatus(C.SL.REVIEWED);
    //       setViewType(C.SL.VIEW);
    //       Swal.close();
    //       return true;
    //     }
    //   } catch (error) {
    //     Swal.close();
    //     console.error("Error fetching entity details:", error);
    //     Swal.fire("Error", error.message || "Failed to fetch data.", "error");
    //     return false;
    //   }
    // };


    //Important Attaching to Context 
    console.log(data);
    let obj = { changeInForm: anyChangesMade, refNo: data.uniqueId, editMode: editMode, getData: () => { return formRef } }
    const [formId, setFormId] = useState('land_area'); // true || false
    const { registerForm, unregisterForm } = useContext(FormContext);
    registerForm(formId, obj); //TEST

    useEffect(() => {
        if (formRef.current) {
            registerForm(formId, obj);
        }
        // return () => unregisterForm(formId);
    }, [formRef, formId, registerForm, unregisterForm]);
    const hChangeInForm = async () => {
        //await formRef.current.submitForm();
        console.log("hChangeInForm", formId);
        registerForm(formId, obj);
    }
    useEffect(() => {
        hChangeInForm();
    }, [appId]);


    // 
    const [remarkInfo, setRemarkInfo] = useState({});

    useEffect(() => {
        const verificiation = data.Verificiation || {}
        const { as_per_norms, reason, assessor_comments } = verificiation;
        setInitValue({ as_per_norms, reason, assessor_comments });
        setRemarkInfo(data.Verificiation);
    }, [data])

    return (
        <>
            <Row
                style={{
                    // backgroundColor: "rgb(245, 245, 245)",
                    // margin: "10px 0px 0px",
                    borderRadius: 6,
                }}
            >
                <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
                    <table
                        width="100%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                    >
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    Land Area (Latest)
                                    {data?.old_land_area.length > 0 && (<Button variant="warning" size="sm">View Trail</Button>)}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: "1px solid black" }}>
                                    {console.log(data)}
                                    --</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
                {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
                    <div className="form-container">
                        {formSubmited == false ? (
                            <Formik
                                innerRef={formRef}
                                enableReinitialize
                                initialValues={st1_da_landdocuments.intiValues}
                                validationSchema={st1_da_landdocuments.valSchema}
                                validateOnChange={true}
                                validateOnBlur={true}
                                validateOnMount={true}               >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    submitForm,
                                    values,
                                    errors,
                                    touched,
                                }) => {
                                    setAnyChangesMade(true)
                                    useEffect(() => {
                                        console.log("Registered Again", formId);
                                        hChangeInForm();
                                    }, [values, formId, registerForm]);
                                    return (
                                        <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
                                            <Card.Header>
                                                <label
                                                    className="main-content-label my-auto"
                                                    style={{ textTransform: "none" }}
                                                >
                                                    Review Form
                                                </label>
                                                <div className="ms-auto d-flex">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleShowModal("xl")}
                                                        type="button"
                                                        className="rounded-pill btn-wave btn-outline-dark"
                                                        variant="btn-outline-dark"
                                                    >
                                                        Review Instructions
                                                    </Button>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form ref={formRef2} onSubmit={handleSubmit} validated>
                                                    <Row className="mb-3">
                                                        <Form.Group>
                                                            <Form.Label>
                                                                Whether the Land Area of the applicant institute is as per norms?
                                                                <span style={{ color: "red" }}>*</span>
                                                            </Form.Label>
                                                            <div>
                                                                <Form.Check
                                                                    inline
                                                                    type="radio"
                                                                    label="Yes"
                                                                    name="as_per_norms"
                                                                    value="yes"
                                                                    onChange={handleChange}
                                                                    checked={values.as_per_norms === "yes"}
                                                                    isInvalid={
                                                                        touched.as_per_norms &&
                                                                        !!errors.as_per_norms
                                                                    }
                                                                />
                                                                <Form.Check
                                                                    inline
                                                                    type="radio"
                                                                    label="No"
                                                                    name="as_per_norms"
                                                                    value="no"
                                                                    onChange={handleChange}
                                                                    checked={values.as_per_norms === "no"}
                                                                    isInvalid={
                                                                        touched.as_per_norms &&
                                                                        !!errors.as_per_norms
                                                                    }
                                                                />
                                                            </div>

                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.category}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Row>
                                                    {values.as_per_norms === "no" && (
                                                        <Row className="mb-3">
                                                            <Form.Group
                                                                as={Col}
                                                                md="12"
                                                                controlId="validationCustom02"
                                                            >
                                                                <Form.Label>
                                                                    Select the Reason(s) and Raise
                                                                    Non-Conformities (NC)
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Form.Label>
                                                                <Field
                                                                    required
                                                                    name="reason"
                                                                    as="select"
                                                                    className="form-control"
                                                                >
                                                                    <option value="">Select</option>
                                                                    {MaxData.map((lang, i) => {
                                                                        return (
                                                                            <option key={i} value={lang.value}>
                                                                                {lang.label}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </Field>
                                                                <Form.Control.Feedback>
                                                                    Looks good!
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                            {values.reason == "other" && (<Form.Group
                                                                required
                                                                as={Col}
                                                                md="12"
                                                                controlId="text-area"
                                                                style={{ marginTop: "1rem" }}
                                                            >
                                                                <Form.Label>
                                                                    Any other reason, please specify{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Form.Label>
                                                                <Form.Control
                                                                    name="assessor_comments"
                                                                    required
                                                                    as="textarea"
                                                                    rows={3}
                                                                    className={`form-control ${touched.assessor_comments &&
                                                                        errors.assessor_comments
                                                                        ? "is-invalid"
                                                                        : ""
                                                                        }`}
                                                                    value={values.assessor_comments}
                                                                    onChange={handleChange}
                                                                    isInvalid={
                                                                        touched.assessor_comments &&
                                                                        !!errors.assessor_comments
                                                                    }
                                                                />
                                                                {touched.assessor_comments &&
                                                                    errors.assessor_comments && (
                                                                        <div className="invalid-feedback">
                                                                            {errors.assessor_comments}
                                                                        </div>
                                                                    )}
                                                            </Form.Group>)}

                                                        </Row>
                                                    )}

                                                </Form>
                                            </Card.Body>
                                            {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                        <Button variant="primary" onClick={subForm}>
                          Submit
                        </Button>
                      </Card.Footer> */}
                                        </Card>
                                    )
                                }}
                            </Formik>
                        ) : formSubmited == true ? (
                            <Card
                                className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
                                style={
                                    formData.as_per_norms == "yes"
                                        ? { backgroundColor: "#d6f3e0" }
                                        : { backgroundColor: "#f3d6d6" }
                                }
                            >
                                <Card.Header>
                                    <label
                                        className="main-content-label my-auto"
                                        style={{ textTransform: "none" }}
                                    >
                                        Assessor Comments
                                    </label>
                                    <div className="ms-auto  d-flex">
                                        25th April 2025:10:20PM
                                    </div>
                                </Card.Header>
                                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                                    <Row className="mb-3">
                                        <Col md={12}> <b>Whether the Land Area of the applicant institute is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                                        {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                                        {formData.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                                    </Row>
                                </Card.Body>
                                {/* aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR && */}
                                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                                    <Button variant="primary" onClick={() => { setFormSubmited(false); setEditMode(true), setAnyChangesMade(true) }}>
                                        Edit
                                    </Button>
                                </Card.Footer>)}

                            </Card>
                        ) : (
                            <h1>No Data</h1>
                        )}
                    </div>
                </Col>)}
            </Row>
        </>
    );
};







