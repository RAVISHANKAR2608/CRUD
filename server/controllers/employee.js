const employee = require("../modals/employee");

const createEmployee = async (req, res) => {
  const { name, email } = req.body;

  try {
    const userData = new employee({
      name,
      email,
    });

        //   Another way to create query
        
    // await userData.save();
    // res.status(200).json(userData);

    const data = await employee.create(userData);
    res.status(200).json(data);
  } catch (error) {
    res.send(401).json(error);  
    console.log("Error Occurred");
  }
};

module.exports = {createEmployee};