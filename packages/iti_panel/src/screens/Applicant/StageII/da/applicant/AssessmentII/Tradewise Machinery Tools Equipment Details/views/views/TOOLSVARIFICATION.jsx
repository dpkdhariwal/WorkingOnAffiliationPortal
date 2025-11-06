import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion, Spinner } from "react-bootstrap";
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
import * as ap from "@/services/applicant/index"

export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

import { st1_da_landdocuments } from "affserver";
import { ContextMap } from "@/components/formik/contexts";
import { Navigations } from "@/components/Assessment/components";

// import { FormContext } from "@/screens/state/assessor/AssessmentII/Tradewise Machinery Tools Equipment Details/TradewiseMachineryToolsEquipment";
import { formatedDate, formatLabel, viewFile } from "@/helpers";

export const Comp = ({ step, title, info, index }) => {
    { console.log(info) }
    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => { if (divRef.current) { setHeight(divRef.current.clientHeight); } }, []);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");

    const start_from = 0;
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10); // you can make this dynamic if needed
    const [totalRows, setTotalRows] = useState(0);

    const [modalShow, setModalShow] = useState(false);


    // const [initialValues, setInitialValues] = useState(C.st2.MachineryToolEquipment.initialValue);
    // const [stepInfo, setStepInfo] = useState(step);
    const formikRef = useRef();

    const onNext = async () => {
        console.log("Called Next", formikRef);
        try {
            const { values, errors } = formikRef.current;

            await formikRef.current.submitForm();
            await formikRef.current.validateForm();


            const { isValid } = formikRef.current;
            console.log(errors, isValid);

            if (!isValid) {
                throw new Error("Form validation failed: form is not valid.");
            }

            // Ask confirmation first
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to save the form data?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, save it!",
                cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) {
                console.log("User cancelled save");
                return;
            }

            // Show loading while saving
            Swal.fire({
                title: "Saving...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });


            // Perform save
            // console.log(step.tradeId);
            await ap.saveMachineToolEquipmentQty(values, appId, step.tradeId, { page, limit: pageSize, isLast: page === totalPages });

            // Close loading
            Swal.close();

            // Move to next step
            await Next();

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "warning",
                title: "Fill the form",
                text: error.message || "",
                showConfirmButton: true,
                confirmButtonText: "OK",
                allowOutsideClick: false
            });
        }
    };


    const loadData = async () => {
        try {
            console.log(info);
            const { tradeId } = info
            const resp = await ap.getTradeWideMachineryToolEquipments(appId, tradeId, { page, limit: pageSize });
            const data = resp.data;
            const updated_mte = data.mte.map(item => {
                if (item.tradeId === tradeId) {
                    return {
                        ...item, toolList: resp.data.mte,
                    };
                }
                return item; // unchanged ones
            });


            console.log(updated_mte);

            // Returning only single obj array
            // values.mte = updateList;
            // console.log(values.mte = updateList);
            // console.log({ itLab: itLab, mte: updated_mte }, values);
            // setFieldValue('mte', updated_mte)
            console.log(data);
            // await formikRef.current.resetForm({ values: data });
            // setInitialValues(data);
            setTotalRows(data.totalRecords);
            // setStart_from(data.start_from);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // useEffect(() => {
    //     loadData(page);
    // }, [page, appId]);

    const totalPages = Math.ceil(totalRows / pageSize);

    const Previous = () => {
        if (page !== 1) {
            setPage((p) => p - 1)
        }
    }
    const Next = async () => {
        if (page !== totalPages) {
            setPage((p) => p + 1)
        }
    }
    const [refreshKey, setRefreshKey] = useState(0);

    const openVerificationWindow = () => {
        setRefreshKey(prev => prev + 1);

        console.log("Called");
        setModalShow(true)
    }


    return (
        <>
            <div className="border border-primary d-flex justify-content-between" style={{ padding: 12, backgroundColor: "antiquewhite", borderRadius: 10, marginTop: "10px" }}>
                <h5>{info.stepTitle}</h5>
                <div className="border border-primary d-flex justify-content-between gap-3">
                    {/* {console.log(info.review_counts.pending)} */}
                    <div className="border-primary d-flex gap-3 justify-content-between"
  style={{ alignContent: "center", alignItems: "center", padding: 7 }}>
                        Total: {info?.review_counts?.total} | Reviewed: {info?.review_counts?.reviewed} | Review Pending: {info?.review_counts?.pending}
                    </div>
                    <Button onClick={() => openVerificationWindow()} className="btn btn-primary">
                        Verifications
                    </Button>
                </div>
            </div>

            <SelectCategoryModal step={step} key={refreshKey} info={info} show={modalShow} onHide={() => setModalShow(false)} />

        </>
    );
};
export default Comp;
const SelectCategoryModal = (props) => {

    const formR = useRef({});
    const formsRef = useRef({});
    const divRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (divRef.current) {
            setHeight(divRef.current.clientHeight); // or offsetHeight / scrollHeight
        }
    }, []);

    const handleClose = () => {
        props.onHide(); // hides the modal
    };

    const handleProccessing = async (value) => {
        if (formR.current) {
            const inputs = formR.current.querySelectorAll("input, select, textarea, button");
            inputs.forEach((el) => (el.disabled = value));
        }
    };


    // runs once on mount
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");

    const start_from = 0;
    const [page, setPage] = useState(1);
    const [pageSize] = useState(100); // you can make this dynamic if needed
    const [totalRows, setTotalRows] = useState(0);

    const [tools, setTools] = useState([]);

    const [index, setIndex] = useState(0);
    const [modalShow, setModalShow] = useState(false);

    const [initialValues, setInitialValues] = useState(C.st2Asmt.ItlabTradewiseToolEquipments.MteIntiValues);
    // const [stepInfo, setStepInfo] = useState(step);

    // const formikRef = useRef();

    const onNext = async () => {
        console.log("Called Next", formikRef);
        try {
            const { values, errors } = formikRef.current;

            await formikRef.current.submitForm();
            await formikRef.current.validateForm();


            const { isValid } = formikRef.current;
            console.log(errors, isValid);

            if (!isValid) {
                throw new Error("Form validation failed: form is not valid.");
            }

            // Ask confirmation first
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to save the form data?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, save it!",
                cancelButtonText: "Cancel",
            });

            if (!result.isConfirmed) {
                console.log("User cancelled save");
                return;
            }

            // Show loading while saving
            Swal.fire({
                title: "Saving...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });


            // Perform save
            // console.log(step.tradeId);
            await ap.saveMachineToolEquipmentQty(values, appId, step.tradeId, { page, limit: pageSize, isLast: page === totalPages });

            // Close loading
            Swal.close();

            // Move to next step
            await Next();

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "warning",
                title: "Fill the form",
                text: error.message || "",
                showConfirmButton: true,
                confirmButtonText: "OK",
                allowOutsideClick: false
            });
        }
    };
    // const loadData = async () => {
    //     try {
    //         console.log(props.info);
    //         const { tradeId } = props.info
    //         const resp = await ap.getTradeWideMachineryToolEquipments(appId, tradeId, { page, limit: pageSize });
    //         const data = resp.data;
    //         const { mte } = data;

    //         const updated = { ...initialValues, toolList: mte };
    //         setInitialValues(updated);
    //         setTools(mte);
    //         setTotalRows(data.totalRecords);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const loadData = async () => {
        try {
            Swal.fire({
                title: "Loading...",
                text: "Fetching machinery, tools and equipment details",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const { tradeId } = props.info;
            const resp = await ap.getTradeWideMachineryToolEquipments(appId, tradeId, {
                page,
                limit: pageSize,
            });

            const data = resp.data;
            const { mte } = data;

            const updated = { ...initialValues, toolList: mte };
            setInitialValues(updated);
            setTools(mte);
            setTotalRows(data.totalRecords);

            Swal.close(); // ✅ close the loader when done
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch data. Please try again.",
            });
            console.error(error);
        }
    };

    useEffect(() => { loadData(); }, []);
    useEffect(() => {
        loadData(page);
    }, [page, appId]);

    const totalPages = Math.ceil(totalRows / pageSize);
    const Previous = () => { if (page !== 1) { setPage((p) => p - 1) } }
    const Next = async () => { if (page !== totalPages) { setPage((p) => p + 1) } }

    const [refreshKey, setRefreshKey] = useState(0);

    const openVerificationWindow = () => { setRefreshKey(prev => prev + 1); setModalShow(true) }


    const submit = async () => {
        // console.log("dfdfaf");
        // await formsRef.current.submitForm();
        // console.log(formsRef.current.isValid, formsRef.current.values);
        console.log("Called Submit", formsRef);
        try {
            const { values, errors } = formsRef.current;

            await formsRef.current.submitForm();
            await formsRef.current.validateForm();


            const { isValid } = formsRef.current;
            console.log(errors, isValid);

            if (!isValid) {
                throw new Error("Form validation failed: form is not valid.");
            }
            // handleClose();
            setProcessing(true);
            await handleProccessing(true);

            // Ask confirmation first
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to save the form data?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, save it!",
                cancelButtonText: "Cancel",
                allowOutsideClick: false,
                didOpen: () => {
                    const swalContainer = Swal.getContainer();
                    const swalPopup = Swal.getPopup();

                    if (swalContainer) swalContainer.style.zIndex = "10000"; // overlay
                    if (swalPopup) swalPopup.style.zIndex = "10001";        // popup
                },
            });


            if (!result.isConfirmed) {
                console.log("User cancelled save");
                return;
            }

            // Show loading while saving
            Swal.fire({
                title: "Saving...",
                allowOutsideClick: false,
                didOpen: () => {
                    const swalContainer = Swal.getContainer();
                    const swalPopup = Swal.getPopup();
                    if (swalContainer) swalContainer.style.zIndex = "10000"; // overlay
                    if (swalPopup) swalPopup.style.zIndex = "10001";        // popup
                    Swal.showLoading();
                }
            });

            await ap.saveRemarksOnTradeWideMachineryToolEquipments(values, appId, props.step, { page, limit: pageSize, isLast: page === totalPages });
            Swal.close();


            // ✅ User confirmed, now show success alert
            Swal.fire({
                icon: "success",
                title: "Saved Successfully!",
                text: "Your form data has been saved.",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                didOpen: () => {
                    const swalContainer = Swal.getContainer();
                    const swalPopup = Swal.getPopup();
                    if (swalContainer) swalContainer.style.zIndex = "10000";
                    if (swalPopup) swalPopup.style.zIndex = "10001";
                },
            }).then(async (next) => { // ← mark this async
                if (next.isConfirmed) {
                    setProcessing(false);
                    await handleProccessing(false);
                    Next();
                }
            });



        } catch (error) {
            console.log(error);
            setProcessing(false);
            await handleProccessing(false);
            Swal.fire({
                icon: "warning",
                title: "Fill the form",
                text: error.message || "",
                showConfirmButton: true,
                confirmButtonText: "OK",
                allowOutsideClick: false,
                didOpen: () => {
                    const swalContainer = Swal.getContainer();
                    const swalPopup = Swal.getPopup();
                    if (swalContainer) swalContainer.style.zIndex = "10000"; // overlay
                    if (swalPopup) swalPopup.style.zIndex = "10001";        // popup
                }
            });
        }
    }
    return (
        <Modal {...props} size="xl" fullscreen centered>
            <Modal.Header closeButton>
                <Modal.Title as="h6">
                    {props?.info?.tradeInfo?.trade_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-2">
                <Formik innerRef={formsRef}
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={C.st2Asmt.ItlabTradewiseToolEquipments.MteValSchema}
                    onSubmit={(values) => { console.log(values); }} >
                    {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => {
                        console.log(errors);
                        return (
                            <Form onSubmit={handleSubmit} validated>
                                <div ref={formR}>
                                    <div className="custom-card border border-primary table-responsive" style={{ padding: "0px" }}>
                                        {/* text-nowrap */}
                                        <Table className="card-table table-vcenter  mb-0 border dashboard-table">
                                            <thead>
                                                <tr>
                                                    <th>slno</th>
                                                    <th style={{ width: '10%' }}>as per norms?</th>
                                                    {/* <th>Trade Name</th> */}
                                                    <th>Item Name</th>
                                                    <th>Specification</th>
                                                    <th>Required Qty</th>
                                                    <th>Availability</th>
                                                    <th>Avaiable Qty</th>
                                                    <th>Qty Type</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {values?.toolList?.map((obj, index) => {
                                                    // { console.log(values, obj) }
                                                    return (
                                                        <tr key={index}>
                                                            <td>{obj.slno}</td>
                                                            <td>
                                                                <Form.Group>
                                                                    <div role="group" aria-labelledby="as_per_norms-group">
                                                                        <label className="me-3">
                                                                            <Field type="radio" name={`toolList.${index}.as_per_norms`} value="yes" className="form-check-input me-2" />
                                                                            Yes
                                                                        </label>
                                                                        <label>
                                                                            <Field
                                                                                type="radio"
                                                                                name={`toolList.${index}.as_per_norms`}
                                                                                value="no"
                                                                                className="form-check-input me-2"
                                                                            />
                                                                            No
                                                                        </label>
                                                                    </div>
                                                                    <ErrorMessage
                                                                        name={`toolList.${index}.as_per_norms`}
                                                                        component="div"
                                                                        className="invalid-feedback d-block"
                                                                    />
                                                                </Form.Group>
                                                            </td>
                                                            <td>{obj?.toolInfo?.Item_name}</td>
                                                            <td>{obj?.toolInfo?.Specification}</td>
                                                            <td>{obj?.required_quantity}</td>
                                                            <td>{obj?.toolInfo?.availability}</td>
                                                            <td>{obj?.available_quantity}</td>
                                                            <td>{obj?.toolInfo?.Qty_type}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>

                                    {false && (<Card className="border border-2 border-primary card custom-card  card" style={{ marginTop: "10px" }} >
                                        <Card.Header>
                                            <label className="main-content-label my-auto" style={{ textTransform: "none" }} > Review Form </label>
                                            <div className="ms-auto d-flex">
                                                <Button size="sm" type="button" className="rounded-pill btn-wave btn-outline-dark" variant="btn-outline-dark" > Review Instructions </Button>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className="mb-3">
                                                <Form.Group>
                                                    <Form.Label>
                                                        Whether the {`title`} of the applicant are as per norms?
                                                        <span style={{ color: "red" }}>*</span>
                                                    </Form.Label>

                                                    <div role="group" aria-labelledby="as_per_norms-group">
                                                        <label className="me-3">
                                                            <Field type="radio" name={`as_per_norms`} value="yes" className="form-check-input me-2" /> Yes
                                                        </label>

                                                        <label>
                                                            <Field type="radio" name={`as_per_norms`} value="no" className="form-check-input me-2" />
                                                            No
                                                        </label>
                                                    </div>
                                                    <ErrorMessage name={`as_per_norms`} component="div" className="invalid-feedback d-block" />
                                                </Form.Group>
                                            </Row>
                                            {values?.as_per_norms === "no" && (
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="12">
                                                        <Form.Label>
                                                            Select the Reason(s) and Raise Non-Conformities (NC)
                                                            <span style={{ color: "red" }}>*</span>
                                                        </Form.Label>
                                                        <Field name={`reason`} as="select" className="form-control">
                                                            <option value="">Select</option>
                                                            {C.reasons.map((lang, i) => {
                                                                return (
                                                                    <option key={i} value={lang.value}>
                                                                        {lang.label}
                                                                    </option>
                                                                );
                                                            })}
                                                        </Field>
                                                    </Form.Group>
                                                    {values.reason === "other" && (
                                                        <Form.Group as={Col} md="12" style={{ marginTop: "1rem" }}>
                                                            <Form.Label>
                                                                Any other reason, please specify <span style={{ color: "red" }}>*</span>
                                                            </Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows={3}
                                                                name={`assessor_comments`}
                                                                value={values.assessor_comments}
                                                                onChange={handleChange}
                                                                className={`form-control ${touched.assessor_comments && errors.assessor_comments ? "is-invalid" : ""}`}
                                                            />
                                                            {touched.assessor_comments &&
                                                                errors.assessor_comments && (
                                                                    <div className="invalid-feedback">
                                                                        {errors.assessor_comments}
                                                                    </div>
                                                                )}
                                                        </Form.Group>
                                                    )}
                                                </Row>
                                            )}
                                        </Card.Body>
                                    </Card>)}
                                </div>
                            </Form>
                        )
                    }}
                </Formik>

            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between mb-3">

                {page > 1 && (<Button disabled={processing} variant="info" onClick={() => { Previous() }}> Previous </Button>)}

                {/* <Button disabled={processing} variant="warning" onClick={() => { Next() }} > Next </Button> */}
                {page < totalPages && (<Button onClick={() => { submit() }} disabled={processing} variant="primary">
                    {processing === true && (<Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />)}
                    {processing === true ? (` Saving...`) : `Save & Next`}
                </Button>)}

                {false && (<div >
                    {/* <div className="d-flex align-items-start gap-2"> */}
                    {/* <Button disabled={processing} variant="info" onClick={() => { Previous() }}> Previous </Button>
                        <Button disabled={processing} variant="warning" onClick={() => { Next() }} > Next </Button> </div> */}
                    {/* <Button disabled={processing} variant="primary" onClick={() => { submit() }}> Save Now </Button> */}

                    {/* <Button onClick={() => { submit() }} disabled={processing} variant="primary">
                        {processing === true && (<Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />)}
                        {processing === true ? (` Saving...`) : `Save Now`}
                    </Button> */}
                </div>)}
            </Modal.Footer>
        </Modal>
    );
};