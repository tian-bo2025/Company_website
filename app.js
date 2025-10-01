const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Express server is running on Railway!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
