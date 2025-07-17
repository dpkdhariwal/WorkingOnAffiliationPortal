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





import { STAGE_II__FEE_PAID, STAGE_II__FEE_EXEMPTED } from "../../../../constants";

import { useSelector, useDispatch } from "react-redux";


const steps = [
  { key: 1, label: "TradeWise Workshops", filled: false },
  { key: 2, label: "TradeWise Classrooms", filled: false },
  { key: 3, label: "Multipurpose hall", filled: false },
  { key: 4, label: "IT Lab", filled: false },
  { key: 5, label: "Library", filled: false },
  { key: 6, label: "Placement and counselling room", filled: false },
  { key: 7, label: "Administrative Area", filled: false },
  
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

  const AppliInfo = useSelector((state) => state.AppliInfo);
  return (
    <>
      {AppliInfo.stage_II_fee_status === STAGE_II__FEE_PAID || AppliInfo.stage_II_fee_status === STAGE_II__FEE_EXEMPTED ? (<CivilInfrastructureView />) :

        <>
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
                  <Tab.Pane eventKey={1}>
                    <TradeWiseWorkshops goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 2 === */}
                  <Tab.Pane eventKey={2}>
                    <TradeWiseClassrooms  goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 3 === */}
                  <Tab.Pane eventKey={3}>
                    <MultipurposeHall  goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 4 === */}
                  <Tab.Pane eventKey={4}>
                    <ITLab finish={finish}  goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 5 === */}
                  <Tab.Pane eventKey={5}>
                    <Library finish={finish}  goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 6 === */}
                  <Tab.Pane eventKey={6}>
                    <PlacementNCounsellingRoom  goPrevious={goPrevious} goNext={goNext} />
                  </Tab.Pane>

                  {/* === Step 7 === */}
                  <Tab.Pane eventKey={7}>
                    <AdministrativeArea finish={finish} goPrevious={goPrevious} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </>

      }
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
