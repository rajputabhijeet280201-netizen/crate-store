require('dotenv').config();
const mongoose = require('mongoose'), bcrypt = require('bcryptjs');
const { User, Product } = require('./models');
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await User.deleteMany({ email: 'admin@example.com' });
  await User.create({ name: 'Admin', email: 'admin@example.com', password: await bcrypt.hash('admin123', 10), role: 'admin' });
  await Product.insertMany([
    { title: 'Notion Life Planner', description: 'A weekly, monthly and yearly planner template with habit and budget trackers.', price: 399, category: 'Templates', color: '#FFD60A', fileUrl: 'https://example.com/planner.zip' },
    { title: 'Brutal UI Kit', description: '120 Figma components with thick borders and hard shadows.', price: 1299, category: 'Design', color: '#FF6FB5', fileUrl: 'https://example.com/ui-kit.fig' },
    { title: 'Next.js SaaS Starter', description: 'Auth, billing and a dashboard, ready to clone and ship.', price: 2499, category: 'Code', color: '#5B8CFF', fileUrl: 'https://example.com/starter.zip' },
    { title: 'Lo-fi Beat Pack', description: '40 royalty-free loops and one-shots in WAV.', price: 599, category: 'Audio', color: '#3DDC84', fileUrl: 'https://example.com/beats.zip' },
  ]);
  console.log('Seeded. Admin: admin@example.com / admin123');
  process.exit(0);
})();
