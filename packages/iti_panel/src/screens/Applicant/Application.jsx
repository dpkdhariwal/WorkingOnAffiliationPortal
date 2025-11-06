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

import { SAVE_APP_CATEGORY } from "affserver";
import { AffiliationCategory } from "affserver";
import { addNewApp } from "../../db/appList";

import * as C from "affserver";
import TestSelectCategoryModal from "@/components/new_registration/test";
import Swal from "sweetalert2";


import * as ap from "@/services/applicant/index";
import Pageheader from "@/layouts/Pageheader";


const Start = () => {
  const regCategory = useSelector((state) => state.reg.regCategory);
  const appCat = useSelector((state) => state.appCat);
  const navigate = useNavigate();
  console.log(appCat.selected);

  // useEffect(() => {
  //   if (appCat.selected === true) {
  //     navigate("/dashboard/new_registration");
  //   }
  //   console.log(regCategory, appCat.selected);
  // }, [regCategory]);

  return (
    <Fragment>
      <br></br>
      {/* {!regCategory ? (
        <Card className="custom-card">
          <Card.Header>
            <div className="card-title">New Application</div>
          </Card.Header>
          <Card.Body>
            <p className="card-text">
              <div>
                <p style={{ marginBlockEnd: '0px' }}>As per the Affiliation Norms 2025, the accreditation process has been streamlined into two key stages. The following section will elaborate on each step of accreditation process in detail.</p>
                <b>Stage-I  Application:</b><p style={{ marginBlockEnd: '0px' }} >Stage-I application of the affiliation process pertains to the submission of preliminary details by the applicant for establishing a new ITI. This stage involves providing essential information about the applicant entity, proposed institute details, land particulars, and the trades/units for which affiliation is sought.</p>
                <b>Stage-II  Application:</b><p>Upon receipt of the No Objection Certificate (NOC), the applicant shall proceed to Stage-II. In Stage-II, the applicant shall submit detailed information regarding civil infrastructure, electricity connection, and machinery.</p>
              </div>
            </p>
            <SelectCategory />
          </Card.Body>
        </Card>
      ) : regCategory ? (
        <TimeLine />
      ) : (
        "<h2>Deepak</h2>"
      )} */}

      <Card className="custom-card">
        <Card.Header>
          <div className="card-title">New Application</div>
        </Card.Header>
        <Card.Body>
          <p className="card-text">
            <div>
              <p style={{ marginBlockEnd: '0px' }}>As per the Affiliation Norms 2025, the accreditation process has been streamlined into two key stages. The following section will elaborate on each step of accreditation process in detail.</p>
              <b>Stage-I  Application:</b><p style={{ marginBlockEnd: '0px' }} >Stage-I application of the affiliation process pertains to the submission of preliminary details by the applicant for establishing a new ITI. This stage involves providing essential information about the applicant entity, proposed institute details, land particulars, and the trades/units for which affiliation is sought.</p>
              <b>Stage-II  Application:</b><p>Upon receipt of the No Objection Certificate (NOC), the applicant shall proceed to Stage-II. In Stage-II, the applicant shall submit detailed information regarding civil infrastructure, electricity connection, and machinery.</p>
            </div>
          </p>
          <SelectCategory />
        </Card.Body>
      </Card>
    </Fragment>
  );
};

