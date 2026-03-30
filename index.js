const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const app = express();
app.use(cors());

cloudinary.config({
  cloud_name: "dpyhtaokv",
  api_key: "CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dpyhtaokv",
  api_secret: "6Sji2giVOkd0iIpNzDcx8S8ghXY"
});

app.get("/reels", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("folder:reels")
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const videos = result.resources.map(item => ({
      video: item.secure_url
    }));

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running...");
});