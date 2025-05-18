const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');

app.set('view engine', 'ejs');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/create', async (req, res) => {
  let user = await userModel.create({
    username: 'Yash',
    email: 'ycode37@gmail.com',
  });
  res.send(user);
});

app.get('/post/create', async function (req, res) {
  let post = await postModel.create({
    postdata: 'Hello',
    user: '6828be4a96cf1d5f3883165c',
  });

  let user = await userModel.findOne({ _id: '6828be4a96cf1d5f3883165c' });
  user.posts.push(post._id);
  await user.save();
  res.send({ user, post });
});

app.listen(3000);
