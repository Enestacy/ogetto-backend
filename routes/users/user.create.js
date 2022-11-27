const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../../models");

router.post("/create-profile", async function (req, res) {
  try {
    const { body } = req;
    const { firstName, lastName, position, surname, about, office, tg, status, date_of_birth, grade, current_project, tags } = body
    const newUser = await db.User.create({ firstName, lastName, position, surname, about, office, tg, status, date_of_birth, grade, current_project });
    const tagTitles = await db.Tag.findAll({
      where: {
        title: {
          [Op.or]: tags
        }
      }
    })

    await newUser.addTag(tagTitles);

    return res.send({ newUser: newUser, tagTitles: tagTitles });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;