const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/create', (req, res) => {
  let { name, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        name,
        email,
        password: hash,
      });

      let token = jwt.sign({ email }, 'Yohohoho');
      res.cookie('token', token);

      res.send(createdUser);
    });
  });
});

app.get('/logout', function (req, res) {
  res.cookie('token', '');
  res.redirect('/');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  console.log(req.body.password);
  if (!user) return res.send('Something Went Wrong 404');

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: user.email }, 'Yohohoho');
      res.cookie('token', token);
      res.send('Ho Gaye');
    } else res.send('What Ra!!');
  });
});

app.listen(3000);
