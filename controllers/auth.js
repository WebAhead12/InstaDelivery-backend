const model = require("../model/users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const utils = require("../utils/utilities");
const bcrypt = require("bcryptjs");

dotenv.config();

const SECRET = process.env.JWT_SECRET;

//handle user login => check with the database
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  model
    .getUser(email)
    .then((acc) => {
      if (!acc.length) {
        //account doesnt exist
        utils.throwError(`Login unauthorized, ${email} is not found`, 401);
      }
      const [account] = acc; //account is obj {id, email, password}, acc is array with 1 obj.

      bcrypt //hash the given password using bcrypt.compate and compare it to the password is database.
        .compare(password, account.password)
        .then((match) => {
          if (!match) {
            utils.throwError("Login unauthorized, Password mismatch", 401);
          } else {
            const token = jwt.sign({ user: account.id }, SECRET, {
              expiresIn: "1h",
            });
            res.status(200).send({ access_token: token, error: "" });
          }
        })
        .catch((error) => {
          res.send({
            error: error.status === 401 ? error.message : "An unexpected error",
          });
        });
    })
    .catch((error) => res.send({ error: error.message }));
};

//register new users (players)
const register = (req, res) => {
  const account = req.body;

  //check if account exists.
  model
    .getUser(account.email)
    .then((acc) => {
      if (acc.length) {
        //account exist
        utils.throwError(`${account.email} already taken`, 403);
      } else {
        //hash password then set a new account

        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(account.password, salt))
          .then((hash) =>
            //set user with the hashed password
            model
              .createUser({ ...account, password: hash })
              .then(() => {
                //make token and send to frontend, because it redirect to Home.
                const token = jwt.sign({ user: account.id }, SECRET, {
                  expiresIn: "1h",
                });
                res.status(200).send({
                  access_token: token,
                  response: "Successful",
                });
              })
              .catch((error) =>
                res.send({
                  error:
                    "Something wrong, unable to create an account | " +
                    error.message,
                })
              )
          );
      }
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
};

//return information about the user e.g. id, email, name
const userInfo = (req, res) => {
  const token = req.token;
  const id = jwt.verify(token, SECRET).user; //decrypt token to get the id
  model
    .getUserInfoByID(id)
    .then((userInfo) => {
      if (!userInfo.length) throw new Error("User doesnt exist");
      else {
        const [info] = userInfo; //info is an object that contains the information needed.
        res.send(info);
      }
    })
    .catch((error) => res.status(404).send({ error: error.message }));
};

module.exports = { login, register, userInfo };
