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


export const InstituteLocation = () => {
  const MaxData = [
    { value: "Document is not legible", label: "Document is not legible" },
    { value: "Document is irrelevant", label: "Document is irrelevant" },
    {
      value: "Document lacks required information",
      label: "Document lacks required information",
    },
    {
      value:
        "Document is not approved by the competent authority in the State/ UT",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value:
        "Address on the document does not match with the proposed land/ building address",
      label:
        "Address on the document does not match with the proposed land/ building address",
    },
    {
      value:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
      label:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
    },
    {
      value: "Any other reason, please specify",
      label: "Any other reason, please specify",
    },
  ];

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


  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);


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
              <td style={{ border: "1px solid black" }}>{info?.proposed_insti_details?.institute_location}</td>
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
              <td style={{ border: "1px solid black" }}>{info?.proposed_insti_details?.is_falls_under_hill_area_hill}</td>
            </tr>
            {info?.proposed_insti_details?.is_falls_under_hill_area_hill == "yes" && (<tr>
              <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
              <td style={{ border: "1px solid black" }}><Button>View</Button></td>
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
              <td style={{ border: "1px solid black" }}>{info?.proposed_insti_details?.is_falls_under_border_district}</td>
            </tr>
            {info?.proposed_insti_details?.is_falls_under_border_district == "yes" && (<tr>
              <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
              <td style={{ border: "1px solid black" }}><Button>View</Button></td>
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
              <td style={{ border: "1px solid black" }}>{info?.proposed_insti_details?.under_msti_category}</td>
              <td style={{ border: "1px solid black" }}>{info?.proposed_insti_details?.Whether_the_institute_is_exclusive_for_women_trainees}</td>

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
              <td style={{ border: "1px solid black" }}>{info?.proposed_insti_details?.latitude}</td>
              <td style={{ border: "1px solid black" }}>{info?.proposed_insti_details?.Longitude}</td>

            </tr>

          </tbody>
        </table>

      </div>





    </>
  );
};