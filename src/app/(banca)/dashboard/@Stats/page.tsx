import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
};

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-blue-50 p-4 shadow-md text-black">
      <div className="text-3xl text-blue-700">{icon}</div>
      <div>
        <p className="text-sm text-blue-900">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

// This is what should be exported as default
export default function StatsPage() {
  const stats = [
    { title: 'Active Policies', value: 1284, icon: '📄' },
    { title: 'Claims Processed', value: 342, icon: '💼' },
    { title: 'Premium Collected (KES)', value: '12.4M', icon: '💰' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatCard 
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
