import Sidebar from './sidebar';
import Header from './header';
import StatCard from './statCard';
import ChartSection from './ChartSection';
import RecentActivity from './RecentActivities';
import RightSidebar from './RightSidebar';

export default function DashboardPage() {
  const stats = [
    { title: 'Active Policies', value: 1284, icon: '📄' },
    { title: 'Claims Processed', value: 342, icon: '💼' },
    { title: 'Premium Collected (KES)', value: '12.4M', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-blue-50 text-black">
      <div className="flex">
        
        <div className="flex-1 flex flex-col">
         
          <div className="flex flex-1">
      
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
            
          </div>
        </div>
      </div>
    </div>
  );
}

