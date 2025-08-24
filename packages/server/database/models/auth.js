/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import fs from "fs";
import mysql from "mysql2/promise";
import { pKeyPath } from "../../common/common.js";
import { masterConfig, eMsg, dbConfig } from "../db.js";
const privateKey = fs.readFileSync(pKeyPath, "utf8");

export const checkUser = async (req) => {
  const { email=1111, password=11 } = req.body;

  let connection;
  try {
    console.log(dbConfig);
    const pool = mysql.createPool(dbConfig);
    connection = await pool.getConnection();

    await connection.beginTransaction();

    // Prepare the SQL statement
    const stmt = await connection.prepare("SELECT * FROM `users` WHERE `email` = ? AND `password` = ?");

    // Execute the prepared statement
    const results = await stmt.execute([email, password]);

    // Optional: Close the prepared statement
    await stmt.close();

    if (!results || results.length === 0) {
      throw { ...eMsg, msg: "User Not Found" };
    }

    const token = jwt.sign({ email, password }, privateKey, {
      expiresIn: "1d",
      algorithm: "RS256",
    });

    await connection.commit();

    return {
      status: true,
      msg: "User Successfully Logged In",
      token,
    };

  } catch (err) {
    console.error("Error in checkUser:", err);
    if (connection) {
      await connection.rollback();
    }
    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const checkUser2 = async  (req) => {
  const { userid, password } = req.body;
  try {
    
    await db.transaction(async (trx) => {

      const users = await trx("users")
        .where("status", "active")
        .select("id", "name", "email");

      console.log("Active users:", users);

      // You can continue using trx for other queries like inserts/updates
    });
  } catch (err) {
    console.error("Transaction failed:", err.message);
  } finally {
        console.error("Conn Destroy:");
    db.destroy(); // optional if used in script file
  }
};
