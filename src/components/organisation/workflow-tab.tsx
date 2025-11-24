'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'

export function WorkflowTab() {
  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Workflow Deployments">
        <Input placeholder="Deployment Name (e.g. Claims Approval Flow)" />
        <Input placeholder="Assigned Role (e.g. Claims Officer)" />
        <Button>Save Deployment</Button>
      </SetupCard>

      <SetupCard title="Checks Setup">
        <Input placeholder="Check Name (e.g. Budget Limit Check)" />
        <Input placeholder="Trigger Condition (e.g. Amount > 100,000)" />
        <Button>Save Check</Button>
      </SetupCard>

      <SetupCard title="Escalation Rules">
        <Input placeholder="Escalation Reason (e.g. Delay > 3 days)" />
        <Input placeholder="Escalate To (e.g. Supervisor)" />
        <Button>Save Rule</Button>
      </SetupCard>
    </div>
  )
}
