import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import BasicDetailsofApplicantOrganization from "./BasicDetailsofApplicantOrganization";
import DetailsOfTheProposedInstitute from "./DetailsOfTheProposedInstitute";
import DetailsOfTheLandToBeUsedForTheITI from "./DetailsOfTheLandToBeUsedForTheITI";
import DetailsOfDocumentsToBeUploaded from "./DetailsOfDocumentsToBeUploaded";

const PreviewOfApplication = () => {
  const [isHidden, setisHidden] = useState([true]);

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  //Custom Validation
  const stageI1_info = useSelector((state) => state.new_registration);
  // useEffect(() => { console.log("stageI1_info", stageI1_info); }, []);

  const handleExternalSubmit = () => {
    if (formRef2.current) {
      console.log(formRef2.current);
      formRef2.current.requestSubmit(); // Better than .submit() — triggers onSubmit properly
    }
  };

  const navigate = useNavigate();
  // const updateQuery = () => { navigate("?stage=1&form_id=Basic Details of Applicant  Organization"); };

  const gotoNext = () => {
    console.log("gotoNext called");
    navigate("?stage=1&form_id=Details of the Proposed Institute");
  };

  return (
    <Fragment>
      <Formik
        validationSchema={yup.object().shape({
          category: yup.string().required("Please select a category"),
          Is_the_applicant_running_any_other_iti: yup
            .string()
            .required("Please select if applicant is running any other ITI"),
        })}
        validateOnChange={() => console.log("validateOnChange")}
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
              dispatch({ type: "set_comp_stateI_III", payload: values });
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
          category: "",
          Is_the_applicant_running_any_other_iti: "yes",
          is_falls_under_hill_area_hill: "no",
          is_falls_under_border_district: "no",
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Card className="custom-card">
            <Card.Header>
              <div className="card-title">Application Preview</div>
            </Card.Header>
            <Card.Body>
              <BasicDetailsofApplicantOrganization />
              <DetailsOfTheProposedInstitute />
              <DetailsOfTheLandToBeUsedForTheITI />
              <DetailsOfDocumentsToBeUploaded />
            </Card.Body>
            <div className="card-footer">
              <div className="d-flex justify-content-between mb-3">
                <div className="p-2">
                  <Button
                    size="lg"
                    variant="primary"
                    className="rounded-pill btn-wave"
                    // onClick={handleExternalSubmit}
                  >
                    Back
                  </Button>
                </div>
                {!isHidden == false && (
                  <div className="p-2">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-pill btn-wave"
                      onClick={gotoNext}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

export default PreviewOfApplication;
