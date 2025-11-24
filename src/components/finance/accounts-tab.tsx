'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function BankAccountsTab() {
  const data = [
    { 'Account Number': '0170160789565', 'Bank': 'ABSA Supreme' },
    { 'Account Number': '1234567890123', 'Bank': 'Equity HQ' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Bank Accounts">
        <Input placeholder="Account Number" />
        <Input placeholder="Bank Name" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Account Number', 'Bank']} data={data} />
    </div>
  )
}
