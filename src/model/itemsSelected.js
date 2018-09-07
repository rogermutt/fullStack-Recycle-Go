const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  items: { type: Array, required: true }
});

module.exports = mongoose.model('itemsSelected', TaskSchema);