'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function OpeningBalancesTab() {
  const data = [
    { 'Account': 'Premium Income', 'Opening Balance': 'KES 1,000,000' },
    { 'Account': 'Claims Payable', 'Opening Balance': 'KES 500,000' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Opening Balances">
        <Input placeholder="Account Name" />
        <Input placeholder="Opening Balance" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Account', 'Opening Balance']} data={data} />
    </div>
  )
}
