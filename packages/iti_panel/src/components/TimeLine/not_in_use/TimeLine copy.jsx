import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import { act, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AffTimeLine, AffTimeLineItem } from "../../../customLib/TimeLine";
{
  /* <WorkIcon fontSize="small" />
<WorkIcon fontSize="medium" />
<WorkIcon fontSize="large" />
<WorkIcon fontSize="inherit" /> */
}

import {
  Button,
  Card,
  Col,
  Collapse,
  Dropdown,
  Modal,
  Nav,
  Row,
  Table,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Pageheader from "../../../layouts/Pageheader";

import { Stage1Actions } from "../Actions";
import { ApplicationFlow, AppFlow } from "../json";

import initSqlJs from "sql.js";

export const TimeLine = () => {
  const [selectedUser, setSelectedUser] = useState("applicant");

  const timeLine = useSelector((state) => state.timeLine);

  const [timeline, setTimeline] = useState(timeLine);

  useEffect(() => {
    console.log("Updated");
    setTimeline(timeLine);
  }, [timeLine]);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
    console.log("Selected:", event.target.value);
  };

  const cardStyles = {
    position: "relative",
    marginLeft: "60px",
    background: "none",
    borderRadius: ".25em",
    padding: "0px",
    boxShadow: "none",
  };

  const currentType = localStorage.getItem("userType");
  const currentUserId = localStorage.getItem("userId");

  const navigate = useNavigate(); // initialize navigation

  const handleAction = (info, info2, action, indexTimeline) => {
    console.log(info, info2, action);

    switch (action.assignedTo) {
      case "applicant":
        switch (action.action) {
          case "form-submit":
            console.log(timeLine.timeline[indexTimeline]);
            navigate("/dashboard/new_registration/");
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  };

  // const async  runSQLite() {
  //   const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });

  //   const db = new SQL.Database();
  //   db.run("CREATE TABLE test (col1, col2);");
  //   db.run("INSERT INTO test VALUES (?, ?);", ["Hello", "World"]);

  //   const result = db.exec("SELECT * FROM test");
  //   console.log(result[0].values); // [['Hello', 'World']]
  // }

  return (
    <Fragment>
      <Pageheader
        mainheading={`TimeLine Example`}
        parentfolder="Dashboard"
        activepage="TimeLine Example"
      />
      <h2>
        Current User: <i>{currentType}</i>
      </h2>
      <Row>
        <Col md={6}>
          <Table className="text-nowrap table-bordered border-primary dashboard-table">
            <thead>
              <tr>
                <th>Time Line</th>
                {/* <th scope="col">Applicant - Actor</th>
            <th scope="col">State - Actor</th>
            <th scope="col">RDSDE - Actor</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <VerticalTimeline animate={false} layout="1-column-left">
                    {timeline.timeline.map((info, indexTimeline) => {
                      return info.subStages.map((info2, i) => {
                        console.log(info2.assignedTo, currentType);
                        return (
                          <VerticalTimelineElement
                            key={i}
                            iconStyle={{
                              background: "rgb(33, 150, 243)",
                              color: "#fff",
                            }}
                            icon={<WorkIcon fontSize="small" />}
                            contentStyle={cardStyles}
                          >
                            <Card className="custom-card border border-primary">
                              <Card.Body style={{ padding: "5px" }}>
                                <div className="card-title">{info2.title}</div>
                                <h6 className="card-title fw-semibold mb-2">
                                  {info2.Subtitle}
                                </h6>
                                <p className="card-text mb-4">{info2.desc}</p>
                              </Card.Body>

                              {info2.status == "Pending" &&
                                info2.assignedTo == currentType && (
                                  <Card.Footer>
                                    <div
                                      className="d-flex justify-content-between"
                                      style={{ alignItems: "center" }}
                                    >
                                      <b>
                                        <span style={{ fontSize: "medium" }}>
                                          {" "}
                                          12/12/2025 3:00PM
                                        </span>
                                      </b>
                                      <div className="btn-list">
                                        {info2.actionsAllow.map((action, i) => {
                                          if (
                                            currentType === action.assignedTo
                                          ) {
                                            return (
                                              <Button
                                                onClick={() =>
                                                  handleAction(
                                                    info,
                                                    info2,
                                                    action,
                                                    indexTimeline
                                                  )
                                                }
                                                key={i}
                                                size="sm"
                                                className="btn btn-secondary"
                                              >
                                                {action.actionName}
                                              </Button>
                                            );
                                          } else {
                                            return "";
                                          }
                                        })}
                                      </div>
                                    </div>
                                  </Card.Footer>
                                )}

                              {/* {getSetAction(info, info2)} */}
                              {/* <Card.Footer>
                            <div className="d-flex justify-content-between">
                              <Button className="btn btn-primary mt-2 me-2">
                                Go to Form
                              </Button>
                            </div>
                          </Card.Footer> */}
                            </Card>
                          </VerticalTimelineElement>
                        );
                      });
                    })}
                  </VerticalTimeline>
                </td>
                {/* <td>sdfdf</td>
            <td>sdfasdf</td>
            <td>sdfsdf</td> */}
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <AffTimeLine>
            {/* <AffTimeLineItem>
              <div>
                <Card className="custom-card border border-primary">
                  <Card.Body style={{ padding: "5px" }}>ddfadsfafd</Card.Body>
                </Card>
              </div>
            </AffTimeLineItem>
            <AffTimeLineItem>dfadf</AffTimeLineItem>
            <AffTimeLineItem>
              <Card className="custom-card border border-primary">
                <Card.Body style={{ padding: "5px" }}>ddfadsfafd</Card.Body>
              </Card>
            </AffTimeLineItem> */}
            {timeline.timeline.map((info, indexTimeline) => {
              return info.subStages.map((info2, i) => {
                console.log(info2.assignedTo, currentType);
                return (
                  <AffTimeLineItem
                    key={i}
                    iconStyle={{
                      background: "rgb(33, 150, 243)",
                      color: "#fff",
                    }}
                    icon={<WorkIcon fontSize="small" />}
                    contentStyle={cardStyles}
                  >
                    <Card className="custom-card border border-primary">
                      <Card.Body style={{ padding: "5px" }}>
                        <div className="card-title">{info2.title}</div>
                        <h6 className="card-title fw-semibold mb-2">
                          {info2.Subtitle}
                        </h6>
                        <p className="card-text mb-4">{info2.desc}</p>
                      </Card.Body>

                      {info2.status == "Pending" &&
                        info2.assignedTo == currentType && (
                          <Card.Footer>
                            <div
                              className="d-flex justify-content-between"
                              style={{ alignItems: "center" }}
                            >
                              <b>
                                <span style={{ fontSize: "medium" }}>
                                  {" "}
                                  12/12/2025 3:00PM
                                </span>
                              </b>
                              <div className="btn-list">
                                {info2.actionsAllow.map((action, i) => {
                                  if (currentType === action.assignedTo) {
                                    return (
                                      <Button
                                        onClick={() =>
                                          handleAction(
                                            info,
                                            info2,
                                            action,
                                            indexTimeline
                                          )
                                        }
                                        key={i}
                                        size="sm"
                                        className="btn btn-secondary"
                                      >
                                        {action.actionName}
                                      </Button>
                                    );
                                  } else {
                                    return "";
                                  }
                                })}
                              </div>
                            </div>
                          </Card.Footer>
                        )}

                      {/* {getSetAction(info, info2)} */}
                      {/* <Card.Footer>
                            <div className="d-flex justify-content-between">
                              <Button className="btn btn-primary mt-2 me-2">
                                Go to Form
                              </Button>
                            </div>
                          </Card.Footer> */}
                    </Card>
                  </AffTimeLineItem>
                );
              });
            })}
          </AffTimeLine>
        </Col>
      </Row>
    </Fragment>
  );
};
