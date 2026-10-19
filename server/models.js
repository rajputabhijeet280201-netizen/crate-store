const { Schema, model, Types } = require('mongoose');
const User = model('User', new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true }));
const Product = model('Product', new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 }, // whole rupees
  category: { type: String, default: 'Other' },
  color: { type: String, default: '#FFD60A' },
  fileUrl: { type: String, required: true }, // never sent to the public
}, { timestamps: true }));
const Order = model('Order', new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  items: [{ product: { type: Types.ObjectId, ref: 'Product' }, title: String, price: Number }],
  total: Number,
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
}, { timestamps: true }));
module.exports = { User, Product, Order };
