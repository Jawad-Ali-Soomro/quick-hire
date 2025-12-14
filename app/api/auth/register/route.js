import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Pro from '@/models/Pro';
import { generateToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, password, role } = body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return Response.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return Response.json(
        { success: false, error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password before creating user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role: role || 'customer',
      isPro: role === 'pro',
    });

    // If user is registering as a pro, create a Pro profile
    if (role === 'pro') {
      const pro = await Pro.create({
        name,
        email: email.toLowerCase(),
        phone,
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        location: {
          city: 'Karachi', // Default, can be updated later
        },
        services: [],
        rating: 0,
        reviews: 0,
        verified: false,
        topPro: false,
        yearsInBusiness: 0,
        employees: 1,
        responseTime: 'N/A',
      });

      // Link pro profile to user
      user.proProfile = pro._id;
      await user.save();
    }

    // Generate token
    const token = generateToken(user._id);

    // Return user without password
    const userObj = user.toObject();
    delete userObj.password;

    return Response.json({
      success: true,
      token,
      user: userObj,
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}



