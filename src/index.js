const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const app = express();
app.use(cors());

cloudinary.config({
  cloud_name: "CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dpyhtaokv",
  api_key: "783861832696417",
  api_secret: "lrUiAkWDkeMh_03ehK0R0W_B9lU"
});

app.get("/", (req, res) => {
  res.send("THOS Backend Running 🚀");
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running...");
});