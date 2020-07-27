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
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    console.log(req.body);
    const project = await Project.findByIdAndRemove(req.body._id);
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/", async (req, res) => {
  const { title, status, devs, rate, _id } = req.body;
  const project = {
    _id: _id,
    title: title,
    status: status,
    devs: devs,
    rate: rate,
  };
  try {
    await Project.findByIdAndUpdate(_id, project);
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
