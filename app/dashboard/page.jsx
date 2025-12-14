"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  MdDashboard,
  MdAssignment,
  MdStar,
  MdSettings,
  MdLogout,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdClose
} from "react-icons/md";
import ReactECharts from 'echarts-for-react';

export default function Dashboard() {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("contracts");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedContractForReview, setSelectedContractForReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/join');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContracts();
    }
  }, [isAuthenticated]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setContracts(data.data || []);
        if (data.message) {
          console.log('API Message:', data.message);
        }
      } else {
        console.error('Error fetching contracts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-black font-sans flex items-center justify-center">
        <p className="text-lg font-bold text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const pendingContracts = contracts.filter(c => c.status === 'pending');
  const activeContracts = contracts.filter(c => c.status === 'accepted');
  const completedContracts = contracts.filter(c => c.status === 'completed');
  const rejectedContracts = contracts.filter(c => c.status === 'rejected');

  // Prepare chart data for ECharts
  const pieChartData = [
    { value: pendingContracts.length, name: 'Pending', itemStyle: { color: '#fbbf24' } },
    { value: activeContracts.length, name: 'Active', itemStyle: { color: '#3b82f6' } },
    { value: completedContracts.length, name: 'Completed', itemStyle: { color: '#10b981' } },
    { value: rejectedContracts.length, name: 'Rejected', itemStyle: { color: '#ef4444' } },
  ].filter(item => item.value > 0);

  // Contracts over time (last 6 months)
  const getMonthlyData = () => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      months.push({ month: monthName, contracts: 0 });
    }
    
    contracts.forEach(contract => {
      const contractDate = new Date(contract.createdAt);
      const monthIndex = months.findIndex(m => {
        const monthDate = new Date(contractDate.getFullYear(), contractDate.getMonth(), 1);
        const chartMonth = new Date(now.getFullYear(), now.getMonth() - (5 - months.indexOf(m)), 1);
        return monthDate.getTime() === chartMonth.getTime();
      });
      if (monthIndex !== -1) {
        months[monthIndex].contracts++;
      }
    });
    
    return months;
  };

  const monthlyData = getMonthlyData();

  // ECharts options
  const pieChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'transparent',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: { color: '#6b7280', fontSize: 12, fontWeight: 'bold' }
    },
    series: [
      {
        name: 'Contract Status',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: 'transparent',
          borderWidth: 0
        },
        label: {
          show: true,
          formatter: '{b}: {c} ({d}%)',
          fontSize: 12,
          fontWeight: 'bold'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: pieChartData
      }
    ]
  };

  const areaChartOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'transparent',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: monthlyData.map(m => m.month),
      axisLabel: { color: '#6b7280', fontSize: 12, fontWeight: 'bold' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#6b7280', fontSize: 12, fontWeight: 'bold' },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        name: 'Contracts',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.6)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
            ]
          }
        },
        lineStyle: { color: '#3b82f6', width: 3 },
        itemStyle: { color: '#3b82f6' },
        data: monthlyData.map(m => m.contracts)
      }
    ]
  };

  const barChartOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'transparent',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      data: ['Pending', 'Active', 'Completed', 'Rejected'],
      axisLabel: { color: '#6b7280', fontSize: 12, fontWeight: 'bold' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#6b7280', fontSize: 12, fontWeight: 'bold' },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        name: 'Contracts',
        type: 'bar',
        data: [
          pendingContracts.length,
          activeContracts.length,
          completedContracts.length,
          rejectedContracts.length
        ],
        itemStyle: {
          color: '#3b82f6',
          borderRadius: [8, 8, 0, 0],
          borderWidth: 0
        },
        barWidth: '60%'
      }
    ]
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black font-sans pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-black dark:text-white mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-lg font-bold text-gray-600 dark:text-gray-400">
            {user?.isPro ? "Pro Dashboard" : "Customer Dashboard"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">Pending</p>
                <p className="text-3xl font-black text-black dark:text-white">{pendingContracts.length}</p>
              </div>
              <MdAssignment className="text-4xl text-gray-400" />
            </div>
          </div>
          <div className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">Active</p>
                <p className="text-3xl font-black text-black dark:text-white">{activeContracts.length}</p>
              </div>
              <MdAccessTime className="text-4xl text-gray-400" />
            </div>
          </div>
          <div className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">Completed</p>
                <p className="text-3xl font-black text-black dark:text-white">{completedContracts.length}</p>
              </div>
              <MdStar className="text-4xl text-gray-400" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {contracts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Contract Status Pie Chart */}
            <div className="bg-white dark:bg-black  p-0 overflow-hidden">
              <h2 className="text-xl font-black text-black dark:text-white mb-4 px-6 pt-6">Contract Status Distribution</h2>
              <ReactECharts
                option={pieChartOption}
                style={{ height: '300px', width: '100%', padding: 0, margin: 0 }}
                opts={{ renderer: 'svg' }}
              />
            </div>

            {/* Contracts Over Time */}
            <div className="bg-white dark:bg-black  p-0 overflow-hidden">
              <h2 className="text-xl font-black text-black dark:text-white mb-4 px-6 pt-6">Contracts Over Time</h2>
              <ReactECharts
                option={areaChartOption}
                style={{ height: '300px', width: '100%', padding: 0, margin: 0 }}
                opts={{ renderer: 'svg' }}
              />
            </div>

            {/* Status Breakdown Bar Chart */}
            <div className="bg-white dark:bg-black  p-0 overflow-hidden lg:col-span-2">
              <h2 className="text-xl font-black text-black dark:text-white mb-4 px-6 pt-6">Status Breakdown</h2>
              <ReactECharts
                option={barChartOption}
                style={{ height: '300px', width: '100%', padding: 0, margin: 0 }}
                opts={{ renderer: 'svg' }}
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b-2 border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("contracts")}
            className={`px-6 py-3 font-bold border-b-2 transition-colors ${
              activeTab === "contracts"
                ? "border-black dark:border-white text-black dark:text-white"
                : "border-transparent text-gray-600 dark:text-gray-400"
            }`}
          >
            Contracts
          </button>
          {!user?.isPro && (
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 font-bold border-b-2 transition-colors ${
                activeTab === "reviews"
                  ? "border-black dark:border-white text-black dark:text-white"
                  : "border-transparent text-gray-600 dark:text-gray-400"
              }`}
            >
              My Reviews
            </button>
          )}
        </div>

        {/* Contracts List */}
        {activeTab === "contracts" && (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px]">
                <p className="text-lg font-bold text-gray-600 dark:text-gray-400">Loading contracts...</p>
              </div>
            ) : contracts.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px]">
                <p className="text-lg font-bold text-gray-600 dark:text-gray-400">
                  {user?.isPro ? 'No contracts yet. Customers will contact you here.' : 'No contracts yet'}
                </p>
                {!user?.isPro && (
                  <Link href="/hire" className="mt-4 inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-[30px] hover:opacity-90 transition-opacity">
                    Browse Pros
                  </Link>
                )}
              </div>
            ) : (
              contracts.map((contract) => (
                <div
                  key={contract._id}
                  className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-[30px] p-6 hover:border-black dark:hover:border-white transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-black dark:text-white mb-2">
                        {user?.isPro ? contract.userId?.name || contract.customerName : contract.proId?.name}
                      </h3>
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">
                        Service: {contract.service || "General Service"}
                      </p>
                      {user?.isPro && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Customer: {contract.customerName || contract.userId?.name}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {new Date(contract.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                      contract.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      contract.status === 'accepted' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      contract.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                      'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}>
                      {contract.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{contract.message}</p>
                  {contract.quote && (
                    <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-[20px]">
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">Quote</p>
                      <p className="text-xl font-black text-black dark:text-white">
                        {contract.quote.currency} {contract.quote.amount}
                      </p>
                    </div>
                  )}
                  {user?.isPro && contract.status === 'pending' && (
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem('token');
                            const contractId = contract._id || contract.id;
                            const response = await fetch(`/api/contracts/${contractId}`, {
                              method: 'PATCH',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                              },
                              body: JSON.stringify({ status: 'accepted' }),
                            });
                            
                            const data = await response.json();
                            if (data.success) {
                              fetchContracts();
                            } else {
                              console.error('Error accepting contract:', data.error);
                            }
                          } catch (error) {
                            console.error('Error accepting contract:', error);
                          }
                        }}
                        className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-[20px] hover:opacity-90 transition-opacity"
                      >
                        Accept
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem('token');
                            const contractId = contract._id || contract.id;
                            const response = await fetch(`/api/contracts/${contractId}`, {
                              method: 'PATCH',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                              },
                              body: JSON.stringify({ status: 'rejected' }),
                            });
                            
                            const data = await response.json();
                            if (data.success) {
                              fetchContracts();
                            } else {
                              console.error('Error rejecting contract:', data.error);
                            }
                          } catch (error) {
                            console.error('Error rejecting contract:', error);
                          }
                        }}
                        className="px-6 py-2 border-2 border-gray-300 dark:border-gray-700 text-black dark:text-white font-bold rounded-[20px] hover:border-black dark:hover:border-white transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {user?.isPro && contract.status === 'accepted' && (
                    <div className="flex gap-3">
                      <button
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem('token');
                            const contractId = contract._id || contract.id;
                            
                            if (!contractId) {
                              console.error('Error: Contract ID is missing');
                              return;
                            }
                            
                            const response = await fetch(`/api/contracts/${contractId}`, {
                              method: 'PATCH',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                              },
                              body: JSON.stringify({ 
                                status: 'completed',
                                completedDate: new Date().toISOString()
                              }),
                            });
                            
                            const data = await response.json();
                            
                            if (data.success) {
                              fetchContracts();
                            } else {
                              console.error('Error marking contract as completed:', data.error);
                            }
                          } catch (error) {
                            console.error('Error marking contract as completed:', error);
                          }
                        }}
                        className="px-6 py-2 bg-green-600 dark:bg-green-500 text-white font-bold rounded-[20px] hover:opacity-90 transition-opacity"
                      >
                        Mark as Completed
                      </button>
                    </div>
                  )}
                  {!user?.isPro && contract.status === 'completed' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedContractForReview(contract);
                          setShowReviewModal(true);
                        }}
                        className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-[20px] hover:opacity-90 transition-opacity"
                      >
                        Write Review
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && selectedContractForReview && typeof window !== 'undefined' && (
          <div className="fixed inset-0 bg-black/50 dark:bg-white/10 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 rounded-[30px] p-8 max-w-md w-full relative">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedContractForReview(null);
                  setReviewForm({ rating: 5, comment: '' });
                }}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-black dark:text-white hover:opacity-70 transition-opacity"
              >
                <MdClose className="text-2xl" />
              </button>

              <h2 className="text-2xl font-black text-black dark:text-white mb-4">
                Write a Review
              </h2>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-6">
                Review {selectedContractForReview.proId?.name || 'this pro'}
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const token = localStorage.getItem('token');
                    const response = await fetch('/api/reviews', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        proId: selectedContractForReview.proId?._id || selectedContractForReview.proId?.id,
                        contractId: selectedContractForReview._id || selectedContractForReview.id,
                        rating: reviewForm.rating,
                        comment: reviewForm.comment,
                        service: selectedContractForReview.service || null,
                      }),
                    });

                    const data = await response.json();
                    if (data.success) {
                      setShowReviewModal(false);
                      setSelectedContractForReview(null);
                      setReviewForm({ rating: 5, comment: '' });
                      // Refresh contracts to show updated state
                      fetchContracts();
                    } else {
                      console.error('Error submitting review:', data.error);
                    }
                  } catch (error) {
                    console.error('Error submitting review:', error);
                    alert('Failed to submit review. Please try again.');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className={`text-3xl ${
                          star <= reviewForm.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-700'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2">
                    Comment
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-[20px] bg-white dark:bg-black text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
                    placeholder="Share your experience..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-[20px] hover:opacity-90 transition-opacity"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



