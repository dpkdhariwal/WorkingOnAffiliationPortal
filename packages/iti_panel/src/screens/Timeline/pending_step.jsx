import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import React, { Children, useState, useEffect } from "react";

import * as action from "../action/allActions";
import { GoToStageIAssessmentToUploadDocs, GoToStageIForm, GoToStageIAssessment, GoToNOCGenerateForm, GoToStageIIForm, GoToStageIIAssessment, GoToStageIIStaffDetailForm, GoToInspectionSlotSelection, GoToBatchCreattion } from "../action/allActions";
import { useTranslation } from 'react-i18next';


import {
  STAGE_I_FORM_FILLING,
  STAGE_I__FILLED,
  STAGE_I__NOT_FILLED,
  STAGE_I_FEE,
  STAGE_I__FEE_PENDING,
  STAGE_I__FEE_PAID,
  STAGE_I__FEE_EXEMPTED,
  STAGE_I_DOCUMENT_UPLAOD,
  STAGE_I__DOCUMENT_PENDING,
  STAGE_I__DOCUMENT_UPLOADED,
  STAGE_I_SUBMIT,
  STAGE_I__SUBMIT_PENDING,
  STAGE_I__SUBMITED,
  STAGE_I__ASSESSMENT,
  STAGE_I__ASSESSMENT_COMPLETED,
  STAGE_I__ASSESSMENT_ON_PROGRESS,
  STAGE_I__ASSESSMENT_PENDING,
  NOC_ISSUANCE,
  NOC_ISSUANCE_ISSUED,
  NOC_ISSUANCE_PENDING,
  NOC_ISSUANCE_REJECTED,
  STAGE_II_FORM_FILLING,
  STAGE_II__FILLED,
  STAGE_II__PENDING,
  STAGE_II__ON_PROGRESS,

  STAGE_II_FEE,
  STAGE_II__FEE_PENDING,
  STAGE_II__FEE_PAID,
  STAGE_II__FEE_EXEMPTED,

  STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS,
  STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_PENDING,
  STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_COMPLETED,
  STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_ON_PROGRESS,


  STAGE_II_DOCUMENT_UPLAOD,
  STAGE_II__DOCUMENT_PENDING,
  STAGE_II__DOCUMENT_UPLOADED,

  STAGE_II_SUBMIT,
  STAGE_II__SUBMIT_PENDING,
  STAGE_II__SUBMITED,

  STAGE_II__ASSESSMENT,
  STAGE_II__ASSESSMENT_PENDING,
  STAGE_II__ASSESSMENT_ON_PROGRESS,
  STAGE_II__ASSESSMENT_COMPLETED,

  STAFF_DETAILS,
  STAFF_DETAILS_PENDING,
  STAFF_DETAILS_COMPLETED,

  INSP_SLOT_SELECTION,
  INSP_SLOT_SELECTION_PENDING,
  INSP_SLOT_SELECTION_COMPLETED,

  INSPENCTION,
  INSP_SHEDULED,
  INSP_PENDING
} from "affserver";
import * as C from "affserver";
import { useSelector, useDispatch } from "react-redux";
import { getAssessmentProgressStatus } from "../../db/forms/stageI/set/set";

