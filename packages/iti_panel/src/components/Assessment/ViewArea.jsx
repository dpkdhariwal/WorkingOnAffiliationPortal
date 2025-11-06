import { viewFile } from "@/helpers";
import { Fragment, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";

export const ViewArea = (props) => {
    const [required_area, setRequired_area] = useState(props.required_area);
    const [totalAvailableArea, setTotalAvailableArea] = useState(props.totalAvailableArea);
    return (
        <Fragment>
            <Card className="border border-2  card custom-card  card">
                <Card.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Required Area</th>
                                <th>Available Area</th>
                                <th>Document</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* <td>1</td> */}
                                <td>{required_area} sqm</td>
                                <td>{totalAvailableArea} sqm</td>
                                <td><Button size="sm" onClick={()=>{viewFile(props?.document)}}>View Document</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

