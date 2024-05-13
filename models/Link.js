import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
    {
      platform: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Platform",
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );

  export default mongoose.models.Link || mongoose.model("Link", linkSchema);