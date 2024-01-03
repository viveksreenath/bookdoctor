import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../utils/axiosinstance";
import { Card, List, Image } from "antd";

import "./doctorlist.css";

const DepDoctorList = () => {
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/patient/department/doctor/${id}`
      );
      const doctorArray = response.data.map((item) => {
        return {
          id: item._id,
          title: item.name,
          image: item.image,
          qualification: item.qualification,
        };
      });
      console.log(response.data);
      setDoctors(doctorArray);
      notify("Doctors listed successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const onClickDoctor = (itemid) => {
    navigate(`/patient/bookDoctor/${itemid}`);
  };
  const notify = (message) =>
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Header text="List Doctors by Departments" />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={doctors}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title} onClick={() => onClickDoctor(item.id)}>
              <Image width={200} height={150} src={item.image} />
              <p className="qualPClass">
                <label>Qualification:</label>
                <span className="qualClass">{item.qualification}</span>
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default DepDoctorList;
