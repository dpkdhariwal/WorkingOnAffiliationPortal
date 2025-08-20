
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

