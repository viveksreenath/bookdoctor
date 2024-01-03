import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../utils/axiosinstance";
import { Card, List, Image } from "antd";

import "./patienthome.css";

const PatientHome = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      const response = await axios.get("/patient/department");
      const departmentArray = response.data.map((item) => {
        return { id: item._id, title: item.name, image: item.image };
      });
      setDepartments(departmentArray);
      notify("Departments listed successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onClickDept = (itemid) => {
    navigate(`/patient/DoctorList/${itemid}`);
  };
  const notify = (message) =>
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Header text="Patient Home - List Departments" />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={departments}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title} onClick={() => onClickDept(item.id)}>
              <Image width={200} height={150} src={item.image} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default PatientHome;
