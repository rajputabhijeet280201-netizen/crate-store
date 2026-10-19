const router = require('express').Router();
const { Product } = require('../models');
const { auth, admin, fail } = require('../authMiddleware');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

router.get('/', async (req, res) => {
  const f = {};
  if (req.query.category) f.category = req.query.category;
  if (req.query.q) f.title = new RegExp(esc(req.query.q), 'i');
  res.json(await Product.find(f).select('-fileUrl').sort('-createdAt'));
});
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id).select('-fileUrl');
  if (!p) throw fail(404, 'Product not found');
  res.json(p);
});
router.post('/', auth, admin, async (req, res) => res.status(201).json(await Product.create(req.body)));
router.delete('/:id', auth, admin, async (req, res) => { await Product.findByIdAndDelete(req.params.id); res.json({ ok: true }); });
module.exports = router;
