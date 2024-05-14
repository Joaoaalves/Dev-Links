import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import Link from "@/models/Link";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
  
    if (!session || !session.user)
      return res.status(403).json({ message: "Access Denied!" });
    
    if (req.method === "GET") return GET(res, session);
    if (req.method === "POST") return POST(req, res, session);

    return res.status(405).json({message: "Method not allowed"})
}

async function POST(req, res, session) {
    try {
      await connectDB();
      var { firstName, lastName, image } = req.body;
  
      if (image) {
        const uploadResult = await cloudinary.uploader.upload(image, {
          folder: "profile_images",
        });
        image = uploadResult.url;
        console.log("Image saved successfully!\n", uploadResult);
      }
      await User.findOneAndUpdate(
        { email: session.user.email },
        { firstName, lastName, image },
        { new: true },
      );
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user info:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function GET(res, session) {
    try {
      await connectDB();
      const user = await User.findOne(
        { email: session.user.email },
        { password: 0 },
      ).populate("links");
  
      if (user) {
        return res.status(201).json({ user });
      }
  
      return res.stats(404).json({ message: "Invalid user" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }