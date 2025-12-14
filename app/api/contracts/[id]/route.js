import connectDB from '@/lib/mongodb';
import Contract from '@/models/Contract';
import Pro from '@/models/Pro';
import { getAuthUser } from '@/lib/auth';

export async function GET(request, { params }) {
  const resolvedParams = await params;
  try {
    await connectDB();

    const authUser = await getAuthUser(request);
    if (!authUser) {
      return Response.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const contract = await Contract.findById(resolvedParams.id)
      .populate('proId', 'name email phone services rating')
      .populate('userId', 'name email phone');
    
    if (!contract) {
      return Response.json(
        { success: false, error: 'Contract not found' },
        { status: 404 }
      );
    }

    // Check if user has access to this contract
    const isCustomer = contract.userId && contract.userId._id.toString() === authUser._id.toString();
    let isPro = false;
    
    if (authUser.isPro) {
      // Find the Pro document linked to this user by email
      const proDoc = await Pro.findOne({ email: authUser.email.toLowerCase() });
      if (proDoc && contract.proId && contract.proId._id.toString() === proDoc._id.toString()) {
        isPro = true;
      }
    }
    
    if (!isCustomer && !isPro) {
      return Response.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return Response.json({
      success: true,
      data: contract,
    });
  } catch (error) {
    console.error('Error fetching contract:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  const resolvedParams = await params;
  try {
    await connectDB();

    const authUser = await getAuthUser(request);
    if (!authUser) {
      return Response.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const contractId = resolvedParams?.id;
    
    if (!contractId) {
      return Response.json(
        { success: false, error: 'Contract ID is required' },
        { status: 400 }
      );
    }

    const contract = await Contract.findById(contractId);

    if (!contract) {
      return Response.json(
        { success: false, error: 'Contract not found' },
        { status: 404 }
      );
    }

    // Only pro can update contract status
    if (!authUser.isPro) {
      return Response.json(
        { success: false, error: 'Only the pro can update this contract' },
        { status: 403 }
      );
    }
    
    // Verify this pro owns this contract
    const proDoc = await Pro.findOne({ email: authUser.email.toLowerCase() });
    
    if (!proDoc) {
      return Response.json(
        { success: false, error: 'Pro profile not found' },
        { status: 404 }
      );
    }
    
    if (contract.proId.toString() !== proDoc._id.toString()) {
      return Response.json(
        { success: false, error: 'You are not authorized to update this contract' },
        { status: 403 }
      );
    }

    // Update contract with status and completedDate if provided
    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    // If marking as completed, ensure completedDate is set
    if (body.status === 'completed' && !body.completedDate) {
      updateData.completedDate = new Date();
    }

    const updatedContract = await Contract.findByIdAndUpdate(
      contractId,
      updateData,
      { new: true }
    )
      .populate('proId', 'name email phone services rating')
      .populate('userId', 'name email phone');

    return Response.json({
      success: true,
      data: updatedContract,
      message: 'Contract updated successfully',
    });
  } catch (error) {
    console.error('Error updating contract:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}



