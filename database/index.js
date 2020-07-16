const mysql = require('mysql');

const connection = mysql.createConnection({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if(err) {
    console.log("Error Connecting to MySQL database: ", err.stack);
    return;
  }

  console.log("Successfully connected to MYSQL server: ", connection.threadId);
})

module.exports = connection;