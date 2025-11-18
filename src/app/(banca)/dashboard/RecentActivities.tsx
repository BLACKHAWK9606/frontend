"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,

} from "@/components/ui/table";



type Activity = {
  id: string;
  name: string;
  action: string;
  time: string;
  section: string;
};

type Claim = {
  type: string;
  status: string;
  amount: string;
};

type UserMini = {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  company?: { title?: string } | null;
};

export default function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [users, setUsers] = useState<UserMini[]>([]);

  const [claims, setClaims] = useState<Claim[]>([
    { type: 'Health', status: 'Approved', amount: 'KES 45,000' },
    { type: 'Motor', status: 'Pending', amount: 'KES 120,000' }
  ]);

  useEffect(() => {
    setActivities([
      {
        id: "a1",
        name: "John Mwangi",
        action: "Viewed Motor Insurance policy details",
        time: "Today at 10:45 AM",
        section: "Policy Management",
      },
      {
        id: "a2",
        name: "Grace Wanjiku",
        action: "Submitted a health insurance claim",
        time: "Yesterday at 3:20 PM",
        section: "Claims",
      },
      {
        id: "a3",
        name: "Kevin Otieno",
        action: "Updated contact information",
        time: "2 days ago at 9:15 AM",
        section: "Customer Profiles",
      },
      {
        id: "a4",
        name: "Amina Yusuf",
        action: "Renewed Life Insurance policy",
        time: "3 days ago at 11:00 AM",
        section: "Policy Management",
      },
    ]);

    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => setUsers(data.users.slice(0, 2)));
  }, []);



  return (
    <div className="rounded-lg bg-white p-6 shadow-md text-black">
      <h2 className="text-lg font-semibold text-blue-800 mb-6">Recent Customer Activities</h2>

      <div className="flex gap-8">
        {/* Timeline */}
        <div className="flex-1">
          <div className="relative border-l-2 border-blue-300 pl-10 space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="relative">
                <span
                  className="absolute -left-6.5 top-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow"
                  aria-hidden
                ></span>
                <div>
                  <p className="text-sm font-semibold text-blue-900">{activity.name}</p>
                  <p className="text-sm text-blue-700">{activity.action}</p>
                  <p className="text-xs text-blue-500 mt-1">
                    {activity.time} · {activity.section}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Claims Table */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-800 mb-4">Recent Claims</h3>
          <div className="bg-blue-50 rounded-lg border border-blue-200 overflow-hidden">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-blue-100 border-b border-blue-200">
                  <TableHead className="text-blue-800 font-semibold py-3 px-4">Claim Type</TableHead>
                  <TableHead className="text-blue-800 font-semibold py-3 px-4">Status</TableHead>
                  <TableHead className="text-blue-800 font-semibold py-3 px-4">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim, index) => (
                  <TableRow key={index} className="hover:bg-blue-75 border-b border-blue-100 last:border-b-0">
                    <TableCell className="py-3 px-4 text-blue-900 font-medium">{claim.type}</TableCell>
                    <TableCell className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        claim.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {claim.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-blue-900 font-semibold">{claim.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

