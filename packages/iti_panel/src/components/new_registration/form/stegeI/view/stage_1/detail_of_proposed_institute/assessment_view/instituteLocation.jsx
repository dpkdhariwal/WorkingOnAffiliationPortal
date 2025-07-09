import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray } from "formik";



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
              <td style={{ border: "1px solid black" }}>Urban</td>
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
              <td style={{ border: "1px solid black" }}>Yes</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
              <td style={{ border: "1px solid black" }}><Button>View</Button></td>
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
              <th style={{ border: "1px solid black" }}>Falls Under Border District</th>
              <td style={{ border: "1px solid black" }}>Yes</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
              <td style={{ border: "1px solid black" }}><Button>View</Button></td>
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
              <td style={{ border: "1px solid black" }}>Yes</td>
              <td style={{ border: "1px solid black" }}>Yes</td>

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
              <td style={{ border: "1px solid black" }}>1.7556789</td>
              <td style={{ border: "1px solid black" }}>2.23456456</td>

            </tr>

          </tbody>
        </table>

      </div>





    </>
  );
};