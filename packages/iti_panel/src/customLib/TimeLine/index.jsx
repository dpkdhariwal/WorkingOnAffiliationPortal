import React, { Children } from "react";
import "./CustomeTimeLine.scss";
import WorkIcon from "@mui/icons-material/Work";

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

export const AffTimeLineItem = ({ children }) => {
  return (
    <>
      {Children.map(children, (child) => (
        <>
          <div
            className="timline"
            style={{
              backgroundColor: "aquamarine",
              width: "5px",
              position: "relative",
            }}
          >
            <div
              className="timeline-progress"
              style={{
                width: 5,
                backgroundColor: "aqua",
                height: "120%",
                position: "absolute",
              }}
            />
            <div
              className="timeline-icon-container"
              style={{
                position: "absolute",
                top: 5,
                left: "-7px",
                backgroundColor: "aqua",
                borderRadius: 14,
                padding: 3,
                width: 20,
                height: 20,
                display: "flex",
                alignContent: "center",
              }}
            >
              <WorkIcon fontSize="xsmall" />
            </div>
          </div>
          {/* <div
            style={{
              position: "relative",
              top: 8,
              right: "-7px",
              height: 0,
              width: 0,
              borderWidth: 7,
              borderStyle: "solid",
              borderColor: "transparent rgb(177 36 36) transparent transparent",
              borderImage: "initial",
            }}
          /> */}


           <div style={{ marginLeft: '15px'}} >{child}</div>
          {/* <div className="border border-primary card"
            style={{
              // backgroundColor: "grey",
              marginLeft: 7,
              marginTop: '0px',
              padding: 4,
              borderRadius: '0.688rem',
            }}
          >
           
          </div> */}
        </>
      ))}
    </>
  );
};
