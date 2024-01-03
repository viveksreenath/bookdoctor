import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Button, Select, Upload } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./patientsignup.css";

const PatientSignup = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [cred, setCred] = useState({
    name: "",
    address: "",
    image: "",
    dob: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

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
  const signupPatient = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/patient/sign-up",
        cred
      );
      notify(response.data.message);
      navigate("/patient/login");
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
    <div className="patientsignup">
      <Navbar />
      <ToastContainer />
      <Header text="Patient Sign Up" />
      <div className="patient-signup-form">
        <div>
          <label>Name:</label>
          <Input
            onChange={(e) => {
              onInputChange(e, "name");
            }}
          />
        </div>
        <div>
          <label>Address:</label>
          <Input.TextArea
            rows={3}
            onChange={(e) => {
              onInputChange(e, "address");
            }}
          />
        </div>
        <div>
          <label>DOB:</label>
          <Input
            onChange={(e) => {
              onInputChange(e, "dob");
            }}
            type="date"
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
            onClick={signupPatient}
            className="patient-signup-btn"
            type="primary"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PatientSignup;
