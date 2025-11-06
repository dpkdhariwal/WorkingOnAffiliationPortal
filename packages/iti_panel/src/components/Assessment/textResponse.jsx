import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

// Assuming you have a C.AdminList array from your context
const C = {
  AdminList: ["ADMIN", "RDSDE"], // Example Admin List
};

export const intiValues = {
  usertype: "APPLICANT",
  itLab: [
    {
      as_per_norms: "",
      reason: "",
      assessor_comments: "",
      revised_qty: "",
    },
  ], // Fill data dynamically as needed
};

// Room Schema for validation
const roomSchema = yup.object({
  as_per_norms: yup
    .string()
    .when("usertype", {
      is: (usertype) => C.AdminList.includes(usertype),
      then: (s) => s.required("Please select Yes or No"),
      otherwise: () => yup.mixed().notRequired(),
    }),

  reason: yup
    .string()
    .nullable()
    .when(["as_per_norms", "usertype"], {
      is: (as_per_norms, usertype) => as_per_norms === "no" && C.AdminList.includes(usertype),
      then: (schema) => schema.required("Please select a reason"),
      otherwise: (schema) => schema.nullable(),
    }),

  assessor_comments: yup
    .string()
    .nullable()
    .when(["reason", "usertype"], {
      is: (reason, usertype) => reason === "other" && C.AdminList.includes(usertype),
      then: (schema) => schema.required("Please enter assessor comments"),
      otherwise: (schema) => schema.nullable(),
    }),

  revised_qty: yup
    .string()
    .when(["usertype", "as_per_norms"], {
      is: (usertype, as_per_norms, context) => {
        const parent = context?.parent; // Correctly accessing parent
        console.log("Parent object:", parent); // Logs the parent object

        return parent?.usertype === "APPLICANT" && as_per_norms === "no";
      },
      then: (s) => s.required("Enter Quantity"),
      otherwise: () => yup.mixed().notRequired(),
    }),
});

// Main Validation Schema
const ValSchema = yup.object({
  itLab: yup.array().of(roomSchema),
});

const MyForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState(intiValues);

  useEffect(() => {
    // Simulate API call to fetch data and update form values
    setTimeout(() => {
      const newFormData = {
        usertype: "ADMIN", // New usertype
        itLab: [
          {
            as_per_norms: "yes",
            reason: "No issue",
            assessor_comments: "No comments",
            revised_qty: "100",
          },
        ],
      };
      setFormData(newFormData); // Update form data
    }, 3000); // Simulate 3 second delay for API call
  }, []);

  return (
    <div>
      <h1>Form with Yup Validation</h1>
      <Formik
        enableReinitialize // Enables reinitialization when initialValues change
        initialValues={formData} // Set initialValues dynamically
        validationSchema={ValSchema}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
        }}
      >
        {() => (
          <Form>
            {/* Loop through itLab array if necessary */}
            {formData.itLab.map((lab, index) => (
              <div key={index}>
                <div>
                  <label htmlFor={`itLab.${index}.as_per_norms`}>As per norms:</label>
                  <Field
                    as="select"
                    name={`itLab.${index}.as_per_norms`}
                    id={`itLab.${index}.as_per_norms`}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Field>
                  <ErrorMessage name={`itLab.${index}.as_per_norms`} component="div" className="error" />
                </div>

                <div>
                  <label htmlFor={`itLab.${index}.reason`}>Reason:</label>
                  <Field
                    as="input"
                    type="text"
                    name={`itLab.${index}.reason`}
                    id={`itLab.${index}.reason`}
                  />
                  <ErrorMessage name={`itLab.${index}.reason`} component="div" className="error" />
                </div>

                <div>
                  <label htmlFor={`itLab.${index}.assessor_comments`}>Assessor Comments:</label>
                  <Field
                    as="input"
                    type="text"
                    name={`itLab.${index}.assessor_comments`}
                    id={`itLab.${index}.assessor_comments`}
                  />
                  <ErrorMessage name={`itLab.${index}.assessor_comments`} component="div" className="error" />
                </div>

                <div>
                  <label htmlFor={`itLab.${index}.revised_qty`}>Revised Quantity:</label>
                  <Field
                    as="input"
                    type="text"
                    name={`itLab.${index}.revised_qty`}
                    id={`itLab.${index}.revised_qty`}
                  />
                  <ErrorMessage name={`itLab.${index}.revised_qty`} component="div" className="error" />
                </div>

                <hr />
              </div>
            ))}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;
