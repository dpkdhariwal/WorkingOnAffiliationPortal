// db.js
import { openDB } from "idb";

import {
  DB_NAME,
  DB_VERSION,
  USERS,
  USER_ROLES,
  APPLIST,
  ENTITY_DETAILS,
  ENTITY_ADDRESS,
  OTHER_ITI,
  PROPOSED_INSTI_DETAILS,
  PROPOSED_INSTI_ADDRESSES,
  NEW_INSTI_TRADE_LIST,
  LAND_INST_DETAILS,
  LAND_OWNED_LANDS_DETAILS,
  LAND_LEASED_LANDS_DETAILS,
  APP_FLOW,
  BLD_BUILDING_PLAN,
  APP_FORM_FLOW_STAGE_II,
  APP_FORM_SUB_CIVIL_INFRA,
  BLD_BCC,
  BLD_PHOTOS,
  TRADEWISE_WORKSHOP,
  TRADEWISE_CLASSROOMS,
  COMMON_CIVIL_INFRASTRUCTURE
} from "../constants";
import * as cons from "../constants";

export const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(USERS)) {
        const userStore = db.createObjectStore(USERS, { keyPath: "id" });
        userStore.createIndex("email", "email", { unique: true }); // optional unique index
        userStore.createIndex("email_password", ["email", "password"]); // compound index
      }

      if (!db.objectStoreNames.contains(USER_ROLES)) {
        db.createObjectStore(USER_ROLES, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(APPLIST)) {
        const userStore = db.createObjectStore(APPLIST, { keyPath: "id" });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("appId", "appId", { unique: false });
      } else {
        // const appStore = db.transaction.objectStore(APPLIST); // ✅ this is valid ONLY in upgrade
        // if (!appStore.indexNames.contains("userId")) {
        //   appStore.createIndex("userId", "userId", { unique: false });
        // }
      }

      if (!db.objectStoreNames.contains(ENTITY_DETAILS)) {
        const userStore = db.createObjectStore(ENTITY_DETAILS, { keyPath: "id", });
        userStore.createIndex("appId", "appId", { unique: true });
        userStore.createIndex("userId", "userId", { unique: false });
      }
      if (!db.objectStoreNames.contains(ENTITY_ADDRESS)) {
        const userStore = db.createObjectStore(ENTITY_ADDRESS, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: true });
      }
      if (!db.objectStoreNames.contains(OTHER_ITI)) {
        const userStore = db.createObjectStore(OTHER_ITI, { keyPath: "id" });
        userStore.createIndex("appId", "appId", { unique: true });
      }

      if (!db.objectStoreNames.contains(PROPOSED_INSTI_DETAILS)) {
        const userStore = db.createObjectStore(PROPOSED_INSTI_DETAILS, { keyPath: "id", });
        userStore.createIndex("appId", "appId", { unique: true });
        userStore.createIndex("appId_userId", ["appId", "userId"]); // compound index
      }
      if (!db.objectStoreNames.contains(PROPOSED_INSTI_ADDRESSES)) {
        const userStore = db.createObjectStore(PROPOSED_INSTI_ADDRESSES, { keyPath: "id", });
        userStore.createIndex("appId", "appId", { unique: true });
      }

      if (!db.objectStoreNames.contains(NEW_INSTI_TRADE_LIST)) {
        const userStore = db.createObjectStore(NEW_INSTI_TRADE_LIST, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
      }

      if (!db.objectStoreNames.contains(LAND_INST_DETAILS)) {
        const userStore = db.createObjectStore(LAND_INST_DETAILS, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
      }
      if (!db.objectStoreNames.contains(LAND_OWNED_LANDS_DETAILS)) {
        const userStore = db.createObjectStore(LAND_OWNED_LANDS_DETAILS, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
      }
      if (!db.objectStoreNames.contains(LAND_LEASED_LANDS_DETAILS)) {
        const userStore = db.createObjectStore(LAND_LEASED_LANDS_DETAILS, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
      }

      if (!db.objectStoreNames.contains(APP_FLOW)) {
        const userStore = db.createObjectStore(APP_FLOW, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("appId_step", ["appId", "step"]); // compound index
      }

      if (!db.objectStoreNames.contains(cons.APP_FORM_FLOW_STAGE_I)) {
        const userStore = db.createObjectStore(cons.APP_FORM_FLOW_STAGE_I, { keyPath: "id", });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("appId_step", ["appId", "step"]); // compound index
      }

      if (!db.objectStoreNames.contains(APP_FORM_FLOW_STAGE_II)) {
        const userStore = db.createObjectStore(APP_FORM_FLOW_STAGE_II, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("appId_step", ["appId", "step"]); // compound index
      }

      if (!db.objectStoreNames.contains(BLD_BUILDING_PLAN)) {
        const userStore = db.createObjectStore(BLD_BUILDING_PLAN, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
      }

      if (!db.objectStoreNames.contains(BLD_BCC)) {
        const userStore = db.createObjectStore(BLD_BCC, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
      }
      if (!db.objectStoreNames.contains(BLD_PHOTOS)) {
        const userStore = db.createObjectStore(BLD_PHOTOS, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("photoView_appId", ["photoView", "appId"]);
      }

      if (!db.objectStoreNames.contains(APP_FORM_SUB_CIVIL_INFRA)) {
        const userStore = db.createObjectStore(APP_FORM_SUB_CIVIL_INFRA, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("appId_step", ["appId", "step"]);
      }


      if (!db.objectStoreNames.contains(TRADEWISE_WORKSHOP)) {
        const userStore = db.createObjectStore(TRADEWISE_WORKSHOP, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("workshop", "workshop", { unique: false });
        userStore.createIndex("tradeId_workshop_appId", ["tradeId", "workshop", "appId"]); // compound index
      }

      if (!db.objectStoreNames.contains(TRADEWISE_CLASSROOMS)) {
        const userStore = db.createObjectStore(TRADEWISE_CLASSROOMS, {
          keyPath: "id",
        });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("workshop", "workshop", { unique: false });
        userStore.createIndex("tradeId_classroom_appId", ["tradeId", "classroom", "appId"]); // compound index
      }


      if (!db.objectStoreNames.contains(COMMON_CIVIL_INFRASTRUCTURE)) {
        const userStore = db.createObjectStore(COMMON_CIVIL_INFRASTRUCTURE, { keyPath: "id", });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("particular", "particular", { unique: false });
        userStore.createIndex("appId_particular", ["appId", "particular"]); // compound index
      }

      if (!db.objectStoreNames.contains(cons.APP_ASSESSMENT_FLOW_STAGE_I)) {
        const userStore = db.createObjectStore(cons.APP_ASSESSMENT_FLOW_STAGE_I, { keyPath: "id", });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("step", "step", { unique: false });
        userStore.createIndex("appId_step", ["appId", "step"]); // compound index
      }

      if (!db.objectStoreNames.contains(cons.DA_LAND_DOCUMENTS)) {
        const userStore = db.createObjectStore(cons.DA_LAND_DOCUMENTS, { keyPath: "id", });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("key", "key", { unique: false });
        userStore.createIndex("appId_key", ["appId", "key"]);
        userStore.createIndex("appId_key_isDraft", ["appId", "key", "isDraft"]);
        userStore.createIndex("isDraft", "isDraft", { unique: false });
      }
      // else {
      //   db.deleteObjectStore(cons.DA_LAND_DOCUMENTS);
      // }

      if (!db.objectStoreNames.contains(cons.DA_STAGE_I_VERIFICATIONS)) {
        const userStore = db.createObjectStore(cons.DA_STAGE_I_VERIFICATIONS, { keyPath: "id", });
        userStore.createIndex("userId", "userId", { unique: false });
        userStore.createIndex("appId", "appId", { unique: false });
        userStore.createIndex("key", "key", { unique: false });
        userStore.createIndex("appId_key", ["appId", "key"]);
        userStore.createIndex("appId_key_isDraft", ["appId", "key", "isDraft"]);
        userStore.createIndex("isDraft", "isDraft", { unique: false });
      }

    },
  });
};

export const createIndexes = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(APPLIST)) {
        const appStore = db
          .transaction(APPLIST, "versionchange")
          .objectStore(APPLIST);

        if (!appStore.indexNames.contains("userId")) {
          appStore.createIndex("userId", "userId", { unique: false });
        }
      }
    },
  });
};



