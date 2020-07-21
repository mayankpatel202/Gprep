const connection = require('./index');

const createTable = (teamTableName) => {
  teamTableName = teamTableName.toLowerCase()
  let query = `CREATE TABLE IF NOT EXISTS ${teamTableName} (
    id VARCHAR(20) NOT NULL PRIMARY KEY,
    name VARCHAR(50),
    token VARCHAR(255),
    email VARCHAR(50)
  )`;
  
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if(error) console.log("Create Table Error: ", error);
      resolve(results);
    });
  });
  
}

const checkStaff = (userId, teamId) => {
  teamId = teamId.toLowerCase();
  let query = `SELECT EXISTS(SELECT * FROM ${teamId} WHERE id ='${userId}')`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if(err) throw err;
      resolve(Object.values(result[0])[0]);
    });
  });
  
}

const insertTeamProfile = (teamProfile) => {
  let queryCommand = `REPLACE INTO ${teamProfile.team.id.toLowerCase()} (id, name, token, email) VALUES ?`;
  let values = [
    [ teamProfile.team.id, teamProfile.team.name, teamProfile.teamToken, '']
  ];

  return new Promise((resolve, reject) => {
    connection.query(queryCommand, [values], (err, result) => {
      if(err) throw err;
      resolve(result);
    });
  });
  
}

const insertUserProfile = (userProfile, tableName) => {
  tableName = tableName.toLowerCase();
  let queryCommand = `REPLACE INTO ${tableName} (id, name, token, email) VALUES ?`;
  let values = [
    [ userProfile.userId, userProfile.userName, userProfile.userToken, userProfile.userEmail ]
  ];

  return new Promise((resolve, reject) => {
    connection.query(queryCommand, [values], (err, result) => {
      if(err) throw err;
      resolve(result);
    });
  });
  
}

const insertUserToken = (userInfo, tableName) => {
  tableName = tableName.toLowerCase();
  let query = `UPDATE ${tableName} SET token = '${userInfo.token}' WHERE id = '${userInfo.userId}'`;
  
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if(err) throw err;
      resolve(result);
    });
  });

}

const insertStaffProfile = (staffProfiles, tableName) => {
  tableName = tableName.toLowerCase();
  let query = `INSERT IGNORE INTO ${tableName} (id, name, email) VALUES ?`;
  let values = staffProfiles.map((staff) => {
    return [ staff.staffId, staff.staffName, staff.staffEmail ]
  });

  return new Promise((resolve, reject) => {
    connection.query(query, [values], (err, result) => {
      if(err) throw err;
      resolve(result);
    });
  });
   
}

//might not need this... 
const getUserToken = (userId, teamId) => {
  let tableName = teamId.toLowerCase();
  let query = `SELECT token FROM ${tableName} WHERE id='${userId}'`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if(err) throw err;
      resolve(result);
    });
  });
  
};

const checkToken = (userId, tableName) => {
  tableName = tableName.toLowerCase();
  let query = `SELECT IFNULL((SELECT token FROM ${tableName} WHERE id='${userId}'), '') As ResultNotFound`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if(err) throw err;
      resolve(result[0].ResultNotFound)
    });
  });
}

module.exports = { 
  createTable, 
  checkStaff, 
  getUserToken, 
  insertTeamProfile, 
  insertUserProfile,
  insertUserToken,
  insertStaffProfile,
  checkToken
};