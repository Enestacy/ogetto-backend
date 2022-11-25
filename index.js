const express = require("express");
const app = express();
const PORT = 3000;
const bp = require("body-parser");
const cors = require("cors");
const recursive = require("recursive-readdir-sync");
const dotenv = require("dotenv");

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Example app listening on port ${PORT}`);
});

recursive(`${__dirname}/routes/users`)
  .forEach(file => app.use(require(file)));
