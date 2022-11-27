const express = require("express");
const { Sequelize } = require("sequelize");
const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models");

router.patch("/mark-as-done", async function (req, res) {
  try {
    const {
      body: { taskCode, userId, myRating },
    } = req;

    const updatedTask = await db.Task.findOne(
      {
        taskCode: {
          id: taskCode,
        },
      }
    );
    const currentUser = await db.User.findOne(
      {
        where: {
          id: userId,
        },
      }
    );
    const ratingDifference = Math.abs(myRating - currentUser.rating)
    const condition = ratingDifference > 30
    if (condition) {
      await currentUser.addTask(updatedTask, { through: { isDone: true } })
      const newRating = currentUser.rating + updatedTask.point
      const [_, updatedUser] = await db.User.update(
        { rating: newRating },
        {
          where: {
            id: userId,
          },
          returning: true,
          plain: true,
          include: db.Task,
        }
      );
      console.log("HERE: ", updatedUser)
      return res.send("ehfggsfesw");
    }
    else if (!condition) {
      throw defaultError(
        403,
        "У вас нет на это прав! Разница в рейтинге должна составлять не менее 30 очков"
      );
    }
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;