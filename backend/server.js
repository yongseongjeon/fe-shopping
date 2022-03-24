import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

app.listen(PORT, () => {
  console.log(`✅ listening on http://localhost:${PORT}/`);
});

app.use(cors());

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "autoComplete.json"));
});
