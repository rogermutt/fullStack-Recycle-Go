const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const RegisteredUsers = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

RegisteredUsers.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('RegisteredUsers', RegisteredUsers);