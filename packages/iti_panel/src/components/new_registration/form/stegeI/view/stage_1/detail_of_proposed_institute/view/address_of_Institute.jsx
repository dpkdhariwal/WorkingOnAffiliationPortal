import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray } from "formik";



export const AddressOfInstitute = () => {

  return (
    <>
      <div style={{
        backgroundColor: "rgb(245, 245, 245)",
        margin: "10px 0px 0px",
        borderRadius: 6,
        borderStyle: "dashed",
        borderWidth: "thin",
        padding: "10px",
      }}>

        <h5>Complete Postal Address of the Applicant Institute
        </h5>

        <Row
        style={{
          backgroundColor: "rgb(245, 245, 245)",
          margin: "10px 0px 0px",
          borderRadius: 6,
          // borderStyle: "dashed",
          borderWidth: "thin",
          padding: "10px",
        }}
      >
        <Col xl={12} lg={12} md={12} sm={12}>
          <table
            width="98%"
            border={1}
            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <tbody>
              <tr>
                <td colSpan={7} style={{ border: "1px solid black" }}><b>Complete Postal Address of the Applicant Institute</b></td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>State</th>
                <th style={{ border: "1px solid black" }}>District</th>
                <th style={{ border: "1px solid black" }}>Town/City</th>
                <th style={{ border: "1px solid black" }}>Block/Tehsil</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>value 1</td>
                <td style={{ border: "1px solid black" }}>value 1</td>
                <td style={{ border: "1px solid black" }}>value 1</td>
                <td style={{ border: "1px solid black" }}>value 1</td>
              </tr>

              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Sector/Village</th>
                <th style={{ border: "1px solid black" }}>Pincode</th>
                <th style={{ border: "1px solid black" }}>Plot Number/Khasara Number/Gata Number</th>
                <th style={{ border: "1px solid black" }}>Landmark</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>value 1</td>
                <td style={{ border: "1px solid black" }}>value 1</td>
                <td style={{ border: "1px solid black" }}>value 1</td>
                <td style={{ border: "1px solid black" }}>value 1</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      </div>
      
    </>
  );
};