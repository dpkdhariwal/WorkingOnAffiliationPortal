import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Button, Modal, ListGroup, Form as BSForm, Row, Alert } from "react-bootstrap";

// Sample categories
const AffiliationCategory = [
  { master: "01", name: "Category 1" },
  { master: "02", name: "Category 2" },
  { master: "06", name: "Other" },
];

// Validation schema
const ValidationSchema = yup.object({
  aff_category: yup.string().required("Select Affiliation Category"),
  aff_sub_category: yup.array().when("aff_category", {
    is: "06", // Apply this validation when aff_category is "06"
    then: yup
      .array()
      .of(yup.string()) // Ensures the array contains strings
      .min(1, "Please select at least one sub-category")
      .required("Sub-category is required when category is 'Other'"),
    otherwise: yup.array().notRequired(), // No sub-category required for other categories
  }),
});

const initialValues = {
  aff_category: "",
  aff_sub_category: [],
};

export const TestSelectCategoryModal = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSubmit = (values) => {
    console.log("Form values", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <Modal {...props} size="md" centered>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Select Affiliation Category</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-2">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <div>
                  <ListGroup as="ul">
                    {AffiliationCategory.map((category) => (
                      <ListGroup.Item
                        as="li"
                        key={category.master}
                        style={{ padding: "5px" }}
                      >
                        <BSForm.Group>
                          <BSForm.Check
                            inline
                            type="radio"
                            label={category.name}
                            name="aff_category"
                            value={category.master}
                            onChange={handleChange}
                            checked={values.aff_category === category.master}
                            isInvalid={touched.aff_category && !!errors.aff_category}
                          />
                        </BSForm.Group>
                        {category.master === "06" && values.aff_category === "06" && (
                          <ListGroup as="ul" className="ms-4 mt-2">
                            <ListGroup.Item as="li" style={{ padding: "5px" }}>
                              <BSForm.Group>
                                <BSForm.Check
                                  inline
                                  type="checkbox"
                                  label="Sub-category 1"
                                  name="aff_sub_category"
                                  value="sub1"
                                  onChange={handleChange}
                                  isInvalid={touched.aff_sub_category && !!errors.aff_sub_category}
                                />
                              </BSForm.Group>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" style={{ padding: "5px" }}>
                              <BSForm.Group>
                                <BSForm.Check
                                  inline
                                  type="checkbox"
                                  label="Sub-category 2"
                                  name="aff_sub_category"
                                  value="sub2"
                                  onChange={handleChange}
                                  isInvalid={touched.aff_sub_category && !!errors.aff_sub_category}
                                />
                              </BSForm.Group>
                            </ListGroup.Item>
                          </ListGroup>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>

                {/* Error messages for validation */}
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
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default TestSelectCategoryModal;
