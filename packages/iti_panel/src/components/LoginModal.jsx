import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginByAuth } from "../services/auth/login";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SwalManager from "../common/SwalManager";

// Generate a 6-digit captcha with numbers, uppercase, and lowercase letters
function generateCaptcha() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return { question: captcha, answer: captcha };
}

const EMAIL_OTP = '987123';

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginModal = ({ show, handleClose, title, icon, gradient, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [timer, setTimer] = useState(60);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneOtpGenerated, setPhoneOtpGenerated] = useState('');
  // Refresh captcha every 1 minute and show timer
  useEffect(() => {
    setTimer(60);
    const interval = setInterval(() => {
      setCaptcha(generateCaptcha());
      setTimer(60);
    }, 60000);
    const timerInterval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(timerInterval);
    };
  }, [captcha.question]);
  // Reset to login when modal closes
  const wrappedHandleClose = () => {
    setIsRegister(false);
    handleClose();
    setCaptcha(generateCaptcha());
  };

  const registerSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Enter Correct User ID or Email"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Enter valid 10 digit phone").required("Required"),
    password: Yup.string().required("Required"),
    captcha: Yup.string().matches(new RegExp(`^${captcha.answer}$`), "Captcha incorrect").required("Required"),
    emailOtp: Yup.string().max(6, "OTP must be 6 characters").matches(/^.{0,6}$/, "OTP must be 6 characters").nullable(),
    phoneOtp: Yup.string().max(6, "OTP must be 6 characters").matches(/^.{0,6}$/, "OTP must be 6 characters").nullable(),
  });

  function CaptchaCanvas({ value }) {
    const canvasRef = useRef(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 200, 40);
      ctx.fillStyle = '#f3f3f3';
      ctx.fillRect(0, 0, 200, 40);
      // Draw random lines for noise
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.7)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 200, Math.random() * 40);
        ctx.lineTo(Math.random() * 200, Math.random() * 40);
        ctx.stroke();
      }
      // Draw captcha text
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#00369A';
      for (let i = 0; i < value.length; i++) {
        ctx.save();
        ctx.translate(30 * i + 20, 28);
        ctx.rotate((Math.random() - 0.5) * 0.3);
        ctx.fillText(value[i], 0, 0);
        ctx.restore();
      }
    }, [value]);
    return <canvas ref={canvasRef} width={200} height={40} style={{ borderRadius: '8px', background: '#f3f3f3' }} />;
  }

  // IndexedDB setup for AffliationDB
  function saveToIndexedDB(data, onSuccess, onError) {
    console.log('Opening IndexedDB...');
    const request = window.indexedDB.open('AffliationDB', 26);
    request.onupgradeneeded = function (event) {
      console.log('Upgrading/creating object store...');
      const db = event.target.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
        console.log('Object store created.');
      }
    };
    request.onsuccess = function (event) {
      console.log('IndexedDB opened successfully.');
      const db = event.target.result;
      const tx = db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      const addRequest = store.add(data);
      addRequest.onsuccess = function () {
        console.log('Data saved:', data);
        if (onSuccess) onSuccess();
        db.close();
      };
      addRequest.onerror = function (e) {
        console.error('Error saving data:', e);
        if (onError) onError(e);
        db.close();
      };
    };
    request.onerror = function (e) {
      console.error('Error opening IndexedDB:', e);
      if (onError) onError(e);
    };
  }

  function generatePhoneOtp() {
    const chars = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return otp;
  }

  // IndexedDB login for Affiliation Login
  async function loginAffiliation(email, password) {
    return new Promise((resolve) => {
      const request = window.indexedDB.open('AffliationDB');
      request.onsuccess = function (event) {
        const db = event.target.result;
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const getAllReq = store.getAll();
        getAllReq.onsuccess = function () {
          const users = getAllReq.result;
          const user = users.find(u => u.email === email && u.password === password && Array.isArray(u.role) && u.role.includes('applicant'));
          resolve(user || null);
          db.close();
        };
        getAllReq.onerror = function () {
          resolve(null);
          db.close();
        };
      };
      request.onerror = function () {
        resolve(null);
      };
    });
  }
  const dispatch = useDispatch();
  const navigate = useNavigate(); // initialize navigation

  const LoginNow = async (values, handleClose) => {
    const { email, password } = values;

    console.log(values);


    let result, user;
    try {
      SwalManager.showLoading("Authenticating...");
      handleClose();
      result = await loginByAuth(email, password);
      console.log(result.data.info.userType);
      user = result.data;
      // return;
      // console.log(result);
      dispatch({ type: "USER_SIGNED_IN_SUCCESS", payload: { ...result.data, userType: result.data.info.userType, role: result.data.info.role } });
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

  return (
    <Modal show={show} onHide={wrappedHandleClose} centered dialogClassName="affiliation-login-modal">
      <Modal.Header closeButton style={{
        background: gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem"
      }}>
        <Modal.Title className="d-flex align-items-center gap-2">
          {icon}
          <span>{isRegister ? 'Register' : title}</span>
        </Modal.Title>
      </Modal.Header>
      {!isRegister ? (
        <Formik
          initialValues={{ email: title === 'Applicant Login' ? "applicant@gmail.com" : "", password: title === 'Applicant Login' ? "123" : "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            await LoginNow(values, handleClose);
            // if (title === 'Applicant Login') {
            //   // const user = await loginAffiliation(values.email, values.password);

            //   try {
            //     let result = await loginByAuth(values.email, values.password);
            //     console.log(result.data.info.userType);
            //     let user = result.data;
            //     dispatch({ type: "USER_SIGNED_IN_SUCCESS", payload: { ...result.data, userType: result.data.info.userType, role: result.data.info.role } });
            //     toast.success("Logged in successfully", { position: "top-right", });
            //     await new Promise((resolve) => setTimeout(resolve, 1000));
            //     //    const confirmed = await SwalManager.success("Logged In");
            //     // if (!confirmed) return;
            //     switch (user.userType) {
            //       case "applicant":
            //         if (user?.total_applications == 0) {
            //           navigate("/dashboard/Application/");
            //         } else {
            //           navigate("/dashboard/");
            //         }
            //         break;
            //       case "rdsde":
            //         navigate("/dashboard/rdsde");
            //         break;
            //       case 'state_admin':
            //         navigate("/dashboard/state_admin");
            //         break;
            //       default:
            //         navigate("/dashboard/");
            //         break;
            //     }

            //     // if (resp.data) {
            //     //   window.location.href = '/dashboard/Application/';
            //     // } else {
            //     //   alert('Invalid credentials for Applicant Login');
            //     // }
            //   } catch (error) {
            //     console.log(error);
            //     alert('Invalid credentials for Applicant Login');
            //   }



            // } else {
            //   // For State, RDSDE, DGT Login, check userType/role and call onLoginSuccess if needed
            //   let userData = null;
            //   if (title === 'State Login') {
            //     userData = { userType: 'state_admin', role: 'state_admin' };
            //   } else if (title === 'RDSDE Login') {
            //     userData = { userType: 'rdsde', role: 'rdsde' };
            //   } else if (title === 'DGT Login') {
            //     userData = { userType: 'dgt', role: 'dgt' };
            //   }
            //   if (userData) {
            //     localStorage.setItem('currentUser', JSON.stringify(userData));
            //     if (onLoginSuccess) onLoginSuccess();
            //   }
            //   handleClose();
            // }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Modal.Body style={{ background: "#f8f9fa", borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem" }}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold" style={{ color: gradient ? undefined : "#00369A" }}>{title} Email</label>
                  <Field name="email" type="email" className="form-control form-control-lg rounded-pill" placeholder="Enter your email" />
                  <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold" style={{ color: gradient ? undefined : "#00369A" }}>{title} Password</label>
                  <Field name="password" type="password" className="form-control form-control-lg rounded-pill" placeholder="Enter your password" />
                  <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                </div>
              </Modal.Body>
              <Modal.Footer style={{ borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem", flexDirection: 'column', alignItems: 'stretch' }}>
                <div className="d-flex gap-2 mb-2">
                  <Button variant="outline-secondary" onClick={handleClose} disabled={isSubmitting} className="rounded-pill px-4">
                    Cancel
                  </Button>
                  <Button style={{ background: gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none" }} type="submit" disabled={isSubmitting} className="rounded-pill px-4 fw-bold">
                    Sign In
                  </Button>
                </div>
                {title === 'Applicant Login' && (
                  <Button variant="success" className="rounded-pill w-100 fw-bold" style={{ marginTop: '0.5rem' }} onClick={() => setIsRegister(true)}>
                    Register Your Self
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ email: "", phone: "", password: "", captcha: "", emailOtpVisible: false, phoneOtpVisible: false, emailOtp: "", phoneOtp: "" }}
          validationSchema={registerSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            // Save to IndexedDB
            const userData = {
              userType: 'applicant',
              role: ['applicant'],
              email: values.email,
              phone: values.phone,
              password: values.password,
              id: Date.now() + Math.random(),
            };
            saveToIndexedDB(
              userData,
              () => alert('Registration saved!'),
              (e) => alert('Error saving registration: ' + (e.target?.error?.message || 'Unknown error'))
            );
            handleClose();
            setCaptcha(generateCaptcha());
            resetForm();
            setEmailVerified(false);
            setPhoneVerified(false);
          }}
        >
          {({ isSubmitting, values, errors, touched, setFieldValue }) => (
            <Form>
              <Modal.Body style={{ background: "#f8f9fa", borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem" }}>
                <div className="mb-4 d-flex align-items-center gap-2">
                  <div style={{ flex: 1, position: 'relative' }}>
                    <label htmlFor="email" className="form-label fw-bold" style={{ color: gradient ? undefined : "#00369A" }}>Email</label>
                    <div style={{ display: 'flex' }}>
                      <Field name="email" type="email" className="form-control form-control-lg rounded-pill" placeholder="Enter your email" style={{ borderRadius: '2rem' }} disabled={emailVerified} />
                      <Button variant="outline-success" size="sm" style={{ height: 40, marginLeft: '-50px', zIndex: 2, borderRadius: '2rem', minWidth: '70px' }} type="button" onClick={() => setFieldValue('emailOtpVisible', true)} disabled={!!errors.email || !values.email || !touched.email || emailVerified}>
                        Verify
                      </Button>
                    </div>
                    <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                    {values.emailOtpVisible && !emailVerified && (
                      <div className="mt-2 d-flex gap-2">
                        <Field name="emailOtp" type="text" className="form-control form-control-lg rounded-pill" placeholder="Enter OTP sent to email" maxLength={6} />
                        <Button variant="primary" type="button" onClick={() => {
                          if (values.emailOtp === EMAIL_OTP) {
                            setEmailVerified(true);
                            setFieldValue('emailOtpVisible', false);
                          } else {
                            alert('Incorrect OTP. Please enter 987123');
                          }
                        }}>
                          Submit OTP
                        </Button>
                      </div>
                    )}
                    {emailVerified && (
                      <div className="mt-2 text-success fw-bold">Email verified!</div>
                    )}
                  </div>
                </div>
                <div className="mb-4 d-flex align-items-center gap-2">
                  <div style={{ flex: 1, position: 'relative' }}>
                    <label htmlFor="phone" className="form-label fw-bold" style={{ color: gradient ? undefined : "#00369A" }}>Phone</label>
                    <div style={{ display: 'flex' }}>
                      <Field name="phone" type="text" className="form-control form-control-lg rounded-pill" placeholder="Enter your phone number" style={{ borderRadius: '2rem' }} disabled={phoneVerified} />
                      <Button variant="outline-success" size="sm" style={{ height: 40, marginLeft: '-50px', zIndex: 2, borderRadius: '2rem', minWidth: '70px' }} type="button"
                        onClick={async () => {
                          setFieldValue('phoneOtpVisible', true);
                          // Generate and send 6-digit OTP
                          const otp = generatePhoneOtp();
                          setPhoneOtpGenerated(otp);
                          const refNo = Math.floor(Math.random() * 1e10).toString();
                          const smsUrl = `https://sms.mobi-marketing.biz/api/mt/SendSMS?user=NIMI&password=abcd4321D&senderid=NIMIAP&channel=Trans&DCS=0&flashsms=0&number=91${values.phone}&text=Your%20OTP%20is%20${otp}%20for%20reference%20number%20${refNo}%20-%20NIMI&route=1`;
                          try {
                            await fetch(smsUrl);
                            alert('OTP sent to your mobile!');
                          } catch (e) {
                            alert('OTP sent to your mobile!');
                          }
                        }}
                        disabled={!!errors.phone || !values.phone || !touched.phone || phoneVerified}>
                        Verify
                      </Button>
                    </div>
                    <ErrorMessage name="phone" component="div" className="text-danger small mt-1" />
                    {values.phoneOtpVisible && !phoneVerified && (
                      <div className="mt-2 d-flex gap-2">
                        <Field name="phoneOtp" type="text" className="form-control form-control-lg rounded-pill" placeholder="Enter OTP sent to phone" maxLength={6} />
                        <Button variant="primary" type="button" onClick={() => {
                          if (values.phoneOtp === phoneOtpGenerated) {
                            setPhoneVerified(true);
                            setFieldValue('phoneOtpVisible', false);
                          } else {
                            alert('Incorrect OTP. Please enter the 6-digit OTP sent to your phone');
                          }
                        }}>
                          Submit OTP
                        </Button>
                      </div>
                    )}
                    {phoneVerified && (
                      <div className="mt-2 text-success fw-bold">Phone verified!</div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold" style={{ color: gradient ? undefined : "#00369A" }}>Password</label>
                  <Field name="password" type="password" className="form-control form-control-lg rounded-pill" placeholder="Create a password" />
                  <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                </div>
                <div className="mb-4">
                  <label htmlFor="captcha" className="form-label fw-bold" style={{ color: gradient ? undefined : "#00369A" }}>Captcha:</label>
                  <div className="mb-2 d-flex align-items-center gap-2">
                    <CaptchaCanvas value={captcha.question} />
                    <Button variant="outline-primary" size="sm" style={{ height: 40 }} onClick={() => { setCaptcha(generateCaptcha()); setTimer(60); }}>
                      Refresh
                    </Button>
                    <span style={{ fontSize: '0.9rem', color: '#00369A', minWidth: '80px' }}>Next refresh: <b>{timer}</b> sec</span>
                  </div>
                  <Field name="captcha" type="text" className="form-control form-control-lg rounded-pill" placeholder="Enter captcha answer" autoComplete="off" />
                  <ErrorMessage name="captcha" component="div" className="text-danger small mt-1" />
                </div>
              </Modal.Body>
              <Modal.Footer style={{ borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem", flexDirection: 'column', alignItems: 'stretch' }}>
                <div className="d-flex gap-2 mb-2">
                  <Button variant="outline-secondary" onClick={handleClose} disabled={isSubmitting} className="rounded-pill px-4">
                    Cancel
                  </Button>
                  <Button style={{ background: gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none" }} type="submit" disabled={isSubmitting} className="rounded-pill px-4 fw-bold">
                    Register
                  </Button>
                </div>
                <Button variant="link" className="rounded-pill w-100 fw-bold" style={{ marginTop: '0.5rem', color: gradient ? '#fff' : '#00369A' }} onClick={() => setIsRegister(false)}>
                  <span style={{ background: '#00369A', color: '#fff', padding: '8px 0', borderRadius: '2rem', display: 'inline-block', width: '100%' }}>Already have an account? Sign In</span>
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
}
// );

export default LoginModal;

const style = document.createElement('style');
style.innerHTML = `
.affiliation-login-modal {
  z-index: 9999 !important;
}
.affiliation-login-modal .modal-content {
  /* margin-top: 180px !important; */
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15), 0 1.5px 6px rgba(118, 75, 162, 0.10);
  z-index: 10000 !important;
}
.modal-backdrop {
  z-index: 9998 !important;
}
.modal {
  z-index: 9999 !important;
}
`;
document.head.appendChild(style);