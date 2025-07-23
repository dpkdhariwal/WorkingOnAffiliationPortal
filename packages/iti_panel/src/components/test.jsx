import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function EmailOtpForm() {
  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h3>Email OTP Verification</h3>

      <Formik
        initialValues={{
          email: "",
          isEmailVerified: false, // ✅ store inside Formik state
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("Please enter email")
            .email("Please enter a valid email")
            .test(
              "is-otp-verified",
              "Please verify your email with OTP",
              function (value) {
                const { isEmailVerified } = this.parent; // ✅ Access from Formik values
                console.log("isEmailVerified =", isEmailVerified);
                if (!value || !Yup.string().email().isValidSync(value)) return true;
                return isEmailVerified === true;
              }
            ),
        })}
        onSubmit={(values) => {
          alert("Form submitted successfully with: " + JSON.stringify(values));
        }}
      >
        {({
          errors,
          touched,
          values,
          setFieldValue,
          setFieldTouched,
          validateForm,
        }) => (
          <Form>
            <div style={{ marginBottom: 10 }}>
              <label>Email:</label>
              <Field name="email" type="email" className="form-control" />
              {touched.email && errors.email && (
                <div style={{ color: "red", marginTop: 5 }}>{errors.email}</div>
              )}
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <button
                type="button"
                onClick={() => {
                  if (!values.email) {
                    alert("Please enter email first");
                  } else {
                    alert("OTP sent to " + values.email);
                  }
                }}
              >
                Send OTP
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!values.email) {
                    alert("Enter email first");
                  } else {
                    alert("OTP verified for " + values.email);
                    setFieldValue("isEmailVerified", true); // ✅ update Formik value
                    setFieldTouched("email", true);
                    validateForm();
                  }
                }}
              >
                Verify OTP
              </button>
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
