import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../utils/axiosinstance";
import { Card, Image, Button, Input } from "antd";

import "./bookdoctor.css";

const BookDoctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const navigate = useNavigate();

  const [cred, setCred] = useState({
    patient: localStorage.getItem("patient_id"),
    doctor: id,
    date: "",
  });
  const onInputChange = (e, key) => {
    setCred({ ...cred, [key]: e.target.value });
  };
  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/patient/doctor/${id}`
      );
      const doctorArray = {
        id: response.data.id,
        title: response.data.name,
        image: response.data.image,
        qualification: response.data.qualification,
      };
      setDoctor(doctorArray);
      notify("Doctor details listed successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onClickBook = (itemid) => {
    navigate(`/patient/DoctorList/${itemid}`);
  };
  const bookSlot = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/patient/book/doctor/",
        cred
      );
      notify(response.data.message);
      getDoctor();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const notify = (message) =>
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Header text="Doctor Details - Book a Slot" />
      <div>
        <Card title={doctor.title}>
          <Image width={200} height={150} src={doctor.image} />
          <p className="qualPClass">
            <label>Qualification:</label>
            <span className="qualClass">{doctor.qualification}</span>
          </p>
        </Card>
      </div>
      <div>
        <div>
          <label>Date:</label>
          <Input
            style={{
              width: 200,
              margin: 10,
            }}
            onChange={(e) => {
              onInputChange(e, "date");
            }}
            type="date"
            value={cred.date}
          />
        </div>
        <div>
          <Button
            onClick={bookSlot}
            className="patient-signup-btn"
            type="primary"
          >
            Book a Slot
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BookDoctor;
