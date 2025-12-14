import { getAuthUser } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = await getAuthUser(request);

    if (!user) {
      return Response.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userObj = user.toObject();
    delete userObj.password;

    return Response.json({
      success: true,
      user: userObj,
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}



