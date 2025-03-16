import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/llm_inference");
});

app.get("/llm_inference", (req, res) => {
  res.sendFile(path.join(__dirname, "public/llm_inference", "index.html"));
});

app.get("/face_stylizer", (req, res) => {
  res.sendFile(path.join(__dirname, "public/face_stylizer", "index.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
