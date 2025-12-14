import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return Response.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return Response.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
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
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

