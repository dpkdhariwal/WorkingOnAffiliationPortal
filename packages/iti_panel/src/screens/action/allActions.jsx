import { Modal, Row, Col, Card, Form, InputGroup, Button, Table, Form as BForm } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import this

export const GoToStageIForm = () => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate("/dashboard/new_registration"); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='primary-gradient' className="rounded-pill btn-wave">
      Go to Form
    </Button>
  );
};

export const GoToStageIAssessment = () => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate("/dashboard/AssessmentI"); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to Verfication
    </Button>
  );
};

export const GoToNOCGenerateForm = () => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate("/dashboard/generateNOC"); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to NOC
    </Button>
  );
};



export const GoToStageIIForm = () => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate("/dashboard/form_stageII"); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='primary-gradient' className="rounded-pill btn-wave">
      Go to Form
    </Button>
  );
};


export const GoToStageIIAssessment = () => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate("/dashboard/AssessmentII"); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to Verfication
    </Button>
  );
};

export const GoToStageIIStaffDetailForm = () => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate("/dashboard/AddStaffDetail"); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to Form
    </Button>
  );
};

export const GoToInspectionSlotSelection = () => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate("/dashboard/InspectionSlotSelection"); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to Form
    </Button>
  );
};


