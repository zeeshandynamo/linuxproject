const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('DevOps Automation Pipeline working perfectly! and the project is Run by Zeeshan spending 5 hours');

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

