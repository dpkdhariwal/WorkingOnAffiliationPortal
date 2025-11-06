import { Fragment, useEffect, useRef, useState } from "react";
import { Row, Col, Card, Form, Button, InputGroup, Table } from "react-bootstrap";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Form as BootstrapForm, Modal } from "react-bootstrap";
import { debounce } from "lodash";
import * as yup from "yup";
import { OtpInput } from 'reactjs-otp-input';

import { useTranslation } from 'react-i18next';



export const OtpEmail = ({ frmk, emailFieldName, is_verifiedFieldName, formikRef }) => {
    const { t } = useTranslation();

    const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = frmk;
    const emailSchema = yup.string().email("Invalid email address").required("Email is required");

    const [otp, setOtp] = useState('');

    const handleChange2 = (otp) => setOtp(otp);


    const [email, setEmail] = useState("");
    const [otpEnabled, setOtpEnabled] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const debouncedApiCall = debounce((e, email) => {
        if (email) {
            console.log(email, values[emailFieldName]);
            checkEmail(email);
        }
    }, 800); // wait 800ms after last keys


    // HOw to Watch it with useState
    useEffect(() => {
        if (touched[emailFieldName] && !errors[emailFieldName]) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }, [formikRef, values[emailFieldName], touched[emailFieldName], errors[emailFieldName]]);


    const checkEmail = async (email) => {
        try {
            const validEmail = await emailSchema.validate(email);
            console.log("Email is valid:", validEmail);
            setIsEmailValid(true);

        } catch (err) {
            console.error("Validation error:", err.errors[0]);
            setIsEmailValid(false);

        }
    }

    const sendOTP = () => {
        console.log("sent");
        // setFieldValue("is_verified_email_id_of_authorized_signatory", true);
        setOtpSent(true);
        // Call it somewhere in your code
        getOtp();
    }

    const getOtp = async () => {



        // const confirmResult = await Swal.fire({
        //     title: t(`StageIForm.DOCUMENTS_UPLOAD.validations.before_send_otp.msg`),
        //     // text: "Do you want to send OTP Email",
        //     icon: "success",
        //     showCancelButton: true,
        //     confirmButtonText: "Ok",
        //     cancelButtonText: "Cancel",
        //     allowOutsideClick: false, // cannot close by clicking outside
        //     allowEscapeKey: false,    // cannot close by pressing Escape
        // });

        // if (!confirmResult.isConfirmed) {
        //     console.log("User cancelled save");
        //     setOtpSent(false);
        //     return;
        // }

        const { value: otp } = await Swal.fire({
            title: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
            input: "text",          // input type
            // inputLabel: "OTP Code",
            inputPlaceholder: t(`StageIForm.DOCUMENTS_UPLOAD.validations.after_otp_sent.title`),
            showCancelButton: true, // user can cancel
            confirmButtonText: "Verify",
            cancelButtonText: "Cancel",
            allowOutsideClick: false, // cannot close by clicking outside
            allowEscapeKey: false,    // cannot close by pressing Escape
            inputValidator: (value) => {
                if (!value) {
                    return "You need to enter OTP!";
                }
                if (!/^\d{4,6}$/.test(value)) {
                    return "OTP must be 4-6 digits";
                }
            },
        });

        if (otp) {
            console.log("User entered OTP:", otp);
            // Here you can call your API to verify OTP
            setFieldValue(is_verifiedFieldName, true);

        } else {
            console.log("User cancelled OTP input");
            setOtpSent(false);
        }
    }


    return (
        <div>
            {/* <OtpInput value={otp} onChange={handleChange2} numInputs={6} separator={<span>-</span>} /> */}

            <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>
                    Email Id <span style={{ color: "red" }}>*</span>
                </BootstrapForm.Label>
                <InputGroup>
                    <BootstrapForm.Control
                        type="text"
                        size="lg"
                        name={emailFieldName}
                        value={values[emailFieldName] || ""}
                        onChange={(e) => {
                            handleChange(e);
                            debouncedApiCall(e, e.target.value);
                            setEmail(e.target.value);

                        }}
                        isInvalid={!!errors[emailFieldName]}
                        isValid={touched[emailFieldName] && !errors[emailFieldName]}
                        placeholder="Enter Email"
                        disabled={otpSent}
                    />
                    {isEmailValid === true && !otpSent && (<Button variant="danger" type="button" onClick={() => { sendOTP() }} > Verify </Button>)}
                </InputGroup>
                <ErrorMessage name={emailFieldName} component="div" style={{ color: "red" }} />
            </BootstrapForm.Group>
        </div>
    )

}


