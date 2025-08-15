const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Armazenamento em memória (temporário)
let locations = [];

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor de monitoramento rodando!");
});

// Receber localização do app
app.post("/location", (req, res) => {
  const { lat, lng, device } = req.body;

  if (!lat || !lng || !device) {
    return res.status(400).json({ status: "error", message: "Dados incompletos" });
  }

  const timestamp = new Date().toISOString();
  locations.push({ device, lat, lng, timestamp });

  console.log(`[📍] ${device} - Lat: ${lat}, Lng: ${lng} - ${timestamp}`);

  res.json({ status: "ok", lat, lng, device, timestamp });
});

// Retornar todas as localizações
app.get("/locations", (req, res) => {
  res.json(locations);
});

app.listen(PORT, () => {
  console.log("========================================");
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 URL principal: https://server-vbp9.onrender.com`);
  console.log("========================================");
});
