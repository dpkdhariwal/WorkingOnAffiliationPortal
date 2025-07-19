import { useState, useRef } from "react";
import DataTable from "datatables.net-react";
import DataTablesCore from "datatables.net-bs4";
import "datatables.net-buttons-bs4";
import "datatables.net-select-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import "datatables.net-select-bs4/css/select.bootstrap4.min.css";
import { Button } from "react-bootstrap";

DataTable.use(DataTablesCore);

export const AppList = () => {
  const [tableData] = useState([
    ['Tiger Nixon', 'System Architect'],
    ['Garrett Winters', 'Accountant'],
    ['Ashton Cox', 'Junior Technical Author'],
    ['Cedric Kelly', 'Senior Javascript Developer'],
  ]);

  const table = useRef();

  return (
    <DataTable
      ref={table}
      data={tableData}
      // className="table table-striped table-bordered"
      slots={{
        1: (data, row) => (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              console.log("Position:", data);
              console.log("Row Index:", row);
              // console.log("Selected Row API:", table.current.dt.row(row).data());
            }}
          >
            {row[0]}
          </Button>
        ),
        2: (data, row) => (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              console.log("Position:", data);
              console.log("Row Index:", row);
              // console.log("Selected Row API:", table.current.dt.row(row).data());
            }}
          >
            {row[0]}
          </Button>
        ),
      }}
      options={{
        responsive: true,
        select: {
          style: 'multi+shift',
          selector: 'td:first-child',
        },
        columns: [
          { data: '' },
          { data: '' },
          { data: '' },
        ],
        columnDefs: [
          {
            targets: 0,
            orderable: false,
            className: 'select-checkbox',
            defaultContent: '',
          },
        ],
        order: [[1, 'asc']],
        
      }}
    >
      <thead>
        <tr>
          <th></th> {/* Checkbox Column */}
          <th>Name</th>
          <th>Position</th>
        </tr>
      </thead>
    </DataTable>
  );
};
