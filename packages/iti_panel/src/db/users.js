// db.js
import { openDB } from "idb";

import { DB_NAME, USERS, SAMPLE_USERS, USER_ROLES, APPLIST } from "../constants";
import {initDB} from "./db";


export const addNewUser = async (app) => {
  console.log(app);
  const db = await initDB();
  await db.put(USERS, app);
};

export const getUserById = async (id) => {
  const db = await initDB();
  return await db.get(USERS, id);
};

export const getAllUsers = async () => {
  const db = await initDB();
  return await db.getAll(USERS);
};

export const getUserByCredentials = async (email, password) => {
  const db = await initDB();
  const index = db.transaction(USERS).store.index("email_password");
  return await index.get([email, password]);
};

export const removeUser = async (id) => {
  const db = await initDB();
  await db.delete(USERS, id);
};

// Extra
export const setSampleUser = async () => {
  const db = await initDB();
  SAMPLE_USERS.forEach(async (user) => {
    const userId = Date.now() + Math.random();
    const obj = { ...user, id: userId }; // Ensure unique ID
    await db.put(USERS, obj);
  });
};

// Extra
export const getSetUserRoles = async () => {
  const db = await initDB();
  const userList = await db.getAll(USERS);

  userList.forEach(async (user) => {
    for (const role of user.role) {
      const id = Date.now() + Math.random();
      await db.put(USER_ROLES, { id: id, userid: user.id, role: role });
    }
  });
};
