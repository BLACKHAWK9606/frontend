'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'
export function OtherTab() {
  const budgetData = [
    { 'Budget Name': 'Claims Budget Q1', 'Limit Amount': 'KES 5,000,000' },
    { 'Budget Name': 'Marketing Budget', 'Limit Amount': 'KES 2,000,000' }
  ]

  const emailData = [
    { 'Underwriter Name': 'Mercy Thuo', 'Email Address': 'mercy.thuo@insureco.com' },
    { 'Underwriter Name': 'Stephen Mwangi', 'Email Address': 'smwangi@insureco.com' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Budgets Setups">
        <Input placeholder="Budget Name" />
        <Input placeholder="Limit Amount" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Budget Name', 'Limit Amount']} data={budgetData} />

      <SetupCard title="Underwriters Email">
        <Input placeholder="Underwriter Name" />
        <Input placeholder="Email Address" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Underwriter Name', 'Email Address']} data={emailData} />
    </div>
  )
}
