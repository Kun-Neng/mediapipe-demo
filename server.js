import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sendFileWithFallback from "./middlewares/sendFileWithFallback.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/llm_inference");
});

app.get("/llm_inference", sendFileWithFallback(path.join(__dirname, "public/llm_inference", "index.html")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
