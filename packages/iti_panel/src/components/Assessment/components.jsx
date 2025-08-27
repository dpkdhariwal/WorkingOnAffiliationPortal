import { Row, Col, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";
import * as set from "../../db/forms/stageI/set/set";
import { useLocation } from "react-router-dom";
import React, { createContext, useRef, useContext, Fragment, useState, useEffect } from "react";

export const Navigations = ({ nav, onPrev, onNext, onLast }) => {
    console.log(onPrev);
    return (<>
        <div className={`d-flex justify-content-${nav?.currentIndex > 0 ? `between` : `end`} mb-3`} style={{ backgroundColor: "rgb(245, 245, 245)", margin: "10px 0px 0px", borderRadius: 6, borderStyle: "dashed", borderWidth: "thin", padding: "10px", }} >

            {nav?.currentIndex > 0 && (<div className="p-2">
                <Button variant="warning" onClick={() => (onPrev ? onPrev() : nav?.previous())}> Previous </Button>
            </div>)}

            {nav?.lastIndex == nav?.currentIndex ? (<div className="p-2">
                <Button variant="success" onClick={() => (onLast ? onLast() : nav?.finish())}  > Finish </Button>
            </div>) : nav?.currentIndex < nav?.lastIndex ? (<Button variant="success" onClick={() => (onNext ? onNext() : nav?.next())} > Save & Next </Button>) : ''}
        </div>
    </>);
}


export const AsessementIActions = ({ nav, onPrev, onNext, onLast, finishBtn=null }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("appId");
    const [info, setInfo] = useState({});

    // Loading Review Details
    const loadInfo = async () => {
        let result = await set.getAssessmentProgressStatus(appId);
        console.log(result);
        setInfo(result);
    }

    useEffect(() => {
        loadInfo();
    }, [])

    useEffect(() => {
        console.log(info);
    }, [info])


    return (<>
        <div className={`d-flex justify-content-${nav?.currentIndex > 0 ? `between` : `end`} mb-3`} style={{ backgroundColor: "rgb(245, 245, 245)", margin: "10px 0px 0px", borderRadius: 6, borderStyle: "dashed", borderWidth: "thin", padding: "10px", }} >

            {nav?.currentIndex > 0 && (<div className="p-2">
                <Button variant="warning" onClick={() => (onPrev ? onPrev() : nav?.previous())}> Previous </Button>
            </div>)}


            {info?.allCompleted ?
                (nav?.lastIndex == nav?.currentIndex ? (
                    <div className="p-2">
                        {finishBtn? (finishBtn): (<Button variant="success" onClick={() => (onLast ? onLast() : nav?.finish())}  > Finish </Button>)}
                        

                    </div>) : nav?.currentIndex < nav?.lastIndex ? (<Button variant="success" onClick={() => (onNext ? onNext() : nav?.next())} > Save & Next </Button>) : '') : ''}
            {/* is all reviewed true/false */}
            {/* is all verified -> true/false  */}
        </div>
    </>);
}