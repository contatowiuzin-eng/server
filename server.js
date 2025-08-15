const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(require('cors')());

if (!fs.existsSync('locations')) fs.mkdirSync('locations');
if (!fs.existsSync('photos')) fs.mkdirSync('photos');

app.post('/location', (req, res) => {
  const timestamp = Date.now();
  fs.writeFileSync(`locations/location_${timestamp}.json`, JSON.stringify(req.body));
  res.send({ status: 'ok' });
});

app.post('/photo', (req, res) => {
  const { imageBase64 } = req.body;
  const timestamp = Date.now();
  fs.writeFileSync(`photos/photo_${timestamp}.jpg`, Buffer.from(imageBase64, 'base64'));
  res.send({ status: 'ok' });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
