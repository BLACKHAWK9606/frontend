'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function ChartOfAccountsTab() {
  const data = [
    { 'Account Code': '1010', 'Account Name': 'Premium Income' },
    { 'Account Code': '2020', 'Account Name': 'Claims Payable' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Chart of Accounts">
        <Input placeholder="Account Code" />
        <Input placeholder="Account Name" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Account Code', 'Account Name']} data={data} />
    </div>
  )
}
