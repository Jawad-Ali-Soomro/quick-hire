import connectDB from '@/lib/mongodb';
import Pro from '@/models/Pro';

export async function GET(request) {
  try {
    await connectDB();

    // Get all pros with their emails
    const pros = await Pro.find({}, 'name email').sort({ name: 1 }).limit(20);

    // Format credentials
    const credentials = pros.map(pro => ({
      name: pro.name,
      email: pro.email,
      password: 'password123' // Default password for all seeded pros
    }));

    return Response.json({ 
      success: true, 
      message: 'Pro login credentials (showing first 20)',
      data: credentials,
      note: 'All seeded pros use the default password: password123'
    });
  } catch (error) {
    console.error('Error fetching pro credentials:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


