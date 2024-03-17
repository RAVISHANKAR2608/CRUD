const employee = require("../modals/employee");
const mongoose = require("mongoose");

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
  } catch (e) {
    res.send(401).json({ error: e.message });
    console.log("Error Occurred : ", e);
  }
};

const getEmployees = async (req, res) => {
  try {
    // Another way to Get Employees Data

    // const employeeData = await employee.find({archived: false});
    // res.status(200).json(employeeData);

    const { name, email } = req.query;
    let query = { archived: false };

    //  To get data by both name and email

    // if (name) {
    //   query.$or = [{ name: { $regex: name, $options: 'i' } }];
    // }

    // if (email) {
    //   query.$or = query.$or || [];
    //   query.$or.push({ email: { $regex: email, $options: 'i' } });
    // }

    if (name || email) {
      query.$or = [];

      if (name) {
        query.$or.push({ name: { $regex: name, $options: "i" } });
      }

      if (email) {
        query.$or.push({ email: { $regex: email, $options: "i" } });
      }
    }

    const employeeData = await employee.find(query).sort({ createdAt: -1 });
    res.status(200).json(employeeData);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No Data Found" });
  }

  try {
    const employeeData = await employee.findById(id);
    res.status(200).json(employeeData);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No Data Found" });
  }

  try {
    // Check if the employee with the given ID exists and is not already archived
    const existingEmployee = await employee.findOne({
      _id: id,
      archived: false,
    });

    if (!existingEmployee) {
      return res
        .status(404)
        .json({ error: "Employee not Found" });
    }

    // Update the employee data in the database
    const updateEmployeeData = await employee.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateEmployeeData);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  // const  itemId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No Data Found" });
  }

  //  This is used to Complete Delete in DB

  // try {
  //   const task = await taskModel.findByIdAndDelete(id);
  //   res.status(200).json(task);
  // } catch (e) {
  //   res.status(400).json({ error: e.message });
  // }

  try {
    // Check if the employee with the given ID exists and is not already archived
    const existingEmployee = await employee.findOne({
      _id: id,
      archived: false,
    });

    if (!existingEmployee) {
      return res
        .status(404)
        .json({ error: "Employee not found or already archived" });
    }

    // const deletedItem = await Item.findByIdAndUpdate(itemId, { archived: true }, { new: true });

    const data = await employee.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        archived: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
