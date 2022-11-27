const express = require("express");
const { Op, Sequelize } = require("sequelize");
const router = express.Router();
const db = require("../../models");
const { Task, User, Tag } = db;

router.get("/random-tasks/:userId", async function (req, res) {
  try {
    const { params: { userId } } = req
    const me = await User.findOne({
      where: {
        id: userId
      },
    })
    const tasks = me.status === 'quite' ? await Task.findAndCountAll({
      attributes: { exclude: ["tag"] },
      where: {
        category: "quite"
      },
      include: [{ model: Tag, attributes: { exclude: ["id"] } }],
    }) : await Task.findAndCountAll()

    const { rows, count } = tasks

    function between(min, max) {
      return Math.floor(
        Math.random() * (max - min) + min
      )
    }
    const first = between(0, count)
    const second = between(0, count)
    const third = between(0, count)
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: Task
    })
    await user.addTask(rows[first])
    await user.addTask([rows[second], rows[third]])

    const updatedUser = await User.findOne({
      where: {
        id: userId
      },
      include: Task
    })

    return res.send(updatedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;