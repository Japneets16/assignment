import { OemSpec } from '../models/OemModel.js';
import { Dealer } from '../models/DealerModel.js';
import { Inventory } from '../models/InventoryModel.js';
import bcrypt from 'bcryptjs';

const oemData = [
  { model_name: 'Honda City', year_of_model: 2015, list_price: 800000, available_colors: ['Red', 'White', 'Black'], mileage: 18, power_bhp: 118, max_speed: 180 },
  { model_name: 'Maruti Swift', year_of_model: 2018, list_price: 600000, available_colors: ['Blue', 'White', 'Grey'], mileage: 22, power_bhp: 82, max_speed: 160 },
  { model_name: 'Hyundai i20', year_of_model: 2019, list_price: 700000, available_colors: ['Silver', 'Black', 'White'], mileage: 20, power_bhp: 99, max_speed: 170 },
  { model_name: 'Toyota Corolla', year_of_model: 2016, list_price: 950000, available_colors: ['Grey', 'White'], mileage: 16, power_bhp: 138, max_speed: 185 },
  { model_name: 'Ford EcoSport', year_of_model: 2017, list_price: 750000, available_colors: ['Orange', 'Black', 'Blue'], mileage: 17, power_bhp: 122, max_speed: 175 }
];

const bullets = (label) => [
  `${label} well maintained`,
  `${label} single owner`,
  `${label} serviced recently`,
  `${label} insurance valid`,
  `${label} smooth drive`
];

export async function seedIfNeeded() {
  const oemCount = await OemSpec.countDocuments();
  const dealerCount = await Dealer.countDocuments();
  const invCount = await Inventory.countDocuments();

  if (!oemCount) {
    await OemSpec.insertMany(oemData);
  }

  let dealer;
  if (!dealerCount) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('password123', salt);
    dealer = await Dealer.create({ name: 'Demo Dealer', email: 'demo@buyc.test', password: hash });
  } else {
    dealer = await Dealer.findOne();
  }

  if (!invCount) {
    const oems = await OemSpec.find({});
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

    for (const item of items) {
      await Inventory.create({ ...item, dealer_id: dealer._id });
    }
  }
}
