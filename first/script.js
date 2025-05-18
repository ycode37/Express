import path from 'path';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // for css files
app.set('view engine', 'ejs');

console.log(__dirname);

app.use(function (req, res, next) {
  console.log('Hi Middleware');
  next();
});

app.get('/err', (req, res, next) => {
  res.send('Error');
  return next(new Error('Something went wrong Choco!!'));
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/exp', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/user/:username/:age', (req, res) => {
  res.send(
    `Welcome , ${req.params.username} You are ${req.params.age} Years old.`
  );
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log(`it's Running`);
});
