import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema({
  proId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pro',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // You'll need to create a User model for customers
    required: false, // Optional if user is not logged in (shouldn't happen in your case)
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending',
  },
  proResponse: {
    type: String,
    required: false,
  },
  quote: {
    amount: Number,
    currency: {
      type: String,
      default: 'PKR',
    },
    description: String,
  },
  scheduledDate: {
    type: Date,
    required: false,
  },
  completedDate: {
    type: Date,
    required: false,
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

ContractSchema.index({ proId: 1, status: 1 });
ContractSchema.index({ userId: 1 });
ContractSchema.index({ createdAt: -1 });

export default mongoose.models.Contract || mongoose.model('Contract', ContractSchema);

