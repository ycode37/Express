const mongoose = require('mongoose');
const userModel = require('./usermodel.js');

mongoose.connect(`mongodb://127.0.0.1:27017/database`);

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
});

module.exports = mongoose.model('user', userSchema);
