import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// inisialisasi express
const app = express();

// ambil data dari plants.json
const plants = JSON.parse(
  readFileSync(path.join(__dirname, "../plants.json"), "utf8")
);

app.use(cors());

// endpoint utama: tampilkan semua tanaman
app.get("/", (req, res) => {
  res.json(plants);
});

// endpoint tambahan: tanaman berdasarkan id
app.get("/plants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const plant = plants.find((p) => p.id === id);
  if (!plant) return res.status(404).json({ message: "Tanaman tidak ditemukan" });
  res.json(plant);
});

// export ke Vercel (tidak perlu app.listen)
export default app;
