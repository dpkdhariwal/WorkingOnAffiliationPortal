import { viewFile } from "@/helpers";
import { Fragment, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";

export const ViewAreaClassroom = ({ info }) => {
    const [initial_detail, setInitial_detail] = useState(info.initial_detail);
    return (
        <Fragment>
            <Card className="border border-2  card custom-card  card">
                <Card.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Required Area</th>
                                <th>Available Area</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* <td>1</td> */}
                                <td>{initial_detail?.required_area} sqm</td>
                                <td>{initial_detail?.totalAvailableArea} sqm</td>
                            </tr>
                        </tbody>
                    </Table>
                    <hr />
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Particular</th>
                                <th>Trade Name</th>
                                <th>required_area</th>
                                <th>Available Area</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initial_detail?.documents?.map((obj, index) => {
                                return (<tr key={index}>
                                    <td>{obj.clasroom}</td>
                                    <td>{obj.required_area} sqm</td>
                                    <td>{obj.available_area} sqm</td>
                                    <td><Button size="sm" onClick={() => { viewFile(obj.document) }}>View Document</Button></td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

