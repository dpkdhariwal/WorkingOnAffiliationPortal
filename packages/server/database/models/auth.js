/* eslint-disable no-undef */
import { getConnection, masterConfig, eMsg } from "../db.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import { pKeyPath } from "../../common/common.js";
const privateKey = fs.readFileSync(pKeyPath, "utf8");

import { createPoolCluster } from "mysql";
import { rejects } from "assert";
import { initDB } from "../../dbMockup/db.js";

export const checkUser = (req) => {
  const { userid, password } = req.body;

  // return new Promise(async (resolve, reject) => {

  //   const db = await initDB()

  //   console.log(db)               // Should show the loaded data
  //   console.log(db.data.users)    // Should show the users array

  //   const user = db.data.users.find((u) => u.email === userid);
  //   console.log(user);
  //   resolve(user);
  // });

  try {
    const { email, password } = req.body;
    return new Promise(async (resolve, reject) => {
      const poolCluster = createPoolCluster();
      // Add a named configuration to the pool
      poolCluster.add("MASTER", masterConfig);
      const connection = await getConnection(poolCluster, "MASTER").catch(
        (err) => {
          reject(err);
        }
      );
      // resolve(`Connection obtained: ${connection.threadId}`);

      // Quarying Start
      connection.beginTransaction(async (err) => {
        if (err) {
          reject(err);
        }
        await connection.query(
          "SELECT * FROM `users` WHERE `email` = ? AND  `password` = ?",
          [email, password],
          function (error, results) {
            if (error || results.length == 0) {
              error == null
                ? reject({ ...eMsg, ...{ msg: "Your Not Found" } })
                : error;
            }

            const token = jwt.sign(
              { email: email, password: password },
              privateKey,
              {
                expiresIn: "1d",
                algorithm: "RS256",
              }
            );
            let obj = { status: true, msg: "User Successfully Logged In" };
            obj.token = token;
            resolve(obj);
          }
        );

        // Quarying End

        // When done with the connection
        connection.release();
        // Properly close the pool cluster
        poolCluster.end((err) => {
          if (err) {
            reject("Error closing the connection pool cluster:");
          }
          console.log("Connection pool cluster was closed.");
        });
      });
    });
  } catch (error) {
    return "fafadf";
  }
};
