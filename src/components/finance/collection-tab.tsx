'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function CollectionAccountsTab() {
  const data = [
    { 'Account Name': 'Premium Collection', 'Bank': 'ABSA Bank' },
    { 'Account Name': 'Claims Refunds', 'Bank': 'Equity Bank' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Collection Accounts">
        <Input placeholder="Account Name" />
        <Input placeholder="Bank" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Account Name', 'Bank']} data={data} />
    </div>
  )
}
