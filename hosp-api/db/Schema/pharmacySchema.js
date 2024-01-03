import { Schema, model } from "mongoose";

const pharmacySchema = Schema({
  name: { type: String, require: true },
  description: { type: String },
  image: String,
  price: { type: Number, require: true },
  brand: String,
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  instock: {
    type: Boolean,
    default: true,
  },
  quantity: {
    type: Number,
    default: 10,
  },
});

const Pharmacy = model("Pharmacy", pharmacySchema);
export default Pharmacy;
