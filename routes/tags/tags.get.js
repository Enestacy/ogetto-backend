const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/tags", async function (req, res) {
  try {
    const tags = await db.Tag.findAll()
    return res.send(tags);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;