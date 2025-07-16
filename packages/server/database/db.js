import mysql from 'mysql';
export const dbConfig = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'nimitask',
    port: 4206
};


export const dbConfig2 = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nimitask',
    port: 4206,
    multipleStatements: true,
    debug: true
}


export const masterConfig = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'affiliation',
    port: 3306
};



// export const conn = mysql.createPool({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB,
//     port: dbConfig.port
// });


export const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.port
});



// eslint-disable-next-line no-unused-vars
export const getConnection = async (poolCluster, poolId) => {
    return new Promise((resolve, reject) => {
        poolCluster.getConnection(poolId, (err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
};


export const eMsg = {staus:false}
export const sMsg = {staus:true}
export const resp = {};