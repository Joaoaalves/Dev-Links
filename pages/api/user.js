import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import Link from "@/models/Link";

export default async function handler(req, res) {
  if (req.method === "GET") return GET(req, res);

  return res.status(405).json({ message: "Method not allowed" });
}

async function GET(req, res) {
  try {
    await connectDB();

    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    try {
      // Throws error when user_id is string (Custom Url)
      const user = await User.findById(user_id).populate('links')

      if (user) {
        return res.status(200).json({ user });
      }

      return res.status(404).json({ message: "User not found." });
    } catch (error) {
      const user = await User.find({
        customUrl: user_id
      }).populate('links')

      if(user){
        return res.status(200).json({user})
      }

      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
