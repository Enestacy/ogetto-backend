const express = require("express");
const router = express.Router();
const db = require("../../models");

router.post("/create-profile", async function (req, res) {
  try {
    const { body } = req;
    const newUser = await db.User.create({ ...body });
    return res.send(newUser);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;