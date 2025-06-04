import { Fragment, useRef, useState, useEffect } from "react";
import Pageheader from "../../layouts/Pageheader";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Card } from "react-bootstrap";
// import "./Resizer.css"; // Import your CSS file for custom styles

const LINE_HEIGHT = 100;

const Assessment = () => {
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
        // Apply new styles dynamically
        ref.style.backgroundColor = "lightblue";
        ref.style.border = "2px solid red";
        ref.style.padding = "20px";
        ref.style.height = `${LINE_HEIGHT * 5}px`; // Set the height to LINE_HEIGHT
        refRight.style.height = `${LINE_HEIGHT * 5}px`; // Set the height to LINE_HEIGHT
      }
    });
  }, []);
 

  // Sync scroll based on index
  const handleScroll = (sourceRef, targetRef) => {
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
    height: "500px", // fixed pane height
    overflowY: "auto",
    scrollSnapType: "y mandatory",
  };

  const paragraphStyleLeft = (i) => {
    return {
      scrollSnapAlign: "start",
      // height: `${itemRefsRight.current[i].offsetHeight}px`, // simulate different height
      height: `${LINE_HEIGHT}px`,
      border: "1px dashed #aaa",
      padding: "10px",
      boxSizing: "border-box",
      background: "#fff",
      overflowY: "auto",
    };
  };

  const paragraphStyleRight = (i) => {
    return {
      scrollSnapAlign: "start",
      height: `${LINE_HEIGHT}px`, // simulate different height
      border: "1px dashed #999",
      padding: "10px",
      boxSizing: "border-box",
      background: "#fefefe",
      overflowY: "auto",
    };
  };

  return (
    <Fragment>
      {/* <Pageheader
        mainheading="Assessment"
        parentfolder="Dashboard"
        activepage="Assessment"
      /> */}
      <Card className="custom-card text-center">
        <Card.Header>
          <div className="card-title">Assessment</div>
        </Card.Header>
        <Card.Body>
          <div style={{ height: "500px" }}>
            <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
              <Pane minSize={100} maxSize="50%">
                <div className="bg-primary p-1 rounded-start">
                  <h5>Pane Heading 1</h5>
                </div>
                <div ref={leftRef} style={{ ...paneStyle, background: "#ddd" }}>
                  {Array.from({ length: 50 }, (_, i) => (
                    <div
                      key={i}
                      style={paragraphStyleLeft(i)}
                      ref={(el) => (itemRefs.current[i] = el)}
                    >
                      Content for Pane 1 - Line {i + 1}
                      {/* <CompDevelopment /> */}
                    </div>
                  ))}
                </div>
              </Pane>
              <Pane minSize={100}>
                <div className="bg-primary p-1 rounded-end">
                  <h5>Pane Heading 2</h5>
                </div>
                <div
                  ref={rightRef}
                  style={{ ...paneStyle, background: "#d5d7d9" }}
                >
                  {Array.from({ length: 50 }, (_, i) => (
                    <div
                      key={i}
                      ref={(el) => (itemRefsRight.current[i] = el)}
                      style={paragraphStyleRight(i)}
                    >
                      Content for Pane 2 - Line {i + 1}
                      {/* <CompDevelopment /> */}
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

const CompDevelopment = () => {
  // Generate a random height between 200 and 600
  const randomHeight = Math.floor(Math.random() * 401) + 200;

  return (
    <div
      style={{
        padding: "20px",
        height: randomHeight,
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1>Component Development</h1>
      <p>This is a placeholder for component development.</p>
      <p>Random height: {randomHeight}px</p>
    </div>
  );
};
