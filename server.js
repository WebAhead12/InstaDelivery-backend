const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
