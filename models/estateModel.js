import mongoose from 'mongoose';

const geographySchema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number },
});

const estateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [String],
    purpose: { type: String, default: 'for-rent' },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    geography: { type: geographySchema },
    rooms: { type: Number, required: true },
    baths: { type: Number, required: true },
    surface: { type: Number, required: true },
    propertyType: { type: String, required: true },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Estate = new mongoose.model('Estate', estateSchema);
