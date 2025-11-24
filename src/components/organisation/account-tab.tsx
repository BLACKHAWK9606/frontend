'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'

export function AccountTab() {
  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Account Types">
        <Input placeholder="Account Type Name (e.g. Savings, Current)" />
        <Input placeholder="Description (optional)" />
        <Button>Save</Button>
      </SetupCard>

      <SetupCard title="Chart of Accounts Mapping">
        <Input placeholder="Account Code (e.g. 1010)" />
        <Input placeholder="Account Name (e.g. Premium Income)" />
        <Button>Map Account</Button>
      </SetupCard>
    </div>
  )
}
