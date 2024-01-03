import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import ReCAPTCHA from "react-google-recaptcha";

import { Input, Button } from "antd";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./doctorlogin.css";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const onInputChage = (e, key) => {
    setCred({ ...cred, [key]: e.target.value });
  };

  const loginDoctor = async () => {
    if (captchaVerified) {
      try {
        const response = await axios.post(
          "http://localhost:3000/doctor/login",
          cred
        );
        notify(response.data.message);
        const tokenDecode = jwtDecode(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("doc_id", tokenDecode.id);
        if (response.data.token && tokenDecode.id) {
          navigate("/doctor/home");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please verify captcha");
    }
  };
  function onCaptchaChange(value) {
    console.log("Captcha value:", value);
    setCaptchaVerified(true);
  }
  const notify = (message) =>
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  return (
    <div className="doclogin">
      <Navbar />
      <ToastContainer />
      <div className="doctor-login-form">
        <Header text="Doctor Login" />

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
        <ReCAPTCHA
          sitekey="6LeLtS4pAAAAAAEMPdg7NP87mv_zumyYHO6I3PiY
"
          onChange={onCaptchaChange}
        />
        <Button
          onClick={loginDoctor}
          className="doctor-login-btn"
          type="primary"
        >
          Login
        </Button>
      </div>
    </div>
  );
};
export default DoctorLogin;
