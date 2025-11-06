import React, { createContext, useRef, useContext, Fragment, useState, useEffect, startTransition } from "react";
import { Row, Col, Card, Form as BS, InputGroup, Button, Modal, Accordion } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, FieldArray, Form, ErrorMessage, useFormikContext } from "formik";
import { useLocation } from "react-router-dom";
import * as get from "../../../../../../../../db/forms/stageI/get/get";
import * as set from "../../../../../../../../db/forms/stageI/set/set";
import * as C from "affserver";
import { Navigations } from "../../../../../../../Assessment/components"

// import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import SwalManager from "../../../../../../../../common/SwalManager";
import * as st from "../../../../../../../../services/state/index"
import { IdProofUpoloadFormApplicant } from "./documents/id_proof_of_authorized_signatory";
import { RegCertOrgAppliForm } from "./documents/reg_cert_app_org_applicant_form";
import { IdProofSecretaryChairpersonPresidentFormForApplicant } from "./documents/IdProofSecretaryChairpersonPresidentFormForApplicant";
import { ResolutionForStartingITI } from "./documents/ResolutionForStartingITI";
import { ResFromApplicantForAuthorizedSignatory } from "./documents/ResFromApplicantForAuthorizedSignatory";
// import { ResolutionRegardingEarmarkingOfLandBuildingAndOtherResourcesExclusivelyDedicatedToTheITI } from "./documents/EarmarkingRemark";

import { ContextMap } from "../../../../../../../formik/contexts/index";
import { formatedDate } from "@/helpers";



export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);

export const DocumentFormContext = createContext();

