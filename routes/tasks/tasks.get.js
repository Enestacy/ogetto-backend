const express = require("express");
const router = express.Router();
const db = require("../../models");
const { Tag } = db;

router.get("/tasks", async function (req, res) {
  try {
    const tasks = await db.Task.findAll({
      attributes: { exclude: ["tag"] },
      include: [{ model: Tag, attributes: { exclude: ["id"] } }],
    });
    return res.send(tasks);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
