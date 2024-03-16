const employee = require("../modals/employee");

const createEmployee = async (req, res) => {
  const { name, email } = req.body;

  try {
    const userData = new employee({
      name,
      email,
    });
    // await userData.save();

    const data = await employee.create(userData);
    res.status(200).json(data);
  } catch (error) {
    res.send(401).json(error);  
    console.log("Error Occurred");
  }
};

module.exports = {createEmployee};