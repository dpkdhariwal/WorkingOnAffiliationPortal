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
import { MultipurposeHall } from "../stateII/Civil Infrastructure Details Forms/multipurposeHalls";
import { ITLab } from "../stateII/Civil Infrastructure Details Forms/itLab";
import { Library } from "../stateII/Civil Infrastructure Details Forms/library";

import { PlacementNCounsellingRoom } from "../stateII/Civil Infrastructure Details Forms/PlacementNCounsellingRoom";
import { AdministrativeArea } from "../stateII/Civil Infrastructure Details Forms/AdministrativeArea";


import {
  STAGE_II__FEE_PAID, STAGE_II__FEE_EXEMPTED, IN_ACTIVE, CIC, NOT_FILLED, FILLED,
  ACTIVE
} from "affserver";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function MultiStepWithIndividualForms({ setActive, step }) {
  const [steps, setSteps] = useState([]);
  const [activeKey, setActiveKey] = useState();
  const dispatch = useDispatch();

  const currentIndex = steps.findIndex((s) => s.key === activeKey);
  const isLast = currentIndex === steps.length - 1;

  const goNext = (steps) => {
    console.log(steps.nextStep);
    setActiveKey(steps.nextStep)
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

  const getSetActiveKey = (data) => {
    // Get the index of the first FILLED step
    const firstFilledIndex = data.findIndex(step => step.status === FILLED || step.stepStatus === ACTIVE);
    // Get the index of the last FILLED step
    const reversedIndex = [...data].reverse().findIndex(step => step.status === FILLED || step.stepStatus === ACTIVE);
    const lastFilledIndex = reversedIndex !== -1 ? data.length - 1 - reversedIndex : -1;
    // Set activeStep to firstFilledIndex (or you can set lastFilledIndex)
    const currentStep = firstFilledIndex !== -1 ? firstFilledIndex : 0;

    // Debug/log
    console.log("First FILLED index:", firstFilledIndex);
    console.log("Last FILLED index:", data[lastFilledIndex].key);

    setActiveKey(data[lastFilledIndex].key);
  }

  const loadSteps = () => {
    let newData = step?.subSteps.map((data, index) => {
      console.log(data);
      return { ...data, key: data.step, label: data.step, filled: false }
    });
    newData.sort((a, b) => a.stepNo - b.stepNo);
    setSteps(newData);
    console.log(newData);
    getSetActiveKey(newData);
  }

  const onSelectTab = (key) => {
    console.log(key);
    setActiveKey(key)
  }


  useEffect(() => {
  }, [activeKey])

  useEffect(() => {
    setActiveKey(CIC.TRADEWISE_WORKSHOP);
    loadSteps();
    console.log(step);
  }, [])

  const AppliInfo = useSelector((state) => state.AppliInfo);
  return (
    <>
      {/* {AppliInfo.stage_II_fee_status === STAGE_II__FEE_PAID || AppliInfo.stage_II_fee_status === STAGE_II__FEE_EXEMPTED ? (<CivilInfrastructureView />) : <></> } */}

      <Card className="custom-card border border-primary">
        <Card.Header>
          <div className="card-title" style={{ textTransform: "none" }}> <h5> Building Details</h5> </div>
        </Card.Header>
        <Card.Body>
          <Tab.Container activeKey={activeKey} onSelect={(key) => { onSelectTab(key) }}>
            <Row>
              {/* Navigation Tabs */}
              <Col xl={3}>
                <Nav className="nav-tabs flex-column nav-style-1">
                  {steps.map((step) => {
                    console.log(step);
                    return (
                      <Nav.Item key={step.key} style={{ cursor: 'pointer' }} >
                        {/* className={`${step.status === FILLED ? 'navbar-success' : ''}`} */}
                        <Nav.Link  style={{ marginTop: '5px' }} eventKey={step.step} disabled={step.stepStatus === IN_ACTIVE && step.status === NOT_FILLED}  >
                          <div className="d-flex justify-content-between align-items-center">
                            <span> <i className="ri-tools-line me-2 align-middle d-inline-block"></i> {step.label} </span>
                            <div style={{ width: 30, height: 30 }}> <CircularProgressbar value={percentage} text={`${percentage}%`} /> </div>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    )
                  })}
                </Nav>
              </Col>

              {/* Tab Content */}
              <Col xl={9}>
                <Tab.Content>
                  {/* === Step 1 === */}
                  <Tab.Pane eventKey={CIC.TRADEWISE_WORKSHOP}>
                    <TradeWiseWorkshops steps={step} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 2 === */}
                  <Tab.Pane eventKey={CIC.TRADEWISE_CLASSROOMS}>
                    <TradeWiseClassrooms steps={step} goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 3 === */}
                  <Tab.Pane eventKey={CIC.MULTIPURPOSE_HALL}>
                    <MultipurposeHall steps={step} goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 4 === */}
                  <Tab.Pane eventKey={CIC.IT_LAB}>
                    <ITLab steps={step} finish={finish} goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 5 === */}
                  <Tab.Pane eventKey={CIC.LIBRARY}>
                    <Library steps={step} finish={finish} goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 6 === */}
                  <Tab.Pane eventKey={CIC.PLACEMENT_AND_COUNSELLING_ROOM}>
                    <PlacementNCounsellingRoom steps={step} goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 7 === */}
                  <Tab.Pane eventKey={CIC.ADMINISTRATIVE_AREA}>
                    <AdministrativeArea steps={step} finish={finish} goPrevious={goPrevious} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </>


  );
}



