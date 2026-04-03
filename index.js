const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/coords", (req, res) => {
  const { x, z } = req.body;

  const file = "data.json";
  let data = [];

  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file));
  }

  data.push({ x, z });

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  res.json({ status: "saved" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running at port: " + port);
});
