import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../axios_custom";
import Swal from "sweetalert2";
import { useState, useRef } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

const steps = [
  "Affiliation under the dual system of training",
  "MoU Details",
  "Industry Details",
  "Contact Details of Concerned Person",
  "Trade Details Sought Under DST",
];

// Step 1 Component
const Step1Affiliation = ({ values, setFieldValue, errors, touched }) => (
  <div className="row">
    <h5 style={{ marginBottom: "1rem" }}>
      Affiliation under the dual system of training{" "}
    </h5>

    <div className="col-md-4 mb-3">
      <label>MIS Code *</label>
      <Field
        name="misCode"
        className="form-control gradient-border"
        onBlur={(e) => fetchItiData(e.target.value, setFieldValue)}
      />
      <ErrorMessage
        name="misCode"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>

    <div className="col-md-4 mb-3">
      <label>Name of ITI *</label>
      <Field
        name="itiName"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="itiName"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>

    <div className="col-md-3 mb-3">
      <label>ITI Category *</label>
      <Field
        as="select"
        name="itiCategory"
        className="form-control gradient-border"
      >
        <option value="">Select</option>
        <option value="Government">Government</option>
        <option value="Private">Private</option>
        <option value="Central">Central</option>
      </Field>
      <ErrorMessage
        name="itiCategory"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>

    <div className="col-md-6 mb-3">
      <label>Address of ITI *</label>
      <Field
        name="itiAddress"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="itiAddress"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>

    <div className="col-md-6 mb-3">
      <label>Details of already Affiliated Trades/Units *</label>
      <Field
        name="affiliatedTrades"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="affiliatedTrades"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
  </div>
);

// Step 2 Component
const Step2MoUDetails = ({ values }) => (
  <div className="row">
    <h5 style={{ marginBottom: "1rem" }}>MoU Details </h5>
    <div className="col-md-4 mb-3">
      <label>MoU Start Date *</label>
      <Field
        type="date"
        name="mouStart"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="mouStart"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-md-4 mb-3">
      <label>MoU End Date *</label>
      <Field
        type="date"
        name="mouEnd"
        className="form-control gradient-border"
        disabled={!values.mouStart}
        min={values.mouStart ? new Date(values.mouStart).toISOString().split('T')[0] : undefined}
      />
      <ErrorMessage
        name="mouEnd"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
      {!values.mouStart && (
        <small className="text-muted">Please select MoU Start Date first</small>
      )}
    </div>
  </div>
);

