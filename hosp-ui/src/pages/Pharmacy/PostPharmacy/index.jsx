import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Button, Select, Switch, Upload, Image } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "./postpharmacy.css";

const PostPharmacy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    brand: "",
    department: "",
    instock: false,
    quantity: "",
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
    if (id) {
      getPharmacy();
    }
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/department");
      const options = response.data.map((item) => {
        return { value: item._id, label: item.name };
      });
      setDepartments(options);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getPharmacy = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pharmacy/${id}`);

      /*const {
        name,
        description,
        image,
        price,
        brand,
        department,
        instock,
        quantity,
      } = response.data;

      setPharmacy(
        ...pharmacy,
        name,
        description,
        image,
        price,
        brand,
        department,
        instock,
        quantity
      );*/

      setPharmacy(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onInputChange = (e, key) => {
    let value = e.target.value;
    if (key == "price" || key == "quantity") {
      value = parseFloat(e.target.value);
    }
    setPharmacy({ ...pharmacy, [key]: value });
  };
  const checkInstock = (e) => {
    setPharmacy({ ...pharmacy, instock: e });
  };
  const onSelect = (e) => {
    setPharmacy({ ...pharmacy, department: e });
  };
  const onUploadChange = (info) => {
    if (info.file.status === "done") {
      setPharmacy({ ...pharmacy, image: info.file.response.url });
    }
  };

  const postPharmacy = async () => {
    try {
      if (id) {
        const response = await axios.patch(
          `http://localhost:3000/pharmacy/${id}`,
          pharmacy
        );
      } else {
        const response = await axios.post(
          "http://localhost:3000/pharmacy",
          pharmacy
        );
      }
      //notify(response.data.message);
      navigate("/pharmacy");
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
      <Header text={id ? "Edit Pharmacy" : "Add Pharmacy"} />
      <div className="pharmacy-form">
        <div className="pharmacy-form-left">
          <div className="pharmacy-input">
            <label>Name:</label>
            <Input
              value={pharmacy.name}
              onChange={(e) => {
                onInputChange(e, "name");
              }}
            />
          </div>
          <div className="pharmacy-input">
            <label>Description:</label>
            <Input.TextArea
              value={pharmacy.description}
              rows={3}
              onChange={(e) => {
                onInputChange(e, "description");
              }}
            />
          </div>
          <div className="pharmacy-input">
            <label>Price:</label>
            <Input
              type="number"
              value={pharmacy.price}
              onChange={(e) => {
                onInputChange(e, "price");
              }}
            />
          </div>
          <div className="pharmacy-input">
            <label>Department:</label>
            <Select
              options={departments}
              onChange={onSelect}
              value={pharmacy.department}
            />
          </div>
        </div>
        <div className="pharmacy-form-right">
          <div className="pharmacy-input">
            <label>Brand:</label>
            <Input
              value={pharmacy.brand}
              onChange={(e) => {
                onInputChange(e, "brand");
              }}
            />
          </div>
          <div className="pharmacy-input">
            <label>Quantity:</label>
            <Input
              type="number"
              value={pharmacy.quantity}
              onChange={(e) => {
                onInputChange(e, "quantity");
              }}
            />
          </div>
          <div className="pharmacy-input">
            <label>Image:</label>
            <Upload
              name="file"
              action="http://localhost:3000/upload"
              onChange={onUploadChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <Image
              className="upload-image"
              src={pharmacy.image}
              width="100px"
            />
          </div>
          <div className="pharmacy-input">
            <label>Instock:</label>
            <Switch
              onChange={checkInstock}
              style={{ width: "70px" }}
              checked={pharmacy.instock}
            />
          </div>
          <div className="pharmacy-input btn-display">
            <Button
              size="large"
              style={{ marginTop: "70px", width: "fit-content" }}
              onClick={postPharmacy}
              className="post-pharmacy-btn"
              type="primary"
            >
              {id ? "UPDATE" : "ADD"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostPharmacy;
