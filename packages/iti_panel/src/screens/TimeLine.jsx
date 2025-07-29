
import { Fragment, useEffect, useState } from "react";
import { AffTimeLine, AffTimeLineItem } from "../customLib/TimeLine";

import { useSelector, useDispatch } from "react-redux";

// import { AppFlow } from "../constants";
import { Card, } from "react-bootstrap";
import { InactiveStep } from "./Timeline/inactive_step";
import { CompletedStep } from "./Timeline/completed_step";
import { PendingStep } from "./Timeline/pending_step";


import { useContext } from "react";
import { TimeLineContext } from "../services/context"; // adjust path
import { getAppFlowByAppId } from "../db/users";

import {
  STAGE_I_FORM_FILLING,
  STAGE_I_FEE,
  STAGE_I_DOCUMENT_UPLAOD,
  STAGE_I_SUBMIT,
  STAGE_I__ASSESSMENT
} from "../constants";
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
} from "../constants";

import { ActionONStateOneAssessmentPending } from "../screens/Timeline/actions/assessor/actions_stage_i_assessment";

const getSetStep = (info, i) => {
  switch (info.stepStatus) {
    case 'inactive':
      return <AffTimeLineItem variant="inative" key={i}><InactiveStep info={info} /></AffTimeLineItem>
    case 'pending':
      return <AffTimeLineItem variant="pending" key={i}><PendingStep info={info} /></AffTimeLineItem>
    case 'on-progress':
      return <AffTimeLineItem variant="inProgress" key={i}><PendingStep variant="inProgress" info={info} /></AffTimeLineItem>
    case 'completed':
      return <AffTimeLineItem variant="completed" key={i}><CompletedStep variant="completed" info={info} /></AffTimeLineItem>
    default:
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

  useEffect(() => {
    let result = getAppFlowByAppId(row.appId);
    result.then((data) => {
      setAppFlow(data);
      console.log(data)
    })

    console.log(authUser);
  }, [])

  console.log(AppFlow);
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
