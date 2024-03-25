const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
    required: true,
    unique: true
  },
  deliveryPin: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4
  }
});

// Pre-save hook to generate order ID with hash and random digits
orderSchema.pre("save", function(next) {
  if (!this.orderId) {
    const hash = "#";
    const randomDigits = Math.floor(1000000 + Math.random() * 9000000); // Generates 7 random digits
    this.orderId = hash + randomDigits.toString();
  }
  // Check if deliveryPin is not already generated
  if (!this.deliveryPin) {
    const randomPin = Math.floor(1000 + Math.random() * 9000); // Generates 4 random digits
    this.deliveryPin = randomPin.toString();
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

