import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import Pro from '@/models/Pro';
import { getAuthUser } from '@/lib/auth';

export async function POST(request) {
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
    const { proId, contractId, rating, comment, service } = body;

    if (!proId || !rating || !comment) {
      return Response.json(
        { success: false, error: 'Pro ID, rating, and comment are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return Response.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if review already exists for this contract
    if (contractId) {
      const existingReview = await Review.findOne({ contractId, userId: authUser._id });
      if (existingReview) {
        return Response.json(
          { success: false, error: 'Review already exists for this contract' },
          { status: 400 }
        );
      }
    }

    // Create review
    const review = await Review.create({
      proId,
      userId: authUser._id,
      contractId: contractId || null,
      rating,
      comment,
      service: service || null,
      verified: !!contractId, // Verified if from completed contract
    });

    // Update pro's average rating
    const reviews = await Review.find({ proId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Pro.findByIdAndUpdate(proId, {
      rating: parseFloat(avgRating.toFixed(1)),
      reviews: reviews.length,
    });

    return Response.json({
      success: true,
      data: review,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const proId = searchParams.get('proId');

    if (!proId) {
      return Response.json(
        { success: false, error: 'Pro ID is required' },
        { status: 400 }
      );
    }

    const reviews = await Review.find({ proId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    // Convert to plain objects with string IDs
    const reviewsData = reviews.map(review => {
      const reviewObj = review.toObject();
      if (reviewObj._id) {
        reviewObj._id = reviewObj._id.toString();
        reviewObj.id = reviewObj._id;
      }
      if (reviewObj.userId && reviewObj.userId._id) {
        reviewObj.userId._id = reviewObj.userId._id.toString();
      }
      return reviewObj;
    });

    return Response.json({
      success: true,
      data: reviewsData,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

