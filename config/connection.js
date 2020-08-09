// Set up MySQL connection.
const mysql = require("mysql");
let pool;
// pool is determined based on where the server is being deployed
if (process.env.JAWSDB_URL) {
  pool = mysql.createPool(process.env.JAWSDB_URL);
} else {
  pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burgers_db",
    connectionLimit: 10
  });
}
// returns a promise about getting a connection from connection pool.
const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (error, connection) {
      if (error) {
        console.error("error connecting: " + error.stack);
        reject(error);
      }
      else {
        console.log("connected as id " + connection.threadId);
        resolve(connection);
      }
    });
  });
}

// export connection for ORM.
module.exports = {
  getConnection
};
