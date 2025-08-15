const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Rota opcional de API
app.get("/api", (req, res) => {
  res.json({ status: "Servidor rodando!" });
});

app.listen(PORT, () => {
  console.log("========================================");
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 URL principal: https://server-vbp9.onrender.com`);
  console.log("========================================");
});
