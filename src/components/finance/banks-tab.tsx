'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function BanksTab() {
  const data = [
    { 'Bank Name': 'ABSA Bank', 'Branch': 'Westlands' },
    { 'Bank Name': 'Equity Bank', 'Branch': 'Thika Road' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Banks and Branches">
        <Input placeholder="Bank Name" />
        <Input placeholder="Branch Name" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Bank Name', 'Branch']} data={data} />
    </div>
  )
}
