const express = require("express");
const router = express.Router();
const db = require("../../models");

const { User_Tags, Tag } = db

router.get("/get-team-leads", async function (req, res) {
  try {
    const teamLeads = await db.User.findAll({
      where: {
        position: "Тимлид"
      },
      attributes: { exclude: ["surname", "rating", "about", "office", "tg", "status", "date_of_birth", "grade"] }
    })
    return res.send(teamLeads);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;