export const Documents = ({ step, view: viewProp = false, isView = false, nav }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const [view, setView] = useState(viewProp);

  const Context = ContextMap['stageIAsmtDetails'] || ContextMap.default;
  const { assessmentInfo } = useContext(Context);


  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const handleShowModal = (size) => {
    switch (size) {
      case "xl":
        setShowXlModal(true);
        break;
      default:
        break;
    }
    setSelectedSize(size);
  };


  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);



  // const submitHandlersRef = useRef({});



  // const handleAllSubmit = async () => {

  //   const confirmed = await SwalManager.confirmSave();
  //   if (!confirmed) return;


  //   console.log(registry);

  //   try {
  //     SwalManager.showLoading("Saving...");
  //     await new Promise(res => setTimeout(res, 1)); // Simulated API call
  //     SwalManager.hide();

  //     let keyName, data, list = [];

  //     for (const [key, val] of Object.entries(registry.current)) {
  //       keyName = key;
  //       data = val();
  //       console.log(data);
  //       switch (keyName) {
  //         case C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY:
  //           list.push(await data.submitNow());
  //           break;
  //         case C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION:
  //           console.log(data);
  //           list.push(await data.submitNow());
  //           break;
  //         case C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT:
  //           console.log(data);
  //           list.push(await data.submitNow());
  //           break;
  //         case C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE:
  //           console.log(data);
  //           list.push(await data.submitNow());
  //           break;
  //         default:
  //           list.push(false);
  //           break;
  //       }
  //     }

  //     const allTrue = list.every(Boolean);
  //     if (allTrue) {
  //       let reuslt = await SwalManager.success("Saved Successfully");
  //       if (reuslt.isConfirmed) {
  //         // await set.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DOCUMENTS_UPLOAD.step);
  //         await st.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DOCUMENTS_UPLOAD.step);
  //         nav.next();
  //       }
  //     }
  //     else {
  //       throw new Error("Please Review the documents");

  //     }
  //   } catch (error) {
  //     console.log(error);
  //     SwalManager.hide();
  //     await SwalManager.error("Please Fill the Forms");
  //   }
  // };
  // nav.next();


  const testFn = () => {
    console.log('dfadfdf');
  }


  // Experiment Starts @dpkdhariwal
  const registry = useRef([]); // store all child functions
  const register2 = (index, obj) => {
    registry.current[index] = obj;
  };
  // Experiment Ends here @dpkdhariwal





  // // SetIdProofOfAuthorizedSignator 
  // const SetIdProofOfAuthorizedSignator = (index, register) => {
  //   // console.log(step?.actor);
  //   switch (step?.actor) {
  //     case C.SL.APPLICANT:
  //       return <IdProofUpoloadFormApplicant />
  //     case C.SL.ASSESSOR:
  //       return <IdProofOfAuthorizedSignatory isView={isView} key={index} registerSubmit={register} test={testFn} />
  //     default:
  //       return "NA";
  //   }
  // }


  // // SetIdProofOfAuthorizedSignator 
  // const setRegCertOrgAppliForm = (index, register) => {
  //   // console.log(step?.actor);
  //   switch (step?.actor) {
  //     case C.SL.APPLICANT:
  //       return <RegCertOrgAppliForm />
  //     case C.SL.ASSESSOR:
  //       return <RegistrationCertificateOfApplicantOrganization isView={isView} key={index} registerSubmit={register} />
  //     default:
  //       return "NA";
  //   }
  // }



  // const setIdProofSecretaryChairpersonPresidentFormForApplicant = (index, register) => {
  //   // console.log(step?.actor);
  //   switch (step?.actor) {
  //     case C.SL.APPLICANT:
  //       return <IdProofSecretaryChairpersonPresidentFormForApplicant />
  //     case C.SL.ASSESSOR:
  //       return <IdProofOfSecretaryChairpersonPresident isView={isView} key={index} registerSubmit={register} />
  //     default:
  //       return "NA";
  //   }
  // }

  // const setResolutionCertificate = (index, register) => {
  //   // console.log(step?.actor);
  //   switch (step?.actor) {
  //     case C.SL.APPLICANT:
  //       return <><ResolutionForStartingITI /> <ResFromApplicantForAuthorizedSignatory /> <ResolutionRegardingEarmarkingOfLandBuildingAndOtherResourcesExclusivelyDedicatedToTheITI /> </>
  //     case C.SL.ASSESSOR:
  //       return <ResolutionCertificate isView={isView} key={index} registerSubmit={register} />
  //     default:
  //       return "NA";
  //   }
  // }
  const [activeIds, setActiveIds] = useState(['0', '1', '2', '3', '4', '5']);
  const [vCompList, setVCompList] = useState([]);

  const addItem = (newItem) => {
    setVCompList((prev) => [...prev, newItem]);
  };
  // Loadin Data
  const loadData = async () => {
    try {
      const result = await st.get_vrf_list_land_to_be_used(appId, step.step);
      console.log(result.data);
      result.data?.map((item, index) => {
        switch (item.checkName) {
          case C.DA1_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY:
            switch (step?.actor) {
              // case C.SL.APPLICANT:
              //   addItem({ row: item, title: item.checkName, comp: <IdProofUpoloadFormApplicant data={item} /> });
              //   return
              case C.SL.ASSESSOR:
                addItem({ row: item, title: item.checkName, comp: <IdProofOfAuthorizedSignatory data={item} isView={isView} key={index} /> });
                break;
              default:
                return "NA";
            }
            break;
          case C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION:
            switch (step?.actor) {
              // case C.SL.APPLICANT:
              //   addItem({ row: item, title: item.checkName, comp: <RegCertOrgAppliForm data={item} /> });
              //   break;
              case C.SL.ASSESSOR:
                addItem({ row: item, title: item.checkName, comp: <RegistrationCertificateOfApplicantOrganization data={item} isView={isView} key={index} /> });
                break;
              default:
                return "NA";
            }

            break;
          case C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT:
            switch (step?.actor) {
              // case C.SL.APPLICANT:
              //   addItem({ row: item, title: item.checkName, comp: <IdProofSecretaryChairpersonPresidentFormForApplicant data={item} /> });
              //   break;
              case C.SL.ASSESSOR:
                addItem({ row: item, title: item.checkName, comp: <IdProofOfSecretaryChairpersonPresident data={item} isView={isView} key={index} /> });
                break;
              default:
                return "NA";
            }

            break;
          case C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE:
            switch (step?.actor) {
              // case C.SL.APPLICANT:
              //   addItem({ row: item, title: item.checkName, comp: <ResolutionForStartingITI data={item} /> });
              //   // addItem({ row: item, title: item.checkName, comp: <ResFromApplicantForAuthorizedSignatory /> });
              //   // addItem({ row: item, title: item.checkName, comp: <ResolutionRegardingEarmarkingOfLandBuildingAndOtherResourcesExclusivelyDedicatedToTheITI /> });
              //   break;
              case C.SL.ASSESSOR:
                addItem({ row: item, title: item.checkName, comp: <ResolutionCertificate data={item} isView={isView} key={index} /> });
                break;
              default:
                return "NA";
            }

            break;
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { loadData(); }, []);

  const formsRef = useRef({});
  const registerForm = (id, formikRef) => {
    formsRef.current[id] = formikRef;
  };
  const unregisterForm = (id) => {
    delete formsRef.current[id];
  };

  const onNext = async () => {
    const allValues = [];
    const changeArray = [];
    const isFormValid = [];
    console.log(formsRef.current);
    try {
      for (const id in formsRef.current) {
        const formInfo = await formsRef?.current[id];
        const { changeInForm, getData, editMode, refNo } = formInfo;
        let formInstance = await getData();

        console.log(formInstance);
        console.log(changeInForm);
        changeArray.push(changeInForm);
        if (changeInForm == true) {
          let formInstance = getData();
          formInstance = formInstance.current;
          await formInstance.validateForm();
          console.log(formInstance.values);
          console.log(formInstance.isValid);
          isFormValid.push(formInstance.isValid);
          allValues.push({ toSave: changeInForm, refNo: refNo, id: id, values: formInstance.values });
        }
        else {
          allValues.push({ toSave: changeInForm, id: id });
        }
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(changeArray.every(v => !v));
    if (changeArray.every(v => !v)) {
      console.log("All values are false!");
      nav.next();
    } else {
      console.log(isFormValid.every(v => v));
      if (isFormValid.every(v => v)) {
        console.log("All forms submitted:", allValues, changeArray);
        await st.save_da_doc_verification_remarks(appId, assessmentInfo.assessment_id, allValues, step.step);
        nav.next();
      } else {
        console.log("Please Review Assessment First");
        Swal.fire({
          icon: "warning",
          title: "Review Documents",
          showConfirmButton: true,
          confirmButtonText: "OK",
          allowOutsideClick: false
        });
      }
    }
  }

  useEffect(() => {
    setActiveIds(vCompList.map((_, idx) => String(idx)))
  }, [vCompList])

  useEffect(() => {
    console.log(activeIds);
  }, [activeIds])


  /////////////////////
  const [initValues, setInitValues] = useState(C.st1Asmt.UploadedDocuments.intiValues);
  const LoadVerificationStatus = async () => {
    try {
      const resp = await st.getVerificationListForStageI(appId, step.step);
      console.log(resp.data);
      setInitValues(resp.data);




      Object.entries(resp.data).forEach(([key, value]) => {
        console.log(key, value);
        switch (key) {
          case C.DA1_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY:
            addItem({ row: item, title: item.checkName, comp: <IdProofOfAuthorizedSignatory data={item} isView={isView} key={index} /> });
            break;
          case C.DA1_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION:
            addItem({ row: item, title: item.checkName, comp: <RegistrationCertificateOfApplicantOrganization data={item} isView={isView} key={ndex} /> });
            break;
          case C.DA1_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT:
            addItem({ row: item, title: item.checkName, comp: <IdProofOfSecretaryChairpersonPresident data={item} isView={isView} key={index} /> });
            break;
          case C.DA1_KEYS.RESOLUTION_CERTIFICATE:
            addItem({ row: item, title: item.checkName, comp: <ResolutionCertificate data={item} isView={isView} key={index} /> });
            break;
        }
      });

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => { LoadVerificationStatus(); }, []);


  return (
    <DocumentFormContext.Provider value={{ registerForm, unregisterForm }}>
      <FunctionRegistryContext.Provider value={register2}>
        <div style={{ backgroundColor: "rgb(245, 245, 245)", margin: "10px 0px 0px", borderRadius: 6, borderStyle: "dashed", borderWidth: "thin", padding: "10px", }}>
          <div>
            {console.log(vCompList.map((_, idx) => String(idx)))}
            <Accordion className="customized-accordion accordions-items-seperate"
              alwaysOpen
              defaultActiveKey={activeIds}
            >
              {console.log(vCompList)}
              {vCompList.map((c, idx) => {
                return (
                  <Accordion.Item eventKey={String(idx)} key={idx} className={`collapse show custom-accordion-${{ yes: 'success', no: 'danger' }[c?.row?.Verificiation?.as_per_norms] || 'primary'} `} eventKey={String(idx)}>
                    <Accordion.Header>{c.title}</Accordion.Header>
                    <Accordion.Body >
                      {c.comp}
                    </Accordion.Body>
                  </Accordion.Item>)
              })}
            </Accordion>
          </div>
        </div>
        {isView == false && <Navigations nav={nav} onNext={() => { onNext() }} />}
      </FunctionRegistryContext.Provider>
    </DocumentFormContext.Provider>

  );
};




// ID Proof of Authorized Signatory
export const IdProofOfAuthorizedSignatory = ({ data, step, view: viewProp = false, registerSubmit, isView = false, actionInfo }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");


  const formikMethodsRef = useRef(null);

  // Function to capture Formik methods
  const handleRegister = (methods) => { formikMethodsRef.current = methods; };

  // Validation Schema
  const validationSchema = yup.object().shape({ as_per_norms: yup.string().required("Select Whether the ID Proof is as per norms?"), reason: yup.string().when("as_per_norms", { is: "no", then: () => yup.string().required("Please select a category"), otherwise: () => yup.string().notRequired(), }), assessor_comments: yup.string().when(["as_per_norms", "reason"], { is: (as_per_norms, reason) => as_per_norms === "no" && reason === "other", then: () => yup.string().required("Please provide your comments"), otherwise: () => yup.string().notRequired(), }), });


  const [view, setView] = useState(viewProp);
  const MaxData = [
    { value: "Document is not legible", label: "Document is not legible" },
    { value: "Document is irrelevant", label: "Document is irrelevant" },
    {
      value: "Document lacks required information",
      label: "Document lacks required information",
    },
    {
      value:
        "Document is not approved by the competent authority in the State/ UT",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value:
        "Address on the document does not match with the proposed land/ building address",
      label:
        "Address on the document does not match with the proposed land/ building address",
    },
    {
      value:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
      label:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
    },
    {
      value: "other",
      label: "other",
    },
  ];

  const { Formik } = formik;
  const formRef2 = useRef();


  // useState
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formData, setFormData] = useState({});
  const [formVisibility, setFormVisibility] = useState(false);
  const [formSubmited, setFormSubmited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [aStatus, setAStatus] = useState({});
  // End


  // useRef
  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);
  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);
  // End



  const formRef = useRef(); // create ref

  // Loading Review Details
  const loadInfo = async () => {
    let result, assessment_status;
    // let result = await set.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY);
    let resp1 = await st.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY);
    console.log(resp1);
    result = resp1.data;

    // let assessment_status = await set.getAssessmentProgressStatus(appId);
    let resp2 = await st.getAssessmentProgressStatus(appId);
    assessment_status = resp2.data;
    setAStatus(assessment_status);
    const lastObj = result[result.length - 1];
    if (lastObj) {
      setInitValue(lastObj);
      setFormData(lastObj);
      setFormSubmited(true);
      setIsLoaded(true);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
    }
    return lastObj;
  }
  useEffect(() => { loadInfo(); }, [appId]);

  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
  const register = useFunctionRegistry();
  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);
  const form = async () => {
    if (formRef.current.isValid) {
      // await set.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY);
      // await set.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY);
      await st.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY);
      setAnyChangesMade(false);
      setEditMode(false);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
      return true;
    }
    else {
      return false;
    }
  }
  const submitNow = async () => {
    console.log(reviewStatus)
    switch (reviewStatusRef.current) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editModeRef.current) {
          case true:
            return await form();
          case false:
            return true;
        }
        break;
      default:
        break;
    }
  }

  //Important Attaching to Context 
  let obj = { changeInForm: anyChangesMade, refNo: data.uniqueId, editMode: editMode, getData: () => { return formRef } }
  console.log(obj);
  const [formId, setFormId] = useState(C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY); // true || false
  const { registerForm, unregisterForm } = useContext(DocumentFormContext);
  registerForm(formId, obj);
  useEffect(() => {
    if (formRef.current) {
      registerForm(formId, obj);
    }
    // return () => unregisterForm(formId);
  }, [formRef, formId, registerForm, unregisterForm, obj]);
  const hChangeInForm = async () => {
    // await formRef.current.submitForm();
    console.log("land document da action registered");
    registerForm(formId, obj);
  }
  useEffect(() => {
    registerForm(formId, obj);
  }, [appId]);
  useEffect(() => {
    registerForm(formId, obj);
  }, [formRef]);
  // End
  useEffect(() => {
    hChangeInForm();
  }, [appId]);
  useEffect(() => {
    if (data.Verificiation === null) {
      setAnyChangesMade(true);
    }
  }, [data]);





  const onEdit = () => {
    setReviewStatus(C.SL.PENDING);
    setAnyChangesMade(true);
  }
  return (
    <>
      <Row
        style={{
          // backgroundColor: "rgb(245, 245, 245)",
          // margin: "10px 0px 0px",
          borderRadius: 6,
        }}
      >
        <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
          <table
            width="98%"
            border={1}
            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <tbody>
              <tr><th colSpan={5}>ID Proof of Authorized Signatory</th>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }}>Name</th>
                {/* <th style={{ border: "1px solid black" }}>Designation</th> */}
                <th style={{ border: "1px solid black" }}>Email Id</th>
                <th style={{ border: "1px solid black" }}>Mobile Number</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>{data?.init_auth_signatory_detail?.name}</td>
                {/* <td style={{ border: "1px solid black" }}>{data?.init_auth_signatory_detail?.name}</td> */}
                <td style={{ border: "1px solid black" }}>{data?.init_auth_signatory_detail?.email_id}</td>
                <td style={{ border: "1px solid black" }}>{data?.init_auth_signatory_detail?.mobile_number}</td>
              </tr>
              <tr>
                <th style={{ border: "1px solid black" }}>Select ID Proof Type</th>
                <th style={{ border: "1px solid black" }}>Enter ID Proof Number</th>
                <th colSpan={2} style={{ border: "1px solid black" }}>Document Upload</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>{data?.init_auth_signatory_detail?.id_proof_type}</td>
                <td style={{ border: "1px solid black" }}>{data?.init_auth_signatory_detail?.id_proof_number}</td>
                <td colSpan={2} style={{ border: "1px solid black" }}><Button onClick={() => { alert('doc_of_authorized_signatory') }}>View ID Proof Document</Button></td>
              </tr>
            </tbody>
          </table>
        </Col>
        {view != true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div className="form-container">
            {reviewStatus == C.SL.PENDING || editMode === true && viewType == C.SL.FORM ? (
              <Formik
                innerRef={formRef}
                enableReinitialize
                validationSchema={validationSchema}
                validateOnChange={() => console.log("validateOnChange")}
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}   // ✅ this makes validation run when form loads
              >
                {({
                  handleSubmit,
                  handleChange,
                  submitForm,
                  values,
                  errors,
                  touched,
                  validateForm,
                  dirty
                }) => {
                  useEffect(() => { setAnyChangesMade(dirty); }, [dirty, values]);
                  // if (registerSubmit) {
                  //   // registerSubmit(submitForm, validateForm, formVisibility, getLatestValue);
                  // }
                  return (

                    <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
                      <Card.Header>
                        <label
                          className="main-content-label my-auto"
                          style={{ textTransform: "none" }}
                        >
                          Review Form
                          <p>Any changes made? {anyChangesMade ? "Yes" : "No"}</p>

                        </label>
                        <div className="ms-auto d-flex">
                          <Button
                            size="sm"
                            type="button"
                            className="rounded-pill btn-wave btn-outline-dark"
                            variant="btn-outline-dark"
                          >
                            Review Instructions
                          </Button>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <BS ref={formRef2} onSubmit={handleSubmit} validated>
                          <Row className="mb-3">
                            <BS.Group>
                              <BS.Label>
                                Whether the ID Proof of Authorized Signatory is as per norms?
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
                              <div>
                                <BS.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  name="as_per_norms"
                                  value="yes"
                                  onChange={handleChange}
                                  checked={values.as_per_norms === "yes"}
                                  isInvalid={
                                    touched.as_per_norms &&
                                    !!errors.as_per_norms
                                  }
                                />
                                <BS.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  name="as_per_norms"
                                  value="no"
                                  onChange={handleChange}
                                  checked={values.as_per_norms === "no"}
                                  isInvalid={
                                    touched.as_per_norms &&
                                    !!errors.as_per_norms
                                  }
                                />
                              </div>

                              <BS.Control.Feedback type="invalid">
                                {errors.category}
                              </BS.Control.Feedback>
                            </BS.Group>
                          </Row>
                          {values.as_per_norms === "no" && (
                            <Row className="mb-3">
                              <BS.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                              >
                                <BS.Label>
                                  Select the Reason(s) and Raise
                                  Non-Conformities (NC)
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <Field
                                  required
                                  name="reason"
                                  as="select"
                                  className="form-control"
                                  onChange={handleChange}
                                >
                                  <option value="">Select</option>
                                  {MaxData.map((lang, i) => {
                                    return (
                                      <option key={i} value={lang.value}>
                                        {lang.label}
                                      </option>
                                    );
                                  })}
                                </Field>
                                <BS.Control.Feedback>
                                  Looks good!
                                </BS.Control.Feedback>
                              </BS.Group>
                              {values.reason == "other" && (
                                <BS.Group
                                  required
                                  as={Col}
                                  md="12"
                                  controlId="text-area"
                                  style={{ marginTop: "1rem" }}
                                >
                                  <BS.Label>
                                    Any other reason, please specify{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </BS.Label>
                                  <BS.Control
                                    name="assessor_comments"
                                    required
                                    as="textarea"
                                    rows={3}
                                    className={`form-control ${touched.assessor_comments &&
                                      errors.assessor_comments
                                      ? "is-invalid"
                                      : ""
                                      }`}
                                    value={values.assessor_comments}
                                    onChange={handleChange}
                                    isInvalid={
                                      touched.assessor_comments &&
                                      !!errors.assessor_comments
                                    }
                                  />
                                  {touched.assessor_comments &&
                                    errors.assessor_comments && (
                                      <div className="invalid-feedback">
                                        {errors.assessor_comments}
                                      </div>
                                    )}
                                </BS.Group>)}

                            </Row>
                          )}
                          {/* 🔹 Registers methods */}
                          <FormikRegister registerSubmit={handleRegister} />
                        </BS>
                      </Card.Body>
                      {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                    </Card>)
                }
                }
              </Formik>
            ) : reviewStatus == C.SL.REVIEWED && editMode === false ? (
              <Card
                className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
                style={formData.as_per_norms == "yes" ? { backgroundColor: "#d6f3e0" } : { backgroundColor: "#f3d6d6" }} >
                <Card.Header>
                  <label className="main-content-label my-auto" style={{ textTransform: "none" }} >
                    Assessor Comments
                  </label>
                  {/* <div className="ms-auto  d-flex">
                    25th April 2025:10:20PM
                  </div> */}
                </Card.Header>
                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                  <Row className="mb-3">
                    <Col md={12}> <b>Whether the ID Proof of Authorized Signatory is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {/* && aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR */}
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setReviewStatus(C.SL.PENDING); }}>
                    Edit
                  </Button>
                </Card.Footer>)}
              </Card>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </Col>)}
      </Row>
    </>
  );
};


