'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ChartOfAccountsTab } from '@/components/finance/chart-tab'
import { BanksTab } from '../../../../components/finance/banks-tab'
import { CollectionAccountsTab } from '@/components/finance/collection-tab'
import { BankAccountsTab } from '@/components/finance/accounts-tab'
import { ReportFormatsTab } from '@/components/finance/reports-tab'
import { OpeningBalancesTab } from '@/components/finance/balance-tab'
import { AccountingPeriodsTab } from '@/components/finance/period-tab'

export default function FinanceSetupsPage() {
  return (
    <div className="space-y-6 bg-white dark:bg-gray-50 px-5 pt-8 min-h-screen">
      <h1 className="text-2xl font-semibold">Finance Setups</h1>

      <Tabs defaultValue="chart-of-accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="chart-of-accounts" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Chart of Accounts</TabsTrigger>
          <TabsTrigger value="banks" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Banks</TabsTrigger>
          <TabsTrigger value="collection-accounts" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Collection Accounts</TabsTrigger>
          <TabsTrigger value="bank-accounts" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Bank Accounts</TabsTrigger>
          <TabsTrigger value="report-formats" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Report Formats</TabsTrigger>
          <TabsTrigger value="opening-balances" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Opening Balances</TabsTrigger>
          <TabsTrigger value="accounting-periods" className='bg-blue-700 dark:bg-blue-700 text-white hover:bg-blue-600 '>Accounting Periods</TabsTrigger>
        </TabsList>

        <TabsContent value="chart-of-accounts"><ChartOfAccountsTab /></TabsContent>
        <TabsContent value="banks"><BanksTab /></TabsContent>
        <TabsContent value="collection-accounts"><CollectionAccountsTab /></TabsContent>
        <TabsContent value="bank-accounts"><BankAccountsTab /></TabsContent>
        <TabsContent value="report-formats"><ReportFormatsTab /></TabsContent>
        <TabsContent value="opening-balances"><OpeningBalancesTab /></TabsContent>
        <TabsContent value="accounting-periods"><AccountingPeriodsTab /></TabsContent>
      </Tabs>
    </div>
  )
}
