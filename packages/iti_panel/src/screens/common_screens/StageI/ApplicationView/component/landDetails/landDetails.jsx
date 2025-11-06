import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table } from "react-bootstrap";

export const LandDetails = ({ info }) => {
    return (
        <>
            <Table
                // className="text-nowrap table-striped table"
                width="98%"
            >
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black" }}>Possession of Land</th>
                        <th style={{ border: "1px solid black" }}>Land Owner Name</th>
                        <th style={{ border: "1px solid black" }}>Land Registration Number</th>

                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td style={{ border: "1px solid black" }}>Owned</td>
                        <td style={{ border: "1px solid black" }}>ABCD</td>
                        <td style={{ border: "1px solid black" }}>123456789</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};
