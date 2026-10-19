require('dotenv').config();
require('express-async-errors');
const express = require('express'), mongoose = require('mongoose'), cors = require('cors');
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use((err, req, res, next) => res.status(err.status || 500).json({ message: err.message || 'Server error' }));
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('API running')))
  .catch((e) => { console.error(e); process.exit(1); });
