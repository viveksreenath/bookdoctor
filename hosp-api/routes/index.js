import express from "express";
import AdminRoutes from "./admin-routes.js";
import DoctorRoutes from "./doctor-routes.js";
import PatientRoutes from "./patient-routes.js";
import ImageRoutes from "./image-route.js";

const router = express.Router();

router.use(AdminRoutes);
router.use(DoctorRoutes);
router.use(PatientRoutes);
router.use(ImageRoutes);

export default router;
