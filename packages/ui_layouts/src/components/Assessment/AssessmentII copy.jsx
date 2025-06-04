import React, { Fragment, useRef, useState, useEffect } from "react";
import Pageheader from "../../layouts/Pageheader";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Card, Badge } from "react-bootstrap";
import "./Resizer.css"; // Import your CSS file for custom styles
import {
  BuildingPlanView,
  BuildingPlanAction,
  BccView,
  BccViewAction,
  PhotosOfBuilding,
  PhotosOfBuildingAction,
} from "../new_registration/form/stateII/BuildingPlan";

import {
  ElectricityConnectionDetailsView,
  ElectricityConnectionDetailsAction,
  BackupPowerSupplyView,
  BackupPowerSupplyAction,
  FireAndSafetyCertificateView,
  FireAndSafetyCertificateAction,
} from "../new_registration/form/stateII/ElectricityConnectionDetails";
const LINE_HEIGHT = 400;

const Assessment = () => {
  const List = [
    {
      category: "Building Details",
      subCategory: "Building Plan",
      view: BuildingPlanView,
      action: BuildingPlanAction,
    },
    {
      category: "Building Details",
      subCategory: "Building Completion Certificate (BCC)",
      view: BccView,
      action: BccViewAction,
    },
    {
      category: "Building Details",
      subCategory: "Photos of Building",
      view: PhotosOfBuilding,
      action: PhotosOfBuildingAction,
    },

    {
      category: "Electricity Connection Details",
      subCategory: "Connection Details",
      view: ElectricityConnectionDetailsView,
      action: ElectricityConnectionDetailsAction,
    },

    {
      category: "Electricity Connection Details",
      subCategory: "Backup Power Supply",
      view: BackupPowerSupplyView,
      action: BackupPowerSupplyAction,
    },

    {
      category: "Electricity Connection Details",
      subCategory: "Fire and Safety Certificate",
      view: FireAndSafetyCertificateView,
      action: FireAndSafetyCertificateAction,
    },
  ];

  const [sizes, setSizes] = useState(["50%", "auto"]);
  const itemRefs = useRef([]); // Create a ref to store multiple DOM refs
  const itemRefsRight = useRef([]); // Create a ref to store multiple DOM refs

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isSyncingRef = useRef(false);

  // Get scroll index based on top visible child
  const getVisibleIndex = (container) => {
    const children = Array.from(container.children);
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      if (rect.top >= parentRect.top) {
        return i;
      }
    }
    return 0;
  };

  // Scroll to a specific child index
  const scrollToIndex = (container, index) => {
    const children = Array.from(container.children);
    if (children[index]) {
      container.scrollTo({
        top: children[index].offsetTop,
        behavior: "auto",
      });
    }
  };

  useEffect(() => {
    console.log(itemRefs, itemRefsRight);
    itemRefs.current.forEach((ref, index) => {
      const refRight = itemRefsRight.current[index];
      if (ref && refRight) {
        console.log(
          ref.offsetHeight,
          itemRefsRight.current[index].offsetHeight
        );
      }
    });
  }, []);

  // Sync scroll based on index
  const handleScroll = (sourceRef, targetRef) => {
    console.log(sourceRef, targetRef);
    return () => {
      if (isSyncingRef.current) return;

      const source = sourceRef.current;
      const target = targetRef.current;

      const index = getVisibleIndex(source);
      isSyncingRef.current = true;
      scrollToIndex(target, index);
      setTimeout(() => {
        isSyncingRef.current = false;
      }, 0);
    };
  };

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    console.log(left, right);

    if (left && right) {
      const leftScroll = handleScroll(leftRef, rightRef);
      const rightScroll = handleScroll(rightRef, leftRef);

      left.addEventListener("scroll", leftScroll);
      right.addEventListener("scroll", rightScroll);

      return () => {
        left.removeEventListener("scroll", leftScroll);
        right.removeEventListener("scroll", rightScroll);
      };
    }
  }, []);

  const paneStyle = {
    height: "100%", // fixed pane height
    overflowY: "auto",
    scrollSnapType: "y mandatory",
    // background: "red",
    "margin-top": "5px",
    padding: "5px",
    "border-radius": "5px",
    "margin-right": "5px",
  };

  const paragraphStyleLeft = (i) => {
    return {
      scrollSnapAlign: "start",
      // height: `${itemRefsRight.current[i].offsetHeight}px`, // simulate different height
      height: `${LINE_HEIGHT}px`,
      border: "1px dashed #aaa",
      padding: "10px",
      boxSizing: "border-box",
      background: "#FDDEDF",
      overflowY: "auto",
      // marginTop: "5px",
    };
  };

  const paragraphStyleRight = (i) => {
    return {
      scrollSnapAlign: "start",
      height: `${LINE_HEIGHT}px`, // simulate different height
      border: "1px dashed #aaa",
      padding: "10px",
      boxSizing: "border-box",
      background: "#fefefe",
      overflowY: "scroll",
      // marginTop: "5px",
    };
  };

  const handleScroll2 = (e) => {
    console.log(e, leftRef, rightRef);
    // console.log('Scroll position:', e.target.scrollTop, data);
    // leftRef.current.scrollTo({
    //   top: e.target.scrollTop, // vertical position in px
    //   behavior: "smooth", // smooth scrolling
    // });
    // rightRef.current.scrollTo({
    //   top: e.target.scrollTop, // vertical position in px
    //   behavior: "smooth", // smooth scrolling
    // });
  };

  return (
    <Fragment>
      {/* <Pageheader
        mainheading="Assessment"
        parentfolder="Dashboard"
        activepage="Assessment"
      /> */}
      <Card className="custom-card">
        <Card.Header>
          <div className="card-title">Assessment-II</div>
        </Card.Header>
        <Card.Body style={{ padding: "0px" }}>
          <div style={{ height: "500px" }}>
            <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
              <Pane minSize={100} maxSize="90%">
                <div className="bg-primary p-1 rounded-start text-center">
                  Particulars
                </div>
                <div
                  ref={leftRef}
                  style={{ ...paneStyle }}
                  className="bg-gray-200 scrollable-div"
                  onScroll={handleScroll2}
                >
                  {List.map((item, i) => {
                    console.log(item);
                    return (
                      <div
                        key={i}
                        style={paragraphStyleLeft(i)}
                        ref={(el) => (itemRefs.current[i] = el)}
                      >
                        <div className="d-flex justify-content-between mb-3">
                          <div className="p-2">
                            <Badge
                              bg="outline-primary"
                              className="rounded-pill"
                            >
                              {item.category}
                            </Badge>
                          </div>
                          <div className="p-2">
                            <Badge
                              bg="outline-primary"
                              className="rounded-pill"
                            >
                              {item.subCategory}
                            </Badge>
                          </div>
                        </div>
                        <div> {React.createElement(item.view)}</div>
                      </div>
                    );
                  })}
                </div>
              </Pane>
              <Pane minSize={100}>
                <div className="bg-secondary p-1 rounded-end text-center">
                  Assessment Details
                </div>
                <div
                  ref={rightRef}
                  style={{ ...paneStyle }}
                  className="bg-gray-300 scrollable-div"
                  onScroll={handleScroll2}
                >
                  {List.map((item, i) => (
                    <div
                      key={i}
                      ref={(el) => (itemRefsRight.current[i] = el)}
                      style={paragraphStyleRight(i)}
                    >
                      <div className="d-flex justify-content-between mb-3">
                        <div className="p-2">
                          <Badge bg="outline-primary" className="rounded-pill">
                            {item.category}
                          </Badge>
                        </div>
                        <div className="p-2">
                          <Badge bg="outline-primary" className="rounded-pill">
                            {item.subCategory}
                          </Badge>
                        </div>
                      </div>{" "}
                      <div> {React.createElement(item.action)}</div>
                    </div>
                  ))}
                </div>
              </Pane>
            </SplitPane>
          </div>
        </Card.Body>
        <div className="card-footer text-muted">11.32pm</div>
      </Card>
    </Fragment>
  );
};

export default Assessment;
