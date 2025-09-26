import mongoose from 'mongoose';
import { Inventory } from '../models/InventoryModel.js';
import { OemSpec } from '../models/OemModel.js';

export const addCar = async (req, res) => {
  try {
    const dealer_id = req.user.id;
    const {
      model_name,
      kms_driven,
      major_scratches,
      original_paint,
      number_of_accidents,
      number_of_previous_buyers,
      registration_place,
      image_url,
      description
    } = req.body;

    if (!model_name || !kms_driven || !registration_place || !image_url || !description) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const spec = await OemSpec.findOne({ model_name });
    if (!spec) return res.status(400).json({ message: 'Unknown model_name. Please use a valid OEM model.' });

    const car = await Inventory.create({
      dealer_id,
      model_name,
      kms_driven,
      major_scratches: !!major_scratches,
      original_paint: original_paint !== false,
      number_of_accidents: Number(number_of_accidents) || 0,
      number_of_previous_buyers: Number(number_of_previous_buyers) || 0,
      registration_place,
      image_url,
      description
    });

    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const listCars = async (req, res) => {
  try {
    const { minPrice, maxPrice, colors, maxMileage, mine } = req.query;

    const matchStage = {};
    if (mine === 'true' && req.user) {
      matchStage.dealer_id = new mongoose.Types.ObjectId(req.user.id);
    }

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'oem_specs',
          localField: 'model_name',
          foreignField: 'model_name',
          as: 'oem'
        }
      },
      { $unwind: '$oem' }
    ];

    const filter = {};
    const priceFilter = [];

    if (minPrice) priceFilter.push({ 'oem.list_price': { $gte: Number(minPrice) } });
    if (maxPrice) priceFilter.push({ 'oem.list_price': { $lte: Number(maxPrice) } });
    if (priceFilter.length) filter.$and = priceFilter;

    if (colors) {
      const colorArr = colors.split(',').map((c) => c.trim()).filter(Boolean);
      if (colorArr.length) filter['oem.available_colors'] = { $in: colorArr };
    }

    if (maxMileage) {
      filter['oem.mileage'] = { $lte: Number(maxMileage) };
    }

    if (Object.keys(filter).length) {
      pipeline.push({ $match: filter });
    }

    pipeline.push({
      $project: {
        dealer_id: 1,
        model_name: 1,
        kms_driven: 1,
        major_scratches: 1,
        original_paint: 1,
        number_of_accidents: 1,
        number_of_previous_buyers: 1,
        registration_place: 1,
        image_url: 1,
        description: 1,
        oem: 1
      }
    });

    const cars = await Inventory.aggregate(pipeline);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const dealer_id = req.user.id;

    const updated = await Inventory.findOneAndUpdate({ _id: id, dealer_id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Car not found or not owned by you' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteCars = async (req, res) => {
  try {
    const { ids } = req.body;
    const dealer_id = req.user.id;

    if (!Array.isArray(ids) || !ids.length) return res.status(400).json({ message: 'ids array is required' });

    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

    const result = await Inventory.deleteMany({ _id: { $in: objectIds }, dealer_id });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
