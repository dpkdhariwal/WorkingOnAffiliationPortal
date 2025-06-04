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

import { Stage1Actions } from "./Steps";
import {ApplicationFlow, AppFlow} from "./json";

export const TimeLine = () => {
  const [selectedUser, setSelectedUser] = useState("applicant");

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

  //  {
  //     stage: "II",
  //     status: "pending", //  pending | completed
  //     pending_at: "applicant",
  //     moreInfo: {}
  //   },
  //   {
  //     stage: "Inspection",
  //     status: "pending", //  pending | completed
  //     pending_at: "rdsde",
  //     moreInfo: {}
  //   },
  //   {
  //     stage: "SCAA",
  //     status: "pending", //  pending | compliacne | recommended | not recomended
  //     pending_at: "rdsde",
  //     moreInfo: {}
  //   },

  // const ApplicationFlow = [
  //   {
  //     title: "Stage-I Applcation",
  //     Subtitle: "Stage-I pending",
  //     desc: "Applicant Has to fill Stage-I Applcation Before Due Date 20/12/2025",
  //     stage: "Stage-I",
  //     status: "completed", //  pending | completed
  //     pending_at: null,
  //     moreInfo: {},
  //     action: "not-allow",
  //   },
  //   {
  //     title: "NOC Clearance",
  //     Subtitle: "",
  //     desc: "Applicant Has to fill Stage-I Applcation Before Due Date 20/12/2025",
  //     stage: "Stage-II",
  //     status: "pending", //  pending | completed
  //     pending_at: "state",
  //     moreInfo: {},
  //     action: "allow",
  //   },
  // ];

  const getSetAction = (info) => {
    switch (info.stage) {
      case "Stage-I":
        return <Stage1Actions info={info} selectedUser={selectedUser} />;
      case "Stage-II":
        return <Stage1Actions info={info} selectedUser={selectedUser} />;
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
      <Table className="text-nowrap table-bordered border-primary dashboard-table">
        <thead>
          <tr>
            <th scope="col">Time Line</th>
            <th scope="col">Applicant - Actor</th>
            <th scope="col">State - Actor</th>
            <th scope="col">RDSDE - Actor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <VerticalTimeline layout="1-column-left">
                {ApplicationFlow.map((info, index) => {
                  return (

                      

                    <VerticalTimelineElement
                      key={index}
                      iconStyle={{
                        background: "rgb(33, 150, 243)",
                        color: "#fff",
                      }}
                      icon={<WorkIcon />}
                      contentStyle={cardStyles}
                    >
                      <div className="d-flex justify-content-end">
                        <div className="p-2">
                          <b>
                            <span>12/12/2025 3:00PM</span>
                          </b>
                        </div>
                      </div>
                      <Card className="custom-card shadow">
                        <Card.Header>
                          <div className="card-title">{info.title}</div>
                        </Card.Header>
                        <Card.Body>
                          <h6 className="card-title fw-semibold mb-2">
                            {info.Subtitle}
                          </h6>
                          <p className="card-text mb-4">{info.desc}</p>
                        </Card.Body>
                        {getSetAction(info)}
                      </Card>
                    </VerticalTimelineElement>
                  );
                })}
              </VerticalTimeline>
            </td>
            <td>sdfdf</td>
            <td>sdfasdf</td>
            <td>sdfsdf</td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
};
