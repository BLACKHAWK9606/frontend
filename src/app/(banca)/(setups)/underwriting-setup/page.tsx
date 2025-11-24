'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ProductTab } from '@/components/underwriting/product-tab'
import { ClausesPerilsTab } from '@/components/underwriting/clauses-perils-tab'
import { ScheduleDocsTab } from '@/components/underwriting/schedule-tab'
import { OtherTab } from '@/components/underwriting/other-tab'

export default function UnderwritingSetupsPage() {
  return (
    <div className="space-y-6 bg-white dark:bg-gray-50 px-5 pt-8 min-h-screen">
      <h1 className="text-2xl font-semibold">Underwriting Setups</h1>

      <Tabs defaultValue="product" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="product" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Product Setups</TabsTrigger>
          <TabsTrigger value="clauses-perils" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Clauses & Perils</TabsTrigger>
          <TabsTrigger value="schedule-docs" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Schedules & Docs</TabsTrigger>
          <TabsTrigger value="other" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Other Setups</TabsTrigger>
        </TabsList>

        <TabsContent value="product"><ProductTab /></TabsContent>
        <TabsContent value="clauses-perils"><ClausesPerilsTab /></TabsContent>
        <TabsContent value="schedule-docs"><ScheduleDocsTab /></TabsContent>
        <TabsContent value="other"><OtherTab /></TabsContent>
      </Tabs>
    </div>
  )
}
