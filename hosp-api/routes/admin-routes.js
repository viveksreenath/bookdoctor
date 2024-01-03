import express from "express";
import Pharmacy from "../db/Schema/pharmacySchema.js";
import Department from "../db/Schema/departmentSchema.js";
import Admin from "../db/Schema/adminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

//Department

router.post(
  "/department",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      await Department.create(req.body);
      res
        .status(201)
        .json({ message: "Department details added Successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/department",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
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
  "/department/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      res.status(200).json(department);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.delete(
  "/department/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      await Department.findByIdAndDelete({ _id: req.params.id });
      res
        .status(200)
        .json({ message: "Department details removed successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.patch(
  "/department/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      const body = req.body;
      await Department.findByIdAndUpdate(req.params.id, body);
      res
        .status(200)
        .json({ message: "Department details updated successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

//Pharmacy

router.post(
  "/pharmacy",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      await Pharmacy.create(req.body);
      res.status(201).json({ message: "Pharmacy details added Successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/pharmacy",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      const pharmacies = await Pharmacy.find().populate("department");
      res.status(200).json(pharmacies);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get(
  "/pharmacy/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      const pharmacy = await Pharmacy.findById(req.params.id);
      res.status(200).json(pharmacy);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.delete(
  "/pharmacy/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      await Pharmacy.findByIdAndDelete({ _id: req.params.id });
      res
        .status(200)
        .json({ message: "Pharmacy details removed successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.patch(
  "/pharmacy/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      const body = req.body;
      await Pharmacy.findByIdAndUpdate(req.params.id, body);
      res
        .status(200)
        .json({ message: "Pharmacy details updated successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

//Admin

router.post("/admin", async (req, res) => {
  try {
    await Admin.create(req.body);
    res.status(201).json({ message: "Admin details added Successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/admin", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get(
  "/admin/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);
      res.status(200).json(admin);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.delete(
  "/admin/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      await Admin.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ message: "Admin details removed successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.patch(
  "/admin/:id",
  (req, res, next) => {
    checkToken(req, res, next, ["ADMIN"]);
  },
  async (req, res) => {
    try {
      const body = req.body;
      await Admin.findByIdAndUpdate(req.params.id, body);
      res.status(200).json({ message: "Admin details updated successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.post("/admin/sign-up", async (req, res) => {
  try {
    const body = req.body;
    const admin = await Admin.findOne({ username: body.username });
    if (admin) {
      return res.status(409).json({ message: "Username already taken" });
    }
    if (body.password != body.confirmPassword) {
      return res.status(403).json({ message: "Passsword do not match" });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const doc = await Admin.create(body);
    res.status(201).send({ message: "Admin signed up successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    const body = req.body;
    const admin = await Admin.findOne({ username: body.username });
    if (!admin) {
      return res.status(401).json({ message: "Incorrect login credentials" });
    }
    const isMatching = await bcrypt.compare(body.password, admin.password);
    if (!isMatching) {
      return res.status(401).json({ message: "Incorrect login credentials" });
    }
    const token = jwt.sign(
      { id: admin._id, role: "ADMIN" },
      "awsaddfjfgfhjgeroietnd34#$dfhdfdf90@#d",
      { expiresIn: "7d" }
    );
    return res.status(200).json({ message: "Login Successfull", token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
