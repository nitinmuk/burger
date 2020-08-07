// Set up MySQL connection.
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "burgers_db",
  connectionLimit : 10
});

//make connection.
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
