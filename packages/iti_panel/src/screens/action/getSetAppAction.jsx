import { Modal, Row, Col, Card, Form, InputGroup, Button, Table, Form as BForm } from "react-bootstrap";
import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"

import { Stepper, Step } from "react-form-stepper";

import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";

import { TimeLine } from "../../screens/TimeLine";

import { createContext } from "react";
import { TimeLineContext } from "../../services/context";

export const GetSetAppAction = ({ row }) => {

  const [modalShow, setModalShow] = useState(false);

  console.log(row);

  return (
    <>
      <TimeLineContext.Provider value={{ row }} >
        <Button variant="success" onClick={() => setModalShow(true)}>
          Enter
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
              {row?.appId ?? "No App ID"} : {row?.proposedInstDetails?.pro_insti_details?.name_of_applicant_institute || "Not Filled"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TimeLine rowData={row} />
          </Modal.Body>
          {/* <Modal.Footer>
          <Button>Action</Button>
        </Modal.Footer> */}
        </Modal>
      </TimeLineContext.Provider>

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

