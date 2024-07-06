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
  number: {
    type: String,
  },
  email: {
    type: String,
  },
  //El campo de office se utiliza como "sucursales". Básicamente guarda multiples direcciones de una sola empresa
  offices: [
    { address: String, }
  ],
  description: {
    type: String,
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
