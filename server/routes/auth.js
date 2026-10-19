const router = require('express').Router();
const bcrypt = require('bcryptjs'), jwt = require('jsonwebtoken');
const { User } = require('../models');
const { auth, fail } = require('../authMiddleware');
const sign = (u) => jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
const pub = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) throw fail(400, 'Enter a name, email and a password of 6+ characters');
  if (await User.findOne({ email })) throw fail(409, 'That email is already registered');
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
  res.status(201).json({ token: sign(user), user: pub(user) });
});
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) throw fail(401, 'Wrong email or password');
  res.json({ token: sign(user), user: pub(user) });
});
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw fail(401, 'Account not found');
  res.json(pub(user));
});
module.exports = router;
