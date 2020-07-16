const connection = require('./index');

const createTable = ({ team, teamToken, userId, userName, userEmail, userToken }) => {
  teamName = team.name.toLowerCase().replace(/ /g,'')
  let query = `CREATE TABLE IF NOT EXISTS ${teamName} (
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    name VARCHAR(50),
    token VARCHAR(255),
    email VARCHAR(50)
  )`;

  connection.query(query, (error, results) => {
    if(error) console.log("Create Table Error: ", error);
    let queryCommand = `INSERT IGNORE INTO ${teamName} (id, name, token, email) VALUES ?`;
    let values = [
      [ team.id, teamName, teamToken, ''],
      [ userId, userName, userToken, userEmail ]
    ];
    connection.query(queryCommand, [values], (err, result) => {
      if(err) throw err;
      console.log("After inserting record", result.affectedRows);
    });
  });
}

const checkStaff = (userId, teamName, cb) => {
  teamName = teamName.toLowerCase().replace(/ /g,'');
  let query = `SELECT 1 FROM ${teamName} WHERE id='${userId}'`;

  connection.query(query, (err, result) => {
    if(err) throw err;
    
    let isExist = result.length !== 0;
    cb(isExist);
  });
}

module.exports = { createTable, checkStaff };