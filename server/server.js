import { app } from "./app.js";
import { config } from "dotenv";
import {connectDatabase} from "./config/DB.js"
import cloudinary from "cloudinary"

config({
  path: "./config/.env",
});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDatabase()
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
