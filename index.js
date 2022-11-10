require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('HELLO ')
})

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}!`)
})
