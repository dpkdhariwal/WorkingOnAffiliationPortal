import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";
import * as formik from "formik";
import { useLocation } from "react-router-dom";

export const NameOfTheInstitute = ({ info }) => {
    return (
        <>
        <Row
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
                            <th style={{ border: "1px solid black" }}>Name of the Applicant Institute</th>
                            <th style={{ border: "1px solid black" }}>Type of Institute</th>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black" }}>{info?.pInstDetail?.name_of_applicant_institute}</td>
                            <td style={{ border: "1px solid black" }}>{info?.pInstDetail?.type_of_institute}</td>
                        </tr>
                    </tbody>
                </table>
            </Col>
        </Row>
        <Row
        >
          <Col xl={12} lg={12} md={12} sm={12}>
            <table
              width="98%"
              border={1}
              style={{
                borderCollapse: "collapse",
                marginTop: 15,
                color: "black",
              }}
              align="center"
              cellPadding="5px"
            >
              <tbody>
                <tr style={{ border: "1px solid black" }}>
                  <th style={{ border: "1px solid black" }}>
                    Applicant Entity State
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    Applicant Entity District
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    Applicant Entity Sub District
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    Applicant Entity Town/City
                  </th>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black" }}>
                    {info?.comp_postal_addres_of_inst?.state_detail?.stateNameEnglish}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {info?.comp_postal_addres_of_inst?.district_detail?.districtNameEnglish}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {info?.comp_postal_addres_of_inst?.sub_district?.subdistrictNameEnglish}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    --
                  </td>
                </tr>

                <tr style={{ border: "1px solid black" }}>
                  <th style={{ border: "1px solid black" }}>
                    Applicant Entity Village
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    Applicant Entity Pincode
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    Applicant Entity Plot Number/Khasara Number/Gata Number
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    Applicant Entity Landmark
                  </th>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black" }}>
                    {info?.comp_postal_addres_of_inst?.village?.villageNameEnglish}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {info?.comp_postal_addres_of_inst?.pincode}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {
                      info?.comp_postal_addres_of_inst?.plotNumber_khasaraNumber
                    }
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {info?.comp_postal_addres_of_inst?.landmark}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        </>
    );
};
