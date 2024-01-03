import { Schema, model } from "mongoose";

const bookingSchema = Schema({
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
  date: { type: Date, required: true },
  token: { type: Number, required: true, max: 50 },
});

const Booking = model("Booking", bookingSchema);
export default Booking;
