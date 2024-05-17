import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  urlCode: String,
  date: { type: String, default: Date.now },
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
