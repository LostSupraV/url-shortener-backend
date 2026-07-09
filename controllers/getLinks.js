import mongoose from "mongoose";
import UrlModel from "../models/url.model.js";

const getLinks = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const links = await UrlModel.find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ links });
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ error: "Failed to fetch links" });
  }
};

// const getLinks = (req, res) => {
//   const user = req.user
//   res.json({user})
// }


export default getLinks;
