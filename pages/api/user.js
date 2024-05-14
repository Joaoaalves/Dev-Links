import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method === "GET") return GET(req, res);

  return res.status(405).json({ message: "Method not allowed" });
}

async function GET(req, res) {
  try {
    await connectDB();
    
    const { user_id } = req.query;
    if (!user_id || notValidId(user_id)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    const user = await User.findById(user_id);
    
    if (user) {
      return res.status(200).json({ user });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

function notValidId(id){
  return id.length !== 24
}