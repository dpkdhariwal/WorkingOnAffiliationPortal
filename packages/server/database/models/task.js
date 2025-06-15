/* eslint-disable no-unused-vars */
import { Interface } from "readline";
import { conn, getConnection, eMsg, sMsg, masterConfig, resp } from "../db.js";

// constructor
export const task = function () {
    this.title = '';
    this.description = '';
    this.published = '';
};


import { dbConfig2 } from '../db.js';
import mysql from 'mysql';
import { createPoolCluster } from 'mysql';

export const getAllTask = (req, res) => {
    return new Promise(async (resolve, reject) => {
        const poolCluster = createPoolCluster();
        // Add a named configuration to the pool
        poolCluster.add('MASTER', masterConfig);
        const connection = await getConnection(poolCluster, 'MASTER').catch((err) => {
            reject(err);
        });
        // resolve(`Connection obtained: ${connection.threadId}`);

        // Quarying Start 
        connection.beginTransaction(async (err) => {
            if (err) {
                reject(err)
            }

            await connection.query('SELECT * FROM  tasklist', function (error, results) {
                if (error || results.length == 0) {
                    (error == null) ? reject({ ...eMsg, ...{ msg: 'Tasks Not Found' } }) : error;
                }
                resolve({ ...sMsg, ...{ data: results } });
            });
            // Quarying End 


            // When done with the connection
            connection.release();
            // Properly close the pool cluster
            poolCluster.end((err) => {
                if (err) {
                    reject('Error closing the connection pool cluster:');
                }
                console.log('Connection pool cluster was closed.');
            });

        });


    })
}

export const getTaskQuestion = (req, res) => {
    const { taskId } = req.body;
    return new Promise(async (resolve, reject) => {
        const poolCluster = createPoolCluster();
        // Add a named configuration to the pool
        poolCluster.add('MASTER', masterConfig);
        const connection = await getConnection(poolCluster, 'MASTER').catch((err) => {
            reject(err);
        });
        // resolve(`Connection obtained: ${connection.threadId}`);

        // Quarying Start 
        connection.beginTransaction(async (err) => {
            if (err) {
                reject(err)
            }
            // 1. Getting Task Information
            const deductQuery = `SELECT * FROM  tasklist WHERE task_Id = ? and taskStatus='In Progress' LIMIT 1`;
            connection.query(deductQuery, [taskId], (err, Task) => {
                if (err || Task.length == 0) {
                    (err == null) ? reject({ ...eMsg, ...{ msg: 'Tasks Not Found' } }) : err;
                }
                let resp = {};
                resp.taskInfo = Task[0]




                // 2. Getting All Questions
                const allQues = "SELECT taskquations_id, taskStatus FROM taskquations WHERE taskId = ?";
                connection.query(allQues, [taskId], (err, allQuesResult) => {
                    if (err || allQuesResult.length == 0) {
                        (err == null) ? reject({ ...eMsg, ...{ msg: 'Tasks Not Found' } }) : err;
                    }
                    resp.allQusInfo = { allQues: allQuesResult, totalQus: allQuesResult.length }

                    // 3. Getting Pending Question Info
                    const pendingQusQ = `SELECT * FROM (SELECT t1.*, t2.question,
                    t2.totalTime,
                    t2.graceTime,
                    t2.autoSubmit,
                    t2.metaInfo
                    FROM taskquations t1 inner join quations t2 on t1.question_Id=t2.question_Id) AS XYZ WHERE taskId = ?  AND taskStatus='pending'  `;
                    connection.query(pendingQusQ, [taskId], (err, pendingQusQResult) => {
                        if (err || pendingQusQResult.length == 0) {
                            (err == null) ? reject({ ...eMsg, ...{ msg: 'Tasks Not Found' } }) : err;
                        }
                        resp.quesInfo = pendingQusQResult[0];

                        resolve(resp)


                        // Quarying End 
                        // When done with the connection
                        connection.release();
                        // Properly close the pool cluster
                        poolCluster.end((err) => {
                            if (err) {
                                reject('Error closing the connection pool cluster:');
                            }
                            // console.log('Connection pool cluster was closed.');
                        });
                    });
                });
            })
        })
    });
}


