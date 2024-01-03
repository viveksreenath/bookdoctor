import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Button, Select, Switch, Upload, Image } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../utils/axiosinstance";

import "./addprescription.css";

const AddPrescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prescription, setPrescription] = useState({
    prescription: "",
    doctor: localStorage.getItem("doc_id"),
    patient: "",
    booking: id,
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getBookingDetails();
  }, []);
  const getBookingDetails = async () => {
    try {
      const booking = await axios.get(`/doctor/booking/${id}`);
      setPrescription({ ...prescription, patient: booking.data.patient });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onInputChange = (e, key) => {
    let value = e.target.value;
    setPrescription({ ...prescription, [key]: value });
  };

  const postPrescription = async () => {
    try {
      const response = await axios.post(
        `/doctor/add-prescription`,
        prescription
      );
      notify(response.data.message);
      navigate("/doctor/home");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const notify = (message) =>
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
    });

  return (
    <div className="postpharmacy">
      <Navbar />
      <Header text={"Add Prescription"} />
      <div className="pharmacy-form">
        <div className="pharmacy-form-left">
          <div className="pharmacy-input">
            <label>Prescription:</label>
            <Input.TextArea
              value={prescription.prescription}
              rows={3}
              onChange={(e) => {
                onInputChange(e, "prescription");
              }}
            />
          </div>
          <div className="pharmacy-input btn-display">
            <Button
              size="large"
              style={{ marginTop: "70px", width: "fit-content" }}
              onClick={postPrescription}
              className="post-pharmacy-btn"
              type="primary"
            >
              ADD PRESCRIPTION
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddPrescription;
