const router = require('express').Router();
const { Product, Order } = require('../models');
const { auth, fail } = require('../authMiddleware');

// Demo checkout: marks the order paid immediately.
// Replace with Razorpay/Stripe: create the order as 'pending', then set 'paid' from the gateway webhook.
router.post('/', auth, async (req, res) => {
  const ids = [...new Set(req.body.items || [])];
  const products = await Product.find({ _id: { $in: ids } });
  if (!products.length) throw fail(400, 'Your cart is empty');
  const order = await Order.create({
    user: req.user.id,
    items: products.map((p) => ({ product: p._id, title: p.title, price: p.price })),
    total: products.reduce((s, p) => s + p.price, 0), // price always comes from the DB
    status: 'paid',
  });
  res.status(201).json(order);
});
router.get('/mine', auth, async (req, res) => {
  res.json(await Order.find({ user: req.user.id, status: 'paid' }).sort('-createdAt'));
});
router.get('/:orderId/download/:productId', auth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.orderId, user: req.user.id, status: 'paid' });
  if (!order || !order.items.some((i) => String(i.product) === req.params.productId)) throw fail(403, 'You have not bought this product');
  const product = await Product.findById(req.params.productId);
  if (!product) throw fail(404, 'File no longer available');
  res.json({ url: product.fileUrl });
});
module.exports = router;
