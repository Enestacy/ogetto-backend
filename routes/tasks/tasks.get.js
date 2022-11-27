const express = require("express");
const router = express.Router();
const db = require("../../models");
const { Tag, User, Task } = db;

router.get("/tasks/:id", async function (req, res) {
  const { body: { id } } = req
  try {
    const user = await User.findOne({
      where: {
        id
      },
    })
    if (user.status === 'quite') {
      const tasks = await Task.findAll({
        attributes: { exclude: ["tag"] },
        where: {
          category: "quite"
        },
        include: [{ model: Tag, attributes: { exclude: ["id"] } }],
      });
      return res.send(tasks);
    }
    const tasks = await Task.findAll({
      attributes: { exclude: ["tag"] },
      include: [{ model: Tag, attributes: { exclude: ["id"] } }],
    });
    return res.send(tasks);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
