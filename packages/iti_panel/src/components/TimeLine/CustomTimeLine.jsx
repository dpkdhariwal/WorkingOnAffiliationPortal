import React from "react";
import "./CustomeTimeLine.scss";

export const CTimeLine = () => {
  const items = [
    {
      title: "Application Submitted",
      description: "We received your application",
      status: "completed",
    },
    {
      title: "Under Review",
      description: "Your application is being reviewed",
      status: "current",
    },
    {
      title: "Decision Pending",
      description: "Awaiting final decision",
      status: "upcoming",
    },
  ];

  return (
    <div className="timeline-container">
      {items.map((item, index) => (
        <div className={`timeline-item ${item.status}`} key={index}>
          <div className="timeline-line">
            <div className={`timeline-dot ${item.status}`} />
          </div>
          <div className="timeline-content">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
