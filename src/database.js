const mongoose = require("mongoose");

const URI = 'mongodb://localhost/recycle-go';

mongoose.connect(URI)
  .then(db => console.log('DB Connected'))
  .catch(error => console.error(error));

module.exports = mongoose;