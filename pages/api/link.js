import Link from "@/models/Link";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const session = await getSession(req, res);
    const user = await findUser(session);

    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }

    await clearOldLinks(user._id);

    const { links } = req.body;

    const newLinkIds = await createOrUpdateLinks(links);
    const updatedUser = await updateUserLinks(user._id, newLinkIds);

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating links:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getSession(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    throw new Error("Access Denied");
  }
  return session;
}

async function findUser(session) {
  return await User.findOne({ email: session.user.email }, { password: 0 });
}

async function createOrUpdateLinks(links) {
  return await Promise.all(
    links.map(async (link) => {
      const isExistingLink = link._id.length === 24;

      if (isExistingLink) {
        return link._id;
      }

      const { _id, ...linkData } = link;

      const newLink = await Link.create(linkData);
      return newLink._id;
    }),
  );
}

async function updateUserLinks(userId, newLinkIds) {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { links: newLinkIds } },
    { new: true },
  );
}

async function clearOldLinks(user) {
  if (!user?.links) return;

  return await Promise.all(
    user.links.map(async (link) => {
      await Link.findByIdAndDelete(link._id);
    }),
  );
}