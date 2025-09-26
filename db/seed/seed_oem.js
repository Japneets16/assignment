import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { OemSpec } from '../../backend/src/models/OemModel.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buyc';

const data = [
  { model_name: 'Honda City', year_of_model: 2015, list_price: 800000, available_colors: ['Red', 'White', 'Black'], mileage: 18, power_bhp: 118, max_speed: 180 },
  { model_name: 'Maruti Swift', year_of_model: 2018, list_price: 600000, available_colors: ['Blue', 'White', 'Grey'], mileage: 22, power_bhp: 82, max_speed: 160 },
  { model_name: 'Hyundai i20', year_of_model: 2019, list_price: 700000, available_colors: ['Silver', 'Black', 'White'], mileage: 20, power_bhp: 99, max_speed: 170 },
  { model_name: 'Toyota Corolla', year_of_model: 2016, list_price: 950000, available_colors: ['Grey', 'White'], mileage: 16, power_bhp: 138, max_speed: 185 },
  { model_name: 'Ford EcoSport', year_of_model: 2017, list_price: 750000, available_colors: ['Orange', 'Black', 'Blue'], mileage: 17, power_bhp: 122, max_speed: 175 }
];

(async () => {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'buyc' });
    await OemSpec.deleteMany({});
    await OemSpec.insertMany(data);
    console.log('Seeded OEM specs');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
