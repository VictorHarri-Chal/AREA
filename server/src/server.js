const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

const port = 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

mongoose.connect('mongodb+srv://bissap:gerking123@cluster0.qpna6y2.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});


const User = mongoose.model('./models/user.model.js', userSchema);

//display users
User.find({}, (error, users) => {
  if (error) {
    console.log(error);
  } else {
    console.log(users);
  }
});
