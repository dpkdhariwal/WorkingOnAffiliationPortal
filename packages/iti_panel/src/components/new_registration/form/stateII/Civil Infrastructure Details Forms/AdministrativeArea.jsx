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
import { it_library_to_be_filled, UPDATE_LIBRARY_DETAILS } from "../../../../../constants";

import { Form, Modal } from "react-bootstrap";

import * as yup from "yup";

import * as formik from "formik";
import React from "react";

import { Fragment, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as dbUser from "../../../../../db/users";
import * as cons from "../../../../../constants";
import { CIC } from "../../../../../constants";

export const AdministrativeArea = ({ steps, goPrevious, finish }) => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");
    const authUser = useSelector((state) => state.loginUserReducer);

    const dispatch = useDispatch();



    const [list, setList] = useState([]);

    const loadData = async () => {
        let adminisList = [];
        for (const [index, obj] of cons.ADMINISTRATIVE_AREA.entries()) {
            let result = await dbUser.getCommonAreaByParticular(appId, obj.particular);
            adminisList.push(result[0]);
        }
        setList(adminisList)
    }

    useEffect(() => {
        prepare_initialValues(list);
    }, [list]);

    const [currentStep, setCurrentStep] = useState({});

    const [iniValue, setIniValue] = useState({});
    const [validationSchema, setValidationSchema] = useState({});


    const prepare_initialValues = (list) => {
        console.log(list);
        const obj = {
            ...Object.fromEntries(
                list.map((item, index) => {
                    const { area } = getSetFieldsName(item);
                    return [`${area}`, ''];
                })
            ),
            ...Object.fromEntries(
                list.map((item, index) => {
                    const { photo } = getSetFieldsName(item);
                    return [`${photo}`, '']
                })
            ),
        };
        console.log(obj);
        setIniValue(obj);
        return obj;
    }

    const getSetFieldsName = (item) => {
        console.log(item);
        const area = `area>${item.particular}`;
        const photo = `photo>${item.particular}`;
        return { area, photo };
    }

    const Schema = () => {
        let obj = {
            ...Object.fromEntries(
                list.map((item, index) => {
                    const { area } = getSetFieldsName(item);
                    return [`${area}`, Yup.number().required("Enter Available Area").min(0, "Area must be positive"),];
                })
            ),
            ...Object.fromEntries(
                list.map((item, index) => {
                    const { photo } = getSetFieldsName(item);
                    return [`${photo}`, Yup.mixed().required("Select Geo Taged File")]
                })
            ),
        };
        console.log(obj);
        setValidationSchema(Yup.object(obj))
    }

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        console.log(iniValue);
        Schema();
    }, [iniValue])


    const prepareToSave = (values) => {
        console.log(values);
        // setTradewiseClassRooms(values, authUser, appId);
        // console.log(input);
        goNext(currentStep);
    };

    useEffect(() => {
        const currentStep = steps.subSteps.find(step => step.step === CIC.PLACEMENT_AND_COUNSELLING_ROOM);
        setCurrentStep(currentStep)
    }, [])



    return (
        <Formik
            enableReinitialize
            initialValues={iniValue}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                prepareToSave(values);
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
                                            <th>Particulars</th>
                                            <th>Required Area</th>
                                            <th>Available Area</th>
                                            <th>Upload Photo <ReqSign /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((item, index) => {
                                            console.log(item);
                                            let fields = getSetFieldsName(item);
                                            return (
                                                <tr key={index}>
                                                    <td>{item.particular}</td>
                                                    <td>{item.RequiredArea} {item.AreaUnit}</td>
                                                    <td>
                                                        <Field type="number" name={fields.area} as={BForm.Control} />
                                                        <div className="text-danger"><ErrorMessage name={fields.area} /></div>
                                                    </td>
                                                    <td>
                                                        <input type="file" name={fields.photo} className="form-control" onChange={(event) => { setFieldValue(fields.photo, event.currentTarget.files[0]); }} />
                                                        <div className="text-danger"><ErrorMessage name={fields.photo} component="div" className="text-danger" /> </div>
                                                    </td>
                                                </tr>
                                            );

                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={goPrevious}>
                                Previous
                            </Button>
                            <Button type="submit">Finish</Button>
                        </Card.Footer>
                    </Card>
                </FormikForm>
            )}
        </Formik>
    );
};

