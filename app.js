const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('🚀 CI/CD Pipeline with Jenkins, Docker & Ansible!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
