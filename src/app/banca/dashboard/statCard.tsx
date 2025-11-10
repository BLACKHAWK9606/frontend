// components/StatCard.tsx
import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
};

export default function StatCard({ title, value, icon }: StatCardProps) {
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
