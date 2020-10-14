const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, 'build')));

// Routes
app.get('/ping', (req, res) => {
  return res.send('pong');
});

// Catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, () => {
  console.log(`Server started on port: ${port} \nIf you are running this locally, go to http://localhost:${port}`);
});
