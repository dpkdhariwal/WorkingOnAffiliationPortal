import { Fragment, useEffect, useState, useRef } from "react";

import { Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ALLImages from "../../common/Imagedata";
import { Formik, Field, FieldArray } from "formik";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as formik from "formik";
import * as yup from "yup";
import { Provider } from "react-redux";
import Store from "../../common/redux/Store";
const Signin = () => {
  const navigate = useNavigate(); // initialize navigation

  const { Formik } = formik;
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  // const dispatch = useDispatch();
  // const userTyp = useSelector((state) => state.AuthUser.userTyp);

  const LoginNow = (values) => {
    const { userid, password } = values;
    console.log(userid, password);
    switch (userid) {
      case "applicant@gmail.com":
        localStorage.setItem("userId", userid);
        localStorage.setItem("userType", "applicant");
        break;
      case "assessor@gmail.com":
        localStorage.setItem("userId", userid);
        localStorage.setItem("userType", "state_assessor");
        break;
      default:
        break;
    }

    // Redirect to dashboard
    navigate("/dashboard/dashboard/");
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    console.log(userType);
  }, []);

  return (
    <Fragment>
      <div className="page main-signin-wrapper">
        <Row className="signpages text-center">
          <Col md={12}>
            <Card className="mb-0">
              <Row className="row-sm">
                <Col
                  lg={6}
                  xl={5}
                  className="d-none d-lg-block text-center bg-primary details"
                >
                  <div className="mt-5 pt-4 p-2 position-absolute">
                    <Link
                      to={`${import.meta.env.BASE_URL}dashboard/dashboard/`}
                    >
                      <img
                        src={ALLImages("logo3")}
                        className="header-brand-img mb-4"
                        alt="logo"
                      />
                    </Link>
                    <div className="clearfix"></div>
                    <img
                      src={ALLImages("svg12")}
                      className="ht-100 mb-0"
                      alt="user"
                    />
                    <h5 className="mt-4">Create Your Account</h5>
                    <span className="text-white-6 fs-13 mb-5 mt-xl-0">
                      Signup to create, discover and connect with the global
                      community
                    </span>
                  </div>
                </Col>
                <Col lg={6} xl={7} xs={12} sm={12} className="login_form ">
                  <div className="main-container container-fluid">
                    <Row className="row-sm">
                      <Card.Body className="mt-2 mb-2">
                        <img
                          src={ALLImages("logo3")}
                          className="d-lg-none header-brand-img text-start float-start mb-4 error-logo-light"
                          alt="logo"
                        />
                        <img
                          src={ALLImages("logo2")}
                          className="d-lg-none header-brand-img text-start float-start mb-4 error-logo"
                          alt="logo"
                        />
                        <div className="clearfix"></div>
                        <Formik
                          validationSchema={yup.object().shape({
                            userid: yup
                              .string()
                              .required("Enter Correct User ID or Email")
                              .oneOf(
                                ["applicant@gmail.com", "assessor@gmail.com"],
                                "Only applicant@gmail.com or assessor@gmail.com is allowed"
                              ),
                            password: yup
                              .string()
                              .required("Enter Correct Password"),
                          })}
                          validateOnChange
                          onSubmit={(values) => {
                            setFormData(values);
                            setFormSubmited(true);
                            LoginNow(values);
                          }}
                          initialValues={{
                            userid: "",
                            password: "",
                          }}
                        >
                          {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            touched,
                            handleBlur,
                          }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                              <h5 className="text-start mb-2">
                                Signin to Your Account
                              </h5>
                              <p className="mb-4 text-muted fs-13 ms-0 text-start">
                                Signin to create, discover and connect with the
                                global community
                              </p>

                              <Form.Group className="text-start form-group mb-3">
                                <Form.Label>Email / User ID</Form.Label>
                                <Form.Control
                                  name="userid"
                                  placeholder="Enter your email or User ID"
                                  type="text"
                                  value={values.userid}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={touched.userid && !!errors.userid}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.userid}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group className="text-start form-group mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                  name="password"
                                  placeholder="Enter your password"
                                  type="password"
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={
                                    touched.password && !!errors.password
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.password}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <div className="d-grid">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Sign In
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>

                        <div className="text-start mt-5 ms-0">
                          <div className="mb-1">
                            <Link
                              to={`${
                                import.meta.env.BASE_URL
                              }custompages/resetpassword/`}
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <div>Don't have an account? <Link to={`${import.meta.env.BASE_URL}Signup`}>Register Here</Link></div>
                        </div>
                      </Card.Body>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Signin;
