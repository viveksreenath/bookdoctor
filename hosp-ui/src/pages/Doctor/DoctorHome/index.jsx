import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../utils/axiosinstance";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment/moment";

import "./doctorhome.css";

const DoctorHome = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPatients();
  }, []);
  const getPatients = async () => {
    try {
      const response = await axios.get(
        `/doctor/patient/${localStorage.getItem("doc_id")}`
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
      getPatients();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onAddPrescription = (itemid) => {
    navigate(`/doctor/add-prescription/${itemid}`);
  };
  const columns = [
    {
      title: "Patient ID",
      dataIndex: "patient",
      key: "_id",
      render: (patient) => {
        return <p>{patient._id}</p>;
      },
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
      title: "Name",
      dataIndex: "patient",
      key: "name",
      render: (patient) => {
        return <p>{patient.name}</p>;
      },
    },
    {
      title: "Address",
      dataIndex: "patient",
      key: "address",
      render: (patient) => {
        return <p>{patient.address}</p>;
      },
    },
    {
      title: "Image",
      dataIndex: "patient",
      key: "image",
      render: (patient) => {
        return <img src={patient.image} className="table-img" />;
      },
    },
    {
      title: "DOB",
      dataIndex: "patient",
      key: "dob",
      render: (patient) => {
        return <p>{moment(patient.dob).format("MMM Do YYYY")}</p>;
      },
    },

    {
      title: "Add Prescription",
      dataIndex: "_id",
      key: "edit",
      render: (id) => {
        return (
          <EditOutlined
            onClick={() => onAddPrescription(id)}
            style={{ fontSize: "16px", color: "blue" }}
          />
        );
      },
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
        <Header text="Bookings" />
        <div className="addPharmacy">
          <Button
            style={{ color: "white" }}
            type="primary"
            onClick={() => {
              navigate("/pharmacy/add");
            }}
          >
            ADD
          </Button>
        </div>
        <Table dataSource={items} columns={columns} />
      </div>
    </div>
  );
};
export default DoctorHome;
