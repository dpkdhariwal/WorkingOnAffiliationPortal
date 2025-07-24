// db.js
import { openDB } from "idb";

import { DB_NAME, APPLIST } from "../constants";

import {initDB} from "./db";


export const addNewApp = async (app) => {
  console.log(app);
  const db = await initDB();
  await db.put(APPLIST, app);
};

export const getAllApps = async () => {
  const db = await initDB();
  return await db.getAll(APPLIST);
};

export const removeApp = async (id) => {
  const db = await initDB();
  await db.delete(APPLIST, id);
};
