import PropTypes from "prop-types";
import { Field } from "formik";
import StickyBox from "react-sticky-box";

import { Fragment, useEffect } from "react";
import {
  Card,
  Accordion,
  Tab,
  Nav,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
  Badge,
} from "react-bootstrap";

import { useState, useRef } from "react";
import { } from "react-bootstrap";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as formik from "formik";
import ReqSign from "../../new_registration/form/comp/requiredSign";

import {Assessment_ItLabMte} from "../../new_registration/form/stateII/ItLabMte"

const AssessmentMte = () => {
  const tradeList = [
    {
      name: "Fitter",
      stepLabel: "Fitter",
      stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
      categories: [
        {
          catName: "Trainees Tool Kit",
          apparatus: [
            {
              name: "Ball Peen Hammer",
              availability: "No",
              available_quantity: 45,
              required_quantity: 83,
            },
            {
              name: "Cross Peen Hammer",
              availability: "Yes",
              available_quantity: 63,
              required_quantity: 21,
            },
            {
              name: "Scriber",
              availability: "No",
              available_quantity: 2,
              required_quantity: 49,
            },
            {
              name: "Try Square",
              availability: "Yes",
              available_quantity: 77,
              required_quantity: 62,
            },
            {
              name: "Centre Punch",
              availability: "Yes",
              available_quantity: 89,
              required_quantity: 91,
            },
            {
              name: "Chisels (Flat and Cross Cut)",
              availability: "No",
              available_quantity: 31,
              required_quantity: 66,
            },
            {
              name: "Hacksaw Frame and Blades",
              availability: "Yes",
              available_quantity: 55,
              required_quantity: 37,
            },
            {
              name: "File - Flat, Half Round, Round, Triangular",
              availability: "Yes",
              available_quantity: 97,
              required_quantity: 85,
            },
            {
              name: "Bench Vice",
              availability: "No",
              available_quantity: 24,
              required_quantity: 93,
            },
            {
              name: "Surface Plate",
              availability: "Yes",
              available_quantity: 86,
              required_quantity: 15,
            },
            {
              name: "Angle Plate",
              availability: "No",
              available_quantity: 50,
              required_quantity: 58,
            },
            {
              name: "V-Block with Clamp",
              availability: "Yes",
              available_quantity: 36,
              required_quantity: 71,
            },
            {
              name: "Calipers (Inside, Outside, Odd Leg)",
              availability: "Yes",
              available_quantity: 20,
              required_quantity: 56,
            },
            {
              name: "Steel Rule",
              availability: "No",
              available_quantity: 12,
              required_quantity: 30,
            },
            {
              name: "Vernier Caliper",
              availability: "Yes",
              available_quantity: 73,
              required_quantity: 75,
            },
            {
              name: "Micrometer (Outside)",
              availability: "No",
              available_quantity: 6,
              required_quantity: 48,
            },
            {
              name: "Combination Set",
              availability: "Yes",
              available_quantity: 99,
              required_quantity: 17,
            },
            {
              name: "Feeler Gauge",
              availability: "Yes",
              available_quantity: 65,
              required_quantity: 89,
            },
            {
              name: "Radius Gauge",
              availability: "No",
              available_quantity: 48,
              required_quantity: 40,
            },
            {
              name: "Taps and Tap Wrenches",
              availability: "Yes",
              available_quantity: 59,
              required_quantity: 11,
            },
            {
              name: "Dies and Die Holders",
              availability: "No",
              available_quantity: 13,
              required_quantity: 67,
            },
            {
              name: "Drill Bits",
              availability: "Yes",
              available_quantity: 90,
              required_quantity: 77,
            },
            {
              name: "Hand Drill Machine",
              availability: "No",
              available_quantity: 7,
              required_quantity: 26,
            },
            {
              name: "Bench Drill Machine",
              availability: "Yes",
              available_quantity: 84,
              required_quantity: 33,
            },
            {
              name: "Countersink and Counterbore Tools",
              availability: "Yes",
              available_quantity: 51,
              required_quantity: 96,
            },
            {
              name: "Allen Keys",
              availability: "No",
              available_quantity: 40,
              required_quantity: 12,
            },
            {
              name: "Spanners (Double Ended, Ring, Adjustable)",
              availability: "Yes",
              available_quantity: 88,
              required_quantity: 43,
            },
            {
              name: "Screw Drivers (Flat and Phillips)",
              availability: "No",
              available_quantity: 11,
              required_quantity: 64,
            },
            {
              name: "Pipe Wrench",
              availability: "Yes",
              available_quantity: 95,
              required_quantity: 97,
            },
            {
              name: "Torque Wrench",
              availability: "No",
              available_quantity: 17,
              required_quantity: 39,
            },
            {
              name: "Surface Gauge",
              availability: "Yes",
              available_quantity: 69,
              required_quantity: 19,
            },
            {
              name: "Dial Indicator with Magnetic Stand",
              availability: "Yes",
              available_quantity: 33,
              required_quantity: 88,
            },
            {
              name: "Reamer (Hand and Machine)",
              availability: "No",
              available_quantity: 22,
              required_quantity: 29,
            },
            {
              name: "Lathe Tool Holders",
              availability: "Yes",
              available_quantity: 80,
              required_quantity: 73,
            },
            {
              name: "Angle Protractor",
              availability: "No",
              available_quantity: 8,
              required_quantity: 52,
            },
            {
              name: "Bevel Gauge",
              availability: "Yes",
              available_quantity: 71,
              required_quantity: 84,
            },
            {
              name: "Marking Table",
              availability: "No",
              available_quantity: 15,
              required_quantity: 31,
            },
            {
              name: "Thread Plug and Ring Gauges",
              availability: "Yes",
              available_quantity: 43,
              required_quantity: 60,
            },
            {
              name: "Tap Extractor",
              availability: "Yes",
              available_quantity: 58,
              required_quantity: 95,
            },
            {
              name: "Oil Can",
              availability: "No",
              available_quantity: 39,
              required_quantity: 25,
            },
            {
              name: "Cold Set",
              availability: "Yes",
              available_quantity: 66,
              required_quantity: 45,
            },
            {
              name: "Pipe Cutter",
              availability: "No",
              available_quantity: 30,
              required_quantity: 72,
            },
            {
              name: "Measuring Tape",
              availability: "Yes",
              available_quantity: 74,
              required_quantity: 63,
            },
            {
              name: "Spirit Level",
              availability: "No",
              available_quantity: 4,
              required_quantity: 36,
            },
            {
              name: "Wire Gauge",
              availability: "Yes",
              available_quantity: 92,
              required_quantity: 99,
            },
            {
              name: "Steel Tape",
              availability: "No",
              available_quantity: 19,
              required_quantity: 54,
            },
            {
              name: "Plumb Bob",
              availability: "Yes",
              available_quantity: 60,
              required_quantity: 10,
            },
            {
              name: "Hammer (Soft Face, Mallet)",
              availability: "No",
              available_quantity: 28,
              required_quantity: 41,
            },
          ],
        },
        {
          catName: "Shop Tools & Equipment",
          apparatus: [
            {
              name: "Bench Vice (Jaw Size 100 mm)",
              availability: "No",
              available_quantity: 54,
              required_quantity: 27,
            },
            {
              name: "Vee Blocks pair with clamps",
              availability: "Yes",
              available_quantity: 37,
              required_quantity: 27,
            },
            {
              name: "Surface Plate (Cast Iron 400 x 400 mm)",
              availability: "No",
              available_quantity: 13,
              required_quantity: 21,
            },
            {
              name: "Surface Gauge with dial indicator",
              availability: "Yes",
              available_quantity: 76,
              required_quantity: 77,
            },
            {
              name: "Angle Plate (100 x 100 x 115 mm)",
              availability: "Yes",
              available_quantity: 41,
              required_quantity: 93,
            },
            {
              name: "Universal Bevel Protractor with Blade",
              availability: "No",
              available_quantity: 6,
              required_quantity: 11,
            },
            {
              name: "Sine Bar 125 mm",
              availability: "Yes",
              available_quantity: 91,
              required_quantity: 23,
            },
            {
              name: "Combination Set",
              availability: "Yes",
              available_quantity: 58,
              required_quantity: 71,
            },
            {
              name: "Try Square (Engineer’s 150 mm blade)",
              availability: "No",
              available_quantity: 20,
              required_quantity: 51,
            },
            {
              name: "Vernier Height Gauge (0-300 mm)",
              availability: "Yes",
              available_quantity: 84,
              required_quantity: 27,
            },
          ],
        },
        {
          catName: "Machinery Shop Machinery",
          apparatus: [
            {
              name: "Lathe Machine (Centre Lathe 150 mm swing, 1 m bed length)",
              availability: "Yes",
              available_quantity: 18,
              required_quantity: 26,
            },
            {
              name: "Drilling Machine (Pillar type, up to 25 mm capacity)",
              availability: "No",
              available_quantity: 9,
              required_quantity: 34,
            },
            {
              name: "Drilling Machine (Bench type, up to 12 mm capacity)",
              availability: "Yes",
              available_quantity: 22,
              required_quantity: 29,
            },
            {
              name: "Power Hacksaw Machine",
              availability: "No",
              available_quantity: 6,
              required_quantity: 49,
            },
            {
              name: "Grinding Machine (Pedestal type double ended)",
              availability: "Yes",
              available_quantity: 33,
              required_quantity: 41,
            },
            {
              name: "Surface Grinder",
              availability: "No",
              available_quantity: 11,
              required_quantity: 48,
            },
            {
              name: "Shaping Machine (250 mm stroke)",
              availability: "Yes",
              available_quantity: 17,
              required_quantity: 64,
            },
            {
              name: "Slotting Machine",
              availability: "No",
              available_quantity: 8,
              required_quantity: 33,
            },
            {
              name: "Milling Machine (Horizontal / Vertical / Universal)",
              availability: "Yes",
              available_quantity: 25,
              required_quantity: 38,
            },
            {
              name: "Welding Transformer (Arc welding set 300 Amps)",
              availability: "Yes",
              available_quantity: 30,
              required_quantity: 59,
            },
            {
              name: "Gas Welding Set with accessories (Oxy-Acetylene)",
              availability: "No",
              available_quantity: 4,
              required_quantity: 35,
            },
            {
              name: "Compressor with accessories (2 HP)",
              availability: "Yes",
              available_quantity: 20,
              required_quantity: 44,
            },
            {
              name: "Hydraulic Press (Hand operated, 10 Tons)",
              availability: "No",
              available_quantity: 13,
              required_quantity: 80,
            },
            {
              name: "Tapping cum Drilling Machine",
              availability: "Yes",
              available_quantity: 29,
              required_quantity: 34,
            },
            {
              name: "Tool and Cutter Grinder",
              availability: "No",
              available_quantity: 10,
              required_quantity: 39,
            },
            {
              name: "Flexible Shaft Grinder",
              availability: "Yes",
              available_quantity: 36,
              required_quantity: 90,
            },
            {
              name: "Bench Shearing Machine (Hand operated)",
              availability: "No",
              available_quantity: 7,
              required_quantity: 54,
            },
            {
              name: "Power Press (5 Tons)",
              availability: "Yes",
              available_quantity: 12,
              required_quantity: 51,
            },
            {
              name: "Universal Testing Machine (Optional for testing)",
              availability: "No",
              available_quantity: 5,
              required_quantity: 31,
            },
            {
              name: "CNC Lathe Trainer (if applicable)",
              availability: "Yes",
              available_quantity: 3,
              required_quantity: 64,
            },
            {
              name: "CNC Milling Trainer (if applicable)",
              availability: "No",
              available_quantity: 2,
              required_quantity: 89,
            },
            {
              name: "Pipe Bending Machine",
              availability: "Yes",
              available_quantity: 14,
              required_quantity: 45,
            },
            {
              name: "Portable Hand Drill Machine (6 mm to 10 mm)",
              availability: "No",
              available_quantity: 19,
              required_quantity: 60,
            },
            {
              name: "Bench Grinder",
              availability: "Yes",
              available_quantity: 27,
              required_quantity: 73,
            },
            {
              name: "Arc Welding Rectifier (with accessories)",
              availability: "No",
              available_quantity: 6,
              required_quantity: 19,
            },
            {
              name: "Gas Cutting Torch with Regulators and Safety valves",
              availability: "Yes",
              available_quantity: 15,
              required_quantity: 23,
            },
          ],
        },
      ],
    },
    {
      name: "Electrician",
      stepLabel: "Electrician",
      stepDescription: "Fill Machinery/Tools/Equipment Details",
      completed: false,
      categories: [
        {
          catName: "Trainees Tool Kit",
          apparatus: [
            {
              name: "Ball Peen Hammer",
              availability: "No",
              available_quantity: 45,
              required_quantity: 83,
            },
            {
              name: "Cross Peen Hammer",
              availability: "Yes",
              available_quantity: 63,
              required_quantity: 21,
            },
            {
              name: "Scriber",
              availability: "No",
              available_quantity: 2,
              required_quantity: 49,
            },
            {
              name: "Try Square",
              availability: "Yes",
              available_quantity: 77,
              required_quantity: 62,
            },
            {
              name: "Centre Punch",
              availability: "Yes",
              available_quantity: 89,
              required_quantity: 91,
            },
            {
              name: "Chisels (Flat and Cross Cut)",
              availability: "No",
              available_quantity: 31,
              required_quantity: 66,
            },
            {
              name: "Hacksaw Frame and Blades",
              availability: "Yes",
              available_quantity: 55,
              required_quantity: 37,
            },
            {
              name: "File - Flat, Half Round, Round, Triangular",
              availability: "Yes",
              available_quantity: 97,
              required_quantity: 85,
            },
            {
              name: "Bench Vice",
              availability: "No",
              available_quantity: 24,
              required_quantity: 93,
            },
            {
              name: "Surface Plate",
              availability: "Yes",
              available_quantity: 86,
              required_quantity: 15,
            },
            {
              name: "Angle Plate",
              availability: "No",
              available_quantity: 50,
              required_quantity: 58,
            },
            {
              name: "V-Block with Clamp",
              availability: "Yes",
              available_quantity: 36,
              required_quantity: 71,
            },
            {
              name: "Calipers (Inside, Outside, Odd Leg)",
              availability: "Yes",
              available_quantity: 20,
              required_quantity: 56,
            },
            {
              name: "Steel Rule",
              availability: "No",
              available_quantity: 12,
              required_quantity: 30,
            },
            {
              name: "Vernier Caliper",
              availability: "Yes",
              available_quantity: 73,
              required_quantity: 75,
            },
            {
              name: "Micrometer (Outside)",
              availability: "No",
              available_quantity: 6,
              required_quantity: 48,
            },
            {
              name: "Combination Set",
              availability: "Yes",
              available_quantity: 99,
              required_quantity: 17,
            },
            {
              name: "Feeler Gauge",
              availability: "Yes",
              available_quantity: 65,
              required_quantity: 89,
            },
            {
              name: "Radius Gauge",
              availability: "No",
              available_quantity: 48,
              required_quantity: 40,
            },
            {
              name: "Taps and Tap Wrenches",
              availability: "Yes",
              available_quantity: 59,
              required_quantity: 11,
            },
            {
              name: "Dies and Die Holders",
              availability: "No",
              available_quantity: 13,
              required_quantity: 67,
            },
            {
              name: "Drill Bits",
              availability: "Yes",
              available_quantity: 90,
              required_quantity: 77,
            },
            {
              name: "Hand Drill Machine",
              availability: "No",
              available_quantity: 7,
              required_quantity: 26,
            },
            {
              name: "Bench Drill Machine",
              availability: "Yes",
              available_quantity: 84,
              required_quantity: 33,
            },
            {
              name: "Countersink and Counterbore Tools",
              availability: "Yes",
              available_quantity: 51,
              required_quantity: 96,
            },
            {
              name: "Allen Keys",
              availability: "No",
              available_quantity: 40,
              required_quantity: 12,
            },
            {
              name: "Spanners (Double Ended, Ring, Adjustable)",
              availability: "Yes",
              available_quantity: 88,
              required_quantity: 43,
            },
            {
              name: "Screw Drivers (Flat and Phillips)",
              availability: "No",
              available_quantity: 11,
              required_quantity: 64,
            },
            {
              name: "Pipe Wrench",
              availability: "Yes",
              available_quantity: 95,
              required_quantity: 97,
            },
            {
              name: "Torque Wrench",
              availability: "No",
              available_quantity: 17,
              required_quantity: 39,
            },
            {
              name: "Surface Gauge",
              availability: "Yes",
              available_quantity: 69,
              required_quantity: 19,
            },
            {
              name: "Dial Indicator with Magnetic Stand",
              availability: "Yes",
              available_quantity: 33,
              required_quantity: 88,
            },
            {
              name: "Reamer (Hand and Machine)",
              availability: "No",
              available_quantity: 22,
              required_quantity: 29,
            },
            {
              name: "Lathe Tool Holders",
              availability: "Yes",
              available_quantity: 80,
              required_quantity: 73,
            },
            {
              name: "Angle Protractor",
              availability: "No",
              available_quantity: 8,
              required_quantity: 52,
            },
            {
              name: "Bevel Gauge",
              availability: "Yes",
              available_quantity: 71,
              required_quantity: 84,
            },
            {
              name: "Marking Table",
              availability: "No",
              available_quantity: 15,
              required_quantity: 31,
            },
            {
              name: "Thread Plug and Ring Gauges",
              availability: "Yes",
              available_quantity: 43,
              required_quantity: 60,
            },
            {
              name: "Tap Extractor",
              availability: "Yes",
              available_quantity: 58,
              required_quantity: 95,
            },
            {
              name: "Oil Can",
              availability: "No",
              available_quantity: 39,
              required_quantity: 25,
            },
            {
              name: "Cold Set",
              availability: "Yes",
              available_quantity: 66,
              required_quantity: 45,
            },
            {
              name: "Pipe Cutter",
              availability: "No",
              available_quantity: 30,
              required_quantity: 72,
            },
            {
              name: "Measuring Tape",
              availability: "Yes",
              available_quantity: 74,
              required_quantity: 63,
            },
            {
              name: "Spirit Level",
              availability: "No",
              available_quantity: 4,
              required_quantity: 36,
            },
            {
              name: "Wire Gauge",
              availability: "Yes",
              available_quantity: 92,
              required_quantity: 99,
            },
            {
              name: "Steel Tape",
              availability: "No",
              available_quantity: 19,
              required_quantity: 54,
            },
            {
              name: "Plumb Bob",
              availability: "Yes",
              available_quantity: 60,
              required_quantity: 10,
            },
            {
              name: "Hammer (Soft Face, Mallet)",
              availability: "No",
              available_quantity: 28,
              required_quantity: 41,
            },
          ],
        },
        {
          catName: "Shop Tools & Equipment",
          apparatus: [
            {
              name: "Bench Vice (Jaw Size 100 mm)",
              availability: "No",
              available_quantity: 54,
              required_quantity: 27,
            },
            {
              name: "Vee Blocks pair with clamps",
              availability: "Yes",
              available_quantity: 37,
              required_quantity: 27,
            },
            {
              name: "Surface Plate (Cast Iron 400 x 400 mm)",
              availability: "No",
              available_quantity: 13,
              required_quantity: 21,
            },
            {
              name: "Surface Gauge with dial indicator",
              availability: "Yes",
              available_quantity: 76,
              required_quantity: 77,
            },
            {
              name: "Angle Plate (100 x 100 x 115 mm)",
              availability: "Yes",
              available_quantity: 41,
              required_quantity: 93,
            },
            {
              name: "Universal Bevel Protractor with Blade",
              availability: "No",
              available_quantity: 6,
              required_quantity: 11,
            },
            {
              name: "Sine Bar 125 mm",
              availability: "Yes",
              available_quantity: 91,
              required_quantity: 23,
            },
            {
              name: "Combination Set",
              availability: "Yes",
              available_quantity: 58,
              required_quantity: 71,
            },
            {
              name: "Try Square (Engineer’s 150 mm blade)",
              availability: "No",
              available_quantity: 20,
              required_quantity: 51,
            },
            {
              name: "Vernier Height Gauge (0-300 mm)",
              availability: "Yes",
              available_quantity: 84,
              required_quantity: 27,
            },
          ],
        },
        {
          catName: "Machinery Shop Machinery",
          apparatus: [
            {
              name: "Lathe Machine (Centre Lathe 150 mm swing, 1 m bed length)",
              availability: "Yes",
              available_quantity: 18,
              required_quantity: 26,
            },
            {
              name: "Drilling Machine (Pillar type, up to 25 mm capacity)",
              availability: "No",
              available_quantity: 9,
              required_quantity: 34,
            },
            {
              name: "Drilling Machine (Bench type, up to 12 mm capacity)",
              availability: "Yes",
              available_quantity: 22,
              required_quantity: 29,
            },
            {
              name: "Power Hacksaw Machine",
              availability: "No",
              available_quantity: 6,
              required_quantity: 49,
            },
            {
              name: "Grinding Machine (Pedestal type double ended)",
              availability: "Yes",
              available_quantity: 33,
              required_quantity: 41,
            },
            {
              name: "Surface Grinder",
              availability: "No",
              available_quantity: 11,
              required_quantity: 48,
            },
            {
              name: "Shaping Machine (250 mm stroke)",
              availability: "Yes",
              available_quantity: 17,
              required_quantity: 64,
            },
            {
              name: "Slotting Machine",
              availability: "No",
              available_quantity: 8,
              required_quantity: 33,
            },
            {
              name: "Milling Machine (Horizontal / Vertical / Universal)",
              availability: "Yes",
              available_quantity: 25,
              required_quantity: 38,
            },
            {
              name: "Welding Transformer (Arc welding set 300 Amps)",
              availability: "Yes",
              available_quantity: 30,
              required_quantity: 59,
            },
            {
              name: "Gas Welding Set with accessories (Oxy-Acetylene)",
              availability: "No",
              available_quantity: 4,
              required_quantity: 35,
            },
            {
              name: "Compressor with accessories (2 HP)",
              availability: "Yes",
              available_quantity: 20,
              required_quantity: 44,
            },
            {
              name: "Hydraulic Press (Hand operated, 10 Tons)",
              availability: "No",
              available_quantity: 13,
              required_quantity: 80,
            },
            {
              name: "Tapping cum Drilling Machine",
              availability: "Yes",
              available_quantity: 29,
              required_quantity: 34,
            },
            {
              name: "Tool and Cutter Grinder",
              availability: "No",
              available_quantity: 10,
              required_quantity: 39,
            },
            {
              name: "Flexible Shaft Grinder",
              availability: "Yes",
              available_quantity: 36,
              required_quantity: 90,
            },
            {
              name: "Bench Shearing Machine (Hand operated)",
              availability: "No",
              available_quantity: 7,
              required_quantity: 54,
            },
            {
              name: "Power Press (5 Tons)",
              availability: "Yes",
              available_quantity: 12,
              required_quantity: 51,
            },
            {
              name: "Universal Testing Machine (Optional for testing)",
              availability: "No",
              available_quantity: 5,
              required_quantity: 31,
            },
            {
              name: "CNC Lathe Trainer (if applicable)",
              availability: "Yes",
              available_quantity: 3,
              required_quantity: 64,
            },
            {
              name: "CNC Milling Trainer (if applicable)",
              availability: "No",
              available_quantity: 2,
              required_quantity: 89,
            },
            {
              name: "Pipe Bending Machine",
              availability: "Yes",
              available_quantity: 14,
              required_quantity: 45,
            },
            {
              name: "Portable Hand Drill Machine (6 mm to 10 mm)",
              availability: "No",
              available_quantity: 19,
              required_quantity: 60,
            },
            {
              name: "Bench Grinder",
              availability: "Yes",
              available_quantity: 27,
              required_quantity: 73,
            },
            {
              name: "Arc Welding Rectifier (with accessories)",
              availability: "No",
              available_quantity: 6,
              required_quantity: 19,
            },
            {
              name: "Gas Cutting Torch with Regulators and Safety valves",
              availability: "Yes",
              available_quantity: 15,
              required_quantity: 23,
            },
          ],
        },
      ],
    },
  ];
  return (
    <Fragment>
      <Accordion
        className="accordion-customicon1 accordions-items-seperate"
        defaultActiveKey="0"
      >
        <Accordion.Item eventKey="ITLab">
          <Accordion.Header>IT Lab</Accordion.Header>
          <Accordion.Body>
            <Assessment_ItLabMte/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>



      <Accordion
        className="accordion-customicon1 accordions-items-seperate"
        defaultActiveKey="0"
      >
        {tradeList.map((trade, index) => {
          return (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>{trade.name}</Accordion.Header>
              <Accordion.Body>
                <Tab.Container defaultActiveKey="first">
                  <Nav
                    as="ul"
                    variant=""
                    className="nav-tabs mb-3 tab-style-6"
                    id="myTab"
                    role="tablist"
                    defaultActiveKey="index_0"
                  >

                    {trade.categories.map((item, index) => {
                      return (
                        <Nav.Item key={index} as="li">
                          {" "}
                          <Nav.Link
                            eventKey={`index_${index}`}
                            id="products-tab"
                            type="button"
                          >
                            <i className="ri-gift-line me-1 align-middle d-inline-block"></i>
                            {item.catName}
                          </Nav.Link>{" "}
                        </Nav.Item>
                      );
                    })}
                  </Nav>

                  <Tab.Content id="myTabContent2">
                    {trade.categories.map((item, index) => {
                      return (
                        <Tab.Pane
                          key={index}
                          className="tab-pane fade show  p-0 border-bottom-0"
                          id="products-tab-pane"
                          eventKey={`index_${index}`}
                          role="tabpanel"
                          aria-labelledby="products-tab"
                          tabIndex={0}
                        >
                          {item.catName}
                          <Apparatus apparatus={item.apparatus} />
                        </Tab.Pane>
                      );
                    })}
                  </Tab.Content>
                </Tab.Container>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Fragment>
  );
};

export default AssessmentMte;

export const Apparatus = ({ apparatus = [] }) => {
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

  useEffect(() => {
    console.log(apparatus);
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(apparatus.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };
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
          height: "400px",
          overflowY: "auto",
        }}
        className="row"
      >
        <Col xl={6} lg={6} md={6} sm={6}>
          <Table style={{ "font-size": "x-small" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{ textTransform: "none" }}>
                  Particular
                  <ReqSign />
                </th>
                <th scope="col" style={{ textTransform: "none" }}>
                  Required Quantity
                  <ReqSign />
                </th>
                <th scope="col" style={{ textTransform: "none" }}>
                  Availability
                  <ReqSign />
                </th>
                <th scope="col" style={{ textTransform: "none" }}>
                  Available Quantity
                  <ReqSign />
                </th>
              </tr>
            </thead>
            <tbody>
              {apparatus.map((item, index) => {
                console.log(item);
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.required_quantity}</td>
                    <td>{item.availability}</td>
                    <td>{item.available_quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6}>
          {/* THis Should Sticky While above colon height is scrolling window */}
          {true && (
            <div style={{ padding: 2, background: "#E0ECF5", borderRadius: 6 }}>
              <div className="form-container">
                {formSubmited == false ? (
                  <Formik
                    validationSchema={yup.object().shape({
                      as_per_norms: yup
                        .string()
                        .required("Select whether is as per norms"),

                      assessor_comments: yup.string().when("as_per_norms", {
                        is: "no",
                        then: () =>
                          yup
                            .array()
                            .min(1, "Select at least one comment")
                            .of(yup.string().required()),
                        otherwise: () => yup.array().notRequired(),
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
                          <Form
                            ref={formRef2}
                            onSubmit={handleSubmit}
                            validated
                          >
                            <Row className="mb-3">
                              <Form.Group>
                                <Form.Label>
                                  Whether is as per norms?
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
                                <Col md={12}>
                                  <Form.Label>
                                    Select Apparatus not as per norms:
                                    <span style={{ color: "red" }}>*</span>
                                  </Form.Label>
                                  <Table style={{ "font-size": "x-small" }}>
                                    <thead>
                                      <tr>
                                        <th>
                                          {" "}
                                          <Form.Check
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                          />
                                        </th>
                                        <th scope="col">#</th>
                                        <th
                                          scope="col"
                                          style={{ textTransform: "none" }}
                                        >
                                          Particular
                                          <ReqSign />
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ textTransform: "none" }}
                                        >
                                          Required Quantity
                                          <ReqSign />
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ textTransform: "none" }}
                                        >
                                          Availability
                                          <ReqSign />
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ textTransform: "none" }}
                                        >
                                          Available Quantity
                                          <ReqSign />
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {apparatus.map((item, index) => {
                                        console.log(item);
                                        const isChecked =
                                          selectedItems.includes(index);

                                        return (
                                          <tr key={index}>
                                            <td>
                                              {" "}
                                              <Form.Check
                                                name="assessor_comments"
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() =>
                                                  handleCheckboxChange(index)
                                                }
                                              />
                                            </td>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.required_quantity}</td>

                                            <td>{item.availability}</td>
                                            <td>{item.available_quantity}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </Table>
                                </Col>
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
                          <b>Whether is as per norms?:</b>{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {formData.as_per_norms}
                          </span>
                        </Col>
                        {formData.as_per_norms == "no" && (
                          <Col md={12}>
                            <p>not as per the norms:</p>{" "}
                            <table style={{ "font-size": "x-small" }}>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th scope="col">#</th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Name
                                    <ReqSign />
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Required Quantity
                                    <ReqSign />
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Availability
                                    <ReqSign />
                                  </th>
                                  <th
                                    scope="col"
                                    style={{ textTransform: "none" }}
                                  >
                                    Available Quantity
                                    <ReqSign />
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {apparatus.map((item, index) => {
                                  console.log(item);
                                  const isChecked =
                                    selectedItems.includes(index);
                                  return (
                                    isChecked && (
                                      <tr key={index}>
                                        <td>
                                          <Form.Check
                                            name="assessor_comments"
                                            type="checkbox"
                                            checked={isChecked}
                                            disabled={true}
                                          />
                                        </td>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.required_quantity}</td>
                                        <td>{item.availability}</td>
                                        <td>{item.available_quantity}</td>
                                      </tr>
                                    )
                                  );
                                })}
                              </tbody>
                            </table>
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
          )}
        </Col>
      </Row>

      <Modal show={showXlModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title as="h6">Review Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This section is to guide Desktop Assessor in Desktop Assessment. This
          will act as guide to him. DGT admin can provide sample documents also.
        </Modal.Body>
      </Modal>
    </>
  );
};
// Apparatus.propTypes = {
//   apparatus: PropTypes.array.isRequired, // or use PropTypes.arrayOf(...)
// };
