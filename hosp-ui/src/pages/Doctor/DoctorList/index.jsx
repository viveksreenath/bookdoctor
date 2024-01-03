import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Table } from "antd";

import "./doctorlist.css";

const DoctorList = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getDoctors();
  }, []);
  const getDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctor");
      setItems(response.data);
      notify("Doctors listed successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (data) => {
        return <img src={data} className="table-img" />;
      },
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department.name",
      render: (data) => {
        return data.name;
      },
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
  ];
  const notify = (message) =>
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="list-pharmacy">
        <Header text="Doctor List" />
        <Table dataSource={items} columns={columns} />
      </div>
    </div>
  );
};
export default DoctorList;
