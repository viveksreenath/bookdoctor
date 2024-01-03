import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../utils/axiosinstance";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import "./listpharmacy.css";

const ListPharmacy = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPharmacy();
  }, []);
  const getPharmacy = async () => {
    try {
      const response = await axios.get("/pharmacy");
      setItems(response.data);
      notify("Pharmacy listed successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onDeletePharmacy = async (itemid) => {
    try {
      if (confirm("Are you sure to delete item?") == true) {
        const response = await axios.delete(`/pharmacy/${itemid}`);
        toast.success("Pharmacy deleted successfully");
      } else {
        toast.success("Delete cancelled");
      }
      getPharmacy();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onEditPharmacy = (itemid) => {
    navigate(`/pharmacy/edit/${itemid}`);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department.name",
      render: (data) => {
        return data ? data.name : "";
      },
    },
    {
      title: "Instock",
      dataIndex: "instock",
      key: "instock",
      render: (data) => {
        return data == true ? "Yes" : "No";
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Edit",
      dataIndex: "_id",
      key: "edit",
      render: (itemid) => {
        return (
          <EditOutlined
            onClick={() => onEditPharmacy(itemid)}
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
            onClick={() => onDeletePharmacy(itemid)}
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
        <Header text="Pharmacy" />
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
export default ListPharmacy;
