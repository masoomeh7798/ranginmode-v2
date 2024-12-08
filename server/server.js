import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.DATA_BASE_URL)
  .then(() => {
    console.log("db is running");
  })
  .catch(() => {
    console.log("db connection is failed");
  });

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

