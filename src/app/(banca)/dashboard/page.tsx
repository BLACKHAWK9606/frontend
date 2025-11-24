'use client';
import { useState, useEffect } from 'react';
import { 
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  Star,
  ThumbsUp,
  Bug,
  Lightbulb,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  DollarSign,
  Target,
  Percent,
  Timer,
  Award,
  User
} from 'lucide-react';
import Image from 'next/image';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  image: string;
  company?: {
    title: string;
  };
}

export default function DashboardPage() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    type: 'general',
    title: '',
    description: '',
    email: ''
  });
  const [supportForm, setSupportForm] = useState({
    title: '',
    category: 'technical',
    priority: 'Medium',
    description: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!backendUrl) {
        console.error('NEXT_PUBLIC_BASE_URL is not defined');
        return;
      }
      try {
        const response = await fetch(`${backendUrl}/api/users/profile`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setUserProfile(data[0]);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFeedbackModalOpen(false);
    setFeedbackForm({ type: 'general', title: '', description: '', email: '' });
    setRating(0);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSupportModalOpen(false);
    setSupportForm({ title: '', category: 'technical', priority: 'Medium', description: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Welcome to your Bancassurance portal</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white text-sm font-medium"
            >
              Share Feedback
            </button>
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-medium"
            >
              Get Support
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Bancassurance KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Sales Performance */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Gross Written Premium</p>
                <p className="text-xl font-bold text-gray-900">KES 45.2M</p>
                <p className="text-xs text-green-600">+12.5% vs budget</p>
              </div>
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">New Business Strike Rate</p>
                <p className="text-xl font-bold text-gray-900">68.4%</p>
                <p className="text-xs text-blue-600">Target: 65%</p>
              </div>
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Policy Renewal Rate</p>
                <p className="text-xl font-bold text-gray-900">87.2%</p>
                <p className="text-xs text-green-600">+2.1% vs last month</p>
              </div>
              <Percent className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Combined Ratio</p>
                <p className="text-xl font-bold text-gray-900">94.8%</p>
                <p className="text-xs text-green-600">Profitable</p>
              </div>
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-xs text-gray-600">Loss Ratio</p>
            <p className="text-lg font-bold text-gray-900">62.3%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-xs text-gray-600">Expense Ratio</p>
            <p className="text-lg font-bold text-gray-900">32.5%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-xs text-gray-600">Avg Claim Settlement</p>
            <p className="text-lg font-bold text-gray-900">14 days</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-xs text-gray-600">Customer Satisfaction</p>
            <p className="text-lg font-bold text-gray-900">4.2/5</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-xs text-gray-600">Agent Productivity</p>
            <p className="text-lg font-bold text-gray-900">156 policies</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <p className="text-xs text-gray-600">Lead Conversion</p>
            <p className="text-lg font-bold text-gray-900">23.7%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Profile */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">User Profile</h2>
            </div>
            <div className="p-4">
              {userProfile ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={userProfile.image} 
                      alt={userProfile.firstName} 
                      width={48} 
                      height={48} 
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{userProfile.firstName} {userProfile.lastName}</p>
                      <p className="text-sm text-gray-600">@{userProfile.username}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{userProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{userProfile.phone}</span>
                    </div>
                    {userProfile.company && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{userProfile.company.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Loading profile...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {[
                  { action: 'New Life Insurance policy issued', client: 'John Kamau', amount: 'KES 500K', time: '2 hours ago', type: 'success' },
                  { action: 'Motor claim approved', client: 'Sarah Wanjiku', amount: 'KES 85K', time: '4 hours ago', type: 'info' },
                  { action: 'Premium payment received', client: 'David Mwangi', amount: 'KES 12K', time: '6 hours ago', type: 'success' },
                  { action: 'Policy renewal reminder sent', client: 'Grace Njeri', amount: 'KES 25K', time: '1 day ago', type: 'warning' },
                  { action: 'Health insurance quote generated', client: 'Peter Ochieng', amount: 'KES 18K', time: '1 day ago', type: 'info' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'info' ? 'bg-blue-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.client} • {activity.amount} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics & Actions */}
          <div className="space-y-6">
            {/* Top Agents Performance */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Agents</h2>
              <div className="space-y-3">
                {[
                  { name: 'Alice Wanjiku', policies: 45, premium: 'KES 2.1M', rank: 1 },
                  { name: 'John Mwangi', policies: 38, premium: 'KES 1.8M', rank: 2 },
                  { name: 'Grace Njeri', policies: 32, premium: 'KES 1.5M', rank: 3 }
                ].map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        agent.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                        agent.rank === 2 ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {agent.rank}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                        <p className="text-xs text-gray-600">{agent.policies} policies</p>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-900">{agent.premium}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full text-left p-2 border border-gray-200 rounded hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">New Quote</p>
                </button>
                <button className="w-full text-left p-2 border border-gray-200 rounded hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Process Claim</p>
                </button>
                <button className="w-full text-left p-2 border border-gray-200 rounded hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Policy Renewal</p>
                </button>
                <button className="w-full text-left p-2 border border-gray-200 rounded hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">Generate Report</p>
                </button>
              </div>
            </div>

            {/* Support & Feedback */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Support & Feedback</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <Phone className="text-blue-600 w-4 h-4" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">+254 700 123 456</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <Mail className="text-green-600 w-4 h-4" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">support@bancassurance.co.ke</p>
                  </div>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded">
                  <div className="flex justify-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-3 h-3 ${
                        star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`} />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-gray-900">4.2 NPS Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Share Feedback</h3>
              <button onClick={() => setIsFeedbackModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star className={`w-6 h-6 ${
                          star <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={feedbackForm.type}
                    onChange={(e) => setFeedbackForm({...feedbackForm, type: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="general">General</option>
                    <option value="bug">Bug Report</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="compliment">Compliment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={feedbackForm.title}
                    onChange={(e) => setFeedbackForm({...feedbackForm, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={feedbackForm.description}
                    onChange={(e) => setFeedbackForm({...feedbackForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 p-4 border-t">
                <button type="button" onClick={() => setIsFeedbackModalOpen(false)} className="px-4 py-2 text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">New Support Ticket</h3>
              <button onClick={() => setIsSupportModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSupportSubmit}>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={supportForm.title}
                    onChange={(e) => setSupportForm({...supportForm, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={supportForm.category}
                    onChange={(e) => setSupportForm({...supportForm, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="claims">Claims</option>
                    <option value="policy">Policy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={supportForm.priority}
                    onChange={(e) => setSupportForm({...supportForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={supportForm.description}
                    onChange={(e) => setSupportForm({...supportForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 p-4 border-t">
                <button type="button" onClick={() => setIsSupportModalOpen(false)} className="px-4 py-2 text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}