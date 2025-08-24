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
    </Fragment>
  );
};
