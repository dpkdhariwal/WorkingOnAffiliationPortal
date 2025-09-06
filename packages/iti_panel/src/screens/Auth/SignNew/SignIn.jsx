import React, { Fragment, useState, useRef, useEffect } from "react";
import LoginModal from "../../../components/LoginModal";
import { Building, PersonGear, Download, House } from "react-bootstrap-icons";
import { Card, Form, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { ArrowClockwise, People, Telephone, ExclamationCircle } from "react-bootstrap-icons";
import {Footer,HeroCarousel} from 'layout';


import './SignIn.css';
import logo from '../../../assets/images/header/lo.jpg';
import dgtLogo from '../../../assets/images/header/dgt.png';
import skillIndiaLogo from '../../../assets/images/header/skill-india.png';
import itiLogo from '../../../assets/images/header/iti.png';
import azadiLogo from '../../../assets/images/header/ITUWSTA.png';
import g20Logo from '../../../assets/images/header/G20_logo2_0.png';
import { Link, useNavigate } from 'react-router-dom';

const Signin = ({ login }) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  // Timer states
  const [emailTimer, setEmailTimer] = useState(0);
  const [mobileTimer, setMobileTimer] = useState(0);
  const [signupEmailTimer, setSignupEmailTimer] = useState(0);
  const [signupMobileTimer, setSignupMobileTimer] = useState(0);

    const newsItems = [
    "📢 Admission Open for Advanced Diploma Courses",
    "🔔 Affiliation Renewal Deadline: 31st March 2025",
    "📄 New ITI Affiliation Guidelines Released",
    "⚡ Server performance improved for faster processing",
    "🆕 Digital Certificates now available for download",
    "📞 24/7 Helpline Support Available: +91 94980 69086",
    "📚 E-Learning resources added to training portal",
  ];
 const [isTickerPaused, setIsTickerPaused] = useState(false);
  const tickerDuration = Math.max(14, newsItems.length * 3); // seconds
  // Form states
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Email OTP states
  const [emailOtpVisible, setEmailOtpVisible] = useState(false);
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
  const [emailOtpComplete, setEmailOtpComplete] = useState(false);
  const emailOtpRefs = useRef([]);

  // Mobile OTP states
  const [mobileOtpVisible, setMobileOtpVisible] = useState(false);
  const [mobileOtp, setMobileOtp] = useState(new Array(6).fill(""));
  const [mobileOtpComplete, setMobileOtpComplete] = useState(false);
  const mobileOtpRefs = useRef([]);

  // Signup states
  const [signupEmail, setSignupEmail] = useState("");
  const [signupMobile, setSignupMobile] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState("");

  // Signup OTP states
  const [signupEmailOtpVisible, setSignupEmailOtpVisible] = useState(false);
  const [signupEmailOtp, setSignupEmailOtp] = useState(new Array(6).fill(""));
  const [signupEmailOtpComplete, setSignupEmailOtpComplete] = useState(false);
  const signupEmailOtpRefs = useRef([]);

  const [signupMobileOtpVisible, setSignupMobileOtpVisible] = useState(false);
  const [signupMobileOtp, setSignupMobileOtp] = useState(new Array(6).fill(""));
  const [signupMobileOtpComplete, setSignupMobileOtpComplete] = useState(false);
  const signupMobileOtpRefs = useRef([]);

  // App states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [view, setView] = useState("signin");

  useEffect(() => {
    if (loginSuccess) {
      // Get userType from localStorage (set in loginUser action)
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      if (userData && (userData.userType === "state_admin" || userData.role === "state_admin")) {
        navigate("/dashboard/state_admin");
      }
    }
  }, [loginSuccess, navigate]);

  // Timer Effects
  useEffect(() => {
    if (signupEmailTimer > 0) {
      const interval = setInterval(() => {
        setSignupEmailTimer(prev => {
          if (prev === 1) {
            setSignupEmailOtpVisible(false);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [signupEmailTimer]);

  useEffect(() => {
    if (signupMobileTimer > 0) {
      const interval = setInterval(() => {
        setSignupMobileTimer(prev => {
          if (prev === 1) {
            setSignupMobileOtpVisible(false);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [signupMobileTimer]);

  useEffect(() => {
    if (emailTimer > 0) {
      const interval = setInterval(() => {
        setEmailTimer((prev) => {
          if (prev === 1) {
            setEmailOtpVisible(false);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [emailTimer]);

  useEffect(() => {
    if (mobileTimer > 0) {
      const interval = setInterval(() => {
        setMobileTimer((prev) => {
          if (prev === 1) {
            setMobileOtpVisible(false);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mobileTimer]);

  useEffect(() => {
    if (view === "signup") generateCaptcha();
  }, [view]);

  // Helper Functions
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
  };

  const renderOtpInputs = (otpArray, setOtpArray, refs, onComplete) => (
    <div className="d-flex justify-content-start flex-wrap gap-1 mt-2">
      {otpArray.map((val, idx) => (
        <Form.Control
          key={idx}
          type="text"
          maxLength="1"
          value={val}
          className="text-center p-0"
          style={{
            width: "2rem",
            height: "2rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
          }}
          ref={(el) => (refs.current[idx] = el)}
          onChange={(e) => {
            if (!isNaN(e.target.value)) {
              const updatedOtp = [...otpArray];
              updatedOtp[idx] = e.target.value;
              setOtpArray(updatedOtp);
              if (e.target.value && idx < 5) refs.current[idx + 1].focus();
              if (updatedOtp.every((digit) => digit !== "")) onComplete(true);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && otpArray[idx] === "") {
              if (idx > 0) refs.current[idx - 1].focus();
            }
          }}
        />
      ))}
      {otpArray.every((v) => v !== "") && (
        <span style={{ fontSize: "1.25rem", color: "green", marginLeft: "10px" }}>
          &#10004;
        </span>
      )}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordVisible) {
      if (!emailOtpComplete || !mobileOtpComplete) {
        alert("Please verify both Email and Mobile OTPs first.");
        return;
      }
      setPasswordVisible(true);
    } else {
      setLoginSuccess(true);
    }
  };

  const renderForm = () => {
    switch (view) {
      case "signin":
        return (login);

      case "reset":
        return (
          <>
            <h3 className="mb-4 fw-bold text-center" style={{ color: "#00369A" }}>Reset Password</h3>
            <Form>
              <Form.Group className="mb-4" controlId="resetEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email to receive reset link" />
              </Form.Group>

              <div className="d-grid mb-3">
                <Button variant="warning">Send Reset Link</Button>
              </div>
            </Form>
            <div className="text-center small" style={{ color: "#00369A" }}>
              Back to <span style={{ cursor: "pointer" }} onClick={() => setView("signin")}>Sign In</span>
            </div>
          </>
        );

      case "signup":
        return (
          <>
            <h3 className="mb-4 fw-bold text-center" style={{ color: "#00369A" }}>Register</h3>
            <Form>
              <Form.Group className="mb-3" controlId="signupName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="signupEmail">
                <Form.Label>Email address</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    disabled={signupEmailTimer > 0}
                    onClick={() => {
                      setSignupEmailOtpVisible(true);
                      setSignupEmailTimer(200); // ✅ Use correct timer
                    }}
                  >
                    Verify
                  </Button>
                </div>

                {signupEmailOtpVisible && (
                  <>
                    <Form.Label className="mt-3">Enter OTP Received on Email</Form.Label>
                    {renderOtpInputs(signupEmailOtp, setSignupEmailOtp, signupEmailOtpRefs, setSignupEmailOtpComplete)}
                    <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
                      {signupEmailTimer > 0 ? `New OTP will be generated after ${signupEmailTimer}s` : ""}
                    </div>
                  </>
                )}
              </Form.Group>



              <Form.Group className="mb-3" controlId="signupMobile">
                <Form.Label>Mobile number</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Enter your mobile"
                    value={signupMobile}
                    onChange={(e) => setSignupMobile(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    disabled={signupMobileTimer > 0}
                    onClick={() => {
                      setSignupMobileOtpVisible(true);
                      setSignupMobileTimer(200); // Start the timer
                    }}
                  >
                    Verify
                  </Button>
                </div>

                {signupMobileOtpVisible && (
                  <>
                    <Form.Label className="mt-3">Enter OTP Received on Mobile</Form.Label>
                    {renderOtpInputs(signupMobileOtp, setSignupMobileOtp, signupMobileOtpRefs, setSignupMobileOtpComplete)}

                    {signupMobileTimer > 0 && (
                      <div className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
                        New OTP will be generated after {signupMobileTimer}s
                      </div>
                    )}
                  </>
                )}
              </Form.Group>


              <Form.Group className="mb-3" controlId="signupPassword">
                <Form.Label>Create Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="captcha">
                <Form.Label>Enter CAPTCHA</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      backgroundColor: "#f0f0f0",
                      padding: "10px 20px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      letterSpacing: "2px",
                      border: "1px solid #ccc",
                      color: "#000"
                    }}
                  >
                    {captcha}
                  </div>
                  <Button variant="outline-secondary" onClick={generateCaptcha}>
                    <ArrowClockwise />
                  </Button>
                </div>
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Enter CAPTCHA"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid mb-3">
                <Button
                  variant="success"
                  disabled={!signupEmailOtpComplete || !signupMobileOtpComplete}
                  onClick={() => {
                    if (signupPassword !== confirmPassword) {
                      alert("Passwords do not match.");
                      return;
                    }
                    if (captchaInput !== captcha) {
                      alert("Incorrect CAPTCHA.");
                      return;
                    }
                    setLoginSuccess(true);
                  }}
                >
                  Register
                </Button>
              </div>

              {view === "signup" && loginSuccess && (
                <div className="alert alert-success text-center">Registration Successful!</div>
              )}
            </Form>
            <div className="text-center small" style={{ color: "#00369A" }}>
              Already have an account?{" "}
              <span style={{ cursor: "pointer" }} onClick={() => setView("signin")}>
                Sign In
              </span>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Fragment>
      {/* Government Header */}
      <div
        className="py-2 border-bottom"
        style={{
          background: "linear-gradient(to right bottom, #4b4ba1, #002147)",
          color: "#fff",
          fontSize: "14px",
          padding: "0 15px",
          borderBottom: "5px solid #172052"
        }}
      >
        <div className="container d-flex justify">
          <table>
            <tbody>
              <tr>
                <td style={{
                  textAlign: "right",
                  borderRight: "1px solid #fff",
                  paddingRight: "10px",
                  fontWeight: "bold"
                }}>
                  भारत सरकार<br />Government of India
                </td>
                <td style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                  कौशल विकास और उद्यमिता मंत्रालय<br />
                  Ministry of Skill Development and Entrepreneurship
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Logo Section */}
      <section className="bg-white py-2 border-bottom">
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <a href="">
            <img src={logo} alt="DGT Header" />
          </a>
          <div className="d-flex align-items-center gap-3">
            <img src={dgtLogo} alt="DGT" height="80" />
            <img src={skillIndiaLogo} alt="Skill India" height="80" />
            <img src={itiLogo} alt="ITI" height="80" />
            <img src={azadiLogo} alt="Azadi Mahotsav" height="80" style={{ marginBottom: "3%" }} />
            <a href="https://www.g20.org/en/" target="_blank" rel="noreferrer">
              <img src={g20Logo} alt="G20" height="80" />
            </a>
          </div>
        </div>
      </section>

      {/* Navigation Menu */}
      <Navbar
        expand="lg"
        className="beautiful-navbar shadow-sm"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "0",
          zIndex: 1000
        }}
      >
        <div className="container-fluid">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 text-white"
            style={{ boxShadow: "none" }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex justify-content-between">
              <div>
                <Nav.Link
                  href="#home"
                  className="nav-menu-item d-flex align-items-center px-4 py-3"
                >
                  <House className="me-2" size={18} />
                  <span>Home</span>
                </Nav.Link>
              </div>
              <div className="d-flex align-items-center">
                <Nav.Link
                  href="#grievance"
                  className="nav-menu-item nav-grievance d-flex align-items-center px-4 py-3"
                >
                  <ExclamationCircle className="me-2" size={18} />
                  <span>Grievance</span>
                </Nav.Link>
                <NavDropdown
                  title={<><Building className="me-2" size={18} color="white" /><span style={{color: 'white'}}>Login</span></>}
                  id="login-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item style={{color: 'white'}} onClick={() => setModalType('affiliation')}>Applicant Login</NavDropdown.Item>
                  <NavDropdown.Item style={{color: 'white'}} onClick={() => setModalType('state')}>State Login</NavDropdown.Item>
                  <NavDropdown.Item style={{color: 'white'}} onClick={() => setModalType('rdsde')}>RDSDE Login</NavDropdown.Item>
                  <NavDropdown.Item style={{color: 'white'}} onClick={() => setModalType('dgt')}>DGT Login</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

   
      {/* Main Content */}
      <div className="container-fluid mt-5">
        <div className="row">
          {/* Sign In Form Section */}
          <div className="col-lg-4 col-12 ">
            {/* {renderForm()} */}
              <Card
              className={`news-ticker shadow-sm mb-4 ${isTickerPaused ? 'paused' : ''}`}
              onMouseEnter={() => setIsTickerPaused(true)}
              onMouseLeave={() => setIsTickerPaused(false)}
            >
              <Card.Header className="d-flex align-items-center justify-content-between">
                <span className="fw-semibold" style={{ color: '#00369A' }}>Latest News</span>
                {/* <small className="text-muted">Hover to pause</small> */}
              </Card.Header>
              <Card.Body className="py-2">
                <div className="news-viewport">
                  <ul className="news-track" style={{ '--news-duration': `${tickerDuration}s` }}>
                    {[...newsItems, ...newsItems].map((item, idx) => (
                      <li key={idx} className="news-item d-flex align-items-start gap-2">
                        <span className="text-primary" aria-hidden>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Carousel Section */}
          <div className="col-lg-8 col-12 ">
            <HeroCarousel />
          </div>
        </div>
      </div>

      {/* Login Modal for all types */}
      <LoginModal
        show={!!modalType}
        handleClose={() => setModalType(null)}
        title={
          modalType === 'affiliation' ? 'Applicant Login' :
          modalType === 'state' ? 'State Login' :
          modalType === 'rdsde' ? 'RDSDE Login' :
          modalType === 'dgt' ? 'DGT Login' : ''
        }
        icon={
          modalType === 'affiliation' ? <Building size={28} color="white" /> :
          modalType === 'state' ? <PersonGear size={28} color="white" /> :
          modalType === 'rdsde' ? <Download size={28} color="white" /> :
          modalType === 'dgt' ? <House size={28} color="white" /> : null
        }
        gradient={
          modalType === 'affiliation' ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" :
          modalType === 'state' ? "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)" :
          modalType === 'rdsde' ? "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)" :
          modalType === 'dgt' ? "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)" : undefined
        }
        onLoginSuccess={() => {
          const userData = JSON.parse(localStorage.getItem("currentUser"));
          if (userData) {
            if (userData.userType === "state_admin" || userData.role === "state_admin") {
              navigate("/dashboard/state_admin");
            } else if (userData.userType === "rdsde" || userData.role === "rdsde") {
              navigate("/dashboard/rdsde");
            } else if (userData.userType === "dgt" || userData.role === "dgt") {
              navigate("/dashboard/");
            }
          }
        }}
      />
  {/* Footer Component */}
  <Footer />
    </Fragment>
  );
};

export default Signin;