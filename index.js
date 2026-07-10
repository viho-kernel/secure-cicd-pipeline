const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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

// Only start the server if this file is run directly (not when imported by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ App is running at http://localhost:${PORT}`);
  });
}

module.exports = app;