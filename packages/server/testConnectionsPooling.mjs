import { createPoolCluster } from 'mysql';

// Create a connection pool cluster
const poolCluster = createPoolCluster();

// Master configuration
const masterConfig = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nimitask',
  port: 4206
};

// Add a named configuration to the pool
poolCluster.add('MASTER', masterConfig);
// Function to get a connection from a specific pool
const getConnection = async (poolId) => {
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
// Example usage
(async () => {
  try {
    const connection = await getConnection('MASTER');
    console.log('Connection obtained:', connection.threadId);

    // Use the connection for your queries
    // E.g., connection.query(...)
    await connection.query('SELECT * FROM `users` ', function (error, results, fields) {
      console.log(results);
    });
    await connection.query('SELECT * FROM `users` ', function (error, results, fields) {
      console.log(results);
    });
     await connection.query('SELECT * FROM `users` ', function (error, results, fields) {
      console.log(results);
    });
    await connection.query('SELECT * FROM `users` ', function (error, results, fields) {
      console.log(results);
    });
    await connection.query('SELECT * FROM `users` ', function (error, results, fields) {
      console.log(results);
    });
    await connection.query('SELECT * FROM `users` ', function (error, results, fields) {
      console.log(results);
    });
    await connection.query('SELECT * FROM `users` ', function (error, results, fields) {
      console.log(results);
    });


    // When done with the connection
    connection.release();

    // Remove the pool after some operations or time
    setTimeout(() => {
      poolCluster.remove('MASTER');
    }, 2000);

    // Listen for removal
    poolCluster.on('remove', function (nodeId) {
      console.log('REMOVED NODE : ' + nodeId);
    });

    // Properly close the pool cluster
    poolCluster.end((err) => {
      if (err) {
        console.error('Error closing the connection pool cluster:', err);
      } else {
        console.log('Connection pool cluster was closed.');
      }
    });
  } catch (error) {
    console.error('Error during database operation:', error);
  }
})();










//--------------------------------------------------------------------------------------
// const pool = createPool({
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'nimitask',
//   port: 4206
// });

// // Function to perform a query
// const queryDatabase = (sql, values) => {
//   return new Promise((resolve, reject) => {
//     pool.query(sql, values, (error, results, fields) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };


// // Execute a test query
// const testQuery = async () => {
//   try {
//     const results = await queryDatabase('SELECT * FROM users LIMIT ?', [10]);
//     console.log("FETCHED SUCCESSS");
//   } catch (error) {
//     console.error('Database query failed:', error);
//   }
// };

// // Main function to control flow
// const main = async () => {
//   await testQuery();
//   // Optional: more logic here
//   closePool(); // Close the pool when all queries are done
// };

// // Function to close the pool
// const closePool = () => {
//   pool.end(err => {
//     if (err) {
//       console.error('Error closing the connection pool:', err);
//     } else {
//       console.log('Connection pool was closed.');
//     }
//   });
// };

// // Initiate main function
// main();

// pool.on('acquire', function (connection) {
//   console.log('Connection %d acquired', connection.threadId);
// });
// pool.on('connection', function (connection) {
//   connection.query('SET SESSION auto_increment_increment=1')
// });

// pool.on('enqueue', function () {
//   console.log('Waiting for available connection slot');
// });

// // Graceful shutdown
// // eslint-disable-next-line no-undef
// process.on('SIGINT', () => {
//   console.log('Graceful shutdown');
//   closePool();
//   // eslint-disable-next-line no-undef
//   process.exit(0);
// });
