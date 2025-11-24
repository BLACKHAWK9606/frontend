'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function ReportFormatsTab() {
  const data = [
    { 'Report Name': 'Income Statement', 'Format': 'PDF' },
    { 'Report Name': 'Balance Sheet', 'Format': 'Excel' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Accounting Report Formats">
        <Input placeholder="Report Name" />
        <Input placeholder="Format (e.g. PDF, Excel)" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Report Name', 'Format']} data={data} />
    </div>
  )
}
