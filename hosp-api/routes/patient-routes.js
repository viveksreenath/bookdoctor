import express from "express";
import Patient from "../db/Schema/patientSchema.js";
import Doctor from "../db/Schema/doctorSchema.js";
import Department from "../db/Schema/departmentSchema.js";
import Booking from "../db/Schema/bookingSchema.js";
import Prescription from "../db/Schema/prescriptionSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

//Patient

router.post("/patient", async (req, res) => {
  try {
    await Patient.create(req.body);
    res.status(201).json({ message: "Patient details added Successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get(
  "/patient/department",
  (req, res, next) => {
    checkToken(req, res, next, ["PATIENT"]);
  },
  async (req, res) => {
    try {
      const departments = await Department.find();
      res.status(200).json(departments);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/patient/department/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["PATIENT"]);
  },
  async (req, res) => {
    try {
      const { id } = req.params;
      const department = await Department.findById(id);
      res.status(200).json(department);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/patient",
  (req, res, next) => {
    checkToken(req, res, next, ["DOCTOR", "ADMIN"]);
  },
  async (req, res) => {
    try {
      const Patients = await Patient.find().populate("department");
      res.status(200).json(Patients);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/patient/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["DOCTOR", "ADMIN", "PATIENT"]);
  },
  async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
      res.status(200).json(patient);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.delete(
  "/patient/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      await Patient.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ message: "Patient details removed successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.patch(
  "/patient/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["PATIENT"]);
  },
  async (req, res) => {
    try {
      const body = req.body;
      await Patient.findByIdAndUpdate(req.params.id, body);
      res.status(200).json({ message: "Patient details updated successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.post("/patient/sign-up", async (req, res) => {
  try {
    const body = req.body;
    const patient = await Patient.findOne({ username: body.username });
    if (patient) {
      return res.status(409).json({ message: "Username already taken" });
    }
    if (body.password != body.confirmPassword) {
      return res.status(403).json({ message: "Passsword do not match" });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const doc = await Patient.create(body);
    res.status(201).send({ message: "Patient signed up successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/patient/login", async (req, res) => {
  try {
    const body = req.body;
    const patient = await Patient.findOne({ username: body.username });
    if (!patient) {
      return res.status(401).json({ message: "Incorrect login credentials" });
    }
    const isMatching = await bcrypt.compare(body.password, patient.password);
    if (!isMatching) {
      return res.status(401).json({ message: "Incorrect login credentials" });
    }
    const token = jwt.sign(
      { id: patient._id, role: "PATIENT" },
      "awsaddfjfgfhjgeroietnd34#$dfhdfdf90@#d",
      { expiresIn: "7d" }
    );
    return res.status(200).json({ message: "Login Successfull", token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get(
  "/patient/department/doctor/:dep_id",
  (req, res, next) => {
    checkToken(req, res, next, ["PATIENT"]);
  },
  async (req, res) => {
    try {
      const dep_id = req.params.dep_id;
      const doctors = await Doctor.find({ department: dep_id });
      res.status(200).json(doctors);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/patient/doctor/:doc_id",
  (req, res, next) => {
    checkToken(req, res, next, ["PATIENT"]);
  },
  async (req, res) => {
    try {
      const doc_id = req.params.doc_id;
      const doctors = await Doctor.findById(doc_id);
      res.status(200).json(doctors);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.post(
  "/patient/book/doctor",
  (req, res, next) => {
    checkToken(req, res, next, ["PATIENT"]);
  },
  async (req, res) => {
    try {
      const body = req.body;
      const bookings = await Booking.find({
        date: body.date,
        doctor: body.doctor,
      });
      body.token = bookings.length + 1;
      await Booking.create(body);
      res
        .status(200)
        .json({ message: `Your booking done, token number is ${body.token}` });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/patient/bookings/:id",
  // (req, res, next) => {
  //   checkToken(req, res, next, ["PATIENT"]);
  // },
  async (req, res) => {
    try {
      const { id } = req.params;
      const bookings = await Booking.find({ patient: id }).populate("doctor");
      res.status(200).json(bookings);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);
export default router;
