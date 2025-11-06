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
export const Name_of_the_institute = ({ pinstInfo }) => {
  
  // console.log(pinstInfo.pInstDetail.name_of_applicant_institute);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();


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
      <Row
        style={{
          backgroundColor: "rgb(245, 245, 245)",
          margin: "10px 0px 0px",
          borderRadius: 6,
          borderStyle: "dashed",
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
                <th style={{ border: "1px solid black" }}>Name of the Applicant Institute</th>
                <th style={{ border: "1px solid black" }}>Type of Institute</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.name_of_applicant_institute}</td>
                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.type_of_institute}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};
