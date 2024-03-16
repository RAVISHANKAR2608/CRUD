const express = require("express");
const employeeController = require("../controllers/employee");

const router = express.Router();

router.post('/create', employeeController.createEmployee);




module.exports = router;