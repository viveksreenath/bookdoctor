import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../utils/axiosinstance";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment/moment";

import "./mybookings.css";

const MyBookings = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
  }, []);
  const getBookings = async () => {
    try {
      const response = await axios.get(
        `/patient/bookings/${localStorage.getItem("patient_id")}`
      );
      setItems(response.data);
      notify("Bookings listed successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onDeleteBooking = async (itemid) => {
    try {
      if (confirm("Are you sure to delete item?") == true) {
        //const response = await axios.delete(`/doctor/patient/booking/${itemid}`);
        toast.success("Patient booking deleted successfully");
      } else {
        toast.success("Delete cancelled");
      }
      getBookings();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Token Number",
      dataIndex: "token",
      key: "token",
    },
    {
      title: "Booked Date",
      dataIndex: "date",
      key: "date",
      render: (bookdate) => {
        return <p>{moment(bookdate).format("MMM Do YYYY")}</p>;
      },
    },
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "name",
      render: (doctor) => {
        return <p>{doctor.name}</p>;
      },
    },
    {
      title: "Department",
      dataIndex: "doctor",
      key: "doctor",
      render: async (doctor) => {
        const department = await axios.get(
          `/patient/department/${doctor.department}`
        );
        return <p>{department.data.name}</p>;
      },
    },
    {
      title: "Image",
      dataIndex: "doctor",
      key: "image",
      render: (doctor) => {
        return <img src={doctor.image} className="table-img" />;
      },
    },
    {
      title: "Prescription",
      dataIndex: "booking",
      key: "prescription",
    },
    {
      title: "Prescription Date",
      dataIndex: "booking",
      key: "date",
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "delete",
      render: (itemid) => {
        return (
          <DeleteOutlined
            onClick={() => onDeleteBooking(itemid)}
            style={{ fontSize: "16px", color: "red" }}
          />
        );
      },
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
        <Header text="My Bookings" />

        <Table dataSource={items} columns={columns} />
      </div>
    </div>
  );
};
export default MyBookings;
