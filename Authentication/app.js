const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cookieParser());

//jwt
app.get('/', (req, res) => {
  let token = jwt.sign({ email: 'ycode37@gmail.com' }, 'secret');
  res.cookie('token', token); // tokenization
  //   console.log(token);
  res.send('Token');
});

app.get('/read', (req, res) => {
  //   console.log(req.cookies.token);
  let data = jwt.verify(req.cookies.token, 'secret');
  console.log(data);
});

// app.get('/', (req, res) => {
//   res.cookie('name', 'Yash');
//   res.send('Done');
// });

// app.get('/', (req, res) => {
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash('Yasharsh9903@@', salt, function (err, hash) { // use of bcrypt encryption
//       console.log(hash);
//     });
//   });
// });

// app.get('/', (req, res) => {
//   bcrypt.compare(
//     'Yasharsh9903@@',
//     '$2b$10$886G16v68MtVc87WkUl8IudJYxfxrBcXuFWTNGHzVTV6.8FitdwyS',  // decryption
//     function (err, result) {
//       console.log(result);
//     }
//   );
//   res.send('work');
// });

//abb main kitne hi route bana luu cookie chipak ke jaaegi

// app.get('/read', (req, res) => {
//   console.log(req.cookies);
//   res.send('Done !!!');
// });

app.listen(3000);
