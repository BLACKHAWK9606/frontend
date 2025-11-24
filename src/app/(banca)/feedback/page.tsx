// app/feedback/page.tsx
'use client';

import { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  Bug, 
  Lightbulb,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

type FeedbackType = 'general' | 'bug' | 'suggestion' | 'compliment';

export default function FeedbackPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    type: 'general' as FeedbackType,
    title: '',
    description: '',
    email: ''
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setRating(0);
    setFormData({
      type: 'general',
      title: '',
      description: '',
      email: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Feedback submitted successfully!', {
        description: 'Thank you for helping us improve our service.',
        duration: 5000,
      });
      closeModal();
    }, 1000);
  };

  const getFeedbackIcon = (type: FeedbackType) => {
    switch (type) {
      case 'general': return <MessageSquare className="w-4 h-4" />;
      case 'bug': return <Bug className="w-4 h-4" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4" />;
      case 'compliment': return <ThumbsUp className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getFeedbackColor = (type: FeedbackType) => {
    switch (type) {
      case 'general': return 'bg-blue-100 text-blue-800';
      case 'bug': return 'bg-red-100 text-red-800';
      case 'suggestion': return 'bg-purple-100 text-purple-800';
      case 'compliment': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-blue-600 w-6 h-6" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Feedback</h1>
              <p className="text-sm text-gray-600 mt-1">Share your thoughts and help us improve</p>
            </div>
          </div>
          <button
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition-colors font-medium"
          >
            Share Feedback
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Feedback Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall Rating */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Rating</h2>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 ${
                        star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-2xl font-bold text-gray-900">4.2</p>
                <p className="text-sm text-gray-600">Based on 1,234 reviews</p>
              </div>
            </div>

            {/* Feedback Types */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Feedback Types</h2>
              <div className="space-y-3">
                {[
                  { type: 'general' as FeedbackType, label: 'General Feedback', count: 456 },
                  { type: 'bug' as FeedbackType, label: 'Bug Reports', count: 123 },
                  { type: 'suggestion' as FeedbackType, label: 'Suggestions', count: 345 },
                  { type: 'compliment' as FeedbackType, label: 'Compliments', count: 310 },
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <span className={`p-1 rounded ${getFeedbackColor(item.type)}`}>
                        {getFeedbackIcon(item.type)}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What to Include</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Specific examples or scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Steps to reproduce (for bugs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Your expected outcome</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <span>Personal or sensitive information</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Recent Feedback & Statistics */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Rating Distribution */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h2>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm text-gray-600">{stars}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${(stars / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">
                        {Math.round((stars / 5) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Stats */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">This Month</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">42</p>
                    <p className="text-sm text-blue-600">New Feedback</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">38</p>
                    <p className="text-sm text-green-600">Responded</p>
                  </div>
                   <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">4.2</p>
                    <p className="text-sm text-purple-600">Avg Rating</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">92%</p>
                    <p className="text-sm text-orange-600">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Feedback */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    type: 'compliment' as FeedbackType,
                    title: 'Excellent mobile app experience',
                    rating: 5,
                    comment: 'The app is very intuitive and easy to use. Filing claims has never been easier!',
                    date: '2024-01-15',
                    user: 'Anonymous'
                  },
                  {
                    id: 2,
                    type: 'suggestion' as FeedbackType,
                    title: 'Add dark mode option',
                    rating: 4,
                    comment: 'Would love to see a dark mode option for better nighttime usage.',
                    date: '2024-01-14',
                    user: 'Anonymous'
                  },
                  {
                    id: 3,
                    type: 'bug' as FeedbackType,
                    title: 'Policy document download issue',
                    rating: 2,
                    comment: 'Unable to download policy documents on Safari browser.',
                    date: '2024-01-13',
                    user: 'Anonymous'
                  }
                ].map((feedback) => (
                  <div key={feedback.id} className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1 rounded ${getFeedbackColor(feedback.type)}`}>
                          {getFeedbackIcon(feedback.type)}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{feedback.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{feedback.comment}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{feedback.user}</span>
                      <span className="text-xs text-gray-500">{feedback.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 bg-blue-600 border-b">
              <h3 className="text-lg font-semibold text-white">Share Your Feedback</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmitFeedback}>
              <div className="p-6 space-y-4">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoverRating || rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="general">General Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="compliment">Compliment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief summary of your feedback"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide detailed feedback..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}