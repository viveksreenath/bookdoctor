import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const CheckDocAuth = (props) => {
  const token = localStorage.getItem("token");
  if (token) {
    const { role } = jwtDecode(token);
    if (role == "DOCTOR") {
      return <>{props.children}</>;
    } else {
      return <Navigate to="/doctor/login" />;
    }
  } else {
    return <Navigate to="/doctor/login" />;
  }
};

export default CheckDocAuth;
