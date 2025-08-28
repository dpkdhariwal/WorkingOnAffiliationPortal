import { Fragment, useEffect, useState, useRef } from "react";

import { Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ALLImages from "../../common/Imagedata";
import { Formik, Field, FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as formik from "formik";
import * as yup from "yup";

import { tryLogin } from "../../services/index";
import { loginUser } from "../../actions/userAuth";
import toast, { Toaster } from "react-hot-toast";
import { setSampleUser, getSetUserRoles, getUserByCredentials } from "../../db/users";
import { loginByAuth } from "../../services/auth/login";
import SwalManager from "../../common/SwalManager";

const Signin = () => {

  const navigate = useNavigate(); // initialize navigation

  const { Formik } = formik;
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const dispatch = useDispatch();
  // const userTyp = useSelector((state) => state.AuthUser.userTyp);
  const [showOtp, setShowOtp] = useState(false);
  const [animation, setAnimation] = useState("animate__flipInY");

  const sampleUserList = [
    {
      userType: "applicant",
      role: ["applicant"],
      email: "applicant@gmail.com",
      password: "123",
      total_applications: 0,
    },
    {
      userType: "rdsde",
      role: ["rdsde"],
      email: "rdsde@gmail.com",
      password: "123",
    },
    {
      userType: "dgt",
      role: ["dgt"],
      email: "dgt@gmail.com",
      password: "123",
    },
    {
      userType: "state_admin",
      role: ["state_admin"],
      email: "state_admin@gmail.com",
      password: "123",
    },
    {
      userType: "state_assessor",
      role: ["state_assessor"],
      email: "state_assessor@gmail.com",
      password: "123",
    },
    {
      userType: "state_assessor",
      role: ["test"],
      email: "vivek@gmail.com",
      password: "123",
    },
  ];

  const LoginNow = async (values) => {
    const { userid, password } = values;
    let result;
    try {
      SwalManager.showLoading("Saving...");
      result = await loginByAuth(userid, password);
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.msg, { position: "top-right", });
    } finally {
      SwalManager.hide();
    }


    setSampleUser();
    getSetUserRoles();
    // const user = await getUserByCredentials(userid, password);

    // if (user) {
    //   dispatch({ type: "USER_SIGNED_IN_SUCCESS", payload: user });

    //   toast.success("Logged in successfully", {
    //     position: "top-right",
    //   });
    //   switch (user.userType) {
    //     case "applicant":
    //       if (user.total_applications == 0) {
    //         navigate("/dashboard/Application/");
    //       } else {
    //         navigate("/dashboard/");
    //       }
    //       break;
    //     case "rdsde":
    //       navigate("/dashboard/rdsde");
    //       break;
    //     case 'state_admin':
    //       navigate("/dashboard/state_admin");
    //       break;
    //     default:
    //       navigate("/dashboard/");
    //       break;
    //   }
    // }
    // else {
    //   alert("Invalid User:");
    // }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    console.log(userType);
  }, []);

  return (
    <Fragment>
      <div
        className={`page main-signin-wrapper animate__animated ${animation}`}
      >
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
                                [
                                  "applicant@gmail.com",
                                  "dgt@gmail.com",
                                  "state_admin@gmail.com",
                                  "state_assessor@gmail.com",
                                  "vivek@gmail.com",
                                  "rdsde@gmail.com"
                                ],
                                "Only applicant@gmail.com OR dgt@gmail.com OR state_admin@gmail.com OR state_assessor@gmail.com OR rdsde@gmail.com OR vivek@gmail.com is allowed"
                              )
                            ,
                            password: yup
                              .string()
                              .required("Enter Correct Password"),
                          })}
                          validateOnChange
                          onSubmit={async (values, { setSubmitting }) => {
                            try {
                              // Simulate login request
                              await new Promise((resolve) => setTimeout(resolve, 2000));
                              setFormData(values);
                              setFormSubmited(true);
                              await LoginNow(values);
                              console.log("Logged in:", values);
                            } catch (err) {
                              console.error(err);
                            } finally {
                              setSubmitting(false); // Re-enable after request finished
                            }
                          }}
                          initialValues={{
                            userid: "",
                            password: "",
                          }}
                          validateOnBlur={true} // ✅ validate only when blurred
                        >
                          {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            touched,
                            handleBlur,
                            isSubmitting
                          }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                              <h5 className="text-start mb-2">
                                DGT Affiliation 2025
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
                                  disabled={isSubmitting}

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
                                  disabled={isSubmitting}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.password}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <div className="d-grid">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  disabled={isSubmitting}

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
                              to={`${import.meta.env.BASE_URL}Forgetpassword/`}
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <div>
                            Don't have an account?{" "}
                            <Link to={`${import.meta.env.BASE_URL}Signup`}>
                              Register Here
                            </Link>
                          </div>
                        </div>
                      </Card.Body>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Toaster
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "rgb(var(--light-rgb))",
              color: "var(--default-text-color)",
              border: "1px solid var(--default-border)",
            },

            // Default options for specific types
            success: {
              duration: 3000,
            },
          }}
        />
      </div>
    </Fragment>
  );
};

export default Signin;
