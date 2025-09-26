import { OemSpec } from '../models/OemModel.js';

export const getModelCount = async (req, res) => {
  try {
    const count = await OemSpec.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const searchModel = async (req, res) => {
  try {
    const { model, year } = req.query;
    if (!model || !year) return res.status(400).json({ message: 'model and year are required' });

    const spec = await OemSpec.findOne({ model_name: model, year_of_model: Number(year) });
    if (!spec) return res.status(404).json({ message: 'OEM spec not found' });

    res.json(spec);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
