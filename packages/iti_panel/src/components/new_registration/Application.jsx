import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";

import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import { TimeLine } from "../TimeLine/TimeLine";

import {SAVE_APP_CATEGORY} from "../../constants";
const Start = () => {
  const regCategory = useSelector((state) => state.reg.regCategory);

  useEffect(() => {
    console.log(regCategory);
  }, [regCategory]);

  return (
    <Fragment>
      <br></br>
      {!regCategory ? (
        <Card className="custom-card">
          <Card.Header>
            <div className="card-title">New Application</div>
          </Card.Header>
          <Card.Body>
            <h6 className="card-title fw-semibold">Some Heading</h6>
            <p className="card-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <SelectCategory />
          </Card.Body>
        </Card>
      ) : regCategory ? (
        <TimeLine />
      ) : (
        "<h2>Deepak</h2>"
      )}
    </Fragment>
  );
};

function SelectCategoryModal(props) {
  const AffiliationCategory = [
    { name: "Category1", type: "Category1" },
    { name: "Category2", type: "Category2" },
    { name: "Category3", type: "Category3" },
    { name: "Category4", type: "Category4" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(2); // Default selected index
  const regCategory = useSelector((state) => state.reg.regCategory);
  const dispatch = useDispatch();
  const saveRegCat = () => {
    dispatch({ type: "set_reg_cat", payload: "true" });
    dispatch({type:SAVE_APP_CATEGORY, payload:{appCategory:selectedIndex}});
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h6">
          Select Affiliation Category {regCategory}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-1">
        <ListGroup>
          {AffiliationCategory.map((item, index) => (
            <ListGroup.Item
              className="d-flex align-items-center"
              key={index}
              onClick={() => setSelectedIndex(index)}
              style={{ cursor: "pointer" }}
            >
              <Form.Check
                type="radio"
                id={`custom-switch${index + 1}`}
                name="radioGroup"
                className="me-2 fw-semibold"
                checked={selectedIndex === index}
                onChange={() => setSelectedIndex(index)}
              />
              {item.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveRegCat}>Select</Button>
      </Modal.Footer>
    </Modal>
  );
}

function SelectCategory() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Button size="lg" variant="success" onClick={() => setModalShow(true)}>
        Start New Application
      </Button>
      <SelectCategoryModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Start;
