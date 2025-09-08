import { Card, Badge, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import React, { Children, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

import * as cons from "affserver";

export const CompletedStep = ({ info, variant }) => {

  const [cardBorder, setCardBorder] = useState('border-warning');
  const [cardShadow, setCardShadow] = useState('shadow-warning');
  const [cardArrow, setCardArrow] = useState('f-timeline-container-warning');
  const [text, setText] = useState('Not Completed Yet');

  const { t } = useTranslation();

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

  useEffect(() => {
    console.log(info);
  }, [])


  // GET SET ACTIONS 
  const getSetActions = (info) => {
    console.log(info);
    switch (info.step) {
      // case STAGE_I_FORM_FILLING:
      //   switch (info.status) {
      //     case STAGE_I__FILLED:
      //     case STAGE_I__NOT_FILLED:
      //       return authUser.userType === 'applicant' ? <GoToStageIForm info={info} /> : ''
      //     default:
      //       return ''
      //   }
      // case STAGE_I_FEE:
      //   switch (info.status) {
      //     case STAGE_I__FEE_PENDING:
      //       return authUser.userType === 'applicant' ? <GoToStageIForm info={info} /> : ''
      //     case STAGE_I__FEE_PAID:
      //       return <h5>DD</h5>
      //     case STAGE_I__FEE_EXEMPTED:
      //       return <h5>DD</h5>
      //     default:
      //       return <h5>DD</h5>
      // }
      // case cons.STAGE_I_DOCUMENT_UPLAOD:
      //   switch (info.status) {
      //     // case STAGE_I__DOCUMENT_PENDING:
      //     //   return authUser.userType === 'applicant' ? <GoToStageIForm info={info} /> : ''
      //     case cons.STAGE_I__DOCUMENT_UPLOADED:
      //       return <h5>DD</h5>
      //     default:
      //       return "";
      //   }
      case cons.STAGE_I_SUBMIT:
        switch (info.status) {
          // case cons.STAGE_I__SUBMIT_PENDING:
          //   return authUser.userType === 'applicant' ? <GoToStageIForm info={info} /> : ''
          case cons.STAGE_I__SUBMITED:
            return <Button size="sm" variant="success" onClick={()=>{alert("To be continue....")}} >View Application</Button>
          default:
            return "";
        }
      // case cons.STAGE_I__ASSESSMENT:
      //   console.log(info.status, authUser);
      //   switch (info.status) {
      //     case cons.STAGE_I__ASSESSMENT_COMPLETED:
      //       return <h5>DD</h5>
      //     case cons.STAGE_I__ASSESSMENT_ON_PROGRESS:
      //       console.log(authUser.userType);
      //       switch (authUser.userType) {
      //         case 'state_assessor':
      //           console.log(info);
      //           if (info?.aStatus?.pendingAt === cons.SL.PENDING_AT_ASSESSOR) {
      //             console.log(info?.aStatus?.pendingAt);
      //             return <GoToStageIAssessment info={info} />;
      //           }
      //           break
      //         case 'applicant':
      //           console.log(info?.aStatus?.pendingAt);
      //           switch (info?.aStatus?.pendingAt) {
      //             case cons.SL.PENDING_AT_APPLICANT:
      //             case cons.SL.APPLICANT:
      //               return <GoToStageIAssessmentToUploadDocs info={info} />;
      //             default:
      //               return 'NA';
      //           }
      //         default:
      //           return 'NA';
      //       }
      //       break;
      //     case cons.STAGE_I__ASSESSMENT_PENDING:
      //       return authUser.userType === 'state_assessor' ? <GoToStageIAssessment info={info} /> : '';
      //     default:
      //       return <h5>DD</h5>
      //   }
      //   break;
      case cons.NOC_ISSUANCE:
        switch (info.status) {
          // case cons.NOC_ISSUANCE_PENDING:
          //   return authUser.userType === 'state_assessor' ? <GoToNOCGenerateForm info={info} /> : ''
          case cons.NOC_ISSUANCE_ISSUED:
            return <Button size="sm" variant="success" onClick={()=>{window.location.href = "https://affiliation.dgt.gov.in/affliation_portal_all_documents/sample/noc/No-Objection-Certificate.pdf";}} >View NOC</Button>
          case cons.NOC_ISSUANCE_REJECTED:
            return <h5>Noc Rejected</h5>
          default:
            return "";
        }

      // case cons.STAGE_II_FORM_FILLING:
      //   switch (info.status) {
      //     case cons.STAGE_II__FILLED:
      //       return <h5>DD</h5>
      //     case cons.STAGE_II__PENDING:
      //       return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
      //     case cons.STAGE_II__ON_PROGRESS:
      //       return <h5>DD</h5>
      //     default:
      //       return <h5>DD</h5>
      //   }

      // case cons.STAGE_II_FEE:
      //   switch (info.status) {
      //     case cons.STAGE_II__FEE_PENDING:
      //       return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
      //     // // case STAGE_II__FEE_PAID:
      //     // //   console.log(info);
      //     // //   return <h5>DAD</h5>
      //     // case STAGE_II__FEE_EXEMPTED:
      //     //   return <h5>DD</h5>
      //     default:
      //       return ''
      //   }

      // case cons.STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS:
      //   switch (info.status) {
      //     case cons.STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_PENDING:
      //       return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
      //     case cons.STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_COMPLETED:
      //       return <h5>DD</h5>
      //     case cons.STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_ON_PROGRESS:
      //       return <h5>DD</h5>
      //     default:
      //       return <h5>DD</h5>
      //   }

      // case cons.STAGE_II_DOCUMENT_UPLAOD:
      //   switch (info.status) {
      //     case cons.STAGE_II__DOCUMENT_PENDING:
      //       return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
      //     case cons.STAGE_II__DOCUMENT_UPLOADED:
      //       return <h5>DD</h5>
      //     default:
      //       return <h5>DD</h5>
      //   }

      // case cons.STAGE_II_SUBMIT:
      //   switch (info.status) {
      //     case cons.STAGE_II__SUBMIT_PENDING:
      //       return authUser.userType === 'applicant' ? <GoToStageIIForm info={info} /> : ''
      //     case cons.STAGE_II__SUBMITED:
      //       return <h5>DD</h5>
      //     default:
      //       return <h5>DD</h5>
      //   }


      // case cons.STAGE_II__ASSESSMENT:
      //   switch (info.status) {
      //     case cons.STAGE_II__ASSESSMENT_PENDING:
      //       return authUser.userType === 'state_assessor' ? <GoToStageIIAssessment info={info} /> : ''
      //     case cons.STAGE_II__ASSESSMENT_ON_PROGRESS:
      //       return <h5>DD</h5>
      //     case cons.STAGE_II__ASSESSMENT_COMPLETED:
      //       return <h5>DD</h5>
      //     default:
      //       return <h5>DD</h5>
      //   }


      // case cons.STAFF_DETAILS:
      //   switch (info.status) {
      //     case cons.STAFF_DETAILS_PENDING:
      //       return authUser.userType === 'applicant' ? <GoToStageIIStaffDetailForm info={info} /> : ''
      //     case cons.STAFF_DETAILS_COMPLETED:
      //       return <h5>DD</h5>
      //     default:
      //       return <h5>DD</h5>
      //   }

      // case cons.INSP_SLOT_SELECTION:
      //   switch (info.status) {
      //     case cons.INSP_SLOT_SELECTION_PENDING:
      //       return authUser.userType === 'applicant' ? <GoToInspectionSlotSelection info={info} /> : ''
      //     case cons.INSP_SLOT_SELECTION_COMPLETED:
      //       return <h5>DD</h5>
      //     default:
      //       return <h5>DD</h5>
      //   }
      // case cons.INSPENCTION:
      //   switch (info.status) {
      //     case cons.INSP_PENDING:
      //       return authUser.userType === 'rdsde' ? <GoToBatchCreattion info={info} /> : ''
      //     default:
      //       return <h5>DD</h5>
      //   }
      default:
        return "";
    }
  }

  return (
    <Card className={`${cardArrow} border border-2 ${cardBorder}  card custom-card shadow-size-small ${cardShadow}`} style={{ position: "relative" }}>
      <Card.Header style={{ padding: "0px" }}>{t(`AppFlow.${info.step}.title`)}</Card.Header>
      <Card.Body style={{ padding: "0px" }}>
        {t(`AppFlow.${info.step}.status.completed.${'COMMON'}`)}
        {/* {info?.stepMsg} */}
      </Card.Body>
      <Card.Footer style={{ padding: "2px" }} className=" d-flex justify-content-between btn-rounded" >
        <i><span>22-07-2025</span></i>
        {getSetActions(info)}
        {/* <Button size="sm" >View</Button> */}
      </Card.Footer>
    </Card>
  );
};

CompletedStep.propTypes = {
  info: PropTypes.shape({
    step: PropTypes.node,
  }).isRequired,
  variant: PropTypes.string, // or PropTypes.oneOf(['completed', 'inactive']) if you want to be strict
};
