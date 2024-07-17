/*
* This table is only been used to create the order number, when creating a new sell order.
* Jesus Carrero: I did it like this because I have no way on keeping the specific format from the frontend.
* the format is ddmmyy-x and that x is an autoincrement number.
* Checking the year and reseting the autoincrement number was something outside of the frontend, so we move forward with this weird alternative.
*/
const mongoose = require('mongoose');

const orderCounterSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

const OrderCounter = mongoose.model('OrderCounter', orderCounterSchema);

module.exports = OrderCounter;
