const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const usermodel = require('./usermodel');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.cookie('name', 'Yash');
  res.send('done');
});

app.get('/read' , (req,res)=>{
  
})

app.listen(3000);