// Step 3 Component
const Step3IndustryDetails = ({ values, setFieldValue, uploadedFile, setUploadedFile, fileInputRef, handleViewFile, handleRemoveFile }) => (
  <div className="row">
    <h5 style={{ marginBottom: "1rem" }}>Industry Details</h5>

    <div className="col-md-4 mb-3">
      <label>Name of Industry *</label>
      <Field
        name="industryName"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="industryName"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-md-4 mb-3">
      <label>Complete Address of Industry *</label>
      <Field
        name="industryAddress"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="industryAddress"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-md-4 mb-3">
      <label>Total No. of Employees *</label>
      <Field
        name="industryEmployees"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="industryEmployees"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>

    <div className="col-md-3 mb-3">
      <label>Trade Category *</label>
      <Field
        as="select"
        name="tradeCategory"
        className="form-control gradient-border"
        onChange={(e) => {
          const selectedCategory = e.target.value;
          setFieldValue('tradeCategory', selectedCategory);

          // Auto-populate minimum employees based on trade category
          if (selectedCategory === 'Engineering') {
            setFieldValue('minEmployees', '40');
          } else if (selectedCategory === 'Non-Engineering') {
            setFieldValue('minEmployees', '60');
          } else {
            setFieldValue('minEmployees', '');
          }
        }}
      >
        <option value="">Select</option>
        <option value="Engineering">Engineering</option>
        <option value="Non-Engineering">Non-Engineering</option>
      </Field>
      <ErrorMessage
        name="tradeCategory"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>

    <div className="col-md-3 mb-3">
      <label>Min. no of the emp. in the Industry *</label>
      <Field
        name="minEmployees"
        className="form-control gradient-border"
        readOnly
      />
      <ErrorMessage
        name="minEmployees"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>

    <div className="col-md-3 mb-3">
      <label>Min. turnover of industry *</label>
      <Field
        as="select"
        name="minTurnover"
        className="form-control gradient-border"
      >
        <option value="">Select</option>
        <option value="1 crore/year">1 crore/year</option>
        <option value="10 lakh/year">10 lakh/year</option>
      </Field>
      <ErrorMessage
        name="minTurnover"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>

    <div className="col-md-3 mb-3">
      <label>{values.minTurnover === "1 crore/year" ? "Upload Turnover Record in pdf (last 3 year) *" : values.minTurnover === "10 lakh/year" ? "Upload Turnover Record in pdf (last 2 year) *" : "Upload Turnover Record in pdf *"}</label>
      <Field name="uploadTurnoverRecord">
        {({ field, form }) => (
          <input
            {...field}
            ref={fileInputRef}
            type="file"
            className="form-control gradient-border"
            accept="application/pdf"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setUploadedFile(file);
                form.setFieldValue('uploadTurnoverRecord', file);
              }
            }}
            value={undefined}
          />
        )}
      </Field>
      <ErrorMessage
        name="uploadTurnoverRecord"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
      {uploadedFile && (
        <div className="mt-2">
          <small className="text-muted">Uploaded: {uploadedFile.name}</small>
          <div className="mt-1">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary me-2"
              onClick={handleViewFile}
            >
              View
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleRemoveFile(setFieldValue)}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

// Step 4 Component
const Step4ContactDetails = () => (
  <div className="row">
    <h5 style={{ marginBottom: "1rem" }}>
      Contact Details of Concerned Person
    </h5>
    <div className="col-md-4 mb-3">
      <label>Name of Concerned Person *</label>
      <Field
        name="concernedPersonName"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="concernedPersonName"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-md-4 mb-3">
      <label>Email of Concerned Person *</label>
      <Field
        name="concernedPersonEmail"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="concernedPersonEmail"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-md-4 mb-3">
      <label>Contact No of Concerned Person *</label>
      <Field
        name="concernedPersonContact"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="concernedPersonContact"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-md-4 mb-3">
      <label>Industry PAN *</label>
      <Field
        name="industryPan"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="industryPan"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-md-4 mb-3">
      <label>Industry Tin *</label>
      <Field
        name="industryTin"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="industryTin"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-md-4 mb-3">
      <label>Industry GST Registration Number *</label>
      <Field
        name="industryGst"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="industryGst"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
  </div>
);

// Step 5 Component
const Step5TradeDetails = () => (
  <div className="row mt-3">
    <h5 style={{ marginBottom: "1rem" }}>
      Trade Details Sought Under DST
    </h5>
    <div className="col-4 mb-3">
      <label>Name of the Trade for DST *</label>
      <Field
        name="tradeName"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="tradeName"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-4 mb-3">
      <label>Shift-wise Number of Units *</label>
      <Field
        name="shiftUnits"
        className="form-control gradient-border"
      />
      <ErrorMessage
        name="shiftUnits"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
    <div className="col-4 mb-3">
      <label>Already Affiliated Units / New Unit *</label>
      <Field
        as="select"
        name="affiliatedUnitsType"
        className="form-control gradient-border"
      >
        <option value="">Select</option>
        <option value="Already Affiliated">
          Already Affiliated
        </option>
        <option value="New Unit">New Unit</option>
      </Field>
      <ErrorMessage
        name="affiliatedUnitsType"
        component="div"
        className="error"
        style={{ color: "red", fontSize: "0.95em" }}
      />
    </div>
  </div>
);

const initialValues = {
  misCode: "",
  itiName: "",
  itiAddress: "",
  itiCategory: "",
  affiliatedTrades: "",
  tradeCategory: "",
  industryName: "",
  industryAddress: "",
  industryEmployees: "",
  concernedPersonName: "",
  concernedPersonEmail: "",
  concernedPersonContact: "",
  industryPan: "",
  industryTin: "",
  industryGst: "",
  mouStart: "",
  mouEnd: "",
  tradeName: "",
  shiftUnits: "",
  affiliatedUnitsType: "",
  minEmployees: "",
  minTurnover: "",
  uploadTurnoverRecord: null,
};

const validationSchema = () => Yup.object({
  misCode: Yup.string().required("MIS Code is required"),
  itiName: Yup.string().required("Name of ITI is required"),
  itiAddress: Yup.string().required("Address of ITI is required"),
  itiCategory: Yup.string().required("ITI Category is required"),
  affiliatedTrades: Yup.string().required(
    "Affiliated Trades/Units are required"
  ),
  tradeCategory: Yup.string().required("Trade Category is required"),
  industryName: Yup.string().required("Name of Industry is required"),
  industryAddress: Yup.string().required(
    "Complete Address of Industry is required"
  ),
  industryEmployees: Yup.string().required(
    "Total No. of Employees is required"
  ),
  concernedPersonName: Yup.string().required(
    "Name of Concerned Person is required"
  ),
  concernedPersonEmail: Yup.string()
    .email("Invalid email")
    .required("Email of Concerned Person is required"),
  concernedPersonContact: Yup.string().required(
    "Contact No of Concerned Person is required"
  ),
  industryPan: Yup.string().required(
    "Industry PAN/Registration Number is required"
  ),
  industryTin: Yup.string().required("Industry TIN is required"),
  industryGst: Yup.string().required(
    "Industry GST Registration Number is required"
  ),
  mouStart: Yup.date().required("MoU Start Date is required"),
  mouEnd: Yup.date().required("MoU End Date is required"),
  tradeName: Yup.string().required("Name of the Trade for DST is required"),
  shiftUnits: Yup.string().required("Shift-wise Number of Units is required"), affiliatedUnitsType: Yup.string().required(
    "Already Affiliated Units / New Unit selection is required"
  ),
  minEmployees: Yup.string()
    .required("Minimum no of the employees in the Industry is required")
    .test(
      'min-employees-check',
      function(value) {
        const { tradeCategory } = this.parent;
        if (tradeCategory === 'Engineering' && value !== '40') {
          return this.createError({ message: 'For Engineering trade category, minimum employees should be 40' });
        }
        if (tradeCategory === 'Non-Engineering' && value !== '60') {
          return this.createError({ message: 'For Non-Engineering trade category, minimum employees should be 60' });
        }
        return true;
      }
    ),
  minTurnover: Yup.string().required("Min. turnover of industry is required"),
  uploadTurnoverRecord: Yup.mixed().required(
    "Upload Turnover Record is required"
  ),
});

const fetchItiData = async (misCode, setFieldValue) => {
  if (!misCode) return;
  try {
    const response = await axios.get(`http://localhost:3000/api/itis/${misCode}`);
    const data = response.data.iti; // Access the iti object from the response
    setFieldValue('itiName', data.name || '');
    setFieldValue('itiCategory', data.category || '');
    setFieldValue('itiAddress', data.address || '');
    
    // Parse the affiliatedTrades JSON string and join with commas
    let affiliatedTrades = '';
    if (data.affiliatedTrades) {
      try {
        const tradesArray = JSON.parse(data.affiliatedTrades);
        affiliatedTrades = Array.isArray(tradesArray) ? tradesArray.join(', ') : data.affiliatedTrades;
      } catch (e) {
        affiliatedTrades = data.affiliatedTrades;
      }
    }
    setFieldValue('affiliatedTrades', affiliatedTrades);
  } catch (error) {
    console.error('Error fetching ITI data:', error);
    if (error.response && error.response.status === 404) {
      Swal.fire({
        icon: 'error',
        title: 'ITI Not Found',
        text: 'ITI not found for the given MIS Code',
        confirmButtonColor: '#007bff'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error fetching ITI data',
        confirmButtonColor: '#007bff'
      });
    }
  }
};

const DstAffiliation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleViewFile = () => {
    if (uploadedFile) {
      const fileURL = URL.createObjectURL(uploadedFile);
      window.open(fileURL, '_blank');
    }
  };

  const handleRemoveFile = (setFieldValue) => {
    setUploadedFile(null);
    setFieldValue('uploadTurnoverRecord', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = (validateForm, setTouched, values) => {
    const errors = validateForm();
    const stepFields = getStepFields(activeStep);

    // Check if current step has errors
    const hasErrors = stepFields.some(field => errors[field]);
    if (hasErrors) {
      // Mark fields as touched to show errors
      const touchedFields = {};
      stepFields.forEach(field => {
        touchedFields[field] = true;
      });
      setTouched(touchedFields);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepFields = (step) => {
    switch (step) {
      case 0:
        return ['misCode', 'itiName', 'itiAddress', 'itiCategory', 'affiliatedTrades'];
      case 1:
        return ['mouStart', 'mouEnd'];
      case 2:
        return ['industryName', 'industryAddress', 'industryEmployees', 'tradeCategory', 'minEmployees', 'minTurnover', 'uploadTurnoverRecord'];
      case 3:
        return ['concernedPersonName', 'concernedPersonEmail', 'concernedPersonContact', 'industryPan', 'industryTin', 'industryGst'];
      case 4:
        return ['tradeName', 'shiftUnits', 'affiliatedUnitsType'];
      default:
        return [];
    }
  };

  const renderStepContent = (step, formikProps) => {
    switch (step) {
      case 0:
        return <Step1Affiliation {...formikProps} />;
      case 1:
        return <Step2MoUDetails {...formikProps} />;
      case 2:
        return <Step3IndustryDetails {...formikProps} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} fileInputRef={fileInputRef} handleViewFile={handleViewFile} handleRemoveFile={handleRemoveFile} />;
      case 3:
        return <Step4ContactDetails {...formikProps} />;
      case 4:
        return <Step5TradeDetails {...formikProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        .gradient-border:focus {
          border: 2px solid #007bff !important;
          box-shadow: 0 0 0 2px #00c6ff, 0 0 8px 0 #007bff;
          outline: none !important;
        }
      `}</style>
      <div className="container-fulid py-4">
        <Typography variant="h4" align="center" gutterBottom>
          DST Affiliation Form
        </Typography>

        <Box sx={{ width: '100%', mt: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>  
              </Step>
            ))}
          </Stepper>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema()}
              validateOnMount={true}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Form submitted successfully!',
                  confirmButtonColor: '#28a745'
                });
                setSubmitting(false);
                resetForm();
                setActiveStep(0);
              }}
            >
              {({ isSubmitting, setFieldValue, values, validateForm, setTouched, errors, touched }) => {
                const hasStepErrors = getStepFields(activeStep).some(field => errors[field]);
                return (
                  <Form>
                    {renderStepContent(activeStep, { values, setFieldValue, errors, touched })}

                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleNext(validateForm, setTouched, values)}
                        disabled={hasStepErrors}
                        sx={{ minWidth: '140px', whiteSpace: 'nowrap', padding: '8px 16px' }}
                      >
                        Save & Continue
                      </Button>
                    )}
                  </Box>
                </Form>
                );
              }}
            </Formik>
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default DstAffiliation;
