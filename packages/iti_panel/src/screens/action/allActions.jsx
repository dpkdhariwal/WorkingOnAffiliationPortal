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


