import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
export const ViewEntityDetails = ({ info }) => {
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
                        <tr>
                            <td colSpan={7} style={{ border: "1px solid black" }}>
                                <b>Affiliation Category</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ colSpan: 2 }}>
                                <b>Category:</b> &nbsp; <u><span>{info?.entity?.category_info?.cat_name}</span></u>
                            </td>
                            <td>
                                <b>Sub Category:</b>&nbsp;
                                <span>{info?.entity?.sub_cat_info?.cat_name ? info?.entity?.sub_cat_info?.cat_name : 'NIL'}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

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
                        <tr>
                            <td colSpan={7} style={{ border: "1px solid black" }}>
                                <b>Applicant Entity Details</b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ colSpan: 2 }}>
                                <b>Category of Applicant Entity:</b> &nbsp; <span>{info?.entity?.category}</span>
                            </td>
                            <td>
                                <b>Name of Applicant Entity:</b> &nbsp; <span>{info?.entity?.name_of_applicant_entity}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                        <tr>
                            <td colSpan={7} style={{ border: "1px solid black" }}>
                                <b>Address of Applicant Entity</b>
                            </td>
                        </tr>
                        <tr style={{ border: "1px solid black" }}>
                            <th style={{ border: "1px solid black" }}>
                                Applicant Entity State
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Applicant Entity District
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Applicant Entity Sub District
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Applicant Entity Town/City
                            </th>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black" }}>
                                {info?.entity?.ent_address?.state_detail?.stateNameEnglish}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {info?.entity?.ent_address?.district_detail?.districtNameEnglish}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {info?.entity?.ent_address?.sub_district?.subdistrictNameEnglish}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                --
                            </td>
                        </tr>

                        <tr style={{ border: "1px solid black" }}>
                            <th style={{ border: "1px solid black" }}>
                                Applicant Entity Village
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Applicant Entity Pincode
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Applicant Entity Plot Number/Khasara Number/Gata Number
                            </th>
                            <th style={{ border: "1px solid black" }}>
                                Applicant Entity Landmark
                            </th>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black" }}>
                                {info?.entity?.ent_address?.village?.villageNameEnglish}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {info?.entity?.ent_address?.pincode}
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {
                                    info?.entity?.ent_address?.plotNumber_khasaraNumber_gataNumber
                                }
                            </td>
                            <td style={{ border: "1px solid black" }}>
                                {info?.entity?.ent_address?.landmark}
                            </td>
                        </tr>

                        <tr style={{ border: "1px solid black" }}>
                            <th style={{ border: "1px solid black" }} colSpan={2}>
                                Applicant Entity Email Id
                            </th>
                            <th style={{ border: "1px solid black" }} colSpan={2}>
                                Applicant Contact Number
                            </th>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black" }} colSpan={2}>
                                {info?.entity?.ApplicantEntityEmailId}
                            </td>
                            <td style={{ border: "1px solid black" }} colSpan={2}>
                                {info?.entity?.ApplicantContactNumber}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {info?.entity?.Is_the_applicant_running_any_other_iti ===
                    "yes" && (
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
                                <tr>
                                    <td colSpan={7} style={{ border: "1px solid black" }}>
                                        <b>Running Other ITI Information</b>
                                    </td>
                                </tr>
                                <tr style={{ border: "1px solid black" }}>
                                    <td>
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
                                                {info?.otherITIs.map((item, index) => {
                                                    console.log(item, index);
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td
                                                                    width={"1%"}
                                                                    rowSpan={8}
                                                                    style={{ border: "1px solid black" }}
                                                                >
                                                                    <b>{index + 1}</b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={7} style={{ border: "1px solid black" }}>
                                                                    <b>Running ITI Info</b>
                                                                </td>
                                                            </tr>
                                                            <tr style={{ border: "1px solid black" }}>
                                                                <th style={{ border: "1px solid black" }}>
                                                                    Affiliation Number
                                                                </th>
                                                                <th style={{ border: "1px solid black" }}>
                                                                    ITI Name
                                                                </th>
                                                                <th style={{ border: "1px solid black" }}>
                                                                    MIS Code
                                                                </th>
                                                                <th style={{ border: "1px solid black" }}>State</th>
                                                                <th style={{ border: "1px solid black" }}>
                                                                    District
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ border: "1px solid black" }}>--</td>
                                                                <td style={{ border: "1px solid black" }}>{item?.run_ITIName}</td>
                                                                <td style={{ border: "1px solid black" }}>{item?.run_MISCode}</td>
                                                                <td style={{ border: "1px solid black" }}>{item?.state_detail?.stateNameEnglish}</td>
                                                                <td style={{ border: "1px solid black" }}>{item?.district_detail?.districtNameEnglish}</td>
                                                            </tr>
                                                            <tr style={{ border: "1px solid black" }}>
                                                                <th style={{ border: "1px solid black" }}>
                                                                    Sub District
                                                                </th>
                                                                <th style={{ border: "1px solid black" }}>
                                                                    Village
                                                                </th>
                                                                <th style={{ border: "1px solid black" }}>Town/City</th>
                                                                <th style={{ border: "1px solid black" }}>
                                                                    Pincode
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ border: "1px solid black" }}>--</td>
                                                                <td style={{ border: "1px solid black" }}>--</td>
                                                                <td style={{ border: "1px solid black" }}>--</td>
                                                                <td style={{ border: "1px solid black" }}>{item?.run_Pincode}</td>
                                                            </tr>
                                                            <tr style={{ border: "1px solid black" }}>
                                                                <th style={{ border: "1px solid black" }} colSpan={2}>
                                                                    Plot Number/Khasara Number
                                                                </th>
                                                                <th style={{ border: "1px solid black" }} colSpan={2}>
                                                                    Landmark
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ border: "1px solid black" }} colSpan={2}>
                                                                    {item.run_PlotNumber_KhasaraNumber}
                                                                </td>
                                                                <td style={{ border: "1px solid black" }} colSpan={2}>
                                                                    {item.run_Landmark}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
            </Col>
        </Row>
    );
};
export default ViewEntityDetails;
