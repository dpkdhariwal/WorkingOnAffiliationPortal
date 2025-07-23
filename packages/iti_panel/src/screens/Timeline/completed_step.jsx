import { Card, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import React, { Children, useState, useEffect } from "react";


export const CompletedStep = ({ info, variant }) => {

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

  return (
    <Card className={`${cardArrow} border border-2 ${cardBorder}  card custom-card shadow-size-small ${cardShadow}`} style={{ position: "relative" }}>
      <Card.Header style={{ padding: "0px" }}>{info.stepTitle}</Card.Header>
      <Card.Body style={{ padding: "0px" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Card.Body>
      <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-end btn-rounded" >
        <i><span>22-07-2025</span></i>
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
