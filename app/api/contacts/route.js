import connectDB from '@/lib/mongodb';
import Pro from '@/models/Pro';
import Contract from '@/models/Contract';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();

    // Check authentication
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return Response.json(
        { success: false, error: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { proId, email, phone, message, customerName, service } = body;

    // Validate required fields
    if (!proId || !email || !phone || !message) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify pro exists
    const pro = await Pro.findById(proId);
    if (!pro) {
      return Response.json(
        { success: false, error: 'Pro not found' },
        { status: 404 }
      );
    }

    // Create contract/contact request
    const contract = await Contract.create({
      proId,
      userId: authUser._id,
      customerEmail: email,
      customerPhone: phone,
      customerName: customerName || authUser.name,
      message,
      service: service || null,
      status: 'pending',
    });

    return Response.json({ 
      success: true, 
      message: 'Contact request sent successfully. The pro will respond within 24 hours.',
      data: contract 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact request:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    // Check authentication
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return Response.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const proId = searchParams.get('proId');
    const status = searchParams.get('status');

    const query = {};
    
    // If user is a pro, show contracts where they are the pro
    // Otherwise show contracts where they are the customer
    if (authUser.isPro) {
      let proDocId = null;
      
      // First check if user has proProfile linked
      if (authUser.proProfile) {
        proDocId = authUser.proProfile;
      } else {
        // Fallback: Find the Pro document by email
        const proDoc = await Pro.findOne({ email: authUser.email.toLowerCase() });
        
        if (proDoc) {
          proDocId = proDoc._id;
          // Update user's proProfile for future queries
          await User.findByIdAndUpdate(authUser._id, { proProfile: proDoc._id });
        } else {
          // If no pro document found, return empty array
          return Response.json({ 
            success: true, 
            data: [],
            message: 'No pro profile found. Please create a pro profile first.'
          });
        }
      }
      
      // Use the proId in query - MongoDB will handle ObjectId conversion
      if (proDocId) {
        query.proId = proDocId;
      }
    } else {
      query.userId = authUser._id;
    }

    // Override with query params if provided
    if (proId) query.proId = proId;
    if (status) query.status = status;
    
    // Find contracts matching the query
    const contracts = await Contract.find(query)
      .populate('proId', 'name email phone services rating')
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(50);

    // Convert to plain objects with string IDs
    const contractsData = contracts.map(contract => {
      const contractObj = contract.toObject();
      if (contractObj._id) {
        contractObj._id = contractObj._id.toString();
        contractObj.id = contractObj._id;
      }
      if (contractObj.proId && contractObj.proId._id) {
        contractObj.proId._id = contractObj.proId._id.toString();
      }
      if (contractObj.userId && contractObj.userId._id) {
        contractObj.userId._id = contractObj.userId._id.toString();
      }
      return contractObj;
    });

    return Response.json({ 
      success: true, 
      data: contractsData 
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

