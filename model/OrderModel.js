const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

// Define the order schema
const orderSchema = new Schema({
  user: { // Reference to the user who placed the order
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    required: true
  },
  quantity: [{
    item: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  name: {
    type: String,
    required: true
  },
  totalFee: {
    type: Number,
    required: true
  },
  delivered: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: true
  },
  orderId: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true
  },
  deliveryPin: {
    type: String,
    required: true
  }
});

// Pre-save hook to generate delivery pin with four random digits
orderSchema.pre("save", function(next) {
  if (!this.deliveryPin) {
    const randomPin = Math.floor(1000 + Math.random() * 9000); // Generates 4 random digits
    this.deliveryPin = randomPin.toString();
  }
  next();
});

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

