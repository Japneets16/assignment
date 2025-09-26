import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/api/authRoutes.js';
import oemRoutes from './routes/api/oemRoutes.js';
import inventoryRoutes from './routes/api/inventoryRoutes.js';
import { seedIfNeeded } from './utils/seed.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/oem', oemRoutes);
app.use('/api/inventory', inventoryRoutes);

app.use((req, res) => res.status(404).json({ message: 'Not found' }));

const PORT = process.env.PORT || 4000;

connectDB().then(async () => {
  try {
    await seedIfNeeded();
  } catch (e) {
    console.warn('Seeding skipped/error:', e.message);
  }
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
