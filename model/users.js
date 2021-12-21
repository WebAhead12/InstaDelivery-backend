const db = require(".../database/connection");

const getUser = (user) => {
  return db.query(`SELECT * FROM users`).then((result) => {
    const users = result.rows;

    if (!users.length)
      throw new Error(`Something went wrong, cannot get data from database`);
    return users.filter((account) => account.email == user);
  });
};

const getUserID = (user) => {
  return getUser(user).then((accArray) => {
    const [account] = accArray;
    if (!accArray.length) {
      throw new Error(`This ${user} does not exist`);
    } else {
      return account.id;
    }
  });
};

const setUser = (account) => {
  const values = [account.email, account.name, account.password];
  return db.query(
    `INSERT INTO users (email, name, password) VALUES ($1, $2, $3)`,
    values
  );
};

const getUserInfoByID = (id) => {
  return db
    .query(`SELECT id, username, name FROM users WHERE id = ${id})`)
    .then((result) => {
      const userInfo = result.rows;
      return userInfo;
    });
};

module.exports = { getUser, setUser, getUserInfoByID, getUserID };