const SelectCategoryModal = (props) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(2);
  const regCategory = useSelector((state) => state.reg.regCategory);
  const appCat = useSelector((state) => state.appCat);
  const authUser = useSelector((state) => state.loginUserReducer);

  // if (appCat.selected === true) {
  //   navigate("/dashboard/new_registration");
  // }
  console.log(Object.keys(appCat.cat).length);
  const dispatch = useDispatch();

  const formikRef = useRef();

  const saveRegCat = async (values) => {
    const { aff_category, aff_sub_category } = values;
    const obj = { cat: aff_category, sub_cat: aff_sub_category };
    const appId = Date.now() + Math.random();

    // dispatch({ type: "SAVE_APP_CATEGORY", payload: obj, });
    // navigate(`/dashboard/new_registration?appId=${appId}`);
    try {
      // Show loading indicator while waiting for the API request
      Swal.fire({
        title: "Processing...",
        text: "Please wait while we process your request.",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(); // Show the loading spinner
        }
      });

      // Make API call
      const resp = await ap.startNewApp(values);
      const { data } = resp;
      navigate(`/dashboard/new_registration?appId=${data.appId}`);

      Swal.close(); // Close the loading spinner once the request is done

      // Show success alert after saving
      // Swal.fire({
      //   icon: "success",
      //   title: "Goto Form ",
      //   text: "Now You Can Fill the Stage-I Form",
      //   confirmButtonText: "OK",
      //   allowOutsideClick: false,
      //   didOpen: () => {
      //     const swalContainer = Swal.getContainer();
      //     const swalPopup = Swal.getPopup();
      //     const confirmButton = Swal.getConfirmButton(); // Access the confirm button

      //     // Set z-index for modal backdrop and popup content
      //     if (swalContainer) swalContainer.style.zIndex = "10000";
      //     if (swalPopup) swalPopup.style.zIndex = "10001";

      //     // Ensure the confirm button is above other elements
      //     if (confirmButton) confirmButton.style.zIndex = "10002"; // Make sure the button is on top
      //   },
      // }).then(async (next) => {
      //   if (next.isConfirmed) {
      //     const { data } = resp;
      //     navigate(`/dashboard/new_registration?appId=${data.appId}`);
      //   }
      // });

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "Select Affiliation Categories",
        text: error.message || "",
        showConfirmButton: true,
        confirmButtonText: "OK",
        allowOutsideClick: false,
        didOpen: () => {
          const swalContainer = Swal.getContainer();
          const swalPopup = Swal.getPopup();
          if (swalContainer) swalContainer.style.zIndex = "10000"; // overlay
          if (swalPopup) swalPopup.style.zIndex = "10001";        // popup
        }
      });
    }



  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={C.st1.categorySelection.initialValues}
      validationSchema={C.st1.categorySelection.valSchema}
      onSubmit={(values) => saveRegCat(values)}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (<Modal {...props} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title as="h6">
            Select Affiliation Category {regCategory}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
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
                      {category.master === "06" &&
                        values.aff_category === "06" &&
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
                                    type="checkbox"
                                    label={sub.name}
                                    name="aff_sub_category"
                                    value={sub.master}
                                    checked={values.aff_sub_category.includes(sub.master)}
                                    onChange={handleChange}
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
      )}
    </Formik>

  );
};

