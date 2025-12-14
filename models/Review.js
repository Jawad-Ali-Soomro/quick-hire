import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  proId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pro',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contractId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: false,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    default: false, // Verified if from completed contract
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

ReviewSchema.index({ proId: 1, createdAt: -1 });
ReviewSchema.index({ userId: 1 });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);

