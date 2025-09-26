import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const MONGODB_URI = process.env.MONGODB_URI || '';

export const connectDB = async () => {
  const useMemory = process.env.MONGODB_INMEMORY === 'true' || !MONGODB_URI;
  if (!useMemory) {
    try {
      await mongoose.connect(MONGODB_URI, { dbName: 'buyc' });
      console.log('MongoDB connected');
      return;
    } catch (err) {
      console.warn('MongoDB connection failed, falling back to in-memory:', err.message);
    }
  }

  try {
    const mem = await MongoMemoryServer.create();
    const uri = mem.getUri('buyc');
    await mongoose.connect(uri);
    console.log('MongoDB (in-memory) started');
  } catch (err) {
    console.error('Failed to start in-memory MongoDB:', err.message);
    process.exit(1);
  }
};
