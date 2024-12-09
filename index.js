const express = require('express');
const predictionRoutes = require('./predictapi');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));


app.use('/api', predictionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});