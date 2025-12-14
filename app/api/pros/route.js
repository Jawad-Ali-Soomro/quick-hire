import connectDB from '@/lib/mongodb';
import Pro from '@/models/Pro';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const service = searchParams.get('service');
    const sortBy = searchParams.get('sortBy') || 'rating';
    const search = searchParams.get('search') || '';

    // Build query
    const query = {};

    if (location) {
      query['location.city'] = new RegExp(location, 'i');
    }

    if (service) {
      query.services = { $in: [new RegExp(service, 'i')] };
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { services: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Build sort
    let sort = {};
    switch (sortBy) {
      case 'rating':
        sort = { rating: -1, reviews: -1 };
        break;
      case 'distance':
        sort = { rating: -1 };
        break;
      case 'reviews':
        sort = { reviews: -1 };
        break;
      case 'response':
        sort = { responseTime: 1 };
        break;
      default:
        sort = { rating: -1 };
    }

    const pros = await Pro.find(query).sort(sort).limit(50);

    // Convert MongoDB documents to plain objects with string IDs
    const prosData = pros.map(pro => {
      const proObj = pro.toObject();
      // Ensure _id is a valid string
      if (proObj._id) {
        proObj._id = proObj._id.toString();
        proObj.id = proObj._id; // Also set id for compatibility
      }
      return proObj;
    });

    return Response.json({ success: true, data: prosData });
  } catch (error) {
    console.error('Error fetching pros:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const pro = await Pro.create(body);

    return Response.json({ success: true, data: pro }, { status: 201 });
  } catch (error) {
    console.error('Error creating pro:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

