import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 🔧 Setup path agar bisa berjalan di lingkungan Vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// ✅ Sajikan file statis (gambar) dari folder public
app.use(express.static(path.join(__dirname, "../public")));

const plantsPath = path.join(__dirname, "../plants.json");

// ✅ Load data tanaman
let plants = [];
try {
  const data = fs.readFileSync(plantsPath, "utf8");
  plants = JSON.parse(data);
  console.log("✅ plants.json loaded successfully");
} catch (err) {
  console.error("❌ Error loading plants.json:", err.message);
}

// 🌿 Endpoint utama (semua tanaman)
app.get("/", (req, res) => {
  res.json(plants);
});

// 🌿 Endpoint detail tanaman berdasarkan ID
app.get("/plants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const plant = plants.find((p) => p.id === id);
  if (!plant) {
    return res.status(404).json({ message: "Tanaman tidak ditemukan" });
  }
  res.json(plant);
});

// 🚀 Export app untuk dijalankan oleh Vercel
export default app;
