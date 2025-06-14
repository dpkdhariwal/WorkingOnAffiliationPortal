import React, { Fragment } from 'react';
import Pageheader from '../../layouts/Pageheader';
import { Card, Col, Row, Button, Form, Dropdown, Table, Pagination } from 'react-bootstrap';
import ALLImages from '../../common/Imagedata';
import { useSelector, useDispatch } from "react-redux";
  const currentType = localStorage.getItem("userType");

const Dashboard = () => {

  const TASKS = [
    {
      Task: "Evaluating the design",
      TeamMember1: ALLImages('face1'),
      TeamMember2: ALLImages('face2'),
      TeamMember3: ALLImages('face3'),
      TeamMember4: ALLImages('face4'),
      OpenTask: "37",
      TaskProfit: "High",
      Profittext: "primary",
      Status: "Completed",
      Statustext: "primary",
      checked: true
    },
    {
      Task: "Generate ideas for design",
      TeamMember1: ALLImages('face1'),
      TeamMember2: ALLImages('face10'),
      TeamMember3: ALLImages('face11'),
      TeamMember4: ALLImages('face12'),
      OpenTask: "37",
      TaskProfit: "Normal",
      Profittext: "secondary",
      Status: "pending",
      Statustext: "warning",
      checked: false
    },
    {
      Task: "Define the problem",
      TeamMember1: ALLImages('face3'),
      TeamMember2: ALLImages('face6'),
      TeamMember3: ALLImages('face7'),
      TeamMember4: ALLImages('face4'),
      OpenTask: "37",
      TaskProfit: "Low",
      Profittext: "warning",
      Status: "Completed",
      Statustext: "primary",
      checked: true
    },
    {
      Task: "Empathize with users",
      TeamMember1: ALLImages('face4'),
      TeamMember2: ALLImages('face5'),
      TeamMember3: ALLImages('face6'),
      TeamMember4: ALLImages('face3'),
      OpenTask: "37",
      TaskProfit: "high",
      Profittext: "primary",
      Status: "Rejected",
      Statustext: "danger",
      checked: false
    },
  ];

  return (
    <Fragment>
      <Pageheader mainheading='Welcome To Dashboard' parentfolder='Home' activepage='Project Dashboard' />
      {currentType}
      {/* <!--Row--> */}
      <Row className="row-sm">
        <Col sm={12} lg={12} xl={8}>
          <Row className="row-sm">
            <Col sm={12} md={6} lg={6} xl={4}>
              <Card className="custom-card">
                <Card.Body>
                  <div className="card-item">
                    <div className="card-item-icon card-icon">
                      <svg
                        className="text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="24" viewBox="0 0 24 24" width="24">
                        <g><rect height="14" opacity=".3" width="14" x="5" y="5" /><g>
                          <rect fill="none" height="24" width="24" />
                          <g>
                            <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z" />
                            <rect height="5" width="2" x="7" y="12" />
                            <rect height="10" width="2" x="15" y="7" />
                            <rect height="3" width="2" x="11" y="14" />
                            <rect height="2" width="2" x="11" y="10" />
                          </g>
                        </g>
                        </g>
                      </svg>
                    </div>
                    <div className="card-item-title mb-2">
                      <label className="main-content-label fs-13 font-weight-bold mb-1">
                        Total Revenue
                      </label>
                      <span className="d-block fs-12 mb-0 text-muted">
                        Previous month vs this months
                      </span>
                    </div>
                    <div className="card-item-body">
                      <div className="card-item-stat">
                        <h4 className="font-weight-bold">$5,900.00</h4>
                        <small>
                          <b className="text-success">55%</b> higher
                        </small>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={6} xl={4}>
              <Card className="custom-card">
                <Card.Body>
                  <div className="card-item">
                    <div className="card-item-icon card-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M12 4c-4.41 0-8 3.59-8 8 0 1.82.62 3.49 1.64 4.83 1.43-1.74 4.9-2.33 6.36-2.33s4.93.59 6.36 2.33C19.38 15.49 20 13.82 20 12c0-4.41-3.59-8-8-8zm0 9c-1.94 0-3.5-1.56-3.5-3.5S10.06 6 12 6s3.5 1.56 3.5 3.5S13.94 13 12 13z"
                          opacity=".3"
                        />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
                      </svg>
                    </div>
                    <div className="card-item-title mb-2">
                      <label className="main-content-label fs-13 font-weight-bold mb-1">
                        New Employees
                      </label>
                      <span className="d-block fs-12 mb-0 text-muted">
                        Employees joined this month
                      </span>
                    </div>
                    <div className="card-item-body">
                      <div className="card-item-stat">
                        <h4 className="font-weight-bold">15</h4>
                        <small>
                          <b className="text-success">5%</b> Increased
                        </small>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={12} lg={12} xl={4}>
              <Card className="card custom-card">
                <Card.Body>
                  <div className="card-item">
                    <div className="card-item-icon card-icon">
                      <svg
                        className="text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1.23 13.33V19H10.9v-1.69c-1.5-.31-2.77-1.28-2.86-2.97h1.71c.09.92.72 1.64 2.32 1.64 1.71 0 2.1-.86 2.1-1.39 0-.73-.39-1.41-2.34-1.87-2.17-.53-3.66-1.42-3.66-3.21 0-1.51 1.22-2.48 2.72-2.81V5h2.34v1.71c1.63.39 2.44 1.63 2.49 2.97h-1.71c-.04-.97-.56-1.64-1.94-1.64-1.31 0-2.1.59-2.1 1.43 0 .73.57 1.22 2.34 1.67 1.77.46 3.66 1.22 3.66 3.42-.01 1.6-1.21 2.48-2.74 2.77z"
                          opacity=".3"
                        />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                      </svg>
                    </div>
                    <div className="card-item-title  mb-2">
                      <label className="main-content-label fs-13 font-weight-bold mb-1">
                        Total Expenses
                      </label>
                      <span className="d-block fs-12 mb-0 text-muted">
                        Previous month vs this months
                      </span>
                    </div>
                    <div className="card-item-body">
                      <div className="card-item-stat">
                        <h4 className="font-weight-bold">$8,500</h4>
                        <small>
                          <b className="text-danger">12%</b> decrease
                        </small>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="row-sm">
            <Col lg={12}>
              <Card className="custom-card mg-b-20">
                <Card.Body>
                  <Card.Header className="border-bottom-0 pt-0 ps-0 pe-0 pb-2 d-flex">
                    <div>
                      <label className="main-content-label mb-2">Tasks</label>
                      <p className="mb-0 fs-12 mb-3 text-muted">
                        A task is accomplished by a set deadline, and must
                        contribute toward work-related objectives.
                      </p>
                    </div>
                    <div className="ms-auto d-flex flex-wrap gap-2">
                      <div className="contact-search3 me-3">
                        <Button variant="" type="button" className="border-0"><i className="fe fe-search fw-semibold text-muted" aria-hidden="true"></i></Button>
                        <Form.Control type="text" className="h-6" id="typehead1" placeholder="Search here..." autoComplete="off" />
                      </div>
                      <Dropdown className="ms-auto d-flex">
                        <Dropdown.Toggle variant="default" className="btn btn-wave waves-effect waves-light btn-primary d-inline-flex align-items-center border-0">
                          <i className="ri-equalizer-line me-1"></i>Sort by
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ margin: "0px" }}>
                          <Dropdown.Item>Task</Dropdown.Item>
                          <Dropdown.Item>Team</Dropdown.Item>
                          <Dropdown.Item>Status</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item>
                            <i className="fa fa-cog me-2"></i> Settings
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                  </Card.Header>
                  <div className="table-responsive tasks">
                    <Table className="card-table table-vcenter text-nowrap mb-0 border dashboard-table"  >
                      <thead>
                        <tr>
                          <th className="wd-lg-10p">Task</th>
                          <th className="wd-lg-20p text-center">Team</th>
                          <th className="wd-lg-20p text-center">Open task</th>
                          <th className="wd-lg-20p">Prority</th>
                          <th className="wd-lg-20p">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TASKS.map((items, index) => (
                          <tr key={index} data-index={index}>
                            <td className="fw-medium">
                              <div className="d-flex">
                                <Form.Check className="me-4 rounded" defaultChecked={items.checked} type="radio" label="" />
                                <span className="mt-1">{items.Task}</span>
                              </div>
                            </td>
                            <td className="text-nowrap">
                              <div className="avatar-list-stacked my-auto float-end">
                                <div className="avatar avatar-rounded avatar-sm">
                                  <img
                                    alt="avatar"
                                    className="rounded-circle"
                                    src={items.TeamMember1}
                                  />
                                </div>
                                <div className="avatar avatar-rounded avatar-sm">
                                  <img
                                    alt="avatar"
                                    className="rounded-circle"
                                    src={items.TeamMember2}
                                  />
                                </div>
                                <div className="avatar avatar-rounded avatar-sm">
                                  <img
                                    alt="avatar"
                                    className="rounded-circle"
                                    src={items.TeamMember3}
                                  />
                                </div>
                                <div className="avatar avatar-rounded avatar-sm">
                                  <img
                                    alt="avatar"
                                    className="rounded-circle"
                                    src={items.TeamMember4}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="text-center">
                              37<i className=""></i>
                            </td>
                            <td className={`text-${items.Profittext}`}>
                              {items.TaskProfit}
                            </td>
                            <td>
                              <span
                                className={`badge rounded-pill bg-${items.Statustext}-transparent`}
                              >
                                {items.Status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <div className="float-end mt-3">
                    <nav className="pagination-style-3">
                      <Pagination className="mb-0 flex-wrap">
                        <Pagination.Item disabled>Prev</Pagination.Item>
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Ellipsis />
                        <Pagination.Item>{16}</Pagination.Item>
                        <Pagination.Item>Next</Pagination.Item>
                      </Pagination></nav>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col sm={12} lg={12} xl={4} className=" mt-xl-3">
          <Card className=" custom-card">
            <Card.Header className="border-bottom-0 pb-0 d-flex ps-3 ms-1">
              <div>
                <label className="main-content-label mb-2 pt-2">
                  On goiong projects
                </label>
                <span className="d-block fs-12 mb-2 text-muted">
                  Projects where development work is on completion
                </span>
              </div>
            </Card.Header>
            <Card.Body className="pt-2 mt-0">
              <div className="list-card">
                <div className="d-flex">
                  <div className="avatar-list-stacked d-flex align-items-center">
                    <div className="avatar avatar-rounded avatar-xs">
                      <img
                        alt="avatar"
                        className="rounded-circle"
                        src={ALLImages("face1")}
                      />
                    </div>
                    <div className="avatar avatar-rounded avatar-xs">
                      <img
                        alt="avatar"
                        className="rounded-circle"
                        src={ALLImages("face2")}
                      />
                    </div>
                    <div className="avatar avatar-rounded avatar-xs">
                      <img
                        alt="avatar"
                        className="rounded-circle"
                        src={ALLImages("face3")}
                      />
                    </div>
                    <div className="avatar avatar-rounded avatar-xs">
                      <img
                        alt="avatar"
                        className="rounded-circle"
                        src={ALLImages("face4")}
                      />
                    </div>
                    <div className="ms-4">Design team</div>
                  </div>
                  <div className="ms-auto float-end">
                    <Dropdown className="GOIONGPROJECTS">
                      <Dropdown.Toggle as='a' variant="default" className="no-caret option-dots"> <i className="fe fe-more-horizontal"></i> </Dropdown.Toggle>
                      <Dropdown.Menu className=" dropdown-menu-end" style={{ margin: "0px" }} >
                        <Dropdown.Item>Today</Dropdown.Item>
                        <Dropdown.Item>Last Week</Dropdown.Item>
                        <Dropdown.Item>Last Month</Dropdown.Item>
                        <Dropdown.Item>Last Year</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="card-item mt-2">
                  <div className="card-item-icon bg-transparent card-icon">
                  </div>
                  <div className="card-item-body">
                    <div className="card-item-stat">
                      <small className="fs-10 text-primary fw-semibold">
                        25 August 2020
                      </small>
                      <h6 className=" mt-2">Mobile app design</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-card mb-0">
                <div className="d-flex">
                  <div className="avatar-list-stacked d-flex align-items-center">
                    <div className="avatar avatar-rounded avatar-xs">
                      <img
                        alt="avatar"
                        className="rounded-circle"
                        src={ALLImages("face5")}
                      />
                    </div>
                    <div className="avatar avatar-rounded avatar-xs">
                      <img
                        alt="avatar"
                        className="rounded-circle"
                        src={ALLImages("face6")}
                      />
                    </div>
                    <div className="avatar avatar-rounded avatar-xs">
                      <img
                        alt="avatar"
                        className="rounded-circle"
                        src={ALLImages("face7")}
                      />
                    </div>
                    <div className="avatar avatar-rounded avatar-xs">
                      <img
                        alt="avatar"
                        className="rounded-circle"
                        src={ALLImages("face6")}
                      />
                    </div>
                    <div className="ms-4">Design team</div>
                  </div>
                  <div className="ms-auto float-end">
                    <Dropdown className="Designteam">
                      <Dropdown.Toggle as='a' variant="" className="no-caret option-dots"><i className="fe fe-more-horizontal"></i></Dropdown.Toggle>
                      <Dropdown.Menu className=" dropdown-menu-end" style={{ margin: "0px" }}>
                        <Dropdown.Item>Today</Dropdown.Item>
                        <Dropdown.Item>Last Week</Dropdown.Item>
                        <Dropdown.Item>Last Month</Dropdown.Item>
                        <Dropdown.Item>Last Year</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="card-item mt-2">
                  <div className="card-item-icon bg-transparent card-icon">
                  </div>
                  <div className="card-item-body">
                    <div className="card-item-stat">
                      <small className="fs-10 text-primary fw-semibold">
                        12 JUNE 2020
                      </small>
                      <h6 className=" mt-2">Website Redesign</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card className="custom-card">
            <Card.Body>
              <div className="d-flex">
                <label className="main-content-label my-auto">
                  Website Design
                </label>
                <div className="ms-auto  d-flex">
                  <div className="me-3 d-flex text-muted fs-13">Running</div>
                </div>
              </div>
              <div className="mt-2">
                <div>
                  <span className="fs-15 text-muted">
                    Task completed : 7/10
                  </span>
                </div>
                <div className="container">
                </div>
              </div>
              <Row className="row">
                <Col className="col">
                  <div className="mt-4">
                    <div className="d-flex mb-2">
                      <h5 className="fs-15 my-auto text-muted fw-normal">
                        Client :
                      </h5>
                      <h5 className="fs-15 my-auto ms-3">John Deo</h5>
                    </div>
                    <div className="d-flex mb-0">
                      <h5 className="fs-13 my-auto text-muted fw-normal">
                        Deadline :
                      </h5>
                      <h5 className="fs-13 my-auto text-muted ms-2">
                        25 Dec 2020
                      </h5>
                    </div>
                  </div>
                </Col>
                <Col className=" col-auto">
                  <div className="mt-3">
                    <div>
                      <img alt="logo" className="ht-50" src={ALLImages('png29')} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Dashboard

