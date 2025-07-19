import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";

import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import DataTable from 'datatables.net-react';
import DataTablesCore from 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-select-bs4';

DataTable.use(DataTablesCore);

// DataTable.use(DT);

export const AppList = () => {
  const [tableData, setTableData] = useState([
    ['Tiger Nixon', 'System Architect', 1],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant', 4],

    // ...
  ]);
  const table = useRef();

  return (
    <DataTable ref={table}
      data={tableData} className="display"
      slots={{
        0: (data, row) => (
          <Button onClick={() => {
            // console.log(data, row,)
            console.log(table.current.dt.row(row).select());
            // table.row(row).select();
          }}>
            {data}
          </Button>
        )
      }}
      options={{
        responsive: true,
        select: false,
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
        </tr>
      </thead>
    </DataTable>
  );
};

