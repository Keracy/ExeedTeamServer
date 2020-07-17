const express = require("express");
const Employee = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).send(employees);
  } catch (err) {
    res.send({ message: err });
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.userId);
    return res.send(employee);
  } catch (err) {
    res.send({ message: err });
  }
});

router.post("/", async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });
  try {
    await employee.save();
    return res.status(200).send("Done");
  } catch (err) {
    res.send({ message: err });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.userId);
    return res.send("Done");
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
