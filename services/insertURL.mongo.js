import mongoose from "mongoose";
import UrlModel from "../models/url.model.js"

const insertURL = async ({ url, code, id, title = '', tags = [] }) => {
  try {
    const userId = new mongoose.Types.ObjectId(id)
    const newUrl = new UrlModel({ url, id:code, title, tags, userId });
    await newUrl.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Custom ID already exists. Please choose a different one.");
    } else if (error.name === 'ValidationError') {
      throw new Error("Invalid URL format. Please enter a valid URL.");
    }
    throw new Error("Error inserting URL.");
  }
};

export default insertURL;
