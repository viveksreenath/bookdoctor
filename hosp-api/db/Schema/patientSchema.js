import { Schema, model } from "mongoose";

const patientSchema = Schema({
  name: { type: String, require: true },
  image: String,
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Patient = model("Patient", patientSchema);
export default Patient;
