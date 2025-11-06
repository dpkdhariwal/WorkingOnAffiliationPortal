import React from "react";
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
      is: (usertype, as_per_norms) => {
        // Accessing `usertype` directly from the parent context
        return usertype === "APPLICANT" && as_per_norms === "no";
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
  return (
    <div>
      <h1>Form with Yup Validation</h1>
      <Formik
        initialValues={intiValues}
        validationSchema={ValSchema}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
        }}
      >
        {({ values }) => (
          <Form>
            {/* Loop through itLab array if necessary */}
            {values.itLab.map((lab, index) => (
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
