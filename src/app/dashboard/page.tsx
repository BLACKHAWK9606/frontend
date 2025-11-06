import Sidebar from './Components/sidebar';
import Header from './Components/header';
import StatCard from './Components/statCard';
import ChartSection from './Components/ChartSection';
import RecentActivity from './Components/RecentActivities';
import RightSidebar from './Components/RightSidebar';

export default function DashboardPage() {
  const stats = [
    { title: 'Active Policies', value: 1284, icon: '📄' },
    { title: 'Claims Processed', value: 342, icon: '💼' },
    { title: 'Premium Collected (KES)', value: '12.4M', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-blue-50 text-black">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex flex-1">
            <main className="flex-1 bg-gray-100 h-screen overflow-hidden">
              <div className="h-full p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {stats.map((s, i) => (
                    <StatCard key={i} {...s} />
                  ))}
                </div>
                <ChartSection />
                <div className="mt-6">
                  <RecentActivity />
                </div>
              </div>
            </main>
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

