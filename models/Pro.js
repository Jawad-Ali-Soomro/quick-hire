import mongoose from 'mongoose';

const ProSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  services: [{
    type: String,
    required: true,
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  topPro: {
    type: Boolean,
    default: false,
  },
  yearsInBusiness: {
    type: Number,
    default: 0,
  },
  employees: {
    type: Number,
    default: 1,
  },
  responseTime: {
    type: String,
    default: "N/A",
  },
  image: {
    type: String,
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProSchema.index({ location: 1, services: 1 });
ProSchema.index({ rating: -1 });
ProSchema.index({ 'location.city': 1 });

export default mongoose.models.Pro || mongoose.model('Pro', ProSchema);

