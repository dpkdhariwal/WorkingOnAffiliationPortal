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


export const InstituteLocation = ({ pinstInfo }) => {


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
        <h5>Institute Location</h5>

        <table
          width="98%"
          border={1}
          style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
          align="center"
          cellPadding="5px"
        >
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Type of Institute</th>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>{pinstInfo?.institute_location}</td>
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
              <th style={{ border: "1px solid black" }}>Falls Under Hill Area/Hill?</th>
              <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.is_falls_under_hill_area_hill}</td>
            </tr>
            {pinstInfo?.pInstDetail?.is_falls_under_hill_area_hill == "yes" && (<tr>
              <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
              <td style={{ border: "1px solid black" }}>
                <Button type="link" href={`${pinstInfo?.pInstDetail?.Falls_Under_Hill_Area_Hill__Supporting_Doc}`}>View</Button></td>
            </tr>)}

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
              <th style={{ border: "1px solid black" }}>Falls Under Border District</th>
              <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.is_falls_under_border_district}</td>
            </tr>
            {info?.proposed_insti_details?.is_falls_under_border_district == "yes" && (<tr>
              <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
              <td style={{ border: "1px solid black" }}><Button type="link" href={`${pinstInfo?.pInstDetail?.Falls_Under_Border_District__Supporting_Doc}`}>View</Button></td>
            </tr>)}
          </tbody>
        </table>



      </div>
      <div style={{
        backgroundColor: "rgb(245, 245, 245)",
        margin: "10px 0px 0px",
        borderRadius: 6,
        borderStyle: "dashed",
        borderWidth: "thin",
        padding: "10px",
      }}>
        <table
          width="98%"
          border={1}
          style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
          align="center"
          cellPadding="5px"
        >
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Whether Applying Under Mini Skill Training Institute (MSTI) Category</th>
              <th style={{ border: "1px solid black" }}>Whether the Institute Is Exclusive for Women Trainees?</th>


            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.under_msti_category}</td>
              <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.Whether_the_institute_is_exclusive_for_women_trainees}</td>

            </tr>

          </tbody>
        </table>
      </div>

      <div style={{
        backgroundColor: "rgb(245, 245, 245)",
        margin: "10px 0px 0px",
        borderRadius: 6,
        borderStyle: "dashed",
        borderWidth: "thin",
        padding: "10px",
      }}>
        <h5>Coordinates of institute</h5>
        <table
          width="98%"
          border={1}
          style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
          align="center"
          cellPadding="5px"
        >
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Latitude</th>
              <th style={{ border: "1px solid black" }}>Longitude</th>


            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.latitude}</td>
              <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.Longitude}</td>

            </tr>

          </tbody>
        </table>

      </div>





    </>
  );
};