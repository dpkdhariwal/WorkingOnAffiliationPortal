import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pageheader from "@/layouts/Pageheader";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import * as ap from "@/services/applicant/index";
import { ViewEntityDetails } from "@/screens/common_screens/StageI/ApplicationView/component/EntityDetails";
import { AddressOfInstitute } from "@/screens/common_screens/StageI/ApplicationView/component/proposedIntitute/AddressOfInstitute";
import { InstituteLocation } from "@/screens/common_screens/StageI/ApplicationView/component/proposedIntitute/InstituteLocation";
import { NameOfTheInstitute } from "@/screens/common_screens/StageI/ApplicationView/component/proposedIntitute/NameOfTheInstitute";
import { TradeInfo } from "@/screens/common_screens/StageI/ApplicationView/component/tradeInfo";

import { LandDetails } from "@/screens/common_screens/StageI/ApplicationView/component/landDetails/landDetails";


import { ApplicationDetails } from "@/screens/common_screens/StageI/ApplicationView/component/ApplicationDetails";



const ViewApplicationStageOne = () => {
  const reg = useSelector((state) => state.reg);
  const [info, setInfo] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appId = queryParams.get("appId");
  const entInfo = {};

  const loadData = async () => {
    let resp, result;
    try {
      Swal.fire({ title: "Loading...", text: "Please wait while we Loading your Appliation Data.", allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
      let resp = await ap.getStage1ApplicationInfo(appId);
      Swal.close();
      result = resp.data;
      setInfo(result);
      console.log(result);
    } catch (error) {
      console.error("Error while saving:", error);
      Swal.close(); // close loading in case it’s still open
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to save verification remarks."
      });
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);



  return (
    <Fragment>
      <Pageheader
        mainheading={`View Application Stage-I`}
        parentfolder="Dashboard"
        activepage="View Application Stage-I"
      />
      <Card className="card custom-card card">
        {/* <Card className="border border-2 border-success  card custom-card shadow-size-small shadow-success card"> */}
        <Card.Header>
          <label className="main-content-label my-auto" style={{ textTransform: "none" }} >
            Application View ({info?.entity?.appId})
          </label>
          {/* <div className="ms-auto d-flex">
            <Button
              size="sm"
              type="button"
              className="rounded-pill"
              variant="success"
            >
              View Time Line
            </Button>
          </div> */}
        </Card.Header>
        <Card.Body>
          {/* Application Details */}
          <ApplicationDetails />
          <hr />

          {/* Entity Details */}
          <ViewEntityDetails info={info} />
          <hr />

          {/* Proposed Institute Details */}
          <AddressOfInstitute info={info} />
          <InstituteLocation info={info} />
          <NameOfTheInstitute info={info} />
          <hr />

          {/* Trade Information */}
          <TradeInfo info={info} />
          <hr />

          {/* Land Details */}
          <LandDetails />

        </Card.Body>
        {/* <Card.Footer style={{ padding: "2px" }} className="d-flex justify-content-between">
                            <Button variant="primary" onClick={submitForm}>
                              Submit
                            </Button>
                          </Card.Footer> */}
      </Card>


    </Fragment>
  );
};

export default ViewApplicationStageOne;