// Registration Certificate of Applicant Organization
export const RegistrationCertificateOfApplicantOrganization = ({ data, step, view: viewProp = false, registerSubmit, isView = false }) => {
  const formRef = useRef(); // create ref

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const MaxData = [
    { value: "Document is not legible", label: "Document is not legible" },
    { value: "Document is irrelevant", label: "Document is irrelevant" },
    {
      value: "Document lacks required information",
      label: "Document lacks required information",
    },
    {
      value:
        "Document is not approved by the competent authority in the State/ UT",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value:
        "Address on the document does not match with the proposed land/ building address",
      label:
        "Address on the document does not match with the proposed land/ building address",
    },
    {
      value:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
      label:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
    },
    {
      value: "other",
      label: "other",
    },
  ];

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  // useState
  const [view, setView] = useState(viewProp);
  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formVisibility, setFormVisibility] = useState(false);
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW

  const [aStatus, setAStatus] = useState({});
  // End

  // useRef
  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);
  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);
  //End


  const handleShowModal = (size) => {
    switch (size) {
      case "xl":
        setShowXlModal(true);
        break;
      default:
        break;
    }
    setSelectedSize(size);
  };




  const submitAction = async (values) => {
    console.log(values);
    await set.set_da_status(appId, values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION);
  }



  const loadInfo = async () => {
    let assessment_status, result, resp;
    // let result = await set.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION);
    resp = await st.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION);
    result = resp.data;
    // let assessment_status = await set.getAssessmentProgressStatus(appId);
    resp = await st.getAssessmentProgressStatus(appId);
    assessment_status = resp.data;
    console.log(assessment_status);
    setAStatus(assessment_status);
    console.log(result);
    if (result) {
      const lastObj = result[result.length - 1];
      console.log(lastObj);
      if (lastObj) {
        setInitValue(lastObj);
        setFormData(lastObj);
        setFormSubmited(true);

        setReviewStatus(C.SL.REVIEWED);
        setViewType(C.SL.VIEW);
      }
    }
  }

  useEffect(() => {
    loadInfo();
  }, [appId]);



  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
  const register = useFunctionRegistry();
  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);
  const form = async () => {
    if (formRef.current.isValid) {
      // await set.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION);
      await st.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION);

      setAnyChangesMade(false);
      setEditMode(false);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
      return true;
    }
    else {
      return false;
    }
  }
  const submitNow = async () => {
    switch (reviewStatusRef.current) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editModeRef.current) {
          case true:
            return await form();
          case false:
            return true;
        }
        break;
      default:
        break;
    }
  }


  //Important Attaching to Context 
  let obj = { changeInForm: anyChangesMade, refNo: data.uniqueId, editMode: editMode, getData: () => { return formRef } }
  const [formId, setFormId] = useState(C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION); // true || false
  const { registerForm, unregisterForm } = useContext(DocumentFormContext);
  registerForm(formId, obj);
  useEffect(() => {
    if (formRef.current) {
      registerForm(formId, obj);
    }
    // return () => unregisterForm(formId);
  }, [formRef, formId, registerForm, unregisterForm, obj]);
  const hChangeInForm = async () => {
    // await formRef.current.submitForm();
    console.log("land document da action registered");
    registerForm(formId, obj);
  }
  useEffect(() => {
    registerForm(formId, obj);
  }, [appId]);
  useEffect(() => {
    registerForm(formId, obj);
  }, [formRef]);
  useEffect(() => {
    hChangeInForm();
  }, [appId]);
  useEffect(() => {
    if (data.Verificiation === null) {
      setAnyChangesMade(true);
    }
  }, [data]);

  const onEdit = () => {
    setReviewStatus(C.SL.PENDING);
    setAnyChangesMade(true);
  }

  return (
    <>
      <Row
        style={{
          // backgroundColor: "rgb(245, 245, 245)",
          // margin: "10px 0px 0px",
          borderRadius: 6,
        }}
      >
        <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
          <table
            width="98%"
            border={1}
            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Registration Certificate of Applicant Organization</th>
                <th style={{ border: "1px solid black" }}>Uploaded Date</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  <Button onClick={() => { alert(data?.init_certificate?.document) }} >View Reg. Cert. of Organization</Button></td>
                <td style={{ border: "1px solid black" }}>{formatedDate(data?.init_certificate?.upload_datetime)}</td>
              </tr>

            </tbody>
          </table>
        </Col>
        {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div className="form-container">
            {reviewStatus == C.SL.PENDING || editMode === true && viewType == C.SL.FORM ? (

              <Formik
                innerRef={formRef}
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup
                    .string()
                    .required("Select Whether the Registration Certificate of the Applicant Organization is as the norms?"),

                  reason: yup.string().when("as_per_norms", {
                    is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                    then: () =>
                      yup.string().required("Please select a category"),
                    otherwise: () => yup.string().notRequired(),
                  }),

                  assessor_comments: yup.string().when("as_per_norms", {
                    is: (as_per_norms, reason) => as_per_norms === "no" && reason === "other",
                    then: () =>
                      yup.string().required("Please provide your comments"),
                    otherwise: () => yup.string().notRequired(),
                  }),
                })}
                validateOnChange={() => console.log("validateOnChange")}
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}   // ✅ this makes validation run when form loads
              >
                {({
                  handleSubmit,
                  handleChange,
                  submitForm,
                  values,
                  errors,
                  touched,
                  validateForm
                }) => {
                  if (registerSubmit) {
                    registerSubmit(submitForm, validateForm, formVisibility);
                  }
                  return (
                    <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
                      <Card.Header>
                        <label
                          className="main-content-label my-auto"
                          style={{ textTransform: "none" }}
                        >
                          Review Form
                        </label>
                        <div className="ms-auto d-flex">
                          <Button
                            size="sm"
                            onClick={() => handleShowModal("xl")}
                            type="button"
                            className="rounded-pill btn-wave btn-outline-dark"
                            variant="btn-outline-dark"
                          >
                            Review Instructions
                          </Button>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <BS ref={formRef2} onSubmit={handleSubmit} validated>
                          <Row className="mb-3">
                            <BS.Group>
                              <BS.Label>
                                Whether the Registration Certificate of the Applicant Organization is as the norms?
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
                              <div>
                                <BS.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  name="as_per_norms"
                                  value="yes"
                                  onChange={handleChange}
                                  checked={values.as_per_norms === "yes"}
                                  isInvalid={
                                    touched.as_per_norms &&
                                    !!errors.as_per_norms
                                  }
                                />
                                <BS.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  name="as_per_norms"
                                  value="no"
                                  onChange={handleChange}
                                  checked={values.as_per_norms === "no"}
                                  isInvalid={
                                    touched.as_per_norms &&
                                    !!errors.as_per_norms
                                  }
                                />
                              </div>

                              <BS.Control.Feedback type="invalid">
                                {errors.category}
                              </BS.Control.Feedback>
                            </BS.Group>
                          </Row>
                          {values.as_per_norms === "no" && (
                            <Row className="mb-3">
                              <BS.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                              >
                                <BS.Label>
                                  Select the Reason(s) and Raise
                                  Non-Conformities (NC)
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <Field
                                  required
                                  name="reason"
                                  as="select"
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  {MaxData.map((lang, i) => {
                                    return (
                                      <option key={i} value={lang.value}>
                                        {lang.label}
                                      </option>
                                    );
                                  })}
                                </Field>
                                <BS.Control.Feedback>
                                  Looks good!
                                </BS.Control.Feedback>
                              </BS.Group>
                              {values.reason == "other" && (<BS.Group
                                required
                                as={Col}
                                md="12"
                                controlId="text-area"
                                style={{ marginTop: "1rem" }}
                              >
                                <BS.Label>
                                  Any other reason, please specify{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <BS.Control
                                  name="assessor_comments"
                                  required
                                  as="textarea"
                                  rows={3}
                                  className={`form-control ${touched.assessor_comments &&
                                    errors.assessor_comments
                                    ? "is-invalid"
                                    : ""
                                    }`}
                                  value={values.assessor_comments}
                                  onChange={handleChange}
                                  isInvalid={
                                    touched.assessor_comments &&
                                    !!errors.assessor_comments
                                  }
                                />
                                {touched.assessor_comments &&
                                  errors.assessor_comments && (
                                    <div className="invalid-feedback">
                                      {errors.assessor_comments}
                                    </div>
                                  )}
                              </BS.Group>)}

                            </Row>
                          )}

                        </BS>
                      </Card.Body>
                      {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                    </Card>
                  )
                }}
              </Formik>
            ) : reviewStatus == C.SL.REVIEWED && editMode === false ? (

              <Card
                className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
                style={
                  formData.as_per_norms == "yes"
                    ? { backgroundColor: "#d6f3e0" }
                    : { backgroundColor: "#f3d6d6" }
                }
              >
                <Card.Header>
                  <label
                    className="main-content-label my-auto"
                    style={{ textTransform: "none" }}
                  >
                    Assessor Comments
                  </label>
                  <div className="ms-auto  d-flex">
                    25th April 2025:10:20PM
                  </div>
                </Card.Header>
                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                  <Row className="mb-3">
                    <Col md={12}> <b>Whether the Registration Certificate of the Applicant Organization is as the norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {/* aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR */}
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setReviewStatus(C.SL.PENDING); }}>
                    Edit
                  </Button>
                </Card.Footer>)}

              </Card>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </Col>)}
      </Row>
    </>
  );
};


