import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Inventory } from '../../backend/src/models/InventoryModel.js';
import { Dealer } from '../../backend/src/models/DealerModel.js';
import { OemSpec } from '../../backend/src/models/OemModel.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buyc';

const bullets = (
  label
) => [
  `${label} well maintained`,
  `${label} single owner`,
  `${label} serviced recently`,
  `${label} insurance valid`,
  `${label} smooth drive`
];

(async () => {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'buyc' });

    const dealers = await Dealer.find({}).limit(5);
    const oems = await OemSpec.find({});

    if (!dealers.length || !oems.length) throw new Error('Seed dealers and OEMs first');

    await Inventory.deleteMany({});

    const items = [
      { model_name: oems[0].model_name, kms_driven: 45000, major_scratches: false, original_paint: true, number_of_accidents: 0, number_of_previous_buyers: 1, registration_place: 'Delhi', image_url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', description: bullets('Car 1') },
      { model_name: oems[1].model_name, kms_driven: 60000, major_scratches: true, original_paint: false, number_of_accidents: 1, number_of_previous_buyers: 2, registration_place: 'Mumbai', image_url: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg', description: bullets('Car 2') },
      { model_name: oems[2].model_name, kms_driven: 30000, major_scratches: false, original_paint: true, number_of_accidents: 0, number_of_previous_buyers: 1, registration_place: 'Bangalore', image_url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', description: bullets('Car 3') },
      { model_name: oems[3].model_name, kms_driven: 52000, major_scratches: false, original_paint: true, number_of_accidents: 0, number_of_previous_buyers: 3, registration_place: 'Chennai', image_url: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg', description: bullets('Car 4') },
      { model_name: oems[4].model_name, kms_driven: 41000, major_scratches: true, original_paint: false, number_of_accidents: 2, number_of_previous_buyers: 2, registration_place: 'Pune', image_url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', description: bullets('Car 5') },
      { model_name: oems[0].model_name, kms_driven: 38000, major_scratches: false, original_paint: true, number_of_accidents: 0, number_of_previous_buyers: 1, registration_place: 'Hyderabad', image_url: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg', description: bullets('Car 6') },
      { model_name: oems[1].model_name, kms_driven: 72000, major_scratches: true, original_paint: false, number_of_accidents: 1, number_of_previous_buyers: 2, registration_place: 'Kolkata', image_url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', description: bullets('Car 7') },
      { model_name: oems[2].model_name, kms_driven: 26000, major_scratches: false, original_paint: true, number_of_accidents: 0, number_of_previous_buyers: 1, registration_place: 'Jaipur', image_url: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg', description: bullets('Car 8') },
      { model_name: oems[3].model_name, kms_driven: 55000, major_scratches: false, original_paint: true, number_of_accidents: 0, number_of_previous_buyers: 2, registration_place: 'Ahmedabad', image_url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', description: bullets('Car 9') },
      { model_name: oems[4].model_name, kms_driven: 47000, major_scratches: false, original_paint: true, number_of_accidents: 0, number_of_previous_buyers: 1, registration_place: 'Lucknow', image_url: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg', description: bullets('Car 10') }
    ];

    let idx = 0;
    for (const item of items) {
      const dealer = dealers[idx % dealers.length];
      await Inventory.create({ ...item, dealer_id: dealer._id });
      idx++;
    }

    console.log('Seeded inventory');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