export const Assessment_AdministrativeArea = () => {
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
            value: "Any other reason, please specify",
            label: "Any other reason, please specify",
        },
    ];

    const { Formik } = formik;
    const formRef2 = useRef();
    const dispatch = useDispatch();

    const [showXlModal, setShowXlModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");

    const handleShowModal = (size) => {
        switch (size) {
            case "xl":
                setShowXlModal(true);
                break;
            default:
                break;
        }
        setSelectedSize(size);
    };

    const handleCloseModal = () => {
        setShowXlModal(false);
        setSelectedSize("");
    };

    const [formData, setFormData] = useState({});
    const [formSubmited, setFormSubmited] = useState(false);

    return (
        <>
            <Row
                style={{
                    backgroundColor: "rgb(245, 245, 245)",
                    margin: "10px 0px 0px",
                    borderRadius: 6,
                    borderStyle: "dashed",
                    borderWidth: "thin",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            >
                <Col xl={6} lg={6} md={6} sm={6}>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Particulars</th>
                                <th>Required Area</th>
                                <th>Available Area</th>
                                <th>Upload Photo <ReqSign /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {administrativeArea.map((item, index) => {

                                return (
                                    <tr key={index}>
                                        <td>{item.Particulars}</td>
                                        <td>{item.Required_Area_As_per_norms}</td>
                                        <td>xyz</td>
                                        <td><Button>View Document</Button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Col>
                <Col xl={6} lg={6} md={6} sm={6}>
                    <div style={{ padding: 2, background: "#E0ECF5", borderRadius: 6 }}>
                        <div className="form-container">
                            {formSubmited == false ? (
                                <Formik
                                    validationSchema={yup.object().shape({
                                        as_per_norms: yup
                                            .string()
                                            .required("Select whether Building plan is as per norms"),

                                        category: yup.string().when("as_per_norms", {
                                            is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                                            then: () =>
                                                yup.string().required("Please select a category"),
                                            otherwise: () => yup.string().notRequired(),
                                        }),

                                        assessor_comments: yup.string().when("as_per_norms", {
                                            is: "no",
                                            then: () =>
                                                yup.string().required("Please provide your comments"),
                                            otherwise: () => yup.string().notRequired(),
                                        }),
                                    })}
                                    validateOnChange={() => console.log("validateOnChange")}
                                    onSubmit={(values) => {
                                        console.log("Form submitted with values:", values);
                                        setFormData(values);
                                        setFormSubmited(true);
                                        console.log(formData);
                                    }}
                                    initialValues={{
                                        category: "",
                                        as_per_norms: "no",
                                        assessor_comments: "",
                                    }}
                                >
                                    {({
                                        handleSubmit,
                                        handleChange,
                                        submitForm,
                                        values,
                                        errors,
                                        touched,
                                    }) => (
                                        <Card style={{ backgroundColor: "#eff3d6" }}>
                                            <Card.Header>
                                                <label
                                                    className="main-content-label my-auto"
                                                    style={{ textTransform: "none" }}
                                                >
                                                    Review Form
                                                </label>
                                                <div className="ms-auto  d-flex">
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
                                                                Whether Building plan is as per norms?
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
                                                                    name="category"
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

                                                            <Form.Group
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
                                                            </Form.Group>
                                                        </Row>
                                                    )}
                                                    <Button variant="primary" onClick={submitForm}>
                                                        Submit
                                                    </Button>
                                                </Form>
                                            </Card.Body>
                                            <Card.Footer></Card.Footer>
                                        </Card>
                                    )}
                                </Formik>
                            ) : formSubmited == true ? (
                                <Card
                                    className="border-info"
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
                                    <Card.Body>
                                        <Row className="mb-3">
                                            <Col md={12}>
                                                <b>Whether Building plan is as per norms?:</b>{" "}
                                                <span style={{ textTransform: "capitalize" }}>
                                                    {formData.as_per_norms}
                                                </span>
                                            </Col>
                                            {formData.as_per_norms == "no" && (
                                                <Col md={12}>
                                                    <b>Reason Category:</b>{" "}
                                                    <span style={{ textTransform: "capitalize" }}>
                                                        {formData.category}
                                                    </span>
                                                </Col>
                                            )}

                                            {formData.category ==
                                                "Any other reason, please specify" && (
                                                    <Col md={12}>
                                                        <b>Reason:</b> <p>{formData.assessor_comments}</p>
                                                    </Col>
                                                )}
                                        </Row>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-between">
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                setFormSubmited(false);
                                                setFormData({});
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        {/* <Button variant="primary">Submit</Button> */}
                                    </Card.Footer>
                                </Card>
                            ) : (
                                <h1>No Data</h1>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>

        </>
    );
};