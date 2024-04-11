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
    item: {
      type: String,
      required: true,
      minlength: 3 // Minimum length of 3 characters for item name
    },
    quantity: { type: Number, required: true }
  }],
  name: {
    type: String,
    required: true,
    minlength: 3 // Minimum length of 3 characters for name
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
  },
  createdAt: { // Timestamp for order creation
    type: Date,
    default: Date.now
  },
  updatedAt: { // Optional timestamp for order updates
    type: Date
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

// Define indexes (optional)
orderSchema.index({ user: 1 }); // Index on user field
orderSchema.index({ delivered: 1 }); // Index on delivered field (if frequently queried)

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

