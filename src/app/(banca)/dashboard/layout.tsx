export default function DashboardLayout({
  children,
  Stats,
  Charts,
  Notifications,
  RecentActivities,
}: {
  children: React.ReactNode
  Stats: React.ReactNode
  Charts: React.ReactNode
  Notifications: React.ReactNode
  RecentActivities: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {/* Add ShadCN buttons or Lucide icons here */}
      </header>

      {/* Stats just below header */}
      <section className="mb-6 bg-white rounded-lg shadow p-4">
        {Stats}
      </section>

      {/* Main grid: notifications on right, charts in middle */}
      <div className="grid grid-cols-12 gap-6">
        {/* Charts slot (middle) */}
        <main className="col-span-9 bg-white rounded-lg shadow p-4">
          {Charts}
        </main>
        
        {/* Notifications slot (right side) */}
        <aside className="col-span-3 bg-white rounded-lg shadow p-4">
          {Notifications}
        </aside>
      </div>

      {/* Recent Activities at the bottom */}
      <section className="mt-6 bg-white rounded-lg shadow p-4">
        {RecentActivities}
      </section>

      {/* Default children route (overview, etc.) */}
      <footer className="mt-8">{children}</footer>
    </div>
  )
}
