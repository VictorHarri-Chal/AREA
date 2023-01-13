const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb+srv://bissap:gerking123@cluster0.qpna6y2.mongodb.net/dbname?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

const port = 3000;
app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
  console.log(`MongoDB connection error: ${err}`);
  process.exit();
});

//NEXT STEP
// const User = require('./models/user'); // import your user model

// app.post('/adduser', (req, res) => {
//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });

//     newUser.save()
//         .then(() => res.json('User added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });
