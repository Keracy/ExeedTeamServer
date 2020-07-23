const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();
const { validateEmployee } = require("../validate/validate");
const bcrypt = require("bcryptjs");
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
    console.log(employee);
    if (!validateEmployee(req.body).error) {
      await employee.save();
      return res.status(200).send(employee);
    } else {
      res.send(validateEmployee(req.body).error.details[0].message);
    }
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

router.patch("/:userId", async (req, res) => {
  const { name, phone, email } = req.body;
  const _id = req.params.userId;
  const employee = {
    _id: _id,
    name: name,
    phone: phone,
    email: email,
  };
  try {
    if (!validateEmployee(req.body).error) {
      await Employee.findByIdAndUpdate(req.params.userId, employee);
      res.send(employee);
    } else {
      res.send({
        validationError: validateEmployee(req.body).error.details[0].message,
      });
    }
  } catch (err) {
    res.send({ message: err });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { searchWord } = req.body;
    const employees = await Employee.find();
    const foundedEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchWord.toLowerCase())
    );
    res.status(200).send(foundedEmployees);
  } catch (err) {
    res.status(400).send("Error");
  }
});

module.exports = router;
