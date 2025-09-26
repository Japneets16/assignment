import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { Dealer } from '../../backend/src/models/DealerModel.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buyc';

const dealers = [
  { name: 'Alice Motors', email: 'alice@example.com', password: 'password123' },
  { name: 'Bob Cars', email: 'bob@example.com', password: 'password123' },
  { name: 'Charlie Auto', email: 'charlie@example.com', password: 'password123' },
  { name: 'Delta Wheels', email: 'delta@example.com', password: 'password123' },
  { name: 'Echo Rides', email: 'echo@example.com', password: 'password123' }
];

(async () => {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'buyc' });
    await Dealer.deleteMany({});

    for (const d of dealers) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(d.password, salt);
      await Dealer.create({ name: d.name, email: d.email, password: hash });
    }

    console.log('Seeded dealers');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
