import { Fragment, useRef, useState, useEffect } from "react";
import "split-pane-react/esm/themes/default.css";
import { Card, Button, Col, Row } from "react-bootstrap";
import { formatLabel } from "@/helpers";

export const ViewStateRemark = (props) => {
  const [title, setTitle] = useState(props.title);
  const [as_per_norms, setAs_per_norms] = useState(props.as_per_norms);
  const [reason, setReason] = useState(props.reason);
  const [assessor_remark, setAssessor_remark] = useState(props.assessor_remark);

  return (
    <Fragment>
      <Card className="bg-danger-transparent border border-2  card custom-card  card" >
        <Card.Header>
          <label className="main-content-label my-auto" style={{ textTransform: "none" }} > Assessment Remark </label>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={12}>
              Whether the <b><i>{formatLabel(title)}</i></b> of the applicant are as per norms?: <b>{as_per_norms}</b>
            </Col>
            {as_per_norms == "no" && (<Col md={12}>
              <b>Reason:</b> {reason}
            </Col>)}
            {reason === "other" && (
              <Col md={12}>
               <b> Assessor Remark:</b>{assessor_remark}
              </Col>
            )}

          </Row>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
