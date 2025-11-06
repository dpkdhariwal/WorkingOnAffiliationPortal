
import { Fragment, useEffect, useState } from "react";
import { AffTimeLine, AffTimeLineItem } from "../customLib/TimeLine";

import { useSelector, useDispatch } from "react-redux";

// import { AppFlow } from "affserver";
import { Card, } from "react-bootstrap";
import { InactiveStep } from "./Timeline/inactive_step";
import { CompletedStep } from "./Timeline/completed_step";
import { PendingStep } from "./Timeline/pending_step";


import { useContext } from "react";
import { TimeLineContext } from "../services/context"; // adjust path
import { getAppFlowByAppId } from "../db/users";
import * as st from "../services/state/index";
import * as gen from "../services/general/index";
import {
  STAGE_I_FORM_FILLING,
  STAGE_I_FEE,
  STAGE_I_DOCUMENT_UPLAOD,
  STAGE_I_SUBMIT,
  STAGE_I__ASSESSMENT
} from "affserver";
import {
  STAGE_I__NOT_FILLED,
  STAGE_I__FEE_PENDING,
  STAGE_I__DOCUMENT_PENDING,
  STAGE_I__SUBMIT_PENDING,
  STAGE_I__ASSESSMENT_PENDING,
  STAGE_I__FILLED,
  STAGE_I__FEE_PAID,
  STAGE_I__FEE_EXEMPTED,
  STAGE_I__DOCUMENT_UPLOADED,
  STAGE_I__SUBMITED,
  STAGE_I__ASSESSMENT_ON_PROGRESS,
  STAGE_I__ASSESSMENT_COMPLETED
} from "affserver";
import * as C from "affserver";

import { ActionONStateOneAssessmentPending } from "../screens/Timeline/actions/assessor/actions_stage_i_assessment";
import { getAssessmentProgressStatus } from "../db/forms/stageI/set/set";

const getSetStep = (info, i) => {
  console.log(info);
  switch (info.stepStatus) {
    case 'inactive':
      return <AffTimeLineItem variant="inative" key={i}><InactiveStep info={info} /></AffTimeLineItem>
    case 'pending':
    case C.SL.PENDING:
      return <AffTimeLineItem variant="pending" key={i}><PendingStep info={info} /></AffTimeLineItem>
    case 'on-progress':
      return <AffTimeLineItem variant="inProgress" key={i}><PendingStep info={info} variant="inProgress" /></AffTimeLineItem>
    case 'completed':
    case C.SL.COMPLETED:
      return <AffTimeLineItem variant="completed" key={i}><CompletedStep info={info} variant="completed" /></AffTimeLineItem>
    default:
      console.log(info.stepStatus);
      return <h5>Something Went Wrong</h5>;
  }
}

export const TimeLineFinalTest = () => {
  const AppFlow = useSelector((state) => state.AppliInfo);
  return (
    <Fragment>
      <Card className="border border-primary card custom-card">
        <Card.Body style={{ padding: "0.563rem" }}>
          <div
            style={{
              backgroundColor: "aliceblue",
              padding: 9,
              borderRadius: 7,
              marginBottom: 10,
            }}
          >
            <h5>
              10XXXXX <span>:</span> <span>MNP Govt ITI</span>
            </h5>
            <h5>
              Appllicant Name : <span>Mr. Deepak Dhariwal</span>
            </h5>
          </div>
          <AffTimeLine>
            {AppFlow.app_flow_status.map((info, i) => {
              console.log(info);
              return (getSetStep(info, i));
            })}
          </AffTimeLine>
        </Card.Body>
      </Card>
    </Fragment>
  );
};


export const TimeLine = ({ rowData }) => {
  // const AppFlow = useSelector((state) => state.AppliInfo);
  const { row } = useContext(TimeLineContext);
  const authUser = useSelector((state) => state.loginUserReducer);
  const [AppFlow, setAppFlow] = useState([]);
  const [appInfo, setAppInfo] = useState({});

  const load = async () => {
    let resp, data;
    try {
      // resp = await getAppFlowByAppId(row.appId);
      resp = await gen.getAppFlowByAppId(row.appId);
      
      data = resp.data;
      setAppFlow(data.app_flow);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // let result = getAppFlowByAppId(row.appId);
    // result.then((data) => {
    //   console.log(data.app_flow);
    //   setAppFlow(data.app_flow);
    //   console.log(data)
    // })
    load();
    appStatus();

    console.log(authUser);
  }, [])

  console.log(AppFlow);

  const appStatus = async () => {
    let result, resp;
    // const result = await getAssessmentProgressStatus(row?.appId);
    resp = await st.getAssessmentProgressStatus(row?.appId);
    result = resp.data;
    console.log(result);
    setAppInfo(result);
  }
  useEffect(() => {
    console.log(appInfo);
  }, [appInfo])

  return (
    <Fragment>
      <AffTimeLine>
        {AppFlow.map((info, i) => {
          return (getSetStep(info, i));
        })}
      </AffTimeLine>
      {/* <Card className="border border-primary card custom-card">
        <Card.Body style={{ padding: "0.563rem" }}>
        </Card.Body>
      </Card> */}
    </Fragment>
  );
};
