import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
import * as C from "affserver";
import Swal from "sweetalert2";
import * as gen from "@/services/general/index";

export const DetailsOfTheProposedInstitute = ({ appId }) => {



    const [pinstInfo, setPinstInfo] = useState({});


    useEffect(() => {
        console.log(pinstInfo);
    }, [pinstInfo]);

    useEffect(() => {
        getInfo();
    }, [appId]);

    const getInfo = async () => {
        try {
            Swal.fire({
                title: "Loading...",
                text: "Please wait while we fetch the data.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            let resp2 = await gen.getProposedInstDetails(appId);
            setPinstInfo(resp2.data);
            Swal.close();
        } catch (error) {
            Swal.close();
            console.error("Error fetching entity details:", error);
            Swal.fire("Error", "Failed to fetch data.", "error");
        }
    };

    return (
        <>
            <Row
                style={{
                    backgroundColor: "rgb(245, 245, 245)",
                    margin: "10px 0px 0px",
                    borderRadius: 6,
                    borderStyle: "dashed",
                    borderWidth: "thin",
                    padding: "10px",
                }}
            >
                <Col xl={12} lg={12} md={12} sm={12}>
                    <table
                        width="98%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                    >
                        <tbody>
                            <tr>
                                <th style={{ border: "1px solid black" }}>Name of the Applicant Institute</th>
                                <th style={{ border: "1px solid black" }}>Type of Institute</th>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.name_of_applicant_institute}</td>
                                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.type_of_institute}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>

            <div style={{
                backgroundColor: "rgb(245, 245, 245)",
                margin: "10px 0px 0px",
                borderRadius: 6,
                borderStyle: "dashed",
                borderWidth: "thin",
                padding: "10px",
            }}>

                <h5>Complete Postal Address of the Applicant Institute
                </h5>

                <Row
                    style={{
                        backgroundColor: "rgb(245, 245, 245)",
                        margin: "10px 0px 0px",
                        borderRadius: 6,
                        // borderStyle: "dashed",
                        borderWidth: "thin",
                        // padding: "10px",
                    }}
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
                                        {pinstInfo?.comp_postal_addres_of_inst?.state_detail?.stateNameEnglish}
                                    </td>
                                    <td style={{ border: "1px solid black" }}>
                                        {pinstInfo?.comp_postal_addres_of_inst?.district_detail?.districtNameEnglish}
                                    </td>
                                    <td style={{ border: "1px solid black" }}>
                                        {pinstInfo?.comp_postal_addres_of_inst?.sub_district?.subdistrictNameEnglish}
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
                                        {pinstInfo?.comp_postal_addres_of_inst?.village?.villageNameEnglish}
                                    </td>
                                    <td style={{ border: "1px solid black" }}>
                                        {pinstInfo?.comp_postal_addres_of_inst?.pincode}
                                    </td>
                                    <td style={{ border: "1px solid black" }}>
                                        {
                                            pinstInfo?.comp_postal_addres_of_inst?.plotNumber_khasaraNumber
                                        }
                                    </td>
                                    <td style={{ border: "1px solid black" }}>
                                        {pinstInfo?.comp_postal_addres_of_inst?.landmark}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>



            <div>
                <div style={{
                    backgroundColor: "rgb(245, 245, 245)",
                    margin: "10px 0px 0px",
                    borderRadius: 6,
                    borderStyle: "dashed",
                    borderWidth: "thin",
                    padding: "10px",
                }}>
                    <h5>Institute Location</h5>

                    <table
                        width="98%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                    >
                        <tbody>
                            <tr>
                                <th style={{ border: "1px solid black" }}>Type of Institute</th>
                            </tr>
                            <tr>
                                <td style={{ border: "1px solid black" }}>{pinstInfo?.institute_location}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table
                        width="98%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                    >
                        <tbody>
                            <tr>
                                <th style={{ border: "1px solid black" }}>Falls Under Hill Area/Hill?</th>
                                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.is_falls_under_hill_area_hill}</td>
                            </tr>
                            {pinstInfo?.pInstDetail?.is_falls_under_hill_area_hill == "yes" && (<tr>
                                <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
                                <td style={{ border: "1px solid black" }}>
                                    <Button type="link" href={`${pinstInfo?.pInstDetail?.Falls_Under_Hill_Area_Hill__Supporting_Doc}`}>View</Button></td>
                            </tr>)}

                        </tbody>
                    </table>

                    <table
                        width="98%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                    >
                        <tbody>
                            <tr>
                                <th style={{ border: "1px solid black" }}>Falls Under Border District</th>
                                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.is_falls_under_border_district}</td>
                            </tr>
                            {pinstInfo?.proposed_insti_details?.is_falls_under_border_district == "yes" && (<tr>
                                <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
                                <td style={{ border: "1px solid black" }}><Button type="link" href={`${pinstInfo?.pInstDetail?.Falls_Under_Border_District__Supporting_Doc}`}>View</Button></td>
                            </tr>)}
                        </tbody>
                    </table>



                </div>
                <div style={{
                    backgroundColor: "rgb(245, 245, 245)",
                    margin: "10px 0px 0px",
                    borderRadius: 6,
                    borderStyle: "dashed",
                    borderWidth: "thin",
                    padding: "10px",
                }}>
                    <table
                        width="98%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                    >
                        <tbody>
                            <tr>
                                <th style={{ border: "1px solid black" }}>Whether Applying Under Mini Skill Training Institute (MSTI) Category</th>
                                <th style={{ border: "1px solid black" }}>Whether the Institute Is Exclusive for Women Trainees?</th>


                            </tr>
                            <tr>
                                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.under_msti_category}</td>
                                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.Whether_the_institute_is_exclusive_for_women_trainees}</td>

                            </tr>

                        </tbody>
                    </table>
                </div>

                <div style={{
                    backgroundColor: "rgb(245, 245, 245)",
                    margin: "10px 0px 0px",
                    borderRadius: 6,
                    borderStyle: "dashed",
                    borderWidth: "thin",
                    padding: "10px",
                }}>
                    <h5>Coordinates of institute</h5>
                    <table
                        width="98%"
                        border={1}
                        style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                        align="center"
                        cellPadding="5px"
                    >
                        <tbody>
                            <tr>
                                <th style={{ border: "1px solid black" }}>Latitude</th>
                                <th style={{ border: "1px solid black" }}>Longitude</th>


                            </tr>
                            <tr>
                                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.latitude}</td>
                                <td style={{ border: "1px solid black" }}>{pinstInfo?.pInstDetail?.Longitude}</td>

                            </tr>

                        </tbody>
                    </table>

                </div>

            </div>
        </>
    );
};
export default DetailsOfTheProposedInstitute;