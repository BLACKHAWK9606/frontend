'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function ClausesPerilsTab() {
  const clauseData = [
    { 'Clause Title': 'War Exclusion', 'Clause Text': 'This policy excludes war-related damages.' },
    { 'Clause Title': 'Theft Clause', 'Clause Text': 'Covers theft under specified conditions.' }
  ]

  const perilData = [
    { 'Peril Name': 'Fire', 'Description': 'Damage caused by fire' },
    { 'Peril Name': 'Flood', 'Description': 'Damage caused by flooding' }
  ]

  const levyData = [
    { 'Levy Name': 'Training Levy', 'Rate (%)': '0.2' },
    { 'Levy Name': 'Insurance Levy', 'Rate (%)': '0.45' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Clauses">
        <Input placeholder="Clause Title" />
        <Input placeholder="Clause Text" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Clause Title', 'Clause Text']} data={clauseData} />

      <SetupCard title="Perils">
        <Input placeholder="Peril Name" />
        <Input placeholder="Description" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Peril Name', 'Description']} data={perilData} />

      <SetupCard title="Levies">
        <Input placeholder="Levy Name" />
        <Input placeholder="Rate (%)" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Levy Name', 'Rate (%)']} data={levyData} />
    </div>
  )
}
