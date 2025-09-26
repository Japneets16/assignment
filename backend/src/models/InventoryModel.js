import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema(
  {
    dealer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer', required: true, index: true },
    model_name: { type: String, required: true, index: true },
    kms_driven: { type: Number, required: true },
    major_scratches: { type: Boolean, default: false },
    original_paint: { type: Boolean, default: true },
    number_of_accidents: { type: Number, default: 0 },
    number_of_previous_buyers: { type: Number, default: 0 },
    registration_place: { type: String, required: true },
    image_url: { type: String, required: true },
    description: {
      type: [String],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0 && arr.length <= 5;
        },
        message: 'Description must have between 1 and 5 bullet points.'
      }
    }
  },
  { timestamps: true, collection: 'marketplace_inventory' }
);

export const Inventory = mongoose.model('Inventory', InventorySchema);
