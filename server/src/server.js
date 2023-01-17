const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 6969;


var corsOpt = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOpt));
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});