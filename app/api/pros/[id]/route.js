import connectDB from '@/lib/mongodb';
import Pro from '@/models/Pro';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const resolvedParams = await params;
    const id = resolvedParams?.id;

    console.log('Received pro ID:', id, 'Type:', typeof id);

    // Validate MongoDB ObjectId format
    if (!id) {
      return Response.json(
        { success: false, error: 'Pro ID is required', receivedId: id },
        { status: 400 }
      );
    }

    // Convert to string if needed
    const idString = String(id).trim();

    if (!mongoose.Types.ObjectId.isValid(idString)) {
      console.error('Invalid MongoDB ObjectId format:', idString);
      return Response.json(
        { success: false, error: 'Invalid pro ID format', receivedId: idString },
        { status: 400 }
      );
    }

    const pro = await Pro.findById(idString);

    if (!pro) {
      return Response.json(
        { success: false, error: 'Pro not found' },
        { status: 404 }
      );
    }

    // Convert MongoDB document to plain object with string ID
    const proObj = pro.toObject();
    proObj._id = proObj._id.toString();

    return Response.json({
      success: true,
      data: proObj,
    });
  } catch (error) {
    console.error('Error fetching pro:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}



