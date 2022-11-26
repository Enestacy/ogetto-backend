const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../../models");

const { User_Tags, Tag } = db;

router.patch("/find-match", async function (req, res) {
  try {
    const {
      body: { tags },
    } = req;

    const firstTag = tags[0];
    const secondTag = tags[1] || null;
    const thirdTag = tags[2] || null;

    const users = await db.User.findAll({
      include: [
        {
          model: Tag,
          attributes: {
            exclude: ["id"],
          },
          where: {
            [Op.or]: [
              { title: firstTag },
              { title: secondTag },
              { title: thirdTag },
            ],
          },
        },
      ],
    });
    const test = users.map((elem) => {
      return elem.Tags;
    });
    let max = test[0];
    for (let e of test) {
      max = max.length < e.length ? e : max;
    }
    const soulmate = await db.User.findOne({
      where: {
        id: max[0].User_Tags.UserId,
      },
      include: db.Tag,
    });
    return res.send(soulmate);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