const SelectCategory = () => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  // const gotoApplicationForm = async () => {
  //   const appId = Date.now() + Math.random();
  //   navigate(`/dashboard/new_registration?appId=${appId}`);
  // };
  return (
    <div>
      {/* <Button size="lg" variant="success" onClick={() => gotoApplicationForm()}>
        Start New Application
      </Button> */}
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


const SelectAffCategoryForNewApp = (props) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(2);
  const regCategory = useSelector((state) => state.reg.regCategory);
  const appCat = useSelector((state) => state.appCat);
  const authUser = useSelector((state) => state.loginUserReducer);

  // if (appCat.selected === true) {
  //   navigate("/dashboard/new_registration");
  // }
  console.log(Object.keys(appCat.cat).length);
  const dispatch = useDispatch();

  const formikRef = useRef();

  const saveRegCat = async (values) => {
    const { aff_category, aff_sub_category } = values;
    const obj = { cat: aff_category, sub_cat: aff_sub_category };
    const appId = Date.now() + Math.random();

    // dispatch({ type: "SAVE_APP_CATEGORY", payload: obj, });
    // navigate(`/dashboard/new_registration?appId=${appId}`);
    try {
      // Show loading indicator while waiting for the API request
      Swal.fire({
        title: "Processing...",
        text: "Please wait while we process your request.",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(); // Show the loading spinner
        }
      });

      // Make API call
      const resp = await ap.startNewApp(values);
      const { data } = resp;
      navigate(`/dashboard/new_registration?appId=${data.appId}`);

      Swal.close(); // Close the loading spinner once the request is done

      // Show success alert after saving
      // Swal.fire({
      //   icon: "success",
      //   title: "Goto Form ",
      //   text: "Now You Can Fill the Stage-I Form",
      //   confirmButtonText: "OK",
      //   allowOutsideClick: false,
      //   didOpen: () => {
      //     const swalContainer = Swal.getContainer();
      //     const swalPopup = Swal.getPopup();
      //     const confirmButton = Swal.getConfirmButton(); // Access the confirm button

      //     // Set z-index for modal backdrop and popup content
      //     if (swalContainer) swalContainer.style.zIndex = "10000";
      //     if (swalPopup) swalPopup.style.zIndex = "10001";

      //     // Ensure the confirm button is above other elements
      //     if (confirmButton) confirmButton.style.zIndex = "10002"; // Make sure the button is on top
      //   },
      // }).then(async (next) => {
      //   if (next.isConfirmed) {
      //     const { data } = resp;
      //     navigate(`/dashboard/new_registration?appId=${data.appId}`);
      //   }
      // });

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "Select Affiliation Categories",
        text: error.message || "",
        showConfirmButton: true,
        confirmButtonText: "OK",
        allowOutsideClick: false,
        didOpen: () => {
          const swalContainer = Swal.getContainer();
          const swalPopup = Swal.getPopup();
          if (swalContainer) swalContainer.style.zIndex = "10000"; // overlay
          if (swalPopup) swalPopup.style.zIndex = "10001";        // popup
        }
      });
    }



  };

  return (
    <Fragment>
      {/* <Pageheader
        mainheading={`Application Category`}
        parentfolder="Dashboard"
        activepage="Select Affiliation Category"
      /> */}
      <br></br>
      <Card className="custom-card">
        <Card.Header>
          <div className="card-title">New Application</div>
        </Card.Header>
        <Card.Body>
          <p className="card-text">
            <div>
              <p style={{ marginBlockEnd: '0px' }}>As per the Affiliation Norms 2025, the accreditation process has been streamlined into two key stages. The following section will elaborate on each step of accreditation process in detail.</p>
              <b>Stage-I  Application:</b><p style={{ marginBlockEnd: '0px' }} >Stage-I application of the affiliation process pertains to the submission of preliminary details by the applicant for establishing a new ITI. This stage involves providing essential information about the applicant entity, proposed institute details, land particulars, and the trades/units for which affiliation is sought.</p>
              <b>Stage-II  Application:</b><p>Upon receipt of the No Objection Certificate (NOC), the applicant shall proceed to Stage-II. In Stage-II, the applicant shall submit detailed information regarding civil infrastructure, electricity connection, and machinery.</p>
            </div>
          </p>
        </Card.Body>
      </Card>

      <Formik
        innerRef={formikRef}
        initialValues={C.st1.categorySelection.initialValues}
        validationSchema={C.st1.categorySelection.valSchema}
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
          <Card className="custom-card" style={{ marginTop: "10px" }}>
            <Card.Header >
              <Card.Title as="h6">
                Select Affiliation Category
              </Card.Title>
            </Card.Header>
            <Card.Body className="p-2">
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
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
                        {category.master === "06" &&
                          values.aff_category === "06" &&
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
                                      type="checkbox"
                                      label={sub.name}
                                      name="aff_sub_category"
                                      value={sub.master}
                                      checked={values.aff_sub_category.includes(sub.master)}
                                      onChange={handleChange}
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
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end btn-rounded">
              <Button
                size="lg"
                variant="primary"
                onClick={() => formikRef.current?.submitForm()}>
                Continue for Stage-I
              </Button>
            </Card.Footer>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

export { Start, SelectCategoryModal, SelectCategory, SelectAffCategoryForNewApp };