export const rollback = (connection, reject, err) => {
    return connection.rollback(() => {
        reject(err);
        connection.release();
    });
}

export const getTaskInfo = (req, res) => {
    const { taskId } = req.body;
    return new Promise(async (resolve, reject) => {
        const poolCluster = createPoolCluster();
        // Add a named configuration to the pool
        poolCluster.add('MASTER', masterConfig);
        const connection = await getConnection(poolCluster, 'MASTER').catch((err) => {
            reject(err);
        });
        // resolve(`Connection obtained: ${connection.threadId}`);

        // Quarying Start 
        connection.beginTransaction(async (err) => {
            if (err) {
                reject(err)
            }
            let qTaskInfo = `SELECT * from (SELECT task_id,taskName,taskDesc,instructions,taskStatus,
                            (SELECT COUNT(*) FROM quations ) as noOfQuestion,
                            (SELECT COUNT(*) FROM taskquations WHERE taskStatus='pending')as pending,
                            (SELECT COUNT(*) FROM taskquations where taskStatus='submited') as submited FROM tasklist) as xyz WHERE task_id = ?`
            var escape = [taskId];
            qTaskInfo = connection.format(qTaskInfo, escape);
            await connection.query(qTaskInfo, function (error, results) {
                if (error || results.length == 0) {
                    (error == null) ? reject({ ...eMsg, ...{ msg: 'Information Not Found' } }) : error;
                }
                resolve({ ...sMsg, ...{ data: results[0] } });
            });
            // Quarying End 


            // When done with the connection
            connection.release();
            // Properly close the pool cluster
            poolCluster.end((err) => {
                if (err) {
                    reject('Error closing the connection pool cluster:');
                }
                // console.log('Connection pool cluster was closed.');
            });

        });


    })
}



export const updateQuesTimeTrake = (req, res) => {
    const { answer, quesInfo } = req.body;
    return new Promise(async (resolve, reject) => {
        const poolCluster = createPoolCluster();
        poolCluster.add("MASTER", masterConfig);
        const connection = await getConnection(poolCluster, "MASTER").catch(
            (err) => {
                reject(err);
            },
        );

        connection.beginTransaction(async (err) => {
            if (err) {
                reject({ ...eMsg, ...{ msg: "Tasks Not Found" } });
            }
            // 1. Getting Task Information
            const taskSelectQuery =
                "SELECT * FROM  tasklist WHERE task_Id = ? LIMIT 1";
            await connection.query(
                taskSelectQuery,
                [quesInfo.taskId],
                async (err, Task) => {
                    if (err || Task.length == 0) {
                        reject({ ...eMsg, ...{ msg: "Tasks Not Found" } });
                    }
                    resp.taskInfo = Task[0];
                },
            );
            // 2. Getting Task Quetsion Information
            var taskQuestionQuery =
                "SELECT * FROM (SELECT t.taskId as taskUniqueId, t.taskStatus, t.totalTimeTaken, q.question_Id, q.question, q.autoSubmit FROM `taskquations` AS t JOIN quations AS q ON q.question_Id = t.question_Id) AS XYZ WHERE taskUniqueId=? AND question_Id=?;";
            // var escape = [quesInfo.taskId, quesInfo.question_Id];
            // taskQuestionQuery = connection.format(taskQuestionQuery, escape);
            await connection.query(
                taskQuestionQuery,
                [quesInfo.taskId, quesInfo.question_Id],
                (err, ques) => {
                    if (err || ques.length == 0) {
                        reject({ ...eMsg, ...{ msg: "Tasks Not Found" } });
                    }
                    // resp.ques = ques[0];
                },
            );

            var updateQuary = "UPDATE `taskquations` SET `totalTimeTaken`=?, `IncompleteQues`=? WHERE `taskId`=? and `question_Id`=?";
            var escape = [quesInfo.totalTimeTaken, answer, quesInfo.taskId, quesInfo.question_Id];
            updateQuary = connection.format(updateQuary, escape);
            // console.log(updateQuary);
            await connection.query(
                updateQuary,
                (err, result) => {
                    if (err) {
                        reject({ ...eMsg, ...{ msg: "Updation Failed" } });
                    }
                },
            );

            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        reject({ ...eMsg, ...{ msg: "Transantion Failed", err: err } });
                    });
                }
                resolve({
                    ...sMsg,
                    ...{ msg: "Committed Successfully", resp: resp },
                });
            });

            // When done with the connection
            connection.release();
            // Properly close the pool cluster
            poolCluster.end((err) => {
                if (err) {
                    reject({
                        ...eMsg,
                        ...{ msg: "Error closing the connection pool cluster" },
                    });
                }
            });
        });
    });
};

