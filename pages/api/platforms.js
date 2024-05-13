import { connectDB } from "@/lib/connectDB";
import Platform from "@/models/Platform";
import { getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";

export default async function handler(req, res) {
    
    const session = await getServerSession(req, res, authOptions)

    if(!session || !session.user)
            return res.status(405).json({message: 'Access Denied!'})
    try {
        await connectDB();
        
        const platforms = await Platform.find()

        if(platforms)
            return res.status(200).json({platforms})

        return res.status(404).json({message: "Platforms not found"})
  } catch (error) {
    console.error("Error importing platforms:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}