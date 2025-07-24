// db.js
import { openDB } from "idb";

import { DB_NAME, USERS, USER_ROLES, APPLIST } from "../constants";

export const initDB = async () => {
  return await openDB(DB_NAME, 12, {
    upgrade(db) {
      console.log(db);
      if (!db.objectStoreNames.contains(USERS)) {
        const userStore = db.createObjectStore(USERS, { keyPath: "id" });
        userStore.createIndex("email", "email", { unique: true }); // optional unique index
        userStore.createIndex("email_password", ["email", "password"]); // compound index
      }
      if (!db.objectStoreNames.contains(USER_ROLES)) {
        db.createObjectStore(USER_ROLES, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(APPLIST)) {
        db.createObjectStore(APPLIST, { keyPath: "id" });
      }

    },
  });
};