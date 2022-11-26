const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const db = require("../../models");
const { Task, User, User_Tasks } = db;

router.get("/random-tasks", async function (req, res) {
  try {

    const tasks = await Task.findAndCountAll()
    const { rows, count } = tasks

    function between(min, max) {
      return Math.floor(
        Math.random() * (max - min) + min
      )
    }
    const first = between(0, count)
    const second = between(0, count)
    const third = between(0, count)

    return res.send([rows[first], rows[second], rows[third]]);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;