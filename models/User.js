import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'pro'],
    default: 'customer',
  },
  isPro: {
    type: Boolean,
    default: false,
  },
  proProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pro',
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  location: {
    city: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
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

// Hash password before saving (only if password is modified and not already hashed)
UserSchema.pre('save', async function() {
  // Only hash if password is modified and doesn't start with $2a$ or $2b$ (bcrypt hash prefix)
  if (this.isModified('password') && this.password && !this.password.startsWith('$2')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);



