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
import ReqSign from "../comp/requiredSign"; // Make sure this component exists and is exported correctly

import { TradeWiseWorkshops } from "../stateII/Civil Infrastructure Details Forms/tradeWiseWorkShops";
import { TradeWiseClassrooms } from "../stateII/Civil Infrastructure Details Forms/tradeWiseClassrooms";


import { useSelector, useDispatch } from "react-redux";


const steps = [
  { key: "first", label: "TradeWise Workshops", filled: false },
  { key: "second", label: "TradeWise Classrooms", filled: true },
];

export default function MultiStepWithIndividualForms({ setActive }) {
  const [activeKey, setActiveKey] = useState(steps[0].key);
  const dispatch = useDispatch();

  const currentIndex = steps.findIndex((s) => s.key === activeKey);
  const isLast = currentIndex === steps.length - 1;

  const goNext = () => {
    if (!isLast) setActiveKey(steps[currentIndex + 1].key);
  };

  const goPrevious = () => {
    if (currentIndex > 0) setActiveKey(steps[currentIndex - 1].key);
  };

  const percentage = 66;

  const reg = useSelector((state) => state.reg);
  const stepInfo = reg.stepsII[0];

  const finish = () => {
    setActive(reg.stepsII[2]);
  }

  return (
    <Tab.Container activeKey={activeKey}>
      <Row>
        {/* Navigation Tabs */}
        <Col xl={3}>
          <Nav className="nav-tabs flex-column nav-style-5">
            {steps.map((step) => (
              <Nav.Item key={step.key}>
                <Nav.Link eventKey={step.key} onClick={() => setActiveKey(step.key)} >
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
              <TradeWiseWorkshops goNext={goNext} />
            </Tab.Pane>

            {/* === Step 2 === */}
            <Tab.Pane eventKey="second">
              <TradeWiseClassrooms finish={finish} goPrevious={goPrevious} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
