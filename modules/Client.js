const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  rif: {
    type: String,
    required: true,
  },
  legal_address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  //El campo de office se utiliza como "sucursales". Básicamente guarda multiples direcciones de una sola empresa
  office: {
    type: String,
  },
  description: {
    type: String,
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
