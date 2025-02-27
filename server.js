import express from "express";

const app = express();

app.use(express.static("public"));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
