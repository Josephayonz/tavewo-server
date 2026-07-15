import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tavewo-client.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (req, res) => res.send("API is running..."));
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
