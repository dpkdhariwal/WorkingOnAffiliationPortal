import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";
import { Row, Col, Card, Form, Form as BootstrapForm, InputGroup, Button, Modal, Table, Accordion } from "react-bootstrap";
export const FunctionRegistryContext = createContext(null);
export const useFunctionRegistry = () => useContext(FunctionRegistryContext);
import * as C from "affserver";
import Swal from "sweetalert2";
import * as gen from "@/services/general/index";

export const TradeUnits = ({ appId }) => {
    const [tradeList, setTradeList] = useState([]);
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

            let resp = await gen.getDetails(appId);
            // console.log(resp.data?.new_insti_trade_list);
            setTradeList(resp.data?.new_insti_trade_list || []); // fallback to []
            Swal.close();

        } catch (error) {
            console.error(error);
            Swal.close();
            console.error("Error fetching entity details:", error);
            Swal.fire("Error", "Failed to fetch data.", "error");
        }
    };
    useEffect(() => { getInfo() }, [appId]);

    return (
        <>
            <div
                style={{
                    backgroundColor: "rgb(245, 245, 245)",
                    margin: "10px 0px 0px",
                    borderRadius: 6,
                    borderStyle: "dashed",
                    borderWidth: "thin",
                    padding: "10px",
                }}
            >
                <table
                    width="98%"
                    border={1}
                    style={{ borderCollapse: "collapse", marginTop: 15, color: 'black' }}
                    align="center"
                    cellPadding="5px"
                >
                    <tbody>
                        <tr>
                            <th colSpan={4} style={{ border: "1px solid black" }}>Details of Trade(s)/Unit(s) for Affiliation</th>
                        </tr>
                        <tr>
                            <th style={{ border: "1px solid black" }}>Trade </th>
                            <th style={{ border: "1px solid black" }}>Unit in Shift 1</th>
                            <th style={{ border: "1px solid black" }}>Unit in Shift 2</th>
                            {/* <th style={{ border: "1px solid black" }}>Unit in Shift 3</th> */}
                        </tr>
                        {tradeList.map((trade, idx) => {

                            return (
                                <tr key={idx}>
                                    <td style={{ border: "1px solid black" }}>{trade.trade_name}</td>
                                    <td style={{ border: "1px solid black" }}>{trade.unit_in_shift1}</td>
                                    <td style={{ border: "1px solid black" }}>{trade.unit_in_shift2}</td>
                                    {/* <td style={{ border: "1px solid black" }}>{trade.unit_in_shift3}</td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default TradeUnits;