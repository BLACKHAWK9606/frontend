'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function ScheduleDocsTab() {
  const scheduleData = [
    { 'Schedule Name': 'Motor Schedule', 'Mapped Product': 'Motor Private' },
    { 'Schedule Name': 'Marine Schedule', 'Mapped Product': 'Marine Cargo' }
  ]

  const docData = [
    { 'Document Name': 'ID Copy', 'Description': 'National ID front and back' },
    { 'Document Name': 'Logbook', 'Description': 'Vehicle ownership proof' }
  ]

  const activityData = [
    { 'Activity Name': 'Assessor Visit', 'Stage': 'Investigation' },
    { 'Activity Name': 'Claim Paid', 'Stage': 'Settlement' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Schedule Mappings">
        <Input placeholder="Schedule Name" />
        <Input placeholder="Mapped Product" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Schedule Name', 'Mapped Product']} data={scheduleData} />

      <SetupCard title="Required Documents">
        <Input placeholder="Document Name" />
        <Input placeholder="Description" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Document Name', 'Description']} data={docData} />

      <SetupCard title="Claim Activities">
        <Input placeholder="Activity Name" />
        <Input placeholder="Stage" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Activity Name', 'Stage']} data={activityData} />
    </div>
  )
}
