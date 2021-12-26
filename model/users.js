const db = require("../database/connection");

//get user row frm database
const getUser = (email) => {
  return db.query(`SELECT * FROM users`).then((result) => {
    const users = result.rows; //[{account1},{account2}...]

    if (!users.length)
      throw new Error(`Something wrong, could not get data from the database`);
    return users.filter((account) => account.email == email); //array with one account if exists
  });
};

//insert registered user to database
const createUser = (account) => {
  const values = [account.email, account.name, account.password];
  return db.query(
    `INSERT INTO users(email, name, password) VALUES($1, $2, $3)`,
    values
  );
};

//get user info by id
const getUserInfoByID = (id) => {
  return db
    .query(`SELECT id, email, name FROM users WHERE id = ${id}`)
    .then((result) => {
      const userInfo = result.rows;
      return userInfo;
    });
};

module.exports = { getUser, createUser, getUserInfoByID };
