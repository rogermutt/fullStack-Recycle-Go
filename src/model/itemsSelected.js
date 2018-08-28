const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemsSelectedSchema = new Schema({
  title: { type: String, required: true }
});

module.exports = mongoose.model('itemsSelected', itemsSelectedSchema);