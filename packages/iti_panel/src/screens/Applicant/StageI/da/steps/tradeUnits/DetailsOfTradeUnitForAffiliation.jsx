import { Fragment, useEffect, useRef, useState } from "react";
// import { Row, Col, Card, Form, Button } from "react-bootstrap";
// import { InputGroup, Modal } from "react-bootstrap";
// import { ChatMessage } from "../../../Assessment/ReviewTrail";
// import { Form as BootstrapForm, Table } from "react-bootstrap";


// import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import * as formik from "formik";

// import * as yup from "yup";
// import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

// import { ADD_MORE_TRADE } from "affserver";

// import { trade_unit_reducer_yupObject } from "../../../../reducers/newAppReducer";
// import { ctsTrades, UPDATE_TRADE_UNIT } from "affserver";
import * as C from "affserver";

// import { setInstTradeDetails } from "../../../../db/appList";
import { useLocation } from "react-router-dom";
import { Navigations } from "@/components/Assessment/components";
// import { markAsCompleteStageAssessmentFlow, setStageIAssessmentFlow } from "../../../../db/forms/stageI/set/set";

// import * as set from "../../../../db/forms/stageI/set/set";
// import * as ap from "../../../../services/applicant/index";


import * as gen from "@/services/general/index";
import * as st from "@/services/state/index";

// import { trades } from "affserver";
import { ContextMap } from "@/components/formik/contexts";
// import { SelectField, TextField } from "../../../formik/Inputs";

import { useContext } from "react";

export const TradeUnits = ({ step, view: viewProp = false, isView = false, nav }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  // const MaxData = [
  //   { value: "Document is not legible", label: "Document is not legible" },
  //   { value: "Document is irrelevant", label: "Document is irrelevant" },
  //   {
  //     value: "Document lacks required information",
  //     label: "Document lacks required information",
  //   },
  //   {
  //     value:
  //       "Document is not approved by the competent authority in the State/ UT",
  //     label:
  //       "Document is not approved by the competent authority in the State/ UT",
  //   },
  //   {
  //     value:
  //       "Address on the document does not match with the proposed land/ building address",
  //     label:
  //       "Address on the document does not match with the proposed land/ building address",
  //   },
  //   {
  //     value:
  //       "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
  //     label:
  //       "Document does not indicate the workshop for all trade/units, classrooms, IT Lab, Administrative area, Amenities area etc.",
  //   },
  //   {
  //     value: "other",
  //     label: "other",
  //   },
  // ];

  const { Formik } = formik;
  const formRef2 = useRef();
  const dispatch = useDispatch();

  const Context = ContextMap['stageIAsmtDetails'] || ContextMap.default;
  const { assessmentInfo } = useContext(Context);

  console.log(assessmentInfo);


  // const [showXlModal, setShowXlModal] = useState(false);
  // const [selectedSize, setSelectedSize] = useState("");

  // const handleShowModal = (size) => {
  //   switch (size) {
  //     case "xl":
  //       setShowXlModal(true);
  //       break;
  //     default:
  //       break;
  //   }
  //   setSelectedSize(size);
  // };

  // const handleCloseModal = () => {
  //   setShowXlModal(false);
  //   setSelectedSize("");
  // };

  // const [formData, setFormData] = useState({});
  // const [formSubmited, setFormSubmited] = useState(false);

  // const messages = [
  //   {
  //     userType: "Assessor",
  //     username: "Alice",
  //     text: "Hello!",
  //     datetime: "10:30 AM",
  //     isUser: true,
  //     comp: () => <AssessorRemarkHistory title="Building Plan" />,
  //   },
  //   {
  //     userType: "Applicant",
  //     username: "You",
  //     text: "Hi Alice!",
  //     datetime: "10:31 AM",
  //     isUser: false,
  //     comp: ItiRemarkHistory,
  //   },
  //   {
  //     userType: "Assessor",
  //     username: "Alice",
  //     text: "Hello!",
  //     datetime: "10:30 AM",
  //     isUser: true,
  //     comp: () => <AssessorRemarkHistory title="Building Plan" />,
  //   },
  // ];
  // const stageI1_info = useSelector((state) => state.theme.new_registration);
  const index = 1;


  useEffect(() => {
    console.log(step);
  }, [step])


  const onNext = async () => {
    // Set Flow if Not exit 


    const confirmResult = await Swal.fire({ title: "Are you sure?", text: "Do you want to Proceed", icon: "question", showCancelButton: true, confirmButtonText: "Okay, Proceed", cancelButtonText: "Cancel", });
    if (!confirmResult.isConfirmed) { console.log("User cancelled save"); return; }

    const result = await Swal.fire("Saved!", "Your form data has been saved.", "success");
    if (result.isConfirmed) {
      try {
        // Set Flow if not exist
        // await setStageIAssessmentFlow(appId);
        // await markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step);

        await st.markAsCompleteStageAssessmentFlow(appId, C.ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step, assessmentInfo.assessment_id, nav.step.slno);

        nav.next();
        // window.location.reload();
      } catch (err) {
        console.error("Error while saving:", err);
      }
    }

  }

  const [info, setInfo] = useState({});
  const [tradeList, setTradeList] = useState([]);

  const getInfo = async () => {
    try {

      Swal.fire({
        title: "Loading...",
        text: "Please wait while we fetch the data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let resp = await gen.getDetails(appId);
      // console.log(resp.data?.new_insti_trade_list);
      setTradeList(resp.data?.new_insti_trade_list || []); // fallback to []
      Swal.close();

    } catch (error) {
      console.error(error);
      Swal.close();
      console.error("Error fetching entity details:", error);
      Swal.fire("Error", "Failed to fetch data.", "error");
    }
  };
  useEffect(() => { getInfo() }, [appId]);

  useEffect(() => {
    console.log("Fetched info:", info);
  }, [info]);
  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(245, 245, 245)",
          margin: "10px 0px 0px",
          borderRadius: 6,
          borderStyle: "dashed",
          borderWidth: "thin",
          padding: "10px",
        }}
      >
        <table
          width="98%"
          border={1}
          style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
          align="center"
          cellPadding="5px"
        >
          <tbody>
            <tr>
              <th colSpan={4} style={{ border: "1px solid black" }}>Details of Trade(s)/Unit(s) for Affiliation</th>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Trade </th>
              <th style={{ border: "1px solid black" }}>Unit in Shift 1</th>
              <th style={{ border: "1px solid black" }}>Unit in Shift 2</th>
              {/* <th style={{ border: "1px solid black" }}>Unit in Shift 3</th> */}
            </tr>
            {tradeList.map((trade, idx) => {

              return (
                <tr key={idx}>
                  <td style={{ border: "1px solid black" }}>{trade.trade_name}</td>
                  <td style={{ border: "1px solid black" }}>{trade.unit_in_shift1}</td>
                  <td style={{ border: "1px solid black" }}>{trade.unit_in_shift2}</td>
                  {/* <td style={{ border: "1px solid black" }}>{trade.unit_in_shift3}</td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {isView == false && <Navigations nav={nav} onNext={onNext} />}
    </>
  );
};


