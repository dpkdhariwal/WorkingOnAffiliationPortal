import { VITE_VIEW_FILE_URL } from "@/services/config";
import { Fragment, useState, useRef, useEffect } from "react";
import { Row, Col, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";



export const InstituteLocation = ({ info }) => {
  return (
    <>
      <div style={{
        // backgroundColor: "rgb(245, 245, 245)",
        // margin: "10px 0px 0px",
        marginTop:"5px",
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
              <td style={{ border: "1px solid black" }}>{info?.pInstDetail?.institute_location}</td>
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
              <td style={{ border: "1px solid black" }}>{info?.pInstDetail?.is_falls_under_hill_area_hill}</td>
            </tr>
            {info?.pInstDetail?.is_falls_under_hill_area_hill == "yes" && (
              <tr>
                <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
                <td style={{ border: "1px solid black" }}>
                  <Button type="link"  target="_blank"
  rel="noopener noreferrer" href={`${VITE_VIEW_FILE_URL}/${info?.pInstDetail?.Falls_Under_Hill_Area_Hill__Supporting_Doc}`}>View Document</Button></td>
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
              <td style={{ border: "1px solid black" }}>{info?.pInstDetail?.is_falls_under_border_district}</td>
            </tr>
            {info?.pInstDetail?.is_falls_under_border_district == "yes" && (<tr>
              <td style={{ border: "1px solid black" }}>Supporting Government Notification/Order/Circular</td>
              <td style={{ border: "1px solid black" }}><Button type="link"  target="_blank"
  rel="noopener noreferrer" href={`${VITE_VIEW_FILE_URL}/${info?.pInstDetail?.Falls_Under_Border_District__Supporting_Doc}`}>View Document</Button></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div>
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
              <td style={{ border: "1px solid black" }}>{info?.pInstDetail?.under_msti_category}</td>
              <td style={{ border: "1px solid black" }}>{info?.pInstDetail?.Whether_the_institute_is_exclusive_for_women_trainees}</td>

            </tr>

          </tbody>
        </table>
      </div>

      <div style={{
        // backgroundColor: "rgb(245, 245, 245)",
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
              <td style={{ border: "1px solid black" }}>{info?.pInstDetail?.latitude}</td>
              <td style={{ border: "1px solid black" }}>{info?.pInstDetail?.Longitude}</td>
            </tr>
          </tbody>
        </table>

      </div>





    </>
  );
};