export const submitQuestion = (req, res) => {
    return new Promise(async (resolve, reject) => {
        const poolCluster = createPoolCluster();
        poolCluster.add("MASTER", masterConfig);
        const connection = await getConnection(poolCluster, "MASTER").catch(
            (err) => {
                reject(err);
            },
        );

        const reqData = req.body;
        const question_Id = reqData.quesInfo.question_Id;
        const taskId = reqData.taskId;
        const answer = reqData.answer;
        const totalTimeTaken = reqData.quesInfo.totalTimeTaken;

        if (reqData.answer.length < 25) {
            reject({ ...eMsg, ...{ msg: "Write At Least 25 Words" } });
        }

        connection.beginTransaction(async (err) => {
            if (err) {
                reject({ ...eMsg, ...{ msg: "Transaction Creation Failed" } });
            }

            // 1. Getting Task Information
            const taskSelectQuery =
                "SELECT * FROM  tasklist WHERE task_Id = ? LIMIT 1";
            await connection.query(
                taskSelectQuery,
                [taskId],
                async (err, Task) => {
                    if (err || Task.length == 0) {
                        reject({ ...eMsg, ...{ msg: "Tasks Not Found" } });
                    }
                    resp.taskInfo = Task[0];
                },
            );
            // 2. Getting Task Quetsion Information
            var taskQuestionQuery =
                "SELECT * FROM (SELECT t.taskId as taskUniqueId, t.taskStatus, t.totalTimeTaken, q.question_Id, q.question, q.autoSubmit FROM `taskquations` AS t JOIN quations AS q ON q.question_Id = t.question_Id) AS XYZ WHERE taskUniqueId=? AND question_Id=?;";
            // var escape = [quesInfo.taskId, quesInfo.question_Id];
            // taskQuestionQuery = connection.format(taskQuestionQuery, escape);
            await connection.query(
                taskQuestionQuery,
                [taskId, question_Id],
                (err, ques) => {
                    if (err || ques.length == 0) {
                        reject({ ...eMsg, ...{ msg: "Tasks Not Found" } });
                    }
                    // resp.ques = ques[0];
                },
            );

            var updateQuary = "UPDATE `taskquations` SET `totalTimeTaken`=?, `IncompleteQues`=?, `taskStatus`='submited' WHERE `taskId`=? and `question_Id`=?";
            var escape = [totalTimeTaken, answer, taskId, question_Id];
            updateQuary = connection.format(updateQuary, escape);
            await connection.query(
                updateQuary,
                (err, result) => {
                    if (err) {
                        reject({ ...eMsg, ...{ msg: "Updation Failed" } });
                    }
                },
            );


            // Saving Answer 
            const currentDate = new Date(); // Current date and time
            // Format the date as YYYY-MM-DD HH:mm:ss
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            const forSave = {
                taskId: taskId,
                quesId: question_Id, 
                answer: answer, 
                submitDate: formattedDate, 
                totalTimeTaken: totalTimeTaken, 
                metaInfo: Object.assign({}, reqData)
            }
            await connection.query('INSERT INTO answers SET ?', forSave, (err, result) => {
                if (err) {
                    reject({ ...eMsg, ...{ msg: "Saving Failed", err: err } });
                }
            });

            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        reject({ ...eMsg, ...{ msg: "Transantion Failed", err: err } });
                    });
                }
                resolve({
                    ...sMsg,
                    ...{ msg: "Committed Successfully", resp: resp },
                });
            });

            // When done with the connection
            connection.release();
            // Properly close the pool cluster
            poolCluster.end((err) => {
                if (err) {
                    reject({
                        ...eMsg,
                        ...{ msg: "Error closing the connection pool cluster" },
                    });
                }
            });
        });
    });
};
