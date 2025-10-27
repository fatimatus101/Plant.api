import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// 🔹 Tambahkan ini untuk melayani gambar
app.use(express.static("public"));

const plantsPath = path.resolve(process.cwd(), "plants.json");

let plants = [];
try {
  const data = fs.readFileSync(plantsPath, "utf8");
  plants = JSON.parse(data);
  console.log("✅ plants.json loaded successfully");
} catch (err) {
  console.error("❌ Error loading plants.json:", err.message);
}

app.get("/", (req, res) => {
  res.json(plants);
});

app.get("/plants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const plant = plants.find((p) => p.id === id);
  if (!plant) {
    return res.status(404).json({ message: "Tanaman tidak ditemukan" });
  }
  res.json(plant);
});

export default app;
