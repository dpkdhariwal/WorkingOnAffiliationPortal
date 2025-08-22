import { Modal, Row, Col, Card, Form, InputGroup, Button, Table, Form as BForm } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import this

export const GoToStageIForm = ({info}) => {
  const navigate = useNavigate(); // <-- Hook for navigation
  
  const goNow = () => {
    console.log(info);
    navigate(`/dashboard/new_registration?appId=${info.appId}`); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='primary-gradient' className="rounded-pill btn-wave">
      Go to Form
    </Button>
  );
};

export const GoToStageIAssessment = ({info}) => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate(`/dashboard/AssessmentI?appId=${info.appId}`); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to Verfication
    </Button>
  );
};

export const GoToStageIAssessmentToUploadDocs = ({info}) => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate(`/dashboard/AssessmentI?appId=${info.appId}`); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Upload Documents
    </Button>
  );
};

export const GoToNOCGenerateForm = ({info}) => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate(`/dashboard/generateNOC?appId=${info.appId}`); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to NOC
    </Button>
  );
};



export const GoToStageIIForm = ({info}={}) => {
  const navigate = useNavigate(); // <-- Hook for navigation

  console.log(info);

  const goNow = () => {
    navigate(`/dashboard/form_stageII?appId=${info?.appId}`); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='primary-gradient' className="rounded-pill btn-wave">
      Go to Form
    </Button>
  );
};


export const GoToStageIIAssessment = ({info}={}) => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate(`/dashboard/AssessmentII?appId=${info?.appId}`); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to Verfication
    </Button>
  );
};

export const GoToStageIIStaffDetailForm = ({info}={}) => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate(`/dashboard/AddStaffDetail?appId=${info?.appId}`); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to Form
    </Button>
  );
};

export const GoToInspectionSlotSelection = ({info}={}) => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate(`/dashboard/InspectionSlotSelection?appId=${info?.appId}`); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='warning-gradient' className="rounded-pill btn-wave">
      Go to Form
    </Button>
  );
};

export const GoToBatchCreattion = ({info}={}) => {
  const navigate = useNavigate(); // <-- Hook for navigation

  const goNow = () => {
    navigate(`/dashboard/CreateBatchForInspection?appId=${info?.appId}`); // <-- Your route here
  };

  return (
    <Button onClick={goNow} size="sm"  variant='success-gradient' className="rounded-pill btn-wave">
      Create Batch
    </Button>
  );
};


