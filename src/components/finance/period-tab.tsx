'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function AccountingPeriodsTab() {
  const data = [
    { 'Period Name': 'Q1 2025', 'Start Date': '01/01/2025', 'End Date': '31/03/2025' },
    { 'Period Name': 'Q2 2025', 'Start Date': '01/04/2025', 'End Date': '30/06/2025' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Accounting Periods">
        <Input placeholder="Period Name (e.g. Q1 2025)" />
        <Input type="date" placeholder="Start Date" />
        <Input type="date" placeholder="End Date" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Period Name', 'Start Date', 'End Date']} data={data} />
    </div>
  )
}
