const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

let lastLocation = null; // armazenar última localização

// Receber localização do app
app.post("/location", (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: "Lat/Lng são obrigatórios" });
  }
  lastLocation = { lat, lng, timestamp: new Date() };
  res.json({ status: "ok", lastLocation });
});

// Retornar última localização
app.get("/location", (req, res) => {
  if (!lastLocation) return res.json({ status: "vazio" });
  res.json(lastLocation);
});

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
