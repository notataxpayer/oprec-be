const express = require("express");
const cors = require("cors");
require("dotenv").config();
const supabase = require("./db/config");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.status(404).send("Not found");
});

app.get("/transparansi/:nim", async (req, res) => {
  const { nim } = req.params;
  const { data: link_transparansi, error } = await supabase
    .from("bem2024_OprecStaffAhli")
    .select("link_transparansi")
    .eq("nim", nim)
    .single();
  if (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
  if (!link_transparansi) {
    return res.status(404).send({
      success: false,
      message: "Data tidak ditemukan",
    });
  }
  return res.send({
    success: true,
    data: link_transparansi,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