export const OtpMobile = ({ frmk, mobileFieldName, is_verifiedFieldName, formikRef }) => {
    const { t } = useTranslation();

    const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = frmk;

    const emailSchema = yup.string().matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number");

    const [otp, setOtp] = useState('');

    const handleChange2 = (otp) => setOtp(otp);


    const [email, setEmail] = useState("");
    const [otpEnabled, setOtpEnabled] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const debouncedApiCall = debounce((e, email) => {
        if (email) {
            console.log(email, values[mobileFieldName]);
            checkEmail(email);
        }
    }, 800); // wait 800ms after last keys


    // HOw to Watch it with useState
    useEffect(() => {
        if (touched[mobileFieldName] && !errors[mobileFieldName]) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }, [formikRef, values[mobileFieldName], touched[mobileFieldName], errors[mobileFieldName]]);


    const checkEmail = async (email) => {
        try {
            const validEmail = await emailSchema.validate(email);
            console.log("Email is valid:", validEmail);
            setIsEmailValid(true);

        } catch (err) {
            console.error("Validation error:", err.errors[0]);
            setIsEmailValid(false);

        }
    }

    const sendOTP = () => {
        console.log("sent");
        // setFieldValue("is_verified_email_id_of_authorized_signatory", true);
        setOtpSent(true);
        // Call it somewhere in your code
        getOtp();
    }

    const getOtp = async () => {



        // const confirmResult = await Swal.fire({
        //     title: t(`StageIForm.DOCUMENTS_UPLOAD.validations.before_send_otp.msg`),
        //     // text: "Do you want to send OTP Email",
        //     icon: "success",
        //     showCancelButton: true,
        //     confirmButtonText: "Ok",
        //     cancelButtonText: "Cancel",
        //     allowOutsideClick: false, // cannot close by clicking outside
        //     allowEscapeKey: false,    // cannot close by pressing Escape
        // });

        // if (!confirmResult.isConfirmed) {
        //     console.log("User cancelled save");
        //     setOtpSent(false);
        //     return;
        // }






        const { value: otp } = await Swal.fire({
            title: t(`commonValidation.mobileOtp.after_otp_sent.title`),
            input: "text",          // input type
            // inputLabel: "OTP Code",
            inputPlaceholder: t(`commonValidation.mobileOtp.after_otp_sent.msg`),
            showCancelButton: true, // user can cancel
            confirmButtonText: "Verify",
            cancelButtonText: "Cancel",
            allowOutsideClick: false, // cannot close by clicking outside
            allowEscapeKey: false,    // cannot close by pressing Escape
            inputValidator: (value) => {
                if (!value) {
                    return "You need to enter OTP!";
                }
                if (!/^\d{4,6}$/.test(value)) {
                    return "OTP must be 4-6 digits";
                }
            },
        });

        if (otp) {
            console.log("User entered OTP:", otp);
            // Here you can call your API to verify OTP
            setFieldValue(is_verifiedFieldName, true);

        } else {
            console.log("User cancelled OTP input");
            setOtpSent(false);
        }
    }


    return (
        <div>
            {/* <OtpInput value={otp} onChange={handleChange2} numInputs={6} separator={<span>-</span>} /> */}

            <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>
                    Applicant Contact Number <span style={{ color: "red" }}>*</span>
                </BootstrapForm.Label>
                <InputGroup>
                    <BootstrapForm.Control
                        type="text"
                        size="lg"
                        name={mobileFieldName}
                        value={values[mobileFieldName] || ""}
                        onChange={(e) => {
                            handleChange(e);
                            debouncedApiCall(e, e.target.value);
                            setEmail(e.target.value);

                        }}
                        isInvalid={!!errors[mobileFieldName]}
                        isValid={touched[mobileFieldName] && !errors[mobileFieldName]}
                        placeholder="Enter Email"
                        disabled={otpSent}
                    />
                    {isEmailValid === true && !otpSent && (<Button variant="danger" type="button" onClick={() => { sendOTP() }} > Verify </Button>)}
                </InputGroup>
                <ErrorMessage name={mobileFieldName} component="div" style={{ color: "red" }} />
            </BootstrapForm.Group>
        </div>
    )

}


