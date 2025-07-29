import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { UPDATE_LAND_INFO } from "../../../../constants";

import { land_info_yupObject } from "../../../../reducers/newAppReducer";


import { setInstLandDetails } from "../../../../db/appList";
import { useLocation } from "react-router-dom";

const DetailsOfTheLandToBeUsedForTheITI = ({ setActive }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  
  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();
  const formikRef = useRef();
  const land_info_reducer = useSelector((state) => state.land_info_reducer);
  const reg = useSelector((state) => state.reg);

  const submit = (values) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the form data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed – now show loading or save directly
        Swal.fire({
          title: "Saving...",
          didOpen: () => {
            // Swal.showLoading();
            // dispatch({ type: UPDATE_LAND_INFO, payload: values });
            Swal.showLoading();
            dispatch({ type: UPDATE_LAND_INFO, payload: values });
            dispatch({ type: "set_filled_step", payload: { step: 3 }, });
            dispatch({ type: "reg_set_active_step", payload: { step: 4 } });
            setActive(reg.steps[4]);
            let result = setInstLandDetails(values, appId);
            console.log(result);
            Swal.close();
          },
        });
      } else {
        console.log("User cancelled save");
      }
    });
  };

  return (
    <Fragment>
      <Formik
        innerRef={formikRef}
        validateOnChange={true}
        initialValues={land_info_reducer}
        validationSchema={yup.object().shape(land_info_yupObject)}
        onSubmit={(values) => { submit(values) }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Card className="custom-card shadow">
            <Card.Header>
              <div className="card-title" style={{ textTransform: "none" }}>
                <h4>Details of Land</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Form ref={formRef2} onSubmit={handleSubmit} validated>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>
                      Possession of Land<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label="Owned"
                        name="possession_of_land"
                        value="owned"
                        onChange={handleChange}
                        checked={values.possession_of_land === "owned"}
                        isInvalid={touched.possession_of_land && !!errors.possession_of_land}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="Leased"
                        name="possession_of_land"
                        value="leased"
                        onChange={handleChange}
                        checked={values.possession_of_land === "leased"}
                        isInvalid={touched.possession_of_land && !!errors.possession_of_land}
                      />
                    </div>
                    {touched.possession_of_land && errors.possession_of_land && (
                      <Form.Control.Feedback
                        type="invalid"
                        className="d-block"
                      >
                        {errors.possession_of_land}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Row>

                {values.possession_of_land === "owned" ? (<Row className="mb-3">
                  <Col md="12">
                    <Card className="border border-info custom-card">
                      <Card.Header>
                        <div
                          className="card-title"
                          style={{ textTransform: "none" }}
                        >
                          Owned Land
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Land Owner’s Name
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Land Owner’s Name"
                              name="land_owner_name"
                              onChange={handleChange}
                              value={values.land_owner_name}
                              isInvalid={touched.land_owner_name && !!errors.land_owner_name}
                            />
                            {touched.land_owner_name && errors.land_owner_name && (
                              <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                              >
                                {errors.land_owner_name}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Land Registration Number
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Land Registration Number"
                              name="land_registration_number"
                              onChange={handleChange}
                              value={values.land_registration_number}
                              isInvalid={touched.land_registration_number && !!errors.land_registration_number}
                            />
                            {touched.land_registration_number && errors.land_registration_number && (
                              <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                              >
                                {errors.land_registration_number}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>) : values.possession_of_land === "leased" ? (<Row className="mb-3">
                  <Col md="12">
                    <Card className="border border-info custom-card">
                      <Card.Header>
                        <div
                          className="card-title"
                          style={{ textTransform: "none" }}
                        >
                          Leased Land
                          <div>
                            <p style={{ "font-weight": "400" }}>
                              (For leased land, the lease deed should be
                              registered between the lessor and lessee for a
                              minimum period of six years from the date of the
                              application.)
                            </p>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Name of Lessor
                              <span style={{ color: "red" }}>
                                *{" "}
                                <i
                                  className="fe fe-help-circle"
                                  style={{
                                    cursor: "pointer",
                                    color: "#6c757d",
                                  }}
                                  title="The lessor is the person or party who owns an asset or property and grants the right to use it to another party under a lease agreement."
                                  onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                ></i>
                              </span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter Name of Lessor"
                              name="name_of_lessor"
                              onChange={handleChange}
                              value={values.name_of_lessor}
                              isInvalid={touched.name_of_lessor && !!errors.name_of_lessor}
                            />
                            {touched.name_of_lessor && errors.name_of_lessor && (
                              <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                              >
                                {errors.name_of_lessor}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Name of Lessee
                              <span style={{ color: "red" }}>
                                *
                                <i
                                  className="fe fe-help-circle"
                                  style={{
                                    cursor: "pointer",
                                    color: "#6c757d",
                                  }}
                                  title="The lessee is the person or party who receives the right to use an asset or property from the lessor in exchange for payment, usually called rent, as per the term and condition defined in a lease agreement."
                                  onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                ></i>
                              </span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter Name of Lessee"
                              name="name_of_lessee"
                              onChange={handleChange}
                              value={values.name_of_lessee}
                              isInvalid={touched.name_of_lessee && !!errors.name_of_lessee}
                            />
                            {touched.name_of_lessee && errors.name_of_lessee && (
                              <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                              >
                                {errors.name_of_lessee}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Lease Deed Numbe
                              <span style={{ color: "red" }}>
                                *
                                <i
                                  className="fe fe-help-circle"
                                  style={{
                                    cursor: "pointer",
                                    color: "#6c757d",
                                  }}
                                  title=" It refers to the official registration or reference number assigned by
the registering authority to a lease deed, serving as proof of the legal validity and record
of the lease agreement between the property owner and the lessee."
                                  onClick={() => alert(`Info about About`)} // Replace with your actual logic
                                ></i>
                              </span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Lease Deed Number"
                              name="lease_deed_number"
                              onChange={handleChange}
                              value={values.lease_deed_number}
                              isInvalid={touched.lease_deed_number && !!errors.lease_deed_number}
                            />
                            {touched.lease_deed_number && errors.lease_deed_number && (
                              <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                              >
                                {errors.lease_deed_number}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              Date of Commencement
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="date"
                              placeholder="Date of Commencement"
                              name="date_of_commencement"
                              onChange={handleChange}
                              value={values.date_of_commencement}
                              isInvalid={touched.date_of_commencement && !!errors.date_of_commencement}
                            />
                            {touched.date_of_commencement && errors.date_of_commencement && (
                              <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                              >
                                {errors.date_of_commencement}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom03"
                          >
                            <Form.Label>
                              Date of Expiry
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="date"
                              placeholder="Date of Expiry"
                              name="date_of_expiry"
                              onChange={handleChange}
                              value={values.date_of_expiry}
                              isInvalid={touched.date_of_expiry && !!errors.date_of_expiry}
                            />
                            {touched.date_of_expiry && errors.date_of_expiry && (
                              <Form.Control.Feedback
                                type="invalid"
                                className="d-block"
                              >
                                {errors.date_of_expiry}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>) : ''}

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>
                      Land Area (In Square Metres)
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Land Area (in Square Metres)"
                        name="land_area_in_square_metres"
                        onChange={handleChange}
                        value={values.land_area_in_square_metres}
                        isInvalid={touched.land_area_in_square_metres && !!errors.land_area_in_square_metres}
                      />
                      <Button variant="outline-secondary">
                        In Square Metres
                      </Button>
                    </InputGroup>
                    {touched.land_area_in_square_metres && errors.land_area_in_square_metres && (
                      <Form.Control.Feedback
                        type="invalid"
                        className="d-block"
                      >
                        {errors.land_area_in_square_metres}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between mb-3">
                <Button className="p-2" variant="success" onClick={() => formikRef.current?.submitForm()} >Save & Continue </Button>
              </div>
            </Card.Footer>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

export default DetailsOfTheLandToBeUsedForTheITI;
