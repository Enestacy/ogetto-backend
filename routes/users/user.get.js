const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/user", async function (req, res) {
  try {
    const { body: { id } } = req
    const user = await db.User.findOne({
      where: {
        id
      }
    })
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;