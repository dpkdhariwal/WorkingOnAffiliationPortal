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


    let result, user;
    try {
      SwalManager.showLoading("Authenticating...");
      result = await loginByAuth(userid, password);
      console.log(result.data.info.userType);
      user = result.data;
      // console.log(result);
      dispatch({ type: "USER_SIGNED_IN_SUCCESS", payload: { ...result.data, userType: result.data.info.userType } });
      toast.success("Logged in successfully", { position: "top-right", });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //    const confirmed = await SwalManager.success("Logged In");
      // if (!confirmed) return;
      switch (user.userType) {
        case "applicant":
          if (user?.total_applications == 0) {
            navigate("/dashboard/Application/");
          } else {
            navigate("/dashboard/");
          }
          break;
        case "rdsde":
          navigate("/dashboard/rdsde");
          break;
        case 'state_admin':
          navigate("/dashboard/state_admin");
          break;
        default:
          navigate("/dashboard/");
          break;
      }
    } catch (error) {
      let errorMessage = "Something went wrong";

      if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.msg) {
        errorMessage = error.msg;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.data?.message) {
        // for axios errors
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage, { position: "top-right" });
    } finally {
      SwalManager.hide();
    }


    // setSampleUser();
    // getSetUserRoles();
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




    // const user = sampleUserList.find(
    //   (u) => u.email === userid && u.password === password
    // );

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
    // } else {
    //   toast.error("User Not Found", {
    //     position: "top-right",
    //   });
    // }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    console.log(userType);
  }, []);

  return (
    <Fragment>
      <div
        className={` animate__animated ${animation}`}
      >
        <Card className="mb-0">
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
        </Card>
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
