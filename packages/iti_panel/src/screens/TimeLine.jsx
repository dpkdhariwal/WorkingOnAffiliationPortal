
import { Fragment, useEffect, useState } from "react";
import { AffTimeLine, AffTimeLineItem } from "../customLib/TimeLine";

import { useSelector, useDispatch } from "react-redux";

// import { AppFlow } from "../constants";
import { Card, } from "react-bootstrap";
import { InactiveStep } from "./Timeline/inactive_step";

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

import {ActionONStateOneAssessmentPending} from "../screens/Timeline/actions/assessor/actions_stage_i_assessment";

const getSetStep = (info, i) => {
  switch (info.step) {
    case STAGE_I_FORM_FILLING:
      switch (info.status) {
        case STAGE_I__FILLED:
          return <AffTimeLineItem variant="completed" key={i}><InactiveStep variant="completed" info={info} /></AffTimeLineItem>
        case STAGE_I__NOT_FILLED:
          return <AffTimeLineItem variant="pending" key={i}><InactiveStep  info={info} /></AffTimeLineItem>
        default:
          return <AffTimeLineItem variant="pending" key={i}><InactiveStep info={info} /></AffTimeLineItem>
      }
    case STAGE_I_FEE:
      switch (info.status) {
        case STAGE_I__FEE_PENDING:
          return <AffTimeLineItem key={i}><InactiveStep info={info} /></AffTimeLineItem>
        case STAGE_I__FEE_PAID:
          return <AffTimeLineItem variant="completed"  key={i}><InactiveStep variant="completed" info={info} /></AffTimeLineItem>
        case STAGE_I__FEE_EXEMPTED:
          return <AffTimeLineItem variant="completed" key={i}><InactiveStep variant="completed" info={info} /></AffTimeLineItem>
        default:
          return <AffTimeLineItem key={i}><InactiveStep info={info} /></AffTimeLineItem>
      }
    case STAGE_I_DOCUMENT_UPLAOD:
      switch (info.status) {
        case STAGE_I__DOCUMENT_PENDING:
          return <AffTimeLineItem key={i}><InactiveStep info={info} /></AffTimeLineItem>
        case STAGE_I__DOCUMENT_UPLOADED:
          return <AffTimeLineItem variant="completed" key={i}><InactiveStep variant="completed" info={info} /></AffTimeLineItem>
        default:
          return <AffTimeLineItem key={i}><InactiveStep info={info} /></AffTimeLineItem>
      }
    case STAGE_I_SUBMIT:
      switch (info.status) {
        case STAGE_I__SUBMIT_PENDING:
          return <AffTimeLineItem key={i}><InactiveStep info={info} /></AffTimeLineItem>
        case STAGE_I__SUBMITED:
          return <AffTimeLineItem variant="completed" key={i}><InactiveStep variant="completed" info={info} /></AffTimeLineItem>
        default:
          return <AffTimeLineItem key={i}><InactiveStep info={info} /></AffTimeLineItem>
      }
    case STAGE_I__ASSESSMENT:
      switch (info.status) {
        case STAGE_I__ASSESSMENT_PENDING:
          return <AffTimeLineItem key={i}><ActionONStateOneAssessmentPending info={info} /></AffTimeLineItem>
        case STAGE_I__ASSESSMENT_ON_PROGRESS:
          return <AffTimeLineItem key={i}><InactiveStep info={info} /></AffTimeLineItem>
        case STAGE_I__ASSESSMENT_COMPLETED:
          return <AffTimeLineItem variant="completed" key={i}><InactiveStep variant="completed" info={info} /></AffTimeLineItem>
        default:
          return <AffTimeLineItem key={i}><InactiveStep info={info} /></AffTimeLineItem>
      }
    default:
      break;
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
