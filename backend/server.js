const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ listening on http://localhost:${PORT}/`);
});

app.use(cors());

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "autoComplete.json"));
});
