const express = require('express');
const usermodel = require('./usermodel');
const app = express();

app.get('/', (req, res) => {
  res.send('Hey');
});

app.get('/create', async (req, res) => {
  let createdUser = await usermodel.create(
    {
      name: 'Yash',
      email: 'ycode37',
      username: 'ycode',
    },
    {
      name: 'Yash',
      email: 'ycode37',
      username: 'ycode',
    }
  );
  res.send(createdUser);
});

app.get('/update', async (req, res) => {
  let updatedUser = await usermodel.findOneAndUpdate(
    { username: 'ycode' },
    { name: 'YB' },
    { new: true }
  );
  res.send(updatedUser);
});

app.get('/read', async (req, res) => {
  let readall = await usermodel.find();
  res.send(readall);
});

app.listen(3000);
