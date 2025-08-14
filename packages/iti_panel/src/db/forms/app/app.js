
import { initDB } from "../../../db/db";
import * as C from "../../../constants";
import * as C2 from "../../../db/appList";
// All Gets
export const getAppFlowInfoByStep = async (appId, step) => {
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
}

export const setAppFlow = async (authUser, appId) => {
    const db = await initDB();
    try {
        const tx = db.transaction([C.APP_FLOW], 'readwrite');
        const appFlow = tx.objectStore(C.APP_FLOW);

        for (const [index, flow] of C.AppFlow.entries()) {
            const flowData = { ...flow, id: Date.now() + Math.random(), appId: appId, userId: authUser.id };
            await appFlow.put(C.APP_FLOW, flowData);
        }
        // await C2.set_stage_i_form_flow(authUser, appId);
        // await C2.set_stage_ii_form_flow(authUser, appId);
    } catch (error) {
        console.log(error);
    }
};