// ID Proof of Secretary/Chairperson/President
export const IdProofOfSecretaryChairpersonPresident = ({ data, step, view: viewProp = false, registerSubmit, isView = false }) => {
  const formRef = useRef(); // create ref

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const MaxData = [
    { value: "Document is not legible", label: "Document is not legible" },
    { value: "Document is irrelevant", label: "Document is irrelevant" },
    {
      value: "Document lacks required information",
      label: "Document lacks required information",
    },
    {
      value:
        "Document is not approved by the competent authority in the State/ UT",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value:
        "Address on the document does not match with the proposed land/ building address",
      label:
        "Address on the document does not match with the proposed land/ building address",
    },
    {
      value:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
      label:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
    },
    {
      value: "other",
      label: "other",
    },
  ];

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  // useState
  const [view, setView] = useState(viewProp);
  const [showXlModal, setShowXlModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formVisibility, setFormVisibility] = useState(false);
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW

  const [aStatus, setAStatus] = useState({});
  //

  // useRef
  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);
  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);
  //End



  const handleShowModal = (size) => {
    switch (size) {
      case "xl":
        setShowXlModal(true);
        break;
      default:
        break;
    }
    setSelectedSize(size);
  };







  const loadInfo = async () => {
    let assessment_status, result, resp;
    // let result = await set.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT);
    resp = await st.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT);
    result = resp.data;
    // let assessment_status = await set.getAssessmentProgressStatus(appId);
    resp = await set.getAssessmentProgressStatus(appId);
    assessment_status = resp.data;
    setAStatus(assessment_status);

    console.log(result);

    if (result) {
      const lastObj = result[result.length - 1];
      console.log(lastObj);
      if (lastObj) {
        setInitValue(lastObj);
        setFormData(lastObj);
        setFormSubmited(true);

        setReviewStatus(C.SL.REVIEWED);
        setViewType(C.SL.VIEW);
      }
    }
  }

  useEffect(() => { loadInfo(); }, [appId]);

  // Experiment Started Here @dpkdhariwal
  // const register = useFunctionRegistry();
  // useEffect(() => {
  //   register(`${C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT}`, () => {
  //     if (formRef.current) {
  //       return { formRef: formRef, formData: formData, formVisibility: formVisibility, formSubmited: formSubmited }
  //     }
  //     console.log("Child A function executed!");
  //   });
  // }, [formSubmited]);
  //End

  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
  const register = useFunctionRegistry();
  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);
  const form = async () => {
    if (formRef?.current?.isValid) {
      // await set.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT);
      await st.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT);

      setAnyChangesMade(false);
      setEditMode(false);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
      return true;
    }
    else {
      return false;
    }
  }
  const submitNow = async () => {
    switch (reviewStatusRef.current) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editModeRef.current) {
          case true:
            return await form();
          case false:
            return true;
        }
        break;
      default:
        break;
    }
  }



  //Important Attaching to Context 
  let obj = { changeInForm: anyChangesMade, refNo: data.uniqueId, editMode: editMode, getData: () => { return formRef } }
  const [formId, setFormId] = useState(C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT); // true || false
  const { registerForm, unregisterForm } = useContext(DocumentFormContext);
  registerForm(formId, obj);
  useEffect(() => {
    if (formRef.current) {
      registerForm(formId, obj);
    }
    // return () => unregisterForm(formId);
  }, [formRef, formId, registerForm, unregisterForm, obj]);
  const hChangeInForm = async () => {
    // await formRef.current.submitForm();
    console.log("land document da action registered");
    registerForm(formId, obj);
  }
  useEffect(() => {
    registerForm(formId, obj);
  }, [appId]);
  useEffect(() => {
    registerForm(formId, obj);
  }, [formRef]);
  useEffect(() => {
    hChangeInForm();
  }, [appId]);
  useEffect(() => {
    if (data.Verificiation === null) {
      setAnyChangesMade(true);
    }
  }, [data]);

  const onEdit = () => {
    setReviewStatus(C.SL.PENDING);
    setAnyChangesMade(true);
  }


  return (
    <>
      <Row
        style={{
          // backgroundColor: "rgb(245, 245, 245)",
          // margin: "10px 0px 0px",
          borderRadius: 6,
        }}
      >
        <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
          {console.log(data?.init_scp)}
          <table
            width="98%"
            border={1}
            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>ID Proof of Secretary/Chairperson/President</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  <table
                    width="98%"
                    border={1}
                    style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                    align="center"
                    cellPadding="5px"
                  >
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid black" }}>Designation</th>
                        <th style={{ border: "1px solid black" }}>ID Proof Type</th>
                        <th style={{ border: "1px solid black" }}>ID Proof Number</th>
                        <th style={{ border: "1px solid black" }}>ID Proof Document</th>
                        <th style={{ border: "1px solid black" }}>Uploaded Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.init_scp?.map((obj, index) => {
                        return (<tr key={index}>
                          <td style={{ border: "1px solid black" }}>{obj?.designation}</td>
                          <td style={{ border: "1px solid black" }}>{obj?.id_proof_type}</td>
                          <td style={{ border: "1px solid black" }}>{obj?.id_proof_number}</td>
                          <td style={{ border: "1px solid black" }}><Button variant="info" size="sm" onClick={() => { alert(obj?.document) }}>View ID Proof Document</Button></td>
                          <td style={{ border: "1px solid black" }}>{formatedDate(obj?.uploaded_datetime)}</td>
                        </tr>)
                      })}

                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>


        {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div className="form-container">
            {reviewStatus == C.SL.PENDING || editMode === true && viewType == C.SL.FORM ? (
              <Formik
                innerRef={formRef}
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup
                    .string()
                    .required("Select Whether the ID Proof of Secretary/Chairperson/President is as per norms?"),

                  reason: yup.string().when("as_per_norms", {
                    is: "no", // 🔄 change to "no" since category and comments are required when it's "no"
                    then: () =>
                      yup.string().required("Please select a category"),
                    otherwise: () => yup.string().notRequired(),
                  }),

                  assessor_comments: yup.string().when("as_per_norms", {
                    is: (as_per_norms, reason) => as_per_norms === "no" && reason === "other",
                    then: () =>
                      yup.string().required("Please provide your comments"),
                    otherwise: () => yup.string().notRequired(),
                  }),
                })}
                validateOnChange={() => console.log("validateOnChange")}
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}   // ✅ this makes validation run when form loads
              >
                {({
                  handleSubmit,
                  handleChange,
                  submitForm,
                  values,
                  errors,
                  touched,
                  validateForm
                }) => {
                  if (registerSubmit) {
                    registerSubmit(submitForm, validateForm, formVisibility);
                  }

                  return (<Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
                    <Card.Header>
                      <label
                        className="main-content-label my-auto"
                        style={{ textTransform: "none" }}
                      >
                        Review Form
                      </label>
                      <div className="ms-auto d-flex">
                        <Button
                          size="sm"
                          onClick={() => handleShowModal("xl")}
                          type="button"
                          className="rounded-pill btn-wave btn-outline-dark"
                          variant="btn-outline-dark"
                        >
                          Review Instructions
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <BS ref={formRef2} onSubmit={handleSubmit} validated>
                        <Row className="mb-3">
                          <BS.Group>
                            <BS.Label>
                              Whether the ID Proof of Secretary/Chairperson/President is as per norms?
                              <span style={{ color: "red" }}>*</span>
                            </BS.Label>
                            <div>
                              <BS.Check
                                inline
                                type="radio"
                                label="Yes"
                                name="as_per_norms"
                                value="yes"
                                onChange={handleChange}
                                checked={values.as_per_norms === "yes"}
                                isInvalid={
                                  touched.as_per_norms &&
                                  !!errors.as_per_norms
                                }
                              />
                              <BS.Check
                                inline
                                type="radio"
                                label="No"
                                name="as_per_norms"
                                value="no"
                                onChange={handleChange}
                                checked={values.as_per_norms === "no"}
                                isInvalid={
                                  touched.as_per_norms &&
                                  !!errors.as_per_norms
                                }
                              />
                            </div>

                            <BS.Control.Feedback type="invalid">
                              {errors.category}
                            </BS.Control.Feedback>
                          </BS.Group>
                        </Row>
                        {values.as_per_norms === "no" && (
                          <Row className="mb-3">
                            <BS.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom02"
                            >
                              <BS.Label>
                                Select the Reason(s) and Raise
                                Non-Conformities (NC)
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
                              <Field
                                required
                                name="reason"
                                as="select"
                                className="form-control"
                              >
                                <option value="">Select</option>
                                {MaxData.map((lang, i) => {
                                  return (
                                    <option key={i} value={lang.value}>
                                      {lang.label}
                                    </option>
                                  );
                                })}
                              </Field>
                              <BS.Control.Feedback>
                                Looks good!
                              </BS.Control.Feedback>
                            </BS.Group>
                            {values.reason == "other" && (<BS.Group
                              required
                              as={Col}
                              md="12"
                              controlId="text-area"
                              style={{ marginTop: "1rem" }}
                            >
                              <BS.Label>
                                Any other reason, please specify{" "}
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
                              <BS.Control
                                name="assessor_comments"
                                required
                                as="textarea"
                                rows={3}
                                className={`form-control ${touched.assessor_comments &&
                                  errors.assessor_comments
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                value={values.assessor_comments}
                                onChange={handleChange}
                                isInvalid={
                                  touched.assessor_comments &&
                                  !!errors.assessor_comments
                                }
                              />
                              {touched.assessor_comments &&
                                errors.assessor_comments && (
                                  <div className="invalid-feedback">
                                    {errors.assessor_comments}
                                  </div>
                                )}
                            </BS.Group>)}

                          </Row>
                        )}

                      </BS>
                    </Card.Body>
                    {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                  </Card>);
                }}
              </Formik>
            ) : reviewStatus == C.SL.REVIEWED && editMode === false ? (
              <Card
                className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
                style={
                  formData.as_per_norms == "yes"
                    ? { backgroundColor: "#d6f3e0" }
                    : { backgroundColor: "#f3d6d6" }
                }
              >
                <Card.Header>
                  <label
                    className="main-content-label my-auto"
                    style={{ textTransform: "none" }}
                  >
                    Assessor Comments
                  </label>
                  <div className="ms-auto  d-flex">
                    25th April 2025:10:20PM
                  </div>
                </Card.Header>
                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                  <Row className="mb-3">
                    <Col md={12}> <b>Whether the ID Proof of Secretary/Chairperson/President is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {/* aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR */}
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setReviewStatus(C.SL.PENDING); }}>
                    Edit
                  </Button>
                </Card.Footer>)}

              </Card>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </Col>)}
      </Row>
    </>
  );
};



// Resolution Certificate
export const ResolutionCertificate = ({ data, step, view: viewProp = false, registerSubmit, isView = false }) => {
  const formRef = useRef(); // create ref

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const MaxData = [
    { value: "Document is not legible", label: "Document is not legible" },
    { value: "Document is irrelevant", label: "Document is irrelevant" },
    {
      value: "Document lacks required information",
      label: "Document lacks required information",
    },
    {
      value:
        "Document is not approved by the competent authority in the State/ UT",
      label:
        "Document is not approved by the competent authority in the State/ UT",
    },
    {
      value:
        "Address on the document does not match with the proposed land/ building address",
      label:
        "Address on the document does not match with the proposed land/ building address",
    },
    {
      value:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
      label:
        "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
    },
    {
      value: "other",
      label: "other",
    },
  ];

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  // use State
  const [view, setView] = useState(viewProp);
  const [showXlModal, setShowXlModal] = useState(false);
  const [initValue, setInitValue] = useState({ as_per_norms: "", reason: "", assessor_comments: "", });
  const [formVisibility, setFormVisibility] = useState(false);
  const [formData, setFormData] = useState({});
  const [formSubmited, setFormSubmited] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [anyChangesMade, setAnyChangesMade] = useState(false); // true || false
  const [editMode, setEditMode] = useState(false); // true || false
  const [reviewStatus, setReviewStatus] = useState(C.SL.PENDING); // REVIEWED || PENDING
  const [viewType, setViewType] = useState(C.SL.VIEW); // FORM || VIEW
  const [aStatus, setAStatus] = useState({});
  // useRef
  const reviewStatusRef = useRef(reviewStatus);
  useEffect(() => { reviewStatusRef.current = reviewStatus; }, [reviewStatus]);
  const editModeRef = useRef(editMode);
  useEffect(() => { editModeRef.current = editMode; }, [editMode]);
  //End


  const handleShowModal = (size) => {
    switch (size) {
      case "xl":
        setShowXlModal(true);
        break;
      default:
        break;
    }
    setSelectedSize(size);
  };


  const submitAction = async (values) => {
    console.log(values);
    await set.set_da_status(appId, values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE);
  }


  const loadInfo = async () => {
    let result, assessment_status, resp;
    // let result = await set.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE);
    resp = await st.get_da_status(appId, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE);
    result = resp.data;

    // let assessment_status = await set.getAssessmentProgressStatus(appId);
    resp = await st.getAssessmentProgressStatus(appId);
    assessment_status = resp.data;
    setAStatus(assessment_status);

    console.log(result);
    if (result) {
      const lastObj = result[result.length - 1];
      console.log(lastObj);
      if (lastObj) {
        setInitValue(lastObj);
        setFormData(lastObj);
        setFormSubmited(true);
        setReviewStatus(C.SL.REVIEWED);
        setViewType(C.SL.VIEW);
      }
    }
  }

  useEffect(() => {
    loadInfo();
  }, [appId]);


  useEffect(() => { formFunction(); }, [formSubmited, anyChangesMade, editMode, reviewStatus, viewType]);
  const register = useFunctionRegistry();
  const formFunction = () => { register(`${C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE}`, () => { return { submitNow } }); }
  useEffect(() => { formFunction(); }, [formRef]);
  const form = async () => {
    if (formRef?.current?.isValid) {
      // await set.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE);
      await st.set_da_status(appId, formRef.current.values, C.abbreviation.STAGE_I.key, C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE);

      setAnyChangesMade(false);
      setEditMode(false);
      setReviewStatus(C.SL.REVIEWED);
      setViewType(C.SL.VIEW);
      return true;
    }
    else {
      return false;
    }
  }
  const submitNow = async () => {
    switch (reviewStatusRef.current) {
      case C.SL.PENDING:
        return await form();
      case C.SL.REVIEWED:
        switch (editModeRef.current) {
          case true:
            return await form();
          case false:
            return true;
        }
        break;
      default:
        break;
    }
  }


  //Important Attaching to Context 
  let obj = { changeInForm: anyChangesMade, refNo: data.uniqueId, editMode: editMode, getData: () => { return formRef } }
  const [formId, setFormId] = useState(C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE); // true || false
  const { registerForm, unregisterForm } = useContext(DocumentFormContext);
  registerForm(formId, obj);
  useEffect(() => {
    if (formRef.current) {
      registerForm(formId, obj);
    }
    // return () => unregisterForm(formId);
  }, [formRef, formId, registerForm, unregisterForm, obj]);
  const hChangeInForm = async () => {
    // await formRef.current.submitForm();
    console.log("land document da action registered");
    registerForm(formId, obj);
  }
  useEffect(() => {
    registerForm(formId, obj);
  }, [appId]);
  useEffect(() => {
    registerForm(formId, obj);
  }, [formRef]);
  useEffect(() => {
    hChangeInForm();
  }, [appId]);
  useEffect(() => {
    if (data.Verificiation === null) {
      setAnyChangesMade(true);
    }
  }, [data]);

  const onEdit = () => {
    setReviewStatus(C.SL.PENDING);
    setAnyChangesMade(true);
  }


  return (
    <>
      <Row
        style={{
          // backgroundColor: "rgb(245, 245, 245)",
          // margin: "10px 0px 0px",
          borderRadius: 6,
        }}
      >
        <Col xl={view ? 12 : 6} lg={view ? 12 : 6} md={view ? 12 : 6} sm={view ? 12 : 6}>
          <table
            width="98%"
            border={1}
            style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
            align="center"
            cellPadding="5px"
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black" }}>Resolution Certificate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  <table
                    width="98%"
                    border={1}
                    style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                    align="center"
                    cellPadding="5px"
                  >
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid black" }}>Resolution for Starting ITI</th>
                        <th style={{ border: "1px solid black" }}>Uploaded Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: "1px solid black" }}>
                          {console.log(data?.init_certificate)}
                          <Button onClick={() => { alert(data?.init_certificate?.document) }} >View Resolution Cert.</Button></td>
                        <td style={{ border: "1px solid black" }}> {formatedDate(data?.init_certificate?.upload_datetime)}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>


        {true && view != true && (<Col xl={6} lg={6} md={6} sm={6}>
          <div className="form-container">
            {reviewStatus == C.SL.PENDING || editMode === true && viewType == C.SL.FORM ? (
              <Formik
                innerRef={formRef}
                enableReinitialize
                validationSchema={yup.object().shape({
                  as_per_norms: yup
                    .string()
                    .required("Select Whether the Resolution of the institute is as per norms?"),

                  reason: yup.string().when("as_per_norms", {
                    is: "no",
                    then: () =>
                      yup.string().required("Please select a category"),
                    otherwise: () => yup.string().notRequired(),
                  }),

                  assessor_comments: yup.string().when("as_per_norms", {
                    is: (as_per_norms, reason) => as_per_norms === "no" && reason === "other",
                    then: () =>
                      yup.string().required("Please provide your comments"),
                    otherwise: () => yup.string().notRequired(),
                  }),
                })}
                validateOnChange={true}
                initialValues={initValue}
                validateOnBlur={true}
                validateOnMount={true}   // ✅ this makes validation run when form loads
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
                  touched,
                }) => {

                  // if (registerSubmit) {
                  //   registerSubmit(submitForm, validateForm, formVisibility);
                  // }
                  return (
                    <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card" style={{ backgroundColor: "#eff3d6" }}>
                      <Card.Header>
                        <label
                          className="main-content-label my-auto"
                          style={{ textTransform: "none" }}
                        >
                          Review Form
                        </label>
                        <div className="ms-auto d-flex">
                          <Button
                            size="sm"
                            onClick={() => handleShowModal("xl")}
                            type="button"
                            className="rounded-pill btn-wave btn-outline-dark"
                            variant="btn-outline-dark"
                          >
                            Review Instructions
                          </Button>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <BS ref={formRef2} onSubmit={handleSubmit} validated>
                          <Row className="mb-3">
                            <BS.Group>
                              <BS.Label>
                                Whether the Resolution of the institute is as per norms?
                                <span style={{ color: "red" }}>*</span>
                              </BS.Label>
                              <div>
                                <BS.Check
                                  inline
                                  type="radio"
                                  label="Yes"
                                  name="as_per_norms"
                                  value="yes"
                                  onChange={handleChange}
                                  checked={values.as_per_norms === "yes"}
                                  isInvalid={
                                    touched.as_per_norms &&
                                    !!errors.as_per_norms
                                  }
                                />
                                <BS.Check
                                  inline
                                  type="radio"
                                  label="No"
                                  name="as_per_norms"
                                  value="no"
                                  onChange={handleChange}
                                  checked={values.as_per_norms === "no"}
                                  isInvalid={
                                    touched.as_per_norms &&
                                    !!errors.as_per_norms
                                  }
                                />
                              </div>

                              <BS.Control.Feedback type="invalid">
                                {errors.category}
                              </BS.Control.Feedback>
                            </BS.Group>
                          </Row>
                          {values.as_per_norms === "no" && (
                            <Row className="mb-3">
                              <BS.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom02"
                              >
                                <BS.Label>
                                  Select the Reason(s) and Raise
                                  Non-Conformities (NC)
                                  <span style={{ color: "red" }}>*</span>
                                </BS.Label>
                                <Field
                                  required
                                  name="reason"
                                  as="select"
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  {MaxData.map((lang, i) => {
                                    return (
                                      <option key={i} value={lang.value}>
                                        {lang.label}
                                      </option>
                                    );
                                  })}
                                </Field>
                                <BS.Control.Feedback>
                                  Looks good!
                                </BS.Control.Feedback>
                              </BS.Group>
                              {values.reason == "other" && (
                                <BS.Group required as={Col} md="12" controlId="text-area" style={{ marginTop: "1rem" }} >
                                  <BS.Label> Any other reason, please specify{" "} <span style={{ color: "red" }}>*</span> </BS.Label>
                                  <BS.Control
                                    name="assessor_comments"
                                    required
                                    as="textarea"
                                    rows={3}
                                    className={`form-control ${touched.assessor_comments && errors.assessor_comments ? "is-invalid" : ""}`}
                                    value={values.assessor_comments}
                                    onChange={handleChange}
                                    isInvalid={touched.assessor_comments && !!errors.assessor_comments}
                                  />
                                  {touched.assessor_comments &&
                                    errors.assessor_comments && (
                                      <div className="invalid-feedback">
                                        {errors.assessor_comments}
                                      </div>
                                    )}
                                </BS.Group>)}

                            </Row>
                          )}

                        </BS>
                      </Card.Body>
                      {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                      <Button variant="primary" onClick={submitForm}>
                        Submit
                      </Button>
                    </Card.Footer> */}
                    </Card>)
                }}
              </Formik>
            ) : reviewStatus == C.SL.REVIEWED && editMode === false ? (
              <Card
                className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"
                style={
                  formData.as_per_norms == "yes"
                    ? { backgroundColor: "#d6f3e0" }
                    : { backgroundColor: "#f3d6d6" }
                }
              >
                <Card.Header>
                  <label
                    className="main-content-label my-auto"
                    style={{ textTransform: "none" }}
                  >
                    Assessor Comments
                  </label>
                  <div className="ms-auto  d-flex">
                    25th April 2025:10:20PM
                  </div>
                </Card.Header>
                <Card.Body style={{ paddingBottom: '0px', paddingTop: '4px' }} >
                  <Row className="mb-3">
                    <Col md={12}> <b>Whether the Resolution of the institute is as per norms?:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.as_per_norms} </span> </Col>
                    {formData.as_per_norms == "no" && (<Col md={12}> <b>Reason Category:</b>{" "} <span style={{ textTransform: "capitalize" }}> {formData.reason} </span> </Col>)}
                    {formData.reason == "other" && (<Col md={12}> <b>Reason:</b> <p>{formData.assessor_comments}</p> </Col>)}
                  </Row>
                </Card.Body>
                {/* aStatus.assessment_status == C.SL.ON_PROGRESS && aStatus.pendingAt == C.SL.PENDING_AT_ASSESSOR */}
                {isView == false && (<Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => { setReviewStatus(C.SL.PENDING); }}>
                    Edit
                  </Button>
                </Card.Footer>)}

              </Card>
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </Col>)}
      </Row>
    </>
  );
};


// 🔹 Helper Component to register Formik methods outside
function FormikRegister({ registerSubmit }) {
  const { submitForm, validateForm, values } = useFormikContext();

  React.useEffect(() => {
    if (registerSubmit) {
      registerSubmit({
        submitForm,
        validateForm,
        getValues: () => values,
      });
    }
  }, [submitForm, validateForm, values, registerSubmit]);

  return null;
}