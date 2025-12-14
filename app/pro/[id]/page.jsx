"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { 
  MdStar,
  MdVerified,
  MdLocationOn,
  MdAccessTime,
  MdEmojiEvents,
  MdPhone,
  MdEmail,
  MdArrowBack
} from "react-icons/md";

export default function ProProfile() {
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const [pro, setPro] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetchPro();
      fetchReviews();
    }
  }, [params?.id]);

  const fetchPro = async () => {
    try {
      const proId = params?.id;
      
      if (!proId) {
        console.error('No pro ID provided in params:', params);
        setLoading(false);
        return;
      }
      
      console.log('Fetching pro with ID:', proId, 'Type:', typeof proId);
      const response = await fetch(`/api/pros/${encodeURIComponent(proId)}`);
      const data = await response.json();
      
      if (data.success) {
        setPro(data.data);
      } else {
        console.error('Error fetching pro:', data.error, 'Received ID:', data.receivedId, 'Sent ID:', proId);
      }
    } catch (error) {
      console.error('Error fetching pro:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?proId=${params.id}`);
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-black font-sans flex items-center justify-center pt-24">
        <p className="text-lg font-bold text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!pro) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-black font-sans flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-4">Pro not found</p>
          <Link href="/hire" className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-[30px] hover:opacity-90 transition-opacity">
            Back to Pros
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-black font-sans pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/hire" className="inline-flex items-center gap-2 text-black dark:text-white font-bold mb-6 hover:opacity-70 transition-opacity">
          <MdArrowBack className="text-xl" />
          Back to Pros
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Pro Info */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px] p-8 mb-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800">
                  {pro.image ? (
                    <Image src={pro.image} alt={pro.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <span className="text-2xl font-black text-black dark:text-white">{pro.avatar}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-black text-black dark:text-white">{pro.name}</h1>
                    {pro.verified && <MdVerified className="text-2xl text-black dark:text-white" />}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(Math.floor(pro.rating || 0))].map((_, i) => (
                      <MdStar key={i} className="text-yellow-400 text-lg" />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      {pro.rating?.toFixed(1)} ({pro.reviews || 0} reviews)
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{pro.bio}</p>
                </div>
              </div>

              {/* Services */}
              <div className="mb-6">
                <h2 className="text-xl font-black text-black dark:text-white mb-4">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {pro.services?.map((service, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-[20px] text-sm font-bold text-black dark:text-white"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MdLocationOn className="text-xl text-gray-400" />
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{pro.location?.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdAccessTime className="text-xl text-gray-400" />
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Responds in {pro.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdEmojiEvents className="text-xl text-gray-400" />
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{pro.yearsInBusiness} years in business</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{pro.employees} employees</span>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px] p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-black dark:text-white">Reviews</h2>
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                  {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </span>
              </div>
              {reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">No reviews yet</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Be the first to review this pro!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review._id || review.id} className="border-b-2 border-gray-200 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-sm font-black text-black dark:text-white">
                              {review.userId?.name?.charAt(0)?.toUpperCase() || 'A'}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-black dark:text-white">{review.userId?.name || 'Anonymous'}</span>
                              {review.verified && <MdVerified className="text-sm text-black dark:text-white" title="Verified purchase" />}
                            </div>
                            {review.service && (
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Service: {review.service}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(Math.floor(review.rating || 0))].map((_, i) => (
                            <MdStar key={i} className="text-yellow-400 text-lg fill-current" />
                          ))}
                          {review.rating % 1 !== 0 && (
                            <MdStar className="text-yellow-400 text-lg fill-current opacity-50" />
                          )}
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-2">
                            {review.rating?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">{review.comment}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px] p-6 sticky top-32">
              <h3 className="text-xl font-black text-black dark:text-white mb-4">Contact {pro.name}</h3>
              {!isAuthenticated ? (
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-4">
                    Login to contact this pro
                  </p>
                  <Link
                    href="/join"
                    className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-[30px] hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    Login / Sign Up
                  </Link>
                </div>
              ) : (
                <Link
                  href={`/hire?service=${encodeURIComponent(pro.services?.[0] || '')}`}
                  className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-[30px] hover:opacity-90 transition-opacity flex items-center justify-center mb-4"
                >
                  Contact Pro
                </Link>
              )}
              <div className="space-y-3 text-sm mt-5">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MdEmail className="text-lg" />
                  <span>{pro.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MdPhone className="text-lg" />
                  <span>{pro.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



