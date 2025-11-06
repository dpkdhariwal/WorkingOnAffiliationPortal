import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray } from "formik";
import { useLocation } from "react-router-dom";

import * as set from "../../../../../../../../db/forms/stageI/set/set";

import * as gen from "../../../../../../../../services/general";

export const AddressOfInstitute = ({ pinstInfo }) => {

  // console.log(nav.next());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const [info, setInfo] = useState({});
  const getInfo = async () => {
    // let info = await set.getDetails(appId);
    // setInfo(info);

    let resp = await gen.getDetails(appId);
    setInfo(resp.data);
  }
  useEffect(() => { getInfo() }, []);

  useEffect(() => { console.log(info); }, [info]);
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
            // padding: "10px",
          }}
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
                    {pinstInfo?.comp_postal_addres_of_inst?.state_detail?.stateNameEnglish}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {pinstInfo?.comp_postal_addres_of_inst?.district_detail?.districtNameEnglish}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {pinstInfo?.comp_postal_addres_of_inst?.sub_district?.subdistrictNameEnglish}
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
                    {pinstInfo?.comp_postal_addres_of_inst?.village?.villageNameEnglish}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {pinstInfo?.comp_postal_addres_of_inst?.pincode}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {
                      pinstInfo?.comp_postal_addres_of_inst?.plotNumber_khasaraNumber
                    }
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {pinstInfo?.comp_postal_addres_of_inst?.landmark}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </div>

    </>
  );
};