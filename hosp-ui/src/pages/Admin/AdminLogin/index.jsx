import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";

import { Input, Button } from "antd";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./adminlogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });

  const onInputChage = (e, key) => {
    setCred({ ...cred, [key]: e.target.value });
  };

  const loginAdmin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        cred
      );
      notify(response.data.message);
      const tokenDecode = jwtDecode(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin_id", tokenDecode.id);
      if (response.data.token && tokenDecode.id) {
        navigate("/admin/home");
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
    <div className="adminlogin">
      <Navbar />
      <ToastContainer />
      <div className="admin-login-form">
        <Header text="Admin Login" />
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
        <Button onClick={loginAdmin} className="admin-login-btn" type="primary">
          Login
        </Button>
      </div>
    </div>
  );
};
export default AdminLogin;
