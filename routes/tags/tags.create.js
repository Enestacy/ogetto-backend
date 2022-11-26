const express = require("express");
const router = express.Router();
const db = require("../../models");
const { defaultError } = require("../../errors");

router.post("/create-tag", async function (req, res) {
  try {
    const { body } = req;
    const sameTag = await db.Tag.findOne({
      where: {
        title: body.title.toLowerCase(),
      },
    });
    if (sameTag) {
      throw defaultError(
        400,
        "This tag already exists"
      );
    }
    const newTask = await db.Tag.create({ ...body });
    return res.send(newTask);

  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;