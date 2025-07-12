import React, { Children, useState, useEffect } from "react";
import "./CustomeTimeLine.scss";
import WorkIcon from "@mui/icons-material/Work";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Switch } from "@mui/material";
// export const AffliationTimeLine = ({ children }) => {
//   return (
//     <div className="timeline-container">
//       {items.map((item, index) => (
//         <div className={`timeline-item ${item.status}`} key={index}>
//           <div className="timeline-line">
//             <div className={`timeline-dot ${item.status}`} />
//           </div>
//           <div className="timeline-content">
//             <h4>{item.title}</h4>
//             <p>{item.description}</p>
//             <p>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s, when an unknown printer took a galley of
//               type and scrambled it to make a type specimen book. It has
//               survived not only five centuries, but also the leap into
//               electronic typesetting, remaining essentially unchanged. It was
//               popularised in the 1960s with the release of Letraset sheets
//               containing Lorem Ipsum passages, and more recently with desktop
//               publishing software like Aldus PageMaker including versions of
//               Lorem Ipsum.
//             </p>
//           </div>
//         </div>
//       ))}

//       {Children.map(children, (child) => (
//         <div className="Row">{child}</div>
//       ))}
//     </div>
//   );
// };

export const AffTimeLine = ({ children }) => {
  return (
    <div
      style={{
        display: "inline-block",
        flexDirection: "column",
        position: "relative",
        marginLeft: "40px",
        paddingLeft: "20px",
        // width: "100%",
      }}
    >
      {/* {items.map((item, index) => (
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
      ))} */}
      {Children.map(children, (child) => (
        <div
          className="AffTimeLineItem"
          style={{ display: "flex", marginBottom: "10px" }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
export default AffTimeLine;

export const AffTimeLineItem = ({ children, info, variant }) => {
  console.log(variant); //completed || pending 
  const [stepLine, setStepLine] = useState('bg-warning');
  const [stepIconBg, setStepIconBg] = useState('bg-warning');
  const [stepIcon, setStepIcon] = useState(<HourglassBottomIcon fontSize="xsmall" />);
  

  useEffect(() => {
     if (variant === "completed") {
       setStepLine("bg-success");
       setStepIconBg("bg-success");
       setStepIcon(<TaskAltIcon fontSize="xsmall" />);
     } else {
       setStepLine("bg-warning");
       setStepIconBg("bg-warning");
       setStepIcon(<HourglassBottomIcon fontSize="xsmall" />);
     }
   }, [variant]);

  return (
    <>
      {Children.map(children, (child) => (
        <>
          <div
            style={{
              // backgroundColor: "aquamarine",
              width: 5,
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className={stepLine}
              style={{
                width: 8,
                height: "120%",
                position: "absolute",
                borderRadius: 5,
                boxShadow: "rgb(111, 142, 202) 0px 0px 3px 0px",
              }}
            />
            <div
              className={`${stepIconBg} border border-1 border-dashed timeline-icon-container`}
              style={{
                position: "absolute",
                top: 5,
                /* left: '-6px', */ borderRadius: 14,
                padding: 3,
                width: 25,
                height: 25,
                display: "flex",
                placeContent: "center",
                borderWidth: 7,
                alignItems: "center",
              }}
            >
              {stepIcon}
            </div>
          </div>
          <div style={{ marginLeft: "32px", width: "100%" }}>{child}</div>
        </>
      ))}
    </>
  );
};
