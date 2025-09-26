import mongoose from 'mongoose';

const OemSchema = new mongoose.Schema(
  {
    model_name: { type: String, required: true, index: true },
    year_of_model: { type: Number, required: true },
    list_price: { type: Number, required: true },
    available_colors: { type: [String], default: [] },
    mileage: { type: Number, required: true },
    power_bhp: { type: Number, required: true },
    max_speed: { type: Number, required: true }
  },
  { timestamps: true, collection: 'oem_specs' }
);

OemSchema.index({ model_name: 1, year_of_model: 1 }, { unique: true });

export const OemSpec = mongoose.model('OemSpec', OemSchema);
