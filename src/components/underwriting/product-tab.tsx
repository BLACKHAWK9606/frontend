'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SetupCard } from '@/components/setups/setup-card'
import { SetupTable } from '@/components/setups/setup-table'

export function ProductTab() {
  const classData = [
    { 'Class Name': 'Marine Insurance', 'Class Code': 'MI' },
    { 'Class Name': 'Motor Insurance', 'Class Code': 'MO' }
  ]

  const productData = [
    { 'Product Name': 'Marine Cargo', 'Linked Class': 'Marine Insurance' },
    { 'Product Name': 'Motor Private', 'Linked Class': 'Motor Insurance' }
  ]

  return (
    <div className="space-y-6 pt-4">
      <SetupCard title="Classes">
        <Input placeholder="Class Name" />
        <Input placeholder="Class Code" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Class Name', 'Class Code']} data={classData} />

      <SetupCard title="Products">
        <Input placeholder="Product Name" />
        <Input placeholder="Linked Class" />
        <Button>Save</Button>
      </SetupCard>
      <SetupTable columns={['Product Name', 'Linked Class']} data={productData} />
    </div>
  )
}
