const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
