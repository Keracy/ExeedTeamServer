const router = require("express").Router();
const Project = require("../models/Project");

router.post("/", async (req, res) => {
  const { title, status, devs, rate } = req.body;
  const project = new Project({
    title: title,
    status: status,
    devs: devs,
    rate: rate,
  });
  try {
    await project.save();
    return res.status(200).send(project);
  } catch (err) {
    res.status(500).send("error");
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (err) {
    res.status(500).send("error");
  }
});

module.exports = router;
