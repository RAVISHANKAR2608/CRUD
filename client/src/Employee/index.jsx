import React, { useState, useEffect } from "react";
import { ModifyEmployee } from "./modify-employee";
import { Button, Card, Modal, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { EmployeeList } from './list';
import axios from 'axios';

export const EmployeeComponent = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editData, setEditData] = useState();
  const [employeeData, setEmployeeData] = useState([]);

  const toggleDrawerVisible = () => setIsDrawerVisible((prev) => !prev);

  const getAllEmployeesData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/employee/");
      setEmployeeData(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      message.error(error.message, 5);
    }
  };

  const onClickCreate = () => {
    setEditData(null);
    toggleDrawerVisible();
  };

  const onClickEdit = (editData) => {
    setEditData(editData);
    toggleDrawerVisible();
  };

  const extraButton = (
    <div>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={onClickCreate}
        className="material-create-btn"
        block
      >
        CREATE NEW
      </Button>
    </div>
  );
  return (
    <div>
      <Card
        title="Employees List"
        extra={extraButton}
        className="title-card-text"
        hoverable='true'
      >
        <Modal
          title={editData ? "Edit Employee" : "Create New Employee"}
          width={400}
          onCancel={toggleDrawerVisible}
          open={isDrawerVisible}
          style={{ paddingBottom: 80 }}
          destroyOnClose={true}
          footer={false}
          className="pagesize alignment"
        >
          <ModifyEmployee
            toggleDrawerVisible={toggleDrawerVisible}
            editData={editData}
            getAllEmployeesData={getAllEmployeesData}
          />
        </Modal>

        <EmployeeList onClickEdit={onClickEdit} getAllEmployeesData={getAllEmployeesData} employeeData={employeeData} />
      </Card>
    </div>
  );
};
