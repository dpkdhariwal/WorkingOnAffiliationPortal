
import { initDB } from "../../../db";
import * as C from "../../../../constants";



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