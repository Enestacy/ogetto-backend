const express = require("express");
const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models");

router.patch("/mark-as-done", async function (req, res) {
  try {
    const {
      body: { taskCode, userId },
    } = req;

    const updatedTask = await db.Task.findOne(
      {
        taskCode: {
          id: taskCode,
        },
        returning: true,
        plain: true,
      }
    );
    const currentUser = await db.User.findOne(
      {
        where: {
          id: userId,
        },
        returning: true,
        plain: true,
      }
    );

    await currentUser.addTask(updatedTask, { through: { isDone: true } })
    const updatedUser = await db.User.findOne(
      {
        where: {
          id: userId,
        },
        include: db.Task,
        returning: true,
        plain: true,
      }
    );

    return res.send(updatedUser);
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;