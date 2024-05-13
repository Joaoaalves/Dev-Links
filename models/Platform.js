import mongoose from "mongoose";

const platformSchema = new mongoose.Schema(
  {
    name: String,
    color: String,
    textColor: String,
    icon: String,
    regex: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Platform ||
  mongoose.model("Platform", platformSchema);
