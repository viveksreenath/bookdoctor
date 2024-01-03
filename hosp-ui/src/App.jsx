import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin/AdminHome";
import AdminLogin from "./pages/Admin/AdminLogin";
import ListPharmacy from "./pages/Pharmacy/ListPharmacy";
import PostPharmacy from "./pages/Pharmacy/PostPharmacy";
import DoctorList from "./pages/Doctor/DoctorList";
import DoctorLogin from "./pages/Doctor/DoctorLogin";
import DoctorSignup from "./pages/Doctor/DoctorSignup";
import DoctorHome from "./pages/Doctor/DoctorHome";
import AddPrescription from "./pages/Doctor/AddPrescription";
import PatientLogin from "./pages/Patient/PatientLogin";
import PatientSignup from "./pages/Patient/PatientSignup";
import PatientHome from "./pages/Patient/PatientHome";
import DepDoctorList from "./pages/Patient/DoctorList";
import BookDoctor from "./pages/Patient/BookDoctor";
import MyBookings from "./pages/Patient/MyBookings";
import NoRouteFound from "./pages/NoRouteFound";
import Navbar from "./components/Navbar";
import CheckDocAuth from "./components/CheckDocAuth";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin/home" element={<Admin />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/pharmacy" element={<ListPharmacy />}></Route>
        <Route path="/pharmacy/add" element={<PostPharmacy />}></Route>
        <Route path="/pharmacy/edit/:id" element={<PostPharmacy />}></Route>
        <Route path="/doctor/list" element={<DoctorList />}></Route>
        <Route path="/doctor/login" element={<DoctorLogin />}></Route>
        <Route path="/doctor/signup" element={<DoctorSignup />}></Route>
        <Route
          path="/doctor/home"
          element={
            <CheckDocAuth>
              <DoctorHome />
            </CheckDocAuth>
          }
        ></Route>
        <Route
          path="/doctor/add-prescription/:id"
          element={<AddPrescription />}
        ></Route>
        <Route path="/patient/login" element={<PatientLogin />}></Route>
        <Route path="/patient/signup" element={<PatientSignup />}></Route>
        <Route path="/patient/home" element={<PatientHome />}></Route>
        <Route
          path="/patient/DoctorList/:id"
          element={<DepDoctorList />}
        ></Route>
        <Route path="/patient/bookDoctor/:id" element={<BookDoctor />}></Route>
        <Route path="/patient/myBookings" element={<MyBookings />}></Route>

        <Route path="*" element={<NoRouteFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
