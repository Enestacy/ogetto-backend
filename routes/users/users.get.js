const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/users", async function (req, res) {
  try {
    const users = await db.User.findAll()
    return res.send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
