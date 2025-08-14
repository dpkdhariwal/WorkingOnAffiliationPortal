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
import { addNewApp } from "../../db/appList";
import { AffiliationCategory } from "../../constants";
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
      {!regCategory ? (
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
      )}
    </Fragment>
  );
};

const SelectCategoryModal = (props) => {
  // const AffiliationCategory = [
  //   { name: "Application for Establishment of New ITIs", master: "01" },
  //   {
  //     name: "Application for opening Mini Skill Training Institute",
  //     master: "02",
  //   },
  //   {
  //     name: "Establishment of New Age ITIs or Adoption of existing ITIs by industry entities",
  //     master: "03",
  //   },
  //   {
  //     name: "Affiliation under the Dual System of Training (DST)",
  //     master: "04",
  //   },
  //   { name: "Surrender of Trade/Units", 
  //     master: "05" },
  //   {
  //     name: "Application for Existing ITIs",
  //     master: "06",
  //     subCate: [
  //       { name: "Addition of New Trades/Units", master: "01" },
  //       { name: "Name Change of the ITI", master: "02" },
  //       { name: "Shifting/Relocation", master: "03" },
  //       { name: "Merger of ITIs", master: "04" },
  //       {
  //         name: "SCVT to NCVET conversion of Trades (for existing Government ITIs)",
  //         master: "05",
  //       },
  //       { name: "Renewal of Affiliation", master: "06" },
  //     ],
  //   },
  // ];
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

    dispatch({ type: "SAVE_APP_CATEGORY", payload: obj, });
    navigate(`/dashboard/new_registration?appId=${appId}`);

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
              is: "06", // 🔄 change to "no" since category and comments are required when it's "no"
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
  const navigate = useNavigate();
   const gotoApplicationForm = async () => {
    const appId = Date.now() + Math.random();
    navigate(`/dashboard/new_registration?appId=${appId}`);

  };
  return (
    <div>
      <Button size="lg" variant="success" onClick={() => gotoApplicationForm()}>
        Start New Application
      </Button>
      {/* <Button size="lg" variant="success" onClick={() => setModalShow(true)}>
        Start New Application
      </Button> */}
      <SelectCategoryModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export { Start, SelectCategoryModal, SelectCategory };
