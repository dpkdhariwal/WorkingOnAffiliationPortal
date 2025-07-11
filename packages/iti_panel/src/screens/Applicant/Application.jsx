import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  Modal,
  ListGroup,
  Alert,
} from "react-bootstrap";

import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import { TimeLine } from "../../components/TimeLine/TimeLine";
import * as yup from "yup";
import { Formik, Field, FieldArray } from "formik";

import { SAVE_APP_CATEGORY } from "../../constants";
const Start = () => {
  const regCategory = useSelector((state) => state.reg.regCategory);
  const appCat = useSelector((state) => state.appCat);
  const navigate = useNavigate();
  console.log(appCat.selected);

  useEffect(() => {
    if (appCat.selected === true) {
      navigate("/dashboard/new_registration");
    }
    console.log(regCategory, appCat.selected);
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

// import { useRef, useState } from "react";
// import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import { Formik } from "formik";
// import * as yup from "yup";
// import { useSelector, useDispatch } from "react-redux";

const SelectCategoryModal = (props) => {
  const AffiliationCategory = [
    { name: "Application for Establishment of New ITIs", master: "01" },
    {
      name: "Application for opening Mini Skill Training Institute",
      master: "02",
    },
    {
      name: "Establishment of New Age ITIs or Adoption of existing ITIs by industry entities",
      master: "03",
    },
    {
      name: "Application for Existing ITIs",
      master: "04",
      subCate: [
        { name: "Addition of New Trades/Units", master: "01" },
        { name: "Name Change of the ITI", master: "02" },
        { name: "Shifting/Relocation or Merger of ITIs", master: "03" },
        {
          name: "SCVT to NCVET conversion of Trades (for existing Government ITIs)",
          master: "04",
        },
        { name: "Renewal of Affiliation", master: "05" },
        {
          name: "Affiliation under the Dual System of Training (DST)",
          master: "06",
        },
        { name: "Surrender of Trade/Units", master: "07" },
      ],
    },
  ];
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(2);
  const regCategory = useSelector((state) => state.reg.regCategory);
  const appCat = useSelector((state) => state.appCat);
  // if (appCat.selected === true) {
  //   navigate("/dashboard/new_registration");
  // }

  console.log(Object.keys(appCat.cat).length);
  const dispatch = useDispatch();

  const formikRef = useRef();

  const saveRegCat = (values) => {
    const { aff_category, aff_sub_category } = values;
    dispatch({
      type: "SAVE_APP_CATEGORY",
      payload: { cat: aff_category, sub_cat: aff_sub_category },
    });
    navigate("/dashboard/new_registration");
  };

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title as="h6">
          Select Affiliation Category {regCategory}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-2">
        <Formik
          innerRef={formikRef}
          initialValues={{ aff_category: "", aff_sub_category: "" }}
          validationSchema={yup.object().shape({
            aff_category: yup.string().required("Select Affiliation Category"),
            aff_sub_category: yup.string().when("aff_category", {
              is: "04", // 🔄 change to "no" since category and comments are required when it's "no"
              then: () => yup.string().required("Please select a Sub category"),
              otherwise: () => yup.string().notRequired(),
            }),
          })}
          onSubmit={(values) => saveRegCat(values)}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              {/* 🔔 Alert box for validation errors */}
              {/* {Object.keys(errors).length > 0 &&
                Object.keys(touched).length > 0 && (
                  <Alert variant="danger">
                    Please fix the errors below before submitting the form.
                  </Alert>
                )} */}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <div>
                    <ListGroup as="ul">
                      {AffiliationCategory.map((category, index) => (
                        <ListGroup.Item
                          as="li"
                          key={category.master}
                          style={{ padding: "5px" }}
                        >
                          <Form.Group>
                            <Form.Check
                              inline
                              type="radio"
                              label={`${category.name}`}
                              name="aff_category"
                              value={category.master}
                              onChange={handleChange}
                              checked={values.aff_category === category.master}
                              isInvalid={
                                touched.aff_category && !!errors.aff_category
                              }
                            />
                          </Form.Group>
                          {category.master === "04" &&
                            values.aff_category === "04" &&
                            category.subCate && (
                              <ListGroup
                                as="ul"
                                className="ms-4 mt-2"
                                style={{
                                  listStyleType: "none",
                                  paddingLeft: "1rem",
                                }}
                              >
                                {category.subCate.map((sub, subIndex) => (
                                  <ListGroup.Item
                                    as="li"
                                    key={subIndex}
                                    style={{ padding: "5px" }}
                                  >
                                    <Form.Group>
                                      <Form.Check
                                        inline
                                        type="radio"
                                        label={sub.name}
                                        name="aff_sub_category"
                                        value={sub.master}
                                        onChange={handleChange}
                                        checked={
                                          values.aff_sub_category === sub.master
                                        }
                                        isInvalid={
                                          touched.aff_sub_category &&
                                          !!errors.aff_sub_category
                                        }
                                      />
                                    </Form.Group>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            )}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>

                  <div style={{ marginTop: "5px" }}>
                    {touched.aff_category && errors.aff_category && (
                      <Alert variant="danger">{errors.aff_category}</Alert>
                    )}
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    {touched.aff_sub_category && errors.aff_sub_category && (
                      <Alert variant="danger">{errors.aff_sub_category}</Alert>
                    )}
                  </div>
                </Row>
              </Form>
            </>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => formikRef.current?.submitForm()}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const SelectCategory = () => {
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
};

export { Start, SelectCategoryModal, SelectCategory };
