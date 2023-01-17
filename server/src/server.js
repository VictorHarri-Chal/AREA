const express = require('express');
const app = express();
const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

const port = 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});