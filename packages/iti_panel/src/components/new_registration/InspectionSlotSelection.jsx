import React, { Fragment, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const InspectionSlotSelection = () => {
  
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Define slot date ranges (day numbers)
  const slotDateRanges = {
    "slot-1": { start: 1, end: 15 },
    "slot-2": { start: 1, end: 31 },
    "slot-3": { start: 1, end: 15 },
    "slot-4": { start: 16, end: 31 },
  };

  // Slot labels for display
  const slotLabels = {
    "slot-1": "Slot-1 (1st to 15th)",
    "slot-2": "Slot-2 (1st to 30/31st)",
    "slot-3": "Slot-3 (1st to 15th)",
    "slot-4": "Slot-4 (16th to 30/31st)",
  };

  // Generate all dates for a slot within the correct month
  const generateSlotDates = (slotKey) => {
    const range = slotDateRanges[slotKey];
    const today = new Date();

    let monthOffset;
    if (slotKey === "slot-1" || slotKey === "slot-2") {
      monthOffset = 1; // Next month
    } else {
      monthOffset = 2; // Next-to-next month
    }

    const year = today.getFullYear();
    const targetMonth = today.getMonth() + monthOffset;
    const daysInTargetMonth = new Date(year, targetMonth + 1, 0).getDate();
    const end = Math.min(range.end, daysInTargetMonth);

    const dates = [];
    for (let day = range.start; day <= end; day++) {
      dates.push(new Date(year, targetMonth, day));
    }

    return dates;
  };

  // Allow dates in both next and next-to-next months
  const isDateInAllowedMonths = (date) => {
    const today = new Date();
    const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const nextToNextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 3, 0);
    return date >= nextMonthStart && date <= nextToNextMonthEnd;
  };

  // Handle date selection from calendar
  const handleDateChange = (date) => {
    if (!date) return;

    const exists = selectedDates.find((d) => d.toDateString() === date.toDateString());
    if (exists) return;

    if (isDateInAllowedMonths(date)) {
      const newDates = [...selectedDates, date];
      setSelectedDates(newDates);

      if (newDates.length >= 2) {
        setError("");
      }
    } else {
      setError("Please select only dates from valid slot months.");
    }
  };

  // Remove a selected date
  const handleRemoveDate = (dateToRemove) => {
    const filtered = selectedDates.filter((d) => d.toDateString() !== dateToRemove.toDateString());
    setSelectedDates(filtered);

    if (filtered.length >= 2) {
      setError("");
    }
  };

  // Handle slot checkbox toggle (max 2 slots)
  const handleSlotChange = (slotKey) => {
    const alreadySelected = selectedSlots.includes(slotKey);
    let updatedSlots;

    if (alreadySelected) {
      updatedSlots = selectedSlots.filter((s) => s !== slotKey);
    } else {
      if (selectedSlots.length >= 2) return;
      updatedSlots = [...selectedSlots, slotKey];
    }

    setSelectedSlots(updatedSlots);
    setSelectedDates([]);
    setError("");
  };

  // Submit handler
  const handleSubmit = () => {
    if (!isChecked) {
      alert("Please confirm that you have reviewed your application before submitting.");
      return;
    }

    if (selectedSlots.length === 0) {
      setError("Please select at least one slot.");
      return;
    }

    if (selectedSlots.length === 1 && selectedDates.length < 2) {
      setError("Please select at least 2 dates from selected slot ranges.");
      return;
    }

    setError("");
    alert(
      `✅ Slots (${selectedSlots
        .map((s) => slotLabels[s])
        .join(", ")}) submitted successfully!`
    );
  };

  // Collect allowed dates based on selected slots
  const allowedDates = selectedSlots
    .flatMap((slotKey) => generateSlotDates(slotKey))
    .map((d) => d.toDateString());

  const filterDate = (date) => allowedDates.includes(date.toDateString());

  const slotDates = selectedSlots.flatMap((slotKey) => generateSlotDates(slotKey));
  const highlightDatesCombined = Array.from(
    new Set([...slotDates, ...selectedDates].map((d) => d.getTime()))
  ).map((time) => new Date(time));

  return (
    <Fragment>
      <div className="p-3">
        <h4>Select Slot for Inspection</h4>
      </div>

      <div className="custom-card border border-primary rounded p-4">
        <Form.Group className="mb-3 ms-4">
          <Form.Label>Select Slot (Max 2)</Form.Label>
          {Object.keys(slotLabels).map((slotKey, idx) => (
            <Form.Check
              key={slotKey}
              type="checkbox"
              id={`slot-${idx}`}
              label={slotLabels[slotKey]}
              checked={selectedSlots.includes(slotKey)}
              onChange={() => handleSlotChange(slotKey)}
              disabled={
                !selectedSlots.includes(slotKey) && selectedSlots.length >= 2
              }
              className="mb-2"
            />
          ))}
        </Form.Group>

        {selectedSlots.length > 0 && (
          <div className="mb-3 ms-4">
            <strong>Slot Date Ranges:</strong>
            <ul>
              {selectedSlots.map((slotKey) => {
                const dates = generateSlotDates(slotKey);
                return (
                  <li key={slotKey}>
                    {slotLabels[slotKey]}:{" "}
                    {`${dates[0].toDateString()} to ${dates[dates.length - 1].toDateString()}`}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {selectedSlots.length === 1 && selectedDates.length < 2 && (
          <Alert variant="danger">
            Please select at least 2 dates from selected slot ranges.
          </Alert>
        )}

        {error &&
          error !== "Please select at least 2 dates from selected slot ranges." && (
            <Alert variant="danger">{error}</Alert>
          )}

        {/* Confirmation Checkbox */}
        <Form.Group className="mb-3 ms-4">
          <Form.Check 
            type="checkbox"
            id="confirmCheckbox"
            label="I confirm that I have reviewed my application and I am ready to submit"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </Form.Group>

        <Button
          variant="success"
          className="ms-4"
          onClick={handleSubmit}
          disabled={!isChecked} // disable button until checkbox is checked
        >
          Save and Submit
        </Button>

        <br />
        <br />
      </div>
    </Fragment>
  );
};
