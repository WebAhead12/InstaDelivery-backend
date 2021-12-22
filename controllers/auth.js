const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const utils = require("../utils/utilities");

dotenv.config();

const SECRET = process.env.SECRET;

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  model
    .getUser(email)
    .then((acc) => {
      if (!acc.length) {
        utils.throwError(`Login unauthorized, ${email} not found`, 401);
      }
      const [account] = acc;

      bcrypt.compare(password, account.password).then((match) => {
        if (!match) {
          utils.throwError("Login unauthorized, passwords do not match", 401);
        } else {
          const token = jwt.sign({ user: account.id }, SECRET, {
            expiresIn: "2h",
          });
        }
        res.status(200).send({ access_token: token, error, error: "" });
      });
    })
    .catch((error) => {
      res.send({
        error: error.status === 401 ? error.message : "An unexpected error",
      });
    })
    .catch((error) => res.send({ error: error.message }));
};

const register = (req, res) => {
  const account = req.body;

  model
    .getUser(account.username)
    .then((acc) => {
      if (acc.length) {
        utils.throwError(`${account.email} already exists`, 403);
      } else {
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) => model.createUser({ email, password: hash }))
          .then(() => {
            res.send({ response: "Successful" });
          })
          .catch((error) => {
            res.send({
              error:
                "Something went wrong, unable to create an account " +
                error.message,
            });
          });
      }
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
};

const userInfo = (req, res) => {
  const token = req.token;
  const id = jwt.verify(token, SECRET).user;
  model
    .getUserInfoByID(id)
    .then((userInfo) => {
      if (!userInfo.length) throw new Error("Email does not exist");
      else {
        const [info] = userInfo;
        res.send(info);
      }
    })
    .catch((error) => res.status(404).send({ error: error.message }));
};

module.exports = {
  login,
  register,
  userInfo,
};
