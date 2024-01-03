import express from "express";
import Doctor from "../db/Schema/doctorSchema.js";
import Booking from "../db/Schema/bookingSchema.js";
import Prescription from "../db/Schema/prescriptionSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

//Doctor

router.post("/doctor", async (req, res) => {
  try {
    await Doctor.create(req.body);
    res.status(201).json({ message: "Doctor details added Successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get(
  "/doctor",
  (req, res, next) => {
    checkToken(req, res, next, ["DOCTOR", "ADMIN"]);
  },
  async (req, res) => {
    try {
      const doctors = await Doctor.find().populate("department");
      res.status(200).json(doctors);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/doctor/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["DOCTOR", "ADMIN"]);
  },
  async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id);
      res.status(200).json(doctor);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/doctor/patient/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["DOCTOR"]);
  },
  async (req, res) => {
    try {
      const { id } = req.params;
      const bookings = await Booking.find({ doctor: id }).populate("patient");
      res.status(200).json(bookings);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/doctor/booking/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["DOCTOR"]);
  },
  async (req, res) => {
    try {
      const { id } = req.params;
      const patients = await Booking.findById(id);
      res.status(200).json(patients);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.post(
  "/doctor/add-prescription",
  (req, res, next) => {
    checkToken(req, res, next, ["DOCTOR"]);
  },
  async (req, res) => {
    try {
      await Prescription.create(req.body);
      res.status(200).json({ message: "Prescrption added Successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.delete(
  "/doctor/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      await Doctor.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json("Doctor details removed successfully");
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.patch(
  "/doctor/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["DOCTOR", "ADMIN"]);
  },
  async (req, res) => {
    try {
      const body = req.body;
      await Doctor.findByIdAndUpdate(req.params.id, body);
      res.status(200).json("Doctor details updated successfully");
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.post("/doctor/sign-up", async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctor.findOne({ username: body.username });
    if (doctor) {
      return res.status(409).json({ message: "Username already taken" });
    }
    if (body.password != body.confirmPassword) {
      return res.status(403).json({ message: "Passsword do not match" });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const doc = await Doctor.create(body);
    res.status(201).send({ message: "Doctor signed up successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/doctor/login", async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctor.findOne({ username: body.username });
    if (!doctor) {
      return res.status(401).json({ message: "Incorrect login credentials" });
    }
    const isMatching = await bcrypt.compare(body.password, doctor.password);
    if (!isMatching) {
      return res.status(401).json({ message: "Incorrect login credentials" });
    }
    const token = jwt.sign(
      { id: doctor._id, role: "DOCTOR" },
      "awsaddfjfgfhjgeroietnd34#$dfhdfdf90@#d",
      { expiresIn: "7d" }
    );
    return res.status(200).json({ message: "Login Successfull", token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