export const CivilInfrastructureView = () => {
  return (

    <>
      <table
        width="98%"
        border={1}
        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
        align="center"
        cellPadding="5px"
      >
        <tbody>
          <tr>
            <th colSpan={7} style={{ border: "1px solid black" }}>TradeWise Workshops</th>
          </tr>
          <tr>
            <th style={{ border: "1px solid black" }}>#</th>
            <th style={{ border: "1px solid black" }}>Trade Name</th>
            <th style={{ border: "1px solid black" }}>Particular</th>
            <th style={{ border: "1px solid black" }}>Required Area (as per norms)</th>
            <th style={{ border: "1px solid black" }}>Available Area</th>
            <th style={{ border: "1px solid black" }}>Workshop Photo</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}>Workshop 1</td>
            <td style={{ border: "1px solid black" }}>100sqm</td>
            <td style={{ border: "1px solid black" }}>120sqm</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>2</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}>Workshop 2</td>
            <td style={{ border: "1px solid black" }}>200sqm</td>
            <td style={{ border: "1px solid black" }}>100sqm</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>3</td>
            <td style={{ border: "1px solid black" }}>Fitter</td>
            <td style={{ border: "1px solid black" }}>Workshop 1</td>
            <td style={{ border: "1px solid black" }}>200sqm</td>
            <td style={{ border: "1px solid black" }}>100sqm</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
        </tbody>
      </table>
      <table
        width="98%"
        border={1}
        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
        align="center"
        cellPadding="5px"
      >
        <tbody>
          <tr>
            <th colSpan={7} style={{ border: "1px solid black" }}>TradeWise Classrooms</th>
          </tr>
          <tr>
            <th style={{ border: "1px solid black" }}>#</th>
            <th style={{ border: "1px solid black" }}>Trade Name</th>
            <th style={{ border: "1px solid black" }}>Particular</th>
            <th style={{ border: "1px solid black" }}>Required Area (as per norms)</th>
            <th style={{ border: "1px solid black" }}>Available Area</th>
            <th style={{ border: "1px solid black" }}>Workshop Photo</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>1</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}>Classroom 1</td>
            <td style={{ border: "1px solid black" }}>100sqm</td>
            <td style={{ border: "1px solid black" }}>120sqm</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>2</td>
            <td style={{ border: "1px solid black" }}>Electrician</td>
            <td style={{ border: "1px solid black" }}>Classroom 2</td>
            <td style={{ border: "1px solid black" }}>200sqm</td>
            <td style={{ border: "1px solid black" }}>100sqm</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>3</td>
            <td style={{ border: "1px solid black" }}>Fitter</td>
            <td style={{ border: "1px solid black" }}>Classroom 1</td>
            <td style={{ border: "1px solid black" }}>200sqm</td>
            <td style={{ border: "1px solid black" }}>100sqm</td>
            <td style={{ border: "1px solid black" }}><Button size="sm" variant="primary">View Document</Button></td>
          </tr>
        </tbody>
      </table>
    </>

  );
};
