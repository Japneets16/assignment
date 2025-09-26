import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Dealer } from '../models/DealerModel.js';

const signToken = (dealer) => {
  const secret = process.env.JWT_SECRET || 'dev_secret';
  return jwt.sign({ id: dealer._id, email: dealer.email, name: dealer.name }, secret, { expiresIn: '7d' });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

    const exists = await Dealer.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const dealer = await Dealer.create({ name, email, password: hash });
    const token = signToken(dealer);
    res.status(201).json({ token, dealer: { id: dealer._id, name: dealer.name, email: dealer.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const dealer = await Dealer.findOne({ email });
    if (!dealer) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, dealer.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(dealer);
    res.json({ token, dealer: { id: dealer._id, name: dealer.name, email: dealer.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
