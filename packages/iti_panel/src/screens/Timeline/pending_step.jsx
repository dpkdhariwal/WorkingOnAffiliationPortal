import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import React, { Children, useState, useEffect } from "react";

import * as action from "../action/allActions";


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
  STAGE_I__ASSESSMENT_PENDING
} from "../../constants";

export const PendingStep = ({ info, variant }) => {

  const [cardBorder, setCardBorder] = useState('border-warning');
  const [cardShadow, setCardShadow] = useState('shadow-warning');
  const [cardArrow, setCardArrow] = useState('f-timeline-container-warning');
  const [text, setText] = useState('Not Completed Yet');


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
    switch (info.step) {
      case STAGE_I_FORM_FILLING:
        switch (info.status) {
          case STAGE_I__FILLED:
            return action.GoToStageIForm();
          case STAGE_I__NOT_FILLED:
            return action.GoToStageIForm();
          default:
            return action.GoToStageIForm();
        }
      case STAGE_I_FEE:
        switch (info.status) {
          case STAGE_I__FEE_PENDING:
            return <h5>DD</h5>
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
            return <h5>DD</h5>
          case STAGE_I__DOCUMENT_UPLOADED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }
      case STAGE_I_SUBMIT:
        switch (info.status) {
          case STAGE_I__SUBMIT_PENDING:
            return <h5>DD</h5>
          case STAGE_I__SUBMITED:
            return <h5>DD</h5>
          default:
            return <h5>DD</h5>
        }
      case STAGE_I__ASSESSMENT:
        switch (info.status) {
          case STAGE_I__ASSESSMENT_COMPLETED:
            return <h5>DD</h5>
          case STAGE_I__ASSESSMENT_ON_PROGRESS:
            return <h5>DD</h5>
          case STAGE_I__ASSESSMENT_PENDING:
            return <h5>DD</h5>
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
        <div className="card-title">{info.stepTitle}</div>
        <h6 className="card-title fw-semibold mb-2">
          {info.stepMsg}
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
