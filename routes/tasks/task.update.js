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
    const ratingCondition = myRating - currentUser.rating;
    if (ratingCondition === 30 || ratingCondition === -30) {
      await currentUser.addTask(updatedTask, { through: { isDone: true } })
      const updatedUser = await db.User.update(
        {
          rating: Sequelize.literal(`rating + ${updatedTask.point}`),
          where: {
            id: userId,
          },
          include: db.Task,
          returning: true,
          plain: true,
        }
      );

      return res.send(updatedUser);
    } else {
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