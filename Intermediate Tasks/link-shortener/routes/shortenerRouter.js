import express from "express";
import Url from "../model/urlModel.js";
import { customAlphabet } from "nanoid/non-secure";

const router = express.Router();

router.post("/shortener", async (req, res) => {
  const { originalUrl } = req.body;
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const urlCode = nanoid();

  try {
    let url = await Url.findOne({ originalUrl });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${req.protocol}://${req.get("host")}/${urlCode}`;
      url = new Url({
        originalUrl,
        shortUrl,
        urlCode,
      });

      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

export default router;
