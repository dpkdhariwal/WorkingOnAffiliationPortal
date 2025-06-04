import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";

const CategoryOfApplicantOrganization = () => {
  const { Formik } = formik;
  const formRef = useRef();
  const [isHidden, setisHidden] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Yup validation schema
  const schema = yup.object().shape({
    category: yup.string().required("Please select a category"),
  });

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Triggers Formik submit
    }
  };

  const updateQuery = () => {
    navigate("?stage=1&form_id=Basic Details of Applicant  Organization");
  };

  const stageI1_info = useSelector((state) => state.theme.new_registration);

  useEffect(() => {
    console.log("stageI1_info", stageI1_info);
  }, [stageI1_info]); // rerun whenever query parameters change

  return (
    <Fragment>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          setisHidden(false); // Show "Next" button after submission
          let timerInterval;
          Swal.fire({
            title: "Saving on Local Storage",
            html: "Please wait...",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer()?.querySelector("b");
              if (b) {
                timerInterval = setInterval(() => {
                  const remainingTime = Swal.getTimerLeft();
                  if (remainingTime) {
                    b.textContent = remainingTime.toString();
                  }
                }, 100);
              }
              dispatch({ type: "setCetegory", payload: values });
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          })
            .then((result) => {
              // throw new Error("Error saving to local storage");
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                // Do something when the timer expires
              }
              navigate(
                "?stage=1&form_id=Basic Details of Applicant  Organization"
              );
            })
            .catch((error) => {
              console.error("Error saving to local storage:", error);
            });
        }}
        initialValues={{
          category:
            stageI1_info.stage_I.section_category_of_applicant_organization
              .category_of_applicant_organization,
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Card className="custom-card">
              <Card.Header>
                <div className="card-title">
                  Category of Applicant Organization
                </div>
              </Card.Header>

              <Card.Body>
                <Row className="mb-3">
                {[
                      "Society / Trust",
                      "Private Limited Company",
                      "Public Limited Company",
                      "Sole Proprietor",
                      "Private Institution / Individual",
                      "Public Sector Undertaking",
                      "Central / State Government / Union Territory Administration",
                    ].map(
                      (label, index) => (
                        console.log("label", label),
                        console.log(
                          "selected",
                          stageI1_info.stage_I
                            .section_category_of_applicant_organization
                            .category_of_applicant_organization
                        ),
                        (
                          <Form.Group as={Col} md="3">
                            <Form.Check
                              key={index}
                              type="radio"
                              label={label}
                              name="category"
                              value={label}
                              onChange={handleChange}
                              isInvalid={touched.category && !!errors.category}
                              checked={values.category === label}
                              // className="text-secondary" // makes label appear in secondary color
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="d-block"
                            >
                              {errors.category}
                            </Form.Control.Feedback>
                          </Form.Group>
                        )
                      )
                    )}
                </Row>
              </Card.Body>

              <div className="card-footer">
                <div className="d-flex justify-content-between mb-3">
                  <div className="p-2">
                    <Button
                      size="lg"
                      variant="primary"
                      className="rounded-pill btn-wave"
                      onClick={handleExternalSubmit}
                    >
                      Save Draft
                    </Button>
                  </div>
                  {!isHidden && (
                    <div className="p-2">
                      <Button
                        size="lg"
                        variant="secondary"
                        className="rounded-pill btn-wave"
                        onClick={updateQuery}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default CategoryOfApplicantOrganization;
