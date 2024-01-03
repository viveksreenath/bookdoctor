import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Button, Select, Upload } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./doctorsignup.css";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [cred, setCred] = useState({
    name: "",
    qualification: "",
    image: "",
    department: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/department");
      const departmentArray = response.data.map((item) => {
        return { value: item._id, label: item.name };
      });
      setDepartments(departmentArray);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onInputChange = (e, key) => {
    setCred({ ...cred, [key]: e.target.value });
  };
  const onSelect = (e) => {
    setCred({ ...cred, department: e });
  };
  const onUploadChange = (info) => {
    if (info.file.status === "done") {
      setCred({ ...cred, image: info.file.response.url });
    }
  };
  const signupDoctor = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/doctor/sign-up",
        cred
      );
      notify(response.data.message);
      navigate("/doctor/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const notify = (message) =>
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  return (
    <div className="docsignup">
      <Navbar />
      <ToastContainer />
      <Header text="Doctor Sign Up" />
      <div className="doctor-signup-form">
        <div>
          <label>Name:</label>
          <Input
            onChange={(e) => {
              onInputChange(e, "name");
            }}
          />
        </div>
        <div>
          <label>Qualification:</label>
          <Input
            onChange={(e) => {
              onInputChange(e, "qualification");
            }}
          />
        </div>
        <div>
          <label>Username:</label>
          <Input
            onChange={(e) => {
              onInputChange(e, "username");
            }}
          />
        </div>
        <div>
          <label>Password:</label>
          <Input.Password
            onChange={(e) => {
              onInputChange(e, "password");
            }}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <Input.Password
            onChange={(e) => {
              onInputChange(e, "confirmPassword");
            }}
          />
        </div>
        <div>
          <label>Department:</label>
          <Select
            options={departments}
            onChange={onSelect}
            style={{
              width: 200,
            }}
          />
        </div>
        <div>
          <label>Image:</label>
          <Upload
            name="file"
            action="http://localhost:3000/upload"
            onChange={onUploadChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <div>
          <Button
            onClick={signupDoctor}
            className="doctor-signup-btn"
            type="primary"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DoctorSignup;
