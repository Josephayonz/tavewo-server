import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    workEmail: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, trim: true },
    projectType: { type: String, trim: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("ContactSubmission", contactSchema);
