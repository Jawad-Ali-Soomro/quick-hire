import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getAuthUser(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return null;
    }

    // Import User model dynamically to avoid issues
    const User = (await import('@/models/User')).default;
    const connectDB = (await import('@/lib/mongodb')).default;
    await connectDB();

    const user = await User.findById(decoded.userId).select('-password');
    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

