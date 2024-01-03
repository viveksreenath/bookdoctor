import { NavLink } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const onInputChange = (e) => {
    setText(e.target.value);
  };
  const onBtnClickSbmt = () => {
    text == "home" ? navigate(`/`) : navigate(`/${text}`);
  };

  const onKeyDown = (e) => {
    if (e.key == "Enter" && text) {
      onBtnClickSbmt();
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doc_id");
    navigate(`/doctor/login`);
  };
  return (
    <div className="navbar">
      <p>
        <NavLink className="link" to="/">
          Home
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/admin/home">
          Admin Home
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/admin/login">
          Admin Login
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/doctor/list">
          Doctor List
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/doctor/home">
          Doctor Home
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/doctor/login">
          Doctor Login
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/doctor/signup">
          Doctor Sign Up
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/patient/home">
          Patient Home
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/patient/mybookings">
          My Bookings
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/patient/login">
          Patient Login
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/patient/signup">
          Patient Sign Up
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/pharmacy">
          List Pharmacy
        </NavLink>
      </p>
      <p>
        <NavLink className="link" to="/pharmacy/add">
          Add Pharmacy
        </NavLink>
      </p>
      <p onClick={onLogout}>Logout</p>
      {/* <Input value={text} onchange={onInputChange} onKeyDown={onKeyDown} /> */}
      {/* <Button text="Redirect" onClick={onBtnClickSbmt} /> */}
    </div>
  );
};
export default Navbar;
