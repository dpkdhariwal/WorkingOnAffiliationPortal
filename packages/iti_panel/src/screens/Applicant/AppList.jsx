// import { Fragment, useRef, useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, ListGroup, Alert } from "react-bootstrap";

import { Fragment, useState, useRef } from "react";
import DataTable from "datatables.net-react";
// import DataTablesCore from "datatables.net-bs4";
// import "datatables.net-buttons-bs4";
// import "datatables.net-select-bs4";
// import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
// import "datatables.net-select-bs4/css/select.bootstrap4.min.css";
// import { Button } from "react-bootstrap";
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-select-bs5';

import Pageheader from "../../layouts/Pageheader";

import { GetSetAppAction } from "../../screens/action/getSetAppAction";

// import DataTable from 'datatables.net-react';
// import DataTablesCore from 'datatables.net-bs5';
import { TimeLine } from "../TimeLine";
import { PrimeReactDT } from "../../screens/Applicant/AppList_ag-grid";

DataTable.use(DataTablesCore);

// DataTable.use(DataTablesCore);
import { useSelector, useDispatch } from "react-redux";

export const AppList = () => {
  const AppliInfo = useSelector((state) => state.AppliInfo);
  const [tableData] = useState([AppliInfo]);
  const table = useRef();

  return (
    <Fragment>
      <Pageheader
        mainheading={`Application List`}
        parentfolder="Dashboard"
        activepage="Application List"
      />
      <PrimeReactDT />
      {false && (<Card className="custom-card shadow">
        <Card.Header>
          <div className="card-title" style={{ textTransform: "none" }}>
            Application List
          </div>
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <PrimeReactDT />

          {false && (<DataTable
            ref={table}
            data={tableData}
            className="table-striped table"
            slots={
              {
                1: (data, row) => {
                  console.log(data, row);
                  return (
                    (row.applicantId)
                  )
                },
                5: (data, row) => (
                  // Here Redux state not working why?
                  <GetSetAppAction data={data} row={row} />
                ),
              }
            }
            options={{
              responsive: true,
              select: {
                style: 'multi+shift',
                selector: 'td:first-child',
              },
              columns: [
                { data: 'applicantId', defaultContent: '' },
                { data: 'applicantId', defaultContent: '' },
                { data: 'applicantId', defaultContent: '' },
                { data: 'applicantId', defaultContent: '' },
                { data: 'applicantId', defaultContent: '' },
                { data: 'applicantId', defaultContent: '' },
              ],
              columnDefs: [
                {
                  width: 5,
                  targets: 0,
                  orderable: false,
                  className: 'select-checkbox',
                  defaultContent: '',
                },
                {
                  targets: 1,
                  orderable: false,
                  defaultContent: '',
                },
                {
                  targets: 2,
                  orderable: false,
                  defaultContent: '',
                },
              ],
              order: [[1, 'asc']],

            }}
          >
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      // console.log(table.current.dt());
                      const api = table.current?.dt();
                      if (!api) return;

                      if (e.target.checked) {
                        api.rows().select();
                      } else {
                        api.rows().deselect();
                      }
                    }}
                  />
                </th>
                <th>Application ID</th>
                <th>MIS Code / Temp. Code</th>
                <th>Institute Name</th>
                <th>Institute Type</th>
                <th>Current status</th>
              </tr>
            </thead>
          </DataTable>)}
        </Card.Body>
        {/* <Card.Footer>
        </Card.Footer> */}
      </Card>)}
    </Fragment>
  );
};
