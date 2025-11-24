'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { OrganizationTab } from '@/components/organisation/org-tab'
import { ClientTab } from '@/components/organisation/client-tab'
import { AccountTab } from '@/components/organisation/account-tab'
import { WorkflowTab } from '@/components/organisation/workflow-tab'

export default function OrganizationSetupsPage() {
  return (
    <div className="space-y-6 bg-white dark:bg-gray-50 px-5 pt-8 min-h-screen">
      <h1 className="text-2xl font-semibold">Organization Setups</h1>

      <Tabs defaultValue="organization" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="organization" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Organization</TabsTrigger>
          <TabsTrigger value="client" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600'>Client</TabsTrigger>
          <TabsTrigger value="account" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600'>Account</TabsTrigger>
          <TabsTrigger value="workflow" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600'>Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="organization"><OrganizationTab /></TabsContent>
        <TabsContent value="client"><ClientTab /></TabsContent>
        <TabsContent value="account"><AccountTab /></TabsContent>
        <TabsContent value="workflow"><WorkflowTab /></TabsContent>
      </Tabs>
    </div>
  )
}
