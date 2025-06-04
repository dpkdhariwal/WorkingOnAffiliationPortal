import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import { Fragment, useEffect, useState } from "react";

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
import Pageheader from "../../layouts/Pageheader";
import { textTransform } from "@mui/system";

import { Stage1Actions } from "./Actions";
import { ApplicationFlow, AppFlow } from "./json";

export const TimeLine = () => {
  const [selectedUser, setSelectedUser] = useState("applicant");

  const [timeline, setTimeline] = useState(AppFlow);

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

  const getSetAction = (info, info2) => {
    switch (info.stage) {
      case "Stage-I":
        switch (info2.assignedTo) {
          case "Applicant":
            return <Stage1Actions />;
          default:
            break;
        }
        break;
      case "Stage-II":
        return null;
    }
  };

  return (
    <Fragment>
      <Pageheader
        mainheading={`TimeLine Example`}
        parentfolder="Dashboard"
        activepage="TimeLine Example"
      />
      <Form.Group controlId="exampleSelect" className="mb-3">
        <Form.Label>Select Current User</Form.Label>
        <Form.Select value={selectedUser} onChange={handleChange}>
          <option value="">-- Select --</option>
          <option value="applicant">Applicant</option>
          <option value="state">State</option>
          <option value="rdsde">RDSDE</option>
          <option value="DGT-ADMIN">DGT-ADMIN</option>
        </Form.Select>

        {selectedUser && (
          <p className="mt-2">
            Current User:{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {selectedUser}
            </strong>
          </p>
        )}
      </Form.Group>

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
                  <VerticalTimeline layout="1-column-left">
                    {timeline.timeline.map((info, index) => {
                      return info.subStages.map((info2, i) => {
                        return (
                          <VerticalTimelineElement
                            key={i}
                            iconStyle={{
                              background: "rgb(33, 150, 243)",
                              color: "#fff",
                            }}
                            icon={<WorkIcon />}
                            contentStyle={cardStyles}
                          >

                            <Card className="custom-card shadow">
                              <Card.Header>
                                <div className="card-title">{info2.title}</div>
                              </Card.Header>
                              <Card.Body>
                                <h6 className="card-title fw-semibold mb-2">
                                  {info2.Subtitle}
                                </h6>
                                <p className="card-text mb-4">{info2.desc}</p>
                              </Card.Body>

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
                                    {info2.actionsAllow.map((action, i)=>{
                                      return (<Button key={i}
                                      size="sm"
                                      className="btn btn-secondary"
                                    >
                                      {action.actionName}
                                    </Button>)
                                    })}
                                  </div>
                                </div>
                              </Card.Footer>

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
      </Row>
    </Fragment>
  );
};
