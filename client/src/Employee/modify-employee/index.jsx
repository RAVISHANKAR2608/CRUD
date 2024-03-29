import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";

export const ModifyEmployee = ({
  toggleDrawerVisible,
  editData,
  getAllEmployeesData,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        name: editData.name,
        email: editData.email,
      });
      console.log(editData?._id, "Edit Data");
    }
  }, [editData, form]);

  const onFinish = async (values) => {
    // const values = await form.validateFields();
    setLoading(true);
    console.log("Success:", values);
    // await setFormData({
    //   name: values?.name,
    //   email: values?.email,
    // });
    // console.log(formData, "Form Data")
    try {
      if (editData) {
        // If editData is provided, it's an update operation
        await axios.patch(
          `http://localhost:4000/employee/update/${editData._id}`,
          values
        );
        message.success("Employee Updated Successfully");
      } else {
        // Otherwise, it's a create operation
        await axios.post("http://localhost:4000/employee/create", values);
        message.success("Employee Added Successfully");
      }
      getAllEmployeesData();
      setLoading(false);
      toggleDrawerVisible();
      form.resetFields();
    } catch (error) {
      message.error(error.message);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

  const onFinishFailed = (error) => {
    message.error(error.message, 5);
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 17,
        }}
        style={{
          maxWidth: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please enter your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="reset" onClick={toggleDrawerVisible}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
