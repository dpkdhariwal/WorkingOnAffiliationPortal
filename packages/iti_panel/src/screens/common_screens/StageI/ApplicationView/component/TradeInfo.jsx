export const TradeInfo = ({ info }) => {

    return (
        <>
            <div >
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
                        {info?.tradeList?.map((trade, idx) => {

                            return (
                                <tr key={idx}>
                                    <td style={{ border: "1px solid black" }}>{trade?.tradeInfo?.trade_name}</td>
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