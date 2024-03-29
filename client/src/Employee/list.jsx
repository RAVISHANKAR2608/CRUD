import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

export const EmployeeList = ({onClickEdit, employeeData, getAllEmployeesData}) => {
 

  const deleteEmployee = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/employee/delete/${id}`);
      message.success("Employee Deleted Successfully", 5);
      getAllEmployeesData();
    } catch (error) {
      console.error("Error delete employee data:", error);
      message.error(error.message, 5);
    }
  };

  useEffect(() => {
    getAllEmployeesData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeData &&
            employeeData.map((employee) => (
              <tr key={employee?.id}>
                <td>{employee?.name}</td>
                <td>{employee?.email}</td>
                <td>
                  <button onClick={() => onClickEdit(employee)}>Edit</button>
                  <button onClick={() => deleteEmployee(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
