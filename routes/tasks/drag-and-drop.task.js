// const test = { id: "937201d0-6d35-11ed-bcfa-d3033dd63e33", current_project: "Золотое яблоко" }
// const result = test.id === teamLeads[0].id && test.current_project === teamLeads[0].current_project ? true : false


const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../../models");

router.patch("/check-results", async function (req, res) {
  try {
    const { body: { result } } = req
    const newArray = []
    const test = await Promise.all(result.map(async (elem) => {
      const user = await db.User.findOne({
        where: {
          id: elem.id,
          current_project: elem.current_project
        }
      })
      return user ? true : false
    }))
    console.log("test: ", test)
    return res.send(test);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;