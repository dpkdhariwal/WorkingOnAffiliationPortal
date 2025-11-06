import { Row, Col, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";


export const AddressOfInstitute = ({ info }) => {
    return (
        <Row
        >
            <Col xl={12} lg={12} md={12} sm={12}>
                <table
                    width="98%"
                    border={1}
                    style={{
                        borderCollapse: "collapse",
                        marginTop: 15,
                        color: "black",
                    }}
                    align="center"
                    cellPadding="5px"
                >
                    <tbody>
                        <tr style={{ border: "1px solid black" }}>
                            <td colSpan={4}>
                                Institute Address
                            </td>
                        </tr>
                        <tr style={{ border: "1px solid black" }}>
                            <th style={{ border: "1px solid black" }}>
                                Institute Entity State
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Institute Entity District
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Institute Entity Sub District
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Institute Entity Town/City
                            </th>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black" }}>
                                {info?.comp_postal_addres_of_inst?.state_detail?.stateNameEnglish}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {info?.comp_postal_addres_of_inst?.district_detail?.districtNameEnglish}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {info?.comp_postal_addres_of_inst?.sub_district?.subdistrictNameEnglish}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                --
                            </td>
                        </tr>

                        <tr style={{ border: "1px solid black" }}>
                            <th style={{ border: "1px solid black" }}>
                                Institute Entity Village
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Institute Entity Pincode
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Institute Entity Plot Number/Khasara Number/Gata Number
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Institute Entity Landmark
                            </th>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black" }}>
                                {info?.comp_postal_addres_of_inst?.village?.villageNameEnglish}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {info?.comp_postal_addres_of_inst?.pincode}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {
                                    info?.comp_postal_addres_of_inst?.plotNumber_khasaraNumber
                                }
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {info?.comp_postal_addres_of_inst?.landmark}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Col>
        </Row>
    );
};