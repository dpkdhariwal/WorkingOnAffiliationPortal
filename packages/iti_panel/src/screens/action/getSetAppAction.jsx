import { Modal, Row, Col, Card, Form, InputGroup, Button, Table, Form as BForm } from "react-bootstrap";
import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"

import { Stepper, Step } from "react-form-stepper";

import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";

import { TimeLine } from "../../screens/TimeLine";

export const GetSetAppAction = () => {

  const [modalShow, setModalShow] = useState(false);

  const [emailTimer, setEmailTimer] = useState(0);

  const [emailOtpVisible, setEmailOtpVisible] = useState(false);
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
  const [emailOtpComplete, setEmailOtpComplete] = useState(false);
  const emailOtpRefs = useRef([]);


  // console.log(row.app_status_awaiting);

  //  const AppliInfo = useSelector((state) => state.AppliInfo);
  //   console.log(AppliInfo);

  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
        status
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" as="h6">
            XYZ : RANI KAMLAWATI PVT ITI Delhi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TimeLine />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button>Action</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

// export const GetSetAppAction_not_in_use = ({data, row}) => {
//   const [modalShow, setModalShow] = useState(false);
//   console.log(row);
//   return (
//     <div>
//       <Button variant="success" onClick={() => setModalShow(true)}>
//         Save & Next
//       </Button>
//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </div>
//   )
// }

