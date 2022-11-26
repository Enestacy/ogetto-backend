const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const db = require("../../models");
const { Task, User, User_Tasks } = db;

router.get("/get-rating", async function (req, res) {
  try {
    const userId = "59a73d80-6ce0-11ed-bbdc-97667bccac03";
    const rating = await Task.findAll({
      include: [
        {
          model: User,
          where: {
            id: {
              [Op.eq]: userId,
            },
          },
        },
      ],
    });

    return res.send(rating);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
