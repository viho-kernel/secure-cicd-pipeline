// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simple routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Jenkins CI/CD Demo App 🚀</h1><p>This app is running in your browser!</p>');
});

app.get('/add/:a/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  res.send(`Result of ${a} + ${b} = ${a + b}`);
});

app.get('/subtract/:a/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  res.send(`Result of ${a} - ${b} = ${a - b}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ App is running at http://localhost:${PORT}`);
});

module.exports = app;
