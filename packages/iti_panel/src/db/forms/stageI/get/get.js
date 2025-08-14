
import { initDB } from "../../../db";
import * as C from "../../../../constants";



export const getAppFlowByStep = async (appId, step) => {
    const db = await initDB();
    try {
        const tx = db.transaction([C.APP_FLOW], 'readwrite');
        const store = tx.objectStore(C.APP_FLOW);
        let d1 = await store.index('appId_step').get([appId, step]);
        await tx.done;
        return d1;
    } catch (error) {
        console.log(error);
        return {}
    }
};


export const getStageIFeeInfo = async (appId) => {
    const db = await initDB();
    try {
        const tx = db.transaction([C.PROPOSED_INSTI_DETAILS], 'readwrite');
        const store = tx.objectStore(C.PROPOSED_INSTI_DETAILS);
        let d1 = await store.index('appId').get(appId);
        await tx.done;
        return d1;
    } catch (error) {
        console.log(error);
        return {}
    }
}


export const getStageIFormFlow = async (appId) => {
    const db = await initDB();
    try {
        const tx = db.transaction([C.APP_FORM_FLOW_STAGE_I], 'readwrite');
        const store = tx.objectStore(C.APP_FORM_FLOW_STAGE_I);
        let list = await store.index('appId').getAll(appId);

        list = await Promise.all(list.map(async (step) => {

            console.log(step);
            return step;
            // switch (step.step) {
            //     case cons.ST1FC.APPLICANT_ENTITY_DETAILS.step:
            //         return { ...step, status: cons.FILLED };
            //     case cons.ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step:
            //         return { ...step, stepStatus: cons.ACTIVE };
            //     default:
            //         return step;
            // }
        }))
        console.log(list);

        await tx.done;
        return list;
    } catch (error) {
        console.log(error);
        return {}
    }
};

export const ASSESSMENT_STAGE_I_KEYS = {
    POSSESSION_OF_LAND: "POSSESSION_OF_LAND",
    LAND_DOCUMENTS: "LAND_DOCUMENTS",
    LAND_USE_LAND_CONVERSION_CERTIFICATE: "LAND_USE_LAND_CONVERSION_CERTIFICATE",
    LEASE_DEED_DOCUMENTS: "LEASE_DEED_DOCUMENTS",
    LAND_AREA: "LAND_AREA",
    ID_PROOF_OF_AUTHORIZED_SIGNATORY: "ID Proof of Authorized Signatory",
    REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION: "Registration Certificate of Applicant Organization",
    ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT: "ID Proof of Secretary/Chairperson/President",
    RESOLUTION_CERTIFICATE: "Resolution Certificate"
}

export const ASSESSMENT_STAGE_I_FLOW = [
    {
        stepNo: 1,
        step: C.ST1FC.APPLICANT_ENTITY_DETAILS.step,
        status: C.SL.COMPLETED, //SL.COMPLETED || SL.ON_PROGRESS
        stepLabel: C.ST1FC.APPLICANT_ENTITY_DETAILS.label,
        nextStep: C.ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step,
        stepStatus: C.ACTIVE, // ACTIVE || IN_ACTIVE
        DA: false,
    },
    {
        stepNo: 2,
        step: C.ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step,
        status: C.SL.COMPLETED, //SL.COMPLETED || SL.ON_PROGRESS
        stepLabel: C.ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.label,
        nextStep: C.ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step,
        stepStatus: C.ACTIVE, // ACTIVE || IN_ACTIVE
        DA: false,
    },
    {
        stepNo: 3,
        step: C.ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step,
        status: C.SL.COMPLETED, //SL.COMPLETED || SL.ON_PROGRESS
        stepLabel: C.ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.label,
        nextStep: C.ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step,
        stepStatus: C.ACTIVE, // ACTIVE || IN_ACTIVE
        DA: false,
    },
    {
        stepNo: 4,
        step: C.ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step,
        status: C.SL.ON_PROGRESS, //SL.COMPLETED || SL.ON_PROGRESS
        stepLabel: C.ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.label,
        nextStep: C.ST1FC.DOCUMENTS_UPLOAD.step,
        stepStatus: C.ACTIVE, // ACTIVE || IN_ACTIVE
        DA: true,
        VerificationList: [
            { check: ASSESSMENT_STAGE_I_KEYS.POSSESSION_OF_LAND, da_status: C.SL.VERIFIED },
            { check: ASSESSMENT_STAGE_I_KEYS.LAND_AREA, da_status: C.SL.VERIFIED }
        ]
    },
    {
        stepNo: 5,
        step: C.ST1FC.DOCUMENTS_UPLOAD.step,
        status: C.SL.ON_PROGRESS, //SL.COMPLETED || SL.ON_PROGRESS
        stepLabel: C.ST1FC.DOCUMENTS_UPLOAD.label,
        stepStatus: C.ACTIVE, // ACTIVE || IN_ACTIVE
        nextStep: C.ST1FC.REVIEW_ASSESSMENT.step,
        DA: true,
        VerificationList: [
            { check: ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY, da_status: C.SL.VERIFIED },
            { check: ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION, da_status: C.SL.VERIFIED },
            { check: ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT, da_status: C.SL.VERIFIED },
            { check: ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE, da_status: C.SL.VERIFIED },
        ]
    },
    {
        stepNo: 6,
        step: C.ST1FC.REVIEW_ASSESSMENT.step,
        status: C.SL.ON_PROGRESS, //SL.COMPLETED || SL.ON_PROGRESS
        stepLabel: C.ST1FC.REVIEW_ASSESSMENT.label,
        stepStatus: C.ACTIVE, // ACTIVE || IN_ACTIVE
        nextStep: C.LAST,
    },
];
window.ASSESSMENT_STAGE_I_FLOW = ASSESSMENT_STAGE_I_FLOW;

