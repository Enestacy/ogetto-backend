const express = require("express");
const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models");

router.patch("/update-profile/:id", async function (req, res) {
  try {
    const {
      params: { id },
      body,
    } = req;

    const [_, updatedUser] = await db.User.update(
      { ...body },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );

    console.log(updatedUser)

    return res.send(updatedUser);
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;