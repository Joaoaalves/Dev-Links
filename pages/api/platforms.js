import { connectDB } from "@/lib/connectDB";
import Platform from "@/models/Platform";

export default async function handler(req, res) {

  if(req.method === 'GET') return GET(res);

  return res.status(405).json({message: "Method not allowed."})
}


async function GET(res){
  try {
    await connectDB();

    const platforms = await Platform.find();

    if (platforms) return res.status(200).json({ platforms });

    return res.status(404).json({ message: "Platforms not found" });
  } catch (error) {
    console.error("Error importing platforms:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}