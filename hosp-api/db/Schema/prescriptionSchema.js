import { Schema, model } from "mongoose";

const prescriptionSchema = Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  date: { type: Date, required: true, default: Date.now() },
  prescription: { type: String, required: true },
  booking: { type: Schema.Types.ObjectId, ref: "Booking" },
});

const Prescription = model("Prescription", prescriptionSchema);
export default Prescription;
