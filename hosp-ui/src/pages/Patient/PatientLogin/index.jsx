import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";

import { Input, Button } from "antd";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./patientlogin.css";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });

  const onInputChage = (e, key) => {
    setCred({ ...cred, [key]: e.target.value });
  };

  const loginPatient = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/patient/login",
        cred
      );
      notify(response.data.message);
      const tokenDecode = jwtDecode(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("patient_id", tokenDecode.id);
      if (response.data.token && tokenDecode.id) {
        navigate("/patient/home");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const notify = (message) =>
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  return (
    <div className="patientlogin">
      <Navbar />
      <ToastContainer />
      <div className="patient-login-form">
        <Header text="Patient Login" />

        <label>Username:</label>
        <Input
          onChange={(e) => {
            onInputChage(e, "username");
          }}
        />
        <label>Password:</label>
        <Input.Password
          onChange={(e) => {
            onInputChage(e, "password");
          }}
        />
        <Button
          onClick={loginPatient}
          className="patient-login-btn"
          type="primary"
        >
          Login
        </Button>
      </div>
    </div>
  );
};
export default PatientLogin;
