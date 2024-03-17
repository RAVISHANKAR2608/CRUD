const express = require("express");
const employeeController = require("../controllers/employee");

const router = express.Router();

router.post('/create', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployee);
router.patch('/update/:id', employeeController.updateEmployee);
router.patch('/delete/:id', employeeController.deleteEmployee);




module.exports = router;