import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
export const ApplicationDetails = ({ info }) => {
    return (
        <Row
        >
            <Col xl={12} lg={12} md={12} sm={12}>
                <table width="98%" border={1} style={{ borderCollapse: "collapse", marginTop: 15, color: "black", }} align="center" cellPadding="5px" >
                    <tbody>
                        <tr>
                            <td colSpan={7} style={{ border: "1px solid black" }}>
                                <b>Application Details:</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ colSpan: 2 }}>
                                <b>Application Number:</b> &nbsp; <u><span>{info?.appId}</span></u>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Col>
        </Row>
    );
};
export default ApplicationDetails;