export const PendingStep = ({ info, variant }) => {

  const [cardBorder, setCardBorder] = useState('border-warning');
  const [cardShadow, setCardShadow] = useState('shadow-warning');
  const [cardArrow, setCardArrow] = useState('f-timeline-container-warning');
  const [text, setText] = useState('Not Completed Yet');

  const authUser = useSelector((state) => state.loginUserReducer);
  const { t } = useTranslation();


  useEffect(() => {
    console.log(authUser);
  });

  useEffect(() => {
    if (variant === "completed") {
      setCardBorder("border-success");
      setCardShadow("shadow-success");
      setCardArrow("f-timeline-container-success");
      setText("Completed");
    } else {
      setCardBorder("border-warning");
      setCardShadow("shadow-warning");
      setCardArrow("f-timeline-container-warning");
    }
  }, [variant]);

  // GET SET ACTIONS 
  const getSetActions = (info) => {
    console.log(info);
    switch (info.step) {
      case STAGE_I_FORM_FILLING:
        switch (info.status) {
          case STAGE_I__FILLED:
          case STAGE_I__NOT_FILLED:
            return authUser.userType === 'applicant' ? <GoToStageIForm info={info} /> : ''
          default:
            return ''
        }
      case STAGE_I_FEE:
        switch (info.status) {
          case STAGE_I__FEE_PENDING:
            return authUser.userType === 'applicant' ? <GoToStageIForm info={info} /> : ''
          case STAGE_I__FEE_PAID:
            return <h5>DD</h5>
          case STAGE_I__FEE_EXEMPTED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }
      case STAGE_I_DOCUMENT_UPLAOD:
        switch (info.status) {
          case STAGE_I__DOCUMENT_PENDING:
            return authUser.userType === 'applicant' ? <GoToStageIForm info={info} /> : ''
          case STAGE_I__DOCUMENT_UPLOADED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }
      case STAGE_I_SUBMIT:
        switch (info.status) {
          case STAGE_I__SUBMIT_PENDING:
            return authUser.userType === 'applicant' ? <GoToStageIForm info={info} /> : ''
          case STAGE_I__SUBMITED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }
      case STAGE_I__ASSESSMENT:
        console.log(info.status, authUser);
        switch (info.status) {
          case STAGE_I__ASSESSMENT_COMPLETED:
            return <h5>DD</h5>
          case STAGE_I__ASSESSMENT_ON_PROGRESS:
            console.log(authUser.userType);
            switch (authUser.userType) {
              case 'state_assessor':
                console.log(info);
                if (info?.aStatus?.pendingAt === C.SL.PENDING_AT_ASSESSOR) {
                  console.log(info?.aStatus?.pendingAt);
                  return <GoToStageIAssessment info={info} />;
                }
                break
              case 'applicant':
                console.log(info?.aStatus?.pendingAt);
                switch (info?.aStatus?.pendingAt) {
                  case C.SL.PENDING_AT_APPLICANT:
                  case C.SL.APPLICANT:
                    return <GoToStageIAssessmentToUploadDocs info={info} />;
                  default:
                    return 'NA';
                }
              default:
                return 'NA';
            }
            break;
          case STAGE_I__ASSESSMENT_PENDING:
            return authUser.userType === 'state_assessor' ? <GoToStageIAssessment info={info} /> : '';
          default:
            return <h5>DD</h5>
        }
        break;
      case NOC_ISSUANCE:
        switch (info.status) {
          case NOC_ISSUANCE_PENDING:
            return authUser.userType === 'state_assessor' ? <GoToNOCGenerateForm info={info} /> : ''
          case NOC_ISSUANCE_ISSUED:
            return <h5>DD</h5>
          case NOC_ISSUANCE_REJECTED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }

      case STAGE_II_FORM_FILLING:
        switch (info.status) {
          case STAGE_II__FILLED:
            return <h5>DD</h5>
          case STAGE_II__PENDING:
            return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
          case STAGE_II__ON_PROGRESS:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }

      case STAGE_II_FEE:
        switch (info.status) {
          case STAGE_II__FEE_PENDING:
            return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
          // // case STAGE_II__FEE_PAID:
          // //   console.log(info);
          // //   return <h5>DAD</h5>
          // case STAGE_II__FEE_EXEMPTED:
          //   return <h5>DD</h5>
          default:
            return ''
        }

      case STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS:
        switch (info.status) {
          case STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_PENDING:
            return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
          case STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_COMPLETED:
            return <h5>DD</h5>
          case STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_ON_PROGRESS:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }

      case STAGE_II_DOCUMENT_UPLAOD:
        switch (info.status) {
          case STAGE_II__DOCUMENT_PENDING:
            return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
          case STAGE_II__DOCUMENT_UPLOADED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }

      case STAGE_II_SUBMIT:
        switch (info.status) {
          case STAGE_II__SUBMIT_PENDING:
            return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
          case STAGE_II__SUBMITED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }


      case STAGE_II__ASSESSMENT:
        switch (info.status) {
          case STAGE_II__ASSESSMENT_PENDING:
            return authUser.userType === 'state_assessor' ? <GoToStageIIAssessment info={info} /> : ''
          case STAGE_II__ASSESSMENT_ON_PROGRESS:
            return <h5>DD</h5>
          case STAGE_II__ASSESSMENT_COMPLETED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }


      case STAFF_DETAILS:
        switch (info.status) {
          case STAFF_DETAILS_PENDING:
            return authUser.userType === 'applicant' ? <GoToStageIIStaffDetailForm info={info} /> : ''
          case STAFF_DETAILS_COMPLETED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }

      case INSP_SLOT_SELECTION:
        switch (info.status) {
          case INSP_SLOT_SELECTION_PENDING:
            return authUser.userType === 'applicant' ? <GoToInspectionSlotSelection info={info} /> : ''
          case INSP_SLOT_SELECTION_COMPLETED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }
      case INSPENCTION:
        switch (info.status) {
          case INSP_PENDING:
            return authUser.userType === 'rdsde' ? <GoToBatchCreattion info={info} /> : ''
          default:
            return <h5>DD</h5>
        }
      default:
        return <h5>DD</h5>
    }
  }


  return (
    <Card
      className={`${cardArrow} border border-2 ${cardBorder}  card custom-card shadow-size-small ${cardShadow}`}
      style={{ position: "relative", padding: '1px' }}
    >
      <Card.Body style={{ padding: "5px" }}>
        <div className="card-title">{t(`AppFlow.${info.step}.title`)}</div>
        <h6 className="card-title fw-semibold mb-2">
          {t(`AppFlow.${info.step}.status.${variant=="inProgress"? "on-progress" : 'pending'}.${'COMMON'}`)}
        </h6>
      </Card.Body>
      <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-end btn-rounded" >
        {getSetActions(info)}
        {/* <Button size="sm" >View</Button> */}
      </Card.Footer>
    </Card>
  );
};

PendingStep.propTypes = {
  info: PropTypes.shape({
    step: PropTypes.node,
  }).isRequired,
  variant: PropTypes.string, // or PropTypes.oneOf(['completed', 'inactive']) if you want to be strict
};
