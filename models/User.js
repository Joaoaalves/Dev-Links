import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    image: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    links: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
