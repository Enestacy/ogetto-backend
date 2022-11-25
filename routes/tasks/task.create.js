const express = require("express");
const router = express.Router();
const db = require("../../models");

router.post("/create-task", async function (req, res) {
  try {
    const { body } = req;
    const newTask = await db.Task.create({ ...body });
    return res.send(newTask);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;