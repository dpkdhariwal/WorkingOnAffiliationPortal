import React, { useState } from "react";
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
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReqSign from "../../comp/requiredSign"; // Make sure this component exists and is exported correctly

const steps = [
    { key: "first", label: "TradeWise Workshops", filled: false },
    { key: "second", label: "TradeWise Classrooms", filled: true },
];

export default function MultiStepWithIndividualForms() {
    const [activeKey, setActiveKey] = useState(steps[0].key);

    const currentIndex = steps.findIndex((s) => s.key === activeKey);
    const isLast = currentIndex === steps.length - 1;

    const goNext = () => {
        if (!isLast) setActiveKey(steps[currentIndex + 1].key);
    };

    const goPrevious = () => {
        if (currentIndex > 0) setActiveKey(steps[currentIndex - 1].key);
    };

    const percentage = 66;

    return (
        <Tab.Container activeKey={activeKey}>
            <Row>
                {/* Navigation Tabs */}
                <Col xl={3}>
                    <Nav className="nav-tabs flex-column nav-style-5">
                        {steps.map((step) => (
                            <Nav.Item key={step.key}>
                                <Nav.Link
                                    eventKey={step.key}
                                    onClick={() => setActiveKey(step.key)}
                                    disabled={step.filled}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>
                                            <i className="ri-tools-line me-2 align-middle d-inline-block"></i>
                                            {step.label}
                                        </span>
                                        <div style={{ width: 30, height: 30 }}>
                                            <CircularProgressbar
                                                value={percentage}
                                                text={`${percentage}%`}
                                            />
                                        </div>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </Col>

                {/* Tab Content */}
                <Col xl={9}>
                    <Tab.Content>
                        {/* === Step 1 === */}
                        <Tab.Pane eventKey="first">
                            <Formik
                                initialValues={{ workshopArea: "" }}
                                validationSchema={Yup.object({
                                    workshopArea: Yup.number().required("Required"),
                                })}
                                onSubmit={(values) => {
                                    console.log("Step 1 Submitted:", values);
                                    goNext();
                                }}
                            >
                                {({ handleSubmit }) => (
                                    <FormikForm onSubmit={handleSubmit}>
                                        <Card>
                                            <Card.Body>
                                                <div className="table-responsive">
                                                    <Table className="text-nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th>Trade Name</th>
                                                                <th>Particulars</th>
                                                                <th>Required Area (As per norms)</th>
                                                                <th>Available Area</th>
                                                                <th>
                                                                    Upload Geo-tagged Photo <ReqSign />
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Fitter</td>
                                                                <td>Workshop 1</td>
                                                                <td>...</td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        name="workshopArea"
                                                                        as={BForm.Control}
                                                                    />
                                                                    <div className="text-danger">
                                                                        <ErrorMessage name="workshopArea" />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <BForm.Group>
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <BForm.Control type="file" />
                                                                            <Button variant="primary">Upload</Button>
                                                                        </div>
                                                                    </BForm.Group>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Card.Body>
                                            <Card.Footer className="d-flex justify-content-end gap-2">
                                                <Button type="submit">Next</Button>
                                            </Card.Footer>
                                        </Card>
                                    </FormikForm>
                                )}
                            </Formik>
                        </Tab.Pane>

                        {/* === Step 2 === */}
                        <Tab.Pane eventKey="second">
                            <Formik
                                initialValues={{ workshopArea: "" }}
                                validationSchema={Yup.object({
                                    workshopArea: Yup.number().required("Required"),
                                })}
                                onSubmit={(values) => {
                                    console.log("Step 1 Submitted:", values);
                                    goNext();
                                }}
                            >
                                {({ handleSubmit }) => (
                                    <FormikForm onSubmit={handleSubmit}>
                                        <Card>
                                            <Card.Body>
                                                <div className="table-responsive">
                                                    <Table className="text-nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th>Trade Name</th>
                                                                <th>Particulars</th>
                                                                <th>Required Area (As per norms)</th>
                                                                <th>Available Area</th>
                                                                <th>
                                                                    Upload Geo-tagged Photo <ReqSign />
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Fitter</td>
                                                                <td>Classroom 1</td>
                                                                <td>...</td>
                                                                <td>
                                                                    <Field
                                                                        type="number"
                                                                        name="workshopArea"
                                                                        as={BForm.Control}
                                                                    />
                                                                    <div className="text-danger">
                                                                        <ErrorMessage name="workshopArea" />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <BForm.Group>
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <BForm.Control type="file" />
                                                                            <Button variant="primary">Upload</Button>
                                                                        </div>
                                                                    </BForm.Group>
                                                                </td>
                                                            </tr>
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
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